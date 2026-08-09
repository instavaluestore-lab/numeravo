import type { Metadata } from "next";
import Link from "next/link";
import RoofPitchCalculatorClient from "./RoofPitchCalculatorClient";

export const metadata: Metadata = {
  title: "Roof Pitch Calculator | Angle, Slope, Area & Rafter",
  description:
    "Calculate roof pitch, angle, percent slope, pitch multiplier, roof area, roofing squares, vertical rise, and common-rafter length.",
  alternates: {
    canonical:
      "https://numeravo.com/construction/roof-pitch-calculator",
  },
  openGraph: {
    title:
      "Roof Pitch Calculator | Angle, Slope, Area & Rafter",
    description:
      "Convert roof rise and run into pitch ratio, degrees, percent slope, multiplier, estimated roof area, roofing squares, and rafter length.",
    url:
      "https://numeravo.com/construction/roof-pitch-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roof Pitch Calculator",
    description:
      "Calculate roof pitch, angle, slope, multiplier, roof area, roofing squares, and common-rafter length.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate roof pitch?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Measure the vertical rise over a known horizontal run. In the United States, roof pitch is commonly expressed as inches of rise for every 12 inches of run, such as 6:12.",
      },
    },
    {
      "@type": "Question",
      name: "What angle is a 6:12 roof pitch?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A 6:12 roof pitch has an angle of approximately 26.57 degrees and a percent slope of 50 percent.",
      },
    },
    {
      "@type": "Question",
      name: "What is a roof pitch multiplier?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A roof pitch multiplier converts horizontal roof area into estimated sloped surface area. It is calculated by dividing the sloped triangle length by its horizontal run.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert roof area into roofing squares?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Divide the sloped roof area in square feet by 100. One roofing square equals 100 square feet of roof surface.",
      },
    },
    {
      "@type": "Question",
      name: "Does roof pitch affect rafter length?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. As roof pitch increases, the sloped rafter length increases for the same horizontal run. This calculator multiplies the horizontal rafter run by the pitch multiplier.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Roof Pitch Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url:
    "https://numeravo.com/construction/roof-pitch-calculator",
  description:
    "Calculate roof pitch, roof angle, percent slope, pitch multiplier, roof area, roofing squares, and common-rafter length.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const commonPitches = [
  {
    pitch: "2:12",
    angle: "9.46°",
    slope: "16.67%",
    multiplier: "1.014",
  },
  {
    pitch: "3:12",
    angle: "14.04°",
    slope: "25%",
    multiplier: "1.031",
  },
  {
    pitch: "4:12",
    angle: "18.43°",
    slope: "33.33%",
    multiplier: "1.054",
  },
  {
    pitch: "5:12",
    angle: "22.62°",
    slope: "41.67%",
    multiplier: "1.083",
  },
  {
    pitch: "6:12",
    angle: "26.57°",
    slope: "50%",
    multiplier: "1.118",
  },
  {
    pitch: "7:12",
    angle: "30.26°",
    slope: "58.33%",
    multiplier: "1.158",
  },
  {
    pitch: "8:12",
    angle: "33.69°",
    slope: "66.67%",
    multiplier: "1.202",
  },
  {
    pitch: "9:12",
    angle: "36.87°",
    slope: "75%",
    multiplier: "1.250",
  },
  {
    pitch: "10:12",
    angle: "39.81°",
    slope: "83.33%",
    multiplier: "1.302",
  },
  {
    pitch: "12:12",
    angle: "45°",
    slope: "100%",
    multiplier: "1.414",
  },
];

