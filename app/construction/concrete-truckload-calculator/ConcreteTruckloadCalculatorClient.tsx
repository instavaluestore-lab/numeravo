"use client";

import { useMemo, useState } from "react";

type InputMode = "Known cubic yards" | "Calculate from dimensions";
type ProjectType = "Slab / pad" | "Driveway" | "Patio" | "Sidewalk" | "Footing";

export default function ConcreteTruckloadCalculatorClient() {
  const [inputMode, setInputMode] = useState<InputMode>("Known cubic yards");
  const [projectType, setProjectType] = useState<ProjectType>("Slab / pad");

  const [knownYards, setKnownYards] = useState(8);
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(20);
  const [thicknessInches, setThicknessInches] = useState(4);

  const [wastePercent, setWastePercent] = useState(10);
  const [truckCapacityYards, setTruckCapacityYards] = useState(10);
  const [minimumDeliveryYards, setMinimumDeliveryYards] = useState(3);
  const [roundToNearestYard, setRoundToNearestYard] = useState(0.25);

  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [deliveryFeePerTruck, setDeliveryFeePerTruck] = useState(150);
  const [shortLoadFee, setShortLoadFee] = useState(125);
  const [fuelSurcharge, setFuelSurcharge] = useState(0);
  const [environmentalFee, setEnvironmentalFee] = useState(0);
  const [waitingTimeFee, setWaitingTimeFee] = useState(0);

  const [concreteWeightPerYard, setConcreteWeightPerYard] = useState(4050);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const baseYards =
      inputMode === "Known cubic yards"
        ? knownYards
        : (length * width * (thicknessInches / 12)) / 27;

    const yardsWithWaste = baseYards * (1 + wastePercent / 100);

    const roundedOrderYards =
      roundToNearestYard > 0
        ? Math.ceil(yardsWithWaste / roundToNearestYard) * roundToNearestYard
        : yardsWithWaste;

    const orderYards = Math.max(roundedOrderYards, 0);

    const truckloads =
      truckCapacityYards > 0 ? Math.ceil(orderYards / truckCapacityYards) : 0;

    const isShortLoad =
      orderYards > 0 && orderYards < minimumDeliveryYards;

    const concreteMaterialCost = orderYards * concretePricePerYard;
    const deliveryCost = truckloads * deliveryFeePerTruck;
    const shortLoadCost = isShortLoad ? shortLoadFee : 0;

    const totalCost =
      concreteMaterialCost +
      deliveryCost +
      shortLoadCost +
      fuelSurcharge +
      environmentalFee +
      waitingTimeFee;

    const costPerYard = orderYards > 0 ? totalCost / orderYards : 0;
    const totalWeight = orderYards * concreteWeightPerYard;

    const unusedTruckCapacity =
      truckloads > 0 ? truckloads * truckCapacityYards - orderYards : 0;

    return {
      baseYards,
      yardsWithWaste,
      orderYards,
      truckloads,
      isShortLoad,
      concreteMaterialCost,
      deliveryCost,
      shortLoadCost,
      totalCost,
      costPerYard,
      totalWeight,
      unusedTruckCapacity,
    };
  }, [
    inputMode,
    knownYards,
    length,
    width,
    thicknessInches,
    wastePercent,
    truckCapacityYards,
    minimumDeliveryYards,
    roundToNearestYard,
    concretePricePerYard,
    deliveryFeePerTruck,
    shortLoadFee,
    fuelSurcharge,
    environmentalFee,
    waitingTimeFee,
    concreteWeightPerYard,
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

  function applyPreset(type: ProjectType) {
    setProjectType(type);
    setInputMode("Calculate from dimensions");

    if (type === "Slab / pad") {
      setLength(20);
      setWidth(20);
      setThicknessInches(4);
      setWastePercent(10);
    }

    if (type === "Driveway") {
      setLength(40);
      setWidth(16);
      setThicknessInches(5);
      setWastePercent(10);
    }

    if (type === "Patio") {
      setLength(20);
      setWidth(15);
      setThicknessInches(4);
      setWastePercent(10);
    }

    if (type === "Sidewalk") {
      setLength(40);
      setWidth(4);
      setThicknessInches(4);
      setWastePercent(10);
    }

    if (type === "Footing") {
      setLength(80);
      setWidth(1.5);
      setThicknessInches(12);
      setWastePercent(10);
    }
  }

  async function copyResults() {
    const text = `Concrete Truckload Estimate
Input mode: ${inputMode}
Project type: ${projectType}
Base concrete: ${formatNumber(results.baseYards)} yd³
Yards with waste: ${formatNumber(results.yardsWithWaste)} yd³
Rounded order: ${formatNumber(results.orderYards)} yd³
Truck capacity: ${truckCapacityYards} yd³
Estimated truckloads: ${results.truckloads}
Short load: ${results.isShortLoad ? "Yes" : "No"}
Concrete material cost: ${formatCurrency(results.concreteMaterialCost)}
Delivery cost: ${formatCurrency(results.deliveryCost)}
Short-load fee: ${formatCurrency(results.shortLoadCost)}
Fuel surcharge: ${formatCurrency(fuelSurcharge)}
Environmental fee: ${formatCurrency(environmentalFee)}
Waiting time fee: ${formatCurrency(waitingTimeFee)}
Estimated total: ${formatCurrency(results.totalCost)}
Cost per ordered yard: ${formatCurrency(results.costPerYard)}
Estimated concrete weight: ${formatNumber(results.totalWeight, 0)} lb`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete truckloads
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter known cubic yards or calculate yards from dimensions. Estimate order
          quantity, ready-mix truckloads, delivery fees, short-load fees, weight,
          and total delivery cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {(["Slab / pad", "Driveway", "Patio", "Sidewalk", "Footing"] as ProjectType[]).map(
            (preset) => (
              <PresetButton
                key={preset}
                label={preset}
                active={projectType === preset && inputMode === "Calculate from dimensions"}
                onClick={() => applyPreset(preset)}
              />
            ),
          )}
        </div>

        <div className="mt-6 grid gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Input mode</span>
            <select
              value={inputMode}
              onChange={(event) => setInputMode(event.target.value as InputMode)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Known cubic yards</option>
              <option>Calculate from dimensions</option>
            </select>
          </label>

          {inputMode === "Known cubic yards" ? (
            <NumberInput
              label="Known concrete quantity"
              suffix="yd³"
              value={knownYards}
              setValue={setKnownYards}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <NumberInput label="Length" suffix="ft" value={length} setValue={setLength} />
              <NumberInput label="Width" suffix="ft" value={width} setValue={setWidth} />
              <NumberInput
                label="Thickness"
                suffix="in"
                value={thicknessInches}
                setValue={setThicknessInches}
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />
            <NumberInput label="Truck capacity" suffix="yd³" value={truckCapacityYards} setValue={setTruckCapacityYards} />
            <NumberInput label="Minimum delivery" suffix="yd³" value={minimumDeliveryYards} setValue={setMinimumDeliveryYards} />
            <NumberInput label="Round order to nearest" suffix="yd³" value={roundToNearestYard} setValue={setRoundToNearestYard} />

            <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
            <NumberInput label="Delivery fee" suffix="$/truck" value={deliveryFeePerTruck} setValue={setDeliveryFeePerTruck} />
            <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />
            <NumberInput label="Fuel surcharge" suffix="$" value={fuelSurcharge} setValue={setFuelSurcharge} />
            <NumberInput label="Environmental fee" suffix="$" value={environmentalFee} setValue={setEnvironmentalFee} />
            <NumberInput label="Waiting time fee" suffix="$" value={waitingTimeFee} setValue={setWaitingTimeFee} />
            <NumberInput label="Concrete weight" suffix="lb/yd³" value={concreteWeightPerYard} setValue={setConcreteWeightPerYard} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Truckload estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatCurrency(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {results.truckloads} truckload{results.truckloads === 1 ? "" : "s"} estimated.
          </p>
        </div>

        {results.isShortLoad && (
          <div className="mt-4 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-4">
            <p className="text-sm font-semibold text-[#F97316]">Short-load warning</p>
            <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
              This order is below the minimum delivery quantity you entered. A short-load
              fee has been added to the estimate.
            </p>
          </div>
        )}

        <div className="mt-5 space-y-3">
          <ResultRow label="Base concrete" value={`${formatNumber(results.baseYards)} yd³`} />
          <ResultRow label="Yards with waste" value={`${formatNumber(results.yardsWithWaste)} yd³`} />
          <ResultRow label="Rounded order" value={`${formatNumber(results.orderYards)} yd³`} />
          <ResultRow label="Truck capacity" value={`${formatNumber(truckCapacityYards)} yd³`} />
          <ResultRow label="Truckloads" value={`${results.truckloads}`} />
          <ResultRow label="Unused truck capacity" value={`${formatNumber(results.unusedTruckCapacity)} yd³`} />
          <ResultRow label="Estimated concrete weight" value={`${formatNumber(results.totalWeight, 0)} lb`} />
          <ResultRow label="Concrete material" value={formatCurrency(results.concreteMaterialCost)} />
          <ResultRow label="Delivery" value={formatCurrency(results.deliveryCost)} />
          <ResultRow label="Short-load fee" value={formatCurrency(results.shortLoadCost)} />
          <ResultRow label="Other fees" value={formatCurrency(fuelSurcharge + environmentalFee + waitingTimeFee)} />
          <ResultRow label="Cost per ordered yard" value={formatCurrency(results.costPerYard)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This is a planning estimate. Final supplier pricing depends on mix design,
          market, truck capacity, minimum order, short-load policies, fuel surcharge,
          delivery zone, waiting time, and local fees.
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

function PresetButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active
          ? "border-[#F97316] bg-[#F97316] text-white"
          : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
      }`}
    >
      {label}
    </button>
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
