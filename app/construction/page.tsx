import Link from "next/link";

const calculators = [
  {
    title: "Concrete Calculator",
    description:
      "Estimate concrete volume, waste, cost, slabs, footings, piers, walls, stairs, curbs, and more.",
    href: "/construction/concrete-calculator",
    status: "Live",
  },
  {
    title: "Concrete Cost Calculator",
    description:
      "Estimate concrete price, cubic yards, base material, rebar, labor, prep, delivery fees, and total project cost.",
    href: "/construction/concrete-cost-calculator",
    status: "Live",
  },
  {
    title: "Concrete Bag Calculator",
    description:
      "Estimate how many 40 lb, 50 lb, 60 lb, or 80 lb bags of concrete you need for slabs, pads, post holes, footings, patios, and small concrete projects.",
    href: "/construction/concrete-bag-calculator",
    status: "Live",
  },
  {
    title: "Rebar Calculator",
    description:
      "Estimate rebar pieces, spacing, linear feet, stick count, weight, lap allowance, waste, and material cost for slabs, footings, patios, and concrete reinforcement grids.",
    href: "/construction/rebar-calculator",
    status: "Live",
  },
  {
    title: "Concrete Slab Calculator",
    description:
      "Estimate concrete for slabs, patios, driveways, sidewalks, garage floors, and shed pads.",
    href: "/construction/concrete-slab-calculator",
    status: "Guide",
  },
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
    "Estimate pea gravel cubic yards, tons, cost, delivery, and coverage for landscaping, patios, walkways, playground areas, and drainage projects.",
  href: "/construction/pea-gravel-calculator",
  status: "Live",
},
{
  title: "River Rock Calculator",
  description:
    "Estimate river rock cubic yards, tons, cost, delivery, and coverage for landscaping beds, dry creek beds, drainage areas, borders, and decorative ground cover.",
  href: "/construction/river-rock-calculator",
  status: "Live",
},
{
  title: "Drainage Rock Calculator",
  description:
    "Estimate drainage rock cubic yards, tons, delivery, and cost for French drains, trench drains, dry wells, retaining walls, and landscape drainage beds.",
  href: "/construction/drainage-rock-calculator",
  status: "Live",
},
{
  title: "Decomposed Granite Calculator",
  description:
    "Estimate decomposed granite cubic yards, tons, cost, delivery, stabilizer add-ons, and coverage for patios, walkways, dog runs, garden paths, and compacted landscape surfaces.",
  href: "/construction/decomposed-granite-calculator",
  status: "Live",
},
{
  title: "Crushed Stone vs Gravel",
  description:
    "Compare crushed stone and gravel for driveways, drainage, landscaping, patios, and base layers.",
  href: "/construction/crushed-stone-vs-gravel",
  status: "Guide",
},
{
  title: "Crushed Stone Calculator",
  description:
    "Estimate crushed stone cubic yards, tons, waste, and cost using the upgraded gravel calculator material preset.",
  href: "/construction/crushed-stone-calculator",
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
    "Estimate compacted paver base gravel, bedding sand, cubic yards, tons, delivery, and cost for patios, walkways, driveways, and hardscape projects.",
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
{
   title: "Area Calculator",
  description:
    "Calculate square feet, square yards, square meters, acres, waste-adjusted area, and estimated material cost for multiple rooms or project areas.",
  href: "/construction/area-calculator",
  status: "Live",
},
];

export const metadata = {
  title: "Construction Calculators | Concrete, Gravel & Project Tools",
  description:
    "Use Numeravo construction calculators to estimate concrete, gravel, square footage, materials, measurements, and project planning costs.",
  alternates: {
    canonical: "https://numeravo.com/construction",
  },
  openGraph: {
    title: "Construction Calculators | Numeravo",
    description:
      "Estimate concrete, gravel, square footage, materials, measurements, and construction project numbers with Numeravo.",
    url: "https://numeravo.com/construction",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Calculators | Numeravo",
    description:
      "Fast construction calculators for concrete, gravel, square footage, and project planning.",
  },
};

