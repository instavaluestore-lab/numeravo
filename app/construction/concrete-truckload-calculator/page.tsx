import type { Metadata } from "next";
import Link from "next/link";
import ConcreteTruckloadCalculatorClient from "./ConcreteTruckloadCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Truckload Calculator | Ready-Mix Loads, Yards & Cost",
  description:
    "Free concrete truckload calculator. Estimate ready-mix truckloads, cubic yards, order rounding, short-load fees, delivery cost, concrete weight, and total concrete delivery cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-truckload-calculator",
  },
  openGraph: {
    title: "Concrete Truckload Calculator",
    description:
      "Estimate ready-mix concrete truckloads, cubic yards, order quantity, delivery fees, short-load fees, and total cost.",
    url: "https://numeravo.com/construction/concrete-truckload-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Truckload Calculator",
    description:
      "Calculate concrete truckloads, ready-mix yards, delivery cost, short-load fees, and total order cost.",
  },
};

export default function ConcreteTruckloadCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Truckload Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-truckload-calculator",
    description:
      "Estimate ready-mix concrete truckloads, cubic yards, order rounding, short-load fees, delivery fees, concrete weight, and total delivery cost.",
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
        name: "How many cubic yards are in a concrete truck?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many ready-mix concrete trucks carry about 8 to 10 cubic yards, but exact capacity depends on the supplier, truck type, and local weight limits.",
        },
      },
      {
        "@type": "Question",
        name: "What is a short-load fee for concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A short-load fee is an extra charge many suppliers add when a concrete order is below their minimum delivery quantity.",
        },
      },
      {
        "@type": "Question",
        name: "How much extra concrete should I order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many projects add 5% to 10% waste or overage so the pour does not run short. Complex shapes, uneven subgrade, and forms can require more allowance.",
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
              Concrete Truckload Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate ready-mix concrete truckloads, cubic yards to order, truck
              capacity, delivery fees, short-load fees, concrete weight, and total
              concrete delivery cost for slabs, driveways, patios, footings, and pads.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Ready-mix</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Loads + cost</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Short-load fees</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Ready-mix planning note</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Truck capacity, minimum orders, fuel surcharges, short-load fees, waiting
              time, and delivery zones vary by supplier. Use this calculator to plan
              the order, then confirm final pricing with the ready-mix company.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common truck capacity</p>
              <p className="mt-2 text-2xl font-bold text-white">8–10 yd³</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                Actual capacity depends on supplier, truck, and local weight limits.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteTruckloadCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For homeowners"
            text="Use the calculator to understand whether your project may require bagged concrete, a partial ready-mix order, or one or more truckloads."
          />
          <InfoCard
            title="For contractors"
            text="Estimate ready-mix order size, truckloads, delivery cost, short-load fees, and total concrete cost before calling the supplier."
          />
          <InfoCard
            title="For property managers"
            text="Plan concrete delivery budgets for pads, sidewalks, patios, driveways, repairs, and multi-property maintenance projects."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete truckload calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How many yards are in a concrete truck?"
              answer="Many ready-mix trucks carry around 8 to 10 cubic yards. Some trucks carry less or more depending on supplier, truck size, and legal weight limits."
            />
            <Faq
              question="What is a short-load fee?"
              answer="A short-load fee is an extra charge for concrete orders below a supplier's minimum delivery quantity. It helps cover delivery cost on small orders."
            />
            <Faq
              question="Should I round concrete orders up?"
              answer="Usually yes. Ordering slightly more concrete helps avoid running short during a pour. Many projects use 5% to 10% overage."
            />
            <Faq
              question="Does this calculator guarantee supplier pricing?"
              answer="No. Supplier pricing varies by market, mix design, fuel surcharge, delivery zone, minimum order, waiting time, and local fees."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-weight-calculator" label="Concrete Weight Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/concrete-short-load-fee-calculator" label="Concrete Short Load Fee Calculator" />
            <RelatedLink href="/construction/concrete-delivery-cost-calculator" label="Concrete Delivery Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-stairs-calculator" label="Concrete Stairs Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
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
