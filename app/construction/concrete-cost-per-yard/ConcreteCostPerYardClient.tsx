"use client";

import { useMemo, useState } from "react";

type ProjectType =
  | "Slab"
  | "Driveway"
  | "Patio"
  | "Sidewalk"
  | "Footing"
  | "Pad"
  | "Known yards"
  | "Custom";

const projectDefaults: Record<
  ProjectType,
  {
    length: number;
    width: number;
    thickness: number;
    yards: number;
    pricePerYard: number;
    deliveryFee: number;
    shortLoadFee: number;
    fuelFee: number;
    wastePercent: number;
    taxPercent: number;
    note: string;
  }
> = {
  Slab: {
    length: 20,
    width: 20,
    thickness: 4,
    yards: 0,
    pricePerYard: 160,
    deliveryFee: 150,
    shortLoadFee: 0,
    fuelFee: 35,
    wastePercent: 10,
    taxPercent: 0,
    note: "General slab estimate using length, width, thickness, waste, and delivered ready-mix pricing.",
  },
  Driveway: {
    length: 40,
    width: 16,
    thickness: 5,
    yards: 0,
    pricePerYard: 165,
    deliveryFee: 175,
    shortLoadFee: 0,
    fuelFee: 45,
    wastePercent: 10,
    taxPercent: 0,
    note: "Driveway concrete cost is sensitive to thickness, vehicle loading, delivery access, and finishing scope.",
  },
  Patio: {
    length: 20,
    width: 15,
    thickness: 4,
    yards: 0,
    pricePerYard: 160,
    deliveryFee: 150,
    shortLoadFee: 75,
    fuelFee: 35,
    wastePercent: 10,
    taxPercent: 0,
    note: "Patio orders can trigger short-load fees when the total yardage is below supplier minimums.",
  },
  Sidewalk: {
    length: 40,
    width: 4,
    thickness: 4,
    yards: 0,
    pricePerYard: 160,
    deliveryFee: 150,
    shortLoadFee: 125,
    fuelFee: 25,
    wastePercent: 10,
    taxPercent: 0,
    note: "Sidewalk projects may be small enough that minimum-load or short-load charges matter heavily.",
  },
  Footing: {
    length: 60,
    width: 2,
    thickness: 12,
    yards: 0,
    pricePerYard: 165,
    deliveryFee: 175,
    shortLoadFee: 0,
    fuelFee: 35,
    wastePercent: 10,
    taxPercent: 0,
    note: "Footing estimates should match plan dimensions and code or engineering requirements.",
  },
  Pad: {
    length: 12,
    width: 12,
    thickness: 4,
    yards: 0,
    pricePerYard: 160,
    deliveryFee: 150,
    shortLoadFee: 100,
    fuelFee: 25,
    wastePercent: 10,
    taxPercent: 0,
    note: "Pads vary by use. Hot tubs, equipment, sheds, and utility pads may need thicker concrete.",
  },
  "Known yards": {
    length: 0,
    width: 0,
    thickness: 0,
    yards: 5,
    pricePerYard: 160,
    deliveryFee: 150,
    shortLoadFee: 0,
    fuelFee: 35,
    wastePercent: 0,
    taxPercent: 0,
    note: "Use known yards when you already have a quantity from another Numeravo concrete calculator.",
  },
  Custom: {
    length: 20,
    width: 20,
    thickness: 4,
    yards: 0,
    pricePerYard: 160,
    deliveryFee: 150,
    shortLoadFee: 0,
    fuelFee: 35,
    wastePercent: 10,
    taxPercent: 0,
    note: "Custom estimate for local pricing, supplier quote comparison, or a non-standard concrete project.",
  },
};

