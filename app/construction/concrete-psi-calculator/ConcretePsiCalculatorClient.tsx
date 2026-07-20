"use client";

import { useMemo, useState } from "react";

type ProjectType =
  | "Sidewalk"
  | "Patio"
  | "Residential slab"
  | "Driveway"
  | "Garage floor"
  | "Footing"
  | "Heavy-duty slab";

type LoadLevel = "Light" | "Moderate" | "Heavy";
type Exposure = "Indoor / protected" | "Outdoor mild" | "Freeze-thaw / harsh";
type Reinforcement = "None" | "Wire mesh" | "Rebar";

const projectBasePsi: Record<ProjectType, number> = {
  Sidewalk: 3000,
  Patio: 3000,
  "Residential slab": 3000,
  Driveway: 3500,
  "Garage floor": 3500,
  Footing: 3500,
  "Heavy-duty slab": 4000,
};

const presets: Record<
  ProjectType,
  {
    thicknessInches: number;
    loadLevel: LoadLevel;
    exposure: Exposure;
    reinforcement: Reinforcement;
  }
> = {
  Sidewalk: {
    thicknessInches: 4,
    loadLevel: "Light",
    exposure: "Outdoor mild",
    reinforcement: "None",
  },
  Patio: {
    thicknessInches: 4,
    loadLevel: "Light",
    exposure: "Outdoor mild",
    reinforcement: "Wire mesh",
  },
  "Residential slab": {
    thicknessInches: 4,
    loadLevel: "Moderate",
    exposure: "Indoor / protected",
    reinforcement: "Wire mesh",
  },
  Driveway: {
    thicknessInches: 5,
    loadLevel: "Heavy",
    exposure: "Outdoor mild",
    reinforcement: "Rebar",
  },
  "Garage floor": {
    thicknessInches: 4,
    loadLevel: "Moderate",
    exposure: "Indoor / protected",
    reinforcement: "Wire mesh",
  },
  Footing: {
    thicknessInches: 8,
    loadLevel: "Heavy",
    exposure: "Outdoor mild",
    reinforcement: "Rebar",
  },
  "Heavy-duty slab": {
    thicknessInches: 6,
    loadLevel: "Heavy",
    exposure: "Freeze-thaw / harsh",
    reinforcement: "Rebar",
  },
};

export default function ConcretePsiCalculatorClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Driveway");
  const [thicknessInches, setThicknessInches] = useState(5);
  const [loadLevel, setLoadLevel] = useState<LoadLevel>("Heavy");
  const [exposure, setExposure] = useState<Exposure>("Outdoor mild");
  const [reinforcement, setReinforcement] = useState<Reinforcement>("Rebar");
  const [baseCostPerYard, setBaseCostPerYard] = useState(155);
  const [cubicYards, setCubicYards] = useState(6);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: ProjectType) {
    const preset = presets[type];

    setProjectType(type);
    setThicknessInches(preset.thicknessInches);
    setLoadLevel(preset.loadLevel);
    setExposure(preset.exposure);
    setReinforcement(preset.reinforcement);
  }

  const results = useMemo(() => {
    let recommendedPsi = projectBasePsi[projectType];

    if (loadLevel === "Moderate") recommendedPsi += 250;
    if (loadLevel === "Heavy") recommendedPsi += 500;

    if (exposure === "Freeze-thaw / harsh") recommendedPsi += 500;
    if (exposure === "Outdoor mild") recommendedPsi += 0;

    if (thicknessInches < 4) recommendedPsi += 500;
    if (thicknessInches >= 6 && loadLevel !== "Heavy") recommendedPsi -= 250;

    if (reinforcement === "None" && loadLevel === "Heavy") recommendedPsi += 250;

    recommendedPsi = Math.max(2500, Math.min(5000, Math.round(recommendedPsi / 500) * 500));

    const lowRange = Math.max(2500, recommendedPsi - 500);
    const highRange = Math.min(5000, recommendedPsi + 500);

    const strengthClass =
      recommendedPsi <= 3000
        ? "Light-duty"
        : recommendedPsi <= 3500
          ? "Standard residential"
          : recommendedPsi <= 4000
            ? "Higher residential / driveway"
            : "Heavy-duty / higher strength";

    const psiUpgradeFrom3000 = Math.max(0, recommendedPsi - 3000);
    const estimatedUpgradePerYard =
      psiUpgradeFrom3000 === 0 ? 0 : Math.ceil(psiUpgradeFrom3000 / 500) * 6;
    const estimatedUpgradeCost = estimatedUpgradePerYard * cubicYards;
    const estimatedConcreteCost = (baseCostPerYard + estimatedUpgradePerYard) * cubicYards;

    const warnings: string[] = [];

    if (projectType === "Driveway" && recommendedPsi < 3500) {
      warnings.push("Driveways commonly need stronger concrete than light-duty flatwork.");
    }

    if (thicknessInches < 4) {
      warnings.push("Thin slabs are more sensitive to base prep, cracking, and load limits.");
    }

    if (exposure === "Freeze-thaw / harsh") {
      warnings.push("Freeze-thaw exposure may require air-entrained concrete and a durable exterior mix.");
    }

    if (loadLevel === "Heavy" && reinforcement === "None") {
      warnings.push("Heavy-use slabs often benefit from reinforcement and stronger base preparation.");
    }

    if (warnings.length === 0) {
      warnings.push("Selection looks reasonable for planning. Confirm final mix with your supplier or project specifications.");
    }

    return {
      recommendedPsi,
      lowRange,
      highRange,
      strengthClass,
      estimatedUpgradePerYard,
      estimatedUpgradeCost,
      estimatedConcreteCost,
      warnings,
    };
  }, [
    projectType,
    thicknessInches,
    loadLevel,
    exposure,
    reinforcement,
    baseCostPerYard,
    cubicYards,
  ]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete PSI Calculator
Project type: ${projectType}
Slab thickness: ${formatNumber(thicknessInches)} in
Load level: ${loadLevel}
Exposure: ${exposure}
Reinforcement: ${reinforcement}
Recommended PSI: ${results.recommendedPsi} PSI
Planning range: ${results.lowRange}-${results.highRange} PSI
Strength class: ${results.strengthClass}
Estimated PSI upgrade: $${formatNumber(results.estimatedUpgradePerYard)}/yd³
Estimated concrete cost: $${formatNumber(results.estimatedConcreteCost)}
Notes: ${results.warnings.join(" ")}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate recommended concrete PSI
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Select the project type, slab thickness, load level, exposure, and
          reinforcement to estimate a practical concrete strength range.
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
          <NumberInput
            label="Slab / section thickness"
            suffix="in"
            value={thicknessInches}
            setValue={setThicknessInches}
          />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Load level</span>
            <select
              value={loadLevel}
              onChange={(event) => setLoadLevel(event.target.value as LoadLevel)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Light</option>
              <option>Moderate</option>
              <option>Heavy</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Exposure</span>
            <select
              value={exposure}
              onChange={(event) => setExposure(event.target.value as Exposure)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Indoor / protected</option>
              <option>Outdoor mild</option>
              <option>Freeze-thaw / harsh</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Reinforcement</span>
            <select
              value={reinforcement}
              onChange={(event) => setReinforcement(event.target.value as Reinforcement)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>None</option>
              <option>Wire mesh</option>
              <option>Rebar</option>
            </select>
          </label>

          <NumberInput
            label="Concrete amount"
            suffix="yd³"
            value={cubicYards}
            setValue={setCubicYards}
          />

          <NumberInput
            label="Base 3000 PSI price"
            suffix="$/yd³"
            value={baseCostPerYard}
            setValue={setBaseCostPerYard}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Important planning note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            PSI is only one part of slab performance. Thickness, base compaction,
            drainage, reinforcement, curing, and joint layout can matter as much as
            the concrete strength rating.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Recommended PSI</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Recommended concrete strength</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {results.recommendedPsi} PSI
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            Planning range: {results.lowRange}–{results.highRange} PSI.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Strength class" value={results.strengthClass} />
          <ResultRow label="Project type" value={projectType} />
          <ResultRow label="Thickness" value={`${formatNumber(thicknessInches)} in`} />
          <ResultRow label="Load level" value={loadLevel} />
          <ResultRow label="Exposure" value={exposure} />
          <ResultRow label="Reinforcement" value={reinforcement} />
          <ResultRow
            label="Estimated PSI upgrade"
            value={`$${formatNumber(results.estimatedUpgradePerYard)}/yd³`}
          />
          <ResultRow
            label="Estimated upgrade total"
            value={`$${formatNumber(results.estimatedUpgradeCost)}`}
          />
          <ResultRow
            label="Estimated concrete total"
            value={`$${formatNumber(results.estimatedConcreteCost)}`}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">Recommendation notes</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[#A0AEC0]">
            {results.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          Use this as a planning tool. Final PSI should follow supplier guidance,
          project specifications, local code, and engineering requirements.
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
