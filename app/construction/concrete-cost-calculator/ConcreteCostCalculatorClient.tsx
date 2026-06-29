"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ConcreteCostCalculatorClient() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("20");
  const [thickness, setThickness] = useState("4");
  const [wastePercent, setWastePercent] = useState("10");
  const [pricePerYard, setPricePerYard] = useState("150");
  const [deliveryFee, setDeliveryFee] = useState("150");

  const results = useMemo(() => {
    const lengthNumber = toNumber(length);
    const widthNumber = toNumber(width);
    const thicknessNumber = toNumber(thickness);
    const wasteNumber = toNumber(wastePercent);
    const priceNumber = toNumber(pricePerYard);
    const deliveryNumber = toNumber(deliveryFee);

    const area = lengthNumber * widthNumber;
    const cubicFeet = area * (thicknessNumber / 12);
    const cubicYards = cubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + wasteNumber / 100);
    const concreteCost = cubicYardsWithWaste * priceNumber;
    const totalCost = concreteCost + deliveryNumber;
    const costPerSqFt = area > 0 ? totalCost / area : 0;

    return {
      area,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      concreteCost,
      totalCost,
      costPerSqFt,
    };
  }, [length, width, thickness, wastePercent, pricePerYard, deliveryFee]);

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
            Construction Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Concrete Cost Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate concrete cubic yards, ready-mix cost, delivery fees, and
            total project cost. This is the first working version. We will add
            base, rebar, labor, extras, FAQs, schema, and internal links after
            this build passes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Start Estimate
            </a>

            <Link
              href="/construction/concrete-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Concrete Volume Calculator
            </Link>
          </div>
        </div>

        <div
          id="calculator"
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]"
        >
          <section className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Concrete cost inputs</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <NumberInput label="Length" value={length} onChange={setLength} suffix="ft" />
              <NumberInput label="Width" value={width} onChange={setWidth} suffix="ft" />
              <NumberInput label="Thickness" value={thickness} onChange={setThickness} suffix="in" />
              <NumberInput label="Waste" value={wastePercent} onChange={setWastePercent} suffix="%" />
              <NumberInput label="Concrete Price" value={pricePerYard} onChange={setPricePerYard} prefix="$" suffix="/ yd³" />
              <NumberInput label="Delivery Fee" value={deliveryFee} onChange={setDeliveryFee} prefix="$" />
            </div>
          </section>

          <aside className="rounded-2xl border border-[#F97316] bg-[#121826] p-6 lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              Estimated Total
            </p>

            <p className="mt-3 text-4xl font-bold">
              {formatCurrency(results.totalCost)}
            </p>

            <div className="mt-6 space-y-3">
              <ResultRow label="Area" value={`${formatNumber(results.area)} sq ft`} />
              <ResultRow label="Concrete" value={`${formatNumber(results.cubicYardsWithWaste)} yd³`} />
              <ResultRow label="Material Cost" value={formatCurrency(results.concreteCost)} />
              <ResultRow label="Cost Per Sq Ft" value={formatCurrency(results.costPerSqFt)} />
            </div>
          </aside>
        </div>
      </section>
    </main>
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
      <span className="text-sm font-medium text-[#A0AEC0]">{label}</span>

      <div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F19]">
        {prefix && (
          <span className="border-r border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent px-4 py-3 text-white outline-none"
        />

        {suffix && (
          <span className="border-l border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-lg font-semibold text-white">{value}</span>
    </div>
  );
}

function toNumber(value: string) {
  const number = Number(value);

  if (Number.isNaN(number) || number < 0) {
    return 0;
  }

  return number;
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
    maximumFractionDigits: 2,
  }).format(value);
}
