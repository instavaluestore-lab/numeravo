"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Driveway"
  | "Patio"
  | "Sidewalk"
  | "Slab"
  | "Garage slab"
  | "Custom";

type ExposureType = "Interior" | "Exterior mild" | "Exterior hot/cold" | "Heavy sun exposure";

const presets: Record<
  PresetType,
  {
    length: number;
    width: number;
    slabThickness: number;
    targetSpacing: number;
    isolationLength: number;
    exposure: ExposureType;
  }
> = {
  Driveway: {
    length: 40,
    width: 16,
    slabThickness: 4,
    targetSpacing: 12,
    isolationLength: 16,
    exposure: "Exterior hot/cold",
  },
  Patio: {
    length: 20,
    width: 16,
    slabThickness: 4,
    targetSpacing: 10,
    isolationLength: 20,
    exposure: "Exterior mild",
  },
  Sidewalk: {
    length: 50,
    width: 4,
    slabThickness: 4,
    targetSpacing: 8,
    isolationLength: 4,
    exposure: "Exterior hot/cold",
  },
  Slab: {
    length: 30,
    width: 20,
    slabThickness: 4,
    targetSpacing: 12,
    isolationLength: 0,
    exposure: "Interior",
  },
  "Garage slab": {
    length: 24,
    width: 24,
    slabThickness: 4,
    targetSpacing: 12,
    isolationLength: 24,
    exposure: "Interior",
  },
  Custom: {
    length: 24,
    width: 16,
    slabThickness: 4,
    targetSpacing: 10,
    isolationLength: 0,
    exposure: "Exterior mild",
  },
};

