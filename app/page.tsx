import Link from "next/link";

const categories = [
  {
    title: "Construction Calculators",
    href: "/construction",
    accent: "bg-[#F97316]",
    description:
      "Concrete, gravel, rebar, flatwork, demolition, delivery, pumping, labor, and project cost calculators.",
  },
  {
    title: "Finance Calculators",
    href: "/finance",
    accent: "bg-[#22C55E]",
    description:
      "Loans, savings, interest, payoff, ROI, budgeting, and personal finance tools.",
  },
  {
    title: "Student Calculators",
    href: "/student",
    accent: "bg-[#8B5CF6]",
    description:
      "Math, grades, percentages, academic planning, study helpers, and classroom calculators.",
  },
  {
    title: "Unit Converters",
    href: "/converters",
    accent: "bg-[#3B82F6]",
    description:
      "Fast everyday converters for measurements, units, quantities, and practical calculations.",
  },
  {
    title: "Business Tools",
    href: "/business",
    accent: "bg-[#EAB308]",
    description:
      "Business planning, operating numbers, margins, pricing, and decision-support calculators.",
  },
  {
    title: "All Tools",
    href: "/tools",
    accent: "bg-[#06B6D4]",
    description:
      "Browse the full Numeravo tool library across every calculator category.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-start gap-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3B82F6]">
            Numeravo
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Smart calculators for construction, finance, students, and everyday planning.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#A0AEC0]">
            Numeravo helps people quickly solve practical calculation problems
            with clean, focused tools for construction estimates, financial
            planning, student work, business decisions, conversions, and general
            utility calculations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/construction"
              className="rounded-2xl bg-[#F97316] px-6 py-4 text-center text-sm font-bold text-[#0B0F19] transition hover:bg-orange-300"
            >
              Explore Construction Calculators
            </Link>
            <Link
              href="/tools"
              className="rounded-2xl border border-[#1F2937] bg-[#121826] px-6 py-4 text-center text-sm font-bold text-white transition hover:border-[#3B82F6] hover:text-[#93C5FD]"
            >
              View All Tools
            </Link>
          </div>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:-translate-y-1 hover:border-[#3B82F6] hover:shadow-2xl hover:shadow-blue-950/30"
            >
              <div className={`mb-4 h-2 w-12 rounded-full ${category.accent}`} />
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold">{category.title}</h2>
                <span className="text-[#A0AEC0] transition group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        <section className="w-full rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                Featured category
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                Construction calculators are now expanded.
              </h2>
            </div>
            <p className="leading-7 text-[#A0AEC0]">
              The construction library now includes concrete volume, cost,
              delivery, short-load fees, waste, weight, PSI, slabs, driveways,
              patios, sidewalks, pads, formwork, removal, demolition, saw cuts,
              pump truck cost, finishing cost, labor cost, rebar spacing, rebar
              weight, and lap splice estimating tools.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
