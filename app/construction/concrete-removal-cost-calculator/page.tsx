import type { Metadata } from "next";
import Link from "next/link";
import ConcreteRemovalCostCalculatorClient from "./ConcreteRemovalCostCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Removal Cost Calculator | Demo & Haul-Off Cost",
  description:
    "Estimate concrete removal cost by area, slab thickness, concrete weight, demolition labor, equipment, dumpster, disposal, haul-off, and total cost per square foot.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-removal-cost-calculator",
  },
  openGraph: {
    title: "Concrete Removal Cost Calculator",
    description:
      "Calculate concrete demolition, disposal, haul-off, equipment, labor, and total removal cost.",
    url: "https://numeravo.com/construction/concrete-removal-cost-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Removal Cost Calculator",
    description:
      "Estimate concrete removal cost, concrete weight, disposal, haul-off, and demolition labor.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you estimate concrete removal cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete removal cost is commonly estimated by calculating the square footage, slab thickness, concrete volume, concrete weight, labor, equipment, disposal, haul-off, and any access or difficulty adjustments.",
      },
    },
    {
      "@type": "Question",
      name: "What affects concrete demolition cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Major cost drivers include slab thickness, reinforcement, access, saw cutting, disposal fees, haul distance, equipment needs, labor rate, and whether the concrete is broken up by hand or machine.",
      },
    },
    {
      "@type": "Question",
      name: "How much does removed concrete weigh?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Normal concrete weighs about 145 to 150 pounds per cubic foot. A thicker slab can add significant disposal and hauling weight even when the surface area is modest.",
      },
    },
    {
      "@type": "Question",
      name: "Is concrete removal priced per square foot?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Many small concrete removal jobs are discussed as a cost per square foot, but the actual estimate should also account for thickness, weight, labor, equipment, disposal, hauling, and site access.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Concrete Removal Cost Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/concrete-removal-cost-calculator",
  description:
    "Estimate concrete demolition, disposal, haul-off, labor, equipment, and total removal cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcreteRemovalCostCalculatorPage() {
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
              Concrete demolition and haul-off
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Concrete Removal Cost Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete removal cost from square footage, slab thickness,
              concrete weight, labor, equipment, dumpster or disposal fees,
              haul-off, and site difficulty. Use it for patios, driveways,
              sidewalks, pads, garage slabs, and small demolition jobs.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Core output</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Total cost
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Weight planning</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Tons removed
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Bid comparison</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  $/sq ft
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator includes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Concrete quantity</span>
                <span className="font-semibold text-white">sq ft × thickness</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Weight</span>
                <span className="font-semibold text-white">lb + tons</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Cost drivers</span>
                <span className="font-semibold text-white">labor + equipment</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Disposal</span>
                <span className="font-semibold text-white">dumpster + haul-off</span>
              </div>
            </div>
          </div>
        </div>

        <ConcreteRemovalCostCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How the concrete removal estimate works</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            The calculator converts the demolition area and slab thickness into
            cubic feet and cubic yards, then estimates concrete weight using the
            selected density. It then adds labor, equipment, disposal, hauling,
            and site difficulty so the result is more useful than a flat
            square-foot estimate.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Measure the slab</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Enter length, width, and thickness. Thicker slabs create more
                weight and higher disposal costs.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Add demolition costs</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Include labor hours, labor rate, equipment rental, saw cutting,
                and site access difficulty.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Add disposal and hauling</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Estimate dumpster, landfill, concrete recycling, haul-off, and
                cost per ton.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to estimate replacement concrete, forms, waste,
            delivery, reinforcement, and slab costs.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-formwork-calculator" label="Concrete Formwork Calculator" />
            <RelatedLink href="/construction/concrete-waste-calculator" label="Concrete Waste Calculator" />
            <RelatedLink href="/construction/concrete-weight-calculator" label="Concrete Weight Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-delivery-cost-calculator" label="Concrete Delivery Cost Calculator" />
            <RelatedLink href="/construction/concrete-short-load-fee-calculator" label="Concrete Short Load Fee Calculator" />
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
