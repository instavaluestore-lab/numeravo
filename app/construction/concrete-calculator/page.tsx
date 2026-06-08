"use client";

import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";

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

const toolGroupsByProjectType: Record<
  ProjectType,
  {
    title: string;
    tools: { title: string; text: string }[];
  }[]
> = {
  slab: [
    {
      title: "Measuring & layout",
      tools: [
        {
          title: "Tape Measure",
          text: "Useful for checking slab length, width, and form layout.",
        },
        {
          title: "Laser Distance Measure",
          text: "Helpful for measuring larger slabs, driveways, and garage floors.",
        },
        {
          title: "Chalk Line",
          text: "Useful for marking straight layout lines before forming.",
        },
        {
          title: "Level",
          text: "Helps check form height, slope, and finished surface planning.",
        },
      ],
    },
    {
      title: "Forming & prep",
      tools: [
        {
          title: "Concrete Forms",
          text: "Used to hold the slab shape while concrete is poured.",
        },
        {
          title: "Form Stakes",
          text: "Keeps forms secure and aligned during the pour.",
        },
        {
          title: "Gravel Base",
          text: "Commonly used below slabs for drainage and support.",
        },
        {
          title: "Tamper / Compactor",
          text: "Helps compact the base before placing concrete.",
        },
      ],
    },
    {
      title: "Finishing",
      tools: [
        {
          title: "Screed Board",
          text: "Used to level wet concrete across the forms.",
        },
        {
          title: "Magnesium Float",
          text: "Helps smooth and level the concrete surface.",
        },
        {
          title: "Concrete Trowel",
          text: "Used for finishing and smoothing concrete.",
        },
        {
          title: "Concrete Sealer",
          text: "Helps protect finished concrete after curing.",
        },
      ],
    },
  ],
  circularPad: [
    {
      title: "Measuring & layout",
      tools: [
        {
          title: "Tape Measure",
          text: "Used to measure diameter and layout the circular form.",
        },
        {
          title: "Marking Paint",
          text: "Helpful for marking the circle outline before excavation.",
        },
        {
          title: "String Line",
          text: "Can help create a clean radius from the center point.",
        },
        {
          title: "Level",
          text: "Useful for checking the circular form height.",
        },
      ],
    },
    {
      title: "Forming & finishing",
      tools: [
        {
          title: "Flexible Concrete Forms",
          text: "Useful for forming round pads and curved edges.",
        },
        {
          title: "Form Stakes",
          text: "Keeps circular forms in place during the pour.",
        },
        {
          title: "Concrete Trowel",
          text: "Used to finish the circular pad surface.",
        },
        {
          title: "Work Gloves",
          text: "Protects hands while handling forms and concrete.",
        },
      ],
    },
  ],
  lShapedSlab: [
    {
      title: "Measuring & layout",
      tools: [
        {
          title: "Tape Measure",
          text: "Needed to measure both rectangle sections of the L-shape.",
        },
        {
          title: "Chalk Line",
          text: "Helps mark clean straight edges and inside corners.",
        },
        {
          title: "Framing Square",
          text: "Useful for checking L-shaped corners.",
        },
        {
          title: "Level",
          text: "Helps verify form height and slope.",
        },
      ],
    },
    {
      title: "Forming & finishing",
      tools: [
        {
          title: "Concrete Forms",
          text: "Used to create the outside and inside edges.",
        },
        {
          title: "Form Stakes",
          text: "Keeps the L-shaped forms locked in place.",
        },
        {
          title: "Screed Board",
          text: "Used to level concrete across each section.",
        },
        {
          title: "Concrete Edger",
          text: "Helps finish clean exposed slab edges.",
        },
      ],
    },
  ],
  footing: [
    {
      title: "Excavation & layout",
      tools: [
        {
          title: "Tape Measure",
          text: "Used to check total footing length, width, and depth.",
        },
        {
          title: "String Line",
          text: "Helps keep footing trenches straight.",
        },
        {
          title: "Trenching Shovel",
          text: "Useful for digging and cleaning footing trenches.",
        },
        {
          title: "Level",
          text: "Helps check trench depth and form alignment.",
        },
      ],
    },
    {
      title: "Pouring & reinforcement",
      tools: [
        {
          title: "Rebar Chairs",
          text: "Help position rebar inside the footing.",
        },
        {
          title: "Rebar Tie Wire",
          text: "Used to secure rebar before pouring concrete.",
        },
        {
          title: "Concrete Rake",
          text: "Helps move and spread concrete in long trenches.",
        },
        {
          title: "Work Gloves",
          text: "Protects hands while handling rebar and concrete.",
        },
      ],
    },
  ],
  roundPier: [
    {
      title: "Digging & forming",
      tools: [
        {
          title: "Post Hole Digger",
          text: "Useful for digging round post holes and pier holes.",
        },
        {
          title: "Auger",
          text: "Speeds up digging for multiple post holes.",
        },
        {
          title: "Sonotube Forms",
          text: "Used to form clean round concrete piers.",
        },
        {
          title: "Tape Measure",
          text: "Used to verify diameter, depth, and post spacing.",
        },
      ],
    },
    {
      title: "Setting & finishing",
      tools: [
        {
          title: "Level",
          text: "Helps keep posts and forms plumb.",
        },
        {
          title: "Concrete Mixing Tub",
          text: "Useful for small pier and post projects.",
        },
        {
          title: "Concrete Trowel",
          text: "Used to finish the top of round piers.",
        },
        {
          title: "Safety Glasses",
          text: "Protects eyes while digging, mixing, and pouring.",
        },
      ],
    },
  ],
  rectangularPier: [
    {
      title: "Forming & measuring",
      tools: [
        {
          title: "Tape Measure",
          text: "Used to measure pier width, length, and height.",
        },
        {
          title: "Concrete Forms",
          text: "Used to shape square or rectangular piers.",
        },
        {
          title: "Form Stakes",
          text: "Keeps pier forms stable while pouring.",
        },
        {
          title: "Level",
          text: "Helps keep forms square and plumb.",
        },
      ],
    },
    {
      title: "Pouring & finishing",
      tools: [
        {
          title: "Concrete Mixer",
          text: "Helpful for repeated pier or column pours.",
        },
        {
          title: "Concrete Trowel",
          text: "Used to finish the top surface.",
        },
        {
          title: "Work Gloves",
          text: "Protects hands when handling concrete and forms.",
        },
        {
          title: "Rubber Boots",
          text: "Useful when working around wet concrete.",
        },
      ],
    },
  ],
  wall: [
    {
      title: "Layout & forming",
      tools: [
        {
          title: "Tape Measure",
          text: "Used to measure wall length, height, and thickness.",
        },
        {
          title: "Level",
          text: "Helps check forms and wall alignment.",
        },
        {
          title: "Concrete Wall Forms",
          text: "Used to hold poured concrete walls in shape.",
        },
        {
          title: "Form Ties",
          text: "Helps secure wall forms during the pour.",
        },
      ],
    },
    {
      title: "Pouring & safety",
      tools: [
        {
          title: "Concrete Vibrator",
          text: "Helps consolidate concrete in wall forms.",
        },
        {
          title: "Rebar Tie Wire",
          text: "Used to secure wall reinforcement.",
        },
        {
          title: "Work Gloves",
          text: "Protects hands around forms, rebar, and concrete.",
        },
        {
          title: "Safety Glasses",
          text: "Protects eyes during forming and pouring.",
        },
      ],
    },
  ],
  stairs: [
    {
      title: "Layout & forming",
      tools: [
        {
          title: "Tape Measure",
          text: "Used to measure rise, run, width, and number of steps.",
        },
        {
          title: "Framing Square",
          text: "Useful for laying out consistent stair dimensions.",
        },
        {
          title: "Concrete Forms",
          text: "Used to shape each stair tread and riser.",
        },
        {
          title: "Level",
          text: "Helps keep stair forms even and aligned.",
        },
      ],
    },
    {
      title: "Finishing",
      tools: [
        {
          title: "Concrete Edger",
          text: "Helps create clean edges on stair treads.",
        },
        {
          title: "Concrete Trowel",
          text: "Used to finish step surfaces.",
        },
        {
          title: "Broom",
          text: "Can add slip-resistant texture to outdoor steps.",
        },
        {
          title: "Knee Pads",
          text: "Helpful when finishing low concrete steps.",
        },
      ],
    },
  ],
  curb: [
    {
      title: "Layout & forming",
      tools: [
        {
          title: "Tape Measure",
          text: "Used to measure curb length, width, and height.",
        },
        {
          title: "String Line",
          text: "Helps keep curb runs straight.",
        },
        {
          title: "Concrete Forms",
          text: "Used to shape curb edges.",
        },
        {
          title: "Form Stakes",
          text: "Keeps curb forms secure.",
        },
      ],
    },
    {
      title: "Finishing",
      tools: [
        {
          title: "Concrete Edger",
          text: "Helps round and finish exposed curb edges.",
        },
        {
          title: "Concrete Trowel",
          text: "Used to smooth curb surfaces.",
        },
        {
          title: "Work Gloves",
          text: "Protects hands while forming and finishing.",
        },
        {
          title: "Safety Glasses",
          text: "Protects eyes during cutting, forming, and pouring.",
        },
      ],
    },
  ],
};

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
  const [copied, setCopied] = useState(false);

  const selectedProject = projectTypes.find((type) => type.id === projectType);
  const selectedToolGroups = toolGroupsByProjectType[projectType];

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

    return {
      baseCubicFeet,
      baseCubicYards,
      baseCubicMeters,
      volumeWithWaste,
      recommendedOrder,
      estimatedCost,
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
  ]);

  async function copyResults() {
    const projectLabel = selectedProject?.label ?? "Concrete Project";

    const resultText =
      unitSystem === "imperial"
        ? `Numeravo Concrete Estimate
Project Type: ${projectLabel}
Unit System: Imperial
Cubic Feet: ${formatNumber(results.baseCubicFeet)} ft³
Cubic Yards Before Waste: ${formatNumber(results.baseCubicYards)} yd³
Concrete With Waste: ${formatNumber(results.volumeWithWaste)} yd³
Recommended Order: ${formatNumber(results.recommendedOrder)} yd³
Estimated Material Cost: ${formatCurrency(results.estimatedCost)}`
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
                Recommended order amount
              </p>

              <p className="mt-2 text-4xl font-bold text-[#F97316]">
                {formatNumber(results.recommendedOrder)}{" "}
                {unitLabels.volumePrimary}
              </p>

              <p className="mt-2 text-sm text-[#A0AEC0]">
                Rounded up to the {unitLabels.recommendedRound}.
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
            </div>
          </div>
        </div>
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