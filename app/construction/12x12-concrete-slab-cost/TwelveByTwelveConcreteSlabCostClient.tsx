"use client";

import { useMemo, useState } from "react";

type SlabUse =
  | "Shed pad"
  | "Small patio"
  | "Utility pad"
  | "Hot tub pad"
  | "Workshop pad"
  | "Custom";

const slabUseDefaults: Record<
  SlabUse,
  {
    thickness: number;
    baseDepth: number;
    reinforcementCost: number;
    formCost: number;
    laborCostPerSquareFoot: number;
    note: string;
  }
> = {
  "Shed pad": {
    thickness: 4,
    baseDepth: 4,
    reinforcementCost: 175,
    formCost: 120,
    laborCostPerSquareFoot: 6,
    note: "A 12x12 shed pad is commonly estimated at 4 inches thick for light storage use with proper base preparation.",
  },
  "Small patio": {
    thickness: 4,
    baseDepth: 4,
    reinforcementCost: 150,
    formCost: 120,
    laborCostPerSquareFoot: 7,
    note: "A 12x12 patio has more area than a 10x10 slab, but delivery and setup fees can still affect cost per square foot.",
  },
  "Utility pad": {
    thickness: 4,
    baseDepth: 4,
    reinforcementCost: 175,
    formCost: 120,
    laborCostPerSquareFoot: 6,
    note: "Utility pads may need clean edges, drainage planning, anchor locations, and stable base support.",
  },
  "Hot tub pad": {
    thickness: 6,
    baseDepth: 6,
    reinforcementCost: 325,
    formCost: 135,
    laborCostPerSquareFoot: 8,
    note: "Hot tub pads often need thicker concrete, stronger reinforcement, and careful base preparation because water loads are heavy.",
  },
  "Workshop pad": {
    thickness: 5,
    baseDepth: 5,
    reinforcementCost: 250,
    formCost: 130,
    laborCostPerSquareFoot: 7,
    note: "Workshop pads may need added thickness and reinforcement depending on tools, storage loads, equipment, and soil conditions.",
  },
  Custom: {
    thickness: 4,
    baseDepth: 4,
    reinforcementCost: 175,
    formCost: 120,
    laborCostPerSquareFoot: 6,
    note: "Custom settings let you adjust thickness, base depth, reinforcement, forms, labor, and supplier fees.",
  },
};

