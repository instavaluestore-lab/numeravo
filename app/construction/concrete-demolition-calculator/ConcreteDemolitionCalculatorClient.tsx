"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Driveway"
  | "Patio"
  | "Sidewalk"
  | "Garage slab"
  | "Small pad"
  | "Custom";

type MethodType =
  | "Hand tools"
  | "Jackhammer"
  | "Skid steer"
  | "Mini excavator"
  | "Saw cut and remove";

type ReinforcementType = "None/light" | "Wire mesh" | "Rebar" | "Heavy reinforced";

type AccessType = "Easy" | "Average" | "Tight access" | "Difficult";

const presets: Record<
  PresetType,
  {
    length: number;
    width: number;
    thickness: number;
    crewSize: number;
    workHoursPerDay: number;
    method: MethodType;
    reinforcement: ReinforcementType;
    access: AccessType;
    sawCutGrid: number;
  }
> = {
  Driveway: {
    length: 30,
    width: 16,
    thickness: 4,
    crewSize: 2,
    workHoursPerDay: 8,
    method: "Skid steer",
    reinforcement: "Wire mesh",
    access: "Average",
    sawCutGrid: 8,
  },
  Patio: {
    length: 20,
    width: 14,
    thickness: 4,
    crewSize: 2,
    workHoursPerDay: 8,
    method: "Jackhammer",
    reinforcement: "None/light",
    access: "Average",
    sawCutGrid: 8,
  },
  Sidewalk: {
    length: 40,
    width: 4,
    thickness: 4,
    crewSize: 2,
    workHoursPerDay: 8,
    method: "Jackhammer",
    reinforcement: "None/light",
    access: "Easy",
    sawCutGrid: 6,
  },
  "Garage slab": {
    length: 22,
    width: 22,
    thickness: 4,
    crewSize: 3,
    workHoursPerDay: 8,
    method: "Skid steer",
    reinforcement: "Rebar",
    access: "Average",
    sawCutGrid: 8,
  },
  "Small pad": {
    length: 10,
    width: 10,
    thickness: 4,
    crewSize: 1,
    workHoursPerDay: 8,
    method: "Jackhammer",
    reinforcement: "None/light",
    access: "Easy",
    sawCutGrid: 5,
  },
  Custom: {
    length: 20,
    width: 12,
    thickness: 4,
    crewSize: 2,
    workHoursPerDay: 8,
    method: "Jackhammer",
    reinforcement: "Wire mesh",
    access: "Average",
    sawCutGrid: 8,
  },
};

const baseProductionRates: Record<MethodType, number> = {
  "Hand tools": 18,
  Jackhammer: 45,
  "Skid steer": 120,
  "Mini excavator": 150,
  "Saw cut and remove": 70,
};

const reinforcementMultipliers: Record<ReinforcementType, number> = {
  "None/light": 1,
  "Wire mesh": 0.82,
  Rebar: 0.68,
  "Heavy reinforced": 0.52,
};

const accessMultipliers: Record<AccessType, number> = {
  Easy: 1.1,
  Average: 1,
  "Tight access": 0.78,
  Difficult: 0.62,
};

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

function clampNumber(value: number, fallback = 0) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

