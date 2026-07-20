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
  const [shortLoadFee, setShortLoadFee] = useState("0");

  const [baseDepth, setBaseDepth] = useState("4");
  const [basePricePerTon, setBasePricePerTon] = useState("45");
  const [baseTonsPerCubicYard, setBaseTonsPerCubicYard] = useState("1.4");

  const [rebarPerSqFt, setRebarPerSqFt] = useState("1.5");
  const [laborPerSqFt, setLaborPerSqFt] = useState("4");
  const [prepPerSqFt, setPrepPerSqFt] = useState("2");

  const results = useMemo(() => {
    const lengthNumber = toNumber(length);
    const widthNumber = toNumber(width);
    const thicknessNumber = toNumber(thickness);
    const wasteNumber = toNumber(wastePercent);
    const priceNumber = toNumber(pricePerYard);
    const deliveryNumber = toNumber(deliveryFee);
    const shortLoadNumber = toNumber(shortLoadFee);

    const area = lengthNumber * widthNumber;
    const cubicFeet = area * (thicknessNumber / 12);
    const cubicYards = cubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + wasteNumber / 100);
    const concreteCost = cubicYardsWithWaste * priceNumber;

    const baseCubicFeet = area * (toNumber(baseDepth) / 12);
    const baseCubicYards = baseCubicFeet / 27;
    const baseTons = baseCubicYards * toNumber(baseTonsPerCubicYard);
    const baseCost = baseTons * toNumber(basePricePerTon);

    const rebarCost = area * toNumber(rebarPerSqFt);
    const laborCost = area * toNumber(laborPerSqFt);
    const prepCost = area * toNumber(prepPerSqFt);

    const totalCost =
      concreteCost +
      deliveryNumber +
      shortLoadNumber +
      baseCost +
      rebarCost +
      laborCost +
      prepCost;

    const costPerSqFt = area > 0 ? totalCost / area : 0;

    return {
      area,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      concreteCost,
      baseCubicYards,
      baseTons,
      baseCost,
      rebarCost,
      laborCost,
      prepCost,
      totalCost,
      costPerSqFt,
    };
  }, [
    length,
    width,
    thickness,
    wastePercent,
    pricePerYard,
    deliveryFee,
    shortLoadFee,
    baseDepth,
    basePricePerTon,
    baseTonsPerCubicYard,
    rebarPerSqFt,
    laborPerSqFt,
    prepPerSqFt,
  ]);

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
              <NumberInput label="Short-Load Fee" value={shortLoadFee} onChange={setShortLoadFee} prefix="$" />
              <NumberInput label="Base Depth" value={baseDepth} onChange={setBaseDepth} suffix="in" />
              <NumberInput label="Base Price" value={basePricePerTon} onChange={setBasePricePerTon} prefix="$" suffix="/ ton" />
              <NumberInput label="Base Tons Per Yard" value={baseTonsPerCubicYard} onChange={setBaseTonsPerCubicYard} suffix="tons / yd³" />
              <NumberInput label="Rebar / Mesh" value={rebarPerSqFt} onChange={setRebarPerSqFt} prefix="$" suffix="/ sq ft" />
              <NumberInput label="Labor" value={laborPerSqFt} onChange={setLaborPerSqFt} prefix="$" suffix="/ sq ft" />
              <NumberInput label="Prep" value={prepPerSqFt} onChange={setPrepPerSqFt} prefix="$" suffix="/ sq ft" />
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
              <ResultRow label="Base Material" value={formatCurrency(results.baseCost)} />
              <ResultRow label="Base Tons" value={`${formatNumber(results.baseTons)} tons`} />
              <ResultRow label="Rebar / Mesh" value={formatCurrency(results.rebarCost)} />
              <ResultRow label="Labor" value={formatCurrency(results.laborCost)} />
              <ResultRow label="Prep" value={formatCurrency(results.prepCost)} />
              <ResultRow label="Cost Per Sq Ft" value={formatCurrency(results.costPerSqFt)} />
            </div>
          </aside>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <FormulaCard
            title="Concrete volume"
            formula="Length × Width × Thickness"
            text="Thickness is converted from inches to feet before calculating cubic feet and cubic yards."
          />

          <FormulaCard
            title="Concrete material cost"
            formula="Cubic Yards With Waste × Price Per Yard"
            text="Waste helps account for uneven subgrade, over-excavation, spillage, and ordering buffer."
          />

          <FormulaCard
            title="Total installed estimate"
            formula="Concrete + Base + Rebar + Labor + Prep + Fees"
            text="A realistic concrete estimate includes more than ready-mix material."
          />
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Concrete cost breakdown</h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Concrete project pricing usually includes ready-mix concrete, delivery,
            base material, reinforcement, labor, preparation, and job-specific fees.
            This calculator separates those cost layers so you can see what drives
            the final estimate.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BreakdownCard
              label="Concrete"
              value={formatCurrency(results.concreteCost)}
              text={`${formatNumber(results.cubicYardsWithWaste)} cubic yards with waste`}
            />

            <BreakdownCard
              label="Base material"
              value={formatCurrency(results.baseCost)}
              text={`${formatNumber(results.baseTons)} tons estimated`}
            />

            <BreakdownCard
              label="Rebar / mesh"
              value={formatCurrency(results.rebarCost)}
              text="Planning allowance per square foot"
            />

            <BreakdownCard
              label="Labor + prep"
              value={formatCurrency(results.laborCost + results.prepCost)}
              text="Installed-cost allowance"
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Common concrete project sizes</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CommonSizeCard
              title="10 × 10 slab"
              area="100 sq ft"
              use="Small pad, shed base, or utility slab"
            />

            <CommonSizeCard
              title="12 × 20 patio"
              area="240 sq ft"
              use="Backyard patio or outdoor seating area"
            />

            <CommonSizeCard
              title="20 × 20 garage"
              area="400 sq ft"
              use="Garage floor slab or shop pad"
            />

            <CommonSizeCard
              title="20 × 30 driveway"
              area="600 sq ft"
              use="Residential driveway planning"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to use this concrete cost calculator
            </h2>

            <ol className="mt-5 space-y-3 text-sm leading-7 text-[#A0AEC0]">
              <li>1. Enter the project length, width, and concrete thickness.</li>
              <li>2. Set your concrete price per cubic yard and waste percentage.</li>
              <li>3. Add delivery and short-load fees if they apply.</li>
              <li>4. Include base depth, base price, reinforcement, labor, and prep.</li>
              <li>5. Review the estimated total and cost per square foot.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common cost mistakes</h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#A0AEC0]">
              <li>• Estimating only concrete yards and forgetting base material.</li>
              <li>• Not adding waste for uneven ground, form variation, or spillage.</li>
              <li>• Forgetting delivery, short-load, or pump truck fees.</li>
              <li>• Leaving out rebar, wire mesh, forms, labor, and finishing.</li>
              <li>• Using national averages without checking local supplier pricing.</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related concrete calculators</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume for slabs, footings, piers, walls, columns, stairs, and curbs."
            />

            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost."
            />

            <RelatedLink
              href="/construction/wire-mesh-calculator"
              title="Wire Mesh Calculator"
              text="Estimate welded wire mesh sheets or rolls, overlap, waste, coverage, and material cost."
            />

            <RelatedLink
              href="/construction/rebar-weight-calculator"
              title="Rebar Weight Calculator"
              text="Estimate rebar weight by size, length, quantity, pounds, tons, and material cost."
            />

            <RelatedLink
              href="/construction/rebar-spacing-for-concrete-slab"
              title="Rebar Spacing for Concrete Slab"
              text="Estimate slab rebar spacing, grid layout, bar count, linear feet, weight, and material cost."
            />

            <RelatedLink
              href="/construction/concrete-yard-calculator"
              title="Concrete Yard Calculator"
              text="Calculate cubic yards of concrete for slabs, patios, driveways, footings, walls, piers, pads, and known-volume projects."
            />

            <RelatedLink
              href="/construction/how-much-concrete-do-i-need"
              title="How Much Concrete Do I Need?"
              text="Estimate concrete yards, bags, ready-mix loads, waste allowance, weight, and material cost for common concrete projects."
            />

            <RelatedLink
              href="/construction/12x12-concrete-slab-cost"
              title="12x12 Concrete Slab Cost Calculator"
              text="Estimate concrete yards, ready-mix cost, base material, reinforcement, forms, labor, delivery fees, and total cost for a 144 square foot slab."
            />

            <RelatedLink
              href="/construction/10x10-concrete-slab-cost"
              title="10x10 Concrete Slab Cost Calculator"
              text="Estimate concrete yards, ready-mix cost, base material, reinforcement, forms, labor, delivery fees, and total cost for a 100 square foot slab."
            />

            <RelatedLink
              href="/construction/concrete-waste-calculator"
              title="Concrete Waste Calculator"
              text="Estimate extra concrete yards, waste cost, final order quantity, truckload impact, and bag count impact."
            />

            <RelatedLink
              href="/construction/concrete-short-load-fee-calculator"
              title="Concrete Short Load Fee Calculator"
              text="Estimate short-load charges for small ready-mix orders and compare exact yards, supplier minimum yards, or bagged concrete."
            />

            <RelatedLink
              href="/construction/concrete-delivery-cost-calculator"
              title="Concrete Delivery Cost Calculator"
              text="Estimate ready-mix delivery fees, short-load charges, distance fees, waiting time, tax, and delivered cost per yard."
            />

            <RelatedLink
              href="/construction/concrete-cost-per-yard"
              title="Concrete Cost Per Yard Calculator"
              text="Estimate ready-mix concrete price per cubic yard, delivery fees, short-load charges, fuel fees, waste, tax, and total delivered cost."
            />

            <RelatedLink
              href="/construction/concrete-cure-time"
              title="Concrete Cure Time Calculator"
              text="Estimate when new concrete may be ready for walking, light use, vehicles, sealing, and full cure."
            />

            <RelatedLink
              href="/construction/concrete-slab-thickness"
              title="Concrete Slab Thickness Calculator"
              text="Estimate recommended slab thickness, concrete yards, base depth, reinforcement notes, weight, and material cost."
            />

