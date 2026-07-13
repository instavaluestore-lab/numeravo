"use client";

import { useMemo, useState } from "react";

export default function GravelCostCalculatorClient() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("20");
  const [depth, setDepth] = useState("4");
  const [wastePercent, setWastePercent] = useState("10");
  const [tonsPerCubicYard, setTonsPerCubicYard] = useState("1.4");
  const [pricePerTon, setPricePerTon] = useState("45");
  const [deliveryFee, setDeliveryFee] = useState("125");
  const [laborCost, setLaborCost] = useState("0");
  const [sitePrepCost, setSitePrepCost] = useState("0");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const lengthNumber = toNumber(length);
    const widthNumber = toNumber(width);
    const depthNumber = toNumber(depth);
    const waste = toNumber(wastePercent);
    const density = toNumber(tonsPerCubicYard);
    const price = toNumber(pricePerTon);
    const delivery = toNumber(deliveryFee);
    const labor = toNumber(laborCost);
    const prep = toNumber(sitePrepCost);

    const squareFeet = lengthNumber * widthNumber;
    const depthFeet = depthNumber / 12;
    const cubicFeet = squareFeet * depthFeet;
    const cubicYards = cubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + waste / 100);
    const estimatedTons = cubicYardsWithWaste * density;
    const materialCost = estimatedTons * price;
    const totalCost = materialCost + delivery + labor + prep;
    const costPerSquareFoot = squareFeet > 0 ? totalCost / squareFeet : 0;

    const smallTruckLoads = estimatedTons > 0 ? Math.ceil(estimatedTons / 5) : 0;
    const standardTruckLoads =
      estimatedTons > 0 ? Math.ceil(estimatedTons / 10) : 0;
    const largeTruckLoads = estimatedTons > 0 ? Math.ceil(estimatedTons / 15) : 0;

    return {
      squareFeet,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      estimatedTons,
      materialCost,
      delivery,
      labor,
      prep,
      totalCost,
      costPerSquareFoot,
      smallTruckLoads,
      standardTruckLoads,
      largeTruckLoads,
    };
  }, [
    length,
    width,
    depth,
    wastePercent,
    tonsPerCubicYard,
    pricePerTon,
    deliveryFee,
    laborCost,
    sitePrepCost,
  ]);

  async function copyResults() {
    const resultText = `Numeravo Gravel Cost Estimate
Project Size: ${length} ft × ${width} ft
Depth: ${depth} in
Waste: ${wastePercent}%
Square Feet: ${formatNumber(results.squareFeet)} sq ft
Cubic Yards Before Waste: ${formatNumber(results.cubicYards)} yd³
Cubic Yards With Waste: ${formatNumber(results.cubicYardsWithWaste)} yd³
Estimated Tons: ${formatNumber(results.estimatedTons)} tons
Material Cost: ${formatCurrency(results.materialCost)}
Delivery Fee: ${formatCurrency(results.delivery)}
Labor / Spreading Cost: ${formatCurrency(results.labor)}
Site Prep Cost: ${formatCurrency(results.prep)}
Estimated Total Cost: ${formatCurrency(results.totalCost)}
Cost Per Square Foot: ${formatCurrency(results.costPerSquareFoot)}
Standard Dump Truck Loads: ${results.standardTruckLoads}`;

    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Cost Calculator
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Estimate gravel material, delivery, labor, and total cost
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
              Enter project size, gravel depth, density, price per ton,
              delivery, labor, and site prep costs to estimate a full gravel
              project budget.
            </p>
          </div>

          <button
            type="button"
            onClick={copyResults}
            className="rounded-xl border border-[#1F2937] px-4 py-2 text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
          >
            {copied ? "Copied" : "Copy Results"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <NumberInput
            label="Length"
            value={length}
            onChange={setLength}
            suffix="ft"
          />

          <NumberInput
            label="Width"
            value={width}
            onChange={setWidth}
            suffix="ft"
          />

          <NumberInput
            label="Depth"
            value={depth}
            onChange={setDepth}
            suffix="in"
          />

          <NumberInput
            label="Waste Percentage"
            value={wastePercent}
            onChange={setWastePercent}
            suffix="%"
          />

          <NumberInput
            label="Tons Per Cubic Yard"
            value={tonsPerCubicYard}
            onChange={setTonsPerCubicYard}
            suffix="tons / yd³"
          />

          <NumberInput
            label="Price Per Ton"
            value={pricePerTon}
            onChange={setPricePerTon}
            prefix="$"
            suffix="/ ton"
          />

          <NumberInput
            label="Delivery Fee"
            value={deliveryFee}
            onChange={setDeliveryFee}
            prefix="$"
          />

          <NumberInput
            label="Labor / Spreading"
            value={laborCost}
            onChange={setLaborCost}
            prefix="$"
          />

          <NumberInput
            label="Site Prep"
            value={sitePrepCost}
            onChange={setSitePrepCost}
            prefix="$"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold">Cost Results</h2>

        <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total gravel cost</p>

          <p className="mt-2 text-4xl font-bold text-[#F97316]">
            {formatCurrency(results.totalCost)}
          </p>

          <p className="mt-2 text-sm text-[#A0AEC0]">
            Includes material, delivery, labor, and site prep.
          </p>
        </div>

        <div className="mt-5 space-y-4">
          <ResultRow
            label="Project Area"
            value={`${formatNumber(results.squareFeet)} sq ft`}
          />

          <ResultRow
            label="Cubic Yards Before Waste"
            value={`${formatNumber(results.cubicYards)} yd³`}
          />

          <ResultRow
            label="Cubic Yards With Waste"
            value={`${formatNumber(results.cubicYardsWithWaste)} yd³`}
            highlight
          />

          <ResultRow
            label="Estimated Tons"
            value={`${formatNumber(results.estimatedTons)} tons`}
            highlight
          />

          <ResultRow
            label="Material Cost"
            value={formatCurrency(results.materialCost)}
          />

          <ResultRow
            label="Delivery Fee"
            value={formatCurrency(results.delivery)}
          />

          <ResultRow
            label="Labor / Spreading"
            value={formatCurrency(results.labor)}
          />

          <ResultRow
            label="Site Prep"
            value={formatCurrency(results.prep)}
          />

          <ResultRow
            label="Estimated Total"
            value={formatCurrency(results.totalCost)}
            highlight
          />

          <ResultRow
            label="Cost Per Square Foot"
            value={formatCurrency(results.costPerSquareFoot)}
            highlight
          />

          <ResultRow
            label="Small Dump Truck Loads"
            value={`${results.smallTruckLoads} load${results.smallTruckLoads === 1 ? "" : "s"} at about 5 tons per load`}
          />

          <ResultRow
            label="Standard Dump Truck Loads"
            value={`${results.standardTruckLoads} load${results.standardTruckLoads === 1 ? "" : "s"} at about 10 tons per load`}
          />

          <ResultRow
            label="Large Dump Truck / Tri-Axle Loads"
            value={`${results.largeTruckLoads} load${results.largeTruckLoads === 1 ? "" : "s"} at about 15 tons per load`}
          />
        </div>

        <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Gravel costs vary by supplier, material type, delivery distance,
            truck capacity, site access, moisture, and local pricing. Confirm
            final quantity and delivery terms with your gravel yard.
          </p>
        </div>
      </div>
    </section>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>

      <div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F19]">
        {prefix ? (
          <span className="flex items-center border-r border-[#1F2937] px-3 text-sm text-[#A0AEC0]">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#A0AEC0]"
        />

        {suffix ? (
          <span className="flex items-center border-l border-[#1F2937] px-3 text-sm text-[#A0AEC0]">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span
        className={`text-right text-sm font-semibold ${
          highlight ? "text-[#F97316]" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
