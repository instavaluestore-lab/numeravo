"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Simple slab"
  | "Driveway"
  | "Patio"
  | "Footing"
  | "Irregular pour"
  | "Custom";

const presets: Record<
  PresetType,
  {
    baseYards: number;
    wastePercent: number;
    concretePricePerYard: number;
    truckCapacityYards: number;
    bagSize: number;
    bagYield: number;
    bagPrice: number;
    roundToNearest: number;
  }
> = {
  "Simple slab": {
    baseYards: 4,
    wastePercent: 5,
    concretePricePerYard: 165,
    truckCapacityYards: 10,
    bagSize: 80,
    bagYield: 0.6,
    bagPrice: 6.5,
    roundToNearest: 0.25,
  },
  Driveway: {
    baseYards: 12,
    wastePercent: 10,
    concretePricePerYard: 165,
    truckCapacityYards: 10,
    bagSize: 80,
    bagYield: 0.6,
    bagPrice: 6.5,
    roundToNearest: 0.5,
  },
  Patio: {
    baseYards: 5,
    wastePercent: 8,
    concretePricePerYard: 165,
    truckCapacityYards: 10,
    bagSize: 80,
    bagYield: 0.6,
    bagPrice: 6.5,
    roundToNearest: 0.25,
  },
  Footing: {
    baseYards: 3,
    wastePercent: 10,
    concretePricePerYard: 165,
    truckCapacityYards: 10,
    bagSize: 80,
    bagYield: 0.6,
    bagPrice: 6.5,
    roundToNearest: 0.25,
  },
  "Irregular pour": {
    baseYards: 6,
    wastePercent: 15,
    concretePricePerYard: 165,
    truckCapacityYards: 10,
    bagSize: 80,
    bagYield: 0.6,
    bagPrice: 6.5,
    roundToNearest: 0.5,
  },
  Custom: {
    baseYards: 5,
    wastePercent: 10,
    concretePricePerYard: 165,
    truckCapacityYards: 10,
    bagSize: 80,
    bagYield: 0.6,
    bagPrice: 6.5,
    roundToNearest: 0.25,
  },
};

