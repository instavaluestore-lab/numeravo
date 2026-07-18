"use client";

import { useMemo, useState } from "react";

type PadUse = "General pad" | "Shed pad" | "AC pad" | "Generator pad" | "Hot tub pad" | "Equipment pad";

export default function ConcretePadCalculatorClient() {
  const [padUse, setPadUse] = useState<PadUse>("General pad");

  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [thicknessInches, setThicknessInches] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);

  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [deliveryFee, setDeliveryFee] = useState(100);
  const [shortLoadFee, setShortLoadFee] = useState(0);

  const [baseDepthInches, setBaseDepthInches] = useState(4);
  const [baseTonsPerCubicYard, setBaseTonsPerCubicYard] = useState(1.4);
  const [basePricePerTon, setBasePricePerTon] = useState(45);

  const [formCostPerLinearFoot, setFormCostPerLinearFoot] = useState(1.5);
  const [reinforcementCostPerSqFt, setReinforcementCostPerSqFt] = useState(0.85);
  const [prepCostPerSqFt, setPrepCostPerSqFt] = useState(2);
  const [laborCostPerSqFt, setLaborCostPerSqFt] = useState(6);
  const [finishCostPerSqFt, setFinishCostPerSqFt] = useState(1.25);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const area = length * width;
    const perimeter = 2 * (length + width);

    const concreteCubicFeet = area * (thicknessInches / 12);
    const concreteCubicYards = concreteCubicFeet / 27;
    const concreteCubicYardsWithWaste =
      concreteCubicYards * (1 + wastePercent / 100);

    const concreteMaterialCost =
      concreteCubicYardsWithWaste * concretePricePerYard;

    const baseCubicFeet = area * (baseDepthInches / 12);
    const baseCubicYards = baseCubicFeet / 27;
    const baseTons = baseCubicYards * baseTonsPerCubicYard;
    const baseCost = baseTons * basePricePerTon;

    const formCost = perimeter * formCostPerLinearFoot;
    const reinforcementCost = area * reinforcementCostPerSqFt;
    const prepCost = area * prepCostPerSqFt;
    const laborCost = area * laborCostPerSqFt;
    const finishCost = area * finishCostPerSqFt;

    const totalCost =
      concreteMaterialCost +
      deliveryFee +
      shortLoadFee +
      baseCost +
      formCost +
      reinforcementCost +
      prepCost +
      laborCost +
      finishCost;

    const costPerSqFt = area > 0 ? totalCost / area : 0;

    return {
      area,
      perimeter,
      concreteCubicFeet,
      concreteCubicYards,
      concreteCubicYardsWithWaste,
      concreteMaterialCost,
      baseCubicYards,
      baseTons,
      baseCost,
      formCost,
      reinforcementCost,
      prepCost,
      laborCost,
      finishCost,
      totalCost,
      costPerSqFt,
    };
  }, [
    length,
    width,
    thicknessInches,
    wastePercent,
    concretePricePerYard,
    deliveryFee,
    shortLoadFee,
    baseDepthInches,
    baseTonsPerCubicYard,
    basePricePerTon,
    formCostPerLinearFoot,
    reinforcementCostPerSqFt,
    prepCostPerSqFt,
    laborCostPerSqFt,
    finishCostPerSqFt,
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

  function applyPreset(nextUse: PadUse) {
    setPadUse(nextUse);

    if (nextUse === "General pad") {
      setLength(10);
      setWidth(10);
      setThicknessInches(4);
      setBaseDepthInches(4);
    }

    if (nextUse === "Shed pad") {
      setLength(12);
      setWidth(16);
      setThicknessInches(4);
      setBaseDepthInches(4);
    }

    if (nextUse === "AC pad") {
      setLength(4);
      setWidth(4);
      setThicknessInches(4);
      setBaseDepthInches(3);
    }

    if (nextUse === "Generator pad") {
      setLength(5);
      setWidth(4);
      setThicknessInches(4);
      setBaseDepthInches(4);
    }

    if (nextUse === "Hot tub pad") {
      setLength(8);
      setWidth(8);
      setThicknessInches(6);
      setBaseDepthInches(6);
    }

    if (nextUse === "Equipment pad") {
      setLength(8);
      setWidth(10);
      setThicknessInches(6);
      setBaseDepthInches(6);
    }
  }

  async function copyResults() {
    const text = `Concrete Pad Estimate
Use: ${padUse}
Length: ${length} ft
Width: ${width} ft
Area: ${formatNumber(results.area)} sq ft
Perimeter/forms: ${formatNumber(results.perimeter)} linear ft
Thickness: ${thicknessInches} in
Concrete yards with waste: ${formatNumber(results.concreteCubicYardsWithWaste)} yd³
Concrete material cost: ${formatCurrency(results.concreteMaterialCost)}
Base depth: ${baseDepthInches} in
Base tons: ${formatNumber(results.baseTons)} tons
Base cost: ${formatCurrency(results.baseCost)}
Form cost: ${formatCurrency(results.formCost)}
Reinforcement cost: ${formatCurrency(results.reinforcementCost)}
Prep cost: ${formatCurrency(results.prepCost)}
Labor cost: ${formatCurrency(results.laborCost)}
Finish cost: ${formatCurrency(results.finishCost)}
Delivery: ${formatCurrency(deliveryFee)}
Short-load fee: ${formatCurrency(shortLoadFee)}
Estimated total: ${formatCurrency(results.totalCost)}
Cost per square foot: ${formatCurrency(results.costPerSqFt)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete pad cost
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter pad dimensions, thickness, base depth, forms, reinforcement, labor,
          finishing, delivery, and waste to estimate total concrete pad cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(["General pad", "Shed pad", "AC pad", "Generator pad", "Hot tub pad", "Equipment pad"] as PadUse[]).map(
            (preset) => (
              <PresetButton
                key={preset}
                label={preset}
                active={padUse === preset}
                onClick={() => applyPreset(preset)}
              />
            ),
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Pad length" suffix="ft" value={length} setValue={setLength} />
          <NumberInput label="Pad width" suffix="ft" value={width} setValue={setWidth} />
          <NumberInput label="Concrete thickness" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
          <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />

          <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
          <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
          <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />

          <NumberInput label="Base depth" suffix="in" value={baseDepthInches} setValue={setBaseDepthInches} />
          <NumberInput label="Base density" suffix="tons/yd³" value={baseTonsPerCubicYard} setValue={setBaseTonsPerCubicYard} />
          <NumberInput label="Base price" suffix="$/ton" value={basePricePerTon} setValue={setBasePricePerTon} />

          <NumberInput label="Form board allowance" suffix="$/linear ft" value={formCostPerLinearFoot} setValue={setFormCostPerLinearFoot} />
          <NumberInput label="Reinforcement allowance" suffix="$/sq ft" value={reinforcementCostPerSqFt} setValue={setReinforcementCostPerSqFt} />
          <NumberInput label="Prep cost" suffix="$/sq ft" value={prepCostPerSqFt} setValue={setPrepCostPerSqFt} />
          <NumberInput label="Labor cost" suffix="$/sq ft" value={laborCostPerSqFt} setValue={setLaborCostPerSqFt} />
          <NumberInput label="Finish cost" suffix="$/sq ft" value={finishCostPerSqFt} setValue={setFinishCostPerSqFt} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Pad estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatCurrency(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            About {formatCurrency(results.costPerSqFt)} per square foot.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Pad use" value={padUse} />
          <ResultRow label="Pad area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Perimeter / forms" value={`${formatNumber(results.perimeter)} linear ft`} />
          <ResultRow label="Concrete cubic yards" value={`${formatNumber(results.concreteCubicYards)} yd³`} />
          <ResultRow label="Concrete yards with waste" value={`${formatNumber(results.concreteCubicYardsWithWaste)} yd³`} />
          <ResultRow label="Concrete material" value={formatCurrency(results.concreteMaterialCost)} />
          <ResultRow label="Base cubic yards" value={`${formatNumber(results.baseCubicYards)} yd³`} />
          <ResultRow label="Base tons" value={`${formatNumber(results.baseTons)} tons`} />
          <ResultRow label="Base material" value={formatCurrency(results.baseCost)} />
          <ResultRow label="Forms" value={formatCurrency(results.formCost)} />
          <ResultRow label="Reinforcement" value={formatCurrency(results.reinforcementCost)} />
          <ResultRow label="Prep" value={formatCurrency(results.prepCost)} />
          <ResultRow label="Labor" value={formatCurrency(results.laborCost)} />
          <ResultRow label="Finish" value={formatCurrency(results.finishCost)} />
          <ResultRow label="Delivery + fees" value={formatCurrency(deliveryFee + shortLoadFee)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This is a planning estimate. Final pad pricing depends on demolition,
          excavation, soil, drainage, access, reinforcement, forms, finish quality,
          equipment load, local labor, material pricing, and code requirements.
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
