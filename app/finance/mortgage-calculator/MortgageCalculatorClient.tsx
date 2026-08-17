"use client";

import { useMemo, useState } from "react";

type DownMode = "percent" | "dollars";
type ScheduleMode = "yearly" | "monthly";
type Row = { number: number; date: Date; beginning: number; payment: number; principal: number; interest: number; extra: number; balance: number; pmi: number };

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });
const num = (value: string) => { const parsed = Number(value); return Number.isFinite(parsed) && parsed > 0 ? parsed : 0; };

function addMonths(date: Date, count: number) {
  const result = new Date(date); const day = result.getDate(); result.setDate(1); result.setMonth(result.getMonth() + count);
  result.setDate(Math.min(day, new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate())); return result;
}

function monthlyPayment(principal: number, annualRate: number, months: number) {
  if (!principal || !months) return 0; const rate = annualRate / 1200;
  if (!rate) return principal / months;
  return principal * (rate * (1 + rate) ** months) / ((1 + rate) ** months - 1);
}

function schedule(principal: number, annualRate: number, months: number, extra: number, start: Date, homePrice: number, annualPmiRate: number) {
  const rows: Row[] = []; if (!principal || !months) return rows;
  const regular = monthlyPayment(principal, annualRate, months); const rate = annualRate / 1200; let balance = principal;
  for (let index = 1; balance > 0.005 && index <= Math.max(1200, months * 2); index += 1) {
    const beginning = balance; const interest = beginning * rate; const scheduledPrincipal = Math.min(beginning, Math.max(0, regular - interest));
    const remaining = Math.max(0, beginning - scheduledPrincipal); const appliedExtra = Math.min(extra, remaining);
    const principalPaid = scheduledPrincipal + appliedExtra; balance = Math.max(0, beginning - principalPaid);
    const pmi = homePrice > 0 && beginning / homePrice > 0.8 ? principal * (annualPmiRate / 100) / 12 : 0;
    rows.push({ number: index, date: addMonths(start, index - 1), beginning, payment: interest + principalPaid, principal: scheduledPrincipal, interest, extra: appliedExtra, balance, pmi });
    if (regular <= interest && !extra) break;
  }
  return rows;
}

