"use client";

import { useMemo, useState } from "react";

type ProjectType =
  | "Slab / flatwork"
  | "Footing / trench"
  | "Wall"
  | "Round pier"
  | "Known cubic feet"
  | "Known cubic yards";

const projectDefaults: Record<
  ProjectType,
  {
    length: number;
    width: number;
    thickness: number;
    height: number;
    diameter: number;
    depth: number;
    knownCubicFeet: number;
    knownCubicYards: number;
    waste: number;
    note: string;
  }
> = {
  "Slab / flatwork": {
    length: 12,
    width: 12,
    thickness: 4,
    height: 0,
    diameter: 0,
    depth: 0,
    knownCubicFeet: 0,
    knownCubicYards: 0,
    waste: 10,
    note: "Best for slabs, patios, driveways, pads, sidewalks, and other rectangular flatwork.",
  },
  "Footing / trench": {
    length: 40,
    width: 1.5,
    thickness: 12,
    height: 0,
    diameter: 0,
    depth: 0,
    knownCubicFeet: 0,
    knownCubicYards: 0,
    waste: 10,
    note: "Best for continuous footings, trenches, grade beams, and rectangular concrete runs.",
  },
  Wall: {
    length: 20,
    width: 0,
    thickness: 8,
    height: 4,
    diameter: 0,
    depth: 0,
    knownCubicFeet: 0,
    knownCubicYards: 0,
    waste: 10,
    note: "Best for rectangular concrete walls. Enter wall length, wall height, and wall thickness.",
  },
  "Round pier": {
    length: 0,
    width: 0,
    thickness: 0,
    height: 0,
    diameter: 12,
    depth: 36,
    knownCubicFeet: 0,
    knownCubicYards: 0,
    waste: 10,
    note: "Best for round piers, post holes, deck footings, and Sonotube-style concrete pours.",
  },
  "Known cubic feet": {
    length: 0,
    width: 0,
    thickness: 0,
    height: 0,
    diameter: 0,
    depth: 0,
    knownCubicFeet: 54,
    knownCubicYards: 0,
    waste: 10,
    note: "Use this when you already know the concrete volume in cubic feet.",
  },
  "Known cubic yards": {
    length: 0,
    width: 0,
    thickness: 0,
    height: 0,
    diameter: 0,
    depth: 0,
    knownCubicFeet: 0,
    knownCubicYards: 2,
    waste: 10,
    note: "Use this when you already know the concrete volume in cubic yards before waste.",
  },
};

export default function ConcreteYardCalculatorClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Slab / flatwork");
  const [lengthFeet, setLengthFeet] = useState(12);
  const [widthFeet, setWidthFeet] = useState(12);
  const [thicknessInches, setThicknessInches] = useState(4);
  const [heightFeet, setHeightFeet] = useState(0);
  const [diameterInches, setDiameterInches] = useState(0);
  const [depthInches, setDepthInches] = useState(0);
  const [knownCubicFeet, setKnownCubicFeet] = useState(0);
  const [knownCubicYards, setKnownCubicYards] = useState(0);
  const [wastePercent, setWastePercent] = useState(10);
  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [truckCapacityYards, setTruckCapacityYards] = useState(10);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: ProjectType) {
    const preset = projectDefaults[type];

    setProjectType(type);
    setLengthFeet(preset.length);
    setWidthFeet(preset.width);
    setThicknessInches(preset.thickness);
    setHeightFeet(preset.height);
    setDiameterInches(preset.diameter);
    setDepthInches(preset.depth);
    setKnownCubicFeet(preset.knownCubicFeet);
    setKnownCubicYards(preset.knownCubicYards);
    setWastePercent(preset.waste);
  }

  const results = useMemo(() => {
    let cubicFeet = 0;

    if (projectType === "Slab / flatwork" || projectType === "Footing / trench") {
      cubicFeet = lengthFeet * widthFeet * (thicknessInches / 12);
    }

    if (projectType === "Wall") {
      cubicFeet = lengthFeet * heightFeet * (thicknessInches / 12);
    }

    if (projectType === "Round pier") {
      const radiusFeet = diameterInches / 12 / 2;
      const depthFeet = depthInches / 12;
      cubicFeet = Math.PI * radiusFeet * radiusFeet * depthFeet;
    }

    if (projectType === "Known cubic feet") {
      cubicFeet = knownCubicFeet;
    }

    if (projectType === "Known cubic yards") {
      cubicFeet = knownCubicYards * 27;
    }

    const cubicYards = cubicFeet / 27;
    const wasteYards = cubicYards * (wastePercent / 100);
    const orderYards = cubicYards + wasteYards;
    const materialCost = orderYards * concretePricePerYard;
    const truckloads = truckCapacityYards > 0 ? orderYards / truckCapacityYards : 0;

    const fortyPoundBags = Math.ceil(orderYards * 90);
    const sixtyPoundBags = Math.ceil(orderYards * 60);
    const eightyPoundBags = Math.ceil(orderYards * 45);
    const estimatedWeight = orderYards * 4050;

    return {
      cubicFeet,
      cubicYards,
      wasteYards,
      orderYards,
      materialCost,
      truckloads,
      fortyPoundBags,
      sixtyPoundBags,
      eightyPoundBags,
      estimatedWeight,
    };
  }, [
    projectType,
    lengthFeet,
    widthFeet,
    thicknessInches,
    heightFeet,
    diameterInches,
    depthInches,
    knownCubicFeet,
    knownCubicYards,
    wastePercent,
    concretePricePerYard,
    truckCapacityYards,
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
    const text = `Concrete Yard Calculator
Project type: ${projectType}
Cubic feet: ${formatNumber(results.cubicFeet)} ft³
Concrete yards before waste: ${formatNumber(results.cubicYards)} yd³
Waste allowance: ${wastePercent}%
Waste yards: ${formatNumber(results.wasteYards)} yd³
Order yards: ${formatNumber(results.orderYards)} yd³
Estimated material cost: ${formatCurrency(results.materialCost)}
Approx. truckloads: ${formatNumber(results.truckloads)}
40 lb bags: ${results.fortyPoundBags}
60 lb bags: ${results.sixtyPoundBags}
80 lb bags: ${results.eightyPoundBags}
Estimated concrete weight: ${formatNumber(results.estimatedWeight, 0)} lb`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const note = projectDefaults[projectType].note;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete yards
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter your project dimensions and convert concrete volume into cubic yards
          for ready-mix ordering.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              "Slab / flatwork",
              "Footing / trench",
              "Wall",
              "Round pier",
              "Known cubic feet",
              "Known cubic yards",
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
          {(projectType === "Slab / flatwork" ||
            projectType === "Footing / trench") && (
            <>
              <NumberInput label="Length" suffix="ft" value={lengthFeet} setValue={setLengthFeet} />
              <NumberInput label="Width" suffix="ft" value={widthFeet} setValue={setWidthFeet} />
              <NumberInput label="Thickness / depth" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
            </>
          )}

          {projectType === "Wall" && (
            <>
              <NumberInput label="Wall length" suffix="ft" value={lengthFeet} setValue={setLengthFeet} />
              <NumberInput label="Wall height" suffix="ft" value={heightFeet} setValue={setHeightFeet} />
              <NumberInput label="Wall thickness" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
            </>
          )}

          {projectType === "Round pier" && (
            <>
              <NumberInput label="Diameter" suffix="in" value={diameterInches} setValue={setDiameterInches} />
              <NumberInput label="Depth" suffix="in" value={depthInches} setValue={setDepthInches} />
            </>
          )}

          {projectType === "Known cubic feet" && (
            <NumberInput label="Known volume" suffix="ft³" value={knownCubicFeet} setValue={setKnownCubicFeet} />
          )}

          {projectType === "Known cubic yards" && (
            <NumberInput label="Known volume" suffix="yd³" value={knownCubicYards} setValue={setKnownCubicYards} />
          )}

          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
          <NumberInput label="Truck capacity" suffix="yd³" value={truckCapacityYards} setValue={setTruckCapacityYards} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Project note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{note}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Concrete yards needed</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Order quantity</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatNumber(results.orderYards)} yd³
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatNumber(results.cubicYards)} yd³ before waste.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Cubic feet" value={`${formatNumber(results.cubicFeet)} ft³`} />
          <ResultRow label="Concrete yards before waste" value={`${formatNumber(results.cubicYards)} yd³`} />
          <ResultRow label="Waste yards" value={`${formatNumber(results.wasteYards)} yd³`} />
          <ResultRow label="Order yards" value={`${formatNumber(results.orderYards)} yd³`} />
          <ResultRow label="Estimated material cost" value={formatCurrency(results.materialCost)} />
          <ResultRow label="Approx. truckloads" value={formatNumber(results.truckloads)} />
          <ResultRow label="40 lb bags" value={`${results.fortyPoundBags}`} />
          <ResultRow label="60 lb bags" value={`${results.sixtyPoundBags}`} />
          <ResultRow label="80 lb bags" value={`${results.eightyPoundBags}`} />
          <ResultRow label="Estimated concrete weight" value={`${formatNumber(results.estimatedWeight, 0)} lb`} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator uses standard estimating assumptions. Actual concrete
          yield, bag yield, supplier truck capacity, and waste requirements can vary.
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
