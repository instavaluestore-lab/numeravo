"use client";

import { useMemo, useState } from "react";

type StairMode = "Use total rise" | "Use step count";

export default function ConcreteStairsCalculatorClient() {
  const [mode, setMode] = useState<StairMode>("Use total rise");

  const [totalRiseInches, setTotalRiseInches] = useState(36);
  const [stepCount, setStepCount] = useState(6);
  const [targetRiserInches, setTargetRiserInches] = useState(7);

  const [treadDepthInches, setTreadDepthInches] = useState(11);
  const [stairWidthFeet, setStairWidthFeet] = useState(4);
  const [landingLengthFeet, setLandingLengthFeet] = useState(0);
  const [landingThicknessInches, setLandingThicknessInches] = useState(4);

  const [wastePercent, setWastePercent] = useState(10);
  const [concretePricePerYard, setConcretePricePerYard] = useState(170);
  const [deliveryFee, setDeliveryFee] = useState(125);
  const [shortLoadFee, setShortLoadFee] = useState(0);

  const [formworkCostPerStep, setFormworkCostPerStep] = useState(45);
  const [reinforcementCostPerStep, setReinforcementCostPerStep] = useState(25);
  const [prepCost, setPrepCost] = useState(250);
  const [laborCostPerStep, setLaborCostPerStep] = useState(175);
  const [finishCostPerSqFt, setFinishCostPerSqFt] = useState(2);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const calculatedStepCount =
      mode === "Use total rise"
        ? Math.max(1, Math.ceil(totalRiseInches / targetRiserInches))
        : Math.max(1, stepCount);

    const riserHeightInches =
      mode === "Use total rise"
        ? totalRiseInches / calculatedStepCount
        : targetRiserInches;

    const totalRiseFeet = (riserHeightInches * calculatedStepCount) / 12;
    const treadDepthFeet = treadDepthInches / 12;
    const totalRunFeet = calculatedStepCount * treadDepthFeet;

    const stairVolumeCubicFeet =
      0.5 * totalRunFeet * totalRiseFeet * stairWidthFeet;

    const landingVolumeCubicFeet =
      landingLengthFeet * stairWidthFeet * (landingThicknessInches / 12);

    const concreteCubicFeet = stairVolumeCubicFeet + landingVolumeCubicFeet;
    const concreteCubicYards = concreteCubicFeet / 27;
    const concreteCubicYardsWithWaste =
      concreteCubicYards * (1 + wastePercent / 100);

    const concreteMaterialCost =
      concreteCubicYardsWithWaste * concretePricePerYard;

    const formworkCost = calculatedStepCount * formworkCostPerStep;
    const reinforcementCost = calculatedStepCount * reinforcementCostPerStep;
    const laborCost = calculatedStepCount * laborCostPerStep;

    const horizontalSurfaceSqFt =
      calculatedStepCount * treadDepthFeet * stairWidthFeet +
      landingLengthFeet * stairWidthFeet;

    const finishCost = horizontalSurfaceSqFt * finishCostPerSqFt;

    const totalCost =
      concreteMaterialCost +
      deliveryFee +
      shortLoadFee +
      formworkCost +
      reinforcementCost +
      prepCost +
      laborCost +
      finishCost;

    const costPerStep = calculatedStepCount > 0 ? totalCost / calculatedStepCount : 0;

    return {
      calculatedStepCount,
      riserHeightInches,
      totalRiseFeet,
      treadDepthFeet,
      totalRunFeet,
      stairVolumeCubicFeet,
      landingVolumeCubicFeet,
      concreteCubicFeet,
      concreteCubicYards,
      concreteCubicYardsWithWaste,
      concreteMaterialCost,
      formworkCost,
      reinforcementCost,
      laborCost,
      horizontalSurfaceSqFt,
      finishCost,
      totalCost,
      costPerStep,
    };
  }, [
    mode,
    totalRiseInches,
    stepCount,
    targetRiserInches,
    treadDepthInches,
    stairWidthFeet,
    landingLengthFeet,
    landingThicknessInches,
    wastePercent,
    concretePricePerYard,
    deliveryFee,
    shortLoadFee,
    formworkCostPerStep,
    reinforcementCostPerStep,
    prepCost,
    laborCostPerStep,
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

  function applyPreset(type: "Porch steps" | "Patio steps" | "Tall entry") {
    if (type === "Porch steps") {
      setMode("Use total rise");
      setTotalRiseInches(28);
      setTargetRiserInches(7);
      setTreadDepthInches(11);
      setStairWidthFeet(4);
      setLandingLengthFeet(0);
    }

    if (type === "Patio steps") {
      setMode("Use total rise");
      setTotalRiseInches(21);
      setTargetRiserInches(7);
      setTreadDepthInches(12);
      setStairWidthFeet(5);
      setLandingLengthFeet(0);
    }

    if (type === "Tall entry") {
      setMode("Use total rise");
      setTotalRiseInches(48);
      setTargetRiserInches(7);
      setTreadDepthInches(11);
      setStairWidthFeet(4);
      setLandingLengthFeet(4);
    }
  }

  async function copyResults() {
    const text = `Concrete Stairs Estimate
Mode: ${mode}
Step count: ${results.calculatedStepCount}
Riser height: ${formatNumber(results.riserHeightInches)} in
Tread depth: ${treadDepthInches} in
Stair width: ${stairWidthFeet} ft
Total run: ${formatNumber(results.totalRunFeet)} ft
Concrete yards with waste: ${formatNumber(results.concreteCubicYardsWithWaste)} yd³
Concrete material cost: ${formatCurrency(results.concreteMaterialCost)}
Formwork cost: ${formatCurrency(results.formworkCost)}
Reinforcement cost: ${formatCurrency(results.reinforcementCost)}
Prep cost: ${formatCurrency(prepCost)}
Labor cost: ${formatCurrency(results.laborCost)}
Finish cost: ${formatCurrency(results.finishCost)}
Delivery: ${formatCurrency(deliveryFee)}
Short-load fee: ${formatCurrency(shortLoadFee)}
Estimated total: ${formatCurrency(results.totalCost)}
Cost per step: ${formatCurrency(results.costPerStep)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete stairs cost
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Estimate concrete stair volume, step count, riser height, tread depth,
          formwork, reinforcement allowance, labor, finishing, delivery, and total cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <PresetButton label="Porch steps" onClick={() => applyPreset("Porch steps")} />
          <PresetButton label="Patio steps" onClick={() => applyPreset("Patio steps")} />
          <PresetButton label="Tall entry" onClick={() => applyPreset("Tall entry")} />
        </div>

        <div className="mt-6 grid gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Calculation mode</span>
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value as StairMode)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Use total rise</option>
              <option>Use step count</option>
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            {mode === "Use total rise" ? (
              <NumberInput
                label="Total rise"
                suffix="in"
                value={totalRiseInches}
                setValue={setTotalRiseInches}
              />
            ) : (
              <NumberInput
                label="Step count"
                suffix="steps"
                value={stepCount}
                setValue={setStepCount}
              />
            )}

            <NumberInput
              label="Target riser height"
              suffix="in"
              value={targetRiserInches}
              setValue={setTargetRiserInches}
            />
            <NumberInput
              label="Tread depth"
              suffix="in"
              value={treadDepthInches}
              setValue={setTreadDepthInches}
            />
            <NumberInput
              label="Stair width"
              suffix="ft"
              value={stairWidthFeet}
              setValue={setStairWidthFeet}
            />
            <NumberInput
              label="Landing length"
              suffix="ft"
              value={landingLengthFeet}
              setValue={setLandingLengthFeet}
            />
            <NumberInput
              label="Landing thickness"
              suffix="in"
              value={landingThicknessInches}
              setValue={setLandingThicknessInches}
            />
            <NumberInput
              label="Waste / overage"
              suffix="%"
              value={wastePercent}
              setValue={setWastePercent}
            />

            <NumberInput
              label="Concrete price"
              suffix="$/yd³"
              value={concretePricePerYard}
              setValue={setConcretePricePerYard}
            />
            <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
            <NumberInput label="Short-load fee" suffix="$" value={shortLoadFee} setValue={setShortLoadFee} />

            <NumberInput
              label="Formwork allowance"
              suffix="$/step"
              value={formworkCostPerStep}
              setValue={setFormworkCostPerStep}
            />
            <NumberInput
              label="Reinforcement allowance"
              suffix="$/step"
              value={reinforcementCostPerStep}
              setValue={setReinforcementCostPerStep}
            />
            <NumberInput label="Prep cost" suffix="$" value={prepCost} setValue={setPrepCost} />
            <NumberInput
              label="Labor cost"
              suffix="$/step"
              value={laborCostPerStep}
              setValue={setLaborCostPerStep}
            />
            <NumberInput
              label="Finish cost"
              suffix="$/sq ft"
              value={finishCostPerSqFt}
              setValue={setFinishCostPerSqFt}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Stair estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatCurrency(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            About {formatCurrency(results.costPerStep)} per step.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Estimated step count" value={`${results.calculatedStepCount} steps`} />
          <ResultRow label="Calculated riser height" value={`${formatNumber(results.riserHeightInches)} in`} />
          <ResultRow label="Tread depth" value={`${formatNumber(treadDepthInches)} in`} />
          <ResultRow label="Total run" value={`${formatNumber(results.totalRunFeet)} ft`} />
          <ResultRow label="Stair width" value={`${formatNumber(stairWidthFeet)} ft`} />
          <ResultRow label="Stair concrete volume" value={`${formatNumber(results.stairVolumeCubicFeet)} ft³`} />
          <ResultRow label="Landing concrete volume" value={`${formatNumber(results.landingVolumeCubicFeet)} ft³`} />
          <ResultRow label="Concrete cubic yards" value={`${formatNumber(results.concreteCubicYards)} yd³`} />
          <ResultRow label="Concrete yards with waste" value={`${formatNumber(results.concreteCubicYardsWithWaste)} yd³`} />
          <ResultRow label="Concrete material" value={formatCurrency(results.concreteMaterialCost)} />
          <ResultRow label="Formwork" value={formatCurrency(results.formworkCost)} />
          <ResultRow label="Reinforcement" value={formatCurrency(results.reinforcementCost)} />
          <ResultRow label="Prep" value={formatCurrency(prepCost)} />
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
          This is a planning estimate. Final stair pricing depends on demolition,
          excavation, access, formwork complexity, reinforcement, landings, handrails,
          drainage, local labor, material pricing, and building-code requirements.
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
