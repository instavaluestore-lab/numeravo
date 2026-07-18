"use client";

import { useMemo, useState } from "react";

type MeshFormat = "Sheets" | "Rolls";
type ProjectPreset = "Slab" | "Driveway" | "Patio" | "Sidewalk" | "Pad";

export default function WireMeshCalculatorClient() {
  const [projectPreset, setProjectPreset] = useState<ProjectPreset>("Slab");
  const [meshFormat, setMeshFormat] = useState<MeshFormat>("Sheets");

  const [slabLength, setSlabLength] = useState(20);
  const [slabWidth, setSlabWidth] = useState(20);

  const [sheetLength, setSheetLength] = useState(10);
  const [sheetWidth, setSheetWidth] = useState(5);

  const [rollLength, setRollLength] = useState(150);
  const [rollWidth, setRollWidth] = useState(5);

  const [overlapInches, setOverlapInches] = useState(6);
  const [wastePercent, setWastePercent] = useState(10);
  const [pricePerSheet, setPricePerSheet] = useState(18);
  const [pricePerRoll, setPricePerRoll] = useState(240);

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const slabArea = slabLength * slabWidth;
    const overlapFeet = overlapInches / 12;

    const itemLength = meshFormat === "Sheets" ? sheetLength : rollLength;
    const itemWidth = meshFormat === "Sheets" ? sheetWidth : rollWidth;

    const effectiveLength = Math.max(itemLength - overlapFeet, 0);
    const effectiveWidth = Math.max(itemWidth - overlapFeet, 0);
    const effectiveCoverage = effectiveLength * effectiveWidth;

    const rawItems = effectiveCoverage > 0 ? slabArea / effectiveCoverage : 0;
    const itemsWithWaste = rawItems * (1 + wastePercent / 100);
    const itemsToBuy = Math.ceil(itemsWithWaste);

    const grossCoverage = itemLength * itemWidth * itemsToBuy;
    const effectiveTotalCoverage = effectiveCoverage * itemsToBuy;
    const extraCoverage = Math.max(effectiveTotalCoverage - slabArea, 0);

    const materialCost =
      meshFormat === "Sheets" ? itemsToBuy * pricePerSheet : itemsToBuy * pricePerRoll;

    const costPerSquareFoot = slabArea > 0 ? materialCost / slabArea : 0;

    return {
      slabArea,
      overlapFeet,
      itemLength,
      itemWidth,
      effectiveLength,
      effectiveWidth,
      effectiveCoverage,
      rawItems,
      itemsWithWaste,
      itemsToBuy,
      grossCoverage,
      effectiveTotalCoverage,
      extraCoverage,
      materialCost,
      costPerSquareFoot,
    };
  }, [
    slabLength,
    slabWidth,
    meshFormat,
    sheetLength,
    sheetWidth,
    rollLength,
    rollWidth,
    overlapInches,
    wastePercent,
    pricePerSheet,
    pricePerRoll,
  ]);

  function applyPreset(preset: ProjectPreset) {
    setProjectPreset(preset);

    if (preset === "Slab") {
      setSlabLength(20);
      setSlabWidth(20);
    }

    if (preset === "Driveway") {
      setSlabLength(40);
      setSlabWidth(16);
    }

    if (preset === "Patio") {
      setSlabLength(20);
      setSlabWidth(15);
    }

    if (preset === "Sidewalk") {
      setSlabLength(40);
      setSlabWidth(4);
    }

    if (preset === "Pad") {
      setSlabLength(12);
      setSlabWidth(12);
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
    const text = `Wire Mesh Estimate
Project preset: ${projectPreset}
Mesh format: ${meshFormat}
Slab size: ${slabLength} ft x ${slabWidth} ft
Slab area: ${formatNumber(results.slabArea)} sq ft
Mesh item size: ${results.itemLength} ft x ${results.itemWidth} ft
Overlap allowance: ${overlapInches} in
Waste allowance: ${wastePercent}%
Effective coverage per ${meshFormat === "Sheets" ? "sheet" : "roll"}: ${formatNumber(results.effectiveCoverage)} sq ft
Raw quantity: ${formatNumber(results.rawItems)}
Quantity with waste: ${formatNumber(results.itemsWithWaste)}
Recommended quantity to buy: ${results.itemsToBuy}
Gross purchased coverage: ${formatNumber(results.grossCoverage)} sq ft
Effective total coverage: ${formatNumber(results.effectiveTotalCoverage)} sq ft
Extra effective coverage: ${formatNumber(results.extraCoverage)} sq ft
Estimated material cost: ${formatCurrency(results.materialCost)}
Cost per square foot: ${formatCurrency(results.costPerSquareFoot)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">Calculate wire mesh</h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter slab dimensions, mesh sheet or roll size, overlap, waste, and pricing
          to estimate wire mesh quantity and material cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {(["Slab", "Driveway", "Patio", "Sidewalk", "Pad"] as ProjectPreset[]).map(
            (preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  projectPreset === preset
                    ? "border-[#F97316] bg-[#F97316] text-white"
                    : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
                }`}
              >
                {preset}
              </button>
            ),
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Slab length" suffix="ft" value={slabLength} setValue={setSlabLength} />
          <NumberInput label="Slab width" suffix="ft" value={slabWidth} setValue={setSlabWidth} />

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Mesh format</span>
            <select
              value={meshFormat}
              onChange={(event) => setMeshFormat(event.target.value as MeshFormat)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>Sheets</option>
              <option>Rolls</option>
            </select>
          </label>

          {meshFormat === "Sheets" ? (
            <>
              <NumberInput label="Sheet length" suffix="ft" value={sheetLength} setValue={setSheetLength} />
              <NumberInput label="Sheet width" suffix="ft" value={sheetWidth} setValue={setSheetWidth} />
              <NumberInput label="Price per sheet" suffix="$/sheet" value={pricePerSheet} setValue={setPricePerSheet} />
            </>
          ) : (
            <>
              <NumberInput label="Roll length" suffix="ft" value={rollLength} setValue={setRollLength} />
              <NumberInput label="Roll width" suffix="ft" value={rollWidth} setValue={setRollWidth} />
              <NumberInput label="Price per roll" suffix="$/roll" value={pricePerRoll} setValue={setPricePerRoll} />
            </>
          )}

          <NumberInput label="Overlap allowance" suffix="in" value={overlapInches} setValue={setOverlapInches} />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Wire mesh estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Recommended quantity</p>
          <p className="mt-2 text-5xl font-bold text-white">{results.itemsToBuy}</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            {meshFormat === "Sheets" ? "sheet" : "roll"}
            {results.itemsToBuy === 1 ? "" : "s"} estimated.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Slab area" value={`${formatNumber(results.slabArea)} sq ft`} />
          <ResultRow label="Mesh item size" value={`${results.itemLength} ft × ${results.itemWidth} ft`} />
          <ResultRow label="Effective coverage each" value={`${formatNumber(results.effectiveCoverage)} sq ft`} />
          <ResultRow label="Raw quantity" value={formatNumber(results.rawItems)} />
          <ResultRow label="Quantity with waste" value={formatNumber(results.itemsWithWaste)} />
          <ResultRow label="Quantity to buy" value={`${results.itemsToBuy}`} />
          <ResultRow label="Gross purchased coverage" value={`${formatNumber(results.grossCoverage)} sq ft`} />
          <ResultRow label="Effective total coverage" value={`${formatNumber(results.effectiveTotalCoverage)} sq ft`} />
          <ResultRow label="Extra effective coverage" value={`${formatNumber(results.extraCoverage)} sq ft`} />
          <ResultRow label="Estimated material cost" value={formatCurrency(results.materialCost)} />
          <ResultRow label="Cost per square foot" value={formatCurrency(results.costPerSquareFoot)} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This calculator estimates material quantity only. Confirm reinforcement
          requirements, mesh size, overlap, placement, and code requirements before ordering.
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
