"use client";

import { useMemo, useState } from "react";

type ProjectType = "slab" | "footing" | "pier";

const projectTypes: {
  id: ProjectType;
  label: string;
  description: string;
}[] = [
  {
    id: "slab",
    label: "Slab / Pad",
    description: "Best for patios, driveways, garage slabs, shed pads, and flat rectangular pours.",
  },
  {
    id: "footing",
    label: "Footing / Trench",
    description: "Best for strip footings, trenches, and foundation runs.",
  },
  {
    id: "pier",
    label: "Pier / Column",
    description: "Best for deck posts, fence posts, sonotubes, and round columns.",
  },
];

export default function ConcreteCalculatorPage() {
  const [projectType, setProjectType] = useState<ProjectType>("slab");

  const [lengthFeet, setLengthFeet] = useState("10");
  const [widthFeet, setWidthFeet] = useState("10");
  const [thicknessInches, setThicknessInches] = useState("4");

  const [footingLengthFeet, setFootingLengthFeet] = useState("40");
  const [footingWidthInches, setFootingWidthInches] = useState("12");
  const [footingDepthInches, setFootingDepthInches] = useState("12");

  const [pierDiameterInches, setPierDiameterInches] = useState("12");
  const [pierDepthFeet, setPierDepthFeet] = useState("3");
  const [pierQuantity, setPierQuantity] = useState("4");

  const [wastePercent, setWastePercent] = useState("10");
  const [pricePerCubicYard, setPricePerCubicYard] = useState("150");

  const results = useMemo(() => {
    const waste = toNumber(wastePercent);
    const price = toNumber(pricePerCubicYard);

    let cubicFeet = 0;
    let formulaLabel = "";

    if (projectType === "slab") {
      const length = toNumber(lengthFeet);
      const width = toNumber(widthFeet);
      const thicknessFeet = toNumber(thicknessInches) / 12;

      cubicFeet = length * width * thicknessFeet;
      formulaLabel = "Length × width × thickness";
    }

    if (projectType === "footing") {
      const length = toNumber(footingLengthFeet);
      const widthFeet = toNumber(footingWidthInches) / 12;
      const depthFeet = toNumber(footingDepthInches) / 12;

      cubicFeet = length * widthFeet * depthFeet;
      formulaLabel = "Length × width × depth";
    }

    if (projectType === "pier") {
      const diameterFeet = toNumber(pierDiameterInches) / 12;
      const radiusFeet = diameterFeet / 2;
      const depthFeet = toNumber(pierDepthFeet);
      const quantity = toNumber(pierQuantity);

      cubicFeet = Math.PI * radiusFeet * radiusFeet * depthFeet * quantity;
      formulaLabel = "π × radius² × depth × quantity";
    }

    const cubicYards = cubicFeet / 27;
    const cubicYardsWithWaste = cubicYards * (1 + waste / 100);
    const estimatedCost = cubicYardsWithWaste * price;

    return {
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      estimatedCost,
      formulaLabel,
    };
  }, [
    projectType,
    lengthFeet,
    widthFeet,
    thicknessInches,
    footingLengthFeet,
    footingWidthInches,
    footingDepthInches,
    pierDiameterInches,
    pierDepthFeet,
    pierQuantity,
    wastePercent,
    pricePerCubicYard,
  ]);

  const selectedProject = projectTypes.find((type) => type.id === projectType);

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
            Construction Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Concrete Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Calculate concrete volume and estimated material cost for slabs,
            pads, footings, trenches, piers, posts, sonotubes, and round columns.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
          <p className="mb-4 text-sm font-semibold text-white">
            Choose project type
          </p>

          <div className="grid gap-3 md:grid-cols-3">
            {projectTypes.map((type) => {
              const isActive = projectType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setProjectType(type.id)}
                  className={
                    isActive
                      ? "rounded-xl border border-[#F97316] bg-[#1C2433] p-4 text-left"
                      : "rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4 text-left hover:border-[#F97316]"
                  }
                >
                  <span className="block text-sm font-semibold text-white">
                    {type.label}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-[#A0AEC0]">
                    {type.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Project Inputs</h2>

                <p className="mt-2 text-sm text-[#A0AEC0]">
                  {selectedProject?.description}
                </p>
              </div>

              <span className="rounded-full border border-[#1F2937] px-3 py-1 text-xs text-[#A0AEC0]">
                {results.formulaLabel}
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {projectType === "slab" && (
                <>
                  <NumberInput
                    label="Length"
                    value={lengthFeet}
                    onChange={setLengthFeet}
                    suffix="ft"
                  />

                  <NumberInput
                    label="Width"
                    value={widthFeet}
                    onChange={setWidthFeet}
                    suffix="ft"
                  />

                  <NumberInput
                    label="Thickness"
                    value={thicknessInches}
                    onChange={setThicknessInches}
                    suffix="in"
                  />
                </>
              )}

              {projectType === "footing" && (
                <>
                  <NumberInput
                    label="Total Length"
                    value={footingLengthFeet}
                    onChange={setFootingLengthFeet}
                    suffix="ft"
                  />

                  <NumberInput
                    label="Footing Width"
                    value={footingWidthInches}
                    onChange={setFootingWidthInches}
                    suffix="in"
                  />

                  <NumberInput
                    label="Footing Depth"
                    value={footingDepthInches}
                    onChange={setFootingDepthInches}
                    suffix="in"
                  />
                </>
              )}

              {projectType === "pier" && (
                <>
                  <NumberInput
                    label="Diameter"
                    value={pierDiameterInches}
                    onChange={setPierDiameterInches}
                    suffix="in"
                  />

                  <NumberInput
                    label="Depth"
                    value={pierDepthFeet}
                    onChange={setPierDepthFeet}
                    suffix="ft"
                  />

                  <NumberInput
                    label="Quantity"
                    value={pierQuantity}
                    onChange={setPierQuantity}
                    suffix="posts"
                  />
                </>
              )}

              <NumberInput
                label="Waste Percentage"
                value={wastePercent}
                onChange={setWastePercent}
                suffix="%"
              />

              <NumberInput
                label="Concrete Price Per Cubic Yard"
                value={pricePerCubicYard}
                onChange={setPricePerCubicYard}
                prefix="$"
                suffix="/ yd³"
                wide
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Results</h2>

            <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">
                Recommended order amount
              </p>

              <p className="mt-2 text-4xl font-bold text-[#F97316]">
                {formatNumber(results.cubicYardsWithWaste)} yd³
              </p>

              <p className="mt-2 text-sm text-[#A0AEC0]">
                Includes {formatNumber(toNumber(wastePercent))}% waste.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <ResultRow
                label="Cubic Feet"
                value={`${formatNumber(results.cubicFeet)} ft³`}
              />

              <ResultRow
                label="Cubic Yards"
                value={`${formatNumber(results.cubicYards)} yd³`}
              />

              <ResultRow
                label="With Waste"
                value={`${formatNumber(results.cubicYardsWithWaste)} yd³`}
                highlight
              />

              <ResultRow
                label="Estimated Material Cost"
                value={formatCurrency(results.estimatedCost)}
                highlight
              />
            </div>

            <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm leading-6 text-[#A0AEC0]">
                This estimate is for material planning only. Actual concrete
                needs can change based on excavation, subgrade, formwork,
                compaction, slope, and contractor requirements.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold text-white">
              How this concrete calculator works
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              This calculator estimates concrete volume by converting your
              project dimensions into cubic feet, then converting cubic feet into
              cubic yards. Since ready-mix concrete is commonly ordered by the
              cubic yard, the final order amount is shown in cubic yards.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              The waste percentage adds extra concrete for spillage, uneven
              excavation, form variation, and jobsite conditions. A common waste
              range is 5% to 10%, but some projects may need more.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold text-white">
              Concrete formulas used
            </h2>

            <div className="mt-5 space-y-4">
              <FormulaRow
                label="Slab / Pad"
                formula="Length × Width × Thickness"
              />

              <FormulaRow
                label="Footing / Trench"
                formula="Length × Width × Depth"
              />

              <FormulaRow
                label="Pier / Column"
                formula="π × Radius² × Depth × Quantity"
              />

              <FormulaRow label="Cubic Yards" formula="Cubic Feet ÷ 27" />

              <FormulaRow
                label="With Waste"
                formula="Cubic Yards × (1 + Waste % ÷ 100)"
              />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Common concrete project examples
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ExampleCard
              title="10 × 10 slab, 4 inches thick"
              text="A 10 ft by 10 ft slab at 4 inches thick needs about 1.23 cubic yards before waste."
            />

            <ExampleCard
              title="40 ft footing, 12 × 12 inches"
              text="A 40 ft long footing that is 12 inches wide and 12 inches deep needs about 1.48 cubic yards before waste."
            />

            <ExampleCard
              title="Four 12-inch piers, 3 ft deep"
              text="Four round piers with 12 inch diameter and 3 ft depth need about 0.35 cubic yards before waste."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
                Project tools
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Recommended tools for concrete projects
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#A0AEC0]">
              Placeholder section for future affiliate links. Keep these useful,
              relevant, and below the calculator results.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ToolCard
              title="Tape Measure"
              text="Useful for checking slab, footing, and form dimensions."
            />

            <ToolCard
              title="Concrete Trowel"
              text="Used for finishing and smoothing concrete surfaces."
            />

            <ToolCard
              title="Work Gloves"
              text="Protects hands when handling concrete, forms, and tools."
            />

            <ToolCard
              title="Mixing Tub"
              text="Helpful for small concrete batches and repair projects."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete calculator FAQ
          </h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How many cubic feet are in one cubic yard of concrete?"
              answer="One cubic yard contains 27 cubic feet. That is why this calculator divides cubic feet by 27 to estimate cubic yards."
            />

            <FAQItem
              question="How much waste should I add for concrete?"
              answer="A common waste allowance is 5% to 10%. More complex projects, uneven excavation, or difficult pours may need a higher waste percentage."
            />

            <FAQItem
              question="Can this calculator be used for sonotubes?"
              answer="Yes. Use the Pier / Column mode. Enter the tube diameter, depth, and quantity to estimate the required concrete."
            />

            <FAQItem
              question="Does this include labor or delivery fees?"
              answer="No. The estimated cost only calculates material cost based on the cubic yards with waste and the price per cubic yard."
            />
          </div>
        </section>
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
  wide = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "block sm:col-span-2" : "block"}>
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
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <span className="text-sm text-[#A0AEC0]">{label}</span>

      <span
        className={
          highlight
            ? "text-right text-lg font-bold text-[#F97316]"
            : "text-right text-lg font-semibold text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

function FormulaRow({ label, formula }: { label: string; formula: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-white">{label}</span>
      <span className="text-sm text-[#A0AEC0]">{formula}</span>
    </div>
  );
}

function ExampleCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function ToolCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
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

function toNumber(value: string) {
  const number = Number(value);

  if (Number.isNaN(number)) {
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