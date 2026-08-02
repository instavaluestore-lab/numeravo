"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Line pump"
  | "Boom pump"
  | "Driveway"
  | "Patio"
  | "Footings"
  | "Wall pour"
  | "Custom";

type PumpType = "Line pump" | "Boom pump" | "Trailer pump" | "Custom pump";

const presets: Record<
  PresetType,
  {
    pumpType: PumpType;
    concreteYards: number;
    pumpRateYardsPerHour: number;
    minimumHours: number;
    hourlyRate: number;
    setupFee: number;
    travelFee: number;
    washoutFee: number;
    hoseFee: number;
    yardageSurcharge: number;
    standbyHours: number;
    standbyRate: number;
  }
> = {
  "Line pump": {
    pumpType: "Line pump",
    concreteYards: 12,
    pumpRateYardsPerHour: 18,
    minimumHours: 4,
    hourlyRate: 175,
    setupFee: 250,
    travelFee: 150,
    washoutFee: 75,
    hoseFee: 100,
    yardageSurcharge: 0,
    standbyHours: 0,
    standbyRate: 150,
  },
  "Boom pump": {
    pumpType: "Boom pump",
    concreteYards: 35,
    pumpRateYardsPerHour: 45,
    minimumHours: 4,
    hourlyRate: 275,
    setupFee: 450,
    travelFee: 250,
    washoutFee: 125,
    hoseFee: 0,
    yardageSurcharge: 0,
    standbyHours: 0,
    standbyRate: 225,
  },
  Driveway: {
    pumpType: "Line pump",
    concreteYards: 10,
    pumpRateYardsPerHour: 15,
    minimumHours: 4,
    hourlyRate: 175,
    setupFee: 250,
    travelFee: 150,
    washoutFee: 75,
    hoseFee: 125,
    yardageSurcharge: 0,
    standbyHours: 0,
    standbyRate: 150,
  },
  Patio: {
    pumpType: "Line pump",
    concreteYards: 6,
    pumpRateYardsPerHour: 12,
    minimumHours: 4,
    hourlyRate: 175,
    setupFee: 225,
    travelFee: 125,
    washoutFee: 75,
    hoseFee: 100,
    yardageSurcharge: 0,
    standbyHours: 0,
    standbyRate: 150,
  },
  Footings: {
    pumpType: "Line pump",
    concreteYards: 18,
    pumpRateYardsPerHour: 20,
    minimumHours: 4,
    hourlyRate: 185,
    setupFee: 275,
    travelFee: 175,
    washoutFee: 85,
    hoseFee: 150,
    yardageSurcharge: 0,
    standbyHours: 0.5,
    standbyRate: 150,
  },
  "Wall pour": {
    pumpType: "Boom pump",
    concreteYards: 28,
    pumpRateYardsPerHour: 35,
    minimumHours: 4,
    hourlyRate: 275,
    setupFee: 450,
    travelFee: 250,
    washoutFee: 125,
    hoseFee: 0,
    yardageSurcharge: 0,
    standbyHours: 0.5,
    standbyRate: 225,
  },
  Custom: {
    pumpType: "Custom pump",
    concreteYards: 15,
    pumpRateYardsPerHour: 20,
    minimumHours: 4,
    hourlyRate: 200,
    setupFee: 250,
    travelFee: 150,
    washoutFee: 75,
    hoseFee: 100,
    yardageSurcharge: 0,
    standbyHours: 0,
    standbyRate: 150,
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

export default function ConcretePumpTruckCostCalculatorClient() {
  const [preset, setPreset] = useState<PresetType>("Line pump");
  const [pumpType, setPumpType] = useState<PumpType>("Line pump");
  const [concreteYards, setConcreteYards] = useState(12);
  const [pumpRateYardsPerHour, setPumpRateYardsPerHour] = useState(18);
  const [minimumHours, setMinimumHours] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(175);
  const [setupFee, setSetupFee] = useState(250);
  const [travelFee, setTravelFee] = useState(150);
  const [washoutFee, setWashoutFee] = useState(75);
  const [hoseFee, setHoseFee] = useState(100);
  const [yardageSurcharge, setYardageSurcharge] = useState(0);
  const [standbyHours, setStandbyHours] = useState(0);
  const [standbyRate, setStandbyRate] = useState(150);
  const [extraLaborCost, setExtraLaborCost] = useState(0);

  function applyPreset(nextPreset: PresetType) {
    const selected = presets[nextPreset];
    setPreset(nextPreset);
    setPumpType(selected.pumpType);
    setConcreteYards(selected.concreteYards);
    setPumpRateYardsPerHour(selected.pumpRateYardsPerHour);
    setMinimumHours(selected.minimumHours);
    setHourlyRate(selected.hourlyRate);
    setSetupFee(selected.setupFee);
    setTravelFee(selected.travelFee);
    setWashoutFee(selected.washoutFee);
    setHoseFee(selected.hoseFee);
    setYardageSurcharge(selected.yardageSurcharge);
    setStandbyHours(selected.standbyHours);
    setStandbyRate(selected.standbyRate);
  }

  const result = useMemo(() => {
    const safeConcreteYards = clampNumber(concreteYards);
    const safePumpRate = Math.max(clampNumber(pumpRateYardsPerHour, 1), 1);
    const safeMinimumHours = clampNumber(minimumHours);
    const safeHourlyRate = clampNumber(hourlyRate);
    const safeSetupFee = clampNumber(setupFee);
    const safeTravelFee = clampNumber(travelFee);
    const safeWashoutFee = clampNumber(washoutFee);
    const safeHoseFee = clampNumber(hoseFee);
    const safeYardageSurcharge = clampNumber(yardageSurcharge);
    const safeStandbyHours = clampNumber(standbyHours);
    const safeStandbyRate = clampNumber(standbyRate);
    const safeExtraLaborCost = clampNumber(extraLaborCost);

    const estimatedPumpingHours = safeConcreteYards / safePumpRate;
    const billablePumpHours = Math.max(estimatedPumpingHours, safeMinimumHours);
    const hourlyPumpCost = billablePumpHours * safeHourlyRate;
    const standbyCost = safeStandbyHours * safeStandbyRate;
    const yardageSurchargeCost = safeConcreteYards * safeYardageSurcharge;

    const fixedFees =
      safeSetupFee + safeTravelFee + safeWashoutFee + safeHoseFee + safeExtraLaborCost;

    const totalCost =
      hourlyPumpCost + standbyCost + yardageSurchargeCost + fixedFees;

    const costPerYard = safeConcreteYards > 0 ? totalCost / safeConcreteYards : 0;
    const costPerHour = billablePumpHours > 0 ? totalCost / billablePumpHours : 0;

    const unusedMinimumHours = Math.max(safeMinimumHours - estimatedPumpingHours, 0);

    const notes: string[] = [];

    if (safeConcreteYards < 8 && safeMinimumHours >= 4) {
      notes.push("Small pours are often controlled by the pump minimum charge.");
    }

    if (pumpType === "Boom pump" && safeConcreteYards < 15) {
      notes.push("A boom pump may be expensive for a small pour unless reach or access requires it.");
    }

    if (pumpType === "Line pump" && safeConcreteYards > 30) {
      notes.push("For larger pours, compare line pump pricing against boom pump productivity.");
    }

    if (safePumpRate < 10) {
      notes.push("Slow pump rate increases billable time. Check access, crew size, hose length, and placement speed.");
    }

    if (safeStandbyHours > 0) {
      notes.push("Standby time can add cost when trucks, forms, crew, or site access are delayed.");
    }

    if (notes.length === 0) {
      notes.push("Pump estimate looks reasonable for the selected yardage, rate, and minimum charge.");
    }

    return {
      estimatedPumpingHours,
      billablePumpHours,
      unusedMinimumHours,
      hourlyPumpCost,
      standbyCost,
      yardageSurchargeCost,
      fixedFees,
      setupFee: safeSetupFee,
      travelFee: safeTravelFee,
      washoutFee: safeWashoutFee,
      hoseFee: safeHoseFee,
      extraLaborCost: safeExtraLaborCost,
      totalCost,
      costPerYard,
      costPerHour,
      notes,
    };
  }, [
    concreteYards,
    pumpRateYardsPerHour,
    minimumHours,
    hourlyRate,
    setupFee,
    travelFee,
    washoutFee,
    hoseFee,
    yardageSurcharge,
    standbyHours,
    standbyRate,
    extraLaborCost,
    pumpType,
  ]);

  function copyResults() {
    const summary = [
      "Concrete Pump Truck Cost Estimate",
      `Preset: ${preset}`,
      `Pump type: ${pumpType}`,
      `Concrete volume: ${formatNumber(concreteYards)} yd³`,
      `Pump rate: ${formatNumber(pumpRateYardsPerHour)} yd³/hr`,
      `Estimated pumping time: ${formatNumber(result.estimatedPumpingHours)} hr`,
      `Billable pump hours: ${formatNumber(result.billablePumpHours)} hr`,
      `Hourly pump cost: ${formatCurrency(result.hourlyPumpCost)}`,
      `Fixed fees: ${formatCurrency(result.fixedFees)}`,
      `Standby cost: ${formatCurrency(result.standbyCost)}`,
      `Total pump cost: ${formatCurrency(result.totalCost)}`,
      `Cost per yard: ${formatCurrency(result.costPerYard)}`,
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
          <h2 className="text-2xl font-bold">Pump truck estimate details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Choose a preset, then adjust concrete yardage, pump type, minimum
            hours, hourly rate, setup fees, travel fees, hose charges, standby
            time, and yardage surcharges.
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
          <SelectInput
            label="Pump type"
            value={pumpType}
            onChange={(value) => setPumpType(value as PumpType)}
            options={["Line pump", "Boom pump", "Trailer pump", "Custom pump"]}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Concrete volume" suffix="yd³" value={concreteYards} onChange={setConcreteYards} />
            <NumberInput label="Pump rate" suffix="yd³/hr" value={pumpRateYardsPerHour} onChange={setPumpRateYardsPerHour} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Minimum hours" suffix="hr" value={minimumHours} onChange={setMinimumHours} />
            <NumberInput label="Hourly rate" prefix="$" suffix="/hr" value={hourlyRate} onChange={setHourlyRate} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Setup fee" prefix="$" value={setupFee} onChange={setSetupFee} />
            <NumberInput label="Travel fee" prefix="$" value={travelFee} onChange={setTravelFee} />
            <NumberInput label="Washout fee" prefix="$" value={washoutFee} onChange={setWashoutFee} />
            <NumberInput label="Hose / line fee" prefix="$" value={hoseFee} onChange={setHoseFee} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Yardage surcharge" prefix="$" suffix="/yd³" value={yardageSurcharge} onChange={setYardageSurcharge} />
            <NumberInput label="Extra labor / access cost" prefix="$" value={extraLaborCost} onChange={setExtraLaborCost} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Standby time" suffix="hr" value={standbyHours} onChange={setStandbyHours} />
            <NumberInput label="Standby rate" prefix="$" suffix="/hr" value={standbyRate} onChange={setStandbyRate} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Pump truck cost estimate</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review pumping time, billable hours, fixed fees, standby cost,
            yardage surcharge, total pump truck cost, and cost per cubic yard.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Total pump cost" value={formatCurrency(result.totalCost)} highlight />
          <ResultCard label="Cost per yard" value={formatCurrency(result.costPerYard)} />
          <ResultCard label="Billable pump hours" value={`${formatNumber(result.billablePumpHours)} hr`} />
          <ResultCard label="Estimated pump time" value={`${formatNumber(result.estimatedPumpingHours)} hr`} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Time estimate</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Estimated pumping time" value={`${formatNumber(result.estimatedPumpingHours)} hr`} />
            <ResultRow label="Minimum rental hours" value={`${formatNumber(minimumHours)} hr`} />
            <ResultRow label="Unused minimum hours" value={`${formatNumber(result.unusedMinimumHours)} hr`} />
            <ResultRow label="Billable pump hours" value={`${formatNumber(result.billablePumpHours)} hr`} />
            <ResultRow label="Cost per billable hour" value={formatCurrency(result.costPerHour)} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Cost breakdown</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Hourly pump cost" value={formatCurrency(result.hourlyPumpCost)} />
            <ResultRow label="Setup fee" value={formatCurrency(result.setupFee)} />
            <ResultRow label="Travel fee" value={formatCurrency(result.travelFee)} />
            <ResultRow label="Washout fee" value={formatCurrency(result.washoutFee)} />
            <ResultRow label="Hose / line fee" value={formatCurrency(result.hoseFee)} />
            <ResultRow label="Extra labor / access cost" value={formatCurrency(result.extraLaborCost)} />
            <ResultRow label="Yardage surcharge" value={formatCurrency(result.yardageSurchargeCost)} />
            <ResultRow label="Standby cost" value={formatCurrency(result.standbyCost)} />
            <ResultRow label="Total pump cost" value={formatCurrency(result.totalCost)} />
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
