import type { Metadata } from "next";
import Link from "next/link";
import ConcretePatioCalculatorClient from "./ConcretePatioCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Patio Calculator | Cost, Yards, Base & Rebar",
  description:
    "Free concrete patio calculator. Estimate concrete cubic yards, slab thickness, gravel base, rebar, waste, delivery, labor, finishing, and total patio cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-patio-calculator",
  },
  openGraph: {
    title: "Concrete Patio Calculator",
    description:
      "Estimate concrete patio cubic yards, cost, base material, reinforcement, labor, waste, and delivery.",
    url: "https://numeravo.com/construction/concrete-patio-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Patio Calculator",
    description:
      "Calculate concrete patio yards, slab thickness, base, reinforcement, labor, delivery, and total cost.",
  },
};

export default function ConcretePatioCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Patio Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-patio-calculator",
    description:
      "Estimate concrete patio cubic yards, slab thickness, base material, reinforcement, labor, delivery, waste, and total project cost.",
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
        name: "How thick should a concrete patio be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many residential concrete patios are 4 inches thick, but thicker slabs may be needed for heavier loads, poor soil, or local requirements.",
        },
      },
      {
        "@type": "Question",
        name: "How much concrete do I need for a patio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply patio length by width by thickness in feet to get cubic feet, then divide by 27 to convert to cubic yards. Add waste or overage.",
        },
      },
      {
        "@type": "Question",
        name: "Do concrete patios need gravel base?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most patio slabs benefit from a compacted gravel base to improve support, drainage, and long-term performance.",
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
              Concrete Patio Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete yards, patio slab thickness, gravel base, reinforcement,
              labor, finishing, delivery, waste, and total project cost. Built for
              homeowners, contractors, property managers, and outdoor living projects.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Patios</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Yards + cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Base + finish</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Patio estimating note</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Patio cost is not only concrete volume. Base prep, forms, reinforcement,
              finish type, labor, delivery, access, and demolition can all change the
              final installed price.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common patio thickness</p>
              <p className="mt-2 text-2xl font-bold text-white">4 inches</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Heavier loads, weak soil, or special designs may require more.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConcretePatioCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Use the estimate to plan patio material quantities, understand cost drivers, and compare contractor quotes more confidently."
          />
          <InfoCard
            title="For contractors"
            text="Quickly estimate patio yards, base material, reinforcement allowance, finish cost, delivery, and total project pricing assumptions."
          />
          <InfoCard
            title="For property managers"
            text="Use the calculator to compare patio repair, replacement, or outdoor living upgrades across rental and managed properties."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete patio calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How thick should a concrete patio be?"
              answer="Many residential patios are 4 inches thick. Thicker slabs may be needed for hot tubs, outdoor kitchens, heavy furniture, poor soil, or local requirements."
            />
            <Faq
              question="How do I calculate concrete for a patio?"
              answer="Multiply length by width by slab thickness in feet to get cubic feet. Divide by 27 to convert cubic feet to cubic yards, then add waste."
            />
            <Faq
              question="Should a patio have gravel base?"
              answer="A compacted gravel base usually improves drainage and support. Base depth depends on soil, drainage, climate, and the patio design."
            />
            <Faq
              question="Does this calculator include stamped concrete?"
              answer="The calculator includes a finish cost input, so you can enter a higher finish cost per square foot for stamped, stained, broom-finished, or decorative concrete."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing for Concrete Slab" />
            <RelatedLink href="/construction/concrete-slab-thickness" label="Concrete Slab Thickness Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/gravel-calculator" label="Gravel Calculator" />
            <RelatedLink href="/construction/paver-base-calculator" label="Paver Base Calculator" />
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
