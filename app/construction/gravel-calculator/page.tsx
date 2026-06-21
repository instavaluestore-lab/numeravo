"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";

const projectPresets = [
  {
    title: "Driveway Gravel",
    depthImperial: "6",
    depthMetric: "15",
    description: "Common for residential driveway gravel planning.",
  },
  {
    title: "Concrete Slab Base",
    depthImperial: "4",
    depthMetric: "10",
    description: "Common base depth under patios, pads, and slabs.",
  },
  {
    title: "Patio Base",
    depthImperial: "4",
    depthMetric: "10",
    description: "Useful for paver patios and compacted gravel bases.",
  },
  {
    title: "Walkway Base",
    depthImperial: "3",
    depthMetric: "8",
    description: "Common for walkways, paths, and light-use areas.",
  },
  {
    title: "Landscape Gravel",
    depthImperial: "2",
    depthMetric: "5",
    description: "Useful for decorative gravel and landscape beds.",
  },
  {
    title: "Drainage Gravel",
    depthImperial: "12",
    depthMetric: "30",
    description: "Useful starting point for drainage and French drain planning.",
  },
];

export default function GravelCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");

  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [wastePercent, setWastePercent] = useState("10");

  const [tonsPerCubicYard, setTonsPerCubicYard] = useState("1.4");
  const [tonnesPerCubicMeter, setTonnesPerCubicMeter] = useState("1.7");

  const [pricePerTon, setPricePerTon] = useState("45");
  const [copied, setCopied] = useState(false);

  const unitLabels =
    unitSystem === "imperial"
      ? {
          long: "ft",
          depth: "in",
          weight: "tons",
          densityLabel: "Tons Per Cubic Yard",
          priceLabel: "Price Per Ton",
          priceSuffix: "/ ton",
          volumePrimary: "yd³",
        }
      : {
          long: "m",
          depth: "cm",
          weight: "tonnes",
          densityLabel: "Tonnes Per Cubic Meter",
          priceLabel: "Price Per Tonne",
          priceSuffix: "/ tonne",
          volumePrimary: "m³",
        };

  const results = useMemo(() => {
    const lengthNumber = toNumber(length);
    const widthNumber = toNumber(width);
    const depthNumber = toNumber(depth);
    const waste = toNumber(wastePercent);
    const price = toNumber(pricePerTon);

    if (unitSystem === "imperial") {
      const depthFeet = depthNumber / 12;
      const cubicFeet = lengthNumber * widthNumber * depthFeet;
      const cubicYards = cubicFeet / 27;
      const cubicYardsWithWaste = cubicYards * (1 + waste / 100);
      const estimatedTons =
        cubicYardsWithWaste * toNumber(tonsPerCubicYard);
      const estimatedCost = estimatedTons * price;

      return {
        cubicFeet,
        cubicYards,
        cubicMeters: cubicYards * 0.764555,
        volumeWithWaste: cubicYardsWithWaste,
        estimatedWeight: estimatedTons,
        estimatedCost,
      };
    }

    const depthMeters = depthNumber / 100;
    const cubicMeters = lengthNumber * widthNumber * depthMeters;
    const cubicMetersWithWaste = cubicMeters * (1 + waste / 100);
    const estimatedTonnes =
      cubicMetersWithWaste * toNumber(tonnesPerCubicMeter);
    const estimatedCost = estimatedTonnes * price;

    return {
      cubicFeet: cubicMeters * 35.3147,
      cubicYards: cubicMeters * 1.30795,
      cubicMeters,
      volumeWithWaste: cubicMetersWithWaste,
      estimatedWeight: estimatedTonnes,
      estimatedCost,
    };
  }, [
    unitSystem,
    length,
    width,
    depth,
    wastePercent,
    tonsPerCubicYard,
    tonnesPerCubicMeter,
    pricePerTon,
  ]);

  async function copyResults() {
    const resultText =
      unitSystem === "imperial"
        ? `Numeravo Gravel Estimate
Unit System: Imperial
Area: ${length} ft × ${width} ft
Depth: ${depth} in
Cubic Feet: ${formatNumber(results.cubicFeet)} ft³
Cubic Yards Before Waste: ${formatNumber(results.cubicYards)} yd³
Cubic Yards With Waste: ${formatNumber(results.volumeWithWaste)} yd³
Estimated Tons: ${formatNumber(results.estimatedWeight)} tons
Estimated Material Cost: ${formatCurrency(results.estimatedCost)}`
        : `Numeravo Gravel Estimate
Unit System: Metric
Area: ${length} m × ${width} m
Depth: ${depth} cm
Cubic Meters Before Waste: ${formatNumber(results.cubicMeters)} m³
Cubic Meters With Waste: ${formatNumber(results.volumeWithWaste)} m³
Estimated Tonnes: ${formatNumber(results.estimatedWeight)} tonnes
Estimated Material Cost: ${formatCurrency(results.estimatedCost)}`;

    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function applyPreset(depthImperial: string, depthMetric: string) {
    setDepth(unitSystem === "imperial" ? depthImperial : depthMetric);
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Numeravo Gravel Calculator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://numeravo.com/construction/gravel-calculator",
                description:
                  "Estimate gravel volume, cubic yards, cubic meters, tons, tonnes, waste, and material cost for driveways, patios, walkways, concrete base layers, drainage, and landscaping.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://numeravo.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Construction",
                    item: "https://numeravo.com/construction",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Gravel Calculator",
                    item: "https://numeravo.com/construction/gravel-calculator",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I calculate how much gravel I need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Multiply length by width by depth to calculate gravel volume. For imperial estimates, convert depth from inches to feet and divide cubic feet by 27 to get cubic yards.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons are in a cubic yard of gravel?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A common planning estimate is about 1.4 tons per cubic yard of gravel, but actual weight varies by material type, moisture, and compaction.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much gravel do I need under a concrete slab?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Many concrete slab bases use 4 to 6 inches of compacted gravel, but requirements depend on soil, drainage, load, slab design, and local conditions.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I add waste to a gravel estimate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. A 5% to 10% waste allowance is commonly used for gravel estimates to account for spreading, compaction, uneven ground, and material loss.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
            Construction Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Gravel Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate gravel volume, cubic yards, cubic meters, tons, tonnes, and
            material cost for driveways, patios, walkways, concrete base layers,
            drainage, and landscaping projects.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Unit System</p>
              <p className="mt-1 text-sm text-[#A0AEC0]">
                Switch between imperial and metric measurements.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ToggleButton
                isActive={unitSystem === "imperial"}
                label="Imperial"
                description="Feet, inches, cubic yards, tons"
                onClick={() => setUnitSystem("imperial")}
              />

              <ToggleButton
                isActive={unitSystem === "metric"}
                label="Metric"
                description="Meters, centimeters, cubic meters, tonnes"
                onClick={() => setUnitSystem("metric")}
              />
            </div>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Project Presets</h2>

          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Choose a preset to quickly set a common gravel depth. You can still
            edit the depth afterward.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projectPresets.map((preset) => (
              <button
                key={preset.title}
                type="button"
                onClick={() =>
                  applyPreset(preset.depthImperial, preset.depthMetric)
                }
                className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4 text-left transition hover:border-[#F97316]"
              >
                <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />

                <h3 className="font-semibold text-white">{preset.title}</h3>

                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  {preset.description}
                </p>

                <p className="mt-3 text-xs font-semibold text-[#F97316]">
                  Depth:{" "}
                  {unitSystem === "imperial"
                    ? `${preset.depthImperial} in`
                    : `${preset.depthMetric} cm`}
                </p>
              </button>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Project Inputs</h2>

            <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
              Enter the project area, gravel depth, waste allowance, material
              density, and price.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <NumberInput
                label="Length"
                value={length}
                onChange={setLength}
                suffix={unitLabels.long}
              />

              <NumberInput
                label="Width"
                value={width}
                onChange={setWidth}
                suffix={unitLabels.long}
              />

              <NumberInput
                label="Depth"
                value={depth}
                onChange={setDepth}
                suffix={unitLabels.depth}
              />

              <NumberInput
                label="Waste Percentage"
                value={wastePercent}
                onChange={setWastePercent}
                suffix="%"
              />

              {unitSystem === "imperial" ? (
                <NumberInput
                  label={unitLabels.densityLabel}
                  value={tonsPerCubicYard}
                  onChange={setTonsPerCubicYard}
                  suffix="tons / yd³"
                />
              ) : (
                <NumberInput
                  label={unitLabels.densityLabel}
                  value={tonnesPerCubicMeter}
                  onChange={setTonnesPerCubicMeter}
                  suffix="tonnes / m³"
                />
              )}

              <NumberInput
                label={unitLabels.priceLabel}
                value={pricePerTon}
                onChange={setPricePerTon}
                prefix="$"
                suffix={unitLabels.priceSuffix}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold">Results</h2>

              <button
                type="button"
                onClick={copyResults}
                className="rounded-xl border border-[#1F2937] px-3 py-2 text-xs font-semibold text-[#A0AEC0] hover:border-[#F97316] hover:text-white"
              >
                {copied ? "Copied" : "Copy Results"}
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">
                Estimated order weight
              </p>

              <p className="mt-2 text-4xl font-bold text-[#F97316]">
                {formatNumber(results.estimatedWeight)} {unitLabels.weight}
              </p>

              <p className="mt-2 text-sm text-[#A0AEC0]">
                Includes your selected waste percentage.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {unitSystem === "imperial" ? (
                <>
                  <ResultRow
                    label="Cubic Feet"
                    value={`${formatNumber(results.cubicFeet)} ft³`}
                  />
                  <ResultRow
                    label="Cubic Yards Before Waste"
                    value={`${formatNumber(results.cubicYards)} yd³`}
                  />
                  <ResultRow
                    label="Cubic Yards With Waste"
                    value={`${formatNumber(results.volumeWithWaste)} yd³`}
                    highlight
                  />
                  <ResultRow
                    label="Estimated Tons"
                    value={`${formatNumber(results.estimatedWeight)} tons`}
                    highlight
                  />
                </>
              ) : (
                <>
                  <ResultRow
                    label="Cubic Meters Before Waste"
                    value={`${formatNumber(results.cubicMeters)} m³`}
                  />
                  <ResultRow
                    label="Cubic Meters With Waste"
                    value={`${formatNumber(results.volumeWithWaste)} m³`}
                    highlight
                  />
                  <ResultRow
                    label="Estimated Tonnes"
                    value={`${formatNumber(results.estimatedWeight)} tonnes`}
                    highlight
                  />
                </>
              )}

              <ResultRow
                label="Estimated Material Cost"
                value={formatCurrency(results.estimatedCost)}
                highlight
              />
            </div>

            <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm leading-6 text-[#A0AEC0]">
                Gravel weight varies by material type, moisture, compaction, and
                supplier. Use this as a planning estimate and confirm final
                quantities with your supplier.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate gravel
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              To estimate gravel, multiply length by width by depth. For
              imperial projects, convert depth from inches to feet, calculate
              cubic feet, then divide by 27 to get cubic yards. Multiply cubic
              yards by tons per cubic yard to estimate weight.
            </p>

            <div className="mt-5 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm font-semibold text-white">
                Imperial formula
              </p>
              <p className="mt-2 text-sm text-[#A0AEC0]">
                Length × Width × Depth ÷ 27 = Cubic Yards
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm font-semibold text-white">
                Weight formula
              </p>
              <p className="mt-2 text-sm text-[#A0AEC0]">
                Cubic Yards × Tons Per Cubic Yard = Estimated Tons
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Gravel depth guide</h2>

            <div className="mt-5 space-y-3">
              <DepthGuideRow label="Walkway" value="2–3 inches" />
              <DepthGuideRow label="Patio base" value="4 inches" />
              <DepthGuideRow label="Light driveway" value="4–6 inches" />
              <DepthGuideRow label="Heavy driveway" value="6–12 inches" />
              <DepthGuideRow label="Concrete slab base" value="4–6 inches" />
              <DepthGuideRow label="Drainage trench" value="Varies by design" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
  <h2 className="text-2xl font-semibold">Related construction tools</h2>

  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
    Gravel is often used below concrete slabs, patios, walkways, and
    pads. Use these related calculators and guides to plan the full
    project.
  </p>

<div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <RelatedLink
      href="/construction/gravel-driveway-calculator"
      title="Gravel Driveway Calculator"
      text="Estimate gravel tons, cubic yards, depth, waste, and cost for driveway projects."
    />

    <RelatedLink
  href="/construction/gravel-driveway-cost"
  title="Gravel Driveway Cost"
  text="Estimate driveway gravel cost using size, depth, tons, price per ton, delivery, and project factors."
/>

    <RelatedLink
  href="/construction/how-much-gravel-do-i-need"
  title="How Much Gravel Do I Need?"
  text="Learn how to estimate gravel volume, cubic yards, tons, depth, waste, and cost."
/>

<RelatedLink
  href="/construction/gravel-driveway-cost"
  title="Gravel Driveway Cost"
  text="Estimate total gravel driveway cost using driveway size, depth, tons, price per ton, delivery, and project factors."
/>

<RelatedLink
  href="/construction/gravel-cost-per-ton"
  title="Gravel Cost Per Ton"
  text="Learn how gravel price per ton works and estimate total material cost."
/>

    <RelatedLink
      href="/construction/concrete-calculator"
      title="Concrete Calculator"
      text="Estimate concrete volume, waste, and material cost."
    />

    <RelatedLink
      href="/construction/concrete-slab-calculator"
      title="Concrete Slab Calculator"
      text="Estimate concrete for patios, driveways, and pads."
    />

    <RelatedLink
      href="/construction"
      title="Construction Calculators"
      text="View all Numeravo construction tools and guides."
    />

    <RelatedLink
  href="/construction/crushed-stone-vs-gravel"
  title="Crushed Stone vs Gravel"
  text="Compare crushed stone and gravel for driveways, drainage, landscaping, patios, and base layers."
/>
  </div>
</section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Recommended tools for gravel projects
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Tape Measure",
              "Laser Distance Measure",
              "Landscape Fabric",
              "Tamper / Plate Compactor",
              "Wheelbarrow",
              "Shovel",
              "Rake",
              "Work Gloves",
              "Safety Glasses",
            ].map((tool) => (
              <div
                key={tool}
                className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5"
              >
                <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />
                <h3 className="font-semibold text-white">{tool}</h3>
                <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
                  Useful for measuring, spreading, compacting, and finishing
                  gravel projects.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Gravel calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I calculate how much gravel I need?"
              answer="Multiply length by width by depth to calculate gravel volume. For imperial estimates, convert depth from inches to feet, calculate cubic feet, then divide by 27 to get cubic yards."
            />

            <FAQItem
              question="How many tons are in a cubic yard of gravel?"
              answer="A common estimate is about 1.4 tons per cubic yard of gravel, but actual weight varies by gravel type, moisture, and compaction."
            />

            <FAQItem
              question="How deep should gravel be for a driveway?"
              answer="Light-use driveways often use 4 to 6 inches of gravel, while heavier-use driveways may need 6 to 12 inches depending on soil, load, and base requirements."
            />

            <FAQItem
              question="How much gravel do I need under a concrete slab?"
              answer="Many concrete slab bases use 4 to 6 inches of compacted gravel, but the right depth depends on soil, drainage, slab design, and local conditions."
            />

            <FAQItem
              question="Should I add waste to a gravel estimate?"
              answer="Yes. A 5% to 10% waste allowance is commonly used to account for spreading, compaction, uneven ground, and material loss."
            />

            <FAQItem
              question="Does this calculator include delivery cost?"
              answer="No. This calculator estimates material cost based on price per ton or tonne. Delivery, taxes, labor, equipment, and supplier fees are separate."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function ToggleButton({
  isActive,
  label,
  description,
  onClick,
}: {
  isActive: boolean;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isActive
          ? "rounded-xl border border-[#F97316] bg-[#1C2433] px-4 py-3 text-left"
          : "rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-left hover:border-[#F97316]"
      }
    >
      <span className="block text-sm font-semibold text-white">{label}</span>
      <span className="mt-1 block text-xs text-[#A0AEC0]">{description}</span>
    </button>
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

function DepthGuideRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
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