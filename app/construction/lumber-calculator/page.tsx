import type { Metadata } from "next";
import Link from "next/link";
import LumberCalculatorClient from "./LumberCalculatorClient";

export const metadata: Metadata = {
  title: "Lumber Calculator | Quantity, Board Feet & Cost",
  description:
    "Calculate lumber quantity, board feet, waste, supplier pricing, discounts, delivery, tax, and estimated delivered material cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/lumber-calculator",
  },
  openGraph: {
    title: "Lumber Calculator | Quantity, Board Feet & Cost",
    description:
      "Estimate lumber quantity, board feet, waste, supplier discounts, delivery, tax, and delivered material cost.",
    url: "https://numeravo.com/construction/lumber-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumber Calculator",
    description:
      "Calculate lumber quantity, board feet, supplier pricing, discounts, delivery, tax, and delivered material cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate how much lumber I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Enter the lumber size, length of each board, required number of pieces, and waste allowance. The calculator rounds the purchase quantity up to whole boards and calculates total linear feet, board feet, and estimated material cost.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate board feet?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Board feet are calculated by multiplying board thickness in inches by board width in inches by board length in feet, then dividing by 12. Multiply the result by the number of boards for the total board footage.",
      },
    },
    {
      "@type": "Question",
      name: "Should board feet use nominal or actual lumber dimensions?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Board-foot conventions vary by material and seller. This calculator uses nominal dimensions for standard lumber presets and clearly displays the dimensions used. Select Custom when you need to calculate from actual measured dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "How much waste should I add when buying lumber?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A planning allowance of 5% to 15% is common, but the appropriate amount depends on board quality, required cuts, defects, grain matching, project complexity, and whether offcuts can be reused.",
      },
    },
    {
      "@type": "Question",
      name: "Does the lumber calculator round up to whole boards?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The recommended purchase quantity is rounded up to the next whole board after the waste allowance is applied.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lumber Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/lumber-calculator",
  description:
    "Calculate lumber quantity, board feet, waste, supplier pricing, discounts, delivery, tax, and delivered material cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function LumberCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
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
              Lumber quantity and cost planning
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Lumber Calculator
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate lumber pieces, waste allowance, linear feet, board feet,
              and material cost using standard dimensional lumber sizes or
              custom board dimensions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Board sizes</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Preset + custom
                </p>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Quantity</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Pieces + waste
                </p>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Project estimate</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Board ft + cost
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
                <span>Board sizes</span>
                <span className="font-semibold text-white">
                  standard + custom
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Purchase quantity</span>
                <span className="font-semibold text-white">
                  whole pieces
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Material totals</span>
                <span className="font-semibold text-white">
                  linear + board ft
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Cost estimate</span>
                <span className="font-semibold text-white">
                  total + per bd ft
                </span>
              </div>
            </div>
          </div>
        </div>

        <LumberCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            How to calculate lumber for a project
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Begin with the number of full-length pieces required by your
            project layout. Select the board size and stock length, then add an
            allowance for cuts, defects, damaged boards, and field changes. The
            calculator rounds the final purchase quantity up to whole boards.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Select lumber size</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Choose a common dimensional-lumber preset or enter custom
                thickness and width measurements.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Enter length and pieces</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Enter the stock length of each board and the number of pieces
                required before waste.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Add waste and pricing</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Add a waste percentage and current supplier pricing to
                calculate the purchase quantity and estimated material cost.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Lumber calculation formulas</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold text-orange-300">
                Board feet per piece
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
                Thickness (in) × width (in) × length (ft) ÷ 12
              </p>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold text-orange-300">
                Purchase quantity
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
                Required pieces × (1 + waste percentage ÷ 100), rounded up
              </p>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold text-orange-300">
                Total linear feet
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
                Purchase quantity × board length
              </p>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold text-orange-300">
                Estimated material cost
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
                Purchase quantity × price per piece
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-400/40 bg-orange-400/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Nominal versus actual lumber size
          </h2>

          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Standard presets use nominal lumber dimensions for board-foot
            estimating. Finished dimensional lumber is usually smaller than
            its nominal name—for example, a board sold as a 2×4 commonly has
            smaller actual dimensions. Select Custom when supplier pricing,
            woodworking, or material specifications require actual measured
            dimensions.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Related construction calculators
          </h2>

          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to estimate project area, formwork, concrete,
            reinforcement, and supporting construction quantities.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/stud-calculator"
              label="Stud Calculator"
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
              href="/construction/concrete-formwork-calculator"
              label="Concrete Formwork Calculator"
            />
            <RelatedLink
              href="/construction/concrete-slab-calculator"
              label="Concrete Slab Calculator"
            />
            <RelatedLink
              href="/construction/concrete-pad-calculator"
              label="Concrete Pad Calculator"
            />
            <RelatedLink
              href="/construction/concrete-footing-calculator"
              label="Concrete Footing Calculator"
            />
            <RelatedLink
              href="/construction/concrete-wall-calculator"
              label="Concrete Wall Calculator"
            />
            <RelatedLink
              href="/construction/rebar-calculator"
              label="Rebar Calculator"
            />
            <RelatedLink
              href="/construction/wire-mesh-calculator"
              label="Wire Mesh Calculator"
            />
            <RelatedLink
              href="/construction/gravel-calculator"
              label="Gravel Calculator"
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function RelatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
    >
      {label}
    </Link>
  );
}
