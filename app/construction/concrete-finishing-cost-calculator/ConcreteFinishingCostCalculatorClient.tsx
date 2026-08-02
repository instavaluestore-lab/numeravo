"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Broom finish"
  | "Trowel finish"
  | "Driveway"
  | "Patio"
  | "Sidewalk"
  | "Stamped concrete"
  | "Custom";

type FinishType =
  | "Broom finish"
  | "Trowel finish"
  | "Exposed aggregate"
  | "Stamped concrete"
  | "Custom finish";

const presets: Record<
  PresetType,
  {
    length: number;
    width: number;
    finishType: FinishType;
    productionRateSqFtPerHour: number;
    crewSize: number;
    laborRatePerHour: number;
    finishMaterialCostPerSqFt: number;
    edgeWorkCost: number;
    curingCostPerSqFt: number;
    sealingCostPerSqFt: number;
    sawCutCost: number;
    cleanupCost: number;
    minimumCharge: number;
  }
> = {
  "Broom finish": {
    length: 30,
    width: 20,
    finishType: "Broom finish",
    productionRateSqFtPerHour: 225,
    crewSize: 3,
    laborRatePerHour: 55,
    finishMaterialCostPerSqFt: 0.15,
    edgeWorkCost: 150,
    curingCostPerSqFt: 0.12,
    sealingCostPerSqFt: 0,
    sawCutCost: 0,
    cleanupCost: 125,
    minimumCharge: 750,
  },
  "Trowel finish": {
    length: 30,
    width: 20,
    finishType: "Trowel finish",
    productionRateSqFtPerHour: 180,
    crewSize: 3,
    laborRatePerHour: 60,
    finishMaterialCostPerSqFt: 0.1,
    edgeWorkCost: 125,
    curingCostPerSqFt: 0.12,
    sealingCostPerSqFt: 0,
    sawCutCost: 0,
    cleanupCost: 125,
    minimumCharge: 800,
  },
  Driveway: {
    length: 40,
    width: 16,
    finishType: "Broom finish",
    productionRateSqFtPerHour: 225,
    crewSize: 3,
    laborRatePerHour: 55,
    finishMaterialCostPerSqFt: 0.15,
    edgeWorkCost: 175,
    curingCostPerSqFt: 0.12,
    sealingCostPerSqFt: 0.25,
    sawCutCost: 250,
    cleanupCost: 150,
    minimumCharge: 850,
  },
  Patio: {
    length: 20,
    width: 16,
    finishType: "Broom finish",
    productionRateSqFtPerHour: 190,
    crewSize: 3,
    laborRatePerHour: 55,
    finishMaterialCostPerSqFt: 0.15,
    edgeWorkCost: 150,
    curingCostPerSqFt: 0.12,
    sealingCostPerSqFt: 0.25,
    sawCutCost: 150,
    cleanupCost: 125,
    minimumCharge: 700,
  },
  Sidewalk: {
    length: 50,
    width: 4,
    finishType: "Broom finish",
    productionRateSqFtPerHour: 175,
    crewSize: 2,
    laborRatePerHour: 55,
    finishMaterialCostPerSqFt: 0.12,
    edgeWorkCost: 125,
    curingCostPerSqFt: 0.1,
    sealingCostPerSqFt: 0,
    sawCutCost: 125,
    cleanupCost: 100,
    minimumCharge: 550,
  },
  "Stamped concrete": {
    length: 20,
    width: 16,
    finishType: "Stamped concrete",
    productionRateSqFtPerHour: 80,
    crewSize: 4,
    laborRatePerHour: 65,
    finishMaterialCostPerSqFt: 2.25,
    edgeWorkCost: 225,
    curingCostPerSqFt: 0.15,
    sealingCostPerSqFt: 0.65,
    sawCutCost: 150,
    cleanupCost: 175,
    minimumCharge: 1500,
  },
  Custom: {
    length: 24,
    width: 16,
    finishType: "Custom finish",
    productionRateSqFtPerHour: 150,
    crewSize: 3,
    laborRatePerHour: 60,
    finishMaterialCostPerSqFt: 0.5,
    edgeWorkCost: 150,
    curingCostPerSqFt: 0.12,
    sealingCostPerSqFt: 0.25,
    sawCutCost: 150,
    cleanupCost: 125,
    minimumCharge: 800,
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

export default function ConcreteFinishingCostCalculatorClient() {
  const [preset, setPreset] = useState<PresetType>("Broom finish");
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(20);
  const [finishType, setFinishType] = useState<FinishType>("Broom finish");
  const [productionRateSqFtPerHour, setProductionRateSqFtPerHour] = useState(225);
  const [crewSize, setCrewSize] = useState(3);
  const [laborRatePerHour, setLaborRatePerHour] = useState(55);
  const [finishMaterialCostPerSqFt, setFinishMaterialCostPerSqFt] = useState(0.15);
  const [edgeWorkCost, setEdgeWorkCost] = useState(150);
  const [curingCostPerSqFt, setCuringCostPerSqFt] = useState(0.12);
  const [sealingCostPerSqFt, setSealingCostPerSqFt] = useState(0);
  const [sawCutCost, setSawCutCost] = useState(0);
  const [cleanupCost, setCleanupCost] = useState(125);
  const [minimumCharge, setMinimumCharge] = useState(750);
  const [overheadPercent, setOverheadPercent] = useState(10);

  function applyPreset(nextPreset: PresetType) {
    const selected = presets[nextPreset];
    setPreset(nextPreset);
    setLength(selected.length);
    setWidth(selected.width);
    setFinishType(selected.finishType);
    setProductionRateSqFtPerHour(selected.productionRateSqFtPerHour);
    setCrewSize(selected.crewSize);
    setLaborRatePerHour(selected.laborRatePerHour);
    setFinishMaterialCostPerSqFt(selected.finishMaterialCostPerSqFt);
    setEdgeWorkCost(selected.edgeWorkCost);
    setCuringCostPerSqFt(selected.curingCostPerSqFt);
    setSealingCostPerSqFt(selected.sealingCostPerSqFt);
    setSawCutCost(selected.sawCutCost);
    setCleanupCost(selected.cleanupCost);
    setMinimumCharge(selected.minimumCharge);
  }

  const result = useMemo(() => {
    const safeLength = clampNumber(length);
    const safeWidth = clampNumber(width);
    const safeProductionRate = Math.max(clampNumber(productionRateSqFtPerHour, 1), 1);
    const safeCrewSize = clampNumber(crewSize);
    const safeLaborRate = clampNumber(laborRatePerHour);
    const safeFinishMaterialCost = clampNumber(finishMaterialCostPerSqFt);
    const safeEdgeWorkCost = clampNumber(edgeWorkCost);
    const safeCuringCost = clampNumber(curingCostPerSqFt);
    const safeSealingCost = clampNumber(sealingCostPerSqFt);
    const safeSawCutCost = clampNumber(sawCutCost);
    const safeCleanupCost = clampNumber(cleanupCost);
    const safeMinimumCharge = clampNumber(minimumCharge);
    const safeOverheadPercent = clampNumber(overheadPercent);

    const area = safeLength * safeWidth;
    const crewHours = area / safeProductionRate;
    const personHours = crewHours * safeCrewSize;
    const laborCost = personHours * safeLaborRate;

    const finishMaterialCost = area * safeFinishMaterialCost;
    const curingCost = area * safeCuringCost;
    const sealingCost = area * safeSealingCost;

    const directCost =
      laborCost +
      finishMaterialCost +
      curingCost +
      sealingCost +
      safeEdgeWorkCost +
      safeSawCutCost +
      safeCleanupCost;

    const overheadCost = directCost * (safeOverheadPercent / 100);
    const subtotal = directCost + overheadCost;
    const totalCost = Math.max(subtotal, safeMinimumCharge);
    const minimumChargeAdjustment = Math.max(safeMinimumCharge - subtotal, 0);

    const costPerSqFt = area > 0 ? totalCost / area : 0;
    const laborCostPerSqFt = area > 0 ? laborCost / area : 0;
    const materialCostPerSqFt =
      area > 0 ? (finishMaterialCost + curingCost + sealingCost) / area : 0;

    const notes: string[] = [];

    if (area < 250 && minimumChargeAdjustment > 0) {
      notes.push("Small finishing jobs are often controlled by the minimum charge.");
    }

    if (finishType === "Stamped concrete") {
      notes.push("Stamped concrete typically needs more labor, timing control, release/color material, and sealing.");
    }

    if (safeProductionRate < 100) {
      notes.push("Low production rate increases labor cost. Confirm finish complexity, weather, crew size, and set time.");
    }

    if (safeSealingCost > 0) {
      notes.push("Sealing is included. Verify whether sealing happens the same day or after curing.");
    }

    if (safeSawCutCost > 0) {
      notes.push("Saw cutting is included as a finishing-related add-on. Confirm joint layout separately.");
    }

    if (notes.length === 0) {
      notes.push("Finishing estimate looks reasonable for the selected area, finish type, and crew productivity.");
    }

    return {
      area,
      crewHours,
      personHours,
      laborCost,
      finishMaterialCost,
      curingCost,
      sealingCost,
      edgeWorkCost: safeEdgeWorkCost,
      sawCutCost: safeSawCutCost,
      cleanupCost: safeCleanupCost,
      directCost,
      overheadCost,
      subtotal,
      minimumCharge: safeMinimumCharge,
      minimumChargeAdjustment,
      totalCost,
      costPerSqFt,
      laborCostPerSqFt,
      materialCostPerSqFt,
      notes,
    };
  }, [
    length,
    width,
    productionRateSqFtPerHour,
    crewSize,
    laborRatePerHour,
    finishMaterialCostPerSqFt,
    edgeWorkCost,
    curingCostPerSqFt,
    sealingCostPerSqFt,
    sawCutCost,
    cleanupCost,
    minimumCharge,
    overheadPercent,
    finishType,
  ]);

  function copyResults() {
    const summary = [
      "Concrete Finishing Cost Estimate",
      `Preset: ${preset}`,
      `Finish type: ${finishType}`,
      `Area: ${formatNumber(result.area)} sq ft`,
      `Crew hours: ${formatNumber(result.crewHours)} hr`,
      `Person hours: ${formatNumber(result.personHours)} hr`,
      `Labor cost: ${formatCurrency(result.laborCost)}`,
      `Finish materials: ${formatCurrency(result.finishMaterialCost)}`,
      `Curing cost: ${formatCurrency(result.curingCost)}`,
      `Sealing cost: ${formatCurrency(result.sealingCost)}`,
      `Saw cut cost: ${formatCurrency(result.sawCutCost)}`,
      `Total finishing cost: ${formatCurrency(result.totalCost)}`,
      `Cost per sq ft: ${formatCurrency(result.costPerSqFt)}`,
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
          <h2 className="text-2xl font-bold">Finishing estimate details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose a preset, then adjust area, finish type, crew productivity,
            labor rate, finish materials, curing, sealing, saw cuts, cleanup,
            overhead, and minimum charge.
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
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Length" suffix="ft" value={length} onChange={setLength} />
            <NumberInput label="Width" suffix="ft" value={width} onChange={setWidth} />
          </div>

          <SelectInput
            label="Finish type"
            value={finishType}
            onChange={(value) => setFinishType(value as FinishType)}
            options={[
              "Broom finish",
              "Trowel finish",
              "Exposed aggregate",
              "Stamped concrete",
              "Custom finish",
            ]}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Production rate"
              suffix="sq ft/hr"
              value={productionRateSqFtPerHour}
              onChange={setProductionRateSqFtPerHour}
            />
            <NumberInput label="Crew size" value={crewSize} onChange={setCrewSize} />
            <NumberInput
              label="Labor rate"
              prefix="$"
              suffix="/person hr"
              value={laborRatePerHour}
              onChange={setLaborRatePerHour}
            />
            <NumberInput
              label="Finish material"
              prefix="$"
              suffix="/sq ft"
              value={finishMaterialCostPerSqFt}
              onChange={setFinishMaterialCostPerSqFt}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Edge work" prefix="$" value={edgeWorkCost} onChange={setEdgeWorkCost} />
            <NumberInput label="Curing" prefix="$" suffix="/sq ft" value={curingCostPerSqFt} onChange={setCuringCostPerSqFt} />
            <NumberInput label="Sealing" prefix="$" suffix="/sq ft" value={sealingCostPerSqFt} onChange={setSealingCostPerSqFt} />
            <NumberInput label="Saw cut allowance" prefix="$" value={sawCutCost} onChange={setSawCutCost} />
            <NumberInput label="Cleanup" prefix="$" value={cleanupCost} onChange={setCleanupCost} />
            <NumberInput label="Minimum charge" prefix="$" value={minimumCharge} onChange={setMinimumCharge} />
          </div>

          <NumberInput
            label="Overhead allowance"
            suffix="%"
            value={overheadPercent}
            onChange={setOverheadPercent}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Finishing cost estimate</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review area, crew hours, labor cost, finish materials, curing,
            sealing, saw cut allowance, overhead, and total finishing cost.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Total finishing cost" value={formatCurrency(result.totalCost)} highlight />
          <ResultCard label="Cost per sq ft" value={formatCurrency(result.costPerSqFt)} />
          <ResultCard label="Crew hours" value={`${formatNumber(result.crewHours)} hr`} />
          <ResultCard label="Person hours" value={`${formatNumber(result.personHours)} hr`} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Labor and productivity</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Surface area" value={`${formatNumber(result.area)} sq ft`} />
            <ResultRow label="Production rate" value={`${formatNumber(productionRateSqFtPerHour)} sq ft/hr`} />
            <ResultRow label="Crew hours" value={`${formatNumber(result.crewHours)} hr`} />
            <ResultRow label="Person hours" value={`${formatNumber(result.personHours)} hr`} />
            <ResultRow label="Labor cost" value={formatCurrency(result.laborCost)} />
            <ResultRow label="Labor cost per sq ft" value={formatCurrency(result.laborCostPerSqFt)} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Cost breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Finish material cost" value={formatCurrency(result.finishMaterialCost)} />
            <ResultRow label="Curing cost" value={formatCurrency(result.curingCost)} />
            <ResultRow label="Sealing cost" value={formatCurrency(result.sealingCost)} />
            <ResultRow label="Edge work" value={formatCurrency(result.edgeWorkCost)} />
            <ResultRow label="Saw cut allowance" value={formatCurrency(result.sawCutCost)} />
            <ResultRow label="Cleanup" value={formatCurrency(result.cleanupCost)} />
            <ResultRow label="Direct cost" value={formatCurrency(result.directCost)} />
            <ResultRow label="Overhead allowance" value={formatCurrency(result.overheadCost)} />
            <ResultRow label="Subtotal" value={formatCurrency(result.subtotal)} />
            <ResultRow label="Minimum charge" value={formatCurrency(result.minimumCharge)} />
            <ResultRow label="Minimum charge adjustment" value={formatCurrency(result.minimumChargeAdjustment)} />
            <ResultRow label="Total finishing cost" value={formatCurrency(result.totalCost)} />
            <ResultRow label="Material/add-on cost per sq ft" value={formatCurrency(result.materialCostPerSqFt)} />
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
