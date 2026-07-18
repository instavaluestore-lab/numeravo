import type { Metadata } from "next";
import Link from "next/link";
import TwelveByTwelveConcreteSlabCostClient from "./TwelveByTwelveConcreteSlabCostClient";

export const metadata: Metadata = {
  title: "12x12 Concrete Slab Cost Calculator | 144 Sq Ft Slab Estimate",
  description:
    "Free 12x12 concrete slab cost calculator. Estimate concrete yards, ready-mix cost, base material, reinforcement, forms, labor, delivery fees, and total cost for a 144 square foot slab.",
  alternates: {
    canonical: "https://numeravo.com/construction/12x12-concrete-slab-cost",
  },
  openGraph: {
    title: "12x12 Concrete Slab Cost Calculator",
    description:
      "Estimate the cost of a 12x12 concrete slab, including concrete yards, ready-mix cost, base material, reinforcement, forms, labor, and delivery fees.",
    url: "https://numeravo.com/construction/12x12-concrete-slab-cost",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "12x12 Concrete Slab Cost Calculator",
    description:
      "Calculate concrete yards, material cost, delivery fees, labor, reinforcement, and total cost for a 12x12 slab.",
  },
};

export default function TwelveByTwelveConcreteSlabCostPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "12x12 Concrete Slab Cost Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/12x12-concrete-slab-cost",
    description:
      "Estimate concrete yards, ready-mix cost, base material, reinforcement, forms, labor, delivery fees, and total cost for a 12x12 concrete slab.",
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
        name: "How much concrete do I need for a 12x12 slab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 12x12 slab is 144 square feet. At 4 inches thick, it needs about 1.78 cubic yards before waste. With a 10 percent waste allowance, it is about 1.96 cubic yards.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a 12x12 concrete slab cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cost of a 12x12 concrete slab depends on slab thickness, concrete price per yard, delivery fees, short-load fees, base material, reinforcement, forms, labor, tax, and site preparation.",
        },
      },
      {
        "@type": "Question",
        name: "Is a 12x12 concrete slab a small concrete order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 12x12 slab is still a relatively small concrete order. Depending on supplier minimums, it may trigger delivery minimums or short-load fees.",
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
              Construction Cost Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              12x12 Concrete Slab Cost Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate the cost of a 12x12 concrete slab, including concrete yards,
              ready-mix cost, delivery fees, short-load charges, base material,
              reinforcement, forms, labor, tax, and total installed cost.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Slab size</p>
                <p className="mt-1 font-semibold text-white">144 sq ft</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Common thickness</p>
                <p className="mt-1 font-semibold text-white">4 in</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Typical use</p>
                <p className="mt-1 font-semibold text-white">Shed / patio</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">12x12 slab quick math</h2>
            <div className="mt-5 grid gap-3">
              <QuickRow label="Area" value="144 sq ft" />
              <QuickRow label="4 inch slab" value="~1.78 yd³" />
              <QuickRow label="With 10% waste" value="~1.96 yd³" />
              <QuickRow label="Small-order risk" value="Possible short-load" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Final cost depends on local ready-mix pricing, delivery minimums,
              access, forms, base prep, reinforcement, finish, and labor.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <TwelveByTwelveConcreteSlabCostClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Popular small slab size"
            text="A 12x12 slab is common for sheds, patios, equipment pads, utility pads, and backyard flatwork."
          />
          <InfoCard
            title="Cost breakdown"
            text="Estimate concrete, delivery, short-load fees, base material, reinforcement, forms, labor, tax, and total installed cost."
          />
          <InfoCard
            title="Compare thickness"
            text="Quickly compare 4 inch, 5 inch, and 6 inch slab options for heavier uses or stronger pad requirements."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">12x12 concrete slab cost FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How many yards of concrete are in a 12x12 slab?"
              answer="A 12x12 slab at 4 inches thick is about 1.78 cubic yards before waste. With 10 percent waste, it is about 1.96 cubic yards."
            />
            <Faq
              question="Why can a 12x12 slab cost more per square foot?"
              answer="Small slabs often have higher cost per square foot because delivery fees, forms, labor setup, and finishing time are spread across only 144 square feet."
            />
            <Faq
              question="Is 4 inches thick enough for a 12x12 slab?"
              answer="Four inches is common for light-use patios, shed pads, and utility slabs, but hot tubs, vehicles, heavy equipment, and poor soil may require more thickness and reinforcement."
            />
            <Faq
              question="Should I include a short-load fee?"
              answer="Yes, if your supplier charges a minimum delivery fee or short-load charge for small ready-mix orders. A 12x12 slab may fall below some supplier minimums."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/10x10-concrete-slab-cost" label="10x10 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-slab-thickness" label="Concrete Slab Thickness Calculator" />
            <RelatedLink href="/construction/concrete-cure-time" label="Concrete Cure Time Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function QuickRow({ label, value }: { label: string; value: string }) {
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
