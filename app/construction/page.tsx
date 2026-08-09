import Link from "next/link";

const calculatorSections = [
  {
    title: "Concrete Volume & Material",
    description:
      "Estimate concrete yards, bags, mix ratios, slab thickness, cure time, PSI, waste, and weight.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Concrete Calculator",
        description:
          "Estimate concrete volume, waste, cost, slabs, footings, piers, walls, stairs, curbs, and more.",
        href: "/construction/concrete-calculator",
        status: "Live",
      },
      {
        title: "Concrete Yard Calculator",
        description:
          "Calculate cubic yards of concrete for slabs, patios, driveways, footings, walls, piers, pads, and known-volume projects.",
        href: "/construction/concrete-yard-calculator",
        status: "Live",
      },
      {
        title: "How Much Concrete Do I Need?",
        description:
          "Estimate concrete yards, bags, ready-mix loads, waste allowance, weight, and material cost.",
        href: "/construction/how-much-concrete-do-i-need",
        status: "Live",
      },
      {
        title: "Concrete Bag Calculator",
        description:
          "Estimate how many 40 lb, 50 lb, 60 lb, or 80 lb bags of concrete you need.",
        href: "/construction/concrete-bag-calculator",
        status: "Live",
      },
      {
        title: "Concrete Mix Ratio Calculator",
        description:
          "Estimate cement, sand, gravel, water, cement bags, and material quantities for common mix ratios.",
        href: "/construction/concrete-mix-ratio",
        status: "Live",
      },
      {
        title: "Concrete Slab Thickness Calculator",
        description:
          "Estimate recommended slab thickness, concrete yards, base depth, reinforcement notes, weight, and material cost.",
        href: "/construction/concrete-slab-thickness",
        status: "Live",
      },
      {
        title: "Concrete Cure Time Calculator",
        description:
          "Estimate when concrete may be ready for walking, light use, vehicles, sealing, form removal, and full cure.",
        href: "/construction/concrete-cure-time",
        status: "Live",
      },
      {
        title: "Concrete PSI Calculator",
        description:
          "Estimate recommended concrete strength for slabs, driveways, patios, sidewalks, garage floors, footings, and pads.",
        href: "/construction/concrete-psi-calculator",
        status: "Live",
      },
      {
        title: "Concrete Waste Calculator",
        description:
          "Estimate concrete waste allowance, extra yards, final order quantity, waste cost, truckload impact, and bag count impact.",
        href: "/construction/concrete-waste-calculator",
        status: "Live",
      },
      {
        title: "Concrete Weight Calculator",
        description:
          "Estimate concrete weight in pounds, tons, kilograms, and metric tons from yards, cubic feet, bags, truckloads, and density.",
        href: "/construction/concrete-weight-calculator",
        status: "Live",
      },
    ],
  },
  {
    title: "Concrete Cost, Delivery & Labor",
    description:
      "Estimate concrete pricing, delivery fees, short-load charges, pumping, finishing, labor, and total project cost.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Concrete Cost Calculator",
        description:
          "Estimate concrete price, cubic yards, base material, rebar, labor, prep, delivery fees, and total project cost.",
        href: "/construction/concrete-cost-calculator",
        status: "Live",
      },
      {
        title: "Concrete Cost Per Yard Calculator",
        description:
          "Estimate ready-mix concrete price per cubic yard, delivery fees, short-load charges, fuel fees, waste, tax, and total delivered cost.",
        href: "/construction/concrete-cost-per-yard",
        status: "Live",
      },
      {
        title: "Concrete Delivery Cost Calculator",
        description:
          "Estimate ready-mix delivery fees, short-load charges, fuel fees, distance fees, waiting time, tax, and delivered cost per yard.",
        href: "/construction/concrete-delivery-cost-calculator",
        status: "Live",
      },
      {
        title: "Concrete Short Load Fee Calculator",
        description:
          "Estimate ready-mix short-load charges for small concrete orders and compare supplier minimums or bagged concrete.",
        href: "/construction/concrete-short-load-fee-calculator",
        status: "Live",
      },
      {
        title: "Concrete Truckload Calculator",
        description:
          "Estimate ready-mix concrete truckloads, cubic yards to order, truck capacity, delivery fees, short-load fees, weight, and delivery cost.",
        href: "/construction/concrete-truckload-calculator",
        status: "Live",
      },
      {
        title: "Concrete Pump Truck Cost Calculator",
        description:
          "Estimate line pump or boom pump cost, minimum rental charges, hourly pumping cost, setup fees, travel fees, and yardage charges.",
        href: "/construction/concrete-pump-truck-cost-calculator",
        status: "Live",
      },
      {
        title: "Concrete Labor Cost Calculator",
        description:
          "Estimate crew hours, person hours, labor rate, production rate, setup, forming, finishing, cleanup, overhead, and total labor cost.",
        href: "/construction/concrete-labor-cost-calculator",
        status: "Live",
      },
      {
        title: "Concrete Finishing Cost Calculator",
        description:
          "Estimate finishing cost by square footage, finish type, labor rate, crew productivity, curing, sealing, saw cuts, and cost per square foot.",
        href: "/construction/concrete-finishing-cost-calculator",
        status: "Live",
      },
      {
        title: "10x10 Concrete Slab Cost Calculator",
        description:
          "Estimate concrete yards, ready-mix cost, base material, reinforcement, forms, labor, delivery fees, and total cost for a 100 square foot slab.",
        href: "/construction/10x10-concrete-slab-cost",
        status: "Live",
      },
      {
        title: "12x12 Concrete Slab Cost Calculator",
        description:
          "Estimate concrete yards, ready-mix cost, base material, reinforcement, forms, labor, delivery fees, and total cost for a 144 square foot slab.",
        href: "/construction/12x12-concrete-slab-cost",
        status: "Live",
      },
    ],
  },
  {
    title: "Flatwork, Forms & Joints",
    description:
      "Estimate slabs, driveways, patios, sidewalks, pads, stairs, forms, saw cuts, control joints, and expansion joints.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Concrete Slab Calculator",
        description:
          "Estimate concrete for slabs, patios, driveways, sidewalks, garage floors, and shed pads.",
        href: "/construction/concrete-slab-calculator",
        status: "Guide",
      },
      {
        title: "Concrete Driveway Calculator",
        description:
          "Estimate driveway cubic yards, slab thickness, gravel base, rebar, waste, delivery, labor, finishing, and total project cost.",
        href: "/construction/concrete-driveway-calculator",
        status: "Live",
      },
      {
        title: "Concrete Patio Calculator",
        description:
          "Estimate patio cubic yards, slab thickness, gravel base, reinforcement, waste, delivery, labor, finishing, and total project cost.",
        href: "/construction/concrete-patio-calculator",
        status: "Live",
      },
      {
        title: "Concrete Sidewalk Calculator",
        description:
          "Estimate sidewalk cubic yards, thickness, gravel base, forms, waste, delivery, labor, finishing, and total project cost.",
        href: "/construction/concrete-sidewalk-calculator",
        status: "Live",
      },
      {
        title: "Concrete Pad Calculator",
        description:
          "Estimate pad cubic yards, thickness, gravel base, forms, reinforcement, waste, delivery, labor, finishing, and total project cost.",
        href: "/construction/concrete-pad-calculator",
        status: "Live",
      },
      {
        title: "Concrete Stairs Calculator",
        description:
          "Estimate stair cubic yards, step count, riser height, tread depth, forms, reinforcement, waste, delivery, labor, and finishing.",
        href: "/construction/concrete-stairs-calculator",
        status: "Live",
      },
      {
        title: "Concrete Formwork Calculator",
        description:
          "Estimate form boards, stakes, bracing, screws, form oil, labor, material cost, and total formwork cost.",
        href: "/construction/concrete-formwork-calculator",
        status: "Live",
      },
      {
        title: "Concrete Saw Cut Calculator",
        description:
          "Calculate saw cut depth, spacing, number of cuts, linear feet, control joint layout, demolition cuts, and saw cutting cost.",
        href: "/construction/concrete-saw-cut-calculator",
        status: "Live",
      },
      {
        title: "Concrete Control Joint Spacing Calculator",
        description:
          "Estimate control joint spacing, saw cut depth, panel layout, number of cuts, and total cut length.",
        href: "/construction/concrete-control-joint-spacing",
        status: "Live",
      },
      {
        title: "Concrete Expansion Joint Spacing Calculator",
        description:
          "Estimate expansion joint spacing, joint count, joint layout, isolation joint length, material length, and joint cost.",
        href: "/construction/concrete-expansion-joint-spacing",
        status: "Live",
      },
    ],
  },
  {
    title: "Footings, Walls & Piers",
    description:
      "Estimate concrete for strip footings, sonotubes, piers, poured walls, foundation walls, and retaining walls.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Concrete Footing Calculator",
        description:
          "Estimate concrete for strip footings, trench footings, wall footings, and grade beams.",
        href: "/construction/concrete-footing-calculator",
        status: "Guide",
      },
      {
        title: "Sonotube Concrete Calculator",
        description:
          "Estimate concrete for sonotubes, round piers, deck posts, fence posts, and post holes.",
        href: "/construction/sonotube-concrete-calculator",
        status: "Guide",
      },
      {
        title: "Concrete Wall Calculator",
        description:
          "Estimate concrete for foundation walls, retaining walls, stem walls, and poured wall sections.",
        href: "/construction/concrete-wall-calculator",
        status: "Guide",
      },
    ],
  },
  {
    title: "Rebar & Reinforcement",
    description:
      "Estimate rebar grids, spacing, lap splices, weight, welded wire mesh, reinforcement material, and cost.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Rebar Calculator",
        description:
          "Estimate rebar pieces, spacing, linear feet, stick count, weight, lap allowance, waste, and material cost.",
        href: "/construction/rebar-calculator",
        status: "Live",
      },
      {
        title: "Rebar Lap Splice Calculator",
        description:
          "Calculate lap splice length, overlap length, splice quantity, added rebar length, bar weight, and splice material cost.",
        href: "/construction/rebar-lap-splice-calculator",
        status: "Live",
      },
      {
        title: "Rebar Spacing for Concrete Slab",
        description:
          "Estimate slab rebar spacing, grid layout, bar count, linear feet, lap allowance, waste, weight, and material cost.",
        href: "/construction/rebar-spacing-for-concrete-slab",
        status: "Live",
      },
      {
        title: "Rebar Weight Calculator",
        description:
          "Estimate rebar weight by size, bar length, quantity, total linear feet, pounds, tons, and material cost.",
        href: "/construction/rebar-weight-calculator",
        status: "Live",
      },
      {
        title: "Wire Mesh Calculator",
        description:
          "Estimate welded wire mesh sheets or rolls, slab area, overlap, waste, total mesh quantity, material cost, and cost per square foot.",
        href: "/construction/wire-mesh-calculator",
        status: "Live",
      },
    ],
  },
  {
    title: "Lumber & Framing",
    description:
      "Estimate lumber pieces, board feet, linear feet, waste allowance, and material cost for construction and woodworking projects.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Lumber Calculator",
        description:
          "Calculate lumber purchase quantity, linear feet, board feet, waste allowance, and estimated material cost.",
        href: "/construction/lumber-calculator",
        status: "Live",
      },
      {
        title: "Stud Calculator",
        description:
          "Estimate wall studs, spacing, corner and opening allowances, plates, waste, linear feet, and framing material cost.",
        href: "/construction/stud-calculator",
        status: "Live",
      },
    ],
  },
  {
    title: "Roofing",
    description:
      "Calculate roof pitch, slope, angle, roof area, roofing squares, shingles, materials, and project quantities.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Roof Pitch Calculator",
        description:
          "Convert roof rise and run into pitch ratio, angle, percent slope, multiplier, roof area, roofing squares, and common-rafter length.",
        href: "/construction/roof-pitch-calculator",
        status: "Live",
      },
      {
        title: "Roofing Calculator",
        description:
          "Estimate roof area, waste-adjusted roofing squares, material, labor, tear-off, disposal, fees, tax, and total project cost.",
        href: "/construction/roofing-calculator",
        status: "Live",
      },
    ],
  },
  {
    title: "Demolition & Removal",
    description:
      "Estimate concrete demolition, removal, disposal, haul-off, equipment, saw cutting, weight, and cleanup.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Concrete Demolition Calculator",
        description:
          "Estimate demolition time, crew days, production rate, saw-cut length, concrete weight, and haul-off loads.",
        href: "/construction/concrete-demolition-calculator",
        status: "Live",
      },
      {
        title: "Concrete Removal Cost Calculator",
        description:
          "Estimate concrete demolition, disposal, haul-off, labor, equipment, slab weight, and total removal cost.",
        href: "/construction/concrete-removal-cost-calculator",
        status: "Live",
      },
    ],
  },
  {
    title: "Gravel, Base & Stone",
    description:
      "Estimate gravel, crushed stone, road base, pea gravel, river rock, decomposed granite, drainage rock, and paver base.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Gravel Calculator",
        description:
          "Estimate gravel volume and material needs for driveways, patios, and base layers.",
        href: "/construction/gravel-calculator",
        status: "Live",
      },
      {
        title: "Gravel Driveway Calculator",
        description:
          "Estimate gravel tons, cubic yards, depth, waste, and material cost for driveway projects.",
        href: "/construction/gravel-driveway-calculator",
        status: "Guide",
      },
      {
        title: "Gravel Driveway Cost",
        description:
          "Estimate gravel driveway cost using driveway size, gravel depth, tons, price per ton, delivery, and project factors.",
        href: "/construction/gravel-driveway-cost",
        status: "Guide",
      },
      {
        title: "Gravel Cost Calculator",
        description:
          "Estimate gravel project cost using area, depth, cubic yards, tons, waste, price per ton, and delivery factors.",
        href: "/construction/gravel-cost-calculator",
        status: "Guide",
      },
      {
        title: "How Much Gravel Do I Need?",
        description:
          "Learn how to estimate gravel volume, cubic yards, tons, depth, waste, and material cost.",
        href: "/construction/how-much-gravel-do-i-need",
        status: "Guide",
      },
      {
        title: "Gravel Cost Per Ton",
        description:
          "Learn how gravel price per ton works and estimate total material cost for gravel projects.",
        href: "/construction/gravel-cost-per-ton",
        status: "Guide",
      },
      {
        title: "Pea Gravel Calculator",
        description:
          "Estimate pea gravel cubic yards, tons, cost, delivery, and coverage for landscaping, patios, walkways, playgrounds, and drainage.",
        href: "/construction/pea-gravel-calculator",
        status: "Live",
      },
      {
        title: "River Rock Calculator",
        description:
          "Estimate river rock cubic yards, tons, cost, delivery, and coverage for landscaping beds, dry creek beds, drainage, and borders.",
        href: "/construction/river-rock-calculator",
        status: "Live",
      },
      {
        title: "Drainage Rock Calculator",
        description:
          "Estimate drainage rock cubic yards, tons, delivery, and cost for French drains, trench drains, dry wells, retaining walls, and drainage beds.",
        href: "/construction/drainage-rock-calculator",
        status: "Live",
      },
      {
        title: "Decomposed Granite Calculator",
        description:
          "Estimate decomposed granite cubic yards, tons, cost, delivery, stabilizer add-ons, and coverage.",
        href: "/construction/decomposed-granite-calculator",
        status: "Live",
      },
      {
        title: "Crushed Stone Calculator",
        description:
          "Estimate crushed stone cubic yards, tons, waste, and cost using the upgraded gravel calculator material preset.",
        href: "/construction/crushed-stone-calculator",
        status: "Guide",
      },
      {
        title: "Crushed Stone vs Gravel",
        description:
          "Compare crushed stone and gravel for driveways, drainage, landscaping, patios, and base layers.",
        href: "/construction/crushed-stone-vs-gravel",
        status: "Guide",
      },
      {
        title: "Road Base Calculator",
        description:
          "Estimate road base cubic yards, tons, waste, and cost using the upgraded gravel calculator material preset.",
        href: "/construction/road-base-calculator",
        status: "Guide",
      },
      {
        title: "Paver Base Calculator",
        description:
          "Estimate compacted paver base gravel, bedding sand, cubic yards, tons, delivery, and cost.",
        href: "/construction/paver-base-calculator",
        status: "Live",
      },
      {
        title: "Base for Concrete Slab Depth",
        description:
          "Learn common gravel, crushed stone, and road base depths for concrete slabs, patios, driveways, shed pads, and garage slabs.",
        href: "/construction/base-for-concrete-slab-depth",
        status: "Guide",
      },
      {
        title: "How to Prepare Ground for Concrete Slab",
        description:
          "Learn how to prepare ground for a concrete slab, including excavation, grading, gravel base, compaction, forms, and final checks.",
        href: "/construction/how-to-prepare-ground-for-concrete-slab",
        status: "Guide",
      },
    ],
  },
  {
    title: "General Construction Tools",
    description:
      "Use general measurement tools for square footage, project areas, material estimates, and waste-adjusted area.",
    accent: "bg-[#F97316]",
    calculators: [
      {
        title: "Area Calculator",
        description:
          "Calculate square feet, square yards, square meters, acres, waste-adjusted area, and estimated material cost for multiple rooms or project areas.",
        href: "/construction/area-calculator",
        status: "Live",
      },
    ],
  },
];

