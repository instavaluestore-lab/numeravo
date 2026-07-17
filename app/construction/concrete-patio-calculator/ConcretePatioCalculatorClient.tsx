"use client";

import { useMemo, useState } from "react";

type PatioShape = "Rectangle" | "Circle" | "L-shape";
type FinishType = "Broom finish" | "Smooth finish" | "Stamped concrete" | "Stained concrete";

export default function ConcretePatioCalculatorClient() {
  const [shape, setShape] = useState<PatioShape>("Rectangle");

  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(15);

  const [circleDiameter, setCircleDiameter] = useState(16);

  const [sectionALength, setSectionALength] = useState(20);
  const [sectionAWidth, setSectionAWidth] = useState(12);
  const [sectionBLength, setSectionBLength] = useState(10);
  const [sectionBWidth, setSectionBWidth] = useState(8);

  const [thicknessInches, setThicknessInches] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);

  const [concretePricePerYard, setConcretePricePerYard] = useState(160);
  const [deliveryFee, setDeliveryFee] = useState(125);
  const [shortLoadFee, setShortLoadFee] = useState(0);

  const [baseDepthInches, setBaseDepthInches] = useState(4);
  const [baseTonsPerCubicYard, setBaseTonsPerCubicYard] = useState(1.4);
  const [basePricePerTon, setBasePricePerTon] = useState(45);

  const [reinforcementCostPerSqFt, setReinforcementCostPerSqFt] = useState(0.85);
  const [prepCostPerSqFt, setPrepCostPerSqFt] = useState(2.25);
  const [laborCostPerSqFt, setLaborCostPerSqFt] = useState(6);
  const [finishType, setFinishType] = useState<FinishType>("Broom finish");
  const [finishCostPerSqFt, setFinishCostPerSqFt] = useState(1.25);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    let area = 0;
    let perimeter = 0;

    if (shape === "Rectangle") {
      area = length * width;
      perimeter = 2 * (length + width);
    }

    if (shape === "Circle") {
      const radius = circleDiameter / 2;
      area = Math.PI * radius * radius;
      perimeter = Math.PI * circleDiameter;
    }

    if (shape === "L-shape") {
      area = sectionALength * sectionAWidth + sectionBLength * sectionBWidth;
      perimeter =
        2 * (sectionALength + sectionAWidth) +
        2 * (sectionBLength + sectionBWidth);
    }

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

    const reinforcementCost = area * reinforcementCostPerSqFt;
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
      perimeter,
      concreteCubicFeet,
      concreteCubicYards,
      concreteCubicYardsWithWaste,
      concreteMaterialCost,
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
    shape,
    length,
    width,
    circleDiameter,
    sectionALength,
    sectionAWidth,
    sectionBLength,
    sectionBWidth,
    thicknessInches,
    wastePercent,
    concretePricePerYard,
    deliveryFee,
    shortLoadFee,
    baseDepthInches,
    baseTonsPerCubicYard,
    basePricePerTon,
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

  function applyFinishPreset(nextFinish: FinishType) {
    setFinishType(nextFinish);

    if (nextFinish === "Broom finish") setFinishCostPerSqFt(1.25);
    if (nextFinish === "Smooth finish") setFinishCostPerSqFt(1.75);
    if (nextFinish === "Stamped concrete") setFinishCostPerSqFt(8);
    if (nextFinish === "Stained concrete") setFinishCostPerSqFt(5);
  }

  async function copyResults() {
    const text = `Concrete Patio Estimate
Shape: ${shape}
Area: ${formatNumber(results.area)} sq ft
Perimeter/forms: ${formatNumber(results.perimeter)} linear ft
Thickness: ${thicknessInches} in
Concrete yards with waste: ${formatNumber(results.concreteCubicYardsWithWaste)} yd³
Concrete material cost: ${formatCurrency(results.concreteMaterialCost)}
Base depth: ${baseDepthInches} in
Base tons: ${formatNumber(results.baseTons)} tons
Base cost: ${formatCurrency(results.baseCost)}
Reinforcement cost: ${formatCurrency(results.reinforcementCost)}
Prep cost: ${formatCurrency(results.prepCost)}
Labor cost: ${formatCurrency(results.laborCost)}
Finish type: ${finishType}
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
          Calculate concrete patio cost
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter patio size, slab thickness, base depth, reinforcement, labor,
          finish type, delivery, and waste to estimate total project cost.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Patio shape</span>
            <select
              value={shape}
              onChange={(event) => setShape(event.target.value as PatioShape)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Rectangle</option>
              <option>Circle</option>
              <option>L-shape</option>
            </select>
          </label>

          {shape === "Rectangle" && (
            <div className="grid gap-4 md:grid-cols-2">
              <NumberInput label="Patio length" suffix="ft" value={length} setValue={setLength} />
              <NumberInput label="Patio width" suffix="ft" value={width} setValue={setWidth} />
            </div>
          )}

          {shape === "Circle" && (
            <NumberInput
              label="Patio diameter"
              suffix="ft"
              value={circleDiameter}
              setValue={setCircleDiameter}
            />
          )}

          {shape === "L-shape" && (
            <div className="grid gap-4 md:grid-cols-2">
              <NumberInput label="Section A length" suffix="ft" value={sectionALength} setValue={setSectionALength} />
              <NumberInput label="Section A width" suffix="ft" value={sectionAWidth} setValue={setSectionAWidth} />
              <NumberInput label="Section B length" suffix="ft" value={sectionBLength} setValue={setSectionBLength} />
              <NumberInput label="Section B width" suffix="ft" value={sectionBWidth} setValue={setSectionBWidth} />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <NumberInput label="Concrete thickness" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
            <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />
            <NumberInput label="Concrete price" suffix="$/yd³" value={concretePricePerYard} setValue={setConcretePricePerYard} />
            <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
            <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />

            <NumberInput label="Base depth" suffix="in" value={baseDepthInches} setValue={setBaseDepthInches} />
            <NumberInput label="Base density" suffix="tons/yd³" value={baseTonsPerCubicYard} setValue={setBaseTonsPerCubicYard} />
            <NumberInput label="Base price" suffix="$/ton" value={basePricePerTon} setValue={setBasePricePerTon} />

            <NumberInput label="Reinforcement allowance" suffix="$/sq ft" value={reinforcementCostPerSqFt} setValue={setReinforcementCostPerSqFt} />
            <NumberInput label="Prep cost" suffix="$/sq ft" value={prepCostPerSqFt} setValue={setPrepCostPerSqFt} />
            <NumberInput label="Labor cost" suffix="$/sq ft" value={laborCostPerSqFt} setValue={setLaborCostPerSqFt} />

            <label className="space-y-2">
              <span className="text-sm font-medium text-white">Finish type</span>
              <select
                value={finishType}
                onChange={(event) => applyFinishPreset(event.target.value as FinishType)}
                className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
              >
                <option>Broom finish</option>
                <option>Smooth finish</option>
                <option>Stamped concrete</option>
                <option>Stained concrete</option>
              </select>
            </label>

            <NumberInput label="Finish cost" suffix="$/sq ft" value={finishCostPerSqFt} setValue={setFinishCostPerSqFt} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Patio estimate</h3>

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
          <ResultRow label="Patio area" value={`${formatNumber(results.area)} sq ft`} />
          <ResultRow label="Perimeter / forms" value={`${formatNumber(results.perimeter)} linear ft`} />
          <ResultRow label="Concrete cubic yards" value={`${formatNumber(results.concreteCubicYards)} yd³`} />
          <ResultRow label="Concrete yards with waste" value={`${formatNumber(results.concreteCubicYardsWithWaste)} yd³`} />
          <ResultRow label="Concrete material" value={formatCurrency(results.concreteMaterialCost)} />
          <ResultRow label="Base cubic yards" value={`${formatNumber(results.baseCubicYards)} yd³`} />
          <ResultRow label="Base tons" value={`${formatNumber(results.baseTons)} tons`} />
          <ResultRow label="Base material" value={formatCurrency(results.baseCost)} />
          <ResultRow label="Reinforcement" value={formatCurrency(results.reinforcementCost)} />
          <ResultRow label="Prep" value={formatCurrency(results.prepCost)} />
          <ResultRow label="Labor" value={formatCurrency(results.laborCost)} />
          <ResultRow label={`${finishType} finish`} value={formatCurrency(results.finishCost)} />
          <ResultRow label="Delivery + fees" value={formatCurrency(deliveryFee + shortLoadFee)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This is a planning estimate. Final patio cost depends on demolition,
          excavation, access, soil, drainage, forms, finish quality, reinforcement,
          labor, material pricing, and local requirements.
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
