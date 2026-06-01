import Link from "next/link";

const calculators = [
  {
    title: "Concrete Calculator",
    description:
      "Estimate cubic feet, cubic yards, waste-adjusted concrete, and material cost.",
    href: "/construction/concrete-calculator",
    status: "Live",
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
            Construction calculators for materials, measurements, and project
            planning.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate concrete, gravel, square footage, and other construction
            project numbers with fast, easy-to-use calculators.
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
      </section>
    </main>
  );
}