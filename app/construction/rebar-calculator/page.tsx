import type { Metadata } from "next";
import Link from "next/link";
import RebarCalculatorClient from "./RebarCalculatorClient";

export const metadata: Metadata = {
  title: "Rebar Calculator | Rebar Size, Spacing, Weight & Cost",
  description:
    "Free rebar calculator for concrete slabs, patios, driveways, footings, and reinforcement grids. Estimate rebar pieces, spacing, linear feet, weight, cost, lap allowance, and waste.",
  alternates: {
    canonical: "https://numeravo.com/construction/rebar-calculator",
  },
  openGraph: {
    title: "Rebar Calculator",
    description:
      "Estimate rebar quantity, spacing, weight, linear feet, stick count, waste, lap allowance, and cost for concrete projects.",
    url: "https://numeravo.com/construction/rebar-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebar Calculator",
    description:
      "Calculate rebar size, spacing, weight, stick count, linear feet, and cost for slabs, footings, patios, and concrete projects.",
  },
};

const rebarSizes = [
  { size: "#3", diameter: "3/8 in", weight: "0.376 lb/ft", commonUse: "Small pads, light slabs, ties, repairs" },
  { size: "#4", diameter: "1/2 in", weight: "0.668 lb/ft", commonUse: "Residential slabs, patios, sidewalks, light driveways" },
  { size: "#5", diameter: "5/8 in", weight: "1.043 lb/ft", commonUse: "Driveways, heavier slabs, footings, walls" },
  { size: "#6", diameter: "3/4 in", weight: "1.502 lb/ft", commonUse: "Heavier footings, foundation work, structural projects" },
  { size: "#7", diameter: "7/8 in", weight: "2.044 lb/ft", commonUse: "Larger engineered concrete work" },
  { size: "#8", diameter: "1 in", weight: "2.670 lb/ft", commonUse: "Heavy structural and commercial reinforcement" },
];

export default function RebarCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Rebar Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/rebar-calculator",
    description:
      "Estimate rebar quantity, spacing, linear feet, weight, stick count, waste, lap allowance, and cost for concrete reinforcement projects.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does #4 rebar mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The rebar number describes the nominal diameter in eighths of an inch. #4 rebar is about 4/8 inch, or 1/2 inch, in diameter.",
        },
      },
      {
        "@type": "Question",
        name: "How much does #4 rebar weigh per foot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "#4 rebar weighs about 0.668 pounds per linear foot.",
        },
      },
      {
        "@type": "Question",
        name: "What is common rebar spacing for concrete slabs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common slab spacing may be 12, 16, 18, or 24 inches on center, depending on slab use, load, soil, local code, and engineering requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Should rebar touch the ground?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Rebar should be supported with chairs, dobies, or other supports so it has proper concrete cover and does not sit directly on the ground.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/construction"
            className="text-sm font-medium text-[#F97316] hover:underline"
          >
            ← Back to Construction Calculators
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              Construction Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Rebar Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate rebar pieces, spacing, total linear feet, stick count, weight,
              waste, lap allowance, and material cost for slabs, patios, driveways,
              footings, and concrete reinforcement grids.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Slabs + footings</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Outputs</p>
                <p className="mt-1 font-semibold text-white">Feet, weight, cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Useful for</p>
                <p className="mt-1 font-semibold text-white">DIY + pros</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Rebar size basics</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Rebar numbers match nominal diameter in eighths of an inch. A #4 bar is
              about 4/8 inch, or 1/2 inch. A #5 bar is about 5/8 inch.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common residential choice</p>
              <p className="mt-2 text-2xl font-bold text-white">
                #4 rebar at 12–24 in. spacing
              </p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Always verify project requirements, local code, and engineering specs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <RebarCalculatorClient />
        </div>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Rebar size, thickness, and weight chart
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#A0AEC0]">
            Use this chart to compare common rebar sizes. Smaller numbers are lighter
            and easier to handle. Larger bars add more steel weight and are typically
            used for heavier structural work.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#1F2937] text-white">
                  <th className="py-3 pr-4">Rebar size</th>
                  <th className="py-3 pr-4">Nominal diameter</th>
                  <th className="py-3 pr-4">Approx. weight</th>
                  <th className="py-3 pr-4">Common use</th>
                </tr>
              </thead>
              <tbody className="text-[#A0AEC0]">
                {rebarSizes.map((bar) => (
                  <tr key={bar.size} className="border-b border-[#1F2937]">
                    <td className="py-3 pr-4 font-semibold text-white">{bar.size}</td>
                    <td className="py-3 pr-4">{bar.diameter}</td>
                    <td className="py-3 pr-4">{bar.weight}</td>
                    <td className="py-3 pr-4">{bar.commonUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-xl font-semibold text-white">For beginners</h2>
            <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">
              Rebar should be placed inside the concrete, not at the very bottom and not
              touching the soil or forms. Use chairs, dobies, or supports so concrete
              can surround the steel.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-xl font-semibold text-white">For experienced workers</h2>
            <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">
              Add waste, lap allowance, stock length, and price per stick to turn a
              quick spacing layout into a more realistic material order estimate.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-xl font-semibold text-white">Important note</h2>
            <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">
              This calculator estimates material quantity. It does not replace engineered
              reinforcement design, local code requirements, or project-specific structural
              specifications.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Rebar calculator FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-white">What does #4 rebar mean?</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                #4 rebar is approximately 4/8 inch, or 1/2 inch, in nominal diameter.
                The same pattern applies to common U.S. bar sizes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">How much does #4 rebar weigh?</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                #4 rebar weighs about 0.668 pounds per linear foot. A 20-foot stick
                weighs about 13.36 pounds before ties, waste, or handling extras.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">What spacing should I use?</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Common slab spacing may be 12, 16, 18, or 24 inches on center. The
                correct spacing depends on slab thickness, load, soil, climate, local
                code, and engineering requirements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Do I need lap splices?</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                If bars must be joined end-to-end, overlap may be required. Actual lap
                length depends on engineering specs, bar size, concrete strength, bar
                grade, and project conditions.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-stairs-calculator" label="Concrete Stairs Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
            <RelatedLink href="/construction/concrete-wall-calculator" label="Concrete Wall Calculator" />
            <RelatedLink href="/construction/sonotube-concrete-calculator" label="Sonotube Concrete Calculator" />
            <RelatedLink href="/construction/area-calculator" label="Area Calculator" />
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
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#F97316]"
    >
      {label}
    </Link>
  );
}
