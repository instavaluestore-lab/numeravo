"use client";

import { useMemo, useState } from "react";

type Mode = "future" | "required";
type Timing = "beginning" | "end";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const n = (value: string) => Math.max(0, Number(value) || 0);

function project(start: number, monthly: number, annualRate: number, years: number, timing: Timing, annualIncrease: number, monthlyFee: number) {
  const months = Math.max(0, Math.round(years * 12));
  const rate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  let balance = start;
  let deposits = start;
  let contribution = monthly;
  const rows: { year: number; deposits: number; interest: number; balance: number }[] = [];
  for (let month = 1; month <= months; month++) {
    if (month > 1 && (month - 1) % 12 === 0) contribution *= 1 + annualIncrease / 100;
    if (timing === "beginning") { balance += contribution; deposits += contribution; }
    balance *= 1 + rate;
    balance = Math.max(0, balance - monthlyFee);
    if (timing === "end") { balance += contribution; deposits += contribution; }
    if (month % 12 === 0 || month === months) rows.push({ year: Math.ceil(month / 12), deposits, interest: balance - deposits, balance });
  }
  return { balance, deposits, interest: balance - deposits, rows };
}

function requiredMonthly(start: number, goal: number, annualRate: number, years: number, timing: Timing, annualIncrease: number, fee: number) {
  if (years <= 0 || goal <= start) return 0;
  let low = 0;
  let high = Math.max(goal / (years * 12), 100);
  while (project(start, high, annualRate, years, timing, annualIncrease, fee).balance < goal && high < 1e9) high *= 2;
  for (let i = 0; i < 70; i++) {
    const mid = (low + high) / 2;
    if (project(start, mid, annualRate, years, timing, annualIncrease, fee).balance >= goal) high = mid;
    else low = mid;
  }
  return high;
}