export default function MortgageCalculatorClient() {
  const [homePrice, setHomePrice] = useState("400000"); const [down, setDown] = useState("20"); const [downMode, setDownMode] = useState<DownMode>("percent");
  const [rate, setRate] = useState("6.5"); const [term, setTerm] = useState("30"); const [tax, setTax] = useState("4800");
  const [insurance, setInsurance] = useState("1800"); const [hoa, setHoa] = useState("0"); const [pmiRate, setPmiRate] = useState("0.5");
  const [closing, setClosing] = useState("12000"); const [extra, setExtra] = useState("0"); const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [mode, setMode] = useState<ScheduleMode>("yearly"); const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const price = num(homePrice); const rawDown = num(down); const downPayment = Math.min(price, downMode === "percent" ? price * rawDown / 100 : rawDown);
    const principal = Math.max(0, price - downPayment); const months = Math.max(0, Math.round(num(term) * 12)); const annualRate = num(rate);
    const start = new Date(`${startDate || new Date().toISOString().slice(0, 10)}T12:00:00`); const additional = num(extra);
    const baseRows = schedule(principal, annualRate, months, 0, start, price, num(pmiRate)); const rows = schedule(principal, annualRate, months, additional, start, price, num(pmiRate));
    const sum = (items: Row[], key: "interest" | "pmi" | "payment") => items.reduce((total, row) => total + row[key], 0);
    const pi = monthlyPayment(principal, annualRate, months); const propertyTax = num(tax) / 12; const homeownersInsurance = num(insurance) / 12; const monthlyHoa = num(hoa);
    const initialPmi = rows[0]?.pmi ?? 0; const initialHousing = pi + propertyTax + homeownersInsurance + monthlyHoa + initialPmi;
    return { price, downPayment, principal, months, annualRate, rows, pi, propertyTax, homeownersInsurance, monthlyHoa, initialPmi, initialHousing,
      cashNeeded: downPayment + num(closing), totalInterest: sum(rows, "interest"), totalPmi: sum(rows, "pmi"),
      interestSaved: Math.max(0, sum(baseRows, "interest") - sum(rows, "interest")), monthsSaved: Math.max(0, baseRows.length - rows.length) };
  }, [homePrice, down, downMode, rate, term, tax, insurance, hoa, pmiRate, closing, extra, startDate]);

  const yearly = useMemo(() => { const groups = new Map<number, Row[]>(); result.rows.forEach((row) => groups.set(row.date.getFullYear(), [...(groups.get(row.date.getFullYear()) ?? []), row]));
    return [...groups.entries()].map(([year, rows]) => ({ year, payments: rows.reduce((s, r) => s + r.payment, 0), principal: rows.reduce((s, r) => s + r.principal + r.extra, 0), interest: rows.reduce((s, r) => s + r.interest, 0), pmi: rows.reduce((s, r) => s + r.pmi, 0), balance: rows.at(-1)?.balance ?? 0 })); }, [result.rows]);
  const valid = result.price > 0 && result.principal > 0 && result.months > 0; const payoff = result.rows.at(-1)?.date;

  async function copyResults() { const text = ["Numeravo Mortgage Calculator", `Home price: ${usd.format(result.price)}`, `Down payment: ${usd.format(result.downPayment)}`, `Loan amount: ${usd.format(result.principal)}`, `Principal and interest: ${usd.format(result.pi)}/month`, `Estimated initial monthly payment: ${usd.format(result.initialHousing)}`, `Total interest: ${usd.format(result.totalInterest)}`, `Estimated payoff: ${payoff ? monthYear.format(payoff) : "—"}`, `Interest saved with extra payments: ${usd.format(result.interestSaved)}`].join("\n"); await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  function csv() { const header = "Payment,Date,Beginning balance,Payment,Principal,Interest,Extra principal,PMI,Ending balance"; const lines = result.rows.map((r) => [r.number, r.date.toISOString().slice(0, 10), r.beginning.toFixed(2), r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.extra.toFixed(2), r.pmi.toFixed(2), r.balance.toFixed(2)].join(",")); const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "numeravo-mortgage-amortization.csv"; link.click(); URL.revokeObjectURL(url); }
  function reset() { setHomePrice("400000"); setDown("20"); setDownMode("percent"); setRate("6.5"); setTerm("30"); setTax("4800"); setInsurance("1800"); setHoa("0"); setPmiRate("0.5"); setClosing("12000"); setExtra("0"); }

  return <section className="grid gap-6 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
    <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><div className="flex justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#22C55E]">Mortgage details</p><h2 className="mt-2 text-2xl font-bold">Estimate your housing payment</h2></div><button type="button" onClick={reset} className="text-sm font-semibold text-[#A0AEC0] hover:text-white">Reset</button></div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Home price" value={homePrice} set={setHomePrice} prefix="$"/><label>
          <span className="text-sm text-[#A0AEC0]">
            Down payment
          </span>

          <div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#22C55E]">
            <input
              aria-label="Down payment"
              type="number"
              min="0"
              step="any"
              value={down}
              onChange={(event) => setDown(event.target.value)}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none"
            />

            <select
              aria-label="Down payment unit"
              value={downMode}
              onChange={(event) =>
                setDownMode(event.target.value as DownMode)
              }
              className="border-l border-[#1F2937] bg-[#0B0F19] px-3"
            >
              <option value="percent">%</option>
              <option value="dollars">$</option>
            </select>
          </div>

          <div className="mt-2 rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3">
            <span className="text-xs text-[#A0AEC0]">
              {downMode === "percent"
                ? "Down payment in dollars"
                : "Down payment percentage"}
            </span>

            <p className="mt-1 font-semibold text-[#4ADE80]">
              {downMode === "percent"
                ? usd.format(result.downPayment)
                : `${
                    result.price > 0
                      ? (
                          (result.downPayment / result.price) *
                          100
                        ).toFixed(2)
                      : "0.00"
                  }%`}
            </p>
          </div>
        </label>
        <Field label="Interest rate" value={rate} set={setRate} suffix="%"/><Field label="Loan term" value={term} set={setTerm} suffix="years"/><Field label="Annual property tax" value={tax} set={setTax} prefix="$"/><Field label="Annual home insurance" value={insurance} set={setInsurance} prefix="$"/><Field label="Monthly HOA dues" value={hoa} set={setHoa} prefix="$"/><Field label="Annual PMI rate" value={pmiRate} set={setPmiRate} suffix="%"/><Field label="Estimated closing costs" value={closing} set={setClosing} prefix="$"/><Field label="Extra monthly principal" value={extra} set={setExtra} prefix="$"/><label className="sm:col-span-2"><span className="text-sm text-[#A0AEC0]">First payment date</span><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 outline-none focus:border-[#22C55E]"/></label></div>
      <p className="mt-6 text-xs leading-5 text-[#718096]">PMI is estimated from the original loan amount and removed when the scheduled beginning balance reaches 80% of the entered home price. Actual cancellation rules vary.</p></div>
    <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8" aria-live="polite"><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#22C55E]">Estimated results</p>{!valid ? <p className="mt-6 text-[#A0AEC0]">Enter a valid home price, down payment, and loan term.</p> : <><p className="mt-4 text-sm text-[#A0AEC0]">Initial monthly housing payment</p><p className="mt-1 text-4xl font-bold">{usd.format(result.initialHousing)}</p><div className="mt-6 space-y-3 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><Line label="Principal and interest" value={usd.format(result.pi)}/><Line label="Property tax" value={usd.format(result.propertyTax)}/><Line label="Homeowners insurance" value={usd.format(result.homeownersInsurance)}/><Line label="HOA dues" value={usd.format(result.monthlyHoa)}/><Line label="Initial PMI" value={usd.format(result.initialPmi)}/></div><div className="mt-5 grid grid-cols-2 gap-3"><Card label="Loan amount" value={usd.format(result.principal)}/><Card label="Cash needed" value={usd.format(result.cashNeeded)}/><Card label="Total interest" value={usd.format(result.totalInterest)}/><Card label="Estimated payoff" value={payoff ? monthYear.format(payoff) : "—"}/></div>{num(extra) > 0 && <div className="mt-5 rounded-2xl border border-[#14532D] bg-[#052E16]/40 p-5 text-sm leading-6 text-[#BBF7D0]">Extra principal could save approximately <strong>{usd.format(result.interestSaved)}</strong> in interest and repay the mortgage <strong>{result.monthsSaved} months</strong> sooner.</div>}<div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyResults} className="rounded-xl bg-[#22C55E] px-4 py-3 font-semibold text-[#07120A]">{copied ? "Copied" : "Copy results"}</button><button type="button" onClick={csv} className="rounded-xl border border-[#374151] px-4 py-3 font-semibold hover:border-[#22C55E]">Download CSV</button></div></>}</div>
    {valid && <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8 lg:col-span-2"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#22C55E]">Amortization</p><h2 className="mt-2 text-2xl font-bold">Mortgage payment schedule</h2></div><div className="flex rounded-xl border border-[#1F2937] p-1"><Toggle active={mode === "yearly"} click={() => setMode("yearly")}>Yearly</Toggle><Toggle active={mode === "monthly"} click={() => setMode("monthly")}>Monthly</Toggle></div></div><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-[#374151] text-[#A0AEC0]"><tr>{mode === "yearly" ? <><Th>Year</Th><Th>Payments</Th><Th>Principal</Th><Th>Interest</Th><Th>PMI</Th><Th>Balance</Th></> : <><Th>#</Th><Th>Date</Th><Th>Payment</Th><Th>Principal</Th><Th>Interest</Th><Th>Extra</Th><Th>PMI</Th><Th>Balance</Th></>}</tr></thead><tbody>{mode === "yearly" ? yearly.map((r) => <tr key={r.year} className="border-b border-[#1F2937]"><Td>{r.year}</Td><Td>{usd.format(r.payments)}</Td><Td>{usd.format(r.principal)}</Td><Td>{usd.format(r.interest)}</Td><Td>{usd.format(r.pmi)}</Td><Td>{usd.format(r.balance)}</Td></tr>) : result.rows.map((r) => <tr key={r.number} className="border-b border-[#1F2937]"><Td>{r.number}</Td><Td>{monthYear.format(r.date)}</Td><Td>{usd.format(r.payment)}</Td><Td>{usd.format(r.principal)}</Td><Td>{usd.format(r.interest)}</Td><Td>{usd.format(r.extra)}</Td><Td>{usd.format(r.pmi)}</Td><Td>{usd.format(r.balance)}</Td></tr>)}</tbody></table></div></div>}
  </section>;
}

function Field({ label, value, set, prefix, suffix }: { label: string; value: string; set: (value: string) => void; prefix?: string; suffix?: string }) { return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#22C55E]">{prefix && <span className="px-3 py-3 text-[#A0AEC0]">{prefix}</span>}<input aria-label={label} type="number" min="0" step="any" value={value} onChange={(e) => set(e.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none"/>{suffix && <span className="px-3 py-3 text-[#A0AEC0]">{suffix}</span>}</div></label>; }
function Line({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-3"><span className="text-[#A0AEC0]">{label}</span><strong>{value}</strong></div>; }
function Card({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4"><p className="text-xs text-[#A0AEC0]">{label}</p><p className="mt-2 font-bold">{value}</p></div>; }
function Toggle({ active, click, children }: { active: boolean; click: () => void; children: React.ReactNode }) { return <button type="button" onClick={click} className={`rounded-lg px-4 py-2 text-sm font-semibold ${active ? "bg-[#22C55E] text-[#07120A]" : "text-[#A0AEC0]"}`}>{children}</button>; }
function Th({ children }: { children: React.ReactNode }) { return <th className="px-3 py-3 font-medium">{children}</th>; }
function Td({ children }: { children: React.ReactNode }) { return <td className="px-3 py-3">{children}</td>; }
