"use client";

import { useMemo, useState } from "react";

export default function GravelCostPerTonClient() {
  const [tonsNeeded, setTonsNeeded] = useState("10");
  const [pricePerTon, setPricePerTon] = useState("45");
  const [wastePercent, setWastePercent] = useState("10");
  const [deliveryFee, setDeliveryFee] = useState("125");
  const [taxPercent, setTaxPercent] = useState("0");
  const [laborCost, setLaborCost] = useState("200");
  const [equipmentCost, setEquipmentCost] = useState("0");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const tons = toNumber(tonsNeeded);
    const price = toNumber(pricePerTon);
    const waste = toNumber(wastePercent);
    const delivery = toNumber(deliveryFee);
    const taxRate = toNumber(taxPercent);
    const labor = toNumber(laborCost);
    const equipment = toNumber(equipmentCost);

    const wasteMultiplier = 1 + waste / 100;
    const tonsWithWaste = tons * wasteMultiplier;
    const materialCost = tonsWithWaste * price;
    const taxAmount = materialCost * (taxRate / 100);
    const totalCost = materialCost + delivery + taxAmount + labor + equipment;
    const effectiveCostPerTon = tonsWithWaste > 0 ? totalCost / tonsWithWaste : 0;

    const smallTruckLoads = tonsWithWaste > 0 ? Math.ceil(tonsWithWaste / 5) : 0;
    const standardTruckLoads = tonsWithWaste > 0 ? Math.ceil(tonsWithWaste / 10) : 0;
    const largeTruckLoads = tonsWithWaste > 0 ? Math.ceil(tonsWithWaste / 15) : 0;

    return {
      tons,
      tonsWithWaste,
      materialCost,
      delivery,
      taxAmount,
      labor,
      equipment,
      totalCost,
      effectiveCostPerTon,
      smallTruckLoads,
      standardTruckLoads,
      largeTruckLoads,
    };
  }, [
    tonsNeeded,
    pricePerTon,
    wastePercent,
    deliveryFee,
    taxPercent,
    laborCost,
    equipmentCost,
  ]);

  async function copyResults() {
    const resultText = `Numeravo Gravel Cost Per Ton Estimate
Base Tons Needed: ${formatNumber(results.tons)} tons
Waste: ${wastePercent}%
Tons With Waste: ${formatNumber(results.tonsWithWaste)} tons
Price Per Ton: ${formatCurrency(toNumber(pricePerTon))}
Material Cost: ${formatCurrency(results.materialCost)}
Delivery Fee: ${formatCurrency(results.delivery)}
Tax: ${formatCurrency(results.taxAmount)}
Labor / Spreading: ${formatCurrency(results.labor)}
Equipment Cost: ${formatCurrency(results.equipment)}
Estimated Total Cost: ${formatCurrency(results.totalCost)}
Effective Cost Per Ton: ${formatCurrency(results.effectiveCostPerTon)}
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
              Gravel Cost Per Ton Calculator
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Estimate material cost, delivery, and total gravel cost
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
              Enter tons needed, supplier price per ton, waste, delivery, tax,
              labor, and equipment costs to estimate the real project total.
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
            label="Tons Needed"
            value={tonsNeeded}
            onChange={setTonsNeeded}
            suffix="tons"
          />

          <NumberInput
            label="Price Per Ton"
            value={pricePerTon}
            onChange={setPricePerTon}
            prefix="$"
            suffix="/ ton"
          />

          <NumberInput
            label="Waste Percentage"
            value={wastePercent}
            onChange={setWastePercent}
            suffix="%"
          />

          <NumberInput
            label="Delivery Fee"
            value={deliveryFee}
            onChange={setDeliveryFee}
            prefix="$"
          />

          <NumberInput
            label="Sales Tax"
            value={taxPercent}
            onChange={setTaxPercent}
            suffix="%"
          />

          <NumberInput
            label="Labor / Spreading"
            value={laborCost}
            onChange={setLaborCost}
            prefix="$"
          />

          <NumberInput
            label="Equipment Cost"
            value={equipmentCost}
            onChange={setEquipmentCost}
            prefix="$"
          />
        </div>

        <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">
            Quick price examples
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PresetButton label="Budget gravel" value="$30/ton" onClick={() => setPricePerTon("30")} />
            <PresetButton label="Common gravel" value="$45/ton" onClick={() => setPricePerTon("45")} />
            <PresetButton label="Premium stone" value="$65/ton" onClick={() => setPricePerTon("65")} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold">Results</h2>

        <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total gravel cost</p>

          <p className="mt-2 text-4xl font-bold text-[#F97316]">
            {formatCurrency(results.totalCost)}
          </p>

          <p className="mt-2 text-sm text-[#A0AEC0]">
            Includes material, waste, delivery, tax, labor, and equipment.
          </p>
        </div>

        <div className="mt-5 space-y-4">
          <ResultRow
            label="Base Tons Needed"
            value={`${formatNumber(results.tons)} tons`}
          />

          <ResultRow
            label="Tons With Waste"
            value={`${formatNumber(results.tonsWithWaste)} tons`}
            highlight
          />

          <ResultRow
            label="Material Cost"
            value={formatCurrency(results.materialCost)}
            highlight
          />

          <ResultRow label="Delivery Fee" value={formatCurrency(results.delivery)} />
          <ResultRow label="Tax" value={formatCurrency(results.taxAmount)} />
          <ResultRow label="Labor / Spreading" value={formatCurrency(results.labor)} />
          <ResultRow label="Equipment Cost" value={formatCurrency(results.equipment)} />

          <ResultRow
            label="Estimated Total"
            value={formatCurrency(results.totalCost)}
            highlight
          />

          <ResultRow
            label="Effective Cost Per Ton"
            value={formatCurrency(results.effectiveCostPerTon)}
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
            Supplier price per ton is usually material-only. Delivery, taxes,
            minimum order fees, spreading, equipment, and compaction can change
            the true installed cost.
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

function PresetButton({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-[#1F2937] bg-[#121826] p-3 text-left transition hover:border-[#F97316]"
    >
      <span className="block text-sm font-semibold text-white">{label}</span>
      <span className="mt-1 block text-sm text-[#A0AEC0]">{value}</span>
    </button>
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
