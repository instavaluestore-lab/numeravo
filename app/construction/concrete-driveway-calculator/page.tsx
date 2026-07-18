import type { Metadata } from "next";
import Link from "next/link";
import ConcreteDrivewayCalculatorClient from "./ConcreteDrivewayCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Driveway Calculator | Cost, Yards, Rebar & Base",
  description:
    "Free concrete driveway calculator. Estimate concrete cubic yards, slab thickness, gravel base, rebar, waste, delivery, labor, and total driveway cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-driveway-calculator",
  },
  openGraph: {
    title: "Concrete Driveway Calculator",
    description:
      "Estimate concrete driveway yards, cost, base material, rebar, labor, waste, and delivery.",
    url: "https://numeravo.com/construction/concrete-driveway-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Driveway Calculator",
    description:
      "Calculate concrete driveway cubic yards, base, rebar, labor, delivery, and total cost.",
  },
};

export default function ConcreteDrivewayCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Driveway Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-driveway-calculator",
    description:
      "Estimate concrete driveway cubic yards, base material, rebar, labor, delivery, waste, and total project cost.",
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
        name: "How thick should a concrete driveway be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many residential concrete driveways are 4 inches thick for passenger vehicles, while heavier use may require 5 to 6 inches or engineered design.",
        },
      },
      {
        "@type": "Question",
        name: "How much concrete do I need for a driveway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply driveway length by width by slab thickness in feet to get cubic feet, then divide by 27 to convert to cubic yards. Add waste so you do not run short.",
        },
      },
      {
        "@type": "Question",
        name: "Do concrete driveways need rebar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some driveways use rebar, wire mesh, or fiber reinforcement depending on loads, soil, climate, local code, and engineering requirements.",
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
              Concrete Driveway Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete cubic yards, slab thickness, gravel base, rebar,
              waste, delivery, labor, and total cost for a concrete driveway project.
              Useful for homeowners, contractors, property managers, and estimators.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Driveways</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Outputs</p>
                <p className="mt-1 font-semibold text-white">Yards + cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Base + rebar</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Driveway planning rule</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Most residential driveways need more than concrete volume alone. Base
              material, reinforcement, formwork, labor, delivery fees, and waste can
              materially change the final project cost.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common residential thickness</p>
              <p className="mt-2 text-2xl font-bold text-white">4 in. to 6 in.</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Use project plans, local requirements, and contractor guidance for final specs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteDrivewayCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Use the estimate to understand rough concrete volume, driveway cost, base needs, and whether the project may be large enough for ready-mix delivery."
          />
          <InfoCard
            title="For contractors"
            text="Use the breakdown to quickly check yards, base tons, rebar allowance, delivery, labor, and cost assumptions before preparing a formal quote."
          />
          <InfoCard
            title="For property managers"
            text="Use the calculator to compare driveway repair or replacement scopes across multiple properties before calling contractors."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete driveway calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How thick should a concrete driveway be?"
              answer="Many residential driveways are 4 inches thick for normal passenger vehicles. Heavier vehicles, weak soil, poor drainage, or commercial use may require 5 to 6 inches or engineered specifications."
            />
            <Faq
              question="How do I calculate concrete for a driveway?"
              answer="Multiply length by width by thickness in feet to get cubic feet. Divide by 27 to convert to cubic yards. Add waste or overage so the pour is not short."
            />
            <Faq
              question="Should I include gravel base?"
              answer="Yes, most driveway projects need a compacted base layer. Base depth depends on soil, drainage, climate, and project requirements."
            />
            <Faq
              question="Does this replace a contractor estimate?"
              answer="No. This calculator is for planning and material estimating. Final driveway pricing depends on excavation, grading, forms, access, reinforcement, finishing, labor, and local conditions."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/gravel-calculator" label="Gravel Calculator" />
            <RelatedLink href="/construction/road-base-calculator" label="Road Base Calculator" />
            <RelatedLink href="/construction/base-for-concrete-slab-depth" label="Base for Concrete Slab Depth" />
            <RelatedLink href="/construction/how-to-prepare-ground-for-concrete-slab" label="How to Prepare Ground for Concrete Slab" />
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