export default function SavingsCalculatorClient() {
  const [mode, setMode] = useState<Mode>("required");
  const [start, setStart] = useState("5000");
  const [goal, setGoal] = useState("50000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("3.5");
  const [years, setYears] = useState("5");
  const [timing, setTiming] = useState<Timing>("end");
  const [increase, setIncrease] = useState("0");
  const [fee, setFee] = useState("0");
  const [inflation, setInflation] = useState("2.5");
  const [advanced, setAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const values = { start: n(start), goal: n(goal), rate: n(rate), years: n(years), increase: n(increase), fee: n(fee), inflation: n(inflation) };
    const needed = mode === "required" ? requiredMonthly(values.start, values.goal, values.rate, values.years, timing, values.increase, values.fee) : n(monthly);
    const base = project(values.start, needed, values.rate, values.years, timing, values.increase, values.fee);
    const lower = project(values.start, needed * .9, values.rate, values.years, timing, values.increase, values.fee).balance;
    const higher = project(values.start, needed * 1.1, values.rate, values.years, timing, values.increase, values.fee).balance;
    const real = base.balance / Math.pow(1 + values.inflation / 100, values.years || 0);
    return { ...values, needed, ...base, lower, higher, real, shortfall: Math.max(0, values.goal - base.balance), surplus: Math.max(0, base.balance - values.goal), progress: values.goal > 0 ? Math.min(100, base.balance / values.goal * 100) : 0 };
  }, [mode, start, goal, monthly, rate, years, timing, increase, fee, inflation]);

  const copy = async () => {
    await navigator.clipboard.writeText(["Numeravo Savings Calculator", `Required monthly savings: ${usd.format(result.needed)}`, `Projected balance: ${usd.format(result.balance)}`, `Savings goal: ${usd.format(result.goal)}`, `Total contributions: ${usd.format(result.deposits)}`, `Estimated interest: ${usd.format(result.interest)}`].join("\n"));
    setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  };
  const csv = () => {
    const content = ["Year,Total contributions,Interest earned,Projected balance", ...result.rows.map(r => `${r.year},${r.deposits.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}`)].join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([content], { type: "text/csv" })); a.download = "numeravo-savings-projection.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  return <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
    <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
      <div className="grid grid-cols-2 rounded-xl bg-[#0B0F19] p-1">
        <ModeButton active={mode === "required"} onClick={() => setMode("required")}>Required monthly savings</ModeButton>
        <ModeButton active={mode === "future"} onClick={() => setMode("future")}>Future savings</ModeButton>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Input label="Current savings" value={start} set={setStart} prefix="$" />
        <Input label="Savings goal" value={goal} set={setGoal} prefix="$" />
        {mode === "future" && <Input label="Monthly contribution" value={monthly} set={setMonthly} prefix="$" />}
        <Input label="Annual interest rate or APY" value={rate} set={setRate} suffix="%" />
        <Input label="Time to save" value={years} set={setYears} suffix="years" />
        <label><span className="text-sm text-[#A0AEC0]">Contribution timing</span><select value={timing} onChange={e => setTiming(e.target.value as Timing)} className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3"><option value="end">End of month</option><option value="beginning">Beginning of month</option></select></label>
      </div>
      <button type="button" onClick={() => setAdvanced(v => !v)} className="mt-6 text-sm font-semibold text-[#4ADE80]">{advanced ? "Hide" : "Show"} advanced options</button>
      {advanced && <div className="mt-5 grid gap-5 sm:grid-cols-3"><Input label="Annual contribution increase" value={increase} set={setIncrease} suffix="%" /><Input label="Monthly account fee" value={fee} set={setFee} prefix="$" /><Input label="Estimated inflation" value={inflation} set={setInflation} suffix="%" /></div>}
      <p className="mt-6 text-xs leading-5 text-[#718096]">Use an estimated rate for planning. Savings rates can change, and actual account fees, taxes, deposit timing, and rounding may affect results.</p>
    </div>

    <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#22C55E]">Estimated savings plan</p>
      <p className="mt-5 text-sm text-[#A0AEC0]">{mode === "required" ? "Required monthly contribution" : "Projected savings balance"}</p>
      <p className="mt-1 text-4xl font-bold">{usd.format(mode === "required" ? result.needed : result.balance)}</p>
      {mode === "required" && <p className="mt-2 text-sm text-[#A0AEC0]">About {usd.format(result.needed * 12 / 52)} per week</p>}
      <div className="mt-7"><div className="flex justify-between text-sm"><span>Goal progress</span><span>{num.format(result.progress)}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-[#0B0F19]"><div className="h-full bg-[#22C55E]" style={{ width: `${result.progress}%` }} /></div></div>
      <div className="mt-6 grid grid-cols-2 gap-3"><Card label="Projected balance" value={usd.format(result.balance)} /><Card label={result.shortfall ? "Goal shortfall" : "Goal surplus"} value={usd.format(result.shortfall || result.surplus)} /><Card label="Total contributions" value={usd.format(result.deposits)} /><Card label="Interest earned" value={usd.format(result.interest)} /><Card label="Inflation-adjusted value" value={usd.format(result.real)} /><Card label="Savings goal" value={usd.format(result.goal)} /></div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={copy} className="rounded-xl bg-[#22C55E] px-4 py-3 font-semibold text-[#07120A]">{copied ? "Copied" : "Copy results"}</button><button onClick={csv} className="rounded-xl border border-[#374151] px-4 py-3 font-semibold hover:border-[#22C55E]">Download CSV</button></div>
    </div>

    <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8 lg:col-span-2">
      <h2 className="text-2xl font-bold">See how changing your contribution affects savings</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3"><Scenario label="Save 10% less" monthly={result.needed * .9} balance={result.lower} /><Scenario label="Current plan" monthly={result.needed} balance={result.balance} highlight /><Scenario label="Save 10% more" monthly={result.needed * 1.1} balance={result.higher} /></div>
      <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="text-[#A0AEC0]"><tr><th className="pb-3">Year</th><th>Total contributions</th><th>Interest earned</th><th>Projected balance</th></tr></thead><tbody>{result.rows.map(r => <tr key={r.year} className="border-t border-[#1F2937]"><td className="py-3">{r.year}</td><td>{usd.format(r.deposits)}</td><td>{usd.format(r.interest)}</td><td className="font-semibold">{usd.format(r.balance)}</td></tr>)}</tbody></table></div>
    </div>
  </section>;
}

function Input({ label, value, set, prefix, suffix }: { label: string; value: string; set: (v: string) => void; prefix?: string; suffix?: string }) { return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#22C55E]">{prefix && <span className="px-3 py-3 text-[#A0AEC0]">{prefix}</span>}<input type="number" min="0" step="any" value={value} onChange={e => set(e.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none" />{suffix && <span className="px-3 py-3 text-sm text-[#A0AEC0]">{suffix}</span>}</div></label>; }
function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} className={`rounded-lg px-3 py-3 text-sm font-semibold ${active ? "bg-[#22C55E] text-[#07120A]" : "text-[#A0AEC0]"}`}>{children}</button>; }
function Card({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4"><p className="text-xs text-[#A0AEC0]">{label}</p><p className="mt-1 font-bold">{value}</p></div>; }
function Scenario({ label, monthly, balance, highlight }: { label: string; monthly: number; balance: number; highlight?: boolean }) { return <div className={`rounded-2xl border p-5 ${highlight ? "border-[#22C55E] bg-[#052E16]/30" : "border-[#1F2937] bg-[#0B0F19]"}`}><p className="text-sm text-[#A0AEC0]">{label}</p><p className="mt-2 text-xl font-bold">{usd.format(monthly)}/month</p><p className="mt-2 text-sm">Projected: {usd.format(balance)}</p></div>; }
