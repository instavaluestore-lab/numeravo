import type { Metadata } from "next";
import Link from "next/link";
import ConcreteStairsCalculatorClient from "./ConcreteStairsCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Stairs Calculator | Steps, Yards, Forms & Cost",
  description:
    "Free concrete stairs calculator. Estimate concrete stair cubic yards, number of steps, riser height, tread depth, forms, waste, delivery, labor, and total cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-stairs-calculator",
  },
  openGraph: {
    title: "Concrete Stairs Calculator",
    description:
      "Estimate concrete stairs, steps, cubic yards, formwork, reinforcement allowance, delivery, labor, waste, and total project cost.",
    url: "https://numeravo.com/construction/concrete-stairs-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Stairs Calculator",
    description:
      "Calculate concrete stair cubic yards, step count, risers, treads, forms, labor, delivery, waste, and total cost.",
  },
};

export default function ConcreteStairsCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Stairs Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-stairs-calculator",
    description:
      "Estimate concrete stairs, step count, cubic yards, risers, treads, forms, waste, delivery, labor, reinforcement allowance, and total cost.",
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
        name: "How do you estimate concrete stairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Estimate concrete stairs by calculating the volume of the step profile, multiplying by the stair width, converting cubic feet to cubic yards, and adding waste.",
        },
      },
      {
        "@type": "Question",
        name: "What is a comfortable riser height for concrete steps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many steps use riser heights around 6 to 7.5 inches, but final stair dimensions must follow local building code and project requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Does this calculator replace stair code requirements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This calculator is for estimating concrete quantity and project cost. Stair rise, run, landing, handrail, and code requirements must be verified locally.",
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
              Concrete Stairs Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete stair volume, step count, riser height, tread depth,
              formwork, reinforcement allowance, delivery, labor, waste, and total
              cost for small concrete steps and stair projects.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Steps</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Yards + cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Forms + labor</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Stair estimating note</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Concrete stairs need careful planning. This calculator estimates
              material and cost, but final stair dimensions, landings, handrails,
              drainage, reinforcement, and safety details must follow local code.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common riser range</p>
              <p className="mt-2 text-2xl font-bold text-white">6–7.5 inches</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Verify stair geometry with local code before building.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteStairsCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Estimate small concrete steps for entries, porches, patios, walkways, side doors, backyard paths, and utility access."
          />
          <InfoCard
            title="For contractors"
            text="Quickly check stair volume, step geometry, formwork allowance, labor, delivery, reinforcement allowance, and total project assumptions."
          />
          <InfoCard
            title="For property managers"
            text="Plan concrete step repair or replacement for rental properties, apartment entries, commercial access points, and maintenance upgrades."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete stairs calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How do I calculate concrete for stairs?"
              answer="This calculator estimates stair volume using the step profile, stair width, and number of steps, then converts cubic feet to cubic yards and adds waste."
            />
            <Faq
              question="What riser height should I use?"
              answer="Many stairs use risers around 6 to 7.5 inches, but final rise and run must meet local code and project requirements."
            />
            <Faq
              question="Does this include forms?"
              answer="Yes. The calculator includes a formwork allowance so you can estimate additional material or labor for forming concrete stairs."
            />
            <Faq
              question="Does this replace engineering or code review?"
              answer="No. This is a planning calculator. Stair dimensions, handrails, landings, reinforcement, frost depth, drainage, and code compliance must be verified separately."
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
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
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
