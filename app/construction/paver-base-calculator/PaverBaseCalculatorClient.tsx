"use client";

import { useMemo, useState } from "react";

export default function PaverBaseCalculatorClient() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("12");
  const [baseDepth, setBaseDepth] = useState("6");
  const [sandDepth, setSandDepth] = useState("1");
  const [wastePercent, setWastePercent] = useState("10");
  const [baseTonsPerCubicYard, setBaseTonsPerCubicYard] = useState("1.5");
  const [sandTonsPerCubicYard, setSandTonsPerCubicYard] = useState("1.35");
  const [basePricePerTon, setBasePricePerTon] = useState("55");
  const [sandPricePerTon, setSandPricePerTon] = useState("65");
  const [deliveryFee, setDeliveryFee] = useState("95");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const area = toNumber(length) * toNumber(width);
    const waste = toNumber(wastePercent) / 100;

    const baseCubicYards =
      (area * (toNumber(baseDepth) / 12)) / 27;
    const baseCubicYardsWithWaste = baseCubicYards * (1 + waste);
    const baseTons =
      baseCubicYardsWithWaste * toNumber(baseTonsPerCubicYard);
    const baseCost = baseTons * toNumber(basePricePerTon);

    const sandCubicYards =
      (area * (toNumber(sandDepth) / 12)) / 27;
    const sandCubicYardsWithWaste = sandCubicYards * (1 + waste);
    const sandTons =
      sandCubicYardsWithWaste * toNumber(sandTonsPerCubicYard);
    const sandCost = sandTons * toNumber(sandPricePerTon);

    const materialCost = baseCost + sandCost;
    const totalCost = materialCost + toNumber(deliveryFee);
    const costPerSquareFoot = area > 0 ? totalCost / area : 0;
    const totalTons = baseTons + sandTons;

    return {
      area,
      baseCubicYards,
      baseCubicYardsWithWaste,
      baseTons,
      baseCost,
      sandCubicYards,
      sandCubicYardsWithWaste,
      sandTons,
      sandCost,
      materialCost,
      totalCost,
      costPerSquareFoot,
      truckLoads: totalTons > 0 ? Math.ceil(totalTons / 10) : 0,
    };
  }, [
    length,
    width,
    baseDepth,
    sandDepth,
    wastePercent,
    baseTonsPerCubicYard,
    sandTonsPerCubicYard,
    basePricePerTon,
    sandPricePerTon,
    deliveryFee,
  ]);

  async function copyResults() {
    const text = `Numeravo Paver Base Estimate
Area: ${formatNumber(results.area)} sq ft
Base: ${formatNumber(results.baseCubicYardsWithWaste)} yd³ / ${formatNumber(results.baseTons)} tons
Sand: ${formatNumber(results.sandCubicYardsWithWaste)} yd³ / ${formatNumber(results.sandTons)} tons
Material Cost: ${formatCurrency(results.materialCost)}
Delivery: ${formatCurrency(toNumber(deliveryFee))}
Total: ${formatCurrency(results.totalCost)}`;

    try {
      await navigator.clipboard.writeText(text);
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
              Paver Base Calculator
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Estimate paver base, bedding sand, tons, and cost
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
              Calculate compacted gravel base and bedding sand for patios,
              walkways, driveways, paver pads, and hardscape projects.
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <NumberInput label="Length" value={length} onChange={setLength} suffix="ft" />
          <NumberInput label="Width" value={width} onChange={setWidth} suffix="ft" />
          <NumberInput label="Compacted Base Depth" value={baseDepth} onChange={setBaseDepth} suffix="in" />
          <NumberInput label="Bedding Sand Depth" value={sandDepth} onChange={setSandDepth} suffix="in" />
          <NumberInput label="Waste Percentage" value={wastePercent} onChange={setWastePercent} suffix="%" />
          <NumberInput label="Base Tons Per Cubic Yard" value={baseTonsPerCubicYard} onChange={setBaseTonsPerCubicYard} suffix="tons / yd³" />
          <NumberInput label="Sand Tons Per Cubic Yard" value={sandTonsPerCubicYard} onChange={setSandTonsPerCubicYard} suffix="tons / yd³" />
          <NumberInput label="Base Price Per Ton" value={basePricePerTon} onChange={setBasePricePerTon} prefix="$" suffix="/ ton" />
          <NumberInput label="Sand Price Per Ton" value={sandPricePerTon} onChange={setSandPricePerTon} prefix="$" suffix="/ ton" />
          <NumberInput label="Delivery Fee" value={deliveryFee} onChange={setDeliveryFee} prefix="$" />
        </div>

        <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">
            Common paver base presets
          </p>

          <div className="mt-3 grid gap-2 text-sm text-[#A0AEC0] sm:grid-cols-2">
            <PresetButton label="Walkway base: 4 in" onClick={() => setBaseDepth("4")} />
            <PresetButton label="Patio base: 6 in" onClick={() => setBaseDepth("6")} />
            <PresetButton label="Driveway base: 8 in" onClick={() => setBaseDepth("8")} />
            <PresetButton label="Bedding sand: 1 in" onClick={() => setSandDepth("1")} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold">Results</h2>

        <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">
            Estimated total material cost
          </p>
          <p className="mt-2 text-4xl font-bold text-[#F97316]">
            {formatCurrency(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatNumber(results.area)} sq ft at{" "}
            {formatCurrency(results.costPerSquareFoot)} per sq ft
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <ResultRow label="Project Area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Base Cubic Yards With Waste" value={`${formatNumber(results.baseCubicYardsWithWaste)} yd³`} highlight />
          <ResultRow label="Base Tons" value={`${formatNumber(results.baseTons)} tons`} highlight />
          <ResultRow label="Base Cost" value={formatCurrency(results.baseCost)} />
          <ResultRow label="Sand Cubic Yards With Waste" value={`${formatNumber(results.sandCubicYardsWithWaste)} yd³`} highlight />
          <ResultRow label="Sand Tons" value={`${formatNumber(results.sandTons)} tons`} highlight />
          <ResultRow label="Sand Cost" value={formatCurrency(results.sandCost)} />
          <ResultRow label="Material Cost" value={formatCurrency(results.materialCost)} />
          <ResultRow label="Delivery Fee" value={formatCurrency(toNumber(deliveryFee))} />
          <ResultRow label="Estimated Total" value={formatCurrency(results.totalCost)} highlight />
          <ResultRow label="Estimated Truckloads" value={`${results.truckLoads}`} />
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

function PresetButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-[#1F2937] px-3 py-2 text-left transition hover:border-[#F97316] hover:text-white"
    >
      {label}
    </button>
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