const totalCalculators = calculatorSections.reduce(
  (total, section) => total + section.calculators.length,
  0,
);

export const metadata = {
  title: "Construction Calculators | Concrete, Lumber, Gravel & Rebar",
  description:
    "Use Numeravo construction calculators to estimate concrete, lumber, gravel, rebar, square footage, materials, delivery, labor, demolition, and project costs.",
  alternates: {
    canonical: "https://numeravo.com/construction",
  },
  openGraph: {
    title: "Construction Calculators | Numeravo",
    description:
      "Estimate concrete, lumber, gravel, rebar, square footage, materials, measurements, and construction project costs with Numeravo.",
    url: "https://numeravo.com/construction",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Calculators | Numeravo",
    description:
      "Fast construction calculators for concrete, lumber, gravel, rebar, square footage, materials, and project planning.",
  },
};

export default function ConstructionPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Link
            href="/"
            className="mb-5 inline-flex rounded-full border border-[#1F2937] bg-[#121826] px-4 py-2 text-sm font-medium text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
          >
            ← Numeravo home
          </Link>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
            Construction Calculators
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Construction calculators for concrete, lumber, gravel, rebar, and project planning.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate concrete, lumber, rebar, gravel, base material, square footage,
            labor, delivery, finishing, pumping, demolition, and other construction
            project numbers with fast, focused calculators and guides.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Calculator groups" value={calculatorSections.length.toString()} />
          <StatCard label="Construction tools" value={totalCalculators.toString()} />
          <StatCard label="Concrete focus" value="Volume + cost" />
          <StatCard label="Lumber + rebar" value="Material planning" />
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {calculatorSections.map((section) => (
            <a
              key={section.title}
              href={`#${section.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}
              className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4 text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              {section.title}
            </a>
          ))}
        </div>

        <div className="mt-12 space-y-12">
          {calculatorSections.map((section) => (
            <section
              key={section.title}
              id={section.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}
              className="scroll-mt-8"
            >
              <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <div className={`mb-4 h-2 w-14 rounded-full ${section.accent}`} />
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
                    {section.description}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-[#1F2937] bg-[#121826] px-4 py-2 text-xs font-semibold text-[#A0AEC0]">
                  {section.calculators.length} tools
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.calculators.map((calculator) => (
                  <CalculatorCard
                    key={calculator.href}
                    title={calculator.title}
                    description={calculator.description}
                    href={calculator.href}
                    status={calculator.status}
                    accent={section.accent}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5">
      <p className="text-sm text-[#A0AEC0]">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function CalculatorCard({
  title,
  description,
  href,
  status,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  status: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:-translate-y-1 hover:border-[#F97316] hover:shadow-2xl hover:shadow-orange-950/20"
    >
      <div className={`mb-4 h-2 w-12 rounded-full ${accent}`} />

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        <span className="rounded-full border border-[#1F2937] px-3 py-1 text-xs text-[#A0AEC0]">
          {status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">{description}</p>

      <p className="mt-5 text-sm font-semibold text-[#F97316] transition group-hover:text-orange-300">
        Open calculator →
      </p>
    </Link>
  );
}
