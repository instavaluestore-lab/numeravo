"use client";

import { useMemo, useState } from "react";

type Shape = "rectangle" | "circle";

export default function RiverRockCalculatorClient() {
  const [shape, setShape] = useState<Shape>("rectangle");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("8");
  const [diameter, setDiameter] = useState("10");
  const [depth, setDepth] = useState("3");
  const [wastePercent, setWastePercent] = useState("10");
  const [tonsPerCubicYard, setTonsPerCubicYard] = useState("1.35");
  const [pricePerTon, setPricePerTon] = useState("95");
  const [deliveryFee, setDeliveryFee] = useState("85");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const depthFeet = toNumber(depth) / 12;
    const waste = toNumber(wastePercent) / 100;

    const area =
      shape === "circle"
        ? Math.PI * Math.pow(toNumber(diameter) / 2, 2)
        : toNumber(length) * toNumber(width);

    const cubicFeet = area * depthFeet;
    const cubicYards = cubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + waste);
    const tons = cubicYardsWithWaste * toNumber(tonsPerCubicYard);
    const materialCost = tons * toNumber(pricePerTon);
    const totalCost = materialCost + toNumber(deliveryFee);
    const costPerSquareFoot = area > 0 ? totalCost / area : 0;

    return {
      area,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      tons,
      materialCost,
      totalCost,
      costPerSquareFoot,
      truckLoads: tons > 0 ? Math.ceil(tons / 10) : 0,
    };
  }, [
    shape,
    length,
    width,
    diameter,
    depth,
    wastePercent,
    tonsPerCubicYard,
    pricePerTon,
    deliveryFee,
  ]);

  async function copyResults() {
    const sizeText =
      shape === "circle"
        ? `Diameter: ${diameter} ft`
        : `Length × Width: ${length} ft × ${width} ft`;

    const resultText = `Numeravo River Rock Estimate
Shape: ${shape}
${sizeText}
Depth: ${depth} in
Waste: ${wastePercent}%
Area: ${formatNumber(results.area)} sq ft
Cubic Yards With Waste: ${formatNumber(results.cubicYardsWithWaste)} yd³
Estimated Tons: ${formatNumber(results.tons)}
Material Cost: ${formatCurrency(results.materialCost)}
Delivery Fee: ${formatCurrency(toNumber(deliveryFee))}
Estimated Total: ${formatCurrency(results.totalCost)}
Cost Per Sq Ft: ${formatCurrency(results.costPerSquareFoot)}
Standard Truckloads: ${results.truckLoads}`;

    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              River Rock Calculator
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Estimate river rock cubic yards, tons, and cost
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
              Calculate river rock for landscaping beds, dry creek beds,
              drainage areas, decorative borders, walkways, and ground cover.
            </p>
          </div>

          <button
            type="button"
            onClick={copyResults}
            className="rounded-xl border border-[#1F2937] px-4 py-2 text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
          >
            {copied ? "Copied" : "Copy Results"}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setShape("rectangle")}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              shape === "rectangle"
                ? "border-[#F97316] bg-[#0B0F19] text-white"
                : "border-[#1F2937] text-[#A0AEC0] hover:border-[#F97316] hover:text-white"
            }`}
          >
            Rectangle / Square
          </button>

          <button
            type="button"
            onClick={() => setShape("circle")}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              shape === "circle"
                ? "border-[#F97316] bg-[#0B0F19] text-white"
                : "border-[#1F2937] text-[#A0AEC0] hover:border-[#F97316] hover:text-white"
            }`}
          >
            Circle
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {shape === "circle" ? (
            <NumberInput label="Diameter" value={diameter} onChange={setDiameter} suffix="ft" />
          ) : (
            <>
              <NumberInput label="Length" value={length} onChange={setLength} suffix="ft" />
              <NumberInput label="Width" value={width} onChange={setWidth} suffix="ft" />
            </>
          )}

          <NumberInput label="Depth" value={depth} onChange={setDepth} suffix="in" />
          <NumberInput label="Waste Percentage" value={wastePercent} onChange={setWastePercent} suffix="%" />
          <NumberInput label="Tons Per Cubic Yard" value={tonsPerCubicYard} onChange={setTonsPerCubicYard} suffix="tons / yd³" />
          <NumberInput label="Price Per Ton" value={pricePerTon} onChange={setPricePerTon} prefix="$" suffix="/ ton" />
          <NumberInput label="Delivery Fee" value={deliveryFee} onChange={setDeliveryFee} prefix="$" />
        </div>

        <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">Common river rock depths</p>

          <div className="mt-3 grid gap-2 text-sm text-[#A0AEC0] sm:grid-cols-2">
            <button type="button" onClick={() => setDepth("2")} className="rounded-lg border border-[#1F2937] px-3 py-2 text-left transition hover:border-[#F97316] hover:text-white">
              Decorative cover: 2 in
            </button>
            <button type="button" onClick={() => setDepth("3")} className="rounded-lg border border-[#1F2937] px-3 py-2 text-left transition hover:border-[#F97316] hover:text-white">
              Landscape beds: 3 in
            </button>
            <button type="button" onClick={() => setDepth("4")} className="rounded-lg border border-[#1F2937] px-3 py-2 text-left transition hover:border-[#F97316] hover:text-white">
              Dry creek bed: 4 in
            </button>
            <button type="button" onClick={() => setDepth("6")} className="rounded-lg border border-[#1F2937] px-3 py-2 text-left transition hover:border-[#F97316] hover:text-white">
              Drainage area: 6 in
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold">Results</h2>

        <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">River rock needed</p>

          <p className="mt-2 text-4xl font-bold text-[#F97316]">
            {formatNumber(results.cubicYardsWithWaste)} yd³
          </p>

          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatNumber(results.tons)} tons estimated
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <ResultRow label="Project Area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Cubic Feet" value={`${formatNumber(results.cubicFeet)} ft³`} />
          <ResultRow label="Cubic Yards Before Waste" value={`${formatNumber(results.cubicYards)} yd³`} />
          <ResultRow label="Cubic Yards With Waste" value={`${formatNumber(results.cubicYardsWithWaste)} yd³`} highlight />
          <ResultRow label="Estimated Tons" value={`${formatNumber(results.tons)} tons`} highlight />
          <ResultRow label="Material Cost" value={formatCurrency(results.materialCost)} />
          <ResultRow label="Delivery Fee" value={formatCurrency(toNumber(deliveryFee))} />
          <ResultRow label="Estimated Total" value={formatCurrency(results.totalCost)} highlight />
          <ResultRow label="Cost Per Square Foot" value={formatCurrency(results.costPerSquareFoot)} />
          <ResultRow label="Standard Dump Truck Loads" value={`${results.truckLoads}`} />
        </div>

        <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm leading-6 text-[#A0AEC0]">
            River rock is often decorative and may cost more than common gravel.
            Confirm stone size, density, minimum delivery, and color availability
            with your local supplier.
          </p>
        </div>
      </div>
    </section>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>

      <div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F19]">
        {prefix ? (
          <span className="flex items-center border-r border-[#1F2937] px-3 text-sm text-[#A0AEC0]">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#A0AEC0]"
        />

        {suffix ? (
          <span className="flex items-center border-l border-[#1F2937] px-3 text-sm text-[#A0AEC0]">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span
        className={`text-right text-sm font-semibold ${
          highlight ? "text-[#F97316]" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}
