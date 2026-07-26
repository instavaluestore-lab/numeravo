"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Driveway"
  | "Patio"
  | "Sidewalk"
  | "Garage slab"
  | "Small pad"
  | "Custom";

type DifficultyType = "Easy access" | "Average" | "Difficult access" | "Reinforced/heavy";

const presets: Record<
  PresetType,
  {
    length: number;
    width: number;
    thickness: number;
    laborHours: number;
    equipmentCost: number;
    sawCutCost: number;
    difficulty: DifficultyType;
  }
> = {
  Driveway: {
    length: 30,
    width: 16,
    thickness: 4,
    laborHours: 14,
    equipmentCost: 450,
    sawCutCost: 150,
    difficulty: "Average",
  },
  Patio: {
    length: 20,
    width: 14,
    thickness: 4,
    laborHours: 8,
    equipmentCost: 250,
    sawCutCost: 75,
    difficulty: "Average",
  },
  Sidewalk: {
    length: 40,
    width: 4,
    thickness: 4,
    laborHours: 6,
    equipmentCost: 180,
    sawCutCost: 60,
    difficulty: "Easy access",
  },
  "Garage slab": {
    length: 22,
    width: 22,
    thickness: 4,
    laborHours: 16,
    equipmentCost: 500,
    sawCutCost: 150,
    difficulty: "Reinforced/heavy",
  },
  "Small pad": {
    length: 10,
    width: 10,
    thickness: 4,
    laborHours: 4,
    equipmentCost: 125,
    sawCutCost: 0,
    difficulty: "Easy access",
  },
  Custom: {
    length: 20,
    width: 12,
    thickness: 4,
    laborHours: 8,
    equipmentCost: 250,
    sawCutCost: 75,
    difficulty: "Average",
  },
};

