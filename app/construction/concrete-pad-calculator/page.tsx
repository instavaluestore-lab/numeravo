import type { Metadata } from "next";
import Link from "next/link";
import ConcretePadCalculatorClient from "./ConcretePadCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Pad Calculator | Yards, Cost, Base & Rebar",
  description:
    "Free concrete pad calculator. Estimate concrete cubic yards, pad thickness, gravel base, rebar, forms, waste, delivery, labor, and total pad cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-pad-calculator",
  },
  openGraph: {
    title: "Concrete Pad Calculator",
    description:
      "Estimate concrete pad yards, slab thickness, gravel base, reinforcement, forms, labor, waste, delivery, and total cost.",
    url: "https://numeravo.com/construction/concrete-pad-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Pad Calculator",
    description:
      "Calculate concrete pad cubic yards, base, forms, reinforcement, delivery, labor, waste, and total cost.",
  },
};

export default function ConcretePadCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Pad Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-pad-calculator",
    description:
      "Estimate concrete pad cubic yards, thickness, gravel base, forms, reinforcement, waste, delivery, labor, and total project cost.",
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
        name: "How thick should a concrete pad be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many small concrete pads are 4 inches thick, but hot tubs, generators, equipment pads, heavy storage, or poor soil may require thicker concrete or engineered design.",
        },
      },
      {
        "@type": "Question",
        name: "How much concrete do I need for a pad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply pad length by width by thickness in feet to get cubic feet, then divide by 27 to convert to cubic yards. Add waste or overage.",
        },
      },
      {
        "@type": "Question",
        name: "What can this concrete pad calculator be used for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This calculator can estimate small concrete pads for sheds, AC units, generators, hot tubs, trash bins, equipment, utility areas, and small slab projects.",
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
              Concrete Pad Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete yards, pad thickness, gravel base, reinforcement,
              forms, waste, delivery, labor, finishing, and total cost for small
              concrete pads, shed pads, AC pads, generator pads, and equipment pads.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Small pads</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Yards + cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Base + forms</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Pad estimating note</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Small pads are simple to measure, but final cost can change fast when
              you include base prep, reinforcement, forms, delivery fees, access,
              finishing, and whether the pad supports equipment or heavy loads.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common small pad thickness</p>
              <p className="mt-2 text-2xl font-bold text-white">4 inches</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Hot tubs, generators, and heavy equipment may need more.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConcretePadCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Estimate small concrete pads for sheds, AC units, generators, grills, trash bins, utility areas, and backyard upgrades."
          />
          <InfoCard
            title="For contractors"
            text="Quickly estimate pad yards, form length, base material, reinforcement, labor, delivery, finishing, and total pricing assumptions."
          />
          <InfoCard
            title="For property managers"
            text="Use the calculator to plan concrete pads for equipment, utilities, storage, maintenance areas, and property upgrades."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete pad calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How thick should a concrete pad be?"
              answer="Many small residential pads are 4 inches thick. Heavy equipment, hot tubs, generators, vehicle loads, poor soil, or local requirements may need thicker concrete."
            />
            <Faq
              question="How do I calculate concrete for a pad?"
              answer="Multiply length by width by thickness in feet to get cubic feet. Divide by 27 to convert to cubic yards, then add waste or overage."
            />
            <Faq
              question="Does a concrete pad need gravel base?"
              answer="A compacted gravel base is commonly used to improve support and drainage. Base depth depends on soil, climate, drainage, and load requirements."
            />
            <Faq
              question="Can I use bags instead of ready-mix?"
              answer="Small pads may be possible with bagged concrete, but larger pads usually become easier with ready-mix delivery. Use the Concrete Bag Calculator to compare bag count."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/10x10-concrete-slab-cost" label="10x10 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing for Concrete Slab" />
            <RelatedLink href="/construction/concrete-cure-time" label="Concrete Cure Time Calculator" />
            <RelatedLink href="/construction/concrete-slab-thickness" label="Concrete Slab Thickness Calculator" />
            <RelatedLink href="/construction/concrete-mix-ratio" label="Concrete Mix Ratio Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-stairs-calculator" label="Concrete Stairs Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/gravel-calculator" label="Gravel Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function Faq({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
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
