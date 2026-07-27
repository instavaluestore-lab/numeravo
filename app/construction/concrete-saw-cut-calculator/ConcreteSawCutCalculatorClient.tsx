"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Slab"
  | "Driveway"
  | "Patio"
  | "Sidewalk"
  | "Demolition cuts"
  | "Custom";

type CutPurpose = "Control joints" | "Demolition sections" | "Clean edge cuts" | "Mixed layout";

const presets: Record<
  PresetType,
  {
    length: number;
    width: number;
    thickness: number;
    targetSpacing: number;
    cutPurpose: CutPurpose;
    cutBothDirections: boolean;
    costPerLinearFoot: number;
    setupCost: number;
    minimumCharge: number;
  }
> = {
  Slab: {
    length: 30,
    width: 20,
    thickness: 4,
    targetSpacing: 10,
    cutPurpose: "Control joints",
    cutBothDirections: true,
    costPerLinearFoot: 2.5,
    setupCost: 125,
    minimumCharge: 350,
  },
  Driveway: {
    length: 40,
    width: 16,
    thickness: 4,
    targetSpacing: 10,
    cutPurpose: "Control joints",
    cutBothDirections: false,
    costPerLinearFoot: 2.75,
    setupCost: 150,
    minimumCharge: 400,
  },
  Patio: {
    length: 20,
    width: 16,
    thickness: 4,
    targetSpacing: 8,
    cutPurpose: "Control joints",
    cutBothDirections: true,
    costPerLinearFoot: 2.5,
    setupCost: 125,
    minimumCharge: 325,
  },
  Sidewalk: {
    length: 50,
    width: 4,
    thickness: 4,
    targetSpacing: 5,
    cutPurpose: "Control joints",
    cutBothDirections: false,
    costPerLinearFoot: 2.5,
    setupCost: 100,
    minimumCharge: 300,
  },
  "Demolition cuts": {
    length: 30,
    width: 16,
    thickness: 5,
    targetSpacing: 6,
    cutPurpose: "Demolition sections",
    cutBothDirections: true,
    costPerLinearFoot: 3.5,
    setupCost: 175,
    minimumCharge: 500,
  },
  Custom: {
    length: 24,
    width: 16,
    thickness: 4,
    targetSpacing: 8,
    cutPurpose: "Mixed layout",
    cutBothDirections: true,
    costPerLinearFoot: 2.75,
    setupCost: 125,
    minimumCharge: 350,
  },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

function clampNumber(value: number, fallback = 0) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

export default function ConcreteSawCutCalculatorClient() {
  const [preset, setPreset] = useState<PresetType>("Slab");
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(20);
  const [thickness, setThickness] = useState(4);
  const [targetSpacing, setTargetSpacing] = useState(10);
  const [cutPurpose, setCutPurpose] = useState<CutPurpose>("Control joints");
  const [cutBothDirections, setCutBothDirections] = useState(true);
  const [extraCutLength, setExtraCutLength] = useState(0);
  const [costPerLinearFoot, setCostPerLinearFoot] = useState(2.5);
  const [setupCost, setSetupCost] = useState(125);
  const [minimumCharge, setMinimumCharge] = useState(350);
  const [wasteOrOverrunPercent, setWasteOrOverrunPercent] = useState(5);

  function applyPreset(nextPreset: PresetType) {
    const selected = presets[nextPreset];
    setPreset(nextPreset);
    setLength(selected.length);
    setWidth(selected.width);
    setThickness(selected.thickness);
    setTargetSpacing(selected.targetSpacing);
    setCutPurpose(selected.cutPurpose);
    setCutBothDirections(selected.cutBothDirections);
    setCostPerLinearFoot(selected.costPerLinearFoot);
    setSetupCost(selected.setupCost);
    setMinimumCharge(selected.minimumCharge);
  }

  const result = useMemo(() => {
    const safeLength = clampNumber(length);
    const safeWidth = clampNumber(width);
    const safeThickness = clampNumber(thickness);
    const safeTargetSpacing = Math.max(clampNumber(targetSpacing, 8), 1);
    const safeExtraCutLength = clampNumber(extraCutLength);
    const safeCostPerLinearFoot = clampNumber(costPerLinearFoot);
    const safeSetupCost = clampNumber(setupCost);
    const safeMinimumCharge = clampNumber(minimumCharge);
    const safeWasteOrOverrunPercent = clampNumber(wasteOrOverrunPercent);

    const area = safeLength * safeWidth;

    const sawCutDepth = safeThickness / 4;
    const minimumDepth = safeThickness / 5;
    const deeperCutDepth = safeThickness / 3;

    const spacingGuideLow = (safeThickness * 24) / 12;
    const spacingGuideHigh = (safeThickness * 36) / 12;

    const crossCuts = Math.max(Math.ceil(safeLength / safeTargetSpacing) - 1, 0);
    const crossCutFeet = crossCuts * safeWidth;

    const lengthwiseCuts = cutBothDirections
      ? Math.max(Math.ceil(safeWidth / safeTargetSpacing) - 1, 0)
      : 0;
    const lengthwiseCutFeet = lengthwiseCuts * safeLength;

    const layoutCutFeet = crossCutFeet + lengthwiseCutFeet;
    const cutFeetBeforeOverrun = layoutCutFeet + safeExtraCutLength;
    const overrunFeet = cutFeetBeforeOverrun * (safeWasteOrOverrunPercent / 100);
    const totalCutFeet = cutFeetBeforeOverrun + overrunFeet;

    const panelsLong = crossCuts + 1;
    const panelsWide = lengthwiseCuts + 1;
    const panelCount = panelsLong * panelsWide;
    const averagePanelLength = panelsLong > 0 ? safeLength / panelsLong : 0;
    const averagePanelWidth = panelsWide > 0 ? safeWidth / panelsWide : 0;

    const cutCost = totalCutFeet * safeCostPerLinearFoot;
    const subtotal = cutCost + safeSetupCost;
    const totalCost = Math.max(subtotal, safeMinimumCharge);
    const minimumChargeAdjustment = Math.max(safeMinimumCharge - subtotal, 0);
    const costPerSquareFoot = area > 0 ? totalCost / area : 0;

    const estimatedCuttingHours = totalCutFeet / 120;
    const notes: string[] = [];

    if (safeTargetSpacing > spacingGuideHigh) {
      notes.push("Target spacing is wider than the common thickness-based planning range. Consider closer spacing.");
    }

    if (safeTargetSpacing < spacingGuideLow) {
      notes.push("Target spacing is tighter than the common range. This may increase cost but can create smaller panels.");
    }

    if (sawCutDepth < 1 && safeThickness >= 4) {
      notes.push("Review saw cut depth carefully. Many 4 inch slabs use about a 1 inch control joint cut.");
    }

    if (cutPurpose === "Demolition sections") {
      notes.push("Demolition cuts may need deeper cuts or full-depth cuts depending on removal method and clean-edge requirements.");
    }

    if (averagePanelLength / Math.max(averagePanelWidth, 1) > 1.5) {
      notes.push("Panel layout is long and narrow. More balanced panels usually perform better.");
    }

    if (minimumChargeAdjustment > 0) {
      notes.push("Minimum job charge is controlling the total estimate.");
    }

    if (notes.length === 0) {
      notes.push("Saw cut layout looks reasonable for the selected slab size and spacing.");
    }

    return {
      area,
      sawCutDepth,
      minimumDepth,
      deeperCutDepth,
      spacingGuideLow,
      spacingGuideHigh,
      crossCuts,
      crossCutFeet,
      lengthwiseCuts,
      lengthwiseCutFeet,
      layoutCutFeet,
      extraCutLength: safeExtraCutLength,
      cutFeetBeforeOverrun,
      overrunFeet,
      totalCutFeet,
      panelsLong,
      panelsWide,
      panelCount,
      averagePanelLength,
      averagePanelWidth,
      cutCost,
      setupCost: safeSetupCost,
      subtotal,
      minimumCharge: safeMinimumCharge,
      minimumChargeAdjustment,
      totalCost,
      costPerSquareFoot,
      estimatedCuttingHours,
      notes,
    };
  }, [
    length,
    width,
    thickness,
    targetSpacing,
    cutPurpose,
    cutBothDirections,
    extraCutLength,
    costPerLinearFoot,
    setupCost,
    minimumCharge,
    wasteOrOverrunPercent,
  ]);

  function copyResults() {
    const summary = [
      "Concrete Saw Cut Estimate",
      `Preset: ${preset}`,
      `Purpose: ${cutPurpose}`,
      `Length: ${formatNumber(length)} ft`,
      `Width: ${formatNumber(width)} ft`,
      `Thickness: ${formatNumber(thickness)} in`,
      `Saw cut depth guide: ${formatNumber(result.sawCutDepth)} in`,
      `Target spacing: ${formatNumber(targetSpacing)} ft`,
      `Cross cuts: ${result.crossCuts}`,
      `Lengthwise cuts: ${result.lengthwiseCuts}`,
      `Total saw cut length: ${formatNumber(result.totalCutFeet)} ft`,
      `Estimated total cost: ${formatCurrency(result.totalCost)}`,
    ].join("\n");

    navigator.clipboard?.writeText(summary);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Inputs
          </p>
          <h2 className="text-2xl font-bold">Saw cut details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose a preset, then adjust slab size, thickness, spacing, cut
            direction, extra cuts, price per foot, setup cost, and minimum
            charge.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {(Object.keys(presets) as PresetType[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => applyPreset(item)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                preset === item
                  ? "border-orange-400 bg-orange-400 text-[#0B0F19]"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-orange-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberInput label="Length" suffix="ft" value={length} onChange={setLength} />
            <NumberInput label="Width" suffix="ft" value={width} onChange={setWidth} />
            <NumberInput label="Slab thickness" suffix="in" value={thickness} onChange={setThickness} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Target spacing" suffix="ft" value={targetSpacing} onChange={setTargetSpacing} />
            <SelectInput
              label="Cut purpose"
              value={cutPurpose}
              onChange={(value) => setCutPurpose(value as CutPurpose)}
              options={["Control joints", "Demolition sections", "Clean edge cuts", "Mixed layout"]}
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
            <input
              type="checkbox"
              checked={cutBothDirections}
              onChange={(event) => setCutBothDirections(event.target.checked)}
              className="h-5 w-5 accent-orange-400"
            />
            <span className="text-sm font-medium text-white">
              Include cuts in both directions
            </span>
          </label>

          <NumberInput label="Extra edge/demo cuts" suffix="ft" value={extraCutLength} onChange={setExtraCutLength} />

          <div className="grid gap-4 sm:grid-cols-3">
            <NumberInput
              label="Saw cutting price"
              prefix="$"
              suffix="/ft"
              value={costPerLinearFoot}
              onChange={setCostPerLinearFoot}
            />
            <NumberInput label="Setup cost" prefix="$" value={setupCost} onChange={setSetupCost} />
            <NumberInput label="Minimum charge" prefix="$" value={minimumCharge} onChange={setMinimumCharge} />
          </div>

          <NumberInput
            label="Overrun allowance"
            suffix="%"
            value={wasteOrOverrunPercent}
            onChange={setWasteOrOverrunPercent}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Saw cut layout and cost</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review cut depth, spacing range, number of cuts, linear feet, panel
            layout, estimated cutting time, and total cost.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Saw cut depth guide" value={`${formatNumber(result.sawCutDepth)} in`} highlight />
          <ResultCard label="Total cut length" value={`${formatNumber(result.totalCutFeet)} ft`} />
          <ResultCard label="Cut count" value={`${result.crossCuts + result.lengthwiseCuts}`} />
          <ResultCard label="Estimated total cost" value={formatCurrency(result.totalCost)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Depth and spacing guide</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Minimum depth guide" value={`${formatNumber(result.minimumDepth)} in`} />
            <ResultRow label="Typical control joint depth" value={`${formatNumber(result.sawCutDepth)} in`} />
            <ResultRow label="Deeper cut reference" value={`${formatNumber(result.deeperCutDepth)} in`} />
            <ResultRow label="Spacing guide low" value={`${formatNumber(result.spacingGuideLow)} ft`} />
            <ResultRow label="Spacing guide high" value={`${formatNumber(result.spacingGuideHigh)} ft`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Cut layout</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Cross cuts" value={`${result.crossCuts}`} />
            <ResultRow label="Cross cut length" value={`${formatNumber(result.crossCutFeet)} ft`} />
            <ResultRow label="Lengthwise cuts" value={`${result.lengthwiseCuts}`} />
            <ResultRow label="Lengthwise cut length" value={`${formatNumber(result.lengthwiseCutFeet)} ft`} />
            <ResultRow label="Layout cut length" value={`${formatNumber(result.layoutCutFeet)} ft`} />
            <ResultRow label="Extra edge/demo cuts" value={`${formatNumber(result.extraCutLength)} ft`} />
            <ResultRow label="Overrun allowance" value={`${formatNumber(result.overrunFeet)} ft`} />
            <ResultRow label="Total saw cut length" value={`${formatNumber(result.totalCutFeet)} ft`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Panel layout</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Panel layout" value={`${result.panelsLong} × ${result.panelsWide}`} />
            <ResultRow label="Panel count" value={`${result.panelCount}`} />
            <ResultRow label="Average panel size" value={`${formatNumber(result.averagePanelLength)} ft × ${formatNumber(result.averagePanelWidth)} ft`} />
            <ResultRow label="Estimated cutting time" value={`${formatNumber(result.estimatedCuttingHours)} hrs`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Cost breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Cutting cost" value={formatCurrency(result.cutCost)} />
            <ResultRow label="Setup cost" value={formatCurrency(result.setupCost)} />
            <ResultRow label="Subtotal" value={formatCurrency(result.subtotal)} />
            <ResultRow label="Minimum charge" value={formatCurrency(result.minimumCharge)} />
            <ResultRow label="Minimum charge adjustment" value={formatCurrency(result.minimumChargeAdjustment)} />
            <ResultRow label="Total estimated cost" value={formatCurrency(result.totalCost)} />
            <ResultRow label="Cost per sq ft" value={formatCurrency(result.costPerSquareFoot)} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Planning notes</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#A0AEC0]">
            {result.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={copyResults}
          className="mt-6 w-full rounded-2xl bg-orange-400 px-5 py-4 text-sm font-bold text-[#0B0F19] transition hover:bg-orange-300"
        >
          Copy results
        </button>
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
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">{label}</span>
      <div className="flex overflow-hidden rounded-2xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-orange-400">
        {prefix ? (
          <span className="flex items-center px-3 text-sm text-[#A0AEC0]">{prefix}</span>
        ) : null}
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none"
        />
        {suffix ? (
          <span className="flex items-center px-3 text-sm text-[#A0AEC0]">{suffix}</span>
        ) : null}
      </div>
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-orange-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-orange-400 bg-orange-400 text-[#0B0F19]"
          : "border-[#1F2937] bg-[#0B0F19] text-white"
      }`}
    >
      <p className={`text-sm ${highlight ? "text-[#0B0F19]/70" : "text-[#A0AEC0]"}`}>
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