const exposureMultipliers: Record<ExposureType, number> = {
  Interior: 1.1,
  "Exterior mild": 1,
  "Exterior hot/cold": 0.9,
  "Heavy sun exposure": 0.8,
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

export default function ConcreteExpansionJointSpacingClient() {
  const [preset, setPreset] = useState<PresetType>("Driveway");
  const [length, setLength] = useState(40);
  const [width, setWidth] = useState(16);
  const [slabThickness, setSlabThickness] = useState(4);
  const [targetSpacing, setTargetSpacing] = useState(12);
  const [isolationLength, setIsolationLength] = useState(16);
  const [jointMaterialCostPerFoot, setJointMaterialCostPerFoot] = useState(2.25);
  const [sealantCostPerFoot, setSealantCostPerFoot] = useState(1.5);
  const [laborCostPerFoot, setLaborCostPerFoot] = useState(3);
  const [wastePercent, setWastePercent] = useState(10);
  const [exposure, setExposure] = useState<ExposureType>("Exterior hot/cold");

  function applyPreset(nextPreset: PresetType) {
    const selected = presets[nextPreset];
    setPreset(nextPreset);
    setLength(selected.length);
    setWidth(selected.width);
    setSlabThickness(selected.slabThickness);
    setTargetSpacing(selected.targetSpacing);
    setIsolationLength(selected.isolationLength);
    setExposure(selected.exposure);
  }

  const result = useMemo(() => {
    const safeLength = clampNumber(length);
    const safeWidth = clampNumber(width);
    const safeThickness = clampNumber(slabThickness);
    const safeTargetSpacing = Math.max(clampNumber(targetSpacing, 10), 1);
    const safeIsolationLength = clampNumber(isolationLength);
    const safeJointMaterialCostPerFoot = clampNumber(jointMaterialCostPerFoot);
    const safeSealantCostPerFoot = clampNumber(sealantCostPerFoot);
    const safeLaborCostPerFoot = clampNumber(laborCostPerFoot);
    const safeWastePercent = clampNumber(wastePercent);

    const exposureMultiplier = exposureMultipliers[exposure];
    const thicknessSuggestedSpacing = safeThickness * 2.5;
    const adjustedSpacing = Math.max(
      Math.min(safeTargetSpacing * exposureMultiplier, thicknessSuggestedSpacing),
      4,
    );

    const lengthwiseJoints = Math.max(Math.ceil(safeWidth / adjustedSpacing) - 1, 0);
    const crosswiseJoints = Math.max(Math.ceil(safeLength / adjustedSpacing) - 1, 0);

    const lengthwiseJointFeet = lengthwiseJoints * safeLength;
    const crosswiseJointFeet = crosswiseJoints * safeWidth;
    const internalJointFeet = lengthwiseJointFeet + crosswiseJointFeet;

    const totalJointFeetBeforeWaste = internalJointFeet + safeIsolationLength;
    const wasteFeet = totalJointFeetBeforeWaste * (safeWastePercent / 100);
    const totalJointFeet = totalJointFeetBeforeWaste + wasteFeet;

    const totalJointCount = lengthwiseJoints + crosswiseJoints;
    const panelsLong = crosswiseJoints + 1;
    const panelsWide = lengthwiseJoints + 1;
    const panelCount = panelsLong * panelsWide;
    const averagePanelLength = panelsLong > 0 ? safeLength / panelsLong : 0;
    const averagePanelWidth = panelsWide > 0 ? safeWidth / panelsWide : 0;

    const materialCost = totalJointFeet * safeJointMaterialCostPerFoot;
    const sealantCost = totalJointFeet * safeSealantCostPerFoot;
    const laborCost = totalJointFeet * safeLaborCostPerFoot;
    const totalCost = materialCost + sealantCost + laborCost;
    const costPerSquareFoot = safeLength * safeWidth > 0 ? totalCost / (safeLength * safeWidth) : 0;

    const notes: string[] = [];

    if (safeTargetSpacing > thicknessSuggestedSpacing) {
      notes.push("The selected spacing is wider than the thickness-based planning rule. Consider tighter spacing.");
    }

    if (exposure === "Exterior hot/cold" || exposure === "Heavy sun exposure") {
      notes.push("Exterior temperature swings and direct sun can justify closer joint spacing.");
    }

    if (safeIsolationLength === 0) {
      notes.push("Isolation joint length is set to zero. Add length around buildings, walls, columns, steps, or existing slabs if applicable.");
    }

    if (averagePanelLength / Math.max(averagePanelWidth, 1) > 1.5) {
      notes.push("Panels are long and narrow. More balanced panels usually perform better.");
    }

    if (notes.length === 0) {
      notes.push("Joint layout looks reasonable for the selected slab size and exposure.");
    }

    return {
      exposureMultiplier,
      thicknessSuggestedSpacing,
      adjustedSpacing,
      lengthwiseJoints,
      crosswiseJoints,
      totalJointCount,
      lengthwiseJointFeet,
      crosswiseJointFeet,
      internalJointFeet,
      isolationLength: safeIsolationLength,
      totalJointFeetBeforeWaste,
      wasteFeet,
      totalJointFeet,
      panelsLong,
      panelsWide,
      panelCount,
      averagePanelLength,
      averagePanelWidth,
      materialCost,
      sealantCost,
      laborCost,
      totalCost,
      costPerSquareFoot,
      notes,
    };
  }, [
    length,
    width,
    slabThickness,
    targetSpacing,
    isolationLength,
    jointMaterialCostPerFoot,
    sealantCostPerFoot,
    laborCostPerFoot,
    wastePercent,
    exposure,
  ]);

  function copyResults() {
    const summary = [
      "Concrete Expansion Joint Spacing Estimate",
      `Preset: ${preset}`,
      `Length: ${formatNumber(length)} ft`,
      `Width: ${formatNumber(width)} ft`,
      `Slab thickness: ${formatNumber(slabThickness)} in`,
      `Recommended spacing used: ${formatNumber(result.adjustedSpacing)} ft`,
      `Internal joint count: ${result.totalJointCount}`,
      `Panel layout: ${result.panelsLong} × ${result.panelsWide}`,
      `Internal joint length: ${formatNumber(result.internalJointFeet)} ft`,
      `Isolation joint length: ${formatNumber(result.isolationLength)} ft`,
      `Total joint material with waste: ${formatNumber(result.totalJointFeet)} ft`,
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
          <h2 className="text-2xl font-bold">Expansion joint details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose a slab type, then adjust dimensions, spacing, exposure,
            isolation length, material cost, sealant, labor, and waste.
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
            <NumberInput label="Slab thickness" suffix="in" value={slabThickness} onChange={setSlabThickness} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Target joint spacing" suffix="ft" value={targetSpacing} onChange={setTargetSpacing} />
            <SelectInput
              label="Exposure"
              value={exposure}
              onChange={(value) => setExposure(value as ExposureType)}
              options={Object.keys(exposureMultipliers)}
            />
          </div>

          <NumberInput
            label="Isolation joint length"
            suffix="ft"
            value={isolationLength}
            onChange={setIsolationLength}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <NumberInput
              label="Joint material"
              prefix="$"
              suffix="/ft"
              value={jointMaterialCostPerFoot}
              onChange={setJointMaterialCostPerFoot}
            />
            <NumberInput
              label="Sealant"
              prefix="$"
              suffix="/ft"
              value={sealantCostPerFoot}
              onChange={setSealantCostPerFoot}
            />
            <NumberInput
              label="Labor"
              prefix="$"
              suffix="/ft"
              value={laborCostPerFoot}
              onChange={setLaborCostPerFoot}
            />
          </div>

          <NumberInput label="Material waste" suffix="%" value={wastePercent} onChange={setWastePercent} />
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Joint spacing and layout</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review spacing, joint count, panel layout, isolation joint length,
            total joint material, and estimated cost.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Spacing used" value={`${formatNumber(result.adjustedSpacing)} ft`} highlight />
          <ResultCard label="Internal joint count" value={`${result.totalJointCount}`} />
          <ResultCard label="Total joint material" value={`${formatNumber(result.totalJointFeet)} ft`} />
          <ResultCard label="Estimated total cost" value={formatCurrency(result.totalCost)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Joint layout</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Thickness-based spacing guide" value={`${formatNumber(result.thicknessSuggestedSpacing)} ft`} />
            <ResultRow label="Exposure multiplier" value={`${formatNumber(result.exposureMultiplier, 2)}×`} />
            <ResultRow label="Lengthwise joints" value={`${result.lengthwiseJoints}`} />
            <ResultRow label="Crosswise joints" value={`${result.crosswiseJoints}`} />
            <ResultRow label="Panel layout" value={`${result.panelsLong} × ${result.panelsWide}`} />
            <ResultRow label="Panel count" value={`${result.panelCount}`} />
            <ResultRow label="Average panel size" value={`${formatNumber(result.averagePanelLength)} ft × ${formatNumber(result.averagePanelWidth)} ft`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Material length</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Lengthwise joint feet" value={`${formatNumber(result.lengthwiseJointFeet)} ft`} />
            <ResultRow label="Crosswise joint feet" value={`${formatNumber(result.crosswiseJointFeet)} ft`} />
            <ResultRow label="Internal joint length" value={`${formatNumber(result.internalJointFeet)} ft`} />
            <ResultRow label="Isolation joint length" value={`${formatNumber(result.isolationLength)} ft`} />
            <ResultRow label="Joint length before waste" value={`${formatNumber(result.totalJointFeetBeforeWaste)} ft`} />
            <ResultRow label="Waste allowance" value={`${formatNumber(result.wasteFeet)} ft`} />
            <ResultRow label="Total joint material" value={`${formatNumber(result.totalJointFeet)} ft`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Cost breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Joint material cost" value={formatCurrency(result.materialCost)} />
            <ResultRow label="Sealant cost" value={formatCurrency(result.sealantCost)} />
            <ResultRow label="Labor cost" value={formatCurrency(result.laborCost)} />
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
