import type { Metadata } from "next";
import Link from "next/link";
import ConcreteSlabThicknessClient from "./ConcreteSlabThicknessClient";

export const metadata: Metadata = {
  title: "Concrete Slab Thickness Calculator | Slab Depth Guide",
  description:
    "Free concrete slab thickness calculator and guide. Estimate recommended slab thickness, concrete yards, base depth, reinforcement notes, and cost for patios, driveways, sidewalks, pads, and garage slabs.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-slab-thickness",
  },
  openGraph: {
    title: "Concrete Slab Thickness Calculator",
    description:
      "Estimate slab thickness, concrete yards, base depth, reinforcement notes, and cost for common concrete slab projects.",
    url: "https://numeravo.com/construction/concrete-slab-thickness",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Slab Thickness Calculator",
    description:
      "Calculate slab thickness guidance, concrete yards, base material depth, reinforcement notes, and project cost.",
  },
};

export default function ConcreteSlabThicknessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Slab Thickness Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-slab-thickness",
    description:
      "Estimate concrete slab thickness guidance, concrete volume, base depth, reinforcement notes, and cost for common slab projects.",
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
        name: "How thick should a concrete slab be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many patios, sidewalks, and light-use slabs are around 4 inches thick. Driveways, garage slabs, equipment pads, and heavier-use slabs may need 5 to 6 inches or more depending on loads, soil, reinforcement, and local requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Is a 4 inch concrete slab enough?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 4 inch slab is common for many light residential flatwork projects, but it may not be enough for heavy vehicles, poor soil, structural use, or engineered work.",
        },
      },
      {
        "@type": "Question",
        name: "Does slab thickness affect concrete yards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Increasing thickness directly increases concrete volume, weight, cost, and often the need for stronger base preparation or reinforcement.",
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
              Concrete Slab Thickness Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate recommended slab thickness, concrete yards, base depth,
              reinforcement notes, weight, and project cost for patios, sidewalks,
              driveways, shed pads, garage slabs, hot tub pads, and equipment pads.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Slab planning</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Depth + yards</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Base + cost</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common slab thickness</h2>
            <div className="mt-5 grid gap-3">
              <ThicknessRow label="Sidewalk / patio" value="4 in" />
              <ThicknessRow label="Residential driveway" value="5–6 in" />
              <ThicknessRow label="Garage slab" value="4–6 in" />
              <ThicknessRow label="Hot tub / equipment pad" value="5–6+ in" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Use local code, project plans, soil conditions, loads, and engineering
              requirements for final slab design.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteSlabThicknessClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Estimate whether a 4 inch, 5 inch, or 6 inch slab is more realistic for common residential concrete projects."
          />
          <InfoCard
            title="For contractors"
            text="Quickly compare slab thickness options and how they affect cubic yards, weight, base depth, reinforcement, and cost."
          />
          <InfoCard
            title="For better budgeting"
            text="Thicker slabs increase concrete volume and cost. Use the calculator to compare options before ordering material."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Concrete slab thickness FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How thick should a patio slab be?"
              answer="A 4 inch slab is common for many residential patios, assuming proper base preparation and light use."
            />
            <Faq
              question="How thick should a driveway slab be?"
              answer="Many residential driveways use 5 to 6 inches of concrete, especially where vehicles, poor soil, or heavier use are expected."
            />
            <Faq
              question="Does a thicker slab always prevent cracking?"
              answer="No. Thickness helps, but cracking also depends on base preparation, control joints, reinforcement, water content, curing, loads, and soil movement."
            />
            <Faq
              question="Does this replace engineering?"
              answer="No. This calculator provides estimating guidance only. Structural slabs, heavy loads, poor soil, and code-regulated projects may require engineering."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-control-joint-spacing" label="Concrete Control Joint Spacing Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-mix-ratio" label="Concrete Mix Ratio Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing for Concrete Slab" />
          </div>
        </section>
      </section>
    </main>
  );
}

function ThicknessRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
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