export default function ConcreteCostPerYardClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Slab");
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(20);
  const [thicknessInches, setThicknessInches] = useState(4);
  const [knownYards, setKnownYards] = useState(5);
  const [pricePerYard, setPricePerYard] = useState(160);
  const [deliveryFee, setDeliveryFee] = useState(150);
  const [shortLoadFee, setShortLoadFee] = useState(0);
  const [fuelFee, setFuelFee] = useState(35);
  const [environmentalFee, setEnvironmentalFee] = useState(0);
  const [waitingTimeFee, setWaitingTimeFee] = useState(0);
  const [wastePercent, setWastePercent] = useState(10);
  const [taxPercent, setTaxPercent] = useState(0);
  const [copied, setCopied] = useState(false);

  function applyProject(type: ProjectType) {
    setProjectType(type);
    const preset = projectDefaults[type];

    setLength(preset.length);
    setWidth(preset.width);
    setThicknessInches(preset.thickness);
    setKnownYards(preset.yards || knownYards);
    setPricePerYard(preset.pricePerYard);
    setDeliveryFee(preset.deliveryFee);
    setShortLoadFee(preset.shortLoadFee);
    setFuelFee(preset.fuelFee);
    setWastePercent(preset.wastePercent);
    setTaxPercent(preset.taxPercent);
  }

  const results = useMemo(() => {
    const area = length * width;
    const calculatedYards = area * (thicknessInches / 12) / 27;
    const baseYards = projectType === "Known yards" ? knownYards : calculatedYards;
    const yardsWithWaste = baseYards * (1 + wastePercent / 100);

    const concreteMaterialCost = yardsWithWaste * pricePerYard;
    const subtotal =
      concreteMaterialCost +
      deliveryFee +
      shortLoadFee +
      fuelFee +
      environmentalFee +
      waitingTimeFee;
    const taxAmount = subtotal * (taxPercent / 100);
    const totalCost = subtotal + taxAmount;

    const deliveredCostPerYard = yardsWithWaste > 0 ? totalCost / yardsWithWaste : 0;
    const materialOnlyCostPerYard = yardsWithWaste > 0 ? concreteMaterialCost / yardsWithWaste : 0;
    const costPerSquareFoot = area > 0 ? totalCost / area : 0;
    const concreteWeight = yardsWithWaste * 4050;

    return {
      area,
      calculatedYards,
      baseYards,
      yardsWithWaste,
      concreteMaterialCost,
      subtotal,
      taxAmount,
      totalCost,
      deliveredCostPerYard,
      materialOnlyCostPerYard,
      costPerSquareFoot,
      concreteWeight,
    };
  }, [
    length,
    width,
    thicknessInches,
    knownYards,
    projectType,
    wastePercent,
    pricePerYard,
    deliveryFee,
    shortLoadFee,
    fuelFee,
    environmentalFee,
    waitingTimeFee,
    taxPercent,
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

  async function copyResults() {
    const text = `Concrete Cost Per Yard Estimate
Project type: ${projectType}
Area: ${formatNumber(results.area)} sq ft
Thickness: ${thicknessInches} in
Base yards: ${formatNumber(results.baseYards)} yd³
Yards with waste: ${formatNumber(results.yardsWithWaste)} yd³
Concrete price per yard: ${formatCurrency(pricePerYard)}
Concrete material cost: ${formatCurrency(results.concreteMaterialCost)}
Delivery fee: ${formatCurrency(deliveryFee)}
Short-load fee: ${formatCurrency(shortLoadFee)}
Fuel fee: ${formatCurrency(fuelFee)}
Environmental fee: ${formatCurrency(environmentalFee)}
Waiting time fee: ${formatCurrency(waitingTimeFee)}
Tax: ${formatCurrency(results.taxAmount)}
Total delivered cost: ${formatCurrency(results.totalCost)}
Delivered cost per yard: ${formatCurrency(results.deliveredCostPerYard)}
Cost per square foot: ${formatCurrency(results.costPerSquareFoot)}
Estimated concrete weight: ${formatNumber(results.concreteWeight, 0)} lb`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const currentNote = projectDefaults[projectType].note;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete cost per yard
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter your project size or known yardage, then add supplier pricing,
          delivery fees, short-load charges, fuel fees, waste, and tax.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              "Slab",
              "Driveway",
              "Patio",
              "Sidewalk",
              "Footing",
              "Pad",
              "Known yards",
              "Custom",
            ] as ProjectType[]
          ).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => applyProject(type)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                projectType === type
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projectType === "Known yards" ? (
            <NumberInput
              label="Known concrete amount"
              suffix="yd³"
              value={knownYards}
              setValue={setKnownYards}
            />
          ) : (
            <>
              <NumberInput label="Length" suffix="ft" value={length} setValue={setLength} />
              <NumberInput label="Width" suffix="ft" value={width} setValue={setWidth} />
              <NumberInput
                label="Thickness"
                suffix="in"
                value={thicknessInches}
                setValue={setThicknessInches}
              />
            </>
          )}

          <NumberInput
            label="Concrete price"
            suffix="$/yd³"
            value={pricePerYard}
            setValue={setPricePerYard}
          />
          <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
          <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />
          <NumberInput label="Fuel fee" suffix="$" value={fuelFee} setValue={setFuelFee} />
          <NumberInput
            label="Environmental fee"
            suffix="$"
            value={environmentalFee}
            setValue={setEnvironmentalFee}
          />
          <NumberInput
            label="Waiting time fee"
            suffix="$"
            value={waitingTimeFee}
            setValue={setWaitingTimeFee}
          />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Tax rate" suffix="%" value={taxPercent} setValue={setTaxPercent} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Pricing note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{currentNote}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Concrete price estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Total delivered cost</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatCurrency(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatCurrency(results.deliveredCostPerYard)} delivered per yd³.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Project area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Base concrete" value={`${formatNumber(results.baseYards)} yd³`} />
          <ResultRow label="Yards with waste" value={`${formatNumber(results.yardsWithWaste)} yd³`} />
          <ResultRow label="Concrete material cost" value={formatCurrency(results.concreteMaterialCost)} />
          <ResultRow label="Delivery fee" value={formatCurrency(deliveryFee)} />
          <ResultRow label="Short-load fee" value={formatCurrency(shortLoadFee)} />
          <ResultRow label="Fuel fee" value={formatCurrency(fuelFee)} />
          <ResultRow label="Environmental fee" value={formatCurrency(environmentalFee)} />
          <ResultRow label="Waiting time fee" value={formatCurrency(waitingTimeFee)} />
          <ResultRow label="Tax" value={formatCurrency(results.taxAmount)} />
          <ResultRow label="Delivered cost per yard" value={formatCurrency(results.deliveredCostPerYard)} />
          <ResultRow label="Cost per square foot" value={formatCurrency(results.costPerSquareFoot)} />
          <ResultRow label="Estimated concrete weight" value={`${formatNumber(results.concreteWeight, 0)} lb`} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator is for estimating only. Confirm actual concrete price,
          minimum delivery size, short-load fees, taxes, and included charges with
          your local ready-mix supplier.
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
