import type { Metadata } from "next";
import Link from "next/link";
import StudCalculatorClient from "./StudCalculatorClient";

export const metadata: Metadata = {
  title: "Stud Calculator | Wall Framing Studs, Plates & Cost",
  description:
    "Calculate wall studs, stud spacing, corner and opening allowances, top and bottom plates, waste, linear feet, and framing material cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/stud-calculator",
  },
  openGraph: {
    title: "Stud Calculator | Wall Framing Studs, Plates & Cost",
    description:
      "Estimate wall framing studs, plates, waste, linear feet, and material cost using editable spacing, corner, opening, and framing allowances.",
    url: "https://numeravo.com/construction/stud-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stud Calculator",
    description:
      "Calculate wall studs, spacing, corners, openings, plates, waste, linear feet, and framing material cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate how many studs I need for a wall?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Divide the wall length in inches by the selected stud spacing, round up, and add one stud for the end of the wall. Then include additional studs for corners, doors, windows, intersections, backing, blocking, and waste.",
      },
    },
    {
      "@type": "Question",
      name: "How many studs are needed for a 20-foot wall at 16 inches on center?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A basic 20-foot wall requires 16 layout studs using the formula ceiling of 240 inches divided by 16 inches, plus one end stud. Corners, openings, intersections, waste, and structural details can increase the final quantity.",
      },
    },
    {
      "@type": "Question",
      name: "What does 16 inches on center mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Sixteen inches on center means the centerline of one stud is spaced 16 inches from the centerline of the next stud. Actual layout may be adjusted for wall ends, openings, sheathing, and project requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How many extra studs should I add for doors and windows?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Opening requirements depend on the framing design. King studs, jack studs, cripple studs, headers, opening width, load conditions, and local code can change the required quantity. This calculator provides an editable additional-studs-per-opening allowance.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator include top and bottom plates?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator includes editable top-plate and bottom-plate layer counts and calculates total plate linear feet and estimated plate cost.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stud Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/stud-calculator",
  description:
    "Calculate wall studs, framing allowances, plates, waste, linear feet, and estimated material cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function StudCalculatorPage() {
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
              Wall stud and plate planning
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Stud Calculator
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate wall studs, corner and opening allowances,
              top and bottom plates, waste, framing linear feet,
              and material cost using editable project assumptions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">
                  Stud spacing
                </p>
                <p className="mt-2 text-2xl font-bold">
                  12″–24″ OC
                </p>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">
                  Framing details
                </p>
                <p className="mt-2 text-2xl font-bold">
                  Corners + openings
                </p>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">
                  Material estimate
                </p>
                <p className="mt-2 text-2xl font-bold">
                  Studs + plates
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">
              What this calculator includes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Layout studs</span>
                <span className="font-semibold text-white">
                  spacing + walls
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Framing allowances</span>
                <span className="font-semibold text-white">
                  corners + openings
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Plate lumber</span>
                <span className="font-semibold text-white">
                  top + bottom
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Project estimate</span>
                <span className="font-semibold text-white">
                  quantity + cost
                </span>
              </div>
            </div>
          </div>
        </div>

        <StudCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            How wall stud quantity is calculated
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            The basic layout begins with the length of each wall and
            the selected on-center spacing. The calculator rounds up
            the number of stud spaces, adds an end stud, and then
            includes editable allowances for corners, openings,
            other framing details, and waste.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">
                1. Calculate layout studs
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Convert wall length to inches, divide by spacing,
                round up, and add one stud at the wall end.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">
                2. Add framing allowances
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Add editable quantities for corners, doors,
                windows, intersections, backing, or other details.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">
                3. Include plates and waste
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Calculate top and bottom plate length, then round
                the final stud quantity up after waste.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Stud and plate formulas
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FormulaCard
              title="Layout studs per wall"
              formula="Ceiling(wall length in inches ÷ spacing) + 1"
            />
            <FormulaCard
              title="Studs before waste"
              formula="Layout + corners + openings + other studs"
            />
            <FormulaCard
              title="Studs to purchase"
              formula="Ceiling(studs before waste × (1 + waste% ÷ 100))"
            />
            <FormulaCard
              title="Plate linear feet"
              formula="Total wall length × total plate layers"
            />
            <FormulaCard
              title="Stud material cost"
              formula="Studs to purchase × price per stud"
            />
            <FormulaCard
              title="Plate material cost"
              formula="Plate linear feet × price per linear foot"
            />
          </div>
        </section>

        <section className="rounded-3xl border border-orange-400/40 bg-orange-400/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Important framing note
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Wall framing requirements vary by project. Headers,
            cripple studs, king studs, jack studs, fire blocking,
            backing, bracing, intersections, concentrated loads,
            structural drawings, and local building codes may
            require additional lumber. Use this calculator for
            planning and material estimating, then verify the final
            framing design against the project requirements.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Related lumber and construction calculators
          </h2>

          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to estimate lumber, area, formwork,
            concrete, reinforcement, and related project materials.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/lumber-calculator"
              label="Lumber Calculator"
            />
        <RelatedLink
          href="/construction/roof-pitch-calculator"
          label="Roof Pitch Calculator"
        />
            <RelatedLink
              href="/construction/drywall-calculator"
              label="Drywall Calculator"
            />
            <RelatedLink
              href="/construction/area-calculator"
              label="Area Calculator"
            />
            <RelatedLink
              href="/construction/concrete-formwork-calculator"
              label="Concrete Formwork Calculator"
            />
            <RelatedLink
              href="/construction/concrete-wall-calculator"
              label="Concrete Wall Calculator"
            />
            <RelatedLink
              href="/construction/concrete-slab-calculator"
              label="Concrete Slab Calculator"
            />
            <RelatedLink
              href="/construction/concrete-footing-calculator"
              label="Concrete Footing Calculator"
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function FormulaCard({
  title,
  formula,
}: {
  title: string;
  formula: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold text-orange-300">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
        {formula}
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
