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
    status: "Planned",
  },
  {
    title: "Square Footage Calculator",
    description:
      "Calculate area for flooring, paint, drywall, landscaping, and project planning.",
    href: "/construction/square-footage-calculator",
    status: "Planned",
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