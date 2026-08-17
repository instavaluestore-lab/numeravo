"use client";

import { useMemo, useState } from "react";

type TermUnit = "years" | "months";
type FeeMode = "upfront" | "financed";
type ScheduleMode = "yearly" | "monthly";

type Row = {
  number: number;
  date: Date;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  extra: number;
  endingBalance: number;
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function safe(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

function paymentFor(principal: number, annualRate: number, months: number) {
  if (!principal || !months) return 0;
  const rate = annualRate / 100 / 12;
  if (!rate) return principal / months;
  return principal * (rate * (1 + rate) ** months) / ((1 + rate) ** months - 1);
}

function buildSchedule(principal: number, annualRate: number, months: number, extra: number, start: Date) {
  const rows: Row[] = [];
  if (!principal || !months) return rows;
  const regular = paymentFor(principal, annualRate, months);
  const rate = annualRate / 100 / 12;
  let balance = principal;
  let count = 0;
  const maximum = Math.max(months * 2, 1200);

  while (balance > 0.005 && count < maximum) {
    count += 1;
    const beginningBalance = balance;
    const interest = beginningBalance * rate;
    const availablePrincipal = Math.max(0, regular - interest);
    const regularPrincipal = Math.min(beginningBalance, availablePrincipal);
    const remainingAfterRegular = Math.max(0, beginningBalance - regularPrincipal);
    const appliedExtra = Math.min(extra, remainingAfterRegular);
    const principalPaid = regularPrincipal + appliedExtra;
    balance = Math.max(0, beginningBalance - principalPaid);
    rows.push({
      number: count,
      date: addMonths(start, count - 1),
      beginningBalance,
      payment: interest + principalPaid,
      principal: regularPrincipal,
      interest,
      extra: appliedExtra,
      endingBalance: balance,
    });
    if (regular <= interest && !extra) break;
  }
  return rows;
}

function totals(rows: Row[]) {
  return rows.reduce(
    (sum, row) => ({ paid: sum.paid + row.payment, interest: sum.interest + row.interest }),
    { paid: 0, interest: 0 },
  );
}

export default function LoanCalculatorClient() {
  const [amount, setAmount] = useState("25000");
  const [rate, setRate] = useState("7.5");
  const [term, setTerm] = useState("5");
  const [termUnit, setTermUnit] = useState<TermUnit>("years");
  const [extra, setExtra] = useState("100");
  const [fees, setFees] = useState("0");
  const [feeMode, setFeeMode] = useState<FeeMode>("upfront");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [scheduleMode, setScheduleMode] = useState<ScheduleMode>("yearly");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const originalPrincipal = safe(amount);
    const feeAmount = safe(fees);
    const principal = originalPrincipal + (feeMode === "financed" ? feeAmount : 0);
    const annualRate = safe(rate);
    const enteredTerm = safe(term);
    const months = Math.max(0, Math.round(termUnit === "years" ? enteredTerm * 12 : enteredTerm));
    const start = new Date(`${startDate || new Date().toISOString().slice(0, 10)}T12:00:00`);
    const baseRows = buildSchedule(principal, annualRate, months, 0, start);
    const extraRows = buildSchedule(principal, annualRate, months, safe(extra), start);
    const base = totals(baseRows);
    const accelerated = totals(extraRows);
    const upfront = feeMode === "upfront" ? feeAmount : 0;
    return {
      originalPrincipal, principal, annualRate, months, feeAmount, upfront,
      payment: paymentFor(principal, annualRate, months), baseRows, extraRows,
      baseInterest: base.interest, acceleratedInterest: accelerated.interest,
      baseCost: base.paid + upfront, acceleratedCost: accelerated.paid + upfront,
      interestSaved: Math.max(0, base.interest - accelerated.interest),
      monthsSaved: Math.max(0, baseRows.length - extraRows.length),
    };
  }, [amount, rate, term, termUnit, extra, fees, feeMode, startDate]);

  const visibleRows = result.extraRows;
  const yearlyRows = useMemo(() => {
    const groups = new Map<number, Row[]>();
    visibleRows.forEach((row) => {
      const year = row.date.getFullYear();
      groups.set(year, [...(groups.get(year) ?? []), row]);
    });
    return [...groups.entries()].map(([year, rows]) => ({
      year,
      payment: rows.reduce((s, r) => s + r.payment, 0),
      principal: rows.reduce((s, r) => s + r.principal + r.extra, 0),
      interest: rows.reduce((s, r) => s + r.interest, 0),
      endingBalance: rows.at(-1)?.endingBalance ?? 0,
    }));
  }, [visibleRows]);

  const valid = result.principal > 0 && result.months > 0;
  const payoff = result.extraRows.at(-1)?.date;

  async function copyResults() {
    const text = [
      "Numeravo Loan Calculator",
      `Loan amount: ${money.format(result.originalPrincipal)}`,
      `Interest rate: ${number.format(result.annualRate)}%`,
      `Term: ${result.months} months`,
      `Required monthly payment: ${money.format(result.payment)}`,
      `Extra monthly payment: ${money.format(safe(extra))}`,
      `Total interest: ${money.format(result.acceleratedInterest)}`,
      `Total borrowing cost: ${money.format(result.acceleratedCost)}`,
      `Estimated payoff: ${payoff ? monthYear.format(payoff) : "—"}`,
      `Interest saved: ${money.format(result.interestSaved)}`,
      `Time saved: ${result.monthsSaved} months`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadCsv() {
    const header = "Payment,Date,Beginning balance,Payment,Principal,Interest,Extra principal,Ending balance";
    const lines = result.extraRows.map((row) => [
      row.number, row.date.toISOString().slice(0, 10), row.beginningBalance.toFixed(2),
      row.payment.toFixed(2), row.principal.toFixed(2), row.interest.toFixed(2),
      row.extra.toFixed(2), row.endingBalance.toFixed(2),
    ].join(","));
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "numeravo-loan-amortization.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function reset() {
    setAmount("25000"); setRate("7.5"); setTerm("5"); setTermUnit("years");
    setExtra("100"); setFees("0"); setFeeMode("upfront");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#22C55E]">Loan details</p><h2 className="mt-2 text-2xl font-bold">Calculate your payment</h2></div>
          <button type="button" onClick={reset} className="text-sm font-semibold text-[#A0AEC0] hover:text-white">Reset</button>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Loan amount" value={amount} set={setAmount} prefix="$" />
          <Field label="Annual interest rate" value={rate} set={setRate} suffix="%" />
          <label><span className="text-sm text-[#A0AEC0]">Loan term</span><div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] focus-within:border-[#22C55E]"><input aria-label="Loan term" type="number" min="1" step="1" value={term} onChange={(e) => setTerm(e.target.value)} className="min-w-0 flex-1 bg-[#0B0F19] px-4 py-3 outline-none"/><select aria-label="Loan term unit" value={termUnit} onChange={(e) => setTermUnit(e.target.value as TermUnit)} className="border-l border-[#1F2937] bg-[#0B0F19] px-3"><option value="years">years</option><option value="months">months</option></select></div></label>
          <Field label="Extra monthly payment" value={extra} set={setExtra} prefix="$" />
          <Field label="Loan fees" value={fees} set={setFees} prefix="$" />
          <label><span className="text-sm text-[#A0AEC0]">Fee treatment</span><select value={feeMode} onChange={(e) => setFeeMode(e.target.value as FeeMode)} className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 outline-none focus:border-[#22C55E]"><option value="upfront">Paid upfront</option><option value="financed">Added to loan</option></select></label>
          <label className="sm:col-span-2"><span className="text-sm text-[#A0AEC0]">First payment date</span><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 outline-none focus:border-[#22C55E]"/></label>
        </div>
        <p className="mt-6 text-xs leading-5 text-[#718096]">Assumes a fixed interest rate, monthly compounding, and payments made on schedule. Estimates may differ from lender calculations.</p>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#22C55E]">Estimated results</p>
        {!valid ? <p className="mt-6 text-[#A0AEC0]">Enter a loan amount and term greater than zero.</p> : <>
          <p className="mt-4 text-sm text-[#A0AEC0]">Required monthly payment</p>
          <p className="mt-1 text-4xl font-bold tracking-tight">{money.format(result.payment)}</p>
          {safe(extra) > 0 && <p className="mt-2 text-sm text-[#A0AEC0]">Planned monthly payment: <strong className="text-white">{money.format(result.payment + safe(extra))}</strong></p>}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Result label="Total interest" value={money.format(result.acceleratedInterest)} />
            <Result label="Total borrowing cost" value={money.format(result.acceleratedCost)} />
            <Result label="Estimated payoff" value={payoff ? monthYear.format(payoff) : "—"} />
            <Result label="Number of payments" value={String(result.extraRows.length)} />
          </div>
          {safe(extra) > 0 && <div className="mt-5 rounded-2xl border border-[#14532D] bg-[#052E16]/40 p-5"><p className="font-semibold text-[#4ADE80]">Extra-payment impact</p><p className="mt-2 text-sm leading-6 text-[#BBF7D0]">You could save approximately {money.format(result.interestSaved)} in interest and repay the loan {result.monthsSaved} months sooner.</p></div>}
          <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyResults} className="rounded-xl bg-[#22C55E] px-4 py-3 font-semibold text-[#07120A] hover:bg-green-400">{copied ? "Copied" : "Copy results"}</button><button type="button" onClick={downloadCsv} className="rounded-xl border border-[#374151] px-4 py-3 font-semibold hover:border-[#22C55E]">Download CSV</button></div>
        </>}
      </div>

      {valid && <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8 lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#22C55E]">Amortization</p><h2 className="mt-2 text-2xl font-bold">Payment schedule</h2></div><div className="flex rounded-xl border border-[#1F2937] p-1"><Toggle active={scheduleMode === "yearly"} onClick={() => setScheduleMode("yearly")}>Yearly</Toggle><Toggle active={scheduleMode === "monthly"} onClick={() => setScheduleMode("monthly")}>Monthly</Toggle></div></div>
        <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-[#374151] text-[#A0AEC0]"><tr>{scheduleMode === "yearly" ? <><Th>Year</Th><Th>Payments</Th><Th>Principal</Th><Th>Interest</Th><Th>Ending balance</Th></> : <><Th>#</Th><Th>Date</Th><Th>Payment</Th><Th>Principal</Th><Th>Interest</Th><Th>Extra</Th><Th>Balance</Th></>}</tr></thead><tbody>{scheduleMode === "yearly" ? yearlyRows.map((row) => <tr key={row.year} className="border-b border-[#1F2937]"><Td>{row.year}</Td><Td>{money.format(row.payment)}</Td><Td>{money.format(row.principal)}</Td><Td>{money.format(row.interest)}</Td><Td>{money.format(row.endingBalance)}</Td></tr>) : visibleRows.map((row) => <tr key={row.number} className="border-b border-[#1F2937]"><Td>{row.number}</Td><Td>{monthYear.format(row.date)}</Td><Td>{money.format(row.payment)}</Td><Td>{money.format(row.principal)}</Td><Td>{money.format(row.interest)}</Td><Td>{money.format(row.extra)}</Td><Td>{money.format(row.endingBalance)}</Td></tr>)}</tbody></table></div>
      </div>}
    </section>
  );
}

function Field({ label, value, set, prefix, suffix }: { label: string; value: string; set: (value: string) => void; prefix?: string; suffix?: string }) { return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#22C55E]">{prefix && <span className="px-3 py-3 text-[#A0AEC0]">{prefix}</span>}<input aria-label={label} type="number" min="0" step="any" value={value} onChange={(e) => set(e.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none"/>{suffix && <span className="px-3 py-3 text-[#A0AEC0]">{suffix}</span>}</div></label>; }
function Result({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4"><p className="text-xs text-[#A0AEC0]">{label}</p><p className="mt-2 font-bold">{value}</p></div>; }
function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} className={`rounded-lg px-4 py-2 text-sm font-semibold ${active ? "bg-[#22C55E] text-[#07120A]" : "text-[#A0AEC0]"}`}>{children}</button>; }
function Th({ children }: { children: React.ReactNode }) { return <th className="px-3 py-3 font-medium">{children}</th>; }
function Td({ children }: { children: React.ReactNode }) { return <td className="px-3 py-3">{children}</td>; }
