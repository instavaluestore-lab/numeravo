import type { Metadata } from "next";
import Link from "next/link";
import RoofingCalculatorClient from "./RoofingCalculatorClient";

export const metadata: Metadata = {
  title: "Roofing Calculator | Roof Area, Squares & Cost",
  description:
    "Calculate roof area, pitch, waste, roofing squares, material cost, labor, tear-off, disposal, fees, tax, and estimated roofing project cost.",
  alternates: {
    canonical:
      "https://numeravo.com/construction/roofing-calculator",
  },
  openGraph: {
    title:
      "Roofing Calculator | Roof Area, Squares & Cost",
    description:
      "Estimate sloped roof area, roofing squares, waste, materials, labor, tear-off, fees, tax, and total roofing project cost.",
    url:
      "https://numeravo.com/construction/roofing-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roofing Calculator",
    description:
      "Estimate roof area, roofing squares, material, labor, removal, fees, and total roofing cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate roofing squares?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Calculate the sloped roof surface area in square feet and divide it by 100. One roofing square equals 100 square feet. Add an appropriate waste allowance before determining the purchase quantity.",
      },
    },
    {
      "@type": "Question",
      name: "How much roofing waste should I add?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Waste depends on roof shape, material, valleys, hips, dormers, cuts, starter courses, and installation method. Simple roofs may require less waste than complex, cut-up roofs. Verify the allowance with the installer and material manufacturer.",
      },
    },
    {
      "@type": "Question",
      name: "Does this roofing calculator include labor?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Enter the installation labor cost per roofing square. The calculator applies labor to the base roof area before material waste.",
      },
    },
    {
      "@type": "Question",
      name: "How is roof tear-off cost calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Tear-off cost is calculated from the base roofing squares multiplied by the number of existing roof layers and the entered removal cost per square per layer.",
      },
    },
    {
      "@type": "Question",
      name: "Does the roofing estimate include sales tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The calculator can apply an entered sales-tax rate to material cost. Taxability varies by project type and location, so verify the taxable amount and rate locally.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Roofing Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url:
    "https://numeravo.com/construction/roofing-calculator",
  description:
    "Calculate roof area, roofing squares, waste, material cost, labor, tear-off, fees, tax, and estimated roofing project cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RoofingCalculatorPage() {
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
              Roofing quantity and cost planning
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Roofing Calculator
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate sloped roof area, waste-adjusted roofing
              squares, material cost, installation labor,
              tear-off, disposal, delivery, permits, tax, and
              total project cost using editable local pricing.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard
                label="Roof quantity"
                value="Area + squares"
              />

              <SummaryCard
                label="Project costs"
                value="Material + labor"
              />

              <SummaryCard
                label="Full estimate"
                value="Removal + fees"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">
              What this calculator includes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <FeatureRow
                label="Area input"
                value="footprint or measured"
              />

              <FeatureRow
                label="Roof adjustment"
                value="pitch + waste"
              />

              <FeatureRow
                label="Cost breakdown"
                value="material + labor"
              />

              <FeatureRow
                label="Project total"
                value="tear-off + fees + tax"
                last
              />
            </div>
          </div>
        </div>

        <RoofingCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            How to use the roofing calculator
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Begin with either the building footprint and roof
            pitch or a known measurement of the sloped roof area.
            Select the roofing material, add waste, and enter
            current material, labor, tear-off, fee, and tax
            information for the project.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StepCard
              number="1"
              title="Determine roof area"
              description="Use the building footprint and pitch for a simple rectangular roof, or enter a measured sloped roof area."
            />

            <StepCard
              number="2"
              title="Add waste and pricing"
              description="Enter a project-specific waste allowance and current material and installation prices per roofing square."
            />

            <StepCard
              number="3"
              title="Complete the project cost"
              description="Include tear-off layers, disposal, delivery, permits, additional fees, tax, and a planning range."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Roofing calculation formulas
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FormulaCard
              title="Pitch multiplier"
              formula="√(rise² + run²) ÷ run"
              description="The multiplier converts horizontal roof area into estimated sloped roof area."
            />

            <FormulaCard
              title="Base roofing squares"
              formula="sloped roof area ÷ 100"
              description="One roofing square equals 100 square feet of roof surface."
            />

            <FormulaCard
              title="Purchase roofing squares"
              formula="base squares × (1 + waste % ÷ 100)"
              description="The purchase quantity includes the entered allowance for cuts, layout, and material loss."
            />

            <FormulaCard
              title="Material cost"
              formula="purchase squares × material cost per square"
              description="Material pricing is applied to the waste-adjusted purchase quantity."
            />

            <FormulaCard
              title="Installation labor"
              formula="base squares × labor cost per square"
              description="Installation labor is applied to the roof area before material waste."
            />

            <FormulaCard
              title="Tear-off cost"
              formula="base squares × layers × removal cost per square"
              description="Removal cost accounts for the entered number of existing roofing layers."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Building footprint versus measured roof area
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoCard
              title="Building footprint and pitch"
              description="Use this mode for an early estimate of a simple rectangular gable, hip, or shed roof. The calculator adds the entered overhang and uses the pitch multiplier to estimate sloped surface area."
            />

            <InfoCard
              title="Known sloped roof area"
              description="Use this mode when you already have a roof measurement from plans, field measurements, an aerial report, or a detailed takeoff. The entered area is used directly before waste."
            />
          </div>

          <p className="mt-5 leading-7 text-[#A0AEC0]">
            For roofs with multiple wings, dormers, intersecting
            sections, different pitches, or irregular geometry,
            calculate each roof plane separately and combine the
            measured sloped areas before entering the known-area
            total.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            What affects roofing waste?
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Roofing waste is not determined by roof area alone.
            Material type, roof geometry, installation pattern,
            product dimensions, damage, and packaging can all
            change the amount that must be purchased.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SmallCard
              title="Roof shape"
              text="Valleys, hips, dormers, offsets, and intersecting roof sections increase cutting."
            />

            <SmallCard
              title="Material"
              text="Shingles, panels, tile, slate, wood, and membranes have different ordering requirements."
            />

            <SmallCard
              title="Layout"
              text="Starter courses, staggered joints, pattern alignment, end laps, and panel widths affect waste."
            />

            <SmallCard
              title="Condition"
              text="Damaged pieces, unsuitable decking, field changes, and repairs can require additional material."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Roofing project cost categories
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              title="Roofing materials"
              description="Enter the current cost per roofing square for the selected material and project specifications."
            />

            <InfoCard
              title="Installation labor"
              description="Labor can vary with material type, pitch, height, access, complexity, crew requirements, and location."
            />

            <InfoCard
              title="Tear-off"
              description="Existing layers, attachment method, material weight, site access, and deck condition can affect removal cost."
            />

            <InfoCard
              title="Disposal"
              description="Include dumpsters, hauling, landfill or recycling charges, weight limits, and additional load fees."
            />

            <InfoCard
              title="Delivery and permits"
              description="Add supplier delivery, lift or rooftop loading, staging, permit, inspection, and administrative fees."
            />

            <InfoCard
              title="Tax and uncertainty"
              description="Verify local tax treatment and use the editable estimate range for unresolved conditions or pricing changes."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-orange-500/40 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Roofing estimate and safety notice
          </h2>

          <p className="mt-4 leading-7 text-[#D1D5DB]">
            This calculator provides a planning estimate and does
            not replace field measurements, supplier takeoffs,
            manufacturer installation requirements, contractor
            proposals, engineered plans, structural review, or
            local building requirements. Roof access and
            measurement can involve serious fall hazards. Use
            trained personnel, appropriate access equipment, and
            required fall protection.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Roofing calculator FAQs
          </h2>

          <div className="mt-6 space-y-4">
            <FaqItem
              question="How do I calculate roofing squares?"
              answer="Determine the sloped roof area in square feet and divide it by 100. Add the selected waste allowance to determine the purchase roofing squares."
            />

            <FaqItem
              question="Should labor be calculated on the waste-adjusted area?"
              answer="This calculator applies installation labor to the base roof area and material pricing to the waste-adjusted purchase quantity. Actual contractor pricing methods can differ."
            />

            <FaqItem
              question="How does the calculator estimate tear-off?"
              answer="It multiplies the base roofing squares by the number of existing roof layers and the entered removal cost per square per layer."
            />

            <FaqItem
              question="Does the estimate include roof decking repairs?"
              answer="Decking replacement is not automatically included. Add an allowance under additional fees or obtain a separate deck-repair estimate after inspection."
            />

            <FaqItem
              question="Why are all pricing inputs editable?"
              answer="Roofing prices vary by material, specification, labor market, location, access, pitch, complexity, supplier, and project conditions. Current local quotes provide a more reliable estimate than static default prices."
            />

            <FaqItem
              question="What will the separate Shingle Calculator calculate?"
              answer="The Shingle Calculator will focus on purchase quantities such as bundles, underlayment, starter material, ridge caps, nails, drip edge, and related asphalt-shingle components."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Related construction calculators
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            <RelatedLink
              href="/construction/stud-calculator"
              label="Stud Calculator"
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
