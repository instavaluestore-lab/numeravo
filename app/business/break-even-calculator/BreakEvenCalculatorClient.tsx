"use client";

import { useMemo, useState } from "react";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const read = (value: string) => Math.max(0, Number(value) || 0);

type Scenario = { price: number; variable: number; contribution: number; ratio: number; breakEvenUnits: number; breakEvenRevenue: number; targetUnits: number };

function calculate(fixed: number, price: number, variable: number, target: number): Scenario {
  const contribution = price - variable;
  const ratio = price > 0 ? contribution / price : 0;
  return {
    price,
    variable,
    contribution,
    ratio,
    breakEvenUnits: contribution > 0 ? Math.ceil(fixed / contribution) : Infinity,
    breakEvenRevenue: ratio > 0 ? fixed / ratio : Infinity,
    targetUnits: contribution > 0 ? Math.ceil((fixed + target) / contribution) : Infinity,
  };
}

export default function BreakEvenCalculatorClient() {
  const [fixedCosts, setFixedCosts] = useState("10000");
  const [sellingPrice, setSellingPrice] = useState("100");
  const [variableCost, setVariableCost] = useState("60");
  const [currentUnits, setCurrentUnits] = useState("300");
  const [targetProfit, setTargetProfit] = useState("5000");
  const [capacity, setCapacity] = useState("500");
  const [periodDays, setPeriodDays] = useState("30");
  const [compare, setCompare] = useState(false);
  const [comparePrice, setComparePrice] = useState("110");
  const [compareVariable, setCompareVariable] = useState("60");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const fixed = read(fixedCosts);
    const units = Math.floor(read(currentUnits));
    const cap = Math.floor(read(capacity));
    const days = Math.max(1, Math.floor(read(periodDays)));
    const target = read(targetProfit);
    const base = calculate(fixed, read(sellingPrice), read(variableCost), target);
    const alternate = calculate(fixed, read(comparePrice), read(compareVariable), target);
    const currentProfit = units * base.contribution - fixed;
    const safetyUnits = Number.isFinite(base.breakEvenUnits) ? units - base.breakEvenUnits : -Infinity;
    return {
      fixed, units, cap, days, target, base, alternate, currentProfit, safetyUnits,
      safetyPercent: units > 0 && Number.isFinite(safetyUnits) ? (safetyUnits / units) * 100 : 0,
      capacityEnough: cap <= 0 || (!Number.isFinite(base.targetUnits) ? false : base.targetUnits <= cap),
    };
  }, [fixedCosts, sellingPrice, variableCost, currentUnits, targetProfit, capacity, periodDays, comparePrice, compareVariable]);

  const valid = result.base.price > result.base.variable && result.base.price > 0;
  const reset = () => { setFixedCosts("10000"); setSellingPrice("100"); setVariableCost("60"); setCurrentUnits("300"); setTargetProfit("5000"); setCapacity("500"); setPeriodDays("30"); setCompare(false); setComparePrice("110"); setCompareVariable("60"); };
  const copyResults = async () => {
    await navigator.clipboard.writeText([
      "Numeravo Break-Even Calculator", `Fixed costs: ${usd.format(result.fixed)}`,
      `Contribution margin per unit: ${usd.format(result.base.contribution)}`,
      `Break-even units: ${Number.isFinite(result.base.breakEvenUnits) ? result.base.breakEvenUnits : "Not available"}`,
      `Break-even revenue: ${Number.isFinite(result.base.breakEvenRevenue) ? usd.format(result.base.breakEvenRevenue) : "Not available"}`,
      `Units for target profit: ${Number.isFinite(result.base.targetUnits) ? result.base.targetUnits : "Not available"}`,
      `Estimated current profit: ${usd.format(result.currentProfit)}`,
    ].join("\n"));
    setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  };
  const downloadCsv = () => {
    const rows = [["Metric", "Value"], ["Fixed costs", result.fixed], ["Selling price per unit", result.base.price], ["Variable cost per unit", result.base.variable], ["Contribution per unit", result.base.contribution], ["Contribution margin ratio", result.base.ratio], ["Break-even units", result.base.breakEvenUnits], ["Break-even revenue", result.base.breakEvenRevenue], ["Target profit", result.target], ["Units for target profit", result.base.targetUnits], ["Current units", result.units], ["Estimated current profit", result.currentProfit], ["Margin of safety units", result.safetyUnits], ["Margin of safety percent", result.safetyPercent]];
    const blob = new Blob([rows.map(row => row.join(",")).join("\n")], { type: "text/csv" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "numeravo-break-even-analysis.csv"; link.click(); URL.revokeObjectURL(link.href);
  };

  return <section className="space-y-6">
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <h2 className="text-2xl font-bold">Enter your unit economics</h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">Use one consistent period—such as a month, quarter, project, or event—for fixed costs, current sales, capacity, and target profit.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Fixed costs for period" value={fixedCosts} set={setFixedCosts} prefix="$" />
          <Field label="Selling price per unit" value={sellingPrice} set={setSellingPrice} prefix="$" />
          <Field label="Variable cost per unit" value={variableCost} set={setVariableCost} prefix="$" />
          <Field label="Current or forecast units" value={currentUnits} set={setCurrentUnits} />
          <Field label="Target profit" value={targetProfit} set={setTargetProfit} prefix="$" />
          <Field label="Maximum period capacity" value={capacity} set={setCapacity} />
          <Field label="Operating days in period" value={periodDays} set={setPeriodDays} suffix="days" />
        </div>
        <label className="mt-6 flex items-center gap-3 text-sm"><input type="checkbox" checked={compare} onChange={event => setCompare(event.target.checked)} className="h-4 w-4 accent-[#06B6D4]" />Compare another price or variable-cost scenario</label>
        {compare && <div className="mt-5 grid gap-5 rounded-2xl border border-[#164E63] bg-[#083344]/30 p-5 sm:grid-cols-2"><Field label="Comparison selling price" value={comparePrice} set={setComparePrice} prefix="$" /><Field label="Comparison variable cost" value={compareVariable} set={setCompareVariable} prefix="$" /></div>}
        <button type="button" onClick={reset} className="mt-6 text-sm font-semibold text-[#22D3EE] hover:text-white">Reset calculator</button>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#22D3EE]">Break-even result</p>
        {!valid ? <div className="mt-6 rounded-2xl border border-red-900 bg-red-950/30 p-5 text-red-200">Selling price must be greater than variable cost. Otherwise, each additional sale cannot contribute toward fixed costs.</div> : <>
          <p className="mt-4 text-sm text-[#A0AEC0]">Units needed to break even</p>
          <p className="mt-1 text-4xl font-bold">{num.format(result.base.breakEvenUnits)}</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">Approximately {num.format(result.base.breakEvenUnits / result.days)} units per operating day.</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Card label="Break-even revenue" value={usd.format(result.base.breakEvenRevenue)} />
            <Card label="Contribution / unit" value={usd.format(result.base.contribution)} />
            <Card label="Contribution margin ratio" value={`${num.format(result.base.ratio * 100)}%`} />
            <Card label="Units for target profit" value={num.format(result.base.targetUnits)} />
            <Card label="Current estimated profit" value={usd.format(result.currentProfit)} />
            <Card label="Margin of safety" value={`${num.format(result.safetyUnits)} units (${num.format(result.safetyPercent)}%)`} />
          </div>
          <div className={`mt-5 rounded-2xl border p-4 text-sm ${result.capacityEnough ? "border-cyan-900 bg-cyan-950/30 text-cyan-100" : "border-amber-900 bg-amber-950/30 text-amber-100"}`}>{result.capacityEnough ? `The target-profit volume fits within the entered capacity of ${num.format(result.cap)} units.` : `The target requires ${num.format(result.base.targetUnits)} units, exceeding the entered capacity of ${num.format(result.cap)} units. Review price, costs, capacity, or the profit target.`}</div>
        </>}
        <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyResults} disabled={!valid} className="rounded-xl bg-[#06B6D4] px-4 py-3 font-semibold text-[#042F3A] disabled:cursor-not-allowed disabled:opacity-50">{copied ? "Copied" : "Copy results"}</button><button type="button" onClick={downloadCsv} disabled={!valid} className="rounded-xl border border-[#374151] px-4 py-3 font-semibold hover:border-[#06B6D4] disabled:cursor-not-allowed disabled:opacity-50">Download CSV</button></div>
      </div>
    </div>

    {compare && valid && result.alternate.contribution > 0 && <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Scenario comparison</h2><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="text-[#A0AEC0]"><tr className="border-b border-[#1F2937]"><th className="py-3">Scenario</th><th>Price</th><th>Variable cost</th><th>Contribution</th><th>Break-even units</th><th>Target-profit units</th></tr></thead><tbody><ScenarioRow label="Current" value={result.base} /><ScenarioRow label="Comparison" value={result.alternate} /></tbody></table></div></div>}
  </section>;
}

function Field({ label, value, set, prefix, suffix }: { label: string; value: string; set: (value: string) => void; prefix?: string; suffix?: string }) { return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#06B6D4]">{prefix && <span className="px-3 py-3 text-[#A0AEC0]">{prefix}</span>}<input type="number" min="0" step="any" value={value} onChange={event => set(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-white outline-none" />{suffix && <span className="px-3 py-3 text-[#A0AEC0]">{suffix}</span>}</div></label>; }
function Card({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4"><p className="text-xs text-[#A0AEC0]">{label}</p><p className="mt-2 font-bold">{value}</p></div>; }
function ScenarioRow({ label, value }: { label: string; value: Scenario }) { return <tr className="border-b border-[#1F2937]"><th className="py-4 font-semibold text-white">{label}</th><td>{usd.format(value.price)}</td><td>{usd.format(value.variable)}</td><td>{usd.format(value.contribution)}</td><td>{num.format(value.breakEvenUnits)}</td><td>{num.format(value.targetUnits)}</td></tr>; }
