"use client";

import { useMemo, useState } from "react";

export default function DrainageRockCalculatorClient() {
  const [projectType, setProjectType] = useState("French drain");
  const [length, setLength] = useState(50);
  const [widthInches, setWidthInches] = useState(18);
  const [depthInches, setDepthInches] = useState(18);
  const [pipeDiameterInches, setPipeDiameterInches] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);
  const [tonsPerCubicYard, setTonsPerCubicYard] = useState(1.35);
  const [pricePerTon, setPricePerTon] = useState(65);
  const [deliveryFee, setDeliveryFee] = useState(95);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const widthFeet = widthInches / 12;
    const depthFeet = depthInches / 12;
    const pipeDiameterFeet = pipeDiameterInches / 12;

    const trenchArea = length * widthFeet;
    const grossCubicFeet = length * widthFeet * depthFeet;

    const pipeRadiusFeet = pipeDiameterFeet / 2;
    const pipeCubicFeet = Math.PI * pipeRadiusFeet * pipeRadiusFeet * length;

    const netRockCubicFeet = Math.max(grossCubicFeet - pipeCubicFeet, 0);
    const cubicYards = netRockCubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + wastePercent / 100);
    const tons = cubicYardsWithWaste * tonsPerCubicYard;

    const materialCost = tons * pricePerTon;
    const totalCost = materialCost + deliveryFee;
    const costPerLinearFoot = length > 0 ? totalCost / length : 0;
    const truckLoads = tons / 10;

    const fabricWidthFeet = widthFeet + depthFeet * 2 + 1;
    const fabricSquareFeet = length * fabricWidthFeet;
    const pipeLength = length * 1.05;

    return {
      widthFeet,
      depthFeet,
      trenchArea,
      grossCubicFeet,
      pipeCubicFeet,
      netRockCubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      tons,
      materialCost,
      totalCost,
      costPerLinearFoot,
      truckLoads,
      fabricSquareFeet,
      pipeLength,
    };
  }, [
    length,
    widthInches,
    depthInches,
    pipeDiameterInches,
    wastePercent,
    tonsPerCubicYard,
    pricePerTon,
    deliveryFee,
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

  function applyPreset(type: string) {
    setProjectType(type);

    if (type === "French drain") {
      setWidthInches(18);
      setDepthInches(18);
      setPipeDiameterInches(4);
    }

    if (type === "Drainage trench") {
      setWidthInches(12);
      setDepthInches(18);
      setPipeDiameterInches(4);
    }

    if (type === "Dry well stone bed") {
      setWidthInches(72);
      setDepthInches(24);
      setPipeDiameterInches(0);
    }

    if (type === "Retaining wall drainage") {
      setWidthInches(12);
      setDepthInches(24);
      setPipeDiameterInches(4);
    }

    if (type === "Landscape drainage area") {
      setWidthInches(48);
      setDepthInches(6);
      setPipeDiameterInches(0);
    }
  }

  async function copyResults() {
    const text = `Drainage Rock Estimate
Project type: ${projectType}
Length: ${length} ft
Trench width: ${widthInches} in
Drain depth: ${depthInches} in
Pipe diameter: ${pipeDiameterInches} in
Gross trench volume: ${formatNumber(results.grossCubicFeet)} cubic feet
Pipe displacement: ${formatNumber(results.pipeCubicFeet)} cubic feet
Net rock volume: ${formatNumber(results.netRockCubicFeet)} cubic feet
Base volume: ${formatNumber(results.cubicYards)} cubic yards
With waste: ${formatNumber(results.cubicYardsWithWaste)} cubic yards
Estimated tons: ${formatNumber(results.tons)} tons
Estimated filter fabric: ${formatNumber(results.fabricSquareFeet)} sq ft
Estimated pipe length: ${formatNumber(results.pipeLength)} ft
Material cost: ${formatCurrency(results.materialCost)}
Delivery: ${formatCurrency(deliveryFee)}
Estimated total: ${formatCurrency(results.totalCost)}
Cost per linear foot: ${formatCurrency(results.costPerLinearFoot)}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">Drainage Rock Calculator</h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter trench dimensions in feet and inches. Results update instantly for rock volume, tons, fabric, pipe length, delivery, and estimated cost.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-white">Project type</span>
            <select
              value={projectType}
              onChange={(event) => applyPreset(event.target.value)}
              className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option>French drain</option>
              <option>Drainage trench</option>
              <option>Dry well stone bed</option>
              <option>Retaining wall drainage</option>
              <option>Landscape drainage area</option>
            </select>
          </label>

          <NumberInput label="Drain length" suffix="ft" value={length} setValue={setLength} />
          <NumberInput label="Trench width" suffix="in" value={widthInches} setValue={setWidthInches} />
          <NumberInput label="Drain depth" suffix="in" value={depthInches} setValue={setDepthInches} />
          <NumberInput label="Pipe diameter" suffix="in" value={pipeDiameterInches} setValue={setPipeDiameterInches} />
          <NumberInput label="Waste / overage" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Tons per cubic yard" suffix="tons/yd³" value={tonsPerCubicYard} setValue={setTonsPerCubicYard} />
          <NumberInput label="Rock price" suffix="$/ton" value={pricePerTon} setValue={setPricePerTon} />
          <NumberInput label="Delivery fee" suffix="$" value={deliveryFee} setValue={setDeliveryFee} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <PresetButton label="French drain" onClick={() => applyPreset("French drain")} />
          <PresetButton label="Wall drainage" onClick={() => applyPreset("Retaining wall drainage")} />
          <PresetButton label="Dry well bed" onClick={() => applyPreset("Dry well stone bed")} />
          <PresetButton label="Drainage area" onClick={() => applyPreset("Landscape drainage area")} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Estimated drainage materials</h3>

        <div className="mt-5 space-y-3">
          <ResultRow label="Trench area" value={`${formatNumber(results.trenchArea)} sq ft`} />
          <ResultRow label="Gross trench volume" value={`${formatNumber(results.grossCubicFeet)} ft³`} />
          <ResultRow label="Pipe displacement" value={`${formatNumber(results.pipeCubicFeet)} ft³`} />
          <ResultRow label="Net rock volume" value={`${formatNumber(results.netRockCubicFeet)} ft³`} />
          <ResultRow label="Cubic yards" value={`${formatNumber(results.cubicYards)} yd³`} />
          <ResultRow label="Cubic yards with waste" value={`${formatNumber(results.cubicYardsWithWaste)} yd³`} />
          <ResultRow label="Estimated tons" value={`${formatNumber(results.tons)} tons`} />
          <ResultRow label="Estimated fabric" value={`${formatNumber(results.fabricSquareFeet)} sq ft`} />
          <ResultRow label="Estimated pipe length" value={`${formatNumber(results.pipeLength)} ft`} />
          <ResultRow label="Truckloads" value={`${formatNumber(results.truckLoads)} loads`} />
          <ResultRow label="Material cost" value={formatCurrency(results.materialCost)} />
          <ResultRow label="Delivery" value={formatCurrency(deliveryFee)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total</p>
          <p className="mt-2 text-4xl font-bold text-white">{formatCurrency(results.totalCost)}</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            About {formatCurrency(results.costPerLinearFoot)} per linear foot.
          </p>
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          This estimate subtracts pipe displacement from the trench volume, then adds waste. Confirm trench slope, outlet location, filter fabric, pipe type, and local drainage requirements before ordering.
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
