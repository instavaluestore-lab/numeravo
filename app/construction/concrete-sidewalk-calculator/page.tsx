import type { Metadata } from "next";
import Link from "next/link";
import ConcreteSidewalkCalculatorClient from "./ConcreteSidewalkCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Sidewalk Calculator | Yards, Cost, Base & Forms",
  description:
    "Free concrete sidewalk calculator. Estimate concrete cubic yards, sidewalk thickness, gravel base, forms, waste, delivery, labor, and total sidewalk cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-sidewalk-calculator",
  },
  openGraph: {
    title: "Concrete Sidewalk Calculator",
    description:
      "Estimate concrete sidewalk yards, slab thickness, base material, forms, labor, waste, delivery, and total cost.",
    url: "https://numeravo.com/construction/concrete-sidewalk-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Sidewalk Calculator",
    description:
      "Calculate concrete sidewalk cubic yards, base, forms, labor, delivery, waste, and total cost.",
  },
};

export default function ConcreteSidewalkCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Sidewalk Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-sidewalk-calculator",
    description:
      "Estimate concrete sidewalk cubic yards, thickness, gravel base, forms, waste, delivery, labor, and total project cost.",
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
        name: "How thick should a concrete sidewalk be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many residential concrete sidewalks are 4 inches thick for foot traffic. Heavier loads, driveway crossings, or local requirements may need thicker concrete.",
        },
      },
      {
        "@type": "Question",
        name: "How much concrete do I need for a sidewalk?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply sidewalk length by width by thickness in feet to get cubic feet, then divide by 27 to convert to cubic yards. Add waste or overage.",
        },
      },
      {
        "@type": "Question",
        name: "Do sidewalks need gravel base?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A compacted gravel base can improve drainage and support. Base depth depends on soil, climate, drainage, and local requirements.",
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
              Concrete Sidewalk Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete yards, sidewalk thickness, gravel base, forms,
              waste, delivery, labor, finishing, and total sidewalk cost. Built for
              homeowners, contractors, property managers, and concrete flatwork planning.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Walkways</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Yards + cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Forms + base</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Sidewalk estimating note</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Sidewalk cost depends on more than concrete volume. Length, width,
              thickness, base depth, form boards, excavation, finishing, and access
              can all change the final installed price.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common sidewalk thickness</p>
              <p className="mt-2 text-2xl font-bold text-white">4 inches</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Driveway crossings or heavier loads may need thicker concrete.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteSidewalkCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Use the estimate to plan a new sidewalk, walkway, garden path, or replacement section before getting contractor quotes."
          />
          <InfoCard
            title="For contractors"
            text="Quickly estimate sidewalk yards, form length, base material, labor, delivery, finishing, and total project cost."
          />
          <InfoCard
            title="For property managers"
            text="Use the calculator to compare sidewalk repair or replacement scopes across rentals, commercial properties, and managed sites."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete sidewalk calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How thick should a concrete sidewalk be?"
              answer="Many residential sidewalks are 4 inches thick for foot traffic. Sidewalks that cross driveways or support heavier loads may need thicker concrete."
            />
            <Faq
              question="How do I calculate concrete for a sidewalk?"
              answer="Multiply length by width by thickness in feet to get cubic feet. Divide by 27 to convert to cubic yards, then add waste."
            />
            <Faq
              question="How much form board do I need for a sidewalk?"
              answer="For a straight sidewalk, estimate form board length as both sides of the sidewalk, or length multiplied by two. Add extra for cuts, stakes, curves, and waste."
            />
            <Faq
              question="Does this include demolition?"
              answer="No. This calculator focuses on new sidewalk material and installation assumptions. Add demolition, haul-off, permits, or special access separately."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/gravel-calculator" label="Gravel Calculator" />
            <RelatedLink href="/construction/area-calculator" label="Area Calculator" />
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