export default function RoofPitchCalculatorPage() {
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
              Roof slope and area planning
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Roof Pitch Calculator
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Convert roof rise and run into pitch ratio, angle,
              percent slope, and pitch multiplier. Add building
              dimensions to estimate roof area, roofing squares,
              vertical rise, and common-rafter length.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard
                label="Pitch conversion"
                value="Ratio + angle"
              />

              <SummaryCard
                label="Roof surface"
                value="Area + squares"
              />

              <SummaryCard
                label="Rafter planning"
                value="Run + length"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">
              What this calculator includes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <FeatureRow
                label="Pitch conversion"
                value="ratio + degrees"
              />

              <FeatureRow
                label="Slope results"
                value="percent + multiplier"
              />

              <FeatureRow
                label="Roof estimate"
                value="area + squares"
              />

              <FeatureRow
                label="Rafter estimate"
                value="run + rise + length"
                last
              />
            </div>
          </div>
        </div>

        <RoofPitchCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            How to calculate roof pitch
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Roof pitch compares vertical rise with horizontal run.
            A 6:12 pitch rises 6 inches for every 12 inches of
            horizontal distance. That ratio can be converted into
            an angle, percent slope, and multiplier using
            right-triangle calculations.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StepCard
              number="1"
              title="Measure the rise"
              description="Measure the vertical change over a known horizontal section of the roof or rafter."
            />

            <StepCard
              number="2"
              title="Measure the run"
              description="Use 12 inches of horizontal run for a standard U.S. pitch ratio, or enter another known run."
            />

            <StepCard
              number="3"
              title="Review the results"
              description="Use the calculated angle, multiplier, area, squares, and rafter length for project planning."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Roof pitch formulas
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FormulaCard
              title="Roof angle"
              formula="angle = arctan(rise ÷ run)"
              description="The result is converted from radians into degrees."
            />

            <FormulaCard
              title="Percent slope"
              formula="percent slope = rise ÷ run × 100"
              description="A 6:12 pitch produces a 50% slope."
            />

            <FormulaCard
              title="Pitch multiplier"
              formula="√(rise² + run²) ÷ run"
              description="Multiply horizontal roof area by this factor to estimate sloped surface area."
            />

            <FormulaCard
              title="Common-rafter length"
              formula="horizontal rafter run × pitch multiplier"
              description="This is a basic geometric length before ridge, seat-cut, tail, and framing adjustments."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Common roof pitch conversion chart
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Use this chart for quick comparisons between common
            rise-over-12 pitches, roof angles, percent slopes, and
            pitch multipliers.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#1F2937]">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-[#0B0F19] text-white">
                <tr>
                  <th className="px-4 py-4 font-semibold">
                    Pitch
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    Angle
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    Percent slope
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    Multiplier
                  </th>
                </tr>
              </thead>

              <tbody>
                {commonPitches.map((row) => (
                  <tr
                    key={row.pitch}
                    className="border-t border-[#1F2937] text-[#A0AEC0]"
                  >
                    <td className="px-4 py-4 font-semibold text-white">
                      {row.pitch}
                    </td>
                    <td className="px-4 py-4">
                      {row.angle}
                    </td>
                    <td className="px-4 py-4">
                      {row.slope}
                    </td>
                    <td className="px-4 py-4">
                      {row.multiplier}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Understanding roof area and roofing squares
          </h2>

          <div className="mt-4 space-y-4 leading-7 text-[#A0AEC0]">
            <p>
              A sloped roof has more surface area than its
              horizontal footprint. The calculator first adds the
              selected overhang to the building dimensions, then
              multiplies the horizontal roof area by the pitch
              multiplier.
            </p>

            <p>
              One roofing square equals 100 square feet of roof
              surface. The square result is an area measurement,
              not a final material order. Shingles, underlayment,
              starter material, ridge caps, flashing, waste, roof
              complexity, and product coverage must be calculated
              separately.
            </p>

            <p>
              Gable and hip roofs over the same rectangular
              footprint have approximately the same total
              geometric surface area when the pitch is consistent.
              Their material waste and installation requirements
              can still differ substantially.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-500/40 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Measurement and safety notice
          </h2>

          <p className="mt-4 leading-7 text-[#D1D5DB]">
            This calculator provides planning estimates for simple
            roof geometry. It does not replace engineered plans,
            manufacturer instructions, local building requirements,
            structural calculations, or field verification.
            Valleys, hips, dormers, offsets, unequal slopes, ridge
            details, framing cuts, and complex roof sections can
            change actual quantities. Avoid climbing or measuring
            a roof without suitable training, access equipment,
            and fall protection.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Roof pitch calculator FAQs
          </h2>

          <div className="mt-6 space-y-4">
            <FaqItem
              question="How do I calculate roof pitch?"
              answer="Measure vertical rise over horizontal run. Roof pitch in the United States is commonly written as inches of rise per 12 inches of run, such as 4:12, 6:12, or 8:12."
            />

            <FaqItem
              question="What angle is a 6:12 roof pitch?"
              answer="A 6:12 pitch is approximately 26.57 degrees. It also equals a 50% slope and has a pitch multiplier of approximately 1.118."
            />

            <FaqItem
              question="What does the pitch multiplier calculate?"
              answer="The multiplier converts a horizontal distance or area into its corresponding sloped measurement. It can be applied to horizontal roof area and horizontal rafter run."
            />

            <FaqItem
              question="How many square feet are in one roofing square?"
              answer="One roofing square equals 100 square feet of roof surface. Material orders require product coverage and waste calculations in addition to the geometric roof area."
            />

            <FaqItem
              question="Is the calculated rafter length a final cut length?"
              answer="No. It is a basic geometric common-rafter length. Ridge thickness, birdsmouth and seat cuts, tails, overhang framing, lumber dimensions, connections, and construction details may change the final cut length."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Related construction calculators
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            <RelatedLink
              href="/construction"
              label="All Construction Calculators"
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