<RelatedLink
              href="/construction/concrete-mix-ratio"
              title="Concrete Mix Ratio Calculator"
              text="Estimate cement, sand, gravel, water, cement bags, and material quantities for common concrete mix ratios."
            />

            <RelatedLink
              href="/construction/concrete-truckload-calculator"
              title="Concrete Truckload Calculator"
              text="Estimate ready-mix truckloads, order quantity, delivery fees, short-load fees, and total concrete delivery cost."
            />

            <RelatedLink
              href="/construction/concrete-stairs-calculator"
              title="Concrete Stairs Calculator"
              text="Estimate concrete stair yards, step count, riser height, tread depth, formwork, labor, delivery, and total cost."
            />

            <RelatedLink
              href="/construction/concrete-pad-calculator"
              title="Concrete Pad Calculator"
              text="Estimate concrete pad yards, base material, forms, reinforcement, labor, delivery, and total cost."
            />

            <RelatedLink
              href="/construction/concrete-sidewalk-calculator"
              title="Concrete Sidewalk Calculator"
              text="Estimate concrete sidewalk yards, base material, forms, labor, finishing, delivery, and total cost."
            />

            <RelatedLink
              href="/construction/concrete-patio-calculator"
              title="Concrete Patio Calculator"
              text="Estimate concrete patio yards, base material, reinforcement, labor, finishing, delivery, and total cost."
            />

            <RelatedLink
              href="/construction/concrete-driveway-calculator"
              title="Concrete Driveway Calculator"
              text="Estimate concrete driveway yards, base material, reinforcement, labor, delivery, and total cost."
            />

            <RelatedLink
              href="/construction/rebar-calculator"
              title="Rebar Calculator"
              text="Estimate rebar pieces, spacing, linear feet, stock length, weight, waste, and material cost."
            />

            <RelatedLink
              href="/construction/concrete-bag-calculator"
              title="Concrete Bag Calculator"
              text="Estimate bagged concrete needs, total bags, cubic yards, waste, and material cost for small concrete projects."
            />

            <RelatedLink
              href="/construction/concrete-control-joint-spacing"
              title="Concrete Control Joint Spacing Calculator"
              text="Estimate control joint spacing, saw cut depth, panel layout, and total cut length for concrete slabs."
            />

            <RelatedLink
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete needed for patios, driveways, garage floors, and shed pads."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, cubic yards, tons, waste, and cost."
            />

            <RelatedLink
              href="/construction/base-for-concrete-slab-depth"
              title="Base for Concrete Slab Depth"
              text="Learn common gravel base depths for slabs, patios, driveways, and shed pads."
            />

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="Browse all Numeravo construction calculators and project guides."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Concrete cost calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How much does concrete cost per cubic yard?"
              answer="Concrete pricing varies by region, supplier, mix design, delivery distance, fuel cost, and order size. Use your local ready-mix price for the most accurate estimate."
            />

            <FAQItem
              question="Should I include gravel base in a concrete estimate?"
              answer="Yes for many slabs, patios, driveways, shed pads, and garage slabs. A compacted gravel or crushed stone base can improve drainage, support, and subgrade stability."
            />

            <FAQItem
              question="Does this calculator include rebar or wire mesh?"
              answer="Yes. The calculator includes a reinforcement cost per square foot field for estimating rebar, wire mesh, chairs, and related reinforcement materials."
            />

            <FAQItem
              question="Why is total project cost higher than concrete material cost?"
              answer="Concrete material is only one part of the project. Base material, reinforcement, labor, finishing, preparation, delivery, and fees can significantly increase the installed cost."
            />

            <FAQItem
              question="Is this calculator a contractor quote?"
              answer="No. This is a planning estimate. Confirm final pricing with local suppliers, contractors, or qualified professionals, especially for structural or code-regulated concrete work."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function FormulaCard({
  title,
  formula,
  text,
}: {
  title: string;
  formula: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4 text-sm font-semibold text-[#F97316]">
        {formula}
      </p>
      <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function BreakdownCard({
  label,
  value,
  text,
}: {
  label: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <p className="text-sm text-[#A0AEC0]">{label}</p>
      <p className="mt-2 text-xl font-bold text-[#F97316]">{value}</p>
      <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function CommonSizeCard({
  title,
  area,
  use,
}: {
  title: string;
  area: string;
  use: string;
}) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-xl font-bold text-[#F97316]">{area}</p>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{use}</p>
    </div>
  );
}

function RelatedLink({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5 transition hover:border-[#F97316]"
    >
      <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </Link>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[#1F2937] pb-5 last:border-b-0 last:pb-0">
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
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
