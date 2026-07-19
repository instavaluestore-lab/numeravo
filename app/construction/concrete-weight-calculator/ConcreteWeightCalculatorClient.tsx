"use client";

import { useMemo, useState } from "react";

type InputMode =
  | "Cubic yards"
  | "Cubic feet"
  | "Slab dimensions"
  | "Bag count"
  | "Truckload";

const densityDefaults = {
  "Lightweight concrete": 115,
  "Normal-weight concrete": 150,
  "Heavy concrete": 180,
};

type DensityType = keyof typeof densityDefaults;

export default function ConcreteWeightCalculatorClient() {
  const [inputMode, setInputMode] = useState<InputMode>("Cubic yards");
  const [densityType, setDensityType] = useState<DensityType>("Normal-weight concrete");
  const [densityPoundsPerCubicFoot, setDensityPoundsPerCubicFoot] = useState(150);

  const [cubicYards, setCubicYards] = useState(1);
  const [cubicFeet, setCubicFeet] = useState(27);
  const [lengthFeet, setLengthFeet] = useState(12);
  const [widthFeet, setWidthFeet] = useState(12);
  const [thicknessInches, setThicknessInches] = useState(4);
  const [bagSize, setBagSize] = useState(80);
  const [bagCount, setBagCount] = useState(45);
  const [truckloadYards, setTruckloadYards] = useState(10);
  const [truckloads, setTruckloads] = useState(1);
  const [copied, setCopied] = useState(false);

  function applyDensity(type: DensityType) {
    setDensityType(type);
    setDensityPoundsPerCubicFoot(densityDefaults[type]);
  }

  function applyMode(mode: InputMode) {
    setInputMode(mode);

    if (mode === "Cubic yards") {
      setCubicYards(1);
    }

    if (mode === "Cubic feet") {
      setCubicFeet(27);
    }

    if (mode === "Slab dimensions") {
      setLengthFeet(12);
      setWidthFeet(12);
      setThicknessInches(4);
    }

    if (mode === "Bag count") {
      setBagSize(80);
      setBagCount(45);
    }

    if (mode === "Truckload") {
      setTruckloadYards(10);
      setTruckloads(1);
    }
  }

  const results = useMemo(() => {
    let volumeCubicFeet = 0;

    if (inputMode === "Cubic yards") {
      volumeCubicFeet = cubicYards * 27;
    }

    if (inputMode === "Cubic feet") {
      volumeCubicFeet = cubicFeet;
    }

    if (inputMode === "Slab dimensions") {
      volumeCubicFeet = lengthFeet * widthFeet * (thicknessInches / 12);
    }

    if (inputMode === "Bag count") {
      const bagYieldCubicFeet =
        bagSize === 40 ? 0.30 : bagSize === 60 ? 0.45 : 0.60;
      volumeCubicFeet = bagCount * bagYieldCubicFeet;
    }

    if (inputMode === "Truckload") {
      volumeCubicFeet = truckloadYards * truckloads * 27;
    }

    const volumeCubicYards = volumeCubicFeet / 27;
    const pounds = volumeCubicFeet * densityPoundsPerCubicFoot;
    const tons = pounds / 2000;
    const kilograms = pounds * 0.45359237;
    const metricTons = kilograms / 1000;
    const poundsPerSquareFoot =
      inputMode === "Slab dimensions" && lengthFeet * widthFeet > 0
        ? pounds / (lengthFeet * widthFeet)
        : 0;

    return {
      volumeCubicFeet,
      volumeCubicYards,
      pounds,
      tons,
      kilograms,
      metricTons,
      poundsPerSquareFoot,
    };
  }, [
    inputMode,
    cubicYards,
    cubicFeet,
    lengthFeet,
    widthFeet,
    thicknessInches,
    bagSize,
    bagCount,
    truckloadYards,
    truckloads,
    densityPoundsPerCubicFoot,
  ]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete Weight Calculator
Input mode: ${inputMode}
Density type: ${densityType}
Density: ${densityPoundsPerCubicFoot} lb/ft³
Volume: ${formatNumber(results.volumeCubicFeet)} ft³
Volume: ${formatNumber(results.volumeCubicYards)} yd³
Weight: ${formatNumber(results.pounds, 0)} lb
Weight: ${formatNumber(results.tons)} US tons
Weight: ${formatNumber(results.kilograms, 0)} kg
Weight: ${formatNumber(results.metricTons)} metric tons${
      inputMode === "Slab dimensions"
        ? `\nWeight per square foot: ${formatNumber(results.poundsPerSquareFoot)} lb/sq ft`
        : ""
    }`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete weight
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Choose a volume method, adjust concrete density, and estimate weight in
          pounds, US tons, kilograms, and metric tons.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              "Cubic yards",
              "Cubic feet",
              "Slab dimensions",
              "Bag count",
              "Truckload",
            ] as InputMode[]
          ).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => applyMode(mode)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                inputMode === mode
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {(["Lightweight concrete", "Normal-weight concrete", "Heavy concrete"] as DensityType[]).map(
            (type) => (
              <button
                key={type}
                type="button"
                onClick={() => applyDensity(type)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  densityType === type
                    ? "border-[#F97316] bg-[#F97316] text-white"
                    : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {inputMode === "Cubic yards" && (
            <NumberInput label="Concrete volume" suffix="yd³" value={cubicYards} setValue={setCubicYards} />
          )}

          {inputMode === "Cubic feet" && (
            <NumberInput label="Concrete volume" suffix="ft³" value={cubicFeet} setValue={setCubicFeet} />
          )}

          {inputMode === "Slab dimensions" && (
            <>
              <NumberInput label="Length" suffix="ft" value={lengthFeet} setValue={setLengthFeet} />
              <NumberInput label="Width" suffix="ft" value={widthFeet} setValue={setWidthFeet} />
              <NumberInput label="Thickness" suffix="in" value={thicknessInches} setValue={setThicknessInches} />
            </>
          )}

          {inputMode === "Bag count" && (
            <>
              <label className="space-y-2">
                <span className="text-sm font-medium text-white">Bag size</span>
                <select
                  value={bagSize}
                  onChange={(event) => setBagSize(Number(event.target.value))}
                  className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
                >
                  <option value={40}>40 lb bag</option>
                  <option value={60}>60 lb bag</option>
                  <option value={80}>80 lb bag</option>
                </select>
              </label>
              <NumberInput label="Bag count" suffix="bags" value={bagCount} setValue={setBagCount} />
            </>
          )}

          {inputMode === "Truckload" && (
            <>
              <NumberInput label="Concrete per truck" suffix="yd³" value={truckloadYards} setValue={setTruckloadYards} />
              <NumberInput label="Truckloads" suffix="loads" value={truckloads} setValue={setTruckloads} />
            </>
          )}

          <NumberInput
            label="Concrete density"
            suffix="lb/ft³"
            value={densityPoundsPerCubicFoot}
            setValue={setDensityPoundsPerCubicFoot}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Density note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Normal-weight concrete is often estimated around 145 to 150 lb/ft³.
            Actual density can vary by aggregate, mix design, moisture, air content,
            and reinforcement.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Estimated concrete weight</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Total weight</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatNumber(results.pounds, 0)} lb
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatNumber(results.tons)} US tons.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Concrete volume" value={`${formatNumber(results.volumeCubicFeet)} ft³`} />
          <ResultRow label="Concrete volume" value={`${formatNumber(results.volumeCubicYards)} yd³`} />
          <ResultRow label="Density used" value={`${formatNumber(densityPoundsPerCubicFoot)} lb/ft³`} />
          <ResultRow label="Weight in pounds" value={`${formatNumber(results.pounds, 0)} lb`} />
          <ResultRow label="Weight in US tons" value={`${formatNumber(results.tons)} tons`} />
          <ResultRow label="Weight in kilograms" value={`${formatNumber(results.kilograms, 0)} kg`} />
          <ResultRow label="Weight in metric tons" value={`${formatNumber(results.metricTons)} t`} />
          {inputMode === "Slab dimensions" && (
            <ResultRow label="Weight per square foot" value={`${formatNumber(results.poundsPerSquareFoot)} lb/sq ft`} />
          )}
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          Use this as an estimate only. Confirm actual weight before hauling,
          demolition disposal, trailer loading, crane planning, or structural checks.
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
