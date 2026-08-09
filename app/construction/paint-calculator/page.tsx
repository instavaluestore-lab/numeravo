import type { Metadata } from "next";
import Link from "next/link";
import PaintCalculatorClient from "./PaintCalculatorClient";

const canonicalUrl =
  "https://numeravo.com/construction/paint-calculator";

export const metadata: Metadata = {
  title: "Paint Calculator | Gallons, Primer, Coverage & Cost",
  description:
    "Estimate interior or exterior paint, primer, wall and ceiling area, coats, gallons, quarts, trim paint, supplies, and material cost.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Paint Calculator | Numeravo",
    description:
      "Calculate paint and primer quantities for walls, ceilings, trim, rooms, and exterior building surfaces.",
    url: canonicalUrl,
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Calculator | Numeravo",
    description:
      "Estimate paintable area, coats, gallons, quarts, primer, supplies, and material cost.",
  },
};

const faqItems = [
  {
    question: "How do I calculate how much paint I need?",
    answer:
      "Calculate the net paintable area, multiply it by the number of coats, add a waste allowance, and divide by the paint manufacturer's coverage per gallon. Round the result to purchasable gallon and quart containers.",
  },
  {
    question: "How much area does one gallon of paint cover?",
    answer:
      "Many paints advertise coverage near 350 to 400 square feet per gallon for one coat, but actual coverage varies with the product, surface texture, porosity, color change, application method, and surface condition.",
  },
  {
    question: "Should doors and windows be deducted from wall area?",
    answer:
      "Large doors and windows can be deducted for a more precise estimate. Small openings are sometimes left included because touch-ups, spills, surface texture, and leftover paint can consume the difference.",
  },
  {
    question: "How many coats of paint should I calculate?",
    answer:
      "Two finish coats are common, but the required number depends on the existing color, new color, paint quality, sheen, substrate, repairs, and manufacturer instructions. Primer may be required separately.",
  },
  {
    question: "Should I buy gallons or quarts?",
    answer:
      "Use gallons for most of the required volume and quarts for smaller remaining quantities when that combination is economical and available. Compare container prices because four quarts may cost more than one gallon.",
  },
  {
    question: "Do I need primer?",
    answer:
      "Primer is commonly used on new drywall, bare or porous surfaces, repaired areas, stains, major color changes, and surfaces requiring improved adhesion. Follow the coating manufacturer's system requirements.",
  },
];

const applicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Paint Calculator",
  url: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Estimate wall, ceiling, trim, exterior paint, primer, gallons, quarts, coverage, supplies, and material cost.",
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

export default function PaintCalculatorPage() {
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
              Paint quantity and cost planning
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Paint Calculator
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate paint and primer for interior rooms, exterior walls,
              ceilings, and trim. Calculate coats, gallons, quarts, opening
              deductions, supplies, tax, and material cost.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard
                label="Project modes"
                value="Interior + exterior"
              />
              <SummaryCard
                label="Paint quantity"
                value="Gallons + quarts"
              />
              <SummaryCard
                label="Project estimate"
                value="Materials + cost"
              />
            </div>
          </div>

          <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              What this calculator includes
            </h2>

            <div className="mt-6 space-y-4">
              <FeatureRow label="Surface modes" value="room + exterior" />
              <FeatureRow label="Openings" value="doors + windows" />
              <FeatureRow label="Coatings" value="paint + primer" />
              <FeatureRow label="Containers" value="gallons + quarts" />
              <FeatureRow label="Cost estimate" value="materials + fees" />
            </div>
          </section>
        </section>

        <div className="mt-12">
          <PaintCalculatorClient />
        </div>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            How to calculate paint for a project
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-[#A0AEC0]">
            Measure each paintable surface, subtract applicable openings,
            multiply the net area by the required number of coats, add an
            allowance for waste and touch-ups, and divide by the product&apos;s
            stated coverage. Paint and primer should be calculated separately.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StepCard
              step="Step 1"
              title="Measure surfaces"
              text="Enter room or building dimensions, or begin with a known paintable area."
            />
            <StepCard
              step="Step 2"
              title="Select coats and coverage"
              text="Enter the required finish and primer coats using the exact product coverage."
            />
            <StepCard
              step="Step 3"
              title="Add pricing"
              text="Enter gallon, quart, primer, supply, delivery, fee, and tax amounts."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            Paint calculation formulas
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <FormulaCard
              title="Interior wall area"
              formula="2 × (length + width) × wall height × rooms"
              text="This calculates the gross area of four rectangular walls."
            />
            <FormulaCard
              title="Exterior wall area"
              formula="2 × (building length + width) × exterior height"
              text="This estimates the rectangular exterior perimeter-wall area."
            />
            <FormulaCard
              title="Net wall area"
              formula="gross wall area − applicable opening area"
              text="Door and window deductions are limited so the result cannot become negative."
            />
            <FormulaCard
              title="Coated area"
              formula="net area × coats × (1 + waste percentage ÷ 100)"
              text="Separate coated areas are calculated for wall paint, ceiling paint, primer, and trim."
            />
            <FormulaCard
              title="Paint required"
              formula="coated area ÷ manufacturer coverage per gallon"
              text="Coverage must match the selected product and the surface being painted."
            />
            <FormulaCard
              title="Material total"
              formula="paint + primer + supplies + tax + delivery + fees"
              text="The estimate excludes labor unless labor is included manually as an additional fee."
            />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <InfoCard title="Why actual paint coverage varies">
            <p>
              Rough, textured, porous, unfinished, repaired, or absorbent
              surfaces may use more coating than smooth previously painted
              surfaces. Spraying can also have different transfer efficiency
              than rolling or brushing.
            </p>
            <p className="mt-4">
              Coverage can change with paint formulation, sheen, application
              thickness, color contrast, temperature, and surface preparation.
            </p>
          </InfoCard>

          <InfoCard title="Buying gallons and quarts">
            <p>
              The calculator uses gallons for the whole portion of the
              requirement and quarts for the remaining fractional amount.
              Four required quarts are converted into another gallon.
            </p>
            <p className="mt-4">
              Compare actual package prices and product availability before
              purchasing. Keeping matching leftover paint can be useful for
              future touch-ups.
            </p>
          </InfoCard>
        </section>

        <section className="mt-12 rounded-3xl border border-orange-500/50 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Product and safety notice
          </h2>

          <p className="mt-4 leading-8 text-[#A0AEC0]">
            This calculator provides a planning estimate. Verify preparation,
            primer compatibility, coverage, recoat times, ventilation,
            protective equipment, application conditions, lead-paint
            precautions, disposal requirements, and safety instructions with
            the product manufacturer and qualified professionals.
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
            Continue planning surface area, drywall, framing, and interior
            construction materials.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RelatedLink
              href="/construction/drywall-calculator"
              label="Drywall Calculator"
            />
            <RelatedLink
              href="/construction/area-calculator"
              label="Area Calculator"
            />
            <RelatedLink
              href="/construction/stud-calculator"
              label="Stud Calculator"
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
