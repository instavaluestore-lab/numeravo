import type { Metadata } from "next";
import Link from "next/link";
import RebarLapSpliceCalculatorClient from "./RebarLapSpliceCalculatorClient";

export const metadata: Metadata = {
  title: "Rebar Lap Splice Calculator | Rebar Overlap Length",
  description:
    "Calculate rebar lap splice length, overlap length, splice zone quantity, added rebar length, bar weight, and estimated splice material cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/rebar-lap-splice-calculator",
  },
  openGraph: {
    title: "Rebar Lap Splice Calculator",
    description:
      "Estimate rebar overlap length, lap splice quantity, added bar length, rebar weight, and splice material cost for concrete reinforcement planning.",
    url: "https://numeravo.com/construction/rebar-lap-splice-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebar Lap Splice Calculator",
    description:
      "Calculate rebar lap splice length, overlap length, added rebar length, weight, and estimated material cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a rebar lap splice?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A rebar lap splice is the overlap length used when two reinforcing bars are joined so that force can transfer from one bar to the next through the surrounding concrete.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate rebar lap splice length?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A common estimating method is to multiply the rebar diameter by a selected lap factor, such as 40 bar diameters or 60 bar diameters. Actual required lap splice length depends on engineering design, concrete strength, bar size, spacing, cover, coating, development length, and applicable code requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Is 40 bar diameters always enough for a lap splice?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Forty bar diameters is a common field estimating rule, but it is not a universal engineering requirement. Structural drawings, building code, engineer specifications, concrete strength, bar coating, confinement, and splice class can require a different lap length.",
      },
    },
    {
      "@type": "Question",
      name: "Can this calculator replace an engineer's splice schedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. This calculator is for estimating and planning only. Structural rebar lap splice requirements should be verified against project drawings, specifications, local code, and a qualified engineer.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Rebar Lap Splice Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/rebar-lap-splice-calculator",
  description:
    "Calculate rebar lap splice length, overlap length, splice quantity, added rebar length, rebar weight, and estimated splice material cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RebarLapSpliceCalculatorPage() {
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
              Rebar overlap and splice planning
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Rebar Lap Splice Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate rebar lap splice length, overlap quantity, added rebar
              length, splice weight, and material cost using bar size, lap
              factor, number of splices, and rebar price.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Bar size</p>
                <p className="mt-2 text-2xl font-bold text-white">#3–#11</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Lap factor</p>
                <p className="mt-2 text-2xl font-bold text-white">db × factor</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Material</p>
                <p className="mt-2 text-2xl font-bold text-white">Length + wt</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator includes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Lap length</span>
                <span className="font-semibold text-white">in + ft</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Splice count</span>
                <span className="font-semibold text-white">total overlaps</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Added rebar</span>
                <span className="font-semibold text-white">linear ft</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Estimate</span>
                <span className="font-semibold text-white">weight + cost</span>
              </div>
            </div>
          </div>
        </div>

        <RebarLapSpliceCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How rebar lap splice length is estimated</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Rebar lap splice estimating commonly starts with bar diameter and a
            selected lap factor, such as 40 bar diameters or 60 bar diameters.
            This is useful for planning, takeoffs, and material estimates, but
            it does not replace project drawings, code requirements, or
            engineering specifications.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Choose rebar size</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Select the bar number so the calculator can use the approximate
                diameter and weight per foot.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Set splice factor</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Use a field-estimating factor or custom multiplier based on your
                project requirements.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Estimate added material</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Multiply lap length by splice count to estimate added bar
                length, weight, and cost.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-400/40 bg-orange-400/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">Important estimating note</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Rebar lap splice requirements can be structural-code-sensitive. Use
            this calculator for estimating only. Always verify final splice
            length with project plans, specifications, local code, and a
            qualified engineer when structural performance matters.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related rebar and concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to estimate reinforcement, spacing, slab material,
            concrete cost, and supporting project quantities.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing Calculator" />
            <RelatedLink href="/construction/rebar-weight-calculator" label="Rebar Weight Calculator" />
            <RelatedLink href="/construction/wire-mesh-calculator" label="Wire Mesh Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
            <RelatedLink href="/construction/concrete-wall-calculator" label="Concrete Wall Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-psi-calculator" label="Concrete PSI Calculator" />
            <RelatedLink href="/construction/concrete-waste-calculator" label="Concrete Waste Calculator" />
            <RelatedLink href="/construction/concrete-labor-cost-calculator" label="Concrete Labor Cost Calculator" />
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