export default function ConcreteWasteCalculatorClient() {
  const [presetType, setPresetType] = useState<PresetType>("Simple slab");
  const [baseYards, setBaseYards] = useState(4);
  const [wastePercent, setWastePercent] = useState(5);
  const [concretePricePerYard, setConcretePricePerYard] = useState(165);
  const [truckCapacityYards, setTruckCapacityYards] = useState(10);
  const [bagSize, setBagSize] = useState(80);
  const [bagYield, setBagYield] = useState(0.6);
  const [bagPrice, setBagPrice] = useState(6.5);
  const [roundToNearest, setRoundToNearest] = useState(0.25);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: PresetType) {
    const preset = presets[type];

    setPresetType(type);
    setBaseYards(preset.baseYards);
    setWastePercent(preset.wastePercent);
    setConcretePricePerYard(preset.concretePricePerYard);
    setTruckCapacityYards(preset.truckCapacityYards);
    setBagSize(preset.bagSize);
    setBagYield(preset.bagYield);
    setBagPrice(preset.bagPrice);
    setRoundToNearest(preset.roundToNearest);
  }

  const results = useMemo(() => {
    const wasteYards = baseYards * (wastePercent / 100);
    const rawOrderYards = baseYards + wasteYards;
    const roundedOrderYards =
      roundToNearest > 0
        ? Math.ceil(rawOrderYards / roundToNearest) * roundToNearest
        : rawOrderYards;

    const roundingExtraYards = Math.max(0, roundedOrderYards - rawOrderYards);
    const totalExtraYards = roundedOrderYards - baseYards;

    const baseConcreteCost = baseYards * concretePricePerYard;
    const wasteCost = wasteYards * concretePricePerYard;
    const roundingCost = roundingExtraYards * concretePricePerYard;
    const totalConcreteCost = roundedOrderYards * concretePricePerYard;

    const truckloadsBeforeWaste =
      truckCapacityYards > 0 ? Math.ceil(baseYards / truckCapacityYards) : 0;
    const truckloadsAfterWaste =
      truckCapacityYards > 0 ? Math.ceil(roundedOrderYards / truckCapacityYards) : 0;

    const bagYieldYards = bagYield / 27;
    const bagsBeforeWaste =
      bagYieldYards > 0 ? Math.ceil(baseYards / bagYieldYards) : 0;
    const bagsAfterWaste =
      bagYieldYards > 0 ? Math.ceil(roundedOrderYards / bagYieldYards) : 0;
    const extraBags = Math.max(0, bagsAfterWaste - bagsBeforeWaste);
    const bagCostBeforeWaste = bagsBeforeWaste * bagPrice;
    const bagCostAfterWaste = bagsAfterWaste * bagPrice;
    const extraBagCost = bagCostAfterWaste - bagCostBeforeWaste;

    const effectiveWastePercent =
      baseYards > 0 ? ((roundedOrderYards - baseYards) / baseYards) * 100 : 0;

    const notes: string[] = [];

    if (wastePercent < 5) {
      notes.push("Waste allowance is low. Simple, well-measured pours may be fine, but verify dimensions carefully.");
    } else if (wastePercent <= 10) {
      notes.push("Waste allowance is within the common planning range for many concrete jobs.");
    } else {
      notes.push("Waste allowance is high. This may be appropriate for irregular forms, uneven excavation, or complex pours.");
    }

    if (truckloadsAfterWaste > truckloadsBeforeWaste) {
      notes.push("Waste and rounding increase the estimated ready-mix truckload count.");
    }

    if (extraBags > 25) {
      notes.push("The waste allowance adds many extra bags. For larger pours, ready-mix may be more practical than bagged concrete.");
    }

    if (roundingExtraYards > 0) {
      notes.push("Rounding increases the order quantity beyond the selected waste percentage.");
    }

    return {
      wasteYards,
      rawOrderYards,
      roundedOrderYards,
      roundingExtraYards,
      totalExtraYards,
      baseConcreteCost,
      wasteCost,
      roundingCost,
      totalConcreteCost,
      truckloadsBeforeWaste,
      truckloadsAfterWaste,
      bagYieldYards,
      bagsBeforeWaste,
      bagsAfterWaste,
      extraBags,
      bagCostBeforeWaste,
      bagCostAfterWaste,
      extraBagCost,
      effectiveWastePercent,
      notes,
    };
  }, [
    baseYards,
    wastePercent,
    concretePricePerYard,
    truckCapacityYards,
    bagYield,
    bagPrice,
    roundToNearest,
  ]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete Waste Calculator
Preset: ${presetType}
Base concrete: ${formatNumber(baseYards)} yd³
Waste allowance: ${formatNumber(wastePercent)}%
Waste yards: ${formatNumber(results.wasteYards)} yd³
Raw order yards: ${formatNumber(results.rawOrderYards)} yd³
Rounded order yards: ${formatNumber(results.roundedOrderYards)} yd³
Total extra yards: ${formatNumber(results.totalExtraYards)} yd³
Concrete price: $${formatNumber(concretePricePerYard)}/yd³
Waste cost: $${formatNumber(results.wasteCost)}
Rounding cost: $${formatNumber(results.roundingCost)}
Total concrete cost: $${formatNumber(results.totalConcreteCost)}
Truckloads before waste: ${results.truckloadsBeforeWaste}
Truckloads after waste: ${results.truckloadsAfterWaste}
Bag count before waste: ${results.bagsBeforeWaste}
Bag count after waste: ${results.bagsAfterWaste}
Extra bags: ${results.extraBags}
Notes: ${results.notes.join(" ")}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete waste allowance
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter your base concrete yards, waste percentage, price per yard, and
          rounding preference to estimate final order quantity and waste cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(presets) as PresetType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => applyPreset(type)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                presetType === type
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Base concrete needed" suffix="yd³" value={baseYards} setValue={setBaseYards} />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
          <NumberInput label="Truck capacity" suffix="yd³" value={truckCapacityYards} setValue={setTruckCapacityYards} />
          <NumberInput label="Bag price" suffix="$" value={bagPrice} setValue={setBagPrice} />
          <NumberInput label="Bag yield" suffix="ft³" value={bagYield} setValue={setBagYield} />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Bag size</span>
            <select
              value={bagSize}
              onChange={(event) => {
                const size = Number(event.target.value);
                setBagSize(size);
                setBagYield(size === 40 ? 0.3 : size === 60 ? 0.45 : 0.6);
              }}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option value={40}>40 lb bag</option>
              <option value={60}>60 lb bag</option>
              <option value={80}>80 lb bag</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Round order up to nearest</span>
            <select
              value={roundToNearest}
              onChange={(event) => setRoundToNearest(Number(event.target.value))}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option value={0.1}>0.10 yd³</option>
              <option value={0.25}>0.25 yd³</option>
              <option value={0.5}>0.50 yd³</option>
              <option value={1}>1.00 yd³</option>
            </select>
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Formula used</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Order yards = base yards × (1 + waste percentage), then rounded up
            to your selected ordering increment.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Concrete waste results</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Final order quantity</p>
          <p className="mt-2 text-4xl font-bold text-white">
            {formatNumber(results.roundedOrderYards)} yd³
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            Effective waste: {formatNumber(results.effectiveWastePercent)}%
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Base concrete" value={`${formatNumber(baseYards)} yd³`} />
          <ResultRow label="Waste yards" value={`${formatNumber(results.wasteYards)} yd³`} />
          <ResultRow label="Raw order yards" value={`${formatNumber(results.rawOrderYards)} yd³`} />
          <ResultRow label="Rounding extra yards" value={`${formatNumber(results.roundingExtraYards)} yd³`} />
          <ResultRow label="Total extra yards" value={`${formatNumber(results.totalExtraYards)} yd³`} />
          <ResultRow label="Base concrete cost" value={`$${formatNumber(results.baseConcreteCost)}`} />
          <ResultRow label="Waste cost" value={`$${formatNumber(results.wasteCost)}`} />
          <ResultRow label="Rounding cost" value={`$${formatNumber(results.roundingCost)}`} />
          <ResultRow label="Total concrete cost" value={`$${formatNumber(results.totalConcreteCost)}`} />
          <ResultRow label="Truckloads before waste" value={`${results.truckloadsBeforeWaste}`} />
          <ResultRow label="Truckloads after waste" value={`${results.truckloadsAfterWaste}`} />
          <ResultRow label="Bags before waste" value={`${results.bagsBeforeWaste}`} />
          <ResultRow label="Bags after waste" value={`${results.bagsAfterWaste}`} />
          <ResultRow label="Extra bags" value={`${results.extraBags}`} />
          <ResultRow label="Extra bag cost" value={`$${formatNumber(results.extraBagCost)}`} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">Planning notes</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[#A0AEC0]">
            {results.notes.map((note) => (
              <li key={note}>{note}</li>
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
          Use this as a planning estimate. Supplier rounding, minimum orders,
          delivery fees, and jobsite conditions can change the final order.
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
