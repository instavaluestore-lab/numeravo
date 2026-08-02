import type { Metadata } from "next";
import Link from "next/link";
import ConcretePumpTruckCostCalculatorClient from "./ConcretePumpTruckCostCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Pump Truck Cost Calculator | Pumping Estimate",
  description:
    "Estimate concrete pump truck cost, pump rental, hourly charges, setup fees, line pump or boom pump pricing, yardage charges, travel fees, and total concrete pumping cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-pump-truck-cost-calculator",
  },
  openGraph: {
    title: "Concrete Pump Truck Cost Calculator",
    description:
      "Calculate concrete pumping cost for slabs, driveways, patios, footings, walls, and hard-to-reach concrete pours.",
    url: "https://numeravo.com/construction/concrete-pump-truck-cost-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Pump Truck Cost Calculator",
    description:
      "Estimate pump truck rental, setup, hourly pumping cost, travel fees, yardage charges, and total concrete pumping cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a concrete pump truck cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete pump truck cost depends on pump type, minimum hours, hourly rate, setup fees, travel charges, concrete volume, hose or boom requirements, and job complexity.",
      },
    },
    {
      "@type": "Question",
      name: "When do you need a concrete pump truck?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A concrete pump truck is commonly used when the concrete truck cannot reach the pour area directly, when wheelbarrow access is inefficient, or when concrete must be placed over a long distance, uphill, behind a structure, or into forms with limited access.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a line pump and a boom pump?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A line pump moves concrete through hoses and is often used for smaller residential pours or limited-access areas. A boom pump uses a hydraulic boom to place concrete faster over obstacles or at greater reach, usually at a higher cost.",
      },
    },
    {
      "@type": "Question",
      name: "Is concrete pumping cost included in concrete delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Usually concrete pumping is separate from ready-mix concrete delivery. Concrete delivery covers the concrete truck and material, while pumping covers the pump truck, operator, hose or boom setup, pumping time, and related fees.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Concrete Pump Truck Cost Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/concrete-pump-truck-cost-calculator",
  description:
    "Estimate concrete pump truck cost, pump type, setup fees, hourly charges, yardage fees, travel fees, and total pumping cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcretePumpTruckCostCalculatorPage() {
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
              Concrete placement and pumping cost
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Concrete Pump Truck Cost Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate line pump or boom pump cost, minimum rental charges,
              hourly pumping cost, setup fees, travel fees, yardage charges, hose
              labor, standby time, and total concrete pumping cost.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Pump type</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Line / boom
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Charges</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Hourly + fees
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Estimate</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Total cost
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator includes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Concrete volume</span>
                <span className="font-semibold text-white">cubic yards</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Pump rental</span>
                <span className="font-semibold text-white">minimum hours</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Placement time</span>
                <span className="font-semibold text-white">pump rate</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Total estimate</span>
                <span className="font-semibold text-white">fees + labor</span>
              </div>
            </div>
          </div>
        </div>

        <ConcretePumpTruckCostCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How concrete pump truck cost is estimated</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Concrete pumping cost is usually driven by the pump type, minimum
            charge, hourly rate, setup time, pumping time, travel fees, extra
            hose or boom requirements, standby time, washout, and jobsite access.
            This calculator separates those items so you can build a realistic
            budget before ordering concrete.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Estimate yardage</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Enter concrete volume or use your slab, driveway, footing, or
                wall calculator result.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Choose pump type</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Line pumps are common for smaller residential jobs. Boom pumps
                are useful for reach, speed, and difficult placement.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Add fees</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Include minimum rental time, travel, setup, hose labor, standby,
                washout, and any yardage surcharge.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to estimate concrete volume, delivery, short load
            charges, slab cost, driveway cost, labor, and placement planning.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/concrete-delivery-cost-calculator" label="Concrete Delivery Cost Calculator" />
            <RelatedLink href="/construction/concrete-short-load-fee-calculator" label="Concrete Short Load Fee Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
            <RelatedLink href="/construction/concrete-wall-calculator" label="Concrete Wall Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
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