export default function ConstructionPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
            Construction Calculators
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Construction calculators for concrete, materials, measurements, and
            project planning.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate concrete, footings, slabs, piers, walls, gravel, square
            footage, and other construction project numbers with fast,
            easy-to-use calculators and guides.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:border-[#F97316]"
            >
              <div className="mb-4 h-2 w-12 rounded-full bg-[#F97316]" />

              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">
                  {calculator.title}
                </h2>

                <span className="rounded-full border border-[#1F2937] px-3 py-1 text-xs text-[#A0AEC0]">
                  {calculator.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">
                {calculator.description}
              </p>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete calculators and guides
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
            Start with the main concrete calculator for a full estimate across
            slabs, pads, circular pads, L-shaped slabs, footings, trenches,
            round piers, sonotubes, walls, stairs, curbs, and columns. Use the
            specialized concrete pages when you want a focused explanation for a
            specific project type.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <QuickLink
              href="/construction/concrete-calculator"
              label="Full Concrete Calculator"
            />
            <QuickLink
              href="/construction/concrete-slab-calculator"
              label="Concrete Slab Calculator"
            />
            <QuickLink
              href="/construction/concrete-footing-calculator"
              label="Concrete Footing Calculator"
            />
            <QuickLink
              href="/construction/sonotube-concrete-calculator"
              label="Sonotube Concrete Calculator"
            />
            <QuickLink
              href="/construction/concrete-wall-calculator"
              label="Concrete Wall Calculator"
            />
            <QuickLink
  href="/construction/crushed-stone-vs-gravel"
  label="Crushed Stone vs Gravel"
/>
<QuickLink
  href="/construction/crushed-stone-calculator"
  label="Crushed Stone Calculator"
/>
<QuickLink
  href="/construction/road-base-calculator"
  label="Road Base Calculator"
/>
<QuickLink
  href="/construction/paver-base-calculator"
  label="Paver Base Calculator"
/>
<QuickLink
  href="/construction/base-for-concrete-slab-depth"
  label="Base for Concrete Slab Depth"
/>
<QuickLink
  href="/construction/how-to-prepare-ground-for-concrete-slab"
  label="How to Prepare Ground for Concrete Slab"
/>
<QuickLink
  href="/construction/gravel-cost-per-ton"
  label="Gravel Cost Per Ton"
/>
<QuickLink
  href="/construction/pea-gravel-calculator"
  label="Pea Gravel Calculator"
/>
<QuickLink
  href="/construction/river-rock-calculator"
  label="River Rock Calculator"
/>
<QuickLink
  href="/construction/decomposed-granite-calculator"
  label="Decomposed Granite Calculator"
/>
<QuickLink
  href="/construction/paver-base-calculator"
  label="Paver Base Calculator"
/>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Gravel calculators and guides
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
            Use the gravel calculator to estimate volume, tons, waste, and
            material cost. Use the driveway guide when planning gravel depth,
            driveway size, and common residential driveway material needs.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <QuickLink
              href="/construction/gravel-calculator"
              label="Full Gravel Calculator"
            />
            <QuickLink
              href="/construction/gravel-driveway-calculator"
              label="Gravel Driveway Calculator"
            />
            <QuickLink
  href="/construction/gravel-driveway-cost"
  label="Gravel Driveway Cost"
/>
<QuickLink
  href="/construction/gravel-cost-calculator"
  label="Gravel Cost Calculator"
/>
            <QuickLink
  href="/construction/how-much-gravel-do-i-need"
  label="How Much Gravel Do I Need?"
/>
<QuickLink
  href="/construction/gravel-cost-per-ton"
  label="Gravel Cost Per Ton"
/>
<QuickLink
  href="/construction/pea-gravel-calculator"
  label="Pea Gravel Calculator"
/>
<QuickLink
  href="/construction/river-rock-calculator"
  label="River Rock Calculator"
/>
<QuickLink
  href="/construction/decomposed-granite-calculator"
  label="Decomposed Granite Calculator"
/>
          </div>
        </section>
      </section>
    </main>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
    >
      {label}
    </Link>
  );
}