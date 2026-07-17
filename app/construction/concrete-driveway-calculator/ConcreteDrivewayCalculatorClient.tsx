"use client";

import { useMemo, useState } from "react";

type ReinforcementType = "None" | "Wire mesh" | "Rebar grid" | "Fiber reinforcement";

export default function ConcreteDrivewayCalculatorClient() {
  const [length, setLength] = useState(40);
  const [width, setWidth] = useState(16);
  const [thicknessInches, setThicknessInches] = useState(5);
  const [wastePercent, setWastePercent] = useState(10);

  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [deliveryFee, setDeliveryFee] = useState(150);
  const [shortLoadFee, setShortLoadFee] = useState(0);

  const [baseDepthInches, setBaseDepthInches] = useState(4);
  const [baseTonsPerCubicYard, setBaseTonsPerCubicYard] = useState(1.4);
  const [basePricePerTon, setBasePricePerTon] = useState(45);

  const [reinforcementType, setReinforcementType] =
    useState<ReinforcementType>("Rebar grid");
  const [reinforcementCostPerSqFt, setReinforcementCostPerSqFt] = useState(1.25);

  const [laborCostPerSqFt, setLaborCostPerSqFt] = useState(7);
  const [prepCostPerSqFt, setPrepCostPerSqFt] = useState(2.5);
  const [finishCostPerSqFt, setFinishCostPerSqFt] = useState(1.5);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const area = length * width;

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

    const reinforcementCost =
      reinforcementType === "None" ? 0 : area * reinforcementCostPerSqFt;

    const prepCost = area * prepCostPerSqFt;
    const laborCost = area * laborCostPerSqFt;
    const finishCost = area * finishCostPerSqFt;

    const totalCost =
      concreteMaterialCost +
      deliveryFee +
      shortLoadFee +
      baseCost +
      reinforcementCost +
      prepCost +
      laborCost +
      finishCost;

    const costPerSqFt = area > 0 ? totalCost / area : 0;

    return {
      area,
      concreteCubicFeet,
      concreteCubicYards,
      concreteCubicYardsWithWaste,
      concreteMaterialCost,
      baseCubicFeet,
      baseCubicYards,
      baseTons,
      baseCost,
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
    reinforcementType,
    reinforcementCostPerSqFt,
    laborCostPerSqFt,
    prepCostPerSqFt,
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

  function applyPreset(type: "Single car" | "Two car" | "Long driveway") {
    if (type === "Single car") {
      setLength(30);
      setWidth(12);
      setThicknessInches(4);
      setBaseDepthInches(4);
    }

    if (type === "Two car") {
      setLength(40);
      setWidth(20);
      setThicknessInches(5);
      setBaseDepthInches(4);
    }

    if (type === "Long driveway") {
      setLength(80);
      setWidth(12);
      setThicknessInches(5);
      setBaseDepthInches(6);
    }
  }

  async function copyResults() {
    const text = `Concrete Driveway Estimate
Length: ${length} ft
Width: ${width} ft
Area: ${formatNumber(results.area)} sq ft
Thickness: ${thicknessInches} in
Concrete yards with waste: ${formatNumber(results.concreteCubicYardsWithWaste)} yd³
Concrete material cost: ${formatCurrency(results.concreteMaterialCost)}
Base depth: ${baseDepthInches} in
Base tons: ${formatNumber(results.baseTons)} tons
Base cost: ${formatCurrency(results.baseCost)}
Reinforcement: ${reinforcementType}
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
          Calculate concrete driveway cost
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter driveway dimensions, concrete thickness, base depth, reinforcement,
          labor, prep, finishing, delivery, and waste to estimate total project cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <PresetButton label="Single car" onClick={() => applyPreset("Single car")} />
          <PresetButton label="Two car" onClick={() => applyPreset("Two car")} />
          <PresetButton label="Long driveway" onClick={() => applyPreset("Long driveway")} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Driveway length" suffix="ft" value={length} setValue={setLength} />
          <NumberInput label="Driveway width" suffix="ft" value={width} setValue={setWidth} />
          <NumberInput label="Concrete thickness" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
          <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />

          <NumberInput
            label="Concrete price"
            suffix="$/yd³"
            value={concretePricePerYard}
            setValue={setConcretePricePerYard}
          />
          <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
          <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />

          <NumberInput label="Base depth" suffix="in" value={baseDepthInches} setValue={setBaseDepthInches} />
          <NumberInput
            label="Base density"
            suffix="tons/yd³"
            value={baseTonsPerCubicYard}
            setValue={setBaseTonsPerCubicYard}
          />
          <NumberInput label="Base price" suffix="$/ton" value={basePricePerTon} setValue={setBasePricePerTon} />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Reinforcement</span>
            <select
              value={reinforcementType}
              onChange={(event) =>
                setReinforcementType(event.target.value as ReinforcementType)
              }
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>None</option>
              <option>Wire mesh</option>
              <option>Rebar grid</option>
              <option>Fiber reinforcement</option>
            </select>
          </label>

          {reinforcementType !== "None" && (
            <NumberInput
              label="Reinforcement cost"
              suffix="$/sq ft"
              value={reinforcementCostPerSqFt}
              setValue={setReinforcementCostPerSqFt}
            />
          )}

          <NumberInput label="Prep cost" suffix="$/sq ft" value={prepCostPerSqFt} setValue={setPrepCostPerSqFt} />
          <NumberInput label="Labor cost" suffix="$/sq ft" value={laborCostPerSqFt} setValue={setLaborCostPerSqFt} />
          <NumberInput label="Finish cost" suffix="$/sq ft" value={finishCostPerSqFt} setValue={setFinishCostPerSqFt} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Driveway estimate</h3>

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
          <ResultRow label="Driveway area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Concrete cubic yards" value={`${formatNumber(results.concreteCubicYards)} yd³`} />
          <ResultRow label="Concrete yards with waste" value={`${formatNumber(results.concreteCubicYardsWithWaste)} yd³`} />
          <ResultRow label="Concrete material" value={formatCurrency(results.concreteMaterialCost)} />
          <ResultRow label="Base cubic yards" value={`${formatNumber(results.baseCubicYards)} yd³`} />
          <ResultRow label="Base tons" value={`${formatNumber(results.baseTons)} tons`} />
          <ResultRow label="Base material" value={formatCurrency(results.baseCost)} />
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
          This is a planning estimate. Final driveway pricing depends on demolition,
          excavation, soil, drainage, grading, access, forms, reinforcement, finishing,
          labor market, and local material pricing.
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

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#F97316]"
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