export default function ConcreteDemolitionCalculatorClient() {
  const [preset, setPreset] = useState<PresetType>("Driveway");
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(16);
  const [thickness, setThickness] = useState(4);
  const [density, setDensity] = useState(150);
  const [crewSize, setCrewSize] = useState(2);
  const [workHoursPerDay, setWorkHoursPerDay] = useState(8);
  const [method, setMethod] = useState<MethodType>("Skid steer");
  const [reinforcement, setReinforcement] = useState<ReinforcementType>("Wire mesh");
  const [access, setAccess] = useState<AccessType>("Average");
  const [sawCutGrid, setSawCutGrid] = useState(8);
  const [loadingHours, setLoadingHours] = useState(2);
  const [cleanupHours, setCleanupHours] = useState(1.5);
  const [haulCapacityTons, setHaulCapacityTons] = useState(3);

  function applyPreset(nextPreset: PresetType) {
    const selected = presets[nextPreset];
    setPreset(nextPreset);
    setLength(selected.length);
    setWidth(selected.width);
    setThickness(selected.thickness);
    setCrewSize(selected.crewSize);
    setWorkHoursPerDay(selected.workHoursPerDay);
    setMethod(selected.method);
    setReinforcement(selected.reinforcement);
    setAccess(selected.access);
    setSawCutGrid(selected.sawCutGrid);
  }

  const result = useMemo(() => {
    const safeLength = clampNumber(length);
    const safeWidth = clampNumber(width);
    const safeThickness = clampNumber(thickness);
    const safeDensity = clampNumber(density, 150);
    const safeCrewSize = Math.max(clampNumber(crewSize, 1), 1);
    const safeWorkHoursPerDay = Math.max(clampNumber(workHoursPerDay, 8), 1);
    const safeSawCutGrid = Math.max(clampNumber(sawCutGrid, 8), 1);
    const safeLoadingHours = clampNumber(loadingHours);
    const safeCleanupHours = clampNumber(cleanupHours);
    const safeHaulCapacityTons = Math.max(clampNumber(haulCapacityTons, 3), 0.1);

    const area = safeLength * safeWidth;
    const cubicFeet = area * (safeThickness / 12);
    const cubicYards = cubicFeet / 27;
    const weightPounds = cubicFeet * safeDensity;
    const weightTons = weightPounds / 2000;

    const methodRate = baseProductionRates[method];
    const reinforcementMultiplier = reinforcementMultipliers[reinforcement];
    const accessMultiplier = accessMultipliers[access];
    const thicknessMultiplier =
      safeThickness <= 4 ? 1 : safeThickness <= 6 ? 0.78 : safeThickness <= 8 ? 0.58 : 0.42;

    const adjustedProductionRate =
      methodRate * reinforcementMultiplier * accessMultiplier * thicknessMultiplier;

    const breakingHours = adjustedProductionRate > 0 ? area / adjustedProductionRate : 0;

    const lengthCuts = Math.max(Math.ceil(safeWidth / safeSawCutGrid) - 1, 0);
    const widthCuts = Math.max(Math.ceil(safeLength / safeSawCutGrid) - 1, 0);
    const sawCutLength = lengthCuts * safeLength + widthCuts * safeWidth;
    const sawCutHours = sawCutLength / 120;

    const totalCrewHours = breakingHours + sawCutHours + safeLoadingHours + safeCleanupHours;
    const totalPersonHours = totalCrewHours * safeCrewSize;
    const crewDays = totalCrewHours / safeWorkHoursPerDay;

    const haulLoads = Math.ceil(weightTons / safeHaulCapacityTons);
    const rollOffLoadsTenTon = Math.ceil(weightTons / 10);

    const sqFtPerCrewDay = crewDays > 0 ? area / crewDays : 0;
    const tonsPerLoad = haulLoads > 0 ? weightTons / haulLoads : 0;

    const notes: string[] = [];

    if (safeThickness >= 6) {
      notes.push("Thick concrete will reduce production speed and increase loading effort.");
    }

    if (reinforcement === "Rebar" || reinforcement === "Heavy reinforced") {
      notes.push("Rebar or heavy reinforcement adds cutting, separation, and slower breaking time.");
    }

    if (access === "Tight access" || access === "Difficult") {
      notes.push("Limited access can reduce equipment productivity and increase hand labor.");
    }

    if (weightTons > 10) {
      notes.push("Check dump trailer, truck, and roll-off weight limits before hauling.");
    }

    if (method === "Hand tools") {
      notes.push("Hand-tool demolition is slow and best reserved for very small or hard-to-access areas.");
    }

    if (notes.length === 0) {
      notes.push("Demolition plan looks normal for the selected method and site conditions.");
    }

    return {
      area,
      cubicFeet,
      cubicYards,
      weightPounds,
      weightTons,
      methodRate,
      reinforcementMultiplier,
      accessMultiplier,
      thicknessMultiplier,
      adjustedProductionRate,
      breakingHours,
      sawCutLength,
      sawCutHours,
      loadingHours: safeLoadingHours,
      cleanupHours: safeCleanupHours,
      totalCrewHours,
      totalPersonHours,
      crewDays,
      haulLoads,
      rollOffLoadsTenTon,
      sqFtPerCrewDay,
      tonsPerLoad,
      notes,
    };
  }, [
    length,
    width,
    thickness,
    density,
    crewSize,
    workHoursPerDay,
    method,
    reinforcement,
    access,
    sawCutGrid,
    loadingHours,
    cleanupHours,
    haulCapacityTons,
  ]);

  function copyResults() {
    const summary = [
      "Concrete Demolition Plan",
      `Preset: ${preset}`,
      `Area: ${formatNumber(result.area)} sq ft`,
      `Thickness: ${formatNumber(thickness)} in`,
      `Method: ${method}`,
      `Reinforcement: ${reinforcement}`,
      `Access: ${access}`,
      `Adjusted production rate: ${formatNumber(result.adjustedProductionRate)} sq ft/hr`,
      `Breaking hours: ${formatNumber(result.breakingHours)} hrs`,
      `Saw-cut length: ${formatNumber(result.sawCutLength)} ft`,
      `Total crew hours: ${formatNumber(result.totalCrewHours)} hrs`,
      `Crew days: ${formatNumber(result.crewDays)} days`,
      `Concrete weight: ${formatNumber(result.weightTons)} tons`,
      `Estimated haul loads: ${result.haulLoads}`,
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
          <h2 className="text-2xl font-bold">Demolition plan details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose the concrete type, method, reinforcement level, access
            condition, crew size, and haul capacity.
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
            <SelectInput
              label="Demolition method"
              value={method}
              onChange={(value) => setMethod(value as MethodType)}
              options={Object.keys(baseProductionRates)}
            />
            <SelectInput
              label="Reinforcement"
              value={reinforcement}
              onChange={(value) => setReinforcement(value as ReinforcementType)}
              options={Object.keys(reinforcementMultipliers)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectInput
              label="Access"
              value={access}
              onChange={(value) => setAccess(value as AccessType)}
              options={Object.keys(accessMultipliers)}
            />
            <NumberInput label="Concrete density" suffix="lb/ft³" value={density} onChange={setDensity} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Crew size" suffix="people" value={crewSize} onChange={setCrewSize} />
            <NumberInput label="Work hours per day" suffix="hrs/day" value={workHoursPerDay} onChange={setWorkHoursPerDay} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Saw-cut grid spacing" suffix="ft" value={sawCutGrid} onChange={setSawCutGrid} />
            <NumberInput label="Haul capacity" suffix="tons/load" value={haulCapacityTons} onChange={setHaulCapacityTons} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Loading time" suffix="hrs" value={loadingHours} onChange={setLoadingHours} />
            <NumberInput label="Cleanup time" suffix="hrs" value={cleanupHours} onChange={setCleanupHours} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Estimated demolition plan</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review estimated crew hours, crew days, production speed, saw cuts,
            concrete weight, and haul loads.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Total crew hours" value={`${formatNumber(result.totalCrewHours)} hrs`} highlight />
          <ResultCard label="Estimated crew days" value={`${formatNumber(result.crewDays)} days`} />
          <ResultCard label="Production rate" value={`${formatNumber(result.adjustedProductionRate)} sq ft/hr`} />
          <ResultCard label="Concrete weight" value={`${formatNumber(result.weightTons)} tons`} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Quantity and weight</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Area" value={`${formatNumber(result.area)} sq ft`} />
            <ResultRow label="Cubic feet" value={`${formatNumber(result.cubicFeet)} ft³`} />
            <ResultRow label="Cubic yards" value={`${formatNumber(result.cubicYards)} yd³`} />
            <ResultRow label="Weight" value={`${formatNumber(result.weightPounds, 0)} lb`} />
            <ResultRow label="Weight in tons" value={`${formatNumber(result.weightTons)} tons`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Production breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Base method rate" value={`${formatNumber(result.methodRate)} sq ft/hr`} />
            <ResultRow label="Reinforcement multiplier" value={`${formatNumber(result.reinforcementMultiplier, 2)}×`} />
            <ResultRow label="Access multiplier" value={`${formatNumber(result.accessMultiplier, 2)}×`} />
            <ResultRow label="Thickness multiplier" value={`${formatNumber(result.thicknessMultiplier, 2)}×`} />
            <ResultRow label="Adjusted production rate" value={`${formatNumber(result.adjustedProductionRate)} sq ft/hr`} />
            <ResultRow label="Breaking time" value={`${formatNumber(result.breakingHours)} hrs`} />
            <ResultRow label="Saw-cut length" value={`${formatNumber(result.sawCutLength)} ft`} />
            <ResultRow label="Saw-cut time" value={`${formatNumber(result.sawCutHours)} hrs`} />
            <ResultRow label="Loading time" value={`${formatNumber(result.loadingHours)} hrs`} />
            <ResultRow label="Cleanup time" value={`${formatNumber(result.cleanupHours)} hrs`} />
            <ResultRow label="Total person-hours" value={`${formatNumber(result.totalPersonHours)} person-hrs`} />
            <ResultRow label="Square feet per crew day" value={`${formatNumber(result.sqFtPerCrewDay)} sq ft/day`} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Haul-off planning</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Estimated haul loads" value={`${result.haulLoads}`} />
            <ResultRow label="Average tons per load" value={`${formatNumber(result.tonsPerLoad)} tons`} />
            <ResultRow label="10-ton roll-off loads" value={`${result.rollOffLoadsTenTon}`} />
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
