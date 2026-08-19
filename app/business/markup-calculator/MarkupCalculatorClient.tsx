"use client";

import { useMemo, useState } from "react";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const pct = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const number = (value: string) => Math.max(0, Number(value) || 0);

export default function MarkupCalculatorClient() {
  const [cost, setCost] = useState("60");
  const [markup, setMarkup] = useState("40");
  const [quantity, setQuantity] = useState("1");
  const [fixedFee, setFixedFee] = useState("0");
  const [percentFee, setPercentFee] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const c = number(cost);
    const m = number(markup) / 100;
    const q = Math.max(1, Math.floor(number(quantity)));
    const feeRate = Math.min(99.99, number(percentFee)) / 100;
    const discountRate = Math.min(100, number(discount)) / 100;
    const listPrice = c * (1 + m);
    const sellingPrice = listPrice * (1 - discountRate);
    const fees = sellingPrice * feeRate + number(fixedFee);
    const netProfit = sellingPrice - c - fees;
    const grossProfit = sellingPrice - c;
    return {
      c, q, listPrice, sellingPrice, fees, grossProfit, netProfit,
      margin: sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0,
      netMargin: sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0,
      breakEven: feeRate < 1 ? (c + number(fixedFee)) / (1 - feeRate) : Infinity,
    };
  }, [cost, markup, quantity, fixedFee, percentFee, discount]);

  const reset = () => { setCost("60"); setMarkup("40"); setQuantity("1"); setFixedFee("0"); setPercentFee("0"); setDiscount("0"); };
  const copy = async () => {
    await navigator.clipboard.writeText([
      "Numeravo Markup Calculator", `Cost: ${usd.format(result.c)}`,
      `Markup: ${pct.format(number(markup))}%`, `Selling price: ${usd.format(result.sellingPrice)}`,
      `Gross margin: ${pct.format(result.margin)}%`, `Profit after fees: ${usd.format(result.netProfit)}`,
    ].join("\n"));
    setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  };

  const downloadCsv = () => {
    const rows = [["Metric", "Value"], ["Unit cost", result.c], ["Markup percent", number(markup)], ["List price", result.listPrice], ["Selling price", result.sellingPrice], ["Gross margin percent", result.margin], ["Fees", result.fees], ["Net profit", result.netProfit], ["Quantity", result.q]];
    const blob = new Blob([rows.map(row => row.join(",")).join("\n")], { type: "text/csv" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "numeravo-markup-calculation.csv"; link.click(); URL.revokeObjectURL(link.href);
  };

  return <section className="grid gap-6 lg:grid-cols-2">
    <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
      <h2 className="text-2xl font-bold">Price an item using markup</h2>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">Enter your complete unit cost and desired markup. Add transaction fees and a proposed discount to test the real profit before quoting or publishing a price.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Unit cost" value={cost} set={setCost} prefix="$" />
        <Field label="Markup on cost" value={markup} set={setMarkup} suffix="%" />
        <Field label="Quantity" value={quantity} set={setQuantity} />
        <Field label="Test a discount" value={discount} set={setDiscount} suffix="%" />
        <Field label="Fixed fee per unit" value={fixedFee} set={setFixedFee} prefix="$" />
        <Field label="Percentage fee" value={percentFee} set={setPercentFee} suffix="%" />
      </div>
      <button type="button" onClick={reset} className="mt-6 text-sm font-semibold text-[#22D3EE] hover:text-white">Reset calculator</button>
    </div>

    <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#22D3EE]">Pricing result</p>
      <p className="mt-4 text-sm text-[#A0AEC0]">Recommended selling price</p>
      <p className="mt-1 text-4xl font-bold">{usd.format(result.sellingPrice)}</p>
      {number(discount) > 0 && <p className="mt-2 text-sm text-[#A0AEC0]">List price before discount: {usd.format(result.listPrice)}</p>}
      <div className="mt-7 grid grid-cols-2 gap-3">
        <Card label="Gross profit / unit" value={usd.format(result.grossProfit)} />
        <Card label="Equivalent margin" value={`${pct.format(result.margin)}%`} />
        <Card label="Fees / unit" value={usd.format(result.fees)} />
        <Card label="Profit after fees" value={usd.format(result.netProfit)} />
        <Card label="Margin after fees" value={`${pct.format(result.netMargin)}%`} />
        <Card label="Break-even price" value={Number.isFinite(result.breakEven) ? usd.format(result.breakEven) : "Not available"} />
      </div>
      <div className={`mt-5 rounded-2xl border p-4 text-sm ${result.netProfit < 0 ? "border-red-900 bg-red-950/30 text-red-200" : "border-cyan-900 bg-cyan-950/30 text-cyan-100"}`}>
        {result.netProfit < 0 ? "This scenario loses money after fees." : `For ${result.q} units: ${usd.format(result.sellingPrice * result.q)} revenue and ${usd.format(result.netProfit * result.q)} profit after fees.`}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={copy} className="rounded-xl bg-[#06B6D4] px-4 py-3 font-semibold text-[#042F3A]">{copied ? "Copied" : "Copy results"}</button>
        <button type="button" onClick={downloadCsv} className="rounded-xl border border-[#374151] px-4 py-3 font-semibold hover:border-[#06B6D4]">Download CSV</button>
      </div>
    </div>
  </section>;
}

function Field({ label, value, set, prefix, suffix }: { label: string; value: string; set: (value: string) => void; prefix?: string; suffix?: string }) {
  return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#06B6D4]">{prefix && <span className="px-3 py-3 text-[#A0AEC0]">{prefix}</span>}<input type="number" min="0" step="any" value={value} onChange={e => set(e.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-white outline-none" />{suffix && <span className="px-3 py-3 text-[#A0AEC0]">{suffix}</span>}</div></label>;
}

function Card({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4"><p className="text-xs text-[#A0AEC0]">{label}</p><p className="mt-2 font-bold">{value}</p></div>; }
