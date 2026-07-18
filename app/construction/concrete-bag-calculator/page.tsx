import type { Metadata } from "next";
import Link from "next/link";
import ConcreteBagCalculatorClient from "./ConcreteBagCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Bag Calculator | Bags Needed for Slabs, Posts & Footings",
  description:
    "Free concrete bag calculator. Estimate how many 40 lb, 50 lb, 60 lb, or 80 lb bags of concrete you need for slabs, post holes, footings, patios, pads, and small concrete projects.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-bag-calculator",
  },
  openGraph: {
    title: "Concrete Bag Calculator",
    description:
      "Calculate concrete bags needed by project dimensions, bag size, waste, and concrete yield.",
    url: "https://numeravo.com/construction/concrete-bag-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Bag Calculator",
    description:
      "Estimate how many bags of concrete you need for slabs, post holes, pads, patios, and footings.",
  },
};

export default function ConcreteBagCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Bag Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-bag-calculator",
    description:
      "Estimate concrete bags needed for slabs, pads, patios, post holes, footings, and small concrete projects.",
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
        name: "How many 80 lb bags of concrete are in a cubic yard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An 80 lb bag of concrete usually yields about 0.6 cubic feet. Since one cubic yard is 27 cubic feet, it takes about 45 80 lb bags to make one cubic yard of concrete.",
        },
      },
      {
        "@type": "Question",
        name: "How many 60 lb bags of concrete are in a cubic yard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 60 lb bag of concrete usually yields about 0.45 cubic feet. Since one cubic yard is 27 cubic feet, it takes about 60 60 lb bags to make one cubic yard of concrete.",
        },
      },
      {
        "@type": "Question",
        name: "Should I add waste when buying bagged concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Adding 5% to 10% waste is common for small concrete projects because excavation, uneven ground, spillage, and measurement errors can increase the amount needed.",
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
              Concrete Bag Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate how many bags of concrete you need for slabs, patios, post holes,
              pads, footings, walkways, fence posts, deck posts, and small concrete jobs.
              Choose common 40 lb, 50 lb, 60 lb, and 80 lb bag sizes or enter a custom yield.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Small concrete jobs</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Outputs</p>
                <p className="mt-1 font-semibold text-white">Bags, yards, cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Audience</p>
                <p className="mt-1 font-semibold text-white">DIY + contractors</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Quick estimate</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Bagged concrete is usually best for smaller pours. For larger jobs, compare
              the total bag count and labor against ready-mix delivery.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common rule of thumb</p>
              <p className="mt-2 text-2xl font-bold text-white">
                45 bags of 80 lb concrete ≈ 1 cubic yard
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteBagCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-xl font-semibold text-white">Concrete bag yields</h2>
            <div className="mt-4 space-y-3 text-sm text-[#A0AEC0]">
              <p>40 lb bag: about 0.30 cubic feet</p>
              <p>50 lb bag: about 0.375 cubic feet</p>
              <p>60 lb bag: about 0.45 cubic feet</p>
              <p>80 lb bag: about 0.60 cubic feet</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-xl font-semibold text-white">Formula used</h2>
            <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">
              Volume is calculated as length × width × depth. The calculator converts
              depth from inches to feet, converts cubic feet to cubic yards, adds waste,
              then divides by the selected bag yield.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-xl font-semibold text-white">When to use ready-mix</h2>
            <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">
              If the estimate requires hundreds of bags, ready-mix concrete may be more
              practical. Use this calculator to compare bag count, material cost, and
              labor before buying.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete bag calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-white">
                How many bags of concrete do I need?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Measure the project length, width, and depth. Convert depth to feet,
                multiply length × width × depth, then divide by the concrete bag yield.
                Add waste so you do not run short during the pour.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                How many 80 lb bags make a cubic yard?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                About 45 bags. An 80 lb bag usually yields about 0.6 cubic feet, and
                one cubic yard contains 27 cubic feet.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Is bagged concrete good for slabs?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Yes, for small slabs, pads, post holes, and repairs. For larger slabs,
                bagged concrete can become expensive and labor-heavy compared with
                ready-mix delivery.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                How much waste should I add?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                A 5% to 10% waste factor is common. Use more if the base is uneven,
                the formwork is irregular, or the excavation depth varies.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/10x10-concrete-slab-cost" label="10x10 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-mix-ratio" label="Concrete Mix Ratio Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-stairs-calculator" label="Concrete Stairs Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
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
