"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";
type ConcreteOrderMode = "readyMix" | "bags";

type ProjectType =
  | "slab"
  | "circularPad"
  | "lShapedSlab"
  | "footing"
  | "roundPier"
  | "rectangularPier"
  | "wall"
  | "stairs"
  | "curb";

const projectTypes: {
  id: ProjectType;
  label: string;
  description: string;
  uses: string[];
}[] = [
  {
    id: "slab",
    label: "Slab / Pad",
    description:
      "Best for rectangular slabs, square pads, sidewalks, driveways, patios, garage floors, and shed pads.",
    uses: [
      "Rectangular slab",
      "Square slab",
      "Sidewalk",
      "Driveway",
      "Patio",
      "Garage floor",
      "Shed pad",
      "Multiple slabs",
    ],
  },
  {
    id: "circularPad",
    label: "Circular Pad",
    description:
      "Best for round patios, hot tub pads, circular equipment bases, and round concrete pads.",
    uses: ["Round patio", "Hot tub pad", "Equipment base", "Circular pad"],
  },
  {
    id: "lShapedSlab",
    label: "L-Shaped Slab",
    description:
      "Best for L-shaped patios, irregular slabs made from two rectangles, and L-shaped walkways.",
    uses: ["L-shaped patio", "L-shaped walkway", "Two-rectangle slab"],
  },
  {
    id: "footing",
    label: "Footing / Trench",
    description:
      "Best for continuous strip footings, trench footings, retaining wall footings, wall footings, and grade beams.",
    uses: [
      "Strip footing",
      "Trench footing",
      "Wall footing",
      "Retaining wall footing",
      "Grade beam",
      "Multiple footing runs",
    ],
  },
  {
    id: "roundPier",
    label: "Round Pier / Sonotube",
    description:
      "Best for round piers, sonotubes, fence post holes, deck footings, pole barn post footings, and round columns.",
    uses: [
      "Round pier",
      "Sonotube",
      "Fence post hole",
      "Deck footing",
      "Pole barn footing",
      "Round column",
    ],
  },
  {
    id: "rectangularPier",
    label: "Square / Rectangular Pier",
    description:
      "Best for square piers, rectangular piers, concrete columns, and concrete pedestals.",
    uses: [
      "Square pier",
      "Rectangular pier",
      "Square column",
      "Rectangular column",
      "Concrete pedestal",
    ],
  },
  {
    id: "wall",
    label: "Wall",
    description:
      "Best for concrete walls, foundation walls, retaining walls, stem walls, and short landscape walls.",
    uses: [
      "Concrete wall",
      "Foundation wall",
      "Retaining wall",
      "Stem wall",
      "Landscape wall",
    ],
  },
  {
    id: "stairs",
    label: "Steps / Stairs",
    description:
      "Best for simple concrete steps, porch steps, and outdoor stairs. This is an approximate volume estimate.",
    uses: ["Concrete steps", "Porch steps", "Outdoor stairs"],
  },
  {
    id: "curb",
    label: "Curb",
    description:
      "Best for concrete curbs, landscape curbs, driveway curbs, and parking curbs.",
    uses: ["Concrete curb", "Landscape curb", "Driveway curb", "Parking curb"],
  },
];

