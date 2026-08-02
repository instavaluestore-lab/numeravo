"use client";

import { useMemo, useState } from "react";

type BarSize = "#3" | "#4" | "#5" | "#6" | "#7" | "#8" | "#9" | "#10" | "#11";

type SpliceFactor =
  | "40 bar diameters"
  | "50 bar diameters"
  | "60 bar diameters"
  | "Custom";

const barData: Record<
  BarSize,
  {
    diameterInches: number;
    weightLbPerFt: number;
  }
> = {
  "#3": { diameterInches: 0.375, weightLbPerFt: 0.376 },
  "#4": { diameterInches: 0.5, weightLbPerFt: 0.668 },
  "#5": { diameterInches: 0.625, weightLbPerFt: 1.043 },
  "#6": { diameterInches: 0.75, weightLbPerFt: 1.502 },
  "#7": { diameterInches: 0.875, weightLbPerFt: 2.044 },
  "#8": { diameterInches: 1.0, weightLbPerFt: 2.67 },
  "#9": { diameterInches: 1.128, weightLbPerFt: 3.4 },
  "#10": { diameterInches: 1.27, weightLbPerFt: 4.303 },
  "#11": { diameterInches: 1.41, weightLbPerFt: 5.313 },
};

const spliceFactors: Record<SpliceFactor, number> = {
  "40 bar diameters": 40,
  "50 bar diameters": 50,
  "60 bar diameters": 60,
  Custom: 40,
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatCurrencyDetailed(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
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

export default function RebarLapSpliceCalculatorClient() {
  const [barSize, setBarSize] = useState<BarSize>("#4");
  const [spliceFactor, setSpliceFactor] = useState<SpliceFactor>("40 bar diameters");
  const [customFactor, setCustomFactor] = useState(40);
  const [numberOfSplices, setNumberOfSplices] = useState(20);
  const [wastePercent, setWastePercent] = useState(10);
  const [pricePerFoot, setPricePerFoot] = useState(0.65);
  const [pricePerPound, setPricePerPound] = useState(0);
  const [useWeightPricing, setUseWeightPricing] = useState(false);

  const result = useMemo(() => {
    const data = barData[barSize];
    const factor =
      spliceFactor === "Custom"
        ? Math.max(clampNumber(customFactor, 40), 1)
        : spliceFactors[spliceFactor];

    const safeSplices = Math.floor(clampNumber(numberOfSplices));
    const safeWastePercent = clampNumber(wastePercent);
    const safePricePerFoot = clampNumber(pricePerFoot);
    const safePricePerPound = clampNumber(pricePerPound);

    const lapLengthInches = data.diameterInches * factor;
    const lapLengthFeet = lapLengthInches / 12;
    const totalLapLengthFeet = lapLengthFeet * safeSplices;
    const wasteLengthFeet = totalLapLengthFeet * (safeWastePercent / 100);
    const totalLengthWithWasteFeet = totalLapLengthFeet + wasteLengthFeet;

    const totalWeight = totalLengthWithWasteFeet * data.weightLbPerFt;
    const materialCost = useWeightPricing
      ? totalWeight * safePricePerPound
      : totalLengthWithWasteFeet * safePricePerFoot;

    const costPerSplice = safeSplices > 0 ? materialCost / safeSplices : 0;

    const notes: string[] = [];

    if (factor < 40) {
      notes.push("The selected lap factor is below a common 40-diameter field estimating rule. Verify with project requirements.");
    }

    if (factor >= 60) {
      notes.push("A 60-diameter lap factor is more conservative for estimating added rebar length and cost.");
    }

    if (barSize === "#8" || barSize === "#9" || barSize === "#10" || barSize === "#11") {
      notes.push("Large rebar sizes can have more restrictive splice requirements. Confirm with structural drawings and engineering specifications.");
    }

    if (safeWastePercent < 5) {
      notes.push("Waste allowance is low. Field cutting, stock lengths, layout changes, and handling can increase required material.");
    }

    if (notes.length === 0) {
      notes.push("This looks reasonable for a planning-level splice material estimate.");
    }

    return {
      diameterInches: data.diameterInches,
      weightLbPerFt: data.weightLbPerFt,
      factor,
      lapLengthInches,
      lapLengthFeet,
      totalLapLengthFeet,
      wasteLengthFeet,
      totalLengthWithWasteFeet,
      totalWeight,
      materialCost,
      costPerSplice,
      notes,
    };
  }, [
    barSize,
    spliceFactor,
    customFactor,
    numberOfSplices,
    wastePercent,
    pricePerFoot,
    pricePerPound,
    useWeightPricing,
  ]);

  function copyResults() {
    const summary = [
      "Rebar Lap Splice Estimate",
      `Bar size: ${barSize}`,
      `Bar diameter: ${formatNumber(result.diameterInches, 3)} in`,
      `Bar weight: ${formatNumber(result.weightLbPerFt, 3)} lb/ft`,
      `Lap factor: ${formatNumber(result.factor)} bar diameters`,
      `Lap length: ${formatNumber(result.lapLengthInches)} in`,
      `Lap length: ${formatNumber(result.lapLengthFeet)} ft`,
      `Number of splices: ${formatNumber(numberOfSplices, 0)}`,
      `Total lap length before waste: ${formatNumber(result.totalLapLengthFeet)} ft`,
      `Waste allowance: ${formatNumber(wastePercent)}%`,
      `Total added length with waste: ${formatNumber(result.totalLengthWithWasteFeet)} ft`,
      `Estimated added weight: ${formatNumber(result.totalWeight)} lb`,
      `Estimated material cost: ${formatCurrencyDetailed(result.materialCost)}`,
      `Cost per splice: ${formatCurrencyDetailed(result.costPerSplice)}`,
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
          <h2 className="text-2xl font-bold">Splice estimate details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Select rebar size, splice factor, number of overlaps, waste
            allowance, and pricing method to estimate added splice material.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          <SelectInput
            label="Rebar size"
            value={barSize}
            onChange={(value) => setBarSize(value as BarSize)}
            options={Object.keys(barData)}
          />

          <SelectInput
            label="Lap splice factor"
            value={spliceFactor}
            onChange={(value) => setSpliceFactor(value as SpliceFactor)}
            options={Object.keys(spliceFactors)}
          />

          {spliceFactor === "Custom" ? (
            <NumberInput
              label="Custom lap factor"
              suffix="bar diameters"
              value={customFactor}
              onChange={setCustomFactor}
            />
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Number of splices"
              value={numberOfSplices}
              onChange={setNumberOfSplices}
            />
            <NumberInput
              label="Waste allowance"
              suffix="%"
              value={wastePercent}
              onChange={setWastePercent}
            />
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
            <p className="mb-3 text-sm font-medium text-[#A0AEC0]">Pricing method</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setUseWeightPricing(false)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  !useWeightPricing
                    ? "border-orange-400 bg-orange-400 text-[#0B0F19]"
                    : "border-[#1F2937] bg-[#121826] text-white hover:border-orange-400"
                }`}
              >
                Price per foot
              </button>
              <button
                type="button"
                onClick={() => setUseWeightPricing(true)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  useWeightPricing
                    ? "border-orange-400 bg-orange-400 text-[#0B0F19]"
                    : "border-[#1F2937] bg-[#121826] text-white hover:border-orange-400"
                }`}
              >
                Price per pound
              </button>
            </div>
          </div>

          {!useWeightPricing ? (
            <NumberInput
              label="Rebar price"
              prefix="$"
              suffix="/ft"
              value={pricePerFoot}
              onChange={setPricePerFoot}
            />
          ) : (
            <NumberInput
              label="Rebar price"
              prefix="$"
              suffix="/lb"
              value={pricePerPound}
              onChange={setPricePerPound}
            />
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Rebar lap splice estimate</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review lap length, added rebar length, waste, splice weight,
            estimated material cost, and cost per splice.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Lap length" value={`${formatNumber(result.lapLengthInches)} in`} highlight />
          <ResultCard label="Lap length" value={`${formatNumber(result.lapLengthFeet)} ft`} />
          <ResultCard label="Added length" value={`${formatNumber(result.totalLengthWithWasteFeet)} ft`} />
          <ResultCard label="Material cost" value={formatCurrencyDetailed(result.materialCost)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Bar and splice details</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Bar size" value={barSize} />
            <ResultRow label="Approx. bar diameter" value={`${formatNumber(result.diameterInches, 3)} in`} />
            <ResultRow label="Approx. bar weight" value={`${formatNumber(result.weightLbPerFt, 3)} lb/ft`} />
            <ResultRow label="Lap factor" value={`${formatNumber(result.factor)} bar diameters`} />
            <ResultRow label="Lap length" value={`${formatNumber(result.lapLengthInches)} in`} />
            <ResultRow label="Lap length" value={`${formatNumber(result.lapLengthFeet)} ft`} />
            <ResultRow label="Number of splices" value={formatNumber(numberOfSplices, 0)} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Material estimate</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Total lap length before waste" value={`${formatNumber(result.totalLapLengthFeet)} ft`} />
            <ResultRow label="Waste length" value={`${formatNumber(result.wasteLengthFeet)} ft`} />
            <ResultRow label="Total added length with waste" value={`${formatNumber(result.totalLengthWithWasteFeet)} ft`} />
            <ResultRow label="Estimated added weight" value={`${formatNumber(result.totalWeight)} lb`} />
            <ResultRow label="Estimated material cost" value={formatCurrencyDetailed(result.materialCost)} />
            <ResultRow label="Cost per splice" value={formatCurrencyDetailed(result.costPerSplice)} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-orange-400/40 bg-orange-400/10 p-5">
          <h3 className="font-semibold text-orange-300">Engineering reminder</h3>
          <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
            This calculator is for estimating and material planning only. Final
            lap splice length should come from the structural drawings,
            specifications, applicable code, or project engineer.
          </p>
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
