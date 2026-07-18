"use client";

import { useMemo, useState } from "react";

type RebarSize = "#3" | "#4" | "#5" | "#6" | "#7" | "#8";
type CostMode = "Price per foot" | "Price per pound" | "Price per stock bar";

const rebarData: Record<RebarSize, { diameter: string; weightPerFoot: number }> = {
  "#3": { diameter: "3/8 in", weightPerFoot: 0.376 },
  "#4": { diameter: "1/2 in", weightPerFoot: 0.668 },
  "#5": { diameter: "5/8 in", weightPerFoot: 1.043 },
  "#6": { diameter: "3/4 in", weightPerFoot: 1.502 },
  "#7": { diameter: "7/8 in", weightPerFoot: 2.044 },
  "#8": { diameter: "1 in", weightPerFoot: 2.67 },
};

export default function RebarWeightCalculatorClient() {
  const [rebarSize, setRebarSize] = useState<RebarSize>("#4");
  const [barLengthFeet, setBarLengthFeet] = useState(20);
  const [barQuantity, setBarQuantity] = useState(25);
  const [wastePercent, setWastePercent] = useState(10);
  const [costMode, setCostMode] = useState<CostMode>("Price per foot");
  const [pricePerFoot, setPricePerFoot] = useState(0.85);
  const [pricePerPound, setPricePerPound] = useState(1.25);
  const [pricePerStockBar, setPricePerStockBar] = useState(16);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const baseLinearFeet = barLengthFeet * barQuantity;
    const wasteFeet = baseLinearFeet * (wastePercent / 100);
    const totalLinearFeet = baseLinearFeet + wasteFeet;
    const weightPerFoot = rebarData[rebarSize].weightPerFoot;
    const totalWeightPounds = totalLinearFeet * weightPerFoot;
    const totalWeightTons = totalWeightPounds / 2000;
    const weightPerBar = barLengthFeet * weightPerFoot;

    let materialCost = 0;

    if (costMode === "Price per foot") {
      materialCost = totalLinearFeet * pricePerFoot;
    }

    if (costMode === "Price per pound") {
      materialCost = totalWeightPounds * pricePerPound;
    }

    if (costMode === "Price per stock bar") {
      materialCost = barQuantity * pricePerStockBar;
      materialCost += materialCost * (wastePercent / 100);
    }

    const costPerFoot = totalLinearFeet > 0 ? materialCost / totalLinearFeet : 0;
    const costPerPound = totalWeightPounds > 0 ? materialCost / totalWeightPounds : 0;

    return {
      baseLinearFeet,
      wasteFeet,
      totalLinearFeet,
      weightPerFoot,
      weightPerBar,
      totalWeightPounds,
      totalWeightTons,
      materialCost,
      costPerFoot,
      costPerPound,
    };
  }, [
    rebarSize,
    barLengthFeet,
    barQuantity,
    wastePercent,
    costMode,
    pricePerFoot,
    pricePerPound,
    pricePerStockBar,
  ]);

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
    const text = `Rebar Weight Estimate
Rebar size: ${rebarSize}
Diameter: ${rebarData[rebarSize].diameter}
Weight per foot: ${results.weightPerFoot} lb/ft
Bar length: ${barLengthFeet} ft
Bar quantity: ${barQuantity}
Waste allowance: ${wastePercent}%
Base linear feet: ${formatNumber(results.baseLinearFeet)} ft
Waste linear feet: ${formatNumber(results.wasteFeet)} ft
Total linear feet: ${formatNumber(results.totalLinearFeet)} ft
Weight per bar: ${formatNumber(results.weightPerBar)} lb
Total weight: ${formatNumber(results.totalWeightPounds, 0)} lb
Total tons: ${formatNumber(results.totalWeightTons, 3)} tons
Cost mode: ${costMode}
Estimated material cost: ${formatCurrency(results.materialCost)}
Cost per foot: ${formatCurrency(results.costPerFoot)}
Cost per pound: ${formatCurrency(results.costPerPound)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">Calculate rebar weight</h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter rebar size, bar length, quantity, waste allowance, and pricing method
          to estimate total length, pounds, tons, and material cost.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Rebar size</span>
            <select
              value={rebarSize}
              onChange={(event) => setRebarSize(event.target.value as RebarSize)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>#3</option>
              <option>#4</option>
              <option>#5</option>
              <option>#6</option>
              <option>#7</option>
              <option>#8</option>
            </select>
            <p className="text-xs text-[#A0AEC0]">
              Diameter: {rebarData[rebarSize].diameter}; weight:{" "}
              {rebarData[rebarSize].weightPerFoot} lb/ft
            </p>
          </label>

          <NumberInput label="Bar length" suffix="ft" value={barLengthFeet} setValue={setBarLengthFeet} />
          <NumberInput label="Bar quantity" suffix="bars" value={barQuantity} setValue={setBarQuantity} />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Cost mode</span>
            <select
              value={costMode}
              onChange={(event) => setCostMode(event.target.value as CostMode)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Price per foot</option>
              <option>Price per pound</option>
              <option>Price per stock bar</option>
            </select>
          </label>

          {costMode === "Price per foot" && (
            <NumberInput label="Price per foot" suffix="$/ft" value={pricePerFoot} setValue={setPricePerFoot} />
          )}

          {costMode === "Price per pound" && (
            <NumberInput label="Price per pound" suffix="$/lb" value={pricePerPound} setValue={setPricePerPound} />
          )}

          {costMode === "Price per stock bar" && (
            <NumberInput label="Price per stock bar" suffix="$/bar" value={pricePerStockBar} setValue={setPricePerStockBar} />
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Rebar weight estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total weight</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatNumber(results.totalWeightPounds, 0)} lb
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatNumber(results.totalWeightTons, 3)} short tons.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Rebar diameter" value={rebarData[rebarSize].diameter} />
          <ResultRow label="Weight per foot" value={`${results.weightPerFoot} lb/ft`} />
          <ResultRow label="Weight per bar" value={`${formatNumber(results.weightPerBar)} lb`} />
          <ResultRow label="Base linear feet" value={`${formatNumber(results.baseLinearFeet)} ft`} />
          <ResultRow label="Waste linear feet" value={`${formatNumber(results.wasteFeet)} ft`} />
          <ResultRow label="Total linear feet" value={`${formatNumber(results.totalLinearFeet)} ft`} />
          <ResultRow label="Total pounds" value={`${formatNumber(results.totalWeightPounds, 0)} lb`} />
          <ResultRow label="Total tons" value={`${formatNumber(results.totalWeightTons, 3)} tons`} />
          <ResultRow label="Estimated material cost" value={formatCurrency(results.materialCost)} />
          <ResultRow label="Effective cost per foot" value={formatCurrency(results.costPerFoot)} />
          <ResultRow label="Effective cost per pound" value={formatCurrency(results.costPerPound)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator estimates standard rebar material weight. Confirm exact
          specifications, coating, grade, and pricing with your supplier before ordering.
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
        <span className="flex items-center border-l border-[#1F2937] px-3 text-sm text-[#A0AEC0]">
          {suffix}
        </span>
      </div>
    </label>
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
