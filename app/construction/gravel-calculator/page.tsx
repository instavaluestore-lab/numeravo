"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";

const materialPresets = [
  {
    title: "Gravel",
    tonsPerCubicYard: "1.4",
    tonnesPerCubicMeter: "1.7",
    pricePerTon: "45",
    description: "General gravel estimate for driveways, paths, patios, and base layers.",
  },
  {
    title: "Crushed Stone",
    tonsPerCubicYard: "1.4",
    tonnesPerCubicMeter: "1.7",
    pricePerTon: "50",
    description: "Common for driveways, drainage, concrete bases, and compacted layers.",
  },
  {
    title: "Road Base",
    tonsPerCubicYard: "1.5",
    tonnesPerCubicMeter: "1.8",
    pricePerTon: "42",
    description: "Useful for compacted driveway base, parking pads, and road prep.",
  },
  {
    title: "Pea Gravel",
    tonsPerCubicYard: "1.3",
    tonnesPerCubicMeter: "1.55",
    pricePerTon: "55",
    description: "Common for landscaping, paths, garden beds, and decorative areas.",
  },
  {
    title: "River Rock",
    tonsPerCubicYard: "1.35",
    tonnesPerCubicMeter: "1.6",
    pricePerTon: "75",
    description: "Useful for decorative landscaping, drainage beds, and borders.",
  },
  {
    title: "Paver Base",
    tonsPerCubicYard: "1.5",
    tonnesPerCubicMeter: "1.8",
    pricePerTon: "48",
    description: "Common for patios, walkways, and compacted paver base layers.",
  },
  {
    title: "Drainage Rock",
    tonsPerCubicYard: "1.35",
    tonnesPerCubicMeter: "1.6",
    pricePerTon: "52",
    description: "Useful for French drains, drainage trenches, and water management.",
  },
  {
    title: "Decomposed Granite",
    tonsPerCubicYard: "1.45",
    tonnesPerCubicMeter: "1.75",
    pricePerTon: "65",
    description: "Common for paths, patios, landscape areas, and compacted surfaces.",
  },
];

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

  const [selectedMaterial, setSelectedMaterial] = useState("Gravel");

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
      const estimatedTons = cubicYardsWithWaste * toNumber(tonsPerCubicYard);
      const estimatedCost = estimatedTons * price;
      const smallTruckLoads = estimatedTons > 0 ? Math.ceil(estimatedTons / 5) : 0;
      const standardTruckLoads =
        estimatedTons > 0 ? Math.ceil(estimatedTons / 10) : 0;
      const largeTruckLoads = estimatedTons > 0 ? Math.ceil(estimatedTons / 15) : 0;

      return {
        cubicFeet,
        cubicYards,
        cubicMeters: cubicYards * 0.764555,
        volumeWithWaste: cubicYardsWithWaste,
        estimatedWeight: estimatedTons,
        estimatedCost,
        smallTruckLoads,
        standardTruckLoads,
        largeTruckLoads,
      };
    }

    const depthMeters = depthNumber / 100;
    const cubicMeters = lengthNumber * widthNumber * depthMeters;
    const cubicMetersWithWaste = cubicMeters * (1 + waste / 100);
    const estimatedTonnes =
      cubicMetersWithWaste * toNumber(tonnesPerCubicMeter);
    const estimatedCost = estimatedTonnes * price;
    const smallTruckLoads =
      estimatedTonnes > 0 ? Math.ceil(estimatedTonnes / 5) : 0;
    const standardTruckLoads =
      estimatedTonnes > 0 ? Math.ceil(estimatedTonnes / 10) : 0;
    const largeTruckLoads =
      estimatedTonnes > 0 ? Math.ceil(estimatedTonnes / 15) : 0;

    return {
      cubicFeet: cubicMeters * 35.3147,
      cubicYards: cubicMeters * 1.30795,
      cubicMeters,
      volumeWithWaste: cubicMetersWithWaste,
      estimatedWeight: estimatedTonnes,
      estimatedCost,
      smallTruckLoads,
      standardTruckLoads,
      largeTruckLoads,
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
Material: ${selectedMaterial}
Unit System: Imperial
Area: ${length} ft × ${width} ft
Depth: ${depth} in
Cubic Feet: ${formatNumber(results.cubicFeet)} ft³
Cubic Yards Before Waste: ${formatNumber(results.cubicYards)} yd³
Cubic Yards With Waste: ${formatNumber(results.volumeWithWaste)} yd³
Estimated Tons: ${formatNumber(results.estimatedWeight)} tons
Estimated Material Cost: ${formatCurrency(results.estimatedCost)}`
        : `Numeravo Gravel Estimate
Material: ${selectedMaterial}
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

  function applyProjectPreset(depthImperial: string, depthMetric: string) {
    setDepth(unitSystem === "imperial" ? depthImperial : depthMetric);
  }

  function applyMaterialPreset(material: (typeof materialPresets)[number]) {
    setSelectedMaterial(material.title);
    setTonsPerCubicYard(material.tonsPerCubicYard);
    setTonnesPerCubicMeter(material.tonnesPerCubicMeter);
    setPricePerTon(material.pricePerTon);
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
                  "Estimate gravel, crushed stone, road base, pea gravel, river rock, paver base, drainage rock, and decomposed granite volume, weight, waste, and material cost.",
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
                    name: "Can this calculator estimate crushed stone and road base?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The calculator includes material presets for gravel, crushed stone, road base, pea gravel, river rock, paver base, drainage rock, and decomposed granite.",
                    },
                  },
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
                    name: "Should I add waste to a gravel estimate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. A 5% to 10% waste allowance is commonly used for gravel estimates to account for spreading, compaction, uneven ground, and material loss.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons of gravel fit in a dump truck?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A small dump truck may carry about 5 tons of gravel, a standard dump truck is often estimated around 10 tons, and a larger dump truck or tri-axle may carry about 15 tons. Actual capacity depends on truck type, road limits, supplier policy, material moisture, and local weight rules.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many cubic yards of gravel are in a dump truck?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The cubic yards in a dump truck depend on the gravel density and truck weight capacity. Since gravel is often ordered by the ton, convert cubic yards to tons using the selected material density, then divide by the truck capacity.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I order gravel by the ton or cubic yard?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Most gravel suppliers price and deliver by the ton because weight is easier to measure at the yard. Project plans often start with cubic yards, so use cubic yards for volume planning and tons for ordering and delivery estimates.",
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
            Estimate gravel, crushed stone, road base, pea gravel, river rock,
            paver base, drainage rock, and decomposed granite volume, weight,
            waste, and material cost.
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
          <h2 className="text-2xl font-semibold">Material Presets</h2>

          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Select a material to update the default density and price. You can
            still edit the numbers manually.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {materialPresets.map((material) => (
              <button
                key={material.title}
                type="button"
                onClick={() => applyMaterialPreset(material)}
                className={
                  selectedMaterial === material.title
                    ? "rounded-xl border border-[#F97316] bg-[#1C2433] p-4 text-left"
                    : "rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4 text-left transition hover:border-[#F97316]"
                }
              >
                <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />

                <h3 className="font-semibold text-white">{material.title}</h3>

                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  {material.description}
                </p>

                <p className="mt-3 text-xs font-semibold text-[#F97316]">
                  {unitSystem === "imperial"
                    ? `${material.tonsPerCubicYard} tons / yd³`
                    : `${material.tonnesPerCubicMeter} tonnes / m³`}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Project Presets</h2>

          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Choose a preset to quickly set a common depth. You can still edit
            the depth afterward.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projectPresets.map((preset) => (
              <button
                key={preset.title}
                type="button"
                onClick={() =>
                  applyProjectPreset(preset.depthImperial, preset.depthMetric)
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
              Enter the project area, depth, waste allowance, material density,
              and price.
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
                Estimated {selectedMaterial.toLowerCase()} order weight
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

              <ResultRow
                label="Small Dump Truck Loads"
                value={`${results.smallTruckLoads} load${results.smallTruckLoads === 1 ? "" : "s"} at about 5 ${unitLabels.weight} per load`}
              />

              <ResultRow
                label="Standard Dump Truck Loads"
                value={`${results.standardTruckLoads} load${results.standardTruckLoads === 1 ? "" : "s"} at about 10 ${unitLabels.weight} per load`}
                highlight
              />

              <ResultRow
                label="Large Dump Truck / Tri-Axle Loads"
                value={`${results.largeTruckLoads} load${results.largeTruckLoads === 1 ? "" : "s"} at about 15 ${unitLabels.weight} per load`}
              />
            </div>

            <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm leading-6 text-[#A0AEC0]">
                Material weight varies by stone type, moisture, compaction, and
                supplier. Truck capacities also vary by truck size, road limits,
                supplier policy, and material moisture. Use this as a planning
                estimate and confirm final quantities and delivery options with
                your supplier.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Gravel Delivery
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Gravel delivery: cubic yards, tons, and truckloads
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Gravel and stone are often ordered by the ton, but many projects
              are measured in cubic yards. This calculator converts area and
              depth into cubic yards, estimates tons using the selected material
              density, and then shows approximate truckload counts for delivery
              planning.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Small dump truck
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  A small dump truck may carry around 5 tons per load. This can
                  be useful for smaller landscaping projects, paths, and tight
                  access jobs.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Standard dump truck
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  A standard dump truck is often planned around 10 tons per load.
                  This is a common delivery estimate for driveways, slab bases,
                  drainage rock, and general gravel projects.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Large truck / tri-axle
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Larger dump trucks or tri-axle trucks may carry around 15 tons
                  per load, depending on local road limits, truck configuration,
                  supplier policy, and material moisture.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-[#A0AEC0]">
              Truckload estimates are planning numbers only. Gravel weight varies
              by material type, stone size, moisture, compaction, and supplier.
              Confirm final delivery capacity, minimum order rules, and fees with
              the gravel yard before ordering.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate gravel and stone
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              To estimate gravel or stone, multiply length by width by depth.
              For imperial projects, convert depth from inches to feet,
              calculate cubic feet, then divide by 27 to get cubic yards.
              Multiply cubic yards by tons per cubic yard to estimate weight.
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
            <h2 className="text-2xl font-semibold">Depth guide</h2>

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
            Gravel and stone are often used below concrete slabs, patios,
            walkways, driveways, and drainage projects. Use these related
            calculators and guides to plan the full project.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating gravel volume, tons, and depth."
            />

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
              href="/construction/gravel-cost-calculator"
              title="Gravel Cost Calculator"
              text="Estimate gravel project cost using area, depth, cubic yards, tons, waste, price per ton, and delivery."
            />

            <RelatedLink
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel volume, cubic yards, tons, depth, waste, and cost."
            />

            <RelatedLink
              href="/construction/gravel-cost-per-ton"
              title="Gravel Cost Per Ton"
              text="Learn how gravel price per ton works and estimate total material cost."
            />

            <RelatedLink
              href="/construction/crushed-stone-vs-gravel"
              title="Crushed Stone vs Gravel"
              text="Compare crushed stone and gravel for driveways, drainage, landscaping, patios, and base layers."
            />

            <RelatedLink
  href="/construction/crushed-stone-calculator"
  title="Crushed Stone Calculator"
  text="Estimate crushed stone cubic yards, tons, waste, and cost using the Crushed Stone material preset."
/>

<RelatedLink
  href="/construction/road-base-calculator"
  title="Road Base Calculator"
  text="Estimate road base cubic yards, tons, waste, and cost using the Road Base material preset."
/>

<RelatedLink
  href="/construction/base-for-concrete-slab-depth"
  title="Base for Concrete Slab Depth"
  text="Learn common gravel, crushed stone, and road base depths for concrete slabs, patios, driveways, and shed pads."
/>
            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and material cost."
            />

            <RelatedLink
              href="/construction/concrete-cost-calculator"
              title="Concrete Cost Calculator"
              text="Estimate concrete price, base material, rebar, labor, prep, delivery fees, and total project cost."
            />

            <RelatedLink
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete for patios, driveways, and pads."
            />

            <RelatedLink
  href="/construction/how-to-prepare-ground-for-concrete-slab"
  title="How to Prepare Ground for Concrete Slab"
  text="Learn excavation, grading, gravel base, compaction, forms, and final slab prep steps."
/>

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="View all Numeravo construction tools and guides."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Recommended tools for gravel and stone projects
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
                  gravel or stone projects.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Gravel calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="Can this calculator estimate crushed stone and road base?"
              answer="Yes. Use the material presets to estimate gravel, crushed stone, road base, pea gravel, river rock, paver base, drainage rock, and decomposed granite."
            />

            <FAQItem
              question="How do I calculate how much gravel I need?"
              answer="Multiply length by width by depth to calculate gravel volume. For imperial estimates, convert depth from inches to feet, calculate cubic feet, then divide by 27 to get cubic yards."
            />

            <FAQItem
              question="How many tons are in a cubic yard of gravel?"
              answer="A common estimate is about 1.4 tons per cubic yard of gravel, but actual weight varies by material type, moisture, and compaction."
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
              question="How many tons of gravel fit in a dump truck?"
              answer="A small dump truck may carry about 5 tons of gravel, a standard dump truck is often estimated around 10 tons, and a larger dump truck or tri-axle may carry about 15 tons. Actual capacity depends on truck type, road limits, supplier policy, material moisture, and local weight rules."
            />

            <FAQItem
              question="How many cubic yards of gravel are in a dump truck?"
              answer="The cubic yards in a dump truck depend on gravel density and truck weight capacity. Since gravel is often ordered by the ton, convert cubic yards to tons using the selected material density, then divide by the truck capacity."
            />

            <FAQItem
              question="Should I order gravel by the ton or cubic yard?"
              answer="Most gravel suppliers price and deliver by the ton because weight is easier to measure at the yard. Project plans often start with cubic yards, so use cubic yards for volume planning and tons for ordering and delivery estimates."
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