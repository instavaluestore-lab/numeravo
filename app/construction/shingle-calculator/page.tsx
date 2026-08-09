import type { Metadata } from "next";
import Link from "next/link";
import ShingleCalculatorClient from "./ShingleCalculatorClient";

export const metadata: Metadata = {
  title: "Shingle Calculator | Bundles, Squares & Materials",
  description:
    "Calculate shingle bundles, roofing squares, underlayment rolls, starter strips, ridge caps, drip edge, nails, waste, and material cost.",
  alternates: {
    canonical:
      "https://numeravo.com/construction/shingle-calculator",
  },
  openGraph: {
    title:
      "Shingle Calculator | Bundles, Squares & Materials",
    description:
      "Estimate asphalt shingle bundles, roofing squares, underlayment, starter, ridge caps, drip edge, nails, waste, and supplier cost.",
    url:
      "https://numeravo.com/construction/shingle-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shingle Calculator",
    description:
      "Calculate shingle bundles, roofing squares, accessories, waste, and estimated material cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many bundles of shingles do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Divide the waste-adjusted roof area by the coverage printed on one shingle bundle and round up to the next whole bundle. Many products cover approximately one-third of a roofing square per bundle, but exact coverage varies.",
      },
    },
    {
      "@type": "Question",
      name: "How many shingle bundles are in one roofing square?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Many asphalt shingle products use approximately three bundles per roofing square, but some products require a different quantity. Use the exact square-foot coverage shown on the selected product packaging.",
      },
    },
    {
      "@type": "Question",
      name: "How much shingle waste should I add?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Waste depends on roof complexity, valleys, hips, dormers, cuts, pattern, product size, starter courses, and damaged material. Verify the waste allowance with the installer and manufacturer.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator include underlayment and ridge caps?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator estimates underlayment rolls, starter bundles, ridge-cap bundles, drip-edge pieces, roofing nails, and nail boxes using editable coverage values.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the calculator round material quantities up?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Shingles and roofing accessories are generally purchased in complete bundles, rolls, pieces, or boxes. The calculator rounds each purchase quantity up to the next whole package.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Shingle Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url:
    "https://numeravo.com/construction/shingle-calculator",
  description:
    "Calculate asphalt shingle bundles, roofing squares, underlayment, starter strips, ridge caps, drip edge, roofing nails, waste, and estimated material cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ShingleCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appJsonLd),
        }}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Link
              href="/construction"
              className="mb-5 inline-flex rounded-full border border-[#1F2937] bg-[#121826] px-4 py-2 text-sm font-medium text-[#A0AEC0] transition hover:border-orange-400 hover:text-white"
            >
              ← Construction calculators
            </Link>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
              Asphalt shingle material planning
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Shingle Calculator
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate asphalt shingle bundles, roofing squares,
              underlayment rolls, starter strips, ridge caps, drip
              edge, roofing nails, waste, and material cost using
              editable product coverage and supplier pricing.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard
                label="Shingle quantity"
                value="Squares + bundles"
              />

              <SummaryCard
                label="Accessories"
                value="Rolls + pieces"
              />

              <SummaryCard
                label="Purchase cost"
                value="Material + tax"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">
              What this calculator includes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <FeatureRow
                label="Roof quantity"
                value="area + waste"
              />

              <FeatureRow
                label="Shingle order"
                value="bundles + pieces"
              />

              <FeatureRow
                label="Accessories"
                value="underlayment + trim"
              />

              <FeatureRow
                label="Material estimate"
                value="cost + tax + fees"
                last
              />
            </div>
          </div>
        </div>

        <ShingleCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            How to calculate shingles for a roof
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Determine the sloped roof area, add a project-specific
            waste allowance, and divide the purchase area by the
            square-foot coverage of one shingle bundle. Always
            round the result up because shingles are purchased in
            complete bundles.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StepCard
              number="1"
              title="Calculate roof area"
              description="Use the building footprint and pitch for a simple roof, or enter a known measurement of the sloped roof surface."
            />

            <StepCard
              number="2"
              title="Enter product coverage"
              description="Use the exact bundle, roll, starter, ridge-cap, drip-edge, and nail coverage from the selected products."
            />

            <StepCard
              number="3"
              title="Prepare the order"
              description="Review whole-package quantities and enter current supplier pricing to calculate the estimated material total."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Shingle calculation formulas
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FormulaCard
              title="Purchase roof area"
              formula="roof area × (1 + waste % ÷ 100)"
              description="The purchase area adds an editable allowance for layout, cuts, damage, and material loss."
            />

            <FormulaCard
              title="Shingle bundles"
              formula="purchase area ÷ bundle coverage, rounded up"
              description="The calculator uses the exact square-foot coverage entered for one bundle."
            />

            <FormulaCard
              title="Underlayment rolls"
              formula="purchase area ÷ roll coverage, rounded up"
              description="Enter the usable installed coverage after required laps and application details."
            />

            <FormulaCard
              title="Starter bundles"
              formula="starter length ÷ bundle coverage, rounded up"
              description="Use the required total linear footage along applicable eaves and rake edges."
            />

            <FormulaCard
              title="Ridge-cap bundles"
              formula="ridge and hip length ÷ bundle coverage, rounded up"
              description="Use total applicable ridge and hip length and the selected cap product coverage."
            />

            <FormulaCard
              title="Drip-edge pieces"
              formula="drip-edge length ÷ piece length, rounded up"
              description="Additional allowance may be required for overlaps, corners, cuts, and damaged pieces."
            />

            <FormulaCard
              title="Roofing nails"
              formula="purchase squares × nails per square"
              description="The fastening rate must be verified against the shingle manufacturer and local requirements."
            />

            <FormulaCard
              title="Material total"
              formula="component subtotal + tax + delivery + fees"
              description="Pricing is calculated from the rounded package quantity for each selected component."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Shingle bundles and roofing squares
          </h2>

          <div className="mt-4 space-y-4 leading-7 text-[#A0AEC0]">
            <p>
              One roofing square equals 100 square feet of roof
              surface. Shingles are sold in bundles, and the number
              of bundles required to cover one square depends on
              the specific product.
            </p>

            <p>
              Many asphalt shingle products use approximately
              three bundles per square, but premium, designer,
              laminated, specialty, and other products may use
              different package quantities or coverage. The
              coverage printed on the product packaging should
              control the calculation.
            </p>

            <p>
              Individual shingle counts are provided as a secondary
              planning result. Ordering should be based on the
              manufacturer’s stated installed coverage per bundle,
              not solely on the number of pieces inside the bundle.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Materials included in the shopping list
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              title="Field shingles"
              description="Whole shingle bundles calculated from waste-adjusted roof area and editable installed coverage."
            />

            <InfoCard
              title="Underlayment"
              description="Whole rolls calculated using the entered usable square-foot coverage per roll."
            />

            <InfoCard
              title="Starter strip"
              description="Whole bundles calculated from entered starter length and linear-foot coverage."
            />

            <InfoCard
              title="Ridge and hip cap"
              description="Whole bundles calculated from total ridge and hip length and cap coverage."
            />

            <InfoCard
              title="Drip edge"
              description="Whole pieces calculated from total required linear footage and stock-piece length."
            />

            <InfoCard
              title="Roofing nails"
              description="Estimated fasteners and whole boxes based on editable nails-per-square and package counts."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Items that may require separate calculations
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            A complete roofing order can require products and
            quantities that depend on site-specific conditions,
            roof details, local requirements, and the selected
            roofing system.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SmallCard
              title="Flashing"
              text="Valley metal, step flashing, counterflashing, wall flashing, and penetration flashing."
            />

            <SmallCard
              title="Ventilation"
              text="Ridge vents, intake vents, box vents, turbines, powered vents, and required net-free area."
            />

            <SmallCard
              title="Water protection"
              text="Ice-and-water membrane, eave protection, valley membrane, sealants, and specialized underlayments."
            />

            <SmallCard
              title="Deck repairs"
              text="Plywood or OSB replacement, fascia, trim, structural repairs, and unsuitable substrate."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Improving shingle-order accuracy
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoCard
              title="Measure roof planes"
              description="For complex roofs, measure each plane separately and combine the sloped areas rather than relying on one rectangular footprint."
            />

            <InfoCard
              title="Confirm roof pitch"
              description="A pitch multiplier is only as accurate as the entered rise and run. Verify roofs with different slopes separately."
            />

            <InfoCard
              title="Check every package"
              description="Use installed coverage, package quantity, exposure, fastening, lap, and accessory requirements for the exact products."
            />

            <InfoCard
              title="Verify the final order"
              description="Compare the calculated shopping list with plans, field conditions, supplier takeoffs, installer requirements, and manufacturer instructions."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-orange-500/40 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Material estimate and safety notice
          </h2>

          <p className="mt-4 leading-7 text-[#D1D5DB]">
            This calculator provides a planning estimate and does
            not replace field measurements, product instructions,
            supplier takeoffs, contractor review, engineered plans,
            structural evaluation, or local building requirements.
            Product coverage and installation requirements vary.
            Roof access can involve serious fall hazards; use
            trained personnel, suitable access equipment, and
            required fall protection.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Shingle calculator FAQs
          </h2>

          <div className="mt-6 space-y-4">
            <FaqItem
              question="How many bundles of shingles do I need?"
              answer="Divide the waste-adjusted roof area by the installed coverage of one bundle and round up. Enter the exact product coverage rather than assuming every bundle covers the same area."
            />

            <FaqItem
              question="How many bundles are in one roofing square?"
              answer="Many asphalt shingle products use approximately three bundles per square, but package coverage varies. One roofing square always equals 100 square feet."
            />

            <FaqItem
              question="Does the calculator round up?"
              answer="Yes. Shingles, underlayment, starter, ridge caps, drip edge, and nail boxes are rounded up to complete purchase packages."
            />

            <FaqItem
              question="Does the calculator include labor?"
              answer="No. This page prepares a material shopping list and supplier-cost estimate. Use the Roofing Calculator for installation labor, tear-off, disposal, permits, and broader project cost."
            />

            <FaqItem
              question="Should underlayment use the same waste-adjusted area?"
              answer="This calculator applies the purchase roof area to underlayment. Confirm usable installed roll coverage, required laps, valleys, eaves, local requirements, and product instructions."
            />

            <FaqItem
              question="Are the default accessory values guaranteed?"
              answer="No. They are editable planning values. Replace them with the exact coverage, package count, fastening rate, lengths, and instructions for the products and roof being estimated."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Related roofing calculators
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RelatedLink
              href="/construction/roofing-calculator"
              label="Roofing Calculator"
            />

            <RelatedLink
              href="/construction/roof-pitch-calculator"
              label="Roof Pitch Calculator"
            />

            <RelatedLink
              href="/construction/area-calculator"
              label="Area Calculator"
            />

            <RelatedLink
              href="/construction/lumber-calculator"
              label="Lumber Calculator"
            />
          </div>
        </section>
      </section>
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
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
      <p className="text-sm text-[#A0AEC0]">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function FeatureRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-4 ${
        last
          ? ""
          : "border-b border-[#1F2937] pb-3"
      }`}
    >
      <span>{label}</span>
      <span className="text-right font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <p className="text-sm font-semibold text-orange-400">
        Step {number}
      </p>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
        {description}
      </p>
    </div>
  );
}

function FormulaCard({
  title,
  formula,
  description,
}: {
  title: string;
  formula: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold text-orange-300">
        {title}
      </h3>
      <p className="mt-3 font-semibold text-white">
        {formula}
      </p>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
        {description}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
        {description}
      </p>
    </div>
  );
}

function SmallCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold text-orange-300">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
        {text}
      </p>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold">{question}</h3>
      <p className="mt-3 leading-7 text-[#A0AEC0]">
        {answer}
      </p>
    </div>
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