const difficultyMultipliers: Record<DifficultyType, number> = {
  "Easy access": 1,
  Average: 1.15,
  "Difficult access": 1.35,
  "Reinforced/heavy": 1.5,
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

export default function ConcreteRemovalCostCalculatorClient() {
  const [preset, setPreset] = useState<PresetType>("Driveway");
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(16);
  const [thickness, setThickness] = useState(4);
  const [density, setDensity] = useState(150);
  const [laborHours, setLaborHours] = useState(14);
  const [laborRate, setLaborRate] = useState(65);
  const [equipmentCost, setEquipmentCost] = useState(450);
  const [sawCutCost, setSawCutCost] = useState(150);
  const [dumpsterCost, setDumpsterCost] = useState(450);
  const [disposalCostPerTon, setDisposalCostPerTon] = useState(55);
  const [haulOffCost, setHaulOffCost] = useState(300);
  const [permitOrMinimumFee, setPermitOrMinimumFee] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyType>("Average");
  const [taxRate, setTaxRate] = useState(0);

  function applyPreset(nextPreset: PresetType) {
    const selected = presets[nextPreset];
    setPreset(nextPreset);
    setLength(selected.length);
    setWidth(selected.width);
    setThickness(selected.thickness);
    setLaborHours(selected.laborHours);
    setEquipmentCost(selected.equipmentCost);
    setSawCutCost(selected.sawCutCost);
    setDifficulty(selected.difficulty);
  }

  const result = useMemo(() => {
    const safeLength = clampNumber(length);
    const safeWidth = clampNumber(width);
    const safeThickness = clampNumber(thickness);
    const safeDensity = clampNumber(density, 150);
    const safeLaborHours = clampNumber(laborHours);
    const safeLaborRate = clampNumber(laborRate);
    const safeEquipmentCost = clampNumber(equipmentCost);
    const safeSawCutCost = clampNumber(sawCutCost);
    const safeDumpsterCost = clampNumber(dumpsterCost);
    const safeDisposalCostPerTon = clampNumber(disposalCostPerTon);
    const safeHaulOffCost = clampNumber(haulOffCost);
    const safePermitOrMinimumFee = clampNumber(permitOrMinimumFee);
    const safeTaxRate = clampNumber(taxRate);

    const area = safeLength * safeWidth;
    const cubicFeet = area * (safeThickness / 12);
    const cubicYards = cubicFeet / 27;
    const weightPounds = cubicFeet * safeDensity;
    const weightTons = weightPounds / 2000;

    const baseLaborCost = safeLaborHours * safeLaborRate;
    const difficultyMultiplier = difficultyMultipliers[difficulty];
    const difficultyAdjustment = baseLaborCost * (difficultyMultiplier - 1);
    const adjustedLaborCost = baseLaborCost + difficultyAdjustment;

    const disposalCost = weightTons * safeDisposalCostPerTon;
    const subtotal =
      adjustedLaborCost +
      safeEquipmentCost +
      safeSawCutCost +
      safeDumpsterCost +
      disposalCost +
      safeHaulOffCost +
      safePermitOrMinimumFee;

    const tax = subtotal * (safeTaxRate / 100);
    const total = subtotal + tax;

    const costPerSquareFoot = area > 0 ? total / area : 0;
    const costPerCubicYard = cubicYards > 0 ? total / cubicYards : 0;
    const laborCostPerSquareFoot = area > 0 ? adjustedLaborCost / area : 0;
    const disposalCostPerSquareFoot = area > 0 ? disposalCost / area : 0;

    const truckloadsAtThreeTons = Math.ceil(weightTons / 3);
    const dumpsterLoadsAtTenTons = Math.ceil(weightTons / 10);

    const notes: string[] = [];

    if (safeThickness >= 6) {
      notes.push("Thick concrete can sharply increase breaking, loading, and disposal cost.");
    }

    if (difficulty === "Difficult access") {
      notes.push("Difficult access may require smaller equipment, more labor, or longer haul paths.");
    }

    if (difficulty === "Reinforced/heavy") {
      notes.push("Reinforced or heavy slabs may require extra saw cutting, breaking time, and hauling effort.");
    }

    if (weightTons > 10) {
      notes.push("Large removals may need multiple dump runs or a roll-off container with weight limits checked.");
    }

    if (safeDisposalCostPerTon === 0) {
      notes.push("Disposal cost is set to $0. Confirm whether recycling, landfill, or dump fees apply.");
    }

    if (notes.length === 0) {
      notes.push("Estimate looks normal for a straightforward concrete removal job.");
    }

    return {
      area,
      cubicFeet,
      cubicYards,
      weightPounds,
      weightTons,
      baseLaborCost,
      difficultyMultiplier,
      difficultyAdjustment,
      adjustedLaborCost,
      equipmentCost: safeEquipmentCost,
      sawCutCost: safeSawCutCost,
      dumpsterCost: safeDumpsterCost,
      disposalCost,
      haulOffCost: safeHaulOffCost,
      permitOrMinimumFee: safePermitOrMinimumFee,
      subtotal,
      tax,
      total,
      costPerSquareFoot,
      costPerCubicYard,
      laborCostPerSquareFoot,
      disposalCostPerSquareFoot,
      truckloadsAtThreeTons,
      dumpsterLoadsAtTenTons,
      notes,
    };
  }, [
    length,
    width,
    thickness,
    density,
    laborHours,
    laborRate,
    equipmentCost,
    sawCutCost,
    dumpsterCost,
    disposalCostPerTon,
    haulOffCost,
    permitOrMinimumFee,
    difficulty,
    taxRate,
  ]);

  function copyResults() {
    const summary = [
      "Concrete Removal Cost Estimate",
      `Preset: ${preset}`,
      `Area: ${formatNumber(result.area)} sq ft`,
      `Thickness: ${formatNumber(thickness)} in`,
      `Concrete volume: ${formatNumber(result.cubicYards)} yd³`,
      `Concrete weight: ${formatNumber(result.weightTons)} tons`,
      `Labor cost: ${formatCurrency(result.adjustedLaborCost)}`,
      `Equipment cost: ${formatCurrency(result.equipmentCost)}`,
      `Saw cutting: ${formatCurrency(result.sawCutCost)}`,
      `Dumpster/container: ${formatCurrency(result.dumpsterCost)}`,
      `Disposal cost: ${formatCurrency(result.disposalCost)}`,
      `Haul-off cost: ${formatCurrency(result.haulOffCost)}`,
      `Total: ${formatCurrency(result.total)}`,
      `Cost per sq ft: ${formatCurrency(result.costPerSquareFoot)}`,
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
          <h2 className="text-2xl font-bold">Concrete removal details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose a preset, then adjust slab size, thickness, labor, equipment,
            disposal, hauling, and access difficulty.
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
            <NumberInput label="Thickness" suffix="in" value={thickness} onChange={setThickness} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Concrete density" suffix="lb/ft³" value={density} onChange={setDensity} />
            <SelectInput
              label="Access / difficulty"
              value={difficulty}
              onChange={(value) => setDifficulty(value as DifficultyType)}
              options={Object.keys(difficultyMultipliers)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Labor hours" suffix="hrs" value={laborHours} onChange={setLaborHours} />
            <NumberInput label="Labor rate" prefix="$" suffix="/hr" value={laborRate} onChange={setLaborRate} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Equipment rental" prefix="$" value={equipmentCost} onChange={setEquipmentCost} />
            <NumberInput label="Saw cutting" prefix="$" value={sawCutCost} onChange={setSawCutCost} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Dumpster / container" prefix="$" value={dumpsterCost} onChange={setDumpsterCost} />
            <NumberInput
              label="Disposal cost"
              prefix="$"
              suffix="/ton"
              value={disposalCostPerTon}
              onChange={setDisposalCostPerTon}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Haul-off cost" prefix="$" value={haulOffCost} onChange={setHaulOffCost} />
            <NumberInput label="Permit / minimum fee" prefix="$" value={permitOrMinimumFee} onChange={setPermitOrMinimumFee} />
          </div>

          <NumberInput label="Tax rate" suffix="%" value={taxRate} onChange={setTaxRate} />
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Estimated removal cost</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review total cost, cost per square foot, concrete weight, disposal,
            hauling, and cost drivers.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Estimated total" value={formatCurrency(result.total)} highlight />
          <ResultCard label="Cost per sq ft" value={formatCurrency(result.costPerSquareFoot)} />
          <ResultCard label="Concrete weight" value={`${formatNumber(result.weightTons)} tons`} />
          <ResultCard label="Concrete volume" value={`${formatNumber(result.cubicYards)} yd³`} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Quantity breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Area" value={`${formatNumber(result.area)} sq ft`} />
            <ResultRow label="Cubic feet" value={`${formatNumber(result.cubicFeet)} ft³`} />
            <ResultRow label="Cubic yards" value={`${formatNumber(result.cubicYards)} yd³`} />
            <ResultRow label="Weight" value={`${formatNumber(result.weightPounds, 0)} lb`} />
            <ResultRow label="Estimated 3-ton dump runs" value={`${result.truckloadsAtThreeTons}`} />
            <ResultRow label="Estimated 10-ton roll-off loads" value={`${result.dumpsterLoadsAtTenTons}`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Cost breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Base labor cost" value={formatCurrency(result.baseLaborCost)} />
            <ResultRow label="Difficulty multiplier" value={`${formatNumber(result.difficultyMultiplier, 2)}×`} />
            <ResultRow label="Difficulty adjustment" value={formatCurrency(result.difficultyAdjustment)} />
            <ResultRow label="Adjusted labor cost" value={formatCurrency(result.adjustedLaborCost)} />
            <ResultRow label="Equipment rental" value={formatCurrency(result.equipmentCost)} />
            <ResultRow label="Saw cutting" value={formatCurrency(result.sawCutCost)} />
            <ResultRow label="Dumpster / container" value={formatCurrency(result.dumpsterCost)} />
            <ResultRow label="Disposal cost" value={formatCurrency(result.disposalCost)} />
            <ResultRow label="Haul-off cost" value={formatCurrency(result.haulOffCost)} />
            <ResultRow label="Permit / minimum fee" value={formatCurrency(result.permitOrMinimumFee)} />
            <ResultRow label="Subtotal" value={formatCurrency(result.subtotal)} />
            <ResultRow label="Tax" value={formatCurrency(result.tax)} />
            <ResultRow label="Cost per cubic yard removed" value={formatCurrency(result.costPerCubicYard)} />
            <ResultRow label="Labor per sq ft" value={formatCurrency(result.laborCostPerSquareFoot)} />
            <ResultRow label="Disposal per sq ft" value={formatCurrency(result.disposalCostPerSquareFoot)} />
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
