import type { Metadata } from "next";
import Link from "next/link";
import ConcreteCostPerYardClient from "./ConcreteCostPerYardClient";

export const metadata: Metadata = {
  title: "Concrete Cost Per Yard Calculator | Ready-Mix Price Estimator",
  description:
    "Free concrete cost per yard calculator. Estimate ready-mix concrete price, delivery fees, short-load charges, fuel fees, waste, tax, total cost, and cost per square foot.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-cost-per-yard",
  },
  openGraph: {
    title: "Concrete Cost Per Yard Calculator",
    description:
      "Estimate ready-mix concrete cost per cubic yard, delivery fees, short-load fees, waste, tax, and total project cost.",
    url: "https://numeravo.com/construction/concrete-cost-per-yard",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Cost Per Yard Calculator",
    description:
      "Calculate concrete cost per yard, delivery charges, short-load fees, waste, tax, and total ready-mix cost.",
  },
};

export default function ConcreteCostPerYardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Cost Per Yard Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-cost-per-yard",
    description:
      "Estimate ready-mix concrete cost per cubic yard, delivery fees, short-load fees, waste allowance, tax, and total project cost.",
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
        name: "How much does concrete cost per yard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Concrete cost per cubic yard varies by region, mix design, supplier, order size, delivery distance, fuel fees, short-load fees, and taxes. This calculator lets you enter your local price per yard and estimate the full delivered cost.",
        },
      },
      {
        "@type": "Question",
        name: "What is a short-load fee for concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A short-load fee is an extra charge that may apply when a concrete order is below the supplier's minimum delivery amount. It helps cover truck and delivery costs for small orders.",
        },
      },
      {
        "@type": "Question",
        name: "Does concrete cost per yard include delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sometimes it does, but many suppliers list concrete price separately from delivery, fuel, environmental, short-load, waiting time, and tax charges. Always confirm what is included in the quoted price.",
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
              Concrete Cost Per Yard Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate ready-mix concrete cost per cubic yard, delivery charges,
              short-load fees, fuel fees, waste allowance, tax, and total project
              cost for slabs, patios, driveways, sidewalks, footings, and pads.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Ready-mix pricing</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Delivered cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Fees + tax</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common cost drivers</h2>
            <div className="mt-5 grid gap-3">
              <CostRow label="Concrete price" value="$/yd³" />
              <CostRow label="Delivery fee" value="Trip charge" />
              <CostRow label="Short-load fee" value="Small orders" />
              <CostRow label="Waste allowance" value="Extra yards" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Supplier quotes vary by location, PSI, additives, truck access, distance,
              order size, and local fees.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteCostPerYardClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Estimate the real delivered cost before calling suppliers or approving a driveway, patio, sidewalk, or slab quote."
          />
          <InfoCard
            title="For contractors"
            text="Quickly check concrete material cost, delivered price per yard, cost per square foot, and short-load impact."
          />
          <InfoCard
            title="For better ordering"
            text="Compare base concrete cost against delivery fees, waste allowance, tax, and extra supplier charges."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Concrete cost per yard FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="What affects concrete cost per cubic yard?"
              answer="Concrete cost depends on local supplier pricing, PSI, mix design, additives, order size, delivery distance, short-load fees, fuel fees, taxes, and waiting time."
            />
            <Faq
              question="How do I estimate delivered concrete cost?"
              answer="Multiply cubic yards by price per yard, then add delivery fees, short-load fees, fuel or environmental fees, waiting time, waste allowance, and tax if applicable."
            />
            <Faq
              question="Should I include waste when ordering concrete?"
              answer="Yes. Many projects include a waste allowance because forms, excavation, grade variation, and ordering short can create costly problems."
            />
            <Faq
              question="Is bagged concrete cheaper than ready-mix?"
              answer="Bagged concrete may work for small jobs, but ready-mix is usually more practical for larger slabs, driveways, footings, patios, and pads."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-weight-calculator" label="Concrete Weight Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-mix-ratio" label="Concrete Mix Ratio Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function CostRow({ label, value }: { label: string; value: string }) {
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
