"use client";

import { useMemo, useState } from "react";

export default function CrushedStoneVsGravelClient() {
  const [length, setLength] = useState("30");
  const [width, setWidth] = useState("12");
  const [depth, setDepth] = useState("4");
  const [wastePercent, setWastePercent] = useState("10");
  const [gravelDensity, setGravelDensity] = useState("1.4");
  const [stoneDensity, setStoneDensity] = useState("1.5");
  const [gravelPrice, setGravelPrice] = useState("45");
  const [stonePrice, setStonePrice] = useState("50");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const lengthNumber = toNumber(length);
    const widthNumber = toNumber(width);
    const depthNumber = toNumber(depth);
    const waste = toNumber(wastePercent);

    const squareFeet = lengthNumber * widthNumber;
    const depthFeet = depthNumber / 12;
    const cubicFeet = squareFeet * depthFeet;
    const cubicYards = cubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + waste / 100);

    const gravelTons = cubicYardsWithWaste * toNumber(gravelDensity);
    const stoneTons = cubicYardsWithWaste * toNumber(stoneDensity);

    const gravelCost = gravelTons * toNumber(gravelPrice);
    const stoneCost = stoneTons * toNumber(stonePrice);

    return {
      squareFeet,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      gravelTons,
      stoneTons,
      gravelCost,
      stoneCost,
      costDifference: stoneCost - gravelCost,
      gravelTruckLoads: gravelTons > 0 ? Math.ceil(gravelTons / 10) : 0,
      stoneTruckLoads: stoneTons > 0 ? Math.ceil(stoneTons / 10) : 0,
    };
  }, [
    length,
    width,
    depth,
    wastePercent,
    gravelDensity,
    stoneDensity,
    gravelPrice,
    stonePrice,
  ]);

  async function copyResults() {
    const resultText = `Numeravo Crushed Stone vs Gravel Estimate
Project Size: ${length} ft × ${width} ft
Depth: ${depth} in
Waste: ${wastePercent}%
Area: ${formatNumber(results.squareFeet)} sq ft
Cubic Yards With Waste: ${formatNumber(results.cubicYardsWithWaste)} yd³
Gravel Tons: ${formatNumber(results.gravelTons)}
Crushed Stone Tons: ${formatNumber(results.stoneTons)}
Gravel Material Cost: ${formatCurrency(results.gravelCost)}
Crushed Stone Material Cost: ${formatCurrency(results.stoneCost)}
Difference: ${formatCurrency(Math.abs(results.costDifference))}
Gravel Truckloads: ${results.gravelTruckLoads}
Crushed Stone Truckloads: ${results.stoneTruckLoads}`;

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
              Material Comparison Estimator
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Compare crushed stone vs gravel quantity and cost
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
              Enter project size, depth, waste, density, and price per ton to
              compare gravel and crushed stone side by side.
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
          <NumberInput label="Depth" value={depth} onChange={setDepth} suffix="in" />
          <NumberInput label="Waste Percentage" value={wastePercent} onChange={setWastePercent} suffix="%" />
          <NumberInput label="Gravel Density" value={gravelDensity} onChange={setGravelDensity} suffix="tons / yd³" />
          <NumberInput label="Crushed Stone Density" value={stoneDensity} onChange={setStoneDensity} suffix="tons / yd³" />
          <NumberInput label="Gravel Price" value={gravelPrice} onChange={setGravelPrice} prefix="$" suffix="/ ton" />
          <NumberInput label="Crushed Stone Price" value={stonePrice} onChange={setStonePrice} prefix="$" suffix="/ ton" />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold">Results</h2>

        <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated material volume</p>

          <p className="mt-2 text-4xl font-bold text-[#F97316]">
            {formatNumber(results.cubicYardsWithWaste)} yd³
          </p>

          <p className="mt-2 text-sm text-[#A0AEC0]">
            Includes the selected waste allowance.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <MaterialCard
            title="Gravel"
            tons={results.gravelTons}
            cost={results.gravelCost}
            truckLoads={results.gravelTruckLoads}
          />

          <MaterialCard
            title="Crushed Stone"
            tons={results.stoneTons}
            cost={results.stoneCost}
            truckLoads={results.stoneTruckLoads}
          />
        </div>

        <div className="mt-5 space-y-4">
          <ResultRow label="Project Area" value={`${formatNumber(results.squareFeet)} sq ft`} />
          <ResultRow label="Cubic Feet" value={`${formatNumber(results.cubicFeet)} ft³`} />
          <ResultRow label="Cubic Yards Before Waste" value={`${formatNumber(results.cubicYards)} yd³`} />
          <ResultRow label="Cubic Yards With Waste" value={`${formatNumber(results.cubicYardsWithWaste)} yd³`} highlight />
          <ResultRow
            label="Material Cost Difference"
            value={formatCurrency(Math.abs(results.costDifference))}
            highlight
          />
        </div>

        <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose crushed stone when compaction and angular lock matter. Choose
            gravel when decorative appearance, drainage, or local availability
            makes more sense.
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

function MaterialCard({
  title,
  tons,
  cost,
  truckLoads,
}: {
  title: string;
  tons: number;
  cost: number;
  truckLoads: number;
}) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-3 text-2xl font-bold text-[#F97316]">
        {formatNumber(tons)} tons
      </p>
      <p className="mt-2 text-sm text-[#A0AEC0]">{formatCurrency(cost)}</p>
      <p className="mt-1 text-xs text-[#A0AEC0]">
        {truckLoads} standard dump truck load{truckLoads === 1 ? "" : "s"}
      </p>
    </div>
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
    maximumFractionDigits: 0,
  }).format(value);
}
