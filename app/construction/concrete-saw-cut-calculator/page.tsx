import type { Metadata } from "next";
import Link from "next/link";
import ConcreteSawCutCalculatorClient from "./ConcreteSawCutCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Saw Cut Calculator | Joint Depth, Spacing & Cost",
  description:
    "Calculate concrete saw cut depth, saw cut spacing, number of cuts, linear feet, control joint layout, demolition cuts, and total saw cutting cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-saw-cut-calculator",
  },
  openGraph: {
    title: "Concrete Saw Cut Calculator",
    description:
      "Estimate concrete saw cut depth, spacing, linear feet, joint layout, and saw cutting cost for slabs, driveways, patios, sidewalks, and demolition.",
    url: "https://numeravo.com/construction/concrete-saw-cut-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Saw Cut Calculator",
    description:
      "Estimate concrete saw cut depth, spacing, linear feet, number of cuts, and total saw cutting cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How deep should concrete saw cuts be?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A common planning rule for control joints is to saw cut about one quarter of the slab thickness. For example, a 4 inch slab often uses a saw cut depth around 1 inch, depending on project requirements and local practice.",
      },
    },
    {
      "@type": "Question",
      name: "How far apart should saw cuts be in concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Saw cut spacing depends on slab thickness, slab shape, reinforcement, mix design, weather, and project conditions. A common planning range is roughly 24 to 36 times the slab thickness in inches, converted to feet.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate saw cut linear feet?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Saw cut linear feet can be estimated by counting the planned cuts running across the slab in each direction and multiplying each cut count by the length of the cut.",
      },
    },
    {
      "@type": "Question",
      name: "Are saw cuts used for demolition too?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Saw cuts are often used to create clean edges, isolate sections, reduce uncontrolled cracking, and divide concrete into manageable pieces for demolition and removal.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Concrete Saw Cut Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/concrete-saw-cut-calculator",
  description:
    "Calculate concrete saw cut depth, spacing, linear feet, number of cuts, joint layout, and total saw cutting cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcreteSawCutCalculatorPage() {
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
              Concrete saw cutting and joint layout
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Concrete Saw Cut Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete saw cut depth, saw cut spacing, number of cuts,
              linear feet, joint layout, demolition cut planning, and total saw
              cutting cost for slabs, driveways, patios, sidewalks, pads, and
              removal work.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Depth guide</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  1/4 slab
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Layout</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Cut count
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Cost</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  $/linear ft
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator includes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Saw cut depth</span>
                <span className="font-semibold text-white">slab ÷ 4</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Cut spacing</span>
                <span className="font-semibold text-white">target ft</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Cut length</span>
                <span className="font-semibold text-white">linear feet</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Cost estimate</span>
                <span className="font-semibold text-white">labor + equipment</span>
              </div>
            </div>
          </div>
        </div>

        <ConcreteSawCutCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How concrete saw cut estimates work</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            This calculator estimates saw cut depth from slab thickness, then
            lays out cuts in one or two directions based on target spacing. It
            totals the linear feet of cutting and applies cost per linear foot,
            setup cost, and optional minimum job cost.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Enter slab size</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Use length, width, and thickness to estimate cut depth and
                layout.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Choose spacing</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Saw cut spacing controls the number of cuts and the final panel
                size.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Estimate cost</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Add price per linear foot, setup cost, and minimum job charge to
                estimate total saw cutting cost.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to plan control joints, expansion joints, concrete
            removal, demolition, replacement concrete, and slab costs.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-control-joint-spacing" label="Concrete Control Joint Spacing" />
            <RelatedLink href="/construction/concrete-expansion-joint-spacing" label="Concrete Expansion Joint Spacing" />
            <RelatedLink href="/construction/concrete-demolition-calculator" label="Concrete Demolition Calculator" />
            <RelatedLink href="/construction/concrete-removal-cost-calculator" label="Concrete Removal Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-formwork-calculator" label="Concrete Formwork Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
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
