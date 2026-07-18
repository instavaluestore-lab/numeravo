"use client";

import { useMemo, useState } from "react";

type ProjectType =
  | "Patio"
  | "Sidewalk"
  | "Driveway"
  | "Garage slab"
  | "Shed pad"
  | "Hot tub pad"
  | "Equipment pad"
  | "Custom";

const projectDefaults: Record<
  ProjectType,
  {
    thickness: number;
    baseDepth: number;
    reinforcement: string;
    note: string;
  }
> = {
  Patio: {
    thickness: 4,
    baseDepth: 4,
    reinforcement: "Wire mesh or fiber reinforcement may be used depending on project requirements.",
    note: "Common for light residential patio use with proper base preparation.",
  },
  Sidewalk: {
    thickness: 4,
    baseDepth: 4,
    reinforcement: "Often unreinforced or lightly reinforced depending on local requirements.",
    note: "Common for residential sidewalks and walkways.",
  },
  Driveway: {
    thickness: 5,
    baseDepth: 6,
    reinforcement: "Rebar, wire mesh, or fiber reinforcement may be considered for vehicle loads.",
    note: "Residential driveways often use 5 to 6 inches depending on traffic and soil.",
  },
  "Garage slab": {
    thickness: 5,
    baseDepth: 4,
    reinforcement: "Rebar or wire mesh is commonly considered depending on loads and local code.",
    note: "Garage slabs often need stronger preparation due to vehicles and point loads.",
  },
  "Shed pad": {
    thickness: 4,
    baseDepth: 4,
    reinforcement: "Wire mesh or fiber reinforcement may be used for added crack control.",
    note: "Common for light shed pads when soil and base are properly prepared.",
  },
  "Hot tub pad": {
    thickness: 6,
    baseDepth: 6,
    reinforcement: "Rebar grid reinforcement is commonly considered because water loads are heavy.",
    note: "Hot tub pads often need thicker concrete and strong base support.",
  },
  "Equipment pad": {
    thickness: 6,
    baseDepth: 6,
    reinforcement: "Rebar or wire mesh may be required depending on equipment weight and vibration.",
    note: "Equipment pads should account for static load, vibration, and anchoring.",
  },
  Custom: {
    thickness: 4,
    baseDepth: 4,
    reinforcement: "Confirm reinforcement based on use, loads, soil, and project specifications.",
    note: "Custom settings should be checked against local code or engineering requirements.",
  },
};

export default function ConcreteSlabThicknessClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Patio");
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(15);
  const [thicknessInches, setThicknessInches] = useState(4);
  const [baseDepthInches, setBaseDepthInches] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);
  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [basePricePerTon, setBasePricePerTon] = useState(45);
  const [baseTonsPerCubicYard, setBaseTonsPerCubicYard] = useState(1.45);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const area = length * width;
    const concreteCubicFeet = area * (thicknessInches / 12);
    const concreteYards = concreteCubicFeet / 27;
    const concreteYardsWithWaste = concreteYards * (1 + wastePercent / 100);
    const concreteWeight = concreteYardsWithWaste * 4050;

    const baseCubicFeet = area * (baseDepthInches / 12);
    const baseCubicYards = baseCubicFeet / 27;
    const baseTons = baseCubicYards * baseTonsPerCubicYard;

    const concreteCost = concreteYardsWithWaste * concretePricePerYard;
    const baseCost = baseTons * basePricePerTon;
    const totalMaterialCost = concreteCost + baseCost;
    const costPerSquareFoot = area > 0 ? totalMaterialCost / area : 0;

    return {
      area,
      concreteCubicFeet,
      concreteYards,
      concreteYardsWithWaste,
      concreteWeight,
      baseCubicYards,
      baseTons,
      concreteCost,
      baseCost,
      totalMaterialCost,
      costPerSquareFoot,
    };
  }, [
    length,
    width,
    thicknessInches,
    baseDepthInches,
    wastePercent,
    concretePricePerYard,
    basePricePerTon,
    baseTonsPerCubicYard,
  ]);

  function applyPreset(type: ProjectType) {
    setProjectType(type);
    const preset = projectDefaults[type];
    setThicknessInches(preset.thickness);
    setBaseDepthInches(preset.baseDepth);

    if (type === "Patio") {
      setLength(20);
      setWidth(15);
    }

    if (type === "Sidewalk") {
      setLength(40);
      setWidth(4);
    }

    if (type === "Driveway") {
      setLength(40);
      setWidth(16);
    }

    if (type === "Garage slab") {
      setLength(24);
      setWidth(24);
    }

    if (type === "Shed pad") {
      setLength(12);
      setWidth(16);
    }

    if (type === "Hot tub pad") {
      setLength(10);
      setWidth(10);
    }

    if (type === "Equipment pad") {
      setLength(8);
      setWidth(8);
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
    const preset = projectDefaults[projectType];

    const text = `Concrete Slab Thickness Estimate
Project type: ${projectType}
Slab size: ${length} ft x ${width} ft
Slab area: ${formatNumber(results.area)} sq ft
Recommended / selected thickness: ${thicknessInches} in
Base depth: ${baseDepthInches} in
Concrete yards: ${formatNumber(results.concreteYards)} yd³
Concrete yards with waste: ${formatNumber(results.concreteYardsWithWaste)} yd³
Estimated concrete weight: ${formatNumber(results.concreteWeight, 0)} lb
Base material: ${formatNumber(results.baseCubicYards)} yd³ / ${formatNumber(results.baseTons)} tons
Concrete cost: ${formatCurrency(results.concreteCost)}
Base cost: ${formatCurrency(results.baseCost)}
Estimated material total: ${formatCurrency(results.totalMaterialCost)}
Cost per square foot: ${formatCurrency(results.costPerSquareFoot)}
Reinforcement note: ${preset.reinforcement}
Planning note: ${preset.note}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const currentPreset = projectDefaults[projectType];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate slab thickness and material needs
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Choose a slab type or enter custom dimensions to estimate thickness,
          concrete yards, base material, weight, and material cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              "Patio",
              "Sidewalk",
              "Driveway",
              "Garage slab",
              "Shed pad",
              "Hot tub pad",
              "Equipment pad",
              "Custom",
            ] as ProjectType[]
          ).map((type) => (
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
          <NumberInput label="Slab length" suffix="ft" value={length} setValue={setLength} />
          <NumberInput label="Slab width" suffix="ft" value={width} setValue={setWidth} />
          <NumberInput
            label="Concrete thickness"
            suffix="in"
            value={thicknessInches}
            setValue={(value) => {
              setProjectType("Custom");
              setThicknessInches(value);
            }}
          />
          <NumberInput
            label="Base depth"
            suffix="in"
            value={baseDepthInches}
            setValue={(value) => {
              setProjectType("Custom");
              setBaseDepthInches(value);
            }}
          />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
          <NumberInput label="Base price" suffix="$/ton" value={basePricePerTon} setValue={setBasePricePerTon} />
          <NumberInput label="Base density" suffix="tons/yd³" value={baseTonsPerCubicYard} setValue={setBaseTonsPerCubicYard} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Planning note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{currentPreset.note}</p>
          <p className="mt-3 text-sm font-semibold text-white">Reinforcement note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            {currentPreset.reinforcement}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Slab thickness estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Selected thickness</p>
          <p className="mt-2 text-5xl font-bold text-white">{thicknessInches} in</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatNumber(results.concreteYardsWithWaste)} yd³ with waste.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Slab area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Concrete cubic feet" value={`${formatNumber(results.concreteCubicFeet)} ft³`} />
          <ResultRow label="Concrete yards" value={`${formatNumber(results.concreteYards)} yd³`} />
          <ResultRow label="Yards with waste" value={`${formatNumber(results.concreteYardsWithWaste)} yd³`} />
          <ResultRow label="Estimated concrete weight" value={`${formatNumber(results.concreteWeight, 0)} lb`} />
          <ResultRow label="Base material" value={`${formatNumber(results.baseCubicYards)} yd³`} />
          <ResultRow label="Base tons" value={`${formatNumber(results.baseTons)} tons`} />
          <ResultRow label="Concrete cost" value={formatCurrency(results.concreteCost)} />
          <ResultRow label="Base cost" value={formatCurrency(results.baseCost)} />
          <ResultRow label="Estimated material total" value={formatCurrency(results.totalMaterialCost)} />
          <ResultRow label="Cost per square foot" value={formatCurrency(results.costPerSquareFoot)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator provides estimating guidance only. Final slab thickness
          should follow local code, engineering, project specifications, soil
          conditions, loading, reinforcement, and base preparation requirements.
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
