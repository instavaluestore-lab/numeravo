import type { Metadata } from "next";
import Link from "next/link";
import ConcreteDemolitionCalculatorClient from "./ConcreteDemolitionCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Demolition Calculator | Time, Weight & Crew Planning",
  description:
    "Estimate concrete demolition time, concrete weight, crew size, production rate, saw-cut length, equipment needs, haul-off loads, and demolition planning details.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-demolition-calculator",
  },
  openGraph: {
    title: "Concrete Demolition Calculator",
    description:
      "Plan concrete demolition by area, thickness, reinforcement, method, crew size, production rate, saw cuts, weight, and haul-off loads.",
    url: "https://numeravo.com/construction/concrete-demolition-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Demolition Calculator",
    description:
      "Estimate demo hours, crew days, saw-cut length, concrete weight, and haul-off loads for concrete demolition.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you estimate concrete demolition time?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete demolition time can be estimated from the surface area, slab thickness, reinforcement level, demolition method, crew size, production rate, saw cutting, loading time, and site access difficulty.",
      },
    },
    {
      "@type": "Question",
      name: "What affects concrete demolition difficulty?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete demolition difficulty is affected by slab thickness, wire mesh or rebar, access, whether heavy equipment can reach the work area, saw cutting requirements, haul distance, and disposal limits.",
      },
    },
    {
      "@type": "Question",
      name: "Is reinforced concrete harder to demolish?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Wire mesh, rebar, thickened edges, footings, and heavy-duty slabs usually slow demolition because concrete must be broken, separated, cut, loaded, and hauled more carefully.",
      },
    },
    {
      "@type": "Question",
      name: "How much does demolished concrete weigh?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Normal concrete commonly weighs about 145 to 150 pounds per cubic foot. The calculator converts area and thickness into volume and estimated weight for haul-off planning.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Concrete Demolition Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/concrete-demolition-calculator",
  description:
    "Estimate concrete demolition time, crew size, production rate, saw-cut length, equipment needs, concrete weight, and haul-off loads.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcreteDemolitionCalculatorPage() {
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
              Concrete demolition planning
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Concrete Demolition Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete demolition time, crew days, production rate,
              saw-cut length, equipment needs, concrete weight, and haul-off
              loads. Use it to plan driveway, patio, sidewalk, pad, garage slab,
              and reinforced concrete demolition work.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Main output</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Demo hours
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Crew planning</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Crew days
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Haul-off</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Tons + loads
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator plans</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Demolition speed</span>
                <span className="font-semibold text-white">sq ft/hour</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Crew schedule</span>
                <span className="font-semibold text-white">hours + days</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Concrete weight</span>
                <span className="font-semibold text-white">lb + tons</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Haul planning</span>
                <span className="font-semibold text-white">loads</span>
              </div>
            </div>
          </div>
        </div>

        <ConcreteDemolitionCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How the concrete demolition estimate works</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            The calculator starts with concrete area and thickness, then applies
            demolition method, reinforcement, crew size, production rate, access
            difficulty, saw cutting, loading time, and haul-off assumptions. The
            goal is to estimate the work plan before pricing the job.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Measure the concrete</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Enter length, width, and thickness to calculate area, volume,
                and estimated concrete weight.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Select the method</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Hand demolition, jackhammer, skid steer, mini excavator, and
                saw-cut methods affect production rate.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Plan crew and haul-off</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Convert demo hours into crew days, concrete tons, dump runs, and
                estimated roll-off load requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to plan removal cost, replacement concrete, forms,
            delivery, waste, reinforcement, and slab quantities.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-removal-cost-calculator" label="Concrete Removal Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-formwork-calculator" label="Concrete Formwork Calculator" />
            <RelatedLink href="/construction/concrete-weight-calculator" label="Concrete Weight Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-waste-calculator" label="Concrete Waste Calculator" />
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
