"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Small pad"
  | "Patio repair"
  | "Walkway"
  | "Post holes"
  | "Small slab"
  | "Custom";

const presets: Record<
  PresetType,
  {
    neededYards: number;
    concretePricePerYard: number;
    deliveryFee: number;
    minimumYards: number;
    shortLoadFee: number;
    bagSize: number;
    bagPrice: number;
    bagYield: number;
    wastePercent: number;
    taxRate: number;
  }
> = {
  "Small pad": {
    neededYards: 1.5,
    concretePricePerYard: 165,
    deliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 150,
    bagSize: 80,
    bagPrice: 6.5,
    bagYield: 0.6,
    wastePercent: 10,
    taxRate: 8.25,
  },
  "Patio repair": {
    neededYards: 2.5,
    concretePricePerYard: 165,
    deliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 150,
    bagSize: 80,
    bagPrice: 6.5,
    bagYield: 0.6,
    wastePercent: 10,
    taxRate: 8.25,
  },
  Walkway: {
    neededYards: 3,
    concretePricePerYard: 160,
    deliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 125,
    bagSize: 80,
    bagPrice: 6.5,
    bagYield: 0.6,
    wastePercent: 8,
    taxRate: 8.25,
  },
  "Post holes": {
    neededYards: 0.75,
    concretePricePerYard: 165,
    deliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 150,
    bagSize: 80,
    bagPrice: 6.5,
    bagYield: 0.6,
    wastePercent: 10,
    taxRate: 8.25,
  },
  "Small slab": {
    neededYards: 4,
    concretePricePerYard: 160,
    deliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 125,
    bagSize: 80,
    bagPrice: 6.5,
    bagYield: 0.6,
    wastePercent: 8,
    taxRate: 8.25,
  },
  Custom: {
    neededYards: 2,
    concretePricePerYard: 165,
    deliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 150,
    bagSize: 80,
    bagPrice: 6.5,
    bagYield: 0.6,
    wastePercent: 10,
    taxRate: 8.25,
  },
};

export default function ConcreteShortLoadFeeCalculatorClient() {
  const [presetType, setPresetType] = useState<PresetType>("Small pad");
  const [neededYards, setNeededYards] = useState(1.5);
  const [concretePricePerYard, setConcretePricePerYard] = useState(165);
  const [deliveryFee, setDeliveryFee] = useState(175);
  const [minimumYards, setMinimumYards] = useState(6);
  const [shortLoadFee, setShortLoadFee] = useState(150);
  const [bagSize, setBagSize] = useState(80);
  const [bagPrice, setBagPrice] = useState(6.5);
  const [bagYield, setBagYield] = useState(0.6);
  const [wastePercent, setWastePercent] = useState(10);
  const [taxRate, setTaxRate] = useState(8.25);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: PresetType) {
    const preset = presets[type];

    setPresetType(type);
    setNeededYards(preset.neededYards);
    setConcretePricePerYard(preset.concretePricePerYard);
    setDeliveryFee(preset.deliveryFee);
    setMinimumYards(preset.minimumYards);
    setShortLoadFee(preset.shortLoadFee);
    setBagSize(preset.bagSize);
    setBagPrice(preset.bagPrice);
    setBagYield(preset.bagYield);
    setWastePercent(preset.wastePercent);
    setTaxRate(preset.taxRate);
  }

  const results = useMemo(() => {
    const orderYardsWithWaste = neededYards * (1 + wastePercent / 100);
    const appliesShortLoad = orderYardsWithWaste < minimumYards;

    const exactReadyMixSubtotal =
      orderYardsWithWaste * concretePricePerYard +
      deliveryFee +
      (appliesShortLoad ? shortLoadFee : 0);

    const minimumOrderSubtotal =
      minimumYards * concretePricePerYard + deliveryFee;

    const bagYieldYards = bagYield / 27;
    const bagCount = bagYieldYards > 0 ? Math.ceil(orderYardsWithWaste / bagYieldYards) : 0;
    const bagSubtotal = bagCount * bagPrice;

    const exactReadyMixTax = exactReadyMixSubtotal * (taxRate / 100);
    const minimumOrderTax = minimumOrderSubtotal * (taxRate / 100);
    const bagTax = bagSubtotal * (taxRate / 100);

    const exactReadyMixTotal = exactReadyMixSubtotal + exactReadyMixTax;
    const minimumOrderTotal = minimumOrderSubtotal + minimumOrderTax;
    const bagTotal = bagSubtotal + bagTax;

    const extraYardsIfMinimum = Math.max(0, minimumYards - orderYardsWithWaste);
    const shortLoadBreakEvenFee = Math.max(
      0,
      (minimumYards - orderYardsWithWaste) * concretePricePerYard
    );

    const options = [
      { name: "Exact ready-mix order", total: exactReadyMixTotal },
      { name: "Minimum ready-mix order", total: minimumOrderTotal },
      { name: "Bagged concrete", total: bagTotal },
    ].sort((a, b) => a.total - b.total);

    const recommendation = options[0].name;

    const notes: string[] = [];

    if (appliesShortLoad) {
      notes.push("Short-load fee applies because the order is below the supplier minimum.");
    } else {
      notes.push("Short-load fee does not apply because the order meets or exceeds the supplier minimum.");
    }

    if (extraYardsIfMinimum > 0) {
      notes.push(
        `Ordering the supplier minimum would create about ${extraYardsIfMinimum.toFixed(
          2
        )} extra yd³ before considering placement or disposal.`
      );
    }

    if (bagCount > 80) {
      notes.push("Bagged concrete requires many bags. Ready-mix may be more practical even if bags look cheaper.");
    }

    if (shortLoadFee > shortLoadBreakEvenFee && appliesShortLoad) {
      notes.push("The short-load fee is higher than the material cost of ordering up to the minimum yards.");
    }

    return {
      orderYardsWithWaste,
      appliesShortLoad,
      exactReadyMixSubtotal,
      minimumOrderSubtotal,
      bagSubtotal,
      exactReadyMixTax,
      minimumOrderTax,
      bagTax,
      exactReadyMixTotal,
      minimumOrderTotal,
      bagTotal,
      bagCount,
      bagYieldYards,
      extraYardsIfMinimum,
      shortLoadBreakEvenFee,
      recommendation,
      notes,
    };
  }, [
    neededYards,
    concretePricePerYard,
    deliveryFee,
    minimumYards,
    shortLoadFee,
    bagPrice,
    bagYield,
    wastePercent,
    taxRate,
  ]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete Short Load Fee Calculator
Preset: ${presetType}
Needed yards: ${formatNumber(neededYards)} yd³
Order yards with waste: ${formatNumber(results.orderYardsWithWaste)} yd³
Supplier minimum: ${formatNumber(minimumYards)} yd³
Concrete price: $${formatNumber(concretePricePerYard)}/yd³
Delivery fee: $${formatNumber(deliveryFee)}
Short-load fee: $${formatNumber(results.appliesShortLoad ? shortLoadFee : 0)}
Exact ready-mix total: $${formatNumber(results.exactReadyMixTotal)}
Minimum ready-mix total: $${formatNumber(results.minimumOrderTotal)}
Bagged concrete: ${results.bagCount} bags at ${bagSize} lb
Bagged concrete total: $${formatNumber(results.bagTotal)}
Lowest-cost option: ${results.recommendation}
Notes: ${results.notes.join(" ")}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete short-load cost
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Compare the cost of ordering the exact ready-mix amount with a short-load
          fee, ordering the supplier minimum, or using bagged concrete.
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
          <NumberInput label="Concrete needed" suffix="yd³" value={neededYards} setValue={setNeededYards} />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
          <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
          <NumberInput label="Supplier minimum" suffix="yd³" value={minimumYards} setValue={setMinimumYards} />
          <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />

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

          <NumberInput label="Bag price" suffix="$" value={bagPrice} setValue={setBagPrice} />
          <NumberInput label="Bag yield" suffix="ft³" value={bagYield} setValue={setBagYield} />
          <NumberInput label="Tax rate" suffix="%" value={taxRate} setValue={setTaxRate} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Small-load planning note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Bagged concrete can look cheaper for very small projects, but it adds
            labor and mixing time. Ready-mix may still be the better choice for
            consistency, speed, and larger pours.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Lowest-cost option</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Best estimated option</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {results.recommendation}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            Based on current material, delivery, short-load, bag, waste, and tax inputs.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Order yards with waste" value={`${formatNumber(results.orderYardsWithWaste)} yd³`} />
          <ResultRow label="Short-load fee applies" value={results.appliesShortLoad ? "Yes" : "No"} />
          <ResultRow label="Exact ready-mix total" value={`$${formatNumber(results.exactReadyMixTotal)}`} />
          <ResultRow label="Minimum ready-mix total" value={`$${formatNumber(results.minimumOrderTotal)}`} />
          <ResultRow label="Bagged concrete total" value={`$${formatNumber(results.bagTotal)}`} />
          <ResultRow label="Bag count" value={`${results.bagCount} bags`} />
          <ResultRow label="Bag yield" value={`${formatNumber(results.bagYieldYards, 3)} yd³ / bag`} />
          <ResultRow label="Extra yards if minimum ordered" value={`${formatNumber(results.extraYardsIfMinimum)} yd³`} />
          <ResultRow label="Short-load break-even fee" value={`$${formatNumber(results.shortLoadBreakEvenFee)}`} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">Comparison notes</p>
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
          Use this as a planning estimate. Confirm supplier minimums, short-load
          charges, delivery fees, bag yield, taxes, and disposal limits before ordering.
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
