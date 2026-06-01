import Link from "next/link";

const calculators = [
  {
    title: "Compound Interest Calculator",
    description:
      "Estimate future value, interest earned, and long-term growth.",
    href: "/finance/compound-interest-calculator",
    status: "Planned",
  },
  {
    title: "Loan Calculator",
    description:
      "Calculate monthly payments, total interest, and total loan cost.",
    href: "/finance/loan-calculator",
    status: "Planned",
  },
  {
    title: "Mortgage Calculator",
    description:
      "Estimate mortgage payments, interest, and home affordability numbers.",
    href: "/finance/mortgage-calculator",
    status: "Planned",
  },
];

export const metadata = {
  title: "Finance Calculators | Loans, Interest, Mortgage & ROI Tools",
  description:
    "Use Numeravo finance calculators to estimate compound interest, loan payments, mortgage costs, ROI, savings, and personal finance planning numbers.",
  alternates: {
    canonical: "https://numeravo.com/finance",
  },
  openGraph: {
    title: "Finance Calculators | Numeravo",
    description:
      "Calculate compound interest, loans, mortgages, ROI, savings, and personal finance numbers with Numeravo.",
    url: "https://numeravo.com/finance",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Calculators | Numeravo",
    description:
      "Fast finance calculators for loans, interest, mortgages, ROI, and savings.",
  },
};

export default function FinancePage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#22C55E]">
            Finance Calculators
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Finance calculators for smarter money decisions.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Plan loans, savings, interest, mortgages, and investment scenarios
            with practical finance calculators.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:border-[#22C55E]"
            >
              <div className="mb-4 h-2 w-12 rounded-full bg-[#22C55E]" />

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