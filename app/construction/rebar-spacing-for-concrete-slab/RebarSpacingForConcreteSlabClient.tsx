"use client";

import { useMemo, useState } from "react";

type RebarSize = "#3" | "#4" | "#5" | "#6";
type SpacingPreset = "Light slab" | "Standard slab" | "Heavy slab" | "Custom";

const rebarData: Record<RebarSize, { diameter: string; weightPerFoot: number }> = {
  "#3": { diameter: "3/8 in", weightPerFoot: 0.376 },
  "#4": { diameter: "1/2 in", weightPerFoot: 0.668 },
  "#5": { diameter: "5/8 in", weightPerFoot: 1.043 },
  "#6": { diameter: "3/4 in", weightPerFoot: 1.502 },
};

export default function RebarSpacingForConcreteSlabClient() {
  const [preset, setPreset] = useState<SpacingPreset>("Standard slab");
  const [slabLength, setSlabLength] = useState(20);
  const [slabWidth, setSlabWidth] = useState(20);
  const [spacingInches, setSpacingInches] = useState(18);
  const [edgeClearanceInches, setEdgeClearanceInches] = useState(3);
  const [rebarSize, setRebarSize] = useState<RebarSize>("#4");
  const [stockLengthFeet, setStockLengthFeet] = useState(20);
  const [lapLengthInches, setLapLengthInches] = useState(24);
  const [wastePercent, setWastePercent] = useState(10);
  const [pricePerFoot, setPricePerFoot] = useState(0.85);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const usableLengthFeet = Math.max(slabLength - (edgeClearanceInches * 2) / 12, 0);
    const usableWidthFeet = Math.max(slabWidth - (edgeClearanceInches * 2) / 12, 0);
    const spacingFeet = spacingInches / 12;

    const barsRunningLength =
      spacingFeet > 0 ? Math.floor(usableWidthFeet / spacingFeet) + 1 : 0;
    const barsRunningWidth =
      spacingFeet > 0 ? Math.floor(usableLengthFeet / spacingFeet) + 1 : 0;

    const lengthDirectionFeet = barsRunningLength * usableLengthFeet;
    const widthDirectionFeet = barsRunningWidth * usableWidthFeet;

    const baseLinearFeet = lengthDirectionFeet + widthDirectionFeet;

    const lapLengthFeet = lapLengthInches / 12;
    const barsNeedingLap =
      stockLengthFeet > 0
        ? Math.max(
            Math.ceil(usableLengthFeet / stockLengthFeet) - 1,
            0,
          ) *
            barsRunningLength +
          Math.max(Math.ceil(usableWidthFeet / stockLengthFeet) - 1, 0) *
            barsRunningWidth
        : 0;

    const lapAllowanceFeet = barsNeedingLap * lapLengthFeet;
    const linearFeetWithLap = baseLinearFeet + lapAllowanceFeet;
    const wasteFeet = linearFeetWithLap * (wastePercent / 100);
    const totalLinearFeet = linearFeetWithLap + wasteFeet;

    const stockBars =
      stockLengthFeet > 0 ? Math.ceil(totalLinearFeet / stockLengthFeet) : 0;

    const totalPurchasedFeet = stockBars * stockLengthFeet;
    const totalWeight = totalPurchasedFeet * rebarData[rebarSize].weightPerFoot;
    const materialCost = totalPurchasedFeet * pricePerFoot;
    const slabArea = slabLength * slabWidth;
    const costPerSquareFoot = slabArea > 0 ? materialCost / slabArea : 0;

    return {
      usableLengthFeet,
      usableWidthFeet,
      barsRunningLength,
      barsRunningWidth,
      totalGridBars: barsRunningLength + barsRunningWidth,
      baseLinearFeet,
      lapAllowanceFeet,
      wasteFeet,
      totalLinearFeet,
      stockBars,
      totalPurchasedFeet,
      totalWeight,
      materialCost,
      slabArea,
      costPerSquareFoot,
    };
  }, [
    slabLength,
    slabWidth,
    spacingInches,
    edgeClearanceInches,
    rebarSize,
    stockLengthFeet,
    lapLengthInches,
    wastePercent,
    pricePerFoot,
  ]);

  function applyPreset(nextPreset: SpacingPreset) {
    setPreset(nextPreset);

    if (nextPreset === "Light slab") {
      setSpacingInches(24);
      setRebarSize("#3");
      setWastePercent(8);
      setPricePerFoot(0.65);
    }

    if (nextPreset === "Standard slab") {
      setSpacingInches(18);
      setRebarSize("#4");
      setWastePercent(10);
      setPricePerFoot(0.85);
    }

    if (nextPreset === "Heavy slab") {
      setSpacingInches(12);
      setRebarSize("#4");
      setWastePercent(12);
      setPricePerFoot(0.85);
    }
  }

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
    const text = `Rebar Spacing for Concrete Slab Estimate
Slab size: ${slabLength} ft x ${slabWidth} ft
Slab area: ${formatNumber(results.slabArea)} sq ft
Rebar size: ${rebarSize}
Spacing: ${spacingInches} in on center
Edge clearance: ${edgeClearanceInches} in
Bars running length direction: ${results.barsRunningLength}
Bars running width direction: ${results.barsRunningWidth}
Total grid bars: ${results.totalGridBars}
Base linear feet: ${formatNumber(results.baseLinearFeet)} ft
Lap allowance: ${formatNumber(results.lapAllowanceFeet)} ft
Waste allowance: ${formatNumber(results.wasteFeet)} ft
Total linear feet: ${formatNumber(results.totalLinearFeet)} ft
Stock bars to buy: ${results.stockBars}
Purchased feet: ${formatNumber(results.totalPurchasedFeet)} ft
Estimated weight: ${formatNumber(results.totalWeight, 0)} lb
Estimated material cost: ${formatCurrency(results.materialCost)}
Cost per square foot: ${formatCurrency(results.costPerSquareFoot)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate slab rebar spacing
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter slab dimensions, rebar spacing, edge clearance, bar size, stock
          length, lap allowance, waste, and price to estimate a slab reinforcement grid.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {(["Light slab", "Standard slab", "Heavy slab", "Custom"] as SpacingPreset[]).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => applyPreset(item)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  preset === item
                    ? "border-[#F97316] bg-[#F97316] text-white"
                    : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Slab length" suffix="ft" value={slabLength} setValue={setSlabLength} />
          <NumberInput label="Slab width" suffix="ft" value={slabWidth} setValue={setSlabWidth} />
          <NumberInput label="Rebar spacing" suffix="in OC" value={spacingInches} setValue={setSpacingInches} />
          <NumberInput label="Edge clearance" suffix="in" value={edgeClearanceInches} setValue={setEdgeClearanceInches} />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Rebar size</span>
            <select
              value={rebarSize}
              onChange={(event) => {
                setPreset("Custom");
                setRebarSize(event.target.value as RebarSize);
              }}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>#3</option>
              <option>#4</option>
              <option>#5</option>
              <option>#6</option>
            </select>
            <p className="text-xs text-[#A0AEC0]">
              Diameter: {rebarData[rebarSize].diameter}; weight:{" "}
              {rebarData[rebarSize].weightPerFoot} lb/ft
            </p>
          </label>

          <NumberInput label="Stock bar length" suffix="ft" value={stockLengthFeet} setValue={setStockLengthFeet} />
          <NumberInput label="Lap length" suffix="in" value={lapLengthInches} setValue={setLapLengthInches} />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Rebar price" suffix="$/ft" value={pricePerFoot} setValue={setPricePerFoot} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Rebar grid estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated material cost</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatCurrency(results.materialCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {results.stockBars} stock bar{results.stockBars === 1 ? "" : "s"} estimated.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Slab area" value={`${formatNumber(results.slabArea)} sq ft`} />
          <ResultRow label="Usable grid length" value={`${formatNumber(results.usableLengthFeet)} ft`} />
          <ResultRow label="Usable grid width" value={`${formatNumber(results.usableWidthFeet)} ft`} />
          <ResultRow label="Bars running length direction" value={`${results.barsRunningLength}`} />
          <ResultRow label="Bars running width direction" value={`${results.barsRunningWidth}`} />
          <ResultRow label="Total grid bars" value={`${results.totalGridBars}`} />
          <ResultRow label="Base linear feet" value={`${formatNumber(results.baseLinearFeet)} ft`} />
          <ResultRow label="Lap allowance" value={`${formatNumber(results.lapAllowanceFeet)} ft`} />
          <ResultRow label="Waste allowance" value={`${formatNumber(results.wasteFeet)} ft`} />
          <ResultRow label="Total linear feet" value={`${formatNumber(results.totalLinearFeet)} ft`} />
          <ResultRow label="Purchased feet" value={`${formatNumber(results.totalPurchasedFeet)} ft`} />
          <ResultRow label="Estimated weight" value={`${formatNumber(results.totalWeight, 0)} lb`} />
          <ResultRow label="Cost per square foot" value={formatCurrency(results.costPerSquareFoot)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator estimates material quantities only. Confirm slab reinforcement
          requirements with project specifications, local code, or a qualified engineer
          when structural performance matters.
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
