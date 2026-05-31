import Link from "next/link";

const calculators = [
  {
    title: "Profit Margin Calculator",
    description:
      "Calculate profit margin, markup, cost, revenue, and profit dollars.",
    href: "/business/profit-margin-calculator",
    status: "Planned",
  },
  {
    title: "Break-Even Calculator",
    description:
      "Estimate how many sales are needed to cover costs and become profitable.",
    href: "/business/break-even-calculator",
    status: "Planned",
  },
  {
    title: "Sales Tax Calculator",
    description:
      "Calculate tax, pre-tax price, and final price for business transactions.",
    href: "/business/sales-tax-calculator",
    status: "Planned",
  },
];

export const metadata = {
  title: "Business Calculators",
  description:
    "Use Numeravo business calculators for profit margin, break-even analysis, markup, pricing, and sales tax.",
};

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#06B6D4]">
            Business Calculators
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Business calculators for pricing, profit, and planning.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Calculate margins, break-even points, taxes, pricing, and business
            numbers faster.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:border-[#06B6D4]"
            >
              <div className="mb-4 h-2 w-12 rounded-full bg-[#06B6D4]" />

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