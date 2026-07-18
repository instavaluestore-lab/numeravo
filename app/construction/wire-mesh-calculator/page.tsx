import type { Metadata } from "next";
import Link from "next/link";
import WireMeshCalculatorClient from "./WireMeshCalculatorClient";

export const metadata: Metadata = {
  title: "Wire Mesh Calculator | Concrete Slab Mesh Rolls & Sheets",
  description:
    "Free wire mesh calculator for concrete slabs. Estimate welded wire mesh sheets or rolls, slab area, overlap, waste, total mesh, material cost, and cost per square foot.",
  alternates: {
    canonical: "https://numeravo.com/construction/wire-mesh-calculator",
  },
  openGraph: {
    title: "Wire Mesh Calculator",
    description:
      "Calculate concrete slab wire mesh sheets, rolls, overlap, waste, coverage, material cost, and cost per square foot.",
    url: "https://numeravo.com/construction/wire-mesh-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wire Mesh Calculator",
    description:
      "Estimate welded wire mesh sheets or rolls for concrete slabs, driveways, patios, sidewalks, and pads.",
  },
};

export default function WireMeshCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Wire Mesh Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/wire-mesh-calculator",
    description:
      "Estimate welded wire mesh sheets or rolls, slab area, overlap, waste allowance, total mesh quantity, and material cost.",
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
        name: "How do you calculate wire mesh for a concrete slab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calculate the slab area, divide by the coverage area of each wire mesh sheet or roll, then add overlap and waste allowance.",
        },
      },
      {
        "@type": "Question",
        name: "How much should wire mesh overlap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wire mesh overlap varies by project specification, but many small slab estimates use several inches of overlap between sheets or roll runs. Follow project plans and local requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Is wire mesh the same as rebar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Welded wire mesh and rebar are different reinforcement products. Mesh is often used for light slabs, while rebar may be used where heavier reinforcement is required.",
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
              Wire Mesh Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate welded wire mesh sheets or rolls for concrete slabs,
              driveways, patios, sidewalks, shed pads, garage floors, and small
              flatwork projects. Calculate slab area, overlap, waste, total mesh,
              material cost, and cost per square foot.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Slab mesh</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Sheets + rolls</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Waste + cost</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Mesh planning note</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Wire mesh helps control cracking in many light concrete slabs, but
              reinforcement requirements depend on slab use, thickness, subbase,
              loads, jointing, local code, and project specifications.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common formats</p>
              <p className="mt-2 text-2xl font-bold text-white">Sheets or rolls</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Always confirm product dimensions and lap requirements before ordering.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <WireMeshCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For slab reinforcement"
            text="Estimate wire mesh coverage for slabs, patios, sidewalks, garage floors, and small concrete pads."
          />
          <InfoCard
            title="For material ordering"
            text="Calculate sheets or rolls needed after overlap and waste so the order is less likely to run short."
          />
          <InfoCard
            title="For cost estimates"
            text="Estimate total mesh cost and cost per square foot for better concrete project budgeting."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Wire mesh calculator FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How much wire mesh do I need?"
              answer="Divide the slab area by the coverage of each sheet or roll, then add overlap and waste allowance. This calculator handles those steps."
            />
            <Faq
              question="Should wire mesh overlap?"
              answer="Usually yes. Overlap depends on mesh type and project specification. Use the overlap setting to account for extra material."
            />
            <Faq
              question="Is wire mesh better than rebar?"
              answer="Neither is automatically better. Wire mesh and rebar serve different reinforcement needs. The right choice depends on slab loads, thickness, use, soil, and design requirements."
            />
            <Faq
              question="Does this replace project specifications?"
              answer="No. Use this for estimating material quantities. Follow plans, supplier information, local code, and engineering requirements where applicable."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing for Concrete Slab" />
            <RelatedLink href="/construction/rebar-weight-calculator" label="Rebar Weight Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
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
