"use client";

import { useMemo, useState } from "react";

type RebarSize = "#3" | "#4" | "#5" | "#6" | "#7" | "#8";
type ProjectType = "Slab / grid" | "Footing / trench" | "Custom linear run";
type CostMode = "Price per stick" | "Price per foot" | "Price per pound";

const rebarData: Record<
  RebarSize,
  { diameter: string; weightPerFoot: number; area: string }
> = {
  "#3": { diameter: "3/8 in", weightPerFoot: 0.376, area: "0.11 in²" },
  "#4": { diameter: "1/2 in", weightPerFoot: 0.668, area: "0.20 in²" },
  "#5": { diameter: "5/8 in", weightPerFoot: 1.043, area: "0.31 in²" },
  "#6": { diameter: "3/4 in", weightPerFoot: 1.502, area: "0.44 in²" },
  "#7": { diameter: "7/8 in", weightPerFoot: 2.044, area: "0.60 in²" },
  "#8": { diameter: "1 in", weightPerFoot: 2.67, area: "0.79 in²" },
};

export default function RebarCalculatorClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Slab / grid");

  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(12);
  const [spacingLengthInches, setSpacingLengthInches] = useState(18);
  const [spacingWidthInches, setSpacingWidthInches] = useState(18);
  const [edgeClearanceInches, setEdgeClearanceInches] = useState(3);

  const [footingLength, setFootingLength] = useState(40);
  const [runs, setRuns] = useState(2);

  const [customLinearFeet, setCustomLinearFeet] = useState(200);

  const [rebarSize, setRebarSize] = useState<RebarSize>("#4");
  const [stockLength, setStockLength] = useState(20);
  const [wastePercent, setWastePercent] = useState(10);
  const [lapAllowancePercent, setLapAllowancePercent] = useState(5);

  const [costMode, setCostMode] = useState<CostMode>("Price per stick");
  const [pricePerStick, setPricePerStick] = useState(9);
  const [pricePerFoot, setPricePerFoot] = useState(0.45);
  const [pricePerPound, setPricePerPound] = useState(0.75);

  const [copied, setCopied] = useState(false);

  const selectedRebar = rebarData[rebarSize];

  const results = useMemo(() => {
    let barsRunningLength = 0;
    let barsRunningWidth = 0;
    let lengthDirectionFeet = 0;
    let widthDirectionFeet = 0;
    let baseLinearFeet = 0;

    const clearLength = Math.max(length - (edgeClearanceInches * 2) / 12, 0);
    const clearWidth = Math.max(width - (edgeClearanceInches * 2) / 12, 0);

    if (projectType === "Slab / grid") {
      const spacingLengthFeet = spacingLengthInches / 12;
      const spacingWidthFeet = spacingWidthInches / 12;

      barsRunningLength =
        spacingWidthFeet > 0 ? Math.floor(clearWidth / spacingWidthFeet) + 1 : 0;
      barsRunningWidth =
        spacingLengthFeet > 0 ? Math.floor(clearLength / spacingLengthFeet) + 1 : 0;

      lengthDirectionFeet = barsRunningLength * clearLength;
      widthDirectionFeet = barsRunningWidth * clearWidth;
      baseLinearFeet = lengthDirectionFeet + widthDirectionFeet;
    }

    if (projectType === "Footing / trench") {
      barsRunningLength = runs;
      lengthDirectionFeet = footingLength * runs;
      baseLinearFeet = lengthDirectionFeet;
    }

    if (projectType === "Custom linear run") {
      baseLinearFeet = customLinearFeet;
    }

    const lapFeet = baseLinearFeet * (lapAllowancePercent / 100);
    const wasteFeet = baseLinearFeet * (wastePercent / 100);
    const totalLinearFeet = baseLinearFeet + lapFeet + wasteFeet;

    const sticksNeeded = stockLength > 0 ? Math.ceil(totalLinearFeet / stockLength) : 0;
    const actualPurchasedFeet = sticksNeeded * stockLength;
    const totalWeight = totalLinearFeet * selectedRebar.weightPerFoot;
    const purchasedWeight = actualPurchasedFeet * selectedRebar.weightPerFoot;

    let estimatedCost = 0;
    if (costMode === "Price per stick") {
      estimatedCost = sticksNeeded * pricePerStick;
    }
    if (costMode === "Price per foot") {
      estimatedCost = actualPurchasedFeet * pricePerFoot;
    }
    if (costMode === "Price per pound") {
      estimatedCost = purchasedWeight * pricePerPound;
    }

    const area = projectType === "Slab / grid" ? length * width : 0;
    const costPerSquareFoot = area > 0 ? estimatedCost / area : 0;

    return {
      clearLength,
      clearWidth,
      barsRunningLength,
      barsRunningWidth,
      lengthDirectionFeet,
      widthDirectionFeet,
      baseLinearFeet,
      lapFeet,
      wasteFeet,
      totalLinearFeet,
      sticksNeeded,
      actualPurchasedFeet,
      totalWeight,
      purchasedWeight,
      estimatedCost,
      costPerSquareFoot,
    };
  }, [
    projectType,
    length,
    width,
    spacingLengthInches,
    spacingWidthInches,
    edgeClearanceInches,
    footingLength,
    runs,
    customLinearFeet,
    lapAllowancePercent,
    wastePercent,
    stockLength,
    selectedRebar.weightPerFoot,
    costMode,
    pricePerStick,
    pricePerFoot,
    pricePerPound,
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

  function applyPreset(type: ProjectType) {
    setProjectType(type);

    if (type === "Slab / grid") {
      setLength(20);
      setWidth(12);
      setSpacingLengthInches(18);
      setSpacingWidthInches(18);
      setEdgeClearanceInches(3);
    }

    if (type === "Footing / trench") {
      setFootingLength(40);
      setRuns(2);
      setEdgeClearanceInches(3);
    }

    if (type === "Custom linear run") {
      setCustomLinearFeet(200);
    }
  }

  async function copyResults() {
    const text = `Rebar Estimate
Project type: ${projectType}
Rebar size: ${rebarSize}
Diameter: ${selectedRebar.diameter}
Weight per foot: ${selectedRebar.weightPerFoot} lb/ft
Base linear feet: ${formatNumber(results.baseLinearFeet)} ft
Lap allowance: ${formatNumber(results.lapFeet)} ft
Waste allowance: ${formatNumber(results.wasteFeet)} ft
Total estimated linear feet: ${formatNumber(results.totalLinearFeet)} ft
Stock length: ${stockLength} ft
Sticks needed: ${results.sticksNeeded}
Purchased feet: ${formatNumber(results.actualPurchasedFeet)} ft
Estimated weight: ${formatNumber(results.purchasedWeight)} lb
Estimated cost: ${formatCurrency(results.estimatedCost)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">Calculate rebar</h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Estimate reinforcement quantities for a slab grid, footing runs, or a custom
          total linear-foot order. Adjust rebar size, spacing, stock length, lap allowance,
          waste, and pricing.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <PresetButton
            active={projectType === "Slab / grid"}
            label="Slab / grid"
            onClick={() => applyPreset("Slab / grid")}
          />
          <PresetButton
            active={projectType === "Footing / trench"}
            label="Footing / trench"
            onClick={() => applyPreset("Footing / trench")}
          />
          <PresetButton
            active={projectType === "Custom linear run"}
            label="Custom run"
            onClick={() => applyPreset("Custom linear run")}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projectType === "Slab / grid" && (
            <>
              <NumberInput label="Slab length" suffix="ft" value={length} setValue={setLength} />
              <NumberInput label="Slab width" suffix="ft" value={width} setValue={setWidth} />
              <NumberInput
                label="Spacing for bars running width"
                suffix="in"
                value={spacingLengthInches}
                setValue={setSpacingLengthInches}
              />
              <NumberInput
                label="Spacing for bars running length"
                suffix="in"
                value={spacingWidthInches}
                setValue={setSpacingWidthInches}
              />
              <NumberInput
                label="Edge clearance / cover"
                suffix="in"
                value={edgeClearanceInches}
                setValue={setEdgeClearanceInches}
              />
            </>
          )}

          {projectType === "Footing / trench" && (
            <>
              <NumberInput
                label="Footing length"
                suffix="ft"
                value={footingLength}
                setValue={setFootingLength}
              />
              <NumberInput label="Longitudinal runs" suffix="runs" value={runs} setValue={setRuns} />
              <NumberInput
                label="Edge clearance / cover"
                suffix="in"
                value={edgeClearanceInches}
                setValue={setEdgeClearanceInches}
              />
            </>
          )}

          {projectType === "Custom linear run" && (
            <NumberInput
              label="Base linear feet"
              suffix="ft"
              value={customLinearFeet}
              setValue={setCustomLinearFeet}
            />
          )}

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Rebar size</span>
            <select
              value={rebarSize}
              onChange={(event) => setRebarSize(event.target.value as RebarSize)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              {Object.keys(rebarData).map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </label>

          <NumberInput label="Stock bar length" suffix="ft" value={stockLength} setValue={setStockLength} />
          <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput
            label="Lap splice allowance"
            suffix="%"
            value={lapAllowancePercent}
            setValue={setLapAllowancePercent}
          />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Cost mode</span>
            <select
              value={costMode}
              onChange={(event) => setCostMode(event.target.value as CostMode)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Price per stick</option>
              <option>Price per foot</option>
              <option>Price per pound</option>
            </select>
          </label>

          {costMode === "Price per stick" && (
            <NumberInput label="Price per stick" suffix="$" value={pricePerStick} setValue={setPricePerStick} />
          )}

          {costMode === "Price per foot" && (
            <NumberInput label="Price per foot" suffix="$" value={pricePerFoot} setValue={setPricePerFoot} />
          )}

          {costMode === "Price per pound" && (
            <NumberInput label="Price per pound" suffix="$" value={pricePerPound} setValue={setPricePerPound} />
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Rebar estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Sticks to buy</p>
          <p className="mt-2 text-5xl font-bold text-white">{results.sticksNeeded}</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            Based on {stockLength} ft stock length, {wastePercent}% waste, and{" "}
            {lapAllowancePercent}% lap allowance.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Selected rebar" value={`${rebarSize} · ${selectedRebar.diameter}`} />
          <ResultRow label="Weight per foot" value={`${selectedRebar.weightPerFoot} lb/ft`} />
          <ResultRow label="Bar area" value={selectedRebar.area} />

          {projectType === "Slab / grid" && (
            <>
              <ResultRow label="Bars running length" value={`${results.barsRunningLength} bars`} />
              <ResultRow label="Bars running width" value={`${results.barsRunningWidth} bars`} />
              <ResultRow label="Length-direction steel" value={`${formatNumber(results.lengthDirectionFeet)} ft`} />
              <ResultRow label="Width-direction steel" value={`${formatNumber(results.widthDirectionFeet)} ft`} />
            </>
          )}

          <ResultRow label="Base linear feet" value={`${formatNumber(results.baseLinearFeet)} ft`} />
          <ResultRow label="Lap allowance" value={`${formatNumber(results.lapFeet)} ft`} />
          <ResultRow label="Waste allowance" value={`${formatNumber(results.wasteFeet)} ft`} />
          <ResultRow label="Total estimated feet" value={`${formatNumber(results.totalLinearFeet)} ft`} />
          <ResultRow label="Purchased feet" value={`${formatNumber(results.actualPurchasedFeet)} ft`} />
          <ResultRow label="Estimated purchased weight" value={`${formatNumber(results.purchasedWeight)} lb`} />
          <ResultRow label="Estimated material cost" value={formatCurrency(results.estimatedCost)} />

          {projectType === "Slab / grid" && (
            <ResultRow label="Cost per square foot" value={formatCurrency(results.costPerSquareFoot)} />
          )}
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This is a material estimate only. Structural reinforcement design, spacing,
          cover, lap length, and bar size should follow project plans, local code, and
          engineering requirements.
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

function PresetButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active
          ? "border-[#F97316] bg-[#F97316] text-white"
          : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
      }`}
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
