import type { Metadata } from "next";
import Link from "next/link";
import FlooringCalculatorClient from "./FlooringCalculatorClient";

const canonicalUrl =
  "https://numeravo.com/construction/flooring-calculator";

export const metadata: Metadata = {
  title: "Flooring Calculator | Cartons, Waste, Coverage & Cost",
  description:
    "Estimate flooring area, waste, planks, cartons, underlayment rolls, baseboard, purchased coverage, overage, and material cost.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Flooring Calculator | Numeravo",
    description:
      "Calculate flooring cartons, pieces, waste, underlayment, baseboard, coverage, and project material cost.",
    url: canonicalUrl,
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flooring Calculator | Numeravo",
    description:
      "Estimate flooring area, cartons, planks, underlayment, baseboard, waste, and cost.",
  },
};

const faqItems = [
  {
    question: "How do I calculate how much flooring I need?",
    answer:
      "Calculate the net floor area, add an appropriate waste allowance, divide by the coverage printed on one flooring carton, and round up to a whole carton.",
  },
  {
    question: "How much flooring waste should I add?",
    answer:
      "Ten percent is a common planning allowance for straightforward installations. Diagonal layouts, patterned flooring, irregular rooms, numerous cuts, damaged material, and future repairs may require more.",
  },
  {
    question: "Should I calculate flooring by plank or by carton?",
    answer:
      "Use carton coverage for the purchase quantity because flooring is normally sold in complete cartons. Individual plank dimensions are useful for estimating pieces and understanding layout.",
  },
  {
    question: "Do I need underlayment beneath new flooring?",
    answer:
      "Underlayment requirements depend on the flooring product, subfloor, installation method, moisture conditions, sound requirements, and manufacturer warranty. Some flooring includes an attached pad.",
  },
  {
    question: "Should flooring be ordered from the same production batch?",
    answer:
      "When possible, order enough flooring at one time and verify matching dye lots, production runs, colors, or batch numbers. Appearance can vary between separate manufacturing runs.",
  },
  {
    question: "How is baseboard calculated?",
    answer:
      "Baseboard begins with the room perimeter or a known linear measurement. Door and opening deductions are removed, waste is added, and the final length is divided by the purchasable piece length.",
  },
];

const applicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Flooring Calculator",
  url: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Estimate flooring cartons, pieces, waste, underlayment, baseboard, coverage, overage, and material cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FlooringCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Link
              href="/construction"
              className="inline-flex rounded-full border border-[#1F2937] bg-[#121826] px-4 py-2 text-sm font-medium text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              ← Construction calculators
            </Link>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Flooring quantity and cost planning
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Flooring Calculator
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate flooring cartons, planks, waste, purchased coverage,
              underlayment rolls, baseboard pieces, whole-package overage,
              supplies, tax, and material cost.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Floor area" value="Rooms + known area" />
              <SummaryCard label="Purchase order" value="Pieces + cartons" />
              <SummaryCard label="Accessories" value="Pad + baseboard" />
            </div>
          </div>

          <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              What this calculator includes
            </h2>

            <div className="mt-6 space-y-4">
              <FeatureRow label="Floor quantity" value="area + waste" />
              <FeatureRow label="Flooring order" value="pieces + cartons" />
              <FeatureRow label="Underlayment" value="coverage + rolls" />
              <FeatureRow label="Baseboard" value="length + pieces" />
              <FeatureRow label="Cost estimate" value="materials + fees" />
            </div>
          </section>
        </section>

        <div className="mt-12">
          <FlooringCalculatorClient />
        </div>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            How to calculate flooring for a room
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-[#A0AEC0]">
            Measure the floor, subtract areas that will not receive flooring,
            add waste, and divide the purchase area by the exact coverage
            printed on one carton. Always round cartons, rolls, and trim pieces
            up to complete purchasable packages.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StepCard
              step="Step 1"
              title="Measure floor area"
              text="Enter room dimensions, identical-room quantity, additional areas, or a known floor area."
            />
            <StepCard
              step="Step 2"
              title="Add waste and coverage"
              text="Use an appropriate waste percentage and the exact square-foot coverage per carton."
            />
            <StepCard
              step="Step 3"
              title="Complete the order"
              text="Add underlayment, baseboard, accessories, supplier prices, tax, delivery, and fees."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            Flooring calculation formulas
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <FormulaCard
              title="Room floor area"
              formula="room length × room width × number of rooms"
              text="Additional areas can be added and permanent uninstalled areas can be deducted."
            />
            <FormulaCard
              title="Purchase floor area"
              formula="net floor area × (1 + waste percentage ÷ 100)"
              text="Waste helps cover cuts, layout changes, damaged pieces, and future repairs."
            />
            <FormulaCard
              title="Flooring cartons"
              formula="purchase floor area ÷ carton coverage, rounded up"
              text="Use the exact carton coverage rather than an assumed number of pieces."
            />
            <FormulaCard
              title="Estimated flooring pieces"
              formula="purchase area ÷ individual piece area, rounded up"
              text="This is a layout estimate; carton coverage controls the actual purchase quantity."
            />
            <FormulaCard
              title="Underlayment rolls"
              formula="purchase floor area ÷ roll coverage, rounded up"
              text="Confirm overlaps, seams, moisture protection, and product-specific requirements."
            />
            <FormulaCard
              title="Baseboard pieces"
              formula="waste-adjusted baseboard length ÷ piece length, rounded up"
              text="The room perimeter is reduced by the entered door and opening deduction."
            />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <InfoCard title="Use exact carton coverage">
            <p>
              Cartons with similarly sized planks can contain different piece
              counts and square-foot coverage. Use the coverage printed on the
              specific carton or supplier listing.
            </p>
            <p className="mt-4">
              Purchase all required material together when possible and verify
              color, style, lot, and production-run information.
            </p>
          </InfoCard>

          <InfoCard title="Plan the installation layout">
            <p>
              Waste requirements increase with diagonal placement, repeating
              patterns, narrow rooms, closets, hallways, stairs, offsets, and
              complex transitions.
            </p>
            <p className="mt-4">
              Check minimum plank-length, stagger, expansion-gap, acclimation,
              moisture, subfloor-flatness, and transition requirements.
            </p>
          </InfoCard>
        </section>

        <section className="mt-12 rounded-3xl border border-orange-500/50 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Product and installation notice
          </h2>

          <p className="mt-4 leading-8 text-[#A0AEC0]">
            This calculator provides a planning estimate. Confirm subfloor
            preparation, moisture testing, underlayment, vapor protection,
            expansion gaps, fastening or adhesive requirements, acclimation,
            transitions, warranty conditions, and safe installation practices
            with the flooring manufacturer and qualified professionals.
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"
              >
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 leading-7 text-[#A0AEC0]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Related construction calculators
          </h2>

          <p className="mt-3 text-[#A0AEC0]">
            Continue planning floor area, paint, drywall, framing, and other
            interior construction materials.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RelatedLink
              href="/construction/area-calculator"
              label="Area Calculator"
            />
            <RelatedLink
              href="/construction/paint-calculator"
              label="Paint Calculator"
            />
            <RelatedLink
              href="/construction/drywall-calculator"
              label="Drywall Calculator"
            />
            <RelatedLink
              href="/construction"
              label="All Construction Calculators"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5">
      <p className="text-sm text-[#A0AEC0]">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function FeatureRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <p className="text-sm font-semibold text-[#F97316]">{step}</p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-[#A0AEC0]">{text}</p>
    </article>
  );
}

function FormulaCard({
  title,
  formula,
  text,
}: {
  title: string;
  formula: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="text-lg font-semibold text-orange-300">{title}</h3>
      <p className="mt-3 font-semibold text-white">{formula}</p>
      <p className="mt-3 leading-7 text-[#A0AEC0]">{text}</p>
    </article>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 leading-8 text-[#A0AEC0]">{children}</div>
    </article>
  );
}

function RelatedLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
    >
      {label}
    </Link>
  );
}
