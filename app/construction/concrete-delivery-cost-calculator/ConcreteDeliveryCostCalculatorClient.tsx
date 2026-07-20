"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Small slab"
  | "Patio"
  | "Driveway"
  | "Garage slab"
  | "Large pour"
  | "Custom";

const presets: Record<
  PresetType,
  {
    cubicYards: number;
    concretePricePerYard: number;
    baseDeliveryFee: number;
    minimumYards: number;
    shortLoadFee: number;
    distanceMiles: number;
    includedMiles: number;
    extraMileFee: number;
    fuelFee: number;
    environmentalFee: number;
    waitingMinutes: number;
    includedWaitingMinutes: number;
    waitingFeePerMinute: number;
    weekendRushFee: number;
    taxRate: number;
  }
> = {
  "Small slab": {
    cubicYards: 2.5,
    concretePricePerYard: 165,
    baseDeliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 150,
    distanceMiles: 12,
    includedMiles: 10,
    extraMileFee: 4,
    fuelFee: 35,
    environmentalFee: 20,
    waitingMinutes: 0,
    includedWaitingMinutes: 30,
    waitingFeePerMinute: 2,
    weekendRushFee: 0,
    taxRate: 8.25,
  },
  Patio: {
    cubicYards: 4,
    concretePricePerYard: 160,
    baseDeliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 125,
    distanceMiles: 10,
    includedMiles: 10,
    extraMileFee: 4,
    fuelFee: 35,
    environmentalFee: 20,
    waitingMinutes: 10,
    includedWaitingMinutes: 30,
    waitingFeePerMinute: 2,
    weekendRushFee: 0,
    taxRate: 8.25,
  },
  Driveway: {
    cubicYards: 9,
    concretePricePerYard: 165,
    baseDeliveryFee: 200,
    minimumYards: 6,
    shortLoadFee: 150,
    distanceMiles: 15,
    includedMiles: 10,
    extraMileFee: 4,
    fuelFee: 45,
    environmentalFee: 25,
    waitingMinutes: 20,
    includedWaitingMinutes: 30,
    waitingFeePerMinute: 2,
    weekendRushFee: 0,
    taxRate: 8.25,
  },
  "Garage slab": {
    cubicYards: 8,
    concretePricePerYard: 165,
    baseDeliveryFee: 200,
    minimumYards: 6,
    shortLoadFee: 150,
    distanceMiles: 8,
    includedMiles: 10,
    extraMileFee: 4,
    fuelFee: 40,
    environmentalFee: 25,
    waitingMinutes: 15,
    includedWaitingMinutes: 30,
    waitingFeePerMinute: 2,
    weekendRushFee: 0,
    taxRate: 8.25,
  },
  "Large pour": {
    cubicYards: 18,
    concretePricePerYard: 155,
    baseDeliveryFee: 250,
    minimumYards: 6,
    shortLoadFee: 150,
    distanceMiles: 18,
    includedMiles: 10,
    extraMileFee: 4,
    fuelFee: 60,
    environmentalFee: 35,
    waitingMinutes: 45,
    includedWaitingMinutes: 30,
    waitingFeePerMinute: 2,
    weekendRushFee: 0,
    taxRate: 8.25,
  },
  Custom: {
    cubicYards: 5,
    concretePricePerYard: 160,
    baseDeliveryFee: 175,
    minimumYards: 6,
    shortLoadFee: 125,
    distanceMiles: 10,
    includedMiles: 10,
    extraMileFee: 4,
    fuelFee: 35,
    environmentalFee: 20,
    waitingMinutes: 0,
    includedWaitingMinutes: 30,
    waitingFeePerMinute: 2,
    weekendRushFee: 0,
    taxRate: 8.25,
  },
};

