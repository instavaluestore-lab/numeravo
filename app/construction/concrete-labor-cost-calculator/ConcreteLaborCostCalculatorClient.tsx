"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Slab labor"
  | "Driveway labor"
  | "Patio labor"
  | "Sidewalk labor"
  | "Form and finish"
  | "Removal labor"
  | "Custom";

type LaborType =
  | "Flatwork placement"
  | "Form and finish"
  | "Finishing only"
  | "Removal/demo"
  | "Custom labor";

const presets: Record<
  PresetType,
  {
    length: number;
    width: number;
    thickness: number;
    laborType: LaborType;
    crewSize: number;
    productionRateSqFtPerHour: number;
    laborRatePerHour: number;
    setupHours: number;
    formingHours: number;
    placementHours: number;
    finishingHours: number;
    cleanupHours: number;
    equipmentCost: number;
    overheadPercent: number;
    minimumCharge: number;
  }
> = {
  "Slab labor": {
    length: 30,
    width: 20,
    thickness: 4,
    laborType: "Flatwork placement",
    crewSize: 3,
    productionRateSqFtPerHour: 180,
    laborRatePerHour: 55,
    setupHours: 1,
    formingHours: 2,
    placementHours: 0,
    finishingHours: 1.5,
    cleanupHours: 1,
    equipmentCost: 150,
    overheadPercent: 12,
    minimumCharge: 900,
  },
  "Driveway labor": {
    length: 40,
    width: 16,
    thickness: 4,
    laborType: "Flatwork placement",
    crewSize: 3,
    productionRateSqFtPerHour: 175,
    laborRatePerHour: 55,
    setupHours: 1.5,
    formingHours: 2.5,
    placementHours: 0,
    finishingHours: 2,
    cleanupHours: 1,
    equipmentCost: 175,
    overheadPercent: 12,
    minimumCharge: 1000,
  },
  "Patio labor": {
    length: 20,
    width: 16,
    thickness: 4,
    laborType: "Flatwork placement",
    crewSize: 3,
    productionRateSqFtPerHour: 150,
    laborRatePerHour: 55,
    setupHours: 1,
    formingHours: 2,
    placementHours: 0,
    finishingHours: 1.5,
    cleanupHours: 1,
    equipmentCost: 125,
    overheadPercent: 12,
    minimumCharge: 800,
  },
  "Sidewalk labor": {
    length: 50,
    width: 4,
    thickness: 4,
    laborType: "Flatwork placement",
    crewSize: 2,
    productionRateSqFtPerHour: 120,
    laborRatePerHour: 55,
    setupHours: 1,
    formingHours: 2,
    placementHours: 0,
    finishingHours: 1,
    cleanupHours: 1,
    equipmentCost: 100,
    overheadPercent: 10,
    minimumCharge: 650,
  },
  "Form and finish": {
    length: 30,
    width: 20,
    thickness: 4,
    laborType: "Form and finish",
    crewSize: 3,
    productionRateSqFtPerHour: 140,
    laborRatePerHour: 60,
    setupHours: 1.5,
    formingHours: 4,
    placementHours: 0,
    finishingHours: 2,
    cleanupHours: 1,
    equipmentCost: 175,
    overheadPercent: 12,
    minimumCharge: 1200,
  },
  "Removal labor": {
    length: 20,
    width: 16,
    thickness: 4,
    laborType: "Removal/demo",
    crewSize: 2,
    productionRateSqFtPerHour: 65,
    laborRatePerHour: 60,
    setupHours: 1,
    formingHours: 0,
    placementHours: 0,
    finishingHours: 0,
    cleanupHours: 2,
    equipmentCost: 250,
    overheadPercent: 12,
    minimumCharge: 850,
  },
  Custom: {
    length: 24,
    width: 16,
    thickness: 4,
    laborType: "Custom labor",
    crewSize: 3,
    productionRateSqFtPerHour: 140,
    laborRatePerHour: 60,
    setupHours: 1,
    formingHours: 2,
    placementHours: 1,
    finishingHours: 1,
    cleanupHours: 1,
    equipmentCost: 150,
    overheadPercent: 12,
    minimumCharge: 850,
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

export default function ConcreteLaborCostCalculatorClient() {
  const [preset, setPreset] = useState<PresetType>("Slab labor");
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(20);
  const [thickness, setThickness] = useState(4);
  const [laborType, setLaborType] = useState<LaborType>("Flatwork placement");
  const [crewSize, setCrewSize] = useState(3);
  const [productionRateSqFtPerHour, setProductionRateSqFtPerHour] = useState(180);
  const [laborRatePerHour, setLaborRatePerHour] = useState(55);
  const [setupHours, setSetupHours] = useState(1);
  const [formingHours, setFormingHours] = useState(2);
  const [placementHours, setPlacementHours] = useState(0);
  const [finishingHours, setFinishingHours] = useState(1.5);
  const [cleanupHours, setCleanupHours] = useState(1);
  const [equipmentCost, setEquipmentCost] = useState(150);
  const [overheadPercent, setOverheadPercent] = useState(12);
  const [minimumCharge, setMinimumCharge] = useState(900);

  function applyPreset(nextPreset: PresetType) {
    const selected = presets[nextPreset];
    setPreset(nextPreset);
    setLength(selected.length);
    setWidth(selected.width);
    setThickness(selected.thickness);
    setLaborType(selected.laborType);
    setCrewSize(selected.crewSize);
    setProductionRateSqFtPerHour(selected.productionRateSqFtPerHour);
    setLaborRatePerHour(selected.laborRatePerHour);
    setSetupHours(selected.setupHours);
    setFormingHours(selected.formingHours);
    setPlacementHours(selected.placementHours);
    setFinishingHours(selected.finishingHours);
    setCleanupHours(selected.cleanupHours);
    setEquipmentCost(selected.equipmentCost);
    setOverheadPercent(selected.overheadPercent);
    setMinimumCharge(selected.minimumCharge);
  }

  const result = useMemo(() => {
    const safeLength = clampNumber(length);
    const safeWidth = clampNumber(width);
    const safeThickness = clampNumber(thickness);
    const safeCrewSize = Math.max(clampNumber(crewSize, 1), 1);
    const safeProductionRate = Math.max(clampNumber(productionRateSqFtPerHour, 1), 1);
    const safeLaborRate = clampNumber(laborRatePerHour);
    const safeSetupHours = clampNumber(setupHours);
    const safeFormingHours = clampNumber(formingHours);
    const safePlacementHours = clampNumber(placementHours);
    const safeFinishingHours = clampNumber(finishingHours);
    const safeCleanupHours = clampNumber(cleanupHours);
    const safeEquipmentCost = clampNumber(equipmentCost);
    const safeOverheadPercent = clampNumber(overheadPercent);
    const safeMinimumCharge = clampNumber(minimumCharge);

    const area = safeLength * safeWidth;
    const cubicYards = (area * (safeThickness / 12)) / 27;

    const baseCrewHours = area / safeProductionRate;
    const addedCrewHours =
      safeSetupHours +
      safeFormingHours +
      safePlacementHours +
      safeFinishingHours +
      safeCleanupHours;

    const totalCrewHours = baseCrewHours + addedCrewHours;
    const personHours = totalCrewHours * safeCrewSize;
    const directLaborCost = personHours * safeLaborRate;
    const directCost = directLaborCost + safeEquipmentCost;
    const overheadCost = directCost * (safeOverheadPercent / 100);
    const subtotal = directCost + overheadCost;
    const totalCost = Math.max(subtotal, safeMinimumCharge);
    const minimumChargeAdjustment = Math.max(safeMinimumCharge - subtotal, 0);

    const costPerSqFt = area > 0 ? totalCost / area : 0;
    const costPerYard = cubicYards > 0 ? totalCost / cubicYards : 0;
    const personHoursPerSqFt = area > 0 ? personHours / area : 0;

    const notes: string[] = [];

    if (area < 250 && minimumChargeAdjustment > 0) {
      notes.push("Small concrete labor jobs are often controlled by the minimum charge.");
    }

    if (safeProductionRate < 100 && laborType !== "Removal/demo") {
      notes.push("Low production rate increases labor cost. Confirm access, finish complexity, crew size, and setup conditions.");
    }

    if (laborType === "Removal/demo") {
      notes.push("Removal labor may also require disposal, haul-off, saw cutting, and equipment rental estimates.");
    }

    if (safeFormingHours > safeFinishingHours * 2 && laborType !== "Removal/demo") {
      notes.push("Forming hours are a major labor driver on this estimate.");
    }

    if (safeOverheadPercent < 8) {
      notes.push("Overhead allowance is low. Contractors may need higher overhead to cover insurance, supervision, tools, and admin time.");
    }

    if (notes.length === 0) {
      notes.push("Labor estimate looks reasonable for the selected project size, crew, and production rate.");
    }

    return {
      area,
      cubicYards,
      baseCrewHours,
      addedCrewHours,
      totalCrewHours,
      personHours,
      directLaborCost,
      equipmentCost: safeEquipmentCost,
      directCost,
      overheadCost,
      subtotal,
      minimumCharge: safeMinimumCharge,
      minimumChargeAdjustment,
      totalCost,
      costPerSqFt,
      costPerYard,
      personHoursPerSqFt,
      notes,
    };
  }, [
    length,
    width,
    thickness,
    crewSize,
    productionRateSqFtPerHour,
    laborRatePerHour,
    setupHours,
    formingHours,
    placementHours,
    finishingHours,
    cleanupHours,
    equipmentCost,
    overheadPercent,
    minimumCharge,
    laborType,
  ]);

  function copyResults() {
    const summary = [
      "Concrete Labor Cost Estimate",
      `Preset: ${preset}`,
      `Labor type: ${laborType}`,
      `Area: ${formatNumber(result.area)} sq ft`,
      `Concrete volume: ${formatNumber(result.cubicYards)} yd³`,
      `Crew size: ${formatNumber(crewSize)}`,
      `Total crew hours: ${formatNumber(result.totalCrewHours)} hr`,
      `Person hours: ${formatNumber(result.personHours)} hr`,
      `Direct labor cost: ${formatCurrency(result.directLaborCost)}`,
      `Equipment cost: ${formatCurrency(result.equipmentCost)}`,
      `Overhead cost: ${formatCurrency(result.overheadCost)}`,
      `Total labor cost: ${formatCurrency(result.totalCost)}`,
      `Cost per sq ft: ${formatCurrency(result.costPerSqFt)}`,
      `Cost per yd³: ${formatCurrency(result.costPerYard)}`,
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
          <h2 className="text-2xl font-bold">Labor estimate details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose a preset, then adjust project size, labor type, crew size,
            productivity, labor rate, phase hours, equipment, overhead, and
            minimum charge.
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

          <SelectInput
            label="Labor type"
            value={laborType}
            onChange={(value) => setLaborType(value as LaborType)}
            options={[
              "Flatwork placement",
              "Form and finish",
              "Finishing only",
              "Removal/demo",
              "Custom labor",
            ]}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <NumberInput label="Crew size" value={crewSize} onChange={setCrewSize} />
            <NumberInput
              label="Production rate"
              suffix="sq ft/hr"
              value={productionRateSqFtPerHour}
              onChange={setProductionRateSqFtPerHour}
            />
            <NumberInput
              label="Labor rate"
              prefix="$"
              suffix="/person hr"
              value={laborRatePerHour}
              onChange={setLaborRatePerHour}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Setup hours" suffix="crew hr" value={setupHours} onChange={setSetupHours} />
            <NumberInput label="Forming hours" suffix="crew hr" value={formingHours} onChange={setFormingHours} />
            <NumberInput label="Placement hours" suffix="crew hr" value={placementHours} onChange={setPlacementHours} />
            <NumberInput label="Finishing hours" suffix="crew hr" value={finishingHours} onChange={setFinishingHours} />
            <NumberInput label="Cleanup hours" suffix="crew hr" value={cleanupHours} onChange={setCleanupHours} />
            <NumberInput label="Equipment cost" prefix="$" value={equipmentCost} onChange={setEquipmentCost} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Overhead allowance"
              suffix="%"
              value={overheadPercent}
              onChange={setOverheadPercent}
            />
            <NumberInput label="Minimum charge" prefix="$" value={minimumCharge} onChange={setMinimumCharge} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Concrete labor cost estimate</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review crew hours, person hours, direct labor cost, equipment,
            overhead, minimum charge, cost per square foot, and cost per cubic
            yard.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Total labor cost" value={formatCurrency(result.totalCost)} highlight />
          <ResultCard label="Cost per sq ft" value={formatCurrency(result.costPerSqFt)} />
          <ResultCard label="Total crew hours" value={`${formatNumber(result.totalCrewHours)} hr`} />
          <ResultCard label="Person hours" value={`${formatNumber(result.personHours)} hr`} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Project size</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Surface area" value={`${formatNumber(result.area)} sq ft`} />
            <ResultRow label="Concrete volume" value={`${formatNumber(result.cubicYards)} yd³`} />
            <ResultRow label="Base production hours" value={`${formatNumber(result.baseCrewHours)} crew hr`} />
            <ResultRow label="Added phase hours" value={`${formatNumber(result.addedCrewHours)} crew hr`} />
            <ResultRow label="Total crew hours" value={`${formatNumber(result.totalCrewHours)} crew hr`} />
            <ResultRow label="Total person hours" value={`${formatNumber(result.personHours)} person hr`} />
            <ResultRow label="Person hours per sq ft" value={`${formatNumber(result.personHoursPerSqFt, 4)}`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Cost breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Direct labor cost" value={formatCurrency(result.directLaborCost)} />
            <ResultRow label="Equipment cost" value={formatCurrency(result.equipmentCost)} />
            <ResultRow label="Direct cost" value={formatCurrency(result.directCost)} />
            <ResultRow label="Overhead allowance" value={formatCurrency(result.overheadCost)} />
            <ResultRow label="Subtotal" value={formatCurrency(result.subtotal)} />
            <ResultRow label="Minimum charge" value={formatCurrency(result.minimumCharge)} />
            <ResultRow label="Minimum charge adjustment" value={formatCurrency(result.minimumChargeAdjustment)} />
            <ResultRow label="Total labor cost" value={formatCurrency(result.totalCost)} />
            <ResultRow label="Cost per sq ft" value={formatCurrency(result.costPerSqFt)} />
            <ResultRow label="Cost per yd³" value={formatCurrency(result.costPerYard)} />
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
