"use client";

import { useMemo, useState } from "react";

type MixPreset =
  | "General purpose 1:2:3"
  | "Traditional 1:2:4"
  | "Lean mix 1:3:6"
  | "Stronger mix 1:1.5:3"
  | "Custom";

export default function ConcreteMixRatioClient() {
  const [preset, setPreset] = useState<MixPreset>("General purpose 1:2:3");

  const [targetYards, setTargetYards] = useState(1);
  const [cementParts, setCementParts] = useState(1);
  const [sandParts, setSandParts] = useState(2);
  const [gravelParts, setGravelParts] = useState(3);

  const [dryVolumeFactor, setDryVolumeFactor] = useState(1.54);
  const [cementBagWeight, setCementBagWeight] = useState(94);
  const [cementDensityLbPerCubicFoot, setCementDensityLbPerCubicFoot] = useState(94);
  const [waterCementRatio, setWaterCementRatio] = useState(0.5);

  const [cementBagPrice, setCementBagPrice] = useState(15);
  const [sandPricePerYard, setSandPricePerYard] = useState(45);
  const [gravelPricePerYard, setGravelPricePerYard] = useState(55);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const wetCubicFeet = targetYards * 27;
    const dryCubicFeet = wetCubicFeet * dryVolumeFactor;
    const totalParts = cementParts + sandParts + gravelParts;

    const cementCubicFeet = totalParts > 0 ? dryCubicFeet * (cementParts / totalParts) : 0;
    const sandCubicFeet = totalParts > 0 ? dryCubicFeet * (sandParts / totalParts) : 0;
    const gravelCubicFeet = totalParts > 0 ? dryCubicFeet * (gravelParts / totalParts) : 0;

    const cementPounds = cementCubicFeet * cementDensityLbPerCubicFoot;
    const cementBags = cementBagWeight > 0 ? cementPounds / cementBagWeight : 0;
    const cementBagsRounded = Math.ceil(cementBags);

    const sandYards = sandCubicFeet / 27;
    const gravelYards = gravelCubicFeet / 27;

    const waterPounds = cementPounds * waterCementRatio;
    const waterGallons = waterPounds / 8.34;

    const cementCost = cementBagsRounded * cementBagPrice;
    const sandCost = sandYards * sandPricePerYard;
    const gravelCost = gravelYards * gravelPricePerYard;
    const totalCost = cementCost + sandCost + gravelCost;
    const costPerYard = targetYards > 0 ? totalCost / targetYards : 0;

    return {
      wetCubicFeet,
      dryCubicFeet,
      totalParts,
      cementCubicFeet,
      sandCubicFeet,
      gravelCubicFeet,
      cementPounds,
      cementBags,
      cementBagsRounded,
      sandYards,
      gravelYards,
      waterPounds,
      waterGallons,
      cementCost,
      sandCost,
      gravelCost,
      totalCost,
      costPerYard,
    };
  }, [
    targetYards,
    dryVolumeFactor,
    cementParts,
    sandParts,
    gravelParts,
    cementBagWeight,
    cementDensityLbPerCubicFoot,
    waterCementRatio,
    cementBagPrice,
    sandPricePerYard,
    gravelPricePerYard,
  ]);

  function applyPreset(nextPreset: MixPreset) {
    setPreset(nextPreset);

    if (nextPreset === "General purpose 1:2:3") {
      setCementParts(1);
      setSandParts(2);
      setGravelParts(3);
      setWaterCementRatio(0.5);
    }

    if (nextPreset === "Traditional 1:2:4") {
      setCementParts(1);
      setSandParts(2);
      setGravelParts(4);
      setWaterCementRatio(0.55);
    }

    if (nextPreset === "Lean mix 1:3:6") {
      setCementParts(1);
      setSandParts(3);
      setGravelParts(6);
      setWaterCementRatio(0.6);
    }

    if (nextPreset === "Stronger mix 1:1.5:3") {
      setCementParts(1);
      setSandParts(1.5);
      setGravelParts(3);
      setWaterCementRatio(0.45);
    }
  }

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
    const text = `Concrete Mix Ratio Estimate
Preset: ${preset}
Target concrete: ${targetYards} yd³
Mix ratio: ${cementParts}:${sandParts}:${gravelParts}
Wet volume: ${formatNumber(results.wetCubicFeet)} ft³
Dry volume factor: ${dryVolumeFactor}
Estimated dry volume: ${formatNumber(results.dryCubicFeet)} ft³
Cement: ${formatNumber(results.cementCubicFeet)} ft³
Cement weight: ${formatNumber(results.cementPounds, 0)} lb
Cement bags: ${formatNumber(results.cementBags)} exact / ${results.cementBagsRounded} rounded
Sand: ${formatNumber(results.sandCubicFeet)} ft³ / ${formatNumber(results.sandYards)} yd³
Gravel: ${formatNumber(results.gravelCubicFeet)} ft³ / ${formatNumber(results.gravelYards)} yd³
Estimated water: ${formatNumber(results.waterGallons)} gal
Cement cost: ${formatCurrency(results.cementCost)}
Sand cost: ${formatCurrency(results.sandCost)}
Gravel cost: ${formatCurrency(results.gravelCost)}
Estimated total cost: ${formatCurrency(results.totalCost)}
Cost per cubic yard: ${formatCurrency(results.costPerYard)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete mix materials
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Choose a common mix ratio or enter a custom cement:sand:gravel ratio to
          estimate cement bags, sand, gravel, water, and material cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {([
            "General purpose 1:2:3",
            "Traditional 1:2:4",
            "Lean mix 1:3:6",
            "Stronger mix 1:1.5:3",
            "Custom",
          ] as MixPreset[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => applyPreset(item)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                preset === item
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Target concrete volume" suffix="yd³" value={targetYards} setValue={setTargetYards} />
          <NumberInput label="Dry volume factor" suffix="×" value={dryVolumeFactor} setValue={setDryVolumeFactor} />

          <NumberInput label="Cement parts" suffix="parts" value={cementParts} setValue={(value) => { setPreset("Custom"); setCementParts(value); }} />
          <NumberInput label="Sand parts" suffix="parts" value={sandParts} setValue={(value) => { setPreset("Custom"); setSandParts(value); }} />
          <NumberInput label="Gravel parts" suffix="parts" value={gravelParts} setValue={(value) => { setPreset("Custom"); setGravelParts(value); }} />

          <NumberInput label="Cement bag weight" suffix="lb" value={cementBagWeight} setValue={setCementBagWeight} />
          <NumberInput label="Cement density" suffix="lb/ft³" value={cementDensityLbPerCubicFoot} setValue={setCementDensityLbPerCubicFoot} />
          <NumberInput label="Water-cement ratio" suffix="w/c" value={waterCementRatio} setValue={setWaterCementRatio} />

          <NumberInput label="Cement bag price" suffix="$/bag" value={cementBagPrice} setValue={setCementBagPrice} />
          <NumberInput label="Sand price" suffix="$/yd³" value={sandPricePerYard} setValue={setSandPricePerYard} />
          <NumberInput label="Gravel price" suffix="$/yd³" value={gravelPricePerYard} setValue={setGravelPricePerYard} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Mix estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated material cost</p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatCurrency(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {formatCurrency(results.costPerYard)} per cubic yard.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Mix ratio" value={`${cementParts}:${sandParts}:${gravelParts}`} />
          <ResultRow label="Wet concrete volume" value={`${formatNumber(results.wetCubicFeet)} ft³`} />
          <ResultRow label="Estimated dry volume" value={`${formatNumber(results.dryCubicFeet)} ft³`} />
          <ResultRow label="Cement volume" value={`${formatNumber(results.cementCubicFeet)} ft³`} />
          <ResultRow label="Cement weight" value={`${formatNumber(results.cementPounds, 0)} lb`} />
          <ResultRow label="Cement bags exact" value={`${formatNumber(results.cementBags)} bags`} />
          <ResultRow label="Cement bags to buy" value={`${results.cementBagsRounded} bags`} />
          <ResultRow label="Sand volume" value={`${formatNumber(results.sandYards)} yd³`} />
          <ResultRow label="Gravel volume" value={`${formatNumber(results.gravelYards)} yd³`} />
          <ResultRow label="Estimated water" value={`${formatNumber(results.waterGallons)} gal`} />
          <ResultRow label="Cement cost" value={formatCurrency(results.cementCost)} />
          <ResultRow label="Sand cost" value={formatCurrency(results.sandCost)} />
          <ResultRow label="Gravel cost" value={formatCurrency(results.gravelCost)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator estimates small-batch material quantities. Concrete strength
          depends on material quality, moisture, water content, mixing, placement,
          compaction, curing, and project specifications.
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
