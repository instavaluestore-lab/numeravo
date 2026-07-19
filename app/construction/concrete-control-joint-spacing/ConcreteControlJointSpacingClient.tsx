"use client";

import { useMemo, useState } from "react";

type ProjectType =
  | "Slab"
  | "Driveway"
  | "Patio"
  | "Sidewalk"
  | "Pad"
  | "Garage floor";

const presets: Record<
  ProjectType,
  {
    lengthFeet: number;
    widthFeet: number;
    thicknessInches: number;
    spacingMultiplier: number;
  }
> = {
  Slab: {
    lengthFeet: 20,
    widthFeet: 16,
    thicknessInches: 4,
    spacingMultiplier: 30,
  },
  Driveway: {
    lengthFeet: 40,
    widthFeet: 12,
    thicknessInches: 5,
    spacingMultiplier: 24,
  },
  Patio: {
    lengthFeet: 18,
    widthFeet: 14,
    thicknessInches: 4,
    spacingMultiplier: 30,
  },
  Sidewalk: {
    lengthFeet: 40,
    widthFeet: 4,
    thicknessInches: 4,
    spacingMultiplier: 24,
  },
  Pad: {
    lengthFeet: 12,
    widthFeet: 12,
    thicknessInches: 4,
    spacingMultiplier: 30,
  },
  "Garage floor": {
    lengthFeet: 24,
    widthFeet: 22,
    thicknessInches: 4,
    spacingMultiplier: 30,
  },
};

export default function ConcreteControlJointSpacingClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Slab");
  const [lengthFeet, setLengthFeet] = useState(20);
  const [widthFeet, setWidthFeet] = useState(16);
  const [thicknessInches, setThicknessInches] = useState(4);
  const [spacingMultiplier, setSpacingMultiplier] = useState(30);
  const [customMaxSpacing, setCustomMaxSpacing] = useState(10);
  const [useCustomSpacing, setUseCustomSpacing] = useState(false);
  const [sawCutCostPerFoot, setSawCutCostPerFoot] = useState(2.5);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: ProjectType) {
    const preset = presets[type];

    setProjectType(type);
    setLengthFeet(preset.lengthFeet);
    setWidthFeet(preset.widthFeet);
    setThicknessInches(preset.thicknessInches);
    setSpacingMultiplier(preset.spacingMultiplier);
    setUseCustomSpacing(false);
  }

  const results = useMemo(() => {
    const area = lengthFeet * widthFeet;
    const recommendedSpacing = (thicknessInches * spacingMultiplier) / 12;
    const minRuleSpacing = (thicknessInches * 24) / 12;
    const maxRuleSpacing = (thicknessInches * 30) / 12;
    const targetSpacing = useCustomSpacing ? customMaxSpacing : recommendedSpacing;

    const lengthPanels = Math.max(1, Math.ceil(lengthFeet / targetSpacing));
    const widthPanels = Math.max(1, Math.ceil(widthFeet / targetSpacing));

    const actualLengthPanel = lengthFeet / lengthPanels;
    const actualWidthPanel = widthFeet / widthPanels;

    const crossCuts = Math.max(0, lengthPanels - 1);
    const lengthwiseCuts = Math.max(0, widthPanels - 1);

    const crossCutLength = crossCuts * widthFeet;
    const lengthwiseCutLength = lengthwiseCuts * lengthFeet;
    const totalCutLength = crossCutLength + lengthwiseCutLength;

    const sawCutDepth = thicknessInches / 4;
    const panelRatio =
      Math.max(actualLengthPanel, actualWidthPanel) /
      Math.max(0.01, Math.min(actualLengthPanel, actualWidthPanel));

    const estimatedSawCutCost = totalCutLength * sawCutCostPerFoot;

    let layoutNote = "Panel proportions look reasonable.";
    if (panelRatio > 1.5) {
      layoutNote =
        "Panel ratio is long and narrow. Consider adding or adjusting joints to keep panels closer to square.";
    }

    return {
      area,
      recommendedSpacing,
      minRuleSpacing,
      maxRuleSpacing,
      targetSpacing,
      lengthPanels,
      widthPanels,
      actualLengthPanel,
      actualWidthPanel,
      crossCuts,
      lengthwiseCuts,
      crossCutLength,
      lengthwiseCutLength,
      totalCutLength,
      sawCutDepth,
      panelRatio,
      estimatedSawCutCost,
      layoutNote,
    };
  }, [
    lengthFeet,
    widthFeet,
    thicknessInches,
    spacingMultiplier,
    customMaxSpacing,
    useCustomSpacing,
    sawCutCostPerFoot,
  ]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete Control Joint Spacing Calculator
Project type: ${projectType}
Slab size: ${formatNumber(lengthFeet)} ft x ${formatNumber(widthFeet)} ft
Slab thickness: ${formatNumber(thicknessInches)} in
Area: ${formatNumber(results.area)} sq ft
Recommended spacing range: ${formatNumber(results.minRuleSpacing)} ft to ${formatNumber(results.maxRuleSpacing)} ft
Target spacing used: ${formatNumber(results.targetSpacing)} ft
Suggested panel layout: ${results.lengthPanels} x ${results.widthPanels}
Approx. panel size: ${formatNumber(results.actualLengthPanel)} ft x ${formatNumber(results.actualWidthPanel)} ft
Cross cuts: ${results.crossCuts}
Lengthwise cuts: ${results.lengthwiseCuts}
Total saw cut length: ${formatNumber(results.totalCutLength)} ft
Minimum saw cut depth: ${formatNumber(results.sawCutDepth)} in
Estimated saw cut cost: $${formatNumber(results.estimatedSawCutCost)}
Layout note: ${results.layoutNote}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate control joint spacing
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter slab dimensions and thickness to estimate control joint spacing,
          panel layout, saw cut depth, total cut length, and optional saw cutting cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(presets) as ProjectType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => applyPreset(type)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                projectType === type
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Slab length" suffix="ft" value={lengthFeet} setValue={setLengthFeet} />
          <NumberInput label="Slab width" suffix="ft" value={widthFeet} setValue={setWidthFeet} />
          <NumberInput label="Slab thickness" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
          <NumberInput label="Spacing multiplier" suffix="× thickness" value={spacingMultiplier} setValue={setSpacingMultiplier} />
          <NumberInput label="Saw cut cost" suffix="$/ft" value={sawCutCostPerFoot} setValue={setSawCutCostPerFoot} />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Spacing method</span>
            <select
              value={useCustomSpacing ? "custom" : "rule"}
              onChange={(event) => setUseCustomSpacing(event.target.value === "custom")}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option value="rule">Use thickness rule</option>
              <option value="custom">Use custom max spacing</option>
            </select>
          </label>

          {useCustomSpacing && (
            <NumberInput
              label="Custom maximum spacing"
              suffix="ft"
              value={customMaxSpacing}
              setValue={setCustomMaxSpacing}
            />
          )}
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Rule of thumb</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Control joints are often spaced about 24 to 30 times the slab thickness
            in inches. Saw cut depth is commonly at least one quarter of the slab
            thickness.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Recommended layout</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Target joint spacing</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatNumber(results.targetSpacing)} ft
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            Rule range: {formatNumber(results.minRuleSpacing)}–{formatNumber(results.maxRuleSpacing)} ft.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Slab area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Suggested panel layout" value={`${results.lengthPanels} × ${results.widthPanels}`} />
          <ResultRow
            label="Approx. panel size"
            value={`${formatNumber(results.actualLengthPanel)} ft × ${formatNumber(results.actualWidthPanel)} ft`}
          />
          <ResultRow label="Cross cuts" value={`${results.crossCuts}`} />
          <ResultRow label="Lengthwise cuts" value={`${results.lengthwiseCuts}`} />
          <ResultRow label="Cross cut length" value={`${formatNumber(results.crossCutLength)} ft`} />
          <ResultRow label="Lengthwise cut length" value={`${formatNumber(results.lengthwiseCutLength)} ft`} />
          <ResultRow label="Total saw cut length" value={`${formatNumber(results.totalCutLength)} ft`} />
          <ResultRow label="Minimum saw cut depth" value={`${formatNumber(results.sawCutDepth)} in`} />
          <ResultRow label="Panel ratio" value={`${formatNumber(results.panelRatio)}:1`} />
          <ResultRow label="Estimated saw cut cost" value={`$${formatNumber(results.estimatedSawCutCost)}`} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">Layout note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            {results.layoutNote}
          </p>
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This is a planning estimate. Follow project specifications, local code,
          engineer direction, and concrete contractor recommendations.
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