export default function ConcreteDeliveryCostCalculatorClient() {
  const [presetType, setPresetType] = useState<PresetType>("Patio");

  const [cubicYards, setCubicYards] = useState(4);
  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(175);
  const [minimumYards, setMinimumYards] = useState(6);
  const [shortLoadFee, setShortLoadFee] = useState(125);
  const [distanceMiles, setDistanceMiles] = useState(10);
  const [includedMiles, setIncludedMiles] = useState(10);
  const [extraMileFee, setExtraMileFee] = useState(4);
  const [fuelFee, setFuelFee] = useState(35);
  const [environmentalFee, setEnvironmentalFee] = useState(20);
  const [waitingMinutes, setWaitingMinutes] = useState(10);
  const [includedWaitingMinutes, setIncludedWaitingMinutes] = useState(30);
  const [waitingFeePerMinute, setWaitingFeePerMinute] = useState(2);
  const [weekendRushFee, setWeekendRushFee] = useState(0);
  const [taxRate, setTaxRate] = useState(8.25);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: PresetType) {
    const preset = presets[type];

    setPresetType(type);
    setCubicYards(preset.cubicYards);
    setConcretePricePerYard(preset.concretePricePerYard);
    setBaseDeliveryFee(preset.baseDeliveryFee);
    setMinimumYards(preset.minimumYards);
    setShortLoadFee(preset.shortLoadFee);
    setDistanceMiles(preset.distanceMiles);
    setIncludedMiles(preset.includedMiles);
    setExtraMileFee(preset.extraMileFee);
    setFuelFee(preset.fuelFee);
    setEnvironmentalFee(preset.environmentalFee);
    setWaitingMinutes(preset.waitingMinutes);
    setIncludedWaitingMinutes(preset.includedWaitingMinutes);
    setWaitingFeePerMinute(preset.waitingFeePerMinute);
    setWeekendRushFee(preset.weekendRushFee);
    setTaxRate(preset.taxRate);
  }

  const results = useMemo(() => {
    const concreteMaterialCost = cubicYards * concretePricePerYard;
    const appliesShortLoad = cubicYards > 0 && cubicYards < minimumYards;
    const actualShortLoadFee = appliesShortLoad ? shortLoadFee : 0;

    const extraMiles = Math.max(0, distanceMiles - includedMiles);
    const distanceFee = extraMiles * extraMileFee;

    const billableWaitingMinutes = Math.max(
      0,
      waitingMinutes - includedWaitingMinutes
    );
    const waitingTimeFee = billableWaitingMinutes * waitingFeePerMinute;

    const feesBeforeTax =
      baseDeliveryFee +
      actualShortLoadFee +
      distanceFee +
      fuelFee +
      environmentalFee +
      waitingTimeFee +
      weekendRushFee;

    const subtotalBeforeTax = concreteMaterialCost + feesBeforeTax;
    const tax = subtotalBeforeTax * (taxRate / 100);
    const totalDeliveredCost = subtotalBeforeTax + tax;
    const deliveredCostPerYard =
      cubicYards > 0 ? totalDeliveredCost / cubicYards : 0;

    const deliveryFeesPerYard = cubicYards > 0 ? feesBeforeTax / cubicYards : 0;

    const notes: string[] = [];

    if (appliesShortLoad) {
      notes.push(
        `Short-load fee applied because ${cubicYards.toFixed(
          2
        )} yd³ is below the ${minimumYards.toFixed(2)} yd³ minimum.`
      );
    } else {
      notes.push("No short-load fee is applied based on the current minimum load setting.");
    }

    if (extraMiles > 0) {
      notes.push(
        `${extraMiles.toFixed(2)} extra delivery miles are charged beyond the included mileage.`
      );
    }

    if (billableWaitingMinutes > 0) {
      notes.push(
        `${billableWaitingMinutes.toFixed(0)} billable waiting minutes are included in the estimate.`
      );
    }

    if (cubicYards > 0 && deliveredCostPerYard > concretePricePerYard * 1.4) {
      notes.push(
        "Effective delivered cost per yard is much higher than material price because fixed fees are spread across the order."
      );
    }

    return {
      concreteMaterialCost,
      appliesShortLoad,
      actualShortLoadFee,
      extraMiles,
      distanceFee,
      billableWaitingMinutes,
      waitingTimeFee,
      feesBeforeTax,
      subtotalBeforeTax,
      tax,
      totalDeliveredCost,
      deliveredCostPerYard,
      deliveryFeesPerYard,
      notes,
    };
  }, [
    cubicYards,
    concretePricePerYard,
    baseDeliveryFee,
    minimumYards,
    shortLoadFee,
    distanceMiles,
    includedMiles,
    extraMileFee,
    fuelFee,
    environmentalFee,
    waitingMinutes,
    includedWaitingMinutes,
    waitingFeePerMinute,
    weekendRushFee,
    taxRate,
  ]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete Delivery Cost Calculator
Preset: ${presetType}
Concrete ordered: ${formatNumber(cubicYards)} yd³
Concrete price: $${formatNumber(concretePricePerYard)}/yd³
Concrete material cost: $${formatNumber(results.concreteMaterialCost)}
Base delivery fee: $${formatNumber(baseDeliveryFee)}
Short-load fee: $${formatNumber(results.actualShortLoadFee)}
Distance fee: $${formatNumber(results.distanceFee)}
Fuel fee: $${formatNumber(fuelFee)}
Environmental fee: $${formatNumber(environmentalFee)}
Waiting time fee: $${formatNumber(results.waitingTimeFee)}
Weekend / rush fee: $${formatNumber(weekendRushFee)}
Tax: $${formatNumber(results.tax)}
Total delivered cost: $${formatNumber(results.totalDeliveredCost)}
Delivered cost per yard: $${formatNumber(results.deliveredCostPerYard)}/yd³
Notes: ${results.notes.join(" ")}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete delivery cost
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter concrete yards, supplier price, delivery fee, short-load rules,
          mileage, waiting time, extra fees, and tax to estimate delivered cost.
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
          <NumberInput label="Concrete ordered" suffix="yd³" value={cubicYards} setValue={setCubicYards} />
          <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
          <NumberInput label="Base delivery fee" suffix="$" value={baseDeliveryFee} setValue={setBaseDeliveryFee} />
          <NumberInput label="Minimum load" suffix="yd³" value={minimumYards} setValue={setMinimumYards} />
          <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />
          <NumberInput label="Distance to site" suffix="mi" value={distanceMiles} setValue={setDistanceMiles} />
          <NumberInput label="Included miles" suffix="mi" value={includedMiles} setValue={setIncludedMiles} />
          <NumberInput label="Extra mileage fee" suffix="$/mi" value={extraMileFee} setValue={setExtraMileFee} />
          <NumberInput label="Fuel fee" suffix="$" value={fuelFee} setValue={setFuelFee} />
          <NumberInput label="Environmental fee" suffix="$" value={environmentalFee} setValue={setEnvironmentalFee} />
          <NumberInput label="Truck waiting time" suffix="min" value={waitingMinutes} setValue={setWaitingMinutes} />
          <NumberInput label="Included waiting time" suffix="min" value={includedWaitingMinutes} setValue={setIncludedWaitingMinutes} />
          <NumberInput label="Waiting fee" suffix="$/min" value={waitingFeePerMinute} setValue={setWaitingFeePerMinute} />
          <NumberInput label="Weekend / rush fee" suffix="$" value={weekendRushFee} setValue={setWeekendRushFee} />
          <NumberInput label="Tax rate" suffix="%" value={taxRate} setValue={setTaxRate} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Ordering note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Ready-mix suppliers may price delivery differently. Confirm whether
            delivery, short-load fees, fuel, tax, and waiting time are included in
            the quote before scheduling the pour.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Delivered concrete cost</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Total delivered cost</p>
          <p className="mt-2 text-5xl font-bold text-white">
            ${formatNumber(results.totalDeliveredCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            ${formatNumber(results.deliveredCostPerYard)}/yd³ delivered.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Concrete material cost" value={`$${formatNumber(results.concreteMaterialCost)}`} />
          <ResultRow label="Base delivery fee" value={`$${formatNumber(baseDeliveryFee)}`} />
          <ResultRow label="Short-load fee" value={`$${formatNumber(results.actualShortLoadFee)}`} />
          <ResultRow label="Distance fee" value={`$${formatNumber(results.distanceFee)}`} />
          <ResultRow label="Fuel fee" value={`$${formatNumber(fuelFee)}`} />
          <ResultRow label="Environmental fee" value={`$${formatNumber(environmentalFee)}`} />
          <ResultRow label="Waiting time fee" value={`$${formatNumber(results.waitingTimeFee)}`} />
          <ResultRow label="Weekend / rush fee" value={`$${formatNumber(weekendRushFee)}`} />
          <ResultRow label="Fees before tax" value={`$${formatNumber(results.feesBeforeTax)}`} />
          <ResultRow label="Tax" value={`$${formatNumber(results.tax)}`} />
          <ResultRow label="Delivered cost per yard" value={`$${formatNumber(results.deliveredCostPerYard)}/yd³`} />
          <ResultRow label="Delivery fees per yard" value={`$${formatNumber(results.deliveryFeesPerYard)}/yd³`} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">Cost notes</p>
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
          Use this as a planning estimate. Confirm the final supplier quote,
          delivery window, unload time, minimum load, taxes, and fees before ordering.
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
