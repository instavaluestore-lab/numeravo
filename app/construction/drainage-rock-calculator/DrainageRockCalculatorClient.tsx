"use client";

import { useMemo, useState } from "react";

export default function DrainageRockCalculatorClient() {
  const [projectType, setProjectType] = useState("French drain");
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(1.5);
  const [depth, setDepth] = useState(1.5);
  const [wastePercent, setWastePercent] = useState(10);
  const [tonsPerCubicYard, setTonsPerCubicYard] = useState(1.35);
  const [pricePerTon, setPricePerTon] = useState(65);
  const [deliveryFee, setDeliveryFee] = useState(95);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const area = length * width;
    const cubicFeet = area * depth;
    const cubicYards = cubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + wastePercent / 100);
    const tons = cubicYardsWithWaste * tonsPerCubicYard;
    const materialCost = tons * pricePerTon;
    const totalCost = materialCost + deliveryFee;
    const costPerLinearFoot = length > 0 ? totalCost / length : 0;
    const truckLoads = tons / 10;

    return {
      area,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      tons,
      materialCost,
      totalCost,
      costPerLinearFoot,
      truckLoads,
    };
  }, [length, width, depth, wastePercent, tonsPerCubicYard, pricePerTon, deliveryFee]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }

  async function copyResults() {
    const text = `Drainage Rock Estimate
Project type: ${projectType}
Length: ${length} ft
Width: ${width} ft
Depth: ${depth} ft
Base volume: ${formatNumber(results.cubicYards)} cubic yards
With waste: ${formatNumber(results.cubicYardsWithWaste)} cubic yards
Estimated tons: ${formatNumber(results.tons)} tons
Material cost: ${formatCurrency(results.materialCost)}
Delivery: ${formatCurrency(deliveryFee)}
Estimated total: ${formatCurrency(results.totalCost)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">Drainage Rock Calculator</h2>
        <p className="mt-2 text-sm text-[#A0AEC0]">
          Estimate drainage rock volume, tons, delivery, and cost for French drains, trench drains, dry wells, swales, and drainage beds.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Project type</span>
            <select
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>French drain</option>
              <option>Drainage trench</option>
              <option>Dry well stone bed</option>
              <option>Retaining wall drainage</option>
              <option>Landscape drainage area</option>
            </select>
          </label>

          <NumberInput label="Length" suffix="ft" value={length} setValue={setLength} />
          <NumberInput label="Width" suffix="ft" value={width} setValue={setWidth} />
          <NumberInput label="Depth" suffix="ft" value={depth} setValue={setDepth} />
          <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Tons per cubic yard" suffix="tons/yd³" value={tonsPerCubicYard} setValue={setTonsPerCubicYard} />
          <NumberInput label="Rock price" suffix="$/ton" value={pricePerTon} setValue={setPricePerTon} />
          <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <PresetButton label="French drain" onClick={() => { setProjectType("French drain"); setWidth(1.5); setDepth(1.5); }} />
          <PresetButton label="Wall drainage" onClick={() => { setProjectType("Retaining wall drainage"); setWidth(1); setDepth(2); }} />
          <PresetButton label="Dry well bed" onClick={() => { setProjectType("Dry well stone bed"); setWidth(6); setDepth(2); }} />
          <PresetButton label="Drainage area" onClick={() => { setProjectType("Landscape drainage area"); setWidth(4); setDepth(0.5); }} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Estimated materials</h3>

        <div className="mt-5 space-y-3">
          <ResultRow label="Area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Volume" value={`${formatNumber(results.cubicYards)} yd³`} />
          <ResultRow label="Volume with waste" value={`${formatNumber(results.cubicYardsWithWaste)} yd³`} />
          <ResultRow label="Estimated tons" value={`${formatNumber(results.tons)} tons`} />
          <ResultRow label="Truckloads" value={`${formatNumber(results.truckLoads)} loads`} />
          <ResultRow label="Material cost" value={formatCurrency(results.materialCost)} />
          <ResultRow label="Delivery" value={formatCurrency(deliveryFee)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total</p>
          <p className="mt-2 text-4xl font-bold text-white">{formatCurrency(results.totalCost)}</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            About {formatCurrency(results.costPerLinearFoot)} per linear foot.
          </p>
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          Drainage rock estimates are planning numbers. Confirm trench dimensions, fabric requirements, pipe size, compaction, and local drainage requirements before ordering.
        </p>
      </div>
    </div>
  );
}

function NumberInput({
  label,
  suffix,
  value,
  setValue,
}: {
  label: string;
  suffix: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-white">{label}</span>
      <div className="flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#F97316]">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="w-full bg-transparent px-4 py-3 text-white outline-none"
        />
        <span className="flex items-center border-l border-[#1F2937] px-3 text-sm text-[#A0AEC0]">{suffix}</span>
      </div>
    </label>
  );
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#F97316]"
    >
      {label}
    </button>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}