export default function TwelveByTwelveConcreteSlabCostClient() {
  const slabLength = 12;
  const slabWidth = 12;
  const slabArea = slabLength * slabWidth;

  const [slabUse, setSlabUse] = useState<SlabUse>("Shed pad");
  const [thicknessInches, setThicknessInches] = useState(4);
  const [baseDepthInches, setBaseDepthInches] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);
  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [deliveryFee, setDeliveryFee] = useState(150);
  const [shortLoadFee, setShortLoadFee] = useState(100);
  const [basePricePerTon, setBasePricePerTon] = useState(45);
  const [baseTonsPerCubicYard, setBaseTonsPerCubicYard] = useState(1.45);
  const [reinforcementCost, setReinforcementCost] = useState(175);
  const [formCost, setFormCost] = useState(120);
  const [laborCostPerSquareFoot, setLaborCostPerSquareFoot] = useState(6);
  const [taxPercent, setTaxPercent] = useState(0);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: SlabUse) {
    setSlabUse(type);
    const preset = slabUseDefaults[type];

    setThicknessInches(preset.thickness);
    setBaseDepthInches(preset.baseDepth);
    setReinforcementCost(preset.reinforcementCost);
    setFormCost(preset.formCost);
    setLaborCostPerSquareFoot(preset.laborCostPerSquareFoot);
  }

  const results = useMemo(() => {
    const concreteCubicFeet = slabArea * (thicknessInches / 12);
    const concreteYards = concreteCubicFeet / 27;
    const concreteYardsWithWaste = concreteYards * (1 + wastePercent / 100);
    const concreteMaterialCost = concreteYardsWithWaste * concretePricePerYard;

    const baseCubicFeet = slabArea * (baseDepthInches / 12);
    const baseCubicYards = baseCubicFeet / 27;
    const baseTons = baseCubicYards * baseTonsPerCubicYard;
    const baseCost = baseTons * basePricePerTon;

    const laborCost = slabArea * laborCostPerSquareFoot;
    const subtotal =
      concreteMaterialCost +
      deliveryFee +
      shortLoadFee +
      baseCost +
      reinforcementCost +
      formCost +
      laborCost;

    const taxAmount = subtotal * (taxPercent / 100);
    const totalCost = subtotal + taxAmount;
    const costPerSquareFoot = totalCost / slabArea;
    const deliveredConcreteCostPerYard =
      concreteYardsWithWaste > 0
        ? (concreteMaterialCost + deliveryFee + shortLoadFee) / concreteYardsWithWaste
        : 0;
    const concreteWeight = concreteYardsWithWaste * 4050;

    return {
      concreteCubicFeet,
      concreteYards,
      concreteYardsWithWaste,
      concreteMaterialCost,
      baseCubicYards,
      baseTons,
      baseCost,
      laborCost,
      subtotal,
      taxAmount,
      totalCost,
      costPerSquareFoot,
      deliveredConcreteCostPerYard,
      concreteWeight,
    };
  }, [
    slabArea,
    thicknessInches,
    baseDepthInches,
    wastePercent,
    concretePricePerYard,
    deliveryFee,
    shortLoadFee,
    basePricePerTon,
    baseTonsPerCubicYard,
    reinforcementCost,
    formCost,
    laborCostPerSquareFoot,
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
    const text = `12x12 Concrete Slab Cost Estimate
Slab size: 12 ft x 12 ft
Area: ${slabArea} sq ft
Use: ${slabUse}
Thickness: ${thicknessInches} in
Base depth: ${baseDepthInches} in
Concrete yards: ${formatNumber(results.concreteYards)} yd³
Concrete yards with waste: ${formatNumber(results.concreteYardsWithWaste)} yd³
Concrete material cost: ${formatCurrency(results.concreteMaterialCost)}
Delivery fee: ${formatCurrency(deliveryFee)}
Short-load fee: ${formatCurrency(shortLoadFee)}
Base material: ${formatNumber(results.baseTons)} tons / ${formatCurrency(results.baseCost)}
Reinforcement: ${formatCurrency(reinforcementCost)}
Forms: ${formatCurrency(formCost)}
Labor: ${formatCurrency(results.laborCost)}
Tax: ${formatCurrency(results.taxAmount)}
Total estimated cost: ${formatCurrency(results.totalCost)}
Cost per square foot: ${formatCurrency(results.costPerSquareFoot)}
Delivered concrete cost per yard: ${formatCurrency(results.deliveredConcreteCostPerYard)}
Estimated concrete weight: ${formatNumber(results.concreteWeight, 0)} lb`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const currentNote = slabUseDefaults[slabUse].note;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate 12x12 slab cost
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          This calculator keeps the slab size fixed at 12 ft by 12 ft and lets you
          adjust thickness, base depth, ready-mix pricing, delivery fees, reinforcement,
          forms, labor, and tax.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              "Shed pad",
              "Small patio",
              "Utility pad",
              "Hot tub pad",
              "Workshop pad",
              "Custom",
            ] as SlabUse[]
          ).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => applyPreset(type)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                slabUse === type
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <LockedInput label="Slab length" value="12 ft" />
          <LockedInput label="Slab width" value="12 ft" />
          <NumberInput label="Concrete thickness" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
          <NumberInput label="Base depth" suffix="in" value={baseDepthInches} setValue={setBaseDepthInches} />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
          <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
          <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />
          <NumberInput label="Base price" suffix="$/ton" value={basePricePerTon} setValue={setBasePricePerTon} />
          <NumberInput label="Base density" suffix="tons/yd³" value={baseTonsPerCubicYard} setValue={setBaseTonsPerCubicYard} />
          <NumberInput label="Reinforcement cost" suffix="$" value={reinforcementCost} setValue={setReinforcementCost} />
          <NumberInput label="Form cost" suffix="$" value={formCost} setValue={setFormCost} />
          <NumberInput label="Labor rate" suffix="$/sq ft" value={laborCostPerSquareFoot} setValue={setLaborCostPerSquareFoot} />
          <NumberInput label="Tax rate" suffix="%" value={taxPercent} setValue={setTaxPercent} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Planning note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{currentNote}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">12x12 slab estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Total estimated cost</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatCurrency(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatCurrency(results.costPerSquareFoot)} per sq ft.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Slab area" value={`${slabArea} sq ft`} />
          <ResultRow label="Concrete yards" value={`${formatNumber(results.concreteYards)} yd³`} />
          <ResultRow label="Yards with waste" value={`${formatNumber(results.concreteYardsWithWaste)} yd³`} />
          <ResultRow label="Concrete material" value={formatCurrency(results.concreteMaterialCost)} />
          <ResultRow label="Delivery fee" value={formatCurrency(deliveryFee)} />
          <ResultRow label="Short-load fee" value={formatCurrency(shortLoadFee)} />
          <ResultRow label="Base material" value={`${formatNumber(results.baseTons)} tons`} />
          <ResultRow label="Base cost" value={formatCurrency(results.baseCost)} />
          <ResultRow label="Reinforcement" value={formatCurrency(reinforcementCost)} />
          <ResultRow label="Forms" value={formatCurrency(formCost)} />
          <ResultRow label="Labor" value={formatCurrency(results.laborCost)} />
          <ResultRow label="Tax" value={formatCurrency(results.taxAmount)} />
          <ResultRow label="Delivered concrete cost per yard" value={formatCurrency(results.deliveredConcreteCostPerYard)} />
          <ResultRow label="Estimated concrete weight" value={`${formatNumber(results.concreteWeight, 0)} lb`} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator is for estimating only. Actual project cost depends on
          site prep, excavation, access, forms, reinforcement, labor, finishing,
          local ready-mix prices, permits, and contractor requirements.
        </p>
      </div>
    </div>
  );
}

function LockedInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-white">{label}</span>
      <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-[#A0AEC0]">
        {value}
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
