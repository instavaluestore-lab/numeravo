import type { Metadata } from "next";
import Link from "next/link";
import ConcreteDeliveryCostCalculatorClient from "./ConcreteDeliveryCostCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Delivery Cost Calculator | Ready-Mix Delivery Fees",
  description:
    "Free concrete delivery cost calculator. Estimate ready-mix concrete delivery fees, short-load fees, fuel charges, distance charges, waiting time, tax, total delivered cost, and delivered cost per yard.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-delivery-cost-calculator",
  },
  openGraph: {
    title: "Concrete Delivery Cost Calculator",
    description:
      "Estimate ready-mix delivery fees, short-load fees, fuel charges, distance charges, waiting time, tax, and total delivered concrete cost.",
    url: "https://numeravo.com/construction/concrete-delivery-cost-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Delivery Cost Calculator",
    description:
      "Calculate ready-mix concrete delivery fees, short-load charges, distance charges, waiting time, tax, and delivered cost per yard.",
  },
};

export default function ConcreteDeliveryCostCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Delivery Cost Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-delivery-cost-calculator",
    description:
      "Estimate ready-mix concrete delivery fees, short-load fees, fuel charges, distance charges, waiting time, tax, total delivered cost, and delivered cost per yard.",
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
        name: "How much does concrete delivery cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Concrete delivery cost varies by supplier, distance, truckload size, short-load rules, fuel charges, waiting time, and local taxes. Many quotes include a base delivery fee plus extra charges for small loads or long distances.",
        },
      },
      {
        "@type": "Question",
        name: "What is a concrete short-load fee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A short-load fee is an extra charge when the order is below the supplier's minimum truckload amount. It helps cover the cost of sending a partially loaded ready-mix truck.",
        },
      },
      {
        "@type": "Question",
        name: "What affects delivered concrete cost per yard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Delivered cost per yard is affected by concrete price per yard, delivery fee, short-load fee, fuel fee, distance fee, waiting time, environmental fees, tax, and the total number of yards ordered.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this calculator for a final supplier quote?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This calculator is for planning. Always confirm final pricing, truck spacing, unloading time, minimum load rules, taxes, and fees with the ready-mix supplier before ordering.",
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

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              Concrete Delivery Cost Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Concrete Delivery Cost Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate ready-mix concrete delivery fees, short-load charges,
              distance fees, fuel and environmental fees, waiting time, tax, total
              delivered cost, and effective delivered cost per cubic yard.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Delivery fees</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Adds</p>
                <p className="mt-1 font-semibold text-white">Short-load fees</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Output</p>
                <p className="mt-1 font-semibold text-white">Cost / yd³</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common delivery costs</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="Base delivery fee" value="$100–$300+" />
              <QuickRow label="Short-load fee" value="$75–$250+" />
              <QuickRow label="Fuel / environmental" value="$15–$75+" />
              <QuickRow label="Waiting time" value="$1–$3 / min" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Pricing varies by market and supplier. Use this for planning, then
              confirm the final quote before ordering concrete.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteDeliveryCostCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Estimate delivered cost"
            text="Calculate concrete material cost plus delivery, short-load, fuel, distance, waiting time, environmental fees, and tax."
          />
          <InfoCard
            title="Find cost per yard"
            text="See your effective delivered cost per cubic yard after supplier fees and jobsite charges are included."
          />
          <InfoCard
            title="Plan ready-mix orders"
            text="Use truck capacity, minimum load rules, and delivery fees to compare small loads, full loads, and larger pours."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How concrete delivery cost is calculated
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              Delivered concrete cost usually starts with the concrete price per
              cubic yard multiplied by the number of yards ordered. Then supplier
              fees are added, including delivery, short-load, fuel, environmental,
              distance, weekend, rush, and waiting-time charges.
            </p>
            <p>
              Short-load fees are common when the order is below the ready-mix
              supplier’s minimum truckload threshold. For example, a supplier may
              charge extra when ordering fewer than 5 or 6 cubic yards.
            </p>
            <p>
              The most useful number is often the effective delivered cost per yard.
              A small order may have a much higher cost per yard because fixed fees
              are spread across fewer cubic yards.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete delivery cost example
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Item</span>
              <span>Example</span>
              <span>Cost</span>
            </div>
            <ProjectRow item="Concrete" example="5 yd³ × $160" cost="$800" />
            <ProjectRow item="Delivery fee" example="Base fee" cost="$175" />
            <ProjectRow item="Short-load fee" example="Below 6 yd³" cost="$125" />
            <ProjectRow item="Fuel / environmental" example="Supplier fees" cost="$45" />
            <ProjectRow item="Effective cost" example="$1,145 ÷ 5 yd³" cost="$229 / yd³" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete delivery cost FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="Why is small-load concrete so expensive?"
              answer="Small loads spread fixed delivery fees, short-load fees, fuel fees, and truck costs across fewer cubic yards, so the effective cost per yard is higher."
            />
            <Faq
              question="Does concrete price per yard include delivery?"
              answer="Sometimes it does and sometimes it does not. Always ask the supplier whether the quoted price includes delivery, short-load fees, fuel, tax, waiting time, and distance charges."
            />
            <Faq
              question="What causes waiting-time charges?"
              answer="Waiting-time charges can apply when the truck is on site longer than the supplier’s included unload window."
            />
            <Faq
              question="How can I reduce concrete delivery cost?"
              answer="Order the correct amount, avoid short loads when practical, have forms and crew ready, confirm access for the truck, and schedule the pour to reduce waiting time."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-weight-calculator" label="Concrete Weight Calculator" />
            <RelatedLink href="/construction/concrete-psi-calculator" label="Concrete PSI Calculator" />
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
      <span className="text-right text-sm font-semibold text-white">{value}</span>
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

function ProjectRow({
  item,
  example,
  cost,
}: {
  item: string;
  example: string;
  cost: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
      <span className="font-semibold text-white">{item}</span>
      <span>{example}</span>
      <span>{cost}</span>
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
