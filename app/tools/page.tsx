import Link from "next/link";

const calculators = [
  {
    title: "Percentage Calculator",
    description:
      "Calculate percentages, percentage increase, percentage decrease, and parts of a whole.",
    href: "/tools/percentage-calculator",
    status: "Planned",
  },
  {
    title: "Discount Calculator",
    description:
      "Calculate sale price, savings, and final cost after discounts.",
    href: "/tools/discount-calculator",
    status: "Planned",
  },
  {
    title: "Age Calculator",
    description:
      "Calculate age from birth date and compare dates quickly.",
    href: "/tools/age-calculator",
    status: "Planned",
  },
];

export const metadata = {
  title: "Utility Calculators",
  description:
    "Use Numeravo utility calculators for percentages, discounts, age, dates, time, and everyday calculations.",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#FACC15]">
            Utility Calculators
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Useful calculators for everyday problems.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Solve everyday calculations like percentages, discounts, dates,
            age, and quick utility math.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:border-[#FACC15]"
            >
              <div className="mb-4 h-2 w-12 rounded-full bg-[#FACC15]" />

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