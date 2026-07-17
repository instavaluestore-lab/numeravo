"use client";

import { useMemo, useState } from "react";

type ProjectType = "Slab / pad" | "Post holes" | "Footing";

const bagOptions = [
  { label: "40 lb bag", weight: 40, yieldCubicFeet: 0.3 },
  { label: "50 lb bag", weight: 50, yieldCubicFeet: 0.375 },
  { label: "60 lb bag", weight: 60, yieldCubicFeet: 0.45 },
  { label: "80 lb bag", weight: 80, yieldCubicFeet: 0.6 },
  { label: "Custom yield", weight: 0, yieldCubicFeet: 0.6 },
];

export default function ConcreteBagCalculatorClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Slab / pad");

  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [depthInches, setDepthInches] = useState(4);

  const [holeCount, setHoleCount] = useState(4);
  const [holeDiameterInches, setHoleDiameterInches] = useState(12);
  const [holeDepthInches, setHoleDepthInches] = useState(24);

  const [footingLength, setFootingLength] = useState(20);
  const [footingWidthInches, setFootingWidthInches] = useState(12);
  const [footingDepthInches, setFootingDepthInches] = useState(12);

  const [bagSize, setBagSize] = useState("80 lb bag");
  const [customYield, setCustomYield] = useState(0.6);
  const [wastePercent, setWastePercent] = useState(10);
  const [pricePerBag, setPricePerBag] = useState(6.5);
  const [copied, setCopied] = useState(false);

  const selectedBag = bagOptions.find((bag) => bag.label === bagSize) ?? bagOptions[3];
  const bagYield = bagSize === "Custom yield" ? customYield : selectedBag.yieldCubicFeet;

  const results = useMemo(() => {
    let baseCubicFeet = 0;

    if (projectType === "Slab / pad") {
      baseCubicFeet = length * width * (depthInches / 12);
    }

    if (projectType === "Post holes") {
      const radiusFeet = holeDiameterInches / 12 / 2;
      const depthFeet = holeDepthInches / 12;
      baseCubicFeet = Math.PI * radiusFeet * radiusFeet * depthFeet * holeCount;
    }

    if (projectType === "Footing") {
      baseCubicFeet =
        footingLength * (footingWidthInches / 12) * (footingDepthInches / 12);
    }

    const cubicFeetWithWaste = baseCubicFeet * (1 + wastePercent / 100);
    const cubicYards = baseCubicFeet / 27;
    const cubicYardsWithWaste = cubicFeetWithWaste / 27;
    const exactBags = bagYield > 0 ? cubicFeetWithWaste / bagYield : 0;
    const roundedBags = Math.ceil(exactBags);
    const totalCost = roundedBags * pricePerBag;
    const totalWeight =
      selectedBag.weight > 0 ? roundedBags * selectedBag.weight : 0;

    return {
      baseCubicFeet,
      cubicFeetWithWaste,
      cubicYards,
      cubicYardsWithWaste,
      exactBags,
      roundedBags,
      totalCost,
      totalWeight,
    };
  }, [
    projectType,
    length,
    width,
    depthInches,
    holeCount,
    holeDiameterInches,
    holeDepthInches,
    footingLength,
    footingWidthInches,
    footingDepthInches,
    wastePercent,
    bagYield,
    pricePerBag,
    selectedBag.weight,
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

    if (type === "Slab / pad") {
      setLength(10);
      setWidth(10);
      setDepthInches(4);
    }

    if (type === "Post holes") {
      setHoleCount(4);
      setHoleDiameterInches(12);
      setHoleDepthInches(24);
    }

    if (type === "Footing") {
      setFootingLength(20);
      setFootingWidthInches(12);
      setFootingDepthInches(12);
    }
  }

  async function copyResults() {
    const text = `Concrete Bag Estimate
Project type: ${projectType}
Bag size: ${bagSize}
Bag yield: ${formatNumber(bagYield)} cubic feet
Base volume: ${formatNumber(results.baseCubicFeet)} cubic feet
With waste: ${formatNumber(results.cubicFeetWithWaste)} cubic feet
Cubic yards: ${formatNumber(results.cubicYardsWithWaste)} cubic yards
Exact bags: ${formatNumber(results.exactBags)}
Recommended bags: ${results.roundedBags}
Estimated cost: ${formatCurrency(results.totalCost)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">Calculate concrete bags</h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Choose a project type, enter dimensions, select a bag size, and estimate
          the number of bags, cubic yards, waste-adjusted volume, and material cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <PresetButton
            active={projectType === "Slab / pad"}
            label="Slab / pad"
            onClick={() => applyPreset("Slab / pad")}
          />
          <PresetButton
            active={projectType === "Post holes"}
            label="Post holes"
            onClick={() => applyPreset("Post holes")}
          />
          <PresetButton
            active={projectType === "Footing"}
            label="Footing"
            onClick={() => applyPreset("Footing")}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projectType === "Slab / pad" && (
            <>
              <NumberInput label="Length" suffix="ft" value={length} setValue={setLength} />
              <NumberInput label="Width" suffix="ft" value={width} setValue={setWidth} />
              <NumberInput label="Depth" suffix="in" value={depthInches} setValue={setDepthInches} />
            </>
          )}

          {projectType === "Post holes" && (
            <>
              <NumberInput label="Number of holes" suffix="holes" value={holeCount} setValue={setHoleCount} />
              <NumberInput label="Hole diameter" suffix="in" value={holeDiameterInches} setValue={setHoleDiameterInches} />
              <NumberInput label="Hole depth" suffix="in" value={holeDepthInches} setValue={setHoleDepthInches} />
            </>
          )}

          {projectType === "Footing" && (
            <>
              <NumberInput label="Footing length" suffix="ft" value={footingLength} setValue={setFootingLength} />
              <NumberInput label="Footing width" suffix="in" value={footingWidthInches} setValue={setFootingWidthInches} />
              <NumberInput label="Footing depth" suffix="in" value={footingDepthInches} setValue={setFootingDepthInches} />
            </>
          )}

          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Bag size</span>
            <select
              value={bagSize}
              onChange={(event) => setBagSize(event.target.value)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              {bagOptions.map((bag) => (
                <option key={bag.label}>{bag.label}</option>
              ))}
            </select>
          </label>

          {bagSize === "Custom yield" && (
            <NumberInput
              label="Custom bag yield"
              suffix="ft³"
              value={customYield}
              setValue={setCustomYield}
            />
          )}

          <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Price per bag" suffix="$" value={pricePerBag} setValue={setPricePerBag} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Concrete bag estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Recommended bags</p>
          <p className="mt-2 text-5xl font-bold text-white">{results.roundedBags}</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            Based on {bagSize.toLowerCase()} and {wastePercent}% waste.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Base volume" value={`${formatNumber(results.baseCubicFeet)} ft³`} />
          <ResultRow label="Volume with waste" value={`${formatNumber(results.cubicFeetWithWaste)} ft³`} />
          <ResultRow label="Cubic yards with waste" value={`${formatNumber(results.cubicYardsWithWaste)} yd³`} />
          <ResultRow label="Exact bags" value={formatNumber(results.exactBags)} />
          <ResultRow label="Rounded bags to buy" value={`${results.roundedBags} bags`} />
          <ResultRow label="Estimated material cost" value={formatCurrency(results.totalCost)} />
          {results.totalWeight > 0 && (
            <ResultRow label="Approx. total bag weight" value={`${formatNumber(results.totalWeight, 0)} lb`} />
          )}
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          Bag yields vary by brand and mix type. Check the bag label before ordering,
          and round up so the pour is not interrupted.
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
        <span className="flex items-center border-l border-[#1F2937] px-3 text-sm text-[#A0AEC0]">{suffix}</span>
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