export default function ConcreteCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [projectType, setProjectType] = useState<ProjectType>("slab");

  const [slabLength, setSlabLength] = useState("10");
  const [slabWidth, setSlabWidth] = useState("10");
  const [slabThickness, setSlabThickness] = useState("4");
  const [slabQuantity, setSlabQuantity] = useState("1");

  const [circleDiameter, setCircleDiameter] = useState("10");
  const [circleThickness, setCircleThickness] = useState("4");
  const [circleQuantity, setCircleQuantity] = useState("1");

  const [lShapeLengthOne, setLShapeLengthOne] = useState("12");
  const [lShapeWidthOne, setLShapeWidthOne] = useState("8");
  const [lShapeLengthTwo, setLShapeLengthTwo] = useState("6");
  const [lShapeWidthTwo, setLShapeWidthTwo] = useState("4");
  const [lShapeThickness, setLShapeThickness] = useState("4");

  const [footingLength, setFootingLength] = useState("40");
  const [footingWidth, setFootingWidth] = useState("12");
  const [footingDepth, setFootingDepth] = useState("12");
  const [footingQuantity, setFootingQuantity] = useState("1");

  const [roundPierDiameter, setRoundPierDiameter] = useState("12");
  const [roundPierDepth, setRoundPierDepth] = useState("3");
  const [roundPierQuantity, setRoundPierQuantity] = useState("4");

  const [rectPierLength, setRectPierLength] = useState("2");
  const [rectPierWidth, setRectPierWidth] = useState("2");
  const [rectPierHeight, setRectPierHeight] = useState("3");
  const [rectPierQuantity, setRectPierQuantity] = useState("1");

  const [wallLength, setWallLength] = useState("20");
  const [wallHeight, setWallHeight] = useState("4");
  const [wallThickness, setWallThickness] = useState("8");

  const [stairWidth, setStairWidth] = useState("4");
  const [stairRun, setStairRun] = useState("11");
  const [stairRise, setStairRise] = useState("7");
  const [stairCount, setStairCount] = useState("4");

  const [curbLength, setCurbLength] = useState("30");
  const [curbWidth, setCurbWidth] = useState("6");
  const [curbHeight, setCurbHeight] = useState("6");

  const [wastePercent, setWastePercent] = useState("10");
  const [pricePerUnit, setPricePerUnit] = useState("150");
  const [concreteOrderMode, setConcreteOrderMode] =
    useState<ConcreteOrderMode>("readyMix");
  const [pricePer80LbBag, setPricePer80LbBag] = useState("6.50");
  const [pricePer60LbBag, setPricePer60LbBag] = useState("5.50");
  const [copied, setCopied] = useState(false);

  const selectedProject = projectTypes.find((type) => type.id === projectType);

  const unitLabels =
    unitSystem === "imperial"
      ? {
          long: "ft",
          short: "in",
          price: "/ yd³",
          volumePrimary: "yd³",
          priceLabel: "Concrete Price Per Cubic Yard",
          recommendedRound: "nearest 0.25 yd³",
        }
      : {
          long: "m",
          short: "cm",
          price: "/ m³",
          volumePrimary: "m³",
          priceLabel: "Concrete Price Per Cubic Meter",
          recommendedRound: "nearest 0.1 m³",
        };

  const results = useMemo(() => {
    const waste = toNumber(wastePercent);
    const price = toNumber(pricePerUnit);

    let baseVolume = 0;
    let formulaLabel = "";

    if (projectType === "slab") {
      const length = toNumber(slabLength);
      const width = toNumber(slabWidth);
      const thickness =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(slabThickness))
          : centimetersToMeters(toNumber(slabThickness));
      const quantity = toNumber(slabQuantity);

      baseVolume = length * width * thickness * quantity;
      formulaLabel = "Length × width × thickness × quantity";
    }

    if (projectType === "circularPad") {
      const diameter = toNumber(circleDiameter);
      const radius = diameter / 2;
      const thickness =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(circleThickness))
          : centimetersToMeters(toNumber(circleThickness));
      const quantity = toNumber(circleQuantity);

      baseVolume = Math.PI * radius * radius * thickness * quantity;
      formulaLabel = "π × radius² × thickness × quantity";
    }

    if (projectType === "lShapedSlab") {
      const lengthOne = toNumber(lShapeLengthOne);
      const widthOne = toNumber(lShapeWidthOne);
      const lengthTwo = toNumber(lShapeLengthTwo);
      const widthTwo = toNumber(lShapeWidthTwo);
      const thickness =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(lShapeThickness))
          : centimetersToMeters(toNumber(lShapeThickness));

      baseVolume =
        lengthOne * widthOne * thickness + lengthTwo * widthTwo * thickness;

      formulaLabel = "Rectangle 1 volume + rectangle 2 volume";
    }

    if (projectType === "footing") {
      const length = toNumber(footingLength);
      const width =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(footingWidth))
          : centimetersToMeters(toNumber(footingWidth));
      const depth =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(footingDepth))
          : centimetersToMeters(toNumber(footingDepth));
      const quantity = toNumber(footingQuantity);

      baseVolume = length * width * depth * quantity;
      formulaLabel = "Length × width × depth × quantity";
    }

    if (projectType === "roundPier") {
      const diameter =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(roundPierDiameter))
          : centimetersToMeters(toNumber(roundPierDiameter));
      const radius = diameter / 2;
      const depth = toNumber(roundPierDepth);
      const quantity = toNumber(roundPierQuantity);

      baseVolume = Math.PI * radius * radius * depth * quantity;
      formulaLabel = "π × radius² × depth × quantity";
    }

    if (projectType === "rectangularPier") {
      const length = toNumber(rectPierLength);
      const width = toNumber(rectPierWidth);
      const height = toNumber(rectPierHeight);
      const quantity = toNumber(rectPierQuantity);

      baseVolume = length * width * height * quantity;
      formulaLabel = "Length × width × height × quantity";
    }

    if (projectType === "wall") {
      const length = toNumber(wallLength);
      const height = toNumber(wallHeight);
      const thickness =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(wallThickness))
          : centimetersToMeters(toNumber(wallThickness));

      baseVolume = length * height * thickness;
      formulaLabel = "Length × height × thickness";
    }

    if (projectType === "stairs") {
      const width = toNumber(stairWidth);
      const run =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(stairRun))
          : centimetersToMeters(toNumber(stairRun));
      const rise =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(stairRise))
          : centimetersToMeters(toNumber(stairRise));
      const count = toNumber(stairCount);

      baseVolume = width * run * rise * count;
      formulaLabel = "Width × run × rise × number of steps";
    }

    if (projectType === "curb") {
      const length = toNumber(curbLength);
      const width =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(curbWidth))
          : centimetersToMeters(toNumber(curbWidth));
      const height =
        unitSystem === "imperial"
          ? inchesToFeet(toNumber(curbHeight))
          : centimetersToMeters(toNumber(curbHeight));

      baseVolume = length * width * height;
      formulaLabel = "Length × width × height";
    }

    const baseCubicFeet = unitSystem === "imperial" ? baseVolume : 0;
    const baseCubicYards = unitSystem === "imperial" ? baseCubicFeet / 27 : 0;
    const baseCubicMeters = unitSystem === "metric" ? baseVolume : 0;

    const volumeWithWaste =
      unitSystem === "imperial"
        ? baseCubicYards * (1 + waste / 100)
        : baseCubicMeters * (1 + waste / 100);

    const recommendedOrder =
      unitSystem === "imperial"
        ? roundUpToIncrement(volumeWithWaste, 0.25)
        : roundUpToIncrement(volumeWithWaste, 0.1);

    const estimatedCost = recommendedOrder * price;

    const recommendedCubicYards =
      unitSystem === "imperial" ? recommendedOrder : recommendedOrder * 1.30795;

    const truckLoads =
      recommendedCubicYards > 0 ? Math.ceil(recommendedCubicYards / 10) : 0;

    const eightyLbBagYieldYards = 0.022;
    const sixtyLbBagYieldYards = 0.0167;

    const eightyLbBags =
      recommendedCubicYards > 0
        ? Math.ceil(recommendedCubicYards / eightyLbBagYieldYards)
        : 0;

    const sixtyLbBags =
      recommendedCubicYards > 0
        ? Math.ceil(recommendedCubicYards / sixtyLbBagYieldYards)
        : 0;

    const eightyLbPallets =
      eightyLbBags > 0 ? Math.ceil(eightyLbBags / 42) : 0;

    const sixtyLbPallets =
      sixtyLbBags > 0 ? Math.ceil(sixtyLbBags / 56) : 0;

    const eightyLbBagCost = eightyLbBags * toNumber(pricePer80LbBag);
    const sixtyLbBagCost = sixtyLbBags * toNumber(pricePer60LbBag);

    const exceedsOnePickupPallet = eightyLbBags > 42 || sixtyLbBags > 56;

    return {
      baseCubicFeet,
      baseCubicYards,
      baseCubicMeters,
      volumeWithWaste,
      recommendedOrder,
      estimatedCost,
      recommendedCubicYards,
      truckLoads,
      eightyLbBags,
      sixtyLbBags,
      eightyLbPallets,
      sixtyLbPallets,
      eightyLbBagCost,
      sixtyLbBagCost,
      exceedsOnePickupPallet,
      formulaLabel,
    };
  }, [
    unitSystem,
    projectType,
    slabLength,
    slabWidth,
    slabThickness,
    slabQuantity,
    circleDiameter,
    circleThickness,
    circleQuantity,
    lShapeLengthOne,
    lShapeWidthOne,
    lShapeLengthTwo,
    lShapeWidthTwo,
    lShapeThickness,
    footingLength,
    footingWidth,
    footingDepth,
    footingQuantity,
    roundPierDiameter,
    roundPierDepth,
    roundPierQuantity,
    rectPierLength,
    rectPierWidth,
    rectPierHeight,
    rectPierQuantity,
    wallLength,
    wallHeight,
    wallThickness,
    stairWidth,
    stairRun,
    stairRise,
    stairCount,
    curbLength,
    curbWidth,
    curbHeight,
    wastePercent,
    pricePerUnit,
    pricePer80LbBag,
    pricePer60LbBag,
  ]);

  async function copyResults() {
    const projectLabel = selectedProject?.label ?? "Concrete Project";

    const resultText =
      unitSystem === "imperial"
        ? `Numeravo Concrete Estimate
Project Type: ${projectLabel}
Unit System: Imperial
Order Method: ${concreteOrderMode === "bags" ? "Concrete Bags" : "Ready-Mix Truck"}
Cubic Feet: ${formatNumber(results.baseCubicFeet)} ft³
Cubic Yards Before Waste: ${formatNumber(results.baseCubicYards)} yd³
Concrete With Waste: ${formatNumber(results.volumeWithWaste)} yd³
Recommended Order: ${formatNumber(results.recommendedOrder)} yd³
Estimated Material Cost: ${formatCurrency(results.estimatedCost)}
${concreteOrderMode === "readyMix" ? `Standard Truck Capacity: 10 yd³ maximum legal load
Estimated Truck Loads: ${results.truckLoads}` : `80 lb Bags Needed: ${results.eightyLbBags}
80 lb Pallets: ${results.eightyLbPallets} pallet${results.eightyLbPallets === 1 ? "" : "s"} at 42 bags per pallet
Cost Per 80 lb Bag: ${formatCurrency(toNumber(pricePer80LbBag))}
Estimated 80 lb Bag Cost: ${formatCurrency(results.eightyLbBagCost)}
60 lb Bags Needed: ${results.sixtyLbBags}
60 lb Pallets: ${results.sixtyLbPallets} pallet${results.sixtyLbPallets === 1 ? "" : "s"} at 56 bags per pallet
Cost Per 60 lb Bag: ${formatCurrency(toNumber(pricePer60LbBag))}
Estimated 60 lb Bag Cost: ${formatCurrency(results.sixtyLbBagCost)}
Recommendation: ${results.exceedsOnePickupPallet ? "This exceeds one pickup-load pallet. Consider ready-mix truck delivery." : "This is within one common pickup-load pallet."}`}`
        : `Numeravo Concrete Estimate
Project Type: ${projectLabel}
Unit System: Metric
Cubic Meters Before Waste: ${formatNumber(results.baseCubicMeters)} m³
Concrete With Waste: ${formatNumber(results.volumeWithWaste)} m³
Recommended Order: ${formatNumber(results.recommendedOrder)} m³
Estimated Material Cost: ${formatCurrency(results.estimatedCost)}`;

    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
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
                name: "Numeravo Concrete Calculator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://numeravo.com/construction/concrete-calculator",
                description:
                  "Estimate concrete volume, waste-adjusted order amount, and material cost for slabs, pads, footings, trenches, piers, sonotubes, walls, stairs, curbs, and columns.",
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
                    name: "Concrete Calculator",
                    item: "https://numeravo.com/construction/concrete-calculator",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Can this calculator handle metric and imperial units?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Use the unit system toggle to switch between imperial units like feet, inches, and cubic yards, or metric units like meters, centimeters, and cubic meters.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many cubic feet are in one cubic yard of concrete?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "One cubic yard contains 27 cubic feet. That is why imperial concrete estimates divide cubic feet by 27 to estimate cubic yards.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much waste should I add for concrete?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A common waste allowance is 5% to 10%. Complex pours, uneven excavation, difficult access, or multiple forms may need more.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can this calculator be used for sonotubes?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Use the Round Pier / Sonotube mode. Enter the tube diameter, depth, and quantity to estimate the required concrete.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many bags of concrete are on a pallet?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A common pallet contains about 42 bags of 80 lb concrete or 56 bags of 60 lb concrete. The calculator estimates both bag sizes and pallet counts for imperial concrete projects.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "When should I use concrete bags instead of a ready-mix truck?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Concrete bags are usually best for small pours, post holes, small pads, patch work, and projects where a truck cannot easily access the site. If the estimate exceeds one pallet of bags, ready-mix truck delivery may be safer and more practical.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does this include labor or delivery fees?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. The estimated cost only calculates material cost based on the recommended order amount and the price per cubic yard or cubic meter.",
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
            Concrete Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Calculate concrete volume, waste-adjusted order amount, and material
            cost for slabs, pads, footings, trenches, piers, sonotubes, walls,
            stairs, curbs, and columns.
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
                description="Feet, inches, cubic yards"
                onClick={() => setUnitSystem("imperial")}
              />

              <ToggleButton
                isActive={unitSystem === "metric"}
                label="Metric"
                description="Meters, centimeters, cubic meters"
                onClick={() => setUnitSystem("metric")}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
          <p className="mb-4 text-sm font-semibold text-white">
            Choose project type
          </p>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Concrete Order Method
              </p>
              <p className="mt-1 text-sm text-[#A0AEC0]">
                Show results as ready-mix cubic yards or concrete bags and pallets.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ToggleButton
                isActive={concreteOrderMode === "readyMix"}
                label="Ready-Mix Truck"
                description="Cubic yards, truck loads"
                onClick={() => setConcreteOrderMode("readyMix")}
              />

              <ToggleButton
                isActive={concreteOrderMode === "bags"}
                label="Concrete Bags"
                description="60 lb, 80 lb, pallets"
                onClick={() => setConcreteOrderMode("bags")}
              />
            </div>
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

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProject?.uses.map((use) => (
                <span
                  key={use}
                  className="rounded-full border border-[#1F2937] bg-[#0B0F19] px-3 py-1 text-xs text-[#A0AEC0]"
                >
                  {use}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {projectType === "slab" && (
                <>
                  <NumberInput
                    label="Length"
                    value={slabLength}
                    onChange={setSlabLength}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Width"
                    value={slabWidth}
                    onChange={setSlabWidth}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Thickness"
                    value={slabThickness}
                    onChange={setSlabThickness}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Quantity"
                    value={slabQuantity}
                    onChange={setSlabQuantity}
                    suffix="slabs"
                  />
                </>
              )}

              {projectType === "circularPad" && (
                <>
                  <NumberInput
                    label="Diameter"
                    value={circleDiameter}
                    onChange={setCircleDiameter}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Thickness"
                    value={circleThickness}
                    onChange={setCircleThickness}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Quantity"
                    value={circleQuantity}
                    onChange={setCircleQuantity}
                    suffix="pads"
                  />
                </>
              )}

              {projectType === "lShapedSlab" && (
                <>
                  <NumberInput
                    label="Rectangle 1 Length"
                    value={lShapeLengthOne}
                    onChange={setLShapeLengthOne}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Rectangle 1 Width"
                    value={lShapeWidthOne}
                    onChange={setLShapeWidthOne}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Rectangle 2 Length"
                    value={lShapeLengthTwo}
                    onChange={setLShapeLengthTwo}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Rectangle 2 Width"
                    value={lShapeWidthTwo}
                    onChange={setLShapeWidthTwo}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Thickness"
                    value={lShapeThickness}
                    onChange={setLShapeThickness}
                    suffix={unitLabels.short}
                  />
                </>
              )}

              {projectType === "footing" && (
                <>
                  <NumberInput
                    label="Total Length"
                    value={footingLength}
                    onChange={setFootingLength}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Footing Width"
                    value={footingWidth}
                    onChange={setFootingWidth}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Footing Depth"
                    value={footingDepth}
                    onChange={setFootingDepth}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Quantity"
                    value={footingQuantity}
                    onChange={setFootingQuantity}
                    suffix="runs"
                  />
                </>
              )}

              {projectType === "roundPier" && (
                <>
                  <NumberInput
                    label="Diameter"
                    value={roundPierDiameter}
                    onChange={setRoundPierDiameter}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Depth"
                    value={roundPierDepth}
                    onChange={setRoundPierDepth}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Quantity"
                    value={roundPierQuantity}
                    onChange={setRoundPierQuantity}
                    suffix="piers"
                  />
                </>
              )}

              {projectType === "rectangularPier" && (
                <>
                  <NumberInput
                    label="Length"
                    value={rectPierLength}
                    onChange={setRectPierLength}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Width"
                    value={rectPierWidth}
                    onChange={setRectPierWidth}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Height"
                    value={rectPierHeight}
                    onChange={setRectPierHeight}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Quantity"
                    value={rectPierQuantity}
                    onChange={setRectPierQuantity}
                    suffix="piers"
                  />
                </>
              )}

              {projectType === "wall" && (
                <>
                  <NumberInput
                    label="Length"
                    value={wallLength}
                    onChange={setWallLength}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Height"
                    value={wallHeight}
                    onChange={setWallHeight}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Thickness"
                    value={wallThickness}
                    onChange={setWallThickness}
                    suffix={unitLabels.short}
                  />
                </>
              )}

              {projectType === "stairs" && (
                <>
                  <NumberInput
                    label="Step Width"
                    value={stairWidth}
                    onChange={setStairWidth}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Step Run"
                    value={stairRun}
                    onChange={setStairRun}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Step Rise"
                    value={stairRise}
                    onChange={setStairRise}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Number of Steps"
                    value={stairCount}
                    onChange={setStairCount}
                    suffix="steps"
                  />
                </>
              )}

              {projectType === "curb" && (
                <>
                  <NumberInput
                    label="Length"
                    value={curbLength}
                    onChange={setCurbLength}
                    suffix={unitLabels.long}
                  />
                  <NumberInput
                    label="Curb Width"
                    value={curbWidth}
                    onChange={setCurbWidth}
                    suffix={unitLabels.short}
                  />
                  <NumberInput
                    label="Curb Height"
                    value={curbHeight}
                    onChange={setCurbHeight}
                    suffix={unitLabels.short}
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
                label={unitLabels.priceLabel}
                value={pricePerUnit}
                onChange={setPricePerUnit}
                prefix="$"
                suffix={unitLabels.price}
                wide
              />

              {concreteOrderMode === "bags" && (
                <>
                  <NumberInput
                    label="Cost Per 80 lb Bag"
                    value={pricePer80LbBag}
                    onChange={setPricePer80LbBag}
                    prefix="$"
                    suffix="/ bag"
                  />

                  <NumberInput
                    label="Cost Per 60 lb Bag"
                    value={pricePer60LbBag}
                    onChange={setPricePer60LbBag}
                    prefix="$"
                    suffix="/ bag"
                  />
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
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
                {concreteOrderMode === "bags"
                  ? "Recommended bag estimate"
                  : "Recommended order amount"}
              </p>

              <p className="mt-2 text-4xl font-bold text-[#F97316]">
                {concreteOrderMode === "bags"
                  ? `${results.eightyLbBags} 80 lb bags`
                  : `${formatNumber(results.recommendedOrder)} ${unitLabels.volumePrimary}`}
              </p>

              <p className="mt-2 text-sm text-[#A0AEC0]">
                {concreteOrderMode === "bags"
                  ? `Alternative: ${results.sixtyLbBags} bags at 60 lb each.`
                  : `Rounded up to the ${unitLabels.recommendedRound}.`}
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {unitSystem === "imperial" ? (
                <>
                  <ResultRow
                    label="Cubic Feet"
                    value={`${formatNumber(results.baseCubicFeet)} ft³`}
                  />
                  <ResultRow
                    label="Cubic Yards Before Waste"
                    value={`${formatNumber(results.baseCubicYards)} yd³`}
                  />
                  <ResultRow
                    label="Cubic Yards With Waste"
                    value={`${formatNumber(results.volumeWithWaste)} yd³`}
                    highlight
                  />
                  <ResultRow
                    label="Recommended Order"
                    value={`${formatNumber(results.recommendedOrder)} yd³`}
                    highlight
                  />
                </>
              ) : (
                <>
                  <ResultRow
                    label="Cubic Meters Before Waste"
                    value={`${formatNumber(results.baseCubicMeters)} m³`}
                  />
                  <ResultRow
                    label="Cubic Meters With Waste"
                    value={`${formatNumber(results.volumeWithWaste)} m³`}
                    highlight
                  />
                  <ResultRow
                    label="Recommended Order"
                    value={`${formatNumber(results.recommendedOrder)} m³`}
                    highlight
                  />
                </>
              )}

              <ResultRow
                label="Estimated Material Cost"
                value={formatCurrency(results.estimatedCost)}
                highlight
              />

              {unitSystem === "imperial" && concreteOrderMode === "readyMix" && (
                <>
                  <ResultRow
                    label="Standard Truck Capacity"
                    value="10 yd³ maximum legal load"
                  />
                  <ResultRow
                    label="Estimated Truck Loads"
                    value={`${results.truckLoads} load${results.truckLoads === 1 ? "" : "s"}`}
                    highlight={results.truckLoads > 1}
                  />
                </>
              )}

              {unitSystem === "imperial" && concreteOrderMode === "bags" && (
                <>
                  <ResultRow
                    label="80 lb Bags Needed"
                    value={`${results.eightyLbBags} bags`}
                    highlight
                  />
                  <ResultRow
                    label="80 lb Pallets"
                    value={`${results.eightyLbPallets} pallet${results.eightyLbPallets === 1 ? "" : "s"} at 42 bags per pallet`}
                  />
                  <ResultRow
                    label="Cost Per 80 lb Bag"
                    value={formatCurrency(toNumber(pricePer80LbBag))}
                  />
                  <ResultRow
                    label="Estimated 80 lb Bag Cost"
                    value={formatCurrency(results.eightyLbBagCost)}
                    highlight
                  />
                  <ResultRow
                    label="60 lb Bags Needed"
                    value={`${results.sixtyLbBags} bags`}
                  />
                  <ResultRow
                    label="60 lb Pallets"
                    value={`${results.sixtyLbPallets} pallet${results.sixtyLbPallets === 1 ? "" : "s"} at 56 bags per pallet`}
                  />
                  <ResultRow
                    label="Cost Per 60 lb Bag"
                    value={formatCurrency(toNumber(pricePer60LbBag))}
                  />
                  <ResultRow
                    label="Estimated 60 lb Bag Cost"
                    value={formatCurrency(results.sixtyLbBagCost)}
                  />

                  {results.exceedsOnePickupPallet && (
                    <div className="rounded-xl border border-[#F97316] bg-[#0B0F19] p-4 text-sm leading-6 text-[#A0AEC0]">
                      <p className="font-semibold text-white">
                        Truck delivery recommended
                      </p>
                      <p className="mt-2">
                        This estimate exceeds one pickup-load pallet. One pallet
                        is commonly 42 bags of 80 lb concrete or 56 bags of 60 lb
                        concrete. For more than one pallet, consider ready-mix
                        truck delivery instead of pickup from a home improvement
                        store.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Bags vs Ready-Mix
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Concrete bags vs ready-mix truck delivery
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Concrete bags are usually best for small pours, post holes, patch
              work, small pads, and jobs where a truck cannot easily access the
              site. Ready-mix truck delivery is usually better for larger slabs,
              driveways, patios, footings, and projects that need more than one
              pallet of bagged concrete.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Bagged concrete
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Good for small projects. This calculator estimates both 80 lb
                  and 60 lb bag counts, including pallet quantities and estimated
                  bag cost.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Pickup truck limit
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  One common pickup-load pallet is about 42 bags of 80 lb
                  concrete or 56 bags of 60 lb concrete. If your estimate exceeds
                  one pallet, truck delivery may be safer and more practical.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Ready-mix truck
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Ready-mix is typically ordered by the cubic yard. A standard
                  concrete truck is commonly limited to about 10 cubic yards per
                  legal load, so larger pours may require multiple loads.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <h3 className="text-sm font-semibold text-white">
                Compare bags vs truck delivery by project type
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/construction/concrete-slab-calculator"
                  className="rounded-lg border border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
                >
                  Slabs, patios, driveways, and pads
                </Link>

                <Link
                  href="/construction/concrete-footing-calculator"
                  className="rounded-lg border border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
                >
                  Footings, trenches, and grade beams
                </Link>

                <Link
                  href="/construction/sonotube-concrete-calculator"
                  className="rounded-lg border border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
                >
                  Sonotubes, post holes, and piers
                </Link>

                <Link
                  href="/construction/concrete-wall-calculator"
                  className="rounded-lg border border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
                >
                  Walls, stem walls, and retaining walls
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Concrete Bag FAQ
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Concrete bags, pallets, and ready-mix FAQs
            </h2>

            <div className="mt-6 space-y-5">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
                <h3 className="text-sm font-semibold text-white">
                  How many bags of concrete are on a pallet?
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#A0AEC0]">
                  A common pallet contains about 42 bags of 80 lb concrete or
                  56 bags of 60 lb concrete. The calculator estimates both bag
                  sizes and pallet counts for imperial concrete projects.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
                <h3 className="text-sm font-semibold text-white">
                  When should I use concrete bags instead of a ready-mix truck?
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#A0AEC0]">
                  Concrete bags are usually best for small pours, post holes,
                  small pads, patch work, and projects where a truck cannot
                  easily access the site. If the estimate exceeds one pallet of
                  bags, ready-mix truck delivery may be safer and more practical.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
                <h3 className="text-sm font-semibold text-white">
                  How many cubic yards fit in a standard concrete truck?
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#A0AEC0]">
                  A standard concrete truck is commonly limited to about 10 cubic
                  yards per legal load. Larger projects may require multiple
                  loads, while very small orders may involve short-load fees from
                  the supplier.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Concrete guides
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              More concrete calculators and guides
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Use these focused concrete guides for specific project types, or
              continue using the full concrete calculator above for slabs,
              footings, piers, walls, stairs, curbs, and columns.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
  <GuideLink
    href="/construction/area-calculator"
    title="Area Calculator"
    text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating concrete volume."
  />

  <GuideLink
    href="/construction/concrete-cost-calculator"
    title="Concrete Cost Calculator"
    text="Estimate concrete price, cubic yards, base material, rebar, labor, prep, delivery fees, and total project cost."
  />

  <GuideLink
    href="/construction/concrete-slab-calculator"
    title="Concrete Slab Calculator"
    text="Estimate concrete for patios, driveways, sidewalks, garage floors, and shed pads."
  />

  <GuideLink
    href="/construction/base-for-concrete-slab-depth"
    title="Base for Concrete Slab Depth"
    text="Learn common gravel, crushed stone, and road base depths for concrete slabs, patios, driveways, and shed pads."
  />

  <GuideLink
    href="/construction/how-to-prepare-ground-for-concrete-slab"
    title="How to Prepare Ground for Concrete Slab"
    text="Learn excavation, grading, gravel base, compaction, forms, and final slab prep steps."
  />

  <GuideLink
    href="/construction/gravel-calculator"
    title="Gravel Calculator"
    text="Estimate gravel base material for concrete slabs, patios, driveways, walkways, and pads."
  />

  <GuideLink
    href="/construction/road-base-calculator"
    title="Road Base Calculator"
    text="Estimate road base cubic yards, tons, waste, and cost using the Road Base material preset."
  />

  <GuideLink
    href="/construction/concrete-footing-calculator"
    title="Concrete Footing Calculator"
    text="Estimate concrete for strip footings, trenches, wall footings, and grade beams."
  />

  <GuideLink
    href="/construction/sonotube-concrete-calculator"
    title="Sonotube Concrete Calculator"
    text="Estimate concrete for sonotubes, deck posts, fence posts, round piers, and post holes."
  />

  <GuideLink
    href="/construction/concrete-wall-calculator"
    title="Concrete Wall Calculator"
    text="Estimate concrete for foundation walls, retaining walls, stem walls, and poured wall sections."
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

function GuideLink({
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

function toNumber(value: string) {
  const number = Number(value);

  if (Number.isNaN(number) || number < 0) {
    return 0;
  }

  return number;
}

function inchesToFeet(value: number) {
  return value / 12;
}

function centimetersToMeters(value: number) {
  return value / 100;
}

function roundUpToIncrement(value: number, increment: number) {
  if (value <= 0) {
    return 0;
  }

  return Math.ceil(value / increment) * increment;
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