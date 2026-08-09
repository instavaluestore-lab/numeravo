import type { Metadata } from "next";
import Link from "next/link";
import DrywallCalculatorClient from "./DrywallCalculatorClient";

const canonicalUrl =
  "https://numeravo.com/construction/drywall-calculator";

export const metadata: Metadata = {
  title: "Drywall Calculator | Sheets, Screws, Tape & Cost",
  description:
    "Estimate drywall sheets, wall and ceiling area, waste, screws, joint tape, compound, corner bead, material coverage, and project cost.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Drywall Calculator | Numeravo",
    description:
      "Calculate drywall sheets, screws, tape, joint compound, corner bead, waste, and estimated material cost.",
    url: canonicalUrl,
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drywall Calculator | Numeravo",
    description:
      "Estimate drywall quantities and material costs for walls and ceilings.",
  },
};

const faqItems = [
  {
    question: "How do I calculate how many drywall sheets I need?",
    answer:
      "Calculate the net wall and ceiling area, add a waste allowance, divide by the coverage of one drywall sheet, and round the result up to a whole sheet.",
  },
  {
    question: "Should doors and windows be deducted from drywall area?",
    answer:
      "Doors and windows can be deducted for a more precise material estimate. For small projects, some estimators leave minor openings included because the extra material can help cover cuts and damaged sheets.",
  },
  {
    question: "How much waste should I add for drywall?",
    answer:
      "A waste allowance of about 10% is common for straightforward rooms. Complicated layouts, angled walls, numerous openings, short pieces, or inexperienced installation may require a higher allowance.",
  },
  {
    question: "How many drywall screws and how much compound do I need?",
    answer:
      "Requirements vary with framing spacing, sheet orientation, fastening schedules, finish level, and product coverage. This calculator uses editable coverage inputs so you can match the products and installation requirements for your project.",
  },
  {
    question: "What drywall sheet size should I use?",
    answer:
      "Four-foot-wide sheets are common, with lengths such as 8, 10, and 12 feet. Longer sheets can reduce seams but are heavier and more difficult to transport and install. Confirm the thickness, fire rating, moisture resistance, and sheet size required for the application.",
  },
];

const applicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Drywall Calculator",
  url: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Estimate drywall sheets, screws, tape, compound, corner bead, waste, and material cost.",
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

export default function DrywallCalculatorPage() {
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
              Drywall material and cost planning
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Drywall Calculator
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate drywall sheets for walls and ceilings, subtract doors
              and windows, add waste, and calculate screws, tape, joint
              compound, corner bead, coverage, and material cost.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard
                label="Drywall area"
                value="Walls + ceiling"
              />
              <SummaryCard
                label="Sheet quantity"
                value="Coverage + waste"
              />
              <SummaryCard
                label="Materials"
                value="Fasteners + finish"
              />
            </div>
          </div>

          <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              What this calculator includes
            </h2>

            <div className="mt-6 space-y-4">
              <FeatureRow label="Surface area" value="walls + ceilings" />
              <FeatureRow label="Openings" value="doors + windows" />
              <FeatureRow label="Drywall order" value="sheets + waste" />
              <FeatureRow
                label="Accessories"
                value="screws + tape + compound"
              />
              <FeatureRow label="Project estimate" value="materials + cost" />
            </div>
          </section>
        </section>

        <div className="mt-12">
          <DrywallCalculatorClient />
        </div>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            How to calculate drywall for a room
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-[#A0AEC0]">
            Start by calculating the wall and ceiling surfaces that will
            receive drywall. Subtract applicable door and window openings,
            add a waste allowance, and divide the purchase area by the
            coverage of the selected sheet size. Always round material
            packages up to whole purchasable quantities.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StepCard
              step="Step 1"
              title="Measure the surfaces"
              text="Enter the room dimensions or use a known net drywall area."
            />
            <StepCard
              step="Step 2"
              title="Deduct openings"
              text="Enter doors and windows when you want their areas removed from the estimate."
            />
            <StepCard
              step="Step 3"
              title="Add waste and materials"
              text="Select a sheet size, add waste, and enter product coverage and pricing."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            Drywall calculation formulas
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <FormulaCard
              title="Wall area"
              formula="2 × (room length + room width) × wall height"
              text="This calculates the gross area of four rectangular walls."
            />
            <FormulaCard
              title="Ceiling area"
              formula="room length × room width"
              text="Include this area when the ceiling will also receive drywall."
            />
            <FormulaCard
              title="Net drywall area"
              formula="gross selected area − door area − window area"
              text="Opening deductions cannot reduce the result below zero."
            />
            <FormulaCard
              title="Purchase area"
              formula="net area × (1 + waste percentage ÷ 100)"
              text="Waste helps account for cuts, breakage, defects, and layout changes."
            />
            <FormulaCard
              title="Drywall sheets"
              formula="purchase area ÷ sheet coverage, rounded up"
              text="Sheets are rounded up because partial sheets cannot normally be purchased."
            />
            <FormulaCard
              title="Estimated material cost"
              formula="component costs + tax + delivery + additional fees"
              text="Enter current supplier prices for a location-specific planning estimate."
            />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <InfoCard title="Choosing drywall sheet size">
            <p>
              Standard four-foot-wide sheets are commonly available in
              several lengths. Longer sheets can reduce seams and finishing
              work, but they require more room for delivery, handling, and
              installation.
            </p>
            <p className="mt-4">
              Verify sheet thickness, edge type, fire rating, moisture
              resistance, mold resistance, and local code requirements before
              purchasing.
            </p>
          </InfoCard>

          <InfoCard title="Improving estimate accuracy">
            <p>
              Divide irregular rooms into measurable rectangular surfaces.
              Measure large openings individually when their sizes differ
              substantially from the averages entered in the calculator.
            </p>
            <p className="mt-4">
              Use the coverage and package information printed on the exact
              screws, tape, compound, and corner-bead products being
              purchased.
            </p>
          </InfoCard>
        </section>

        <section className="mt-12 rounded-3xl border border-orange-500/50 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Planning and installation notice
          </h2>

          <p className="mt-4 leading-8 text-[#A0AEC0]">
            This calculator provides a planning estimate, not a structural,
            code, fire-rating, or installation specification. Drywall
            requirements vary by assembly, framing, occupancy, moisture
            exposure, manufacturer instructions, and local building code.
            Confirm material selection, fastening schedules, finishing
            requirements, and safe lifting practices with qualified
            professionals.
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
            Continue planning interior surfaces, framing, lumber, and other
            construction materials.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RelatedLink
              href="/construction/area-calculator"
              label="Area Calculator"
            />
            <RelatedLink
              href="/construction/stud-calculator"
              label="Stud Calculator"
            />
            <RelatedLink
              href="/construction/lumber-calculator"
              label="Lumber Calculator"
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
