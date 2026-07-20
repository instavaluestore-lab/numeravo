import type { Metadata } from "next";
import Link from "next/link";
import ConcreteShortLoadFeeCalculatorClient from "./ConcreteShortLoadFeeCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Short Load Fee Calculator | Ready-Mix Small Load Cost",
  description:
    "Free concrete short load fee calculator. Estimate short-load charges for small ready-mix concrete orders and compare ordering the exact yards, supplier minimum yards, or concrete bags.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-short-load-fee-calculator",
  },
  openGraph: {
    title: "Concrete Short Load Fee Calculator",
    description:
      "Estimate ready-mix short-load fees and compare exact small-load concrete orders, minimum truckload orders, and concrete bags.",
    url: "https://numeravo.com/construction/concrete-short-load-fee-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Short Load Fee Calculator",
    description:
      "Calculate short-load fees for small ready-mix concrete orders and compare ready-mix vs bagged concrete.",
  },
};

export default function ConcreteShortLoadFeeCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Short Load Fee Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-short-load-fee-calculator",
    description:
      "Estimate short-load charges for small ready-mix concrete orders and compare exact yards, supplier minimum yards, and concrete bags.",
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
        name: "What is a concrete short-load fee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A concrete short-load fee is an extra charge when a ready-mix order is below the supplier's minimum truckload amount. It helps cover the cost of sending a partially loaded concrete truck.",
        },
      },
      {
        "@type": "Question",
        name: "When does a short-load fee apply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Short-load fees usually apply when the concrete order is below the supplier's minimum yardage, such as fewer than 4, 5, or 6 cubic yards depending on the supplier.",
        },
      },
      {
        "@type": "Question",
        name: "Is it cheaper to order minimum yards instead of paying a short-load fee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sometimes ordering the supplier minimum can be cheaper or close in price compared with paying a short-load fee, but it depends on the price per yard, delivery fee, short-load fee, waste, and disposal risk.",
        },
      },
      {
        "@type": "Question",
        name: "Should I use bags instead of ready-mix for a small concrete job?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For very small jobs, bagged concrete may be cheaper than ready-mix with delivery and short-load fees. For larger jobs, ready-mix is usually faster and more practical.",
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
              Concrete Short Load Fee Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Concrete Short Load Fee Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate the extra charge for small ready-mix concrete orders and
              compare paying a short-load fee, ordering the supplier minimum, or
              using bagged concrete for smaller jobs.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Compares</p>
                <p className="mt-1 font-semibold text-white">Small loads</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Checks</p>
                <p className="mt-1 font-semibold text-white">Minimum yards</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Alternative</p>
                <p className="mt-1 font-semibold text-white">Concrete bags</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common short-load cases</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="Small pad" value="1–3 yd³" />
              <QuickRow label="Patio repair" value="2–4 yd³" />
              <QuickRow label="Supplier minimum" value="4–6 yd³" />
              <QuickRow label="Typical fee" value="$75–$250+" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Supplier rules vary. Confirm minimum load, delivery fee, unload time,
              and short-load pricing before placing an order.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteShortLoadFeeCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Estimate short-load fees"
            text="Calculate the extra charge that may apply when your concrete order is below the supplier's minimum truckload amount."
          />
          <InfoCard
            title="Compare supplier minimum"
            text="See whether paying a short-load fee or ordering extra concrete up to the supplier minimum is cheaper."
          />
          <InfoCard
            title="Compare bagged concrete"
            text="Estimate bag counts and bag costs to decide whether ready-mix or bagged concrete makes more sense for small jobs."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How concrete short-load fees work
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              Ready-mix trucks cost money to dispatch whether they are full or only
              partially loaded. A short-load fee helps suppliers cover that cost
              when the order is below the minimum load threshold.
            </p>
            <p>
              For example, if a supplier minimum is 6 cubic yards and the job only
              needs 3 cubic yards, the supplier may add a short-load charge instead
              of charging only the per-yard concrete price.
            </p>
            <p>
              The best choice depends on the amount needed, concrete price per yard,
              delivery fee, short-load fee, bag price, crew labor, time, and whether
              extra concrete would create waste or disposal problems.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Short-load fee example
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Option</span>
              <span>Example</span>
              <span>Planning note</span>
            </div>
            <ProjectRow option="Exact order" example="3 yd³ + short-load fee" note="Less waste, higher fee per yard" />
            <ProjectRow option="Minimum order" example="6 yd³, no short-load fee" note="May waste extra concrete" />
            <ProjectRow option="Bagged concrete" example="80 lb bags" note="Labor intensive for larger jobs" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete short-load fee FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="Why do ready-mix suppliers charge a short-load fee?"
              answer="A ready-mix truck has dispatch, driver, fuel, batching, and scheduling costs even when it is not full. The short-load fee helps cover those fixed costs."
            />
            <Faq
              question="Is a short-load fee always bad?"
              answer="No. Paying the fee can be better than ordering extra concrete if the extra material would be wasted or create disposal problems."
            />
            <Faq
              question="When are concrete bags better?"
              answer="Bags can make sense for very small jobs, small repairs, posts, and pads where ready-mix delivery fees would dominate the total cost."
            />
            <Faq
              question="When is ready-mix better?"
              answer="Ready-mix is usually better for larger pours where consistency, speed, crew efficiency, and total labor savings outweigh delivery fees."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-delivery-cost-calculator" label="Concrete Delivery Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/10x10-concrete-slab-cost" label="10x10 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/12x12-concrete-slab-cost" label="12x12 Concrete Slab Cost Calculator" />
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
  option,
  example,
  note,
}: {
  option: string;
  example: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
      <span className="font-semibold text-white">{option}</span>
      <span>{example}</span>
      <span>{note}</span>
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
