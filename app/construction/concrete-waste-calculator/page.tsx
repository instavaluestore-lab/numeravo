import type { Metadata } from "next";
import Link from "next/link";
import ConcreteWasteCalculatorClient from "./ConcreteWasteCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Waste Calculator | Extra Yards & Waste Cost",
  description:
    "Free concrete waste calculator. Estimate extra concrete yards, final order quantity, waste cost, truckload impact, and bag count impact for slabs, patios, driveways, footings, and pads.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-waste-calculator",
  },
  openGraph: {
    title: "Concrete Waste Calculator",
    description:
      "Estimate concrete waste allowance, extra yards, order yards, extra cost, truckloads, and bag count impact.",
    url: "https://numeravo.com/construction/concrete-waste-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Waste Calculator",
    description:
      "Calculate concrete waste percentage, extra yards, final order yards, extra cost, and truckload or bag impact.",
  },
};

export default function ConcreteWasteCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Waste Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-waste-calculator",
    description:
      "Estimate concrete waste allowance, extra yards, final order quantity, extra cost, truckload impact, and bag count impact.",
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
        name: "How much waste should I add for concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many concrete jobs use a waste allowance of about 5% to 10%. Complex forms, uneven subgrade, thickened edges, stairs, and hard-to-measure pours may need more.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I order extra concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Extra concrete helps cover measuring errors, uneven base depth, form irregularities, spillage, pump or chute loss, and small changes during placement.",
        },
      },
      {
        "@type": "Question",
        name: "Can too much concrete waste be a problem?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Ordering too much concrete can increase cost and may create disposal problems. The right waste allowance should cover risk without creating excessive leftover concrete.",
        },
      },
      {
        "@type": "Question",
        name: "Does concrete waste affect delivery cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Waste allowance increases final order yards. That can affect material cost, truckload planning, short-load fees, and whether the order crosses a supplier minimum.",
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
              Concrete Waste Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Concrete Waste Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate how much extra concrete to order for waste, measuring
              variation, uneven base depth, spillage, pump loss, and jobsite
              conditions. Calculate extra yards, final order yards, extra cost,
              truckload impact, and bag count impact.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Typical waste</p>
                <p className="mt-1 font-semibold text-white">5%–10%</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Output</p>
                <p className="mt-1 font-semibold text-white">Order yards</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Also estimates</p>
                <p className="mt-1 font-semibold text-white">Extra cost</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common waste allowances</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="Simple slab" value="5%" />
              <QuickRow label="Driveway or patio" value="8%–10%" />
              <QuickRow label="Footings/forms" value="10%" />
              <QuickRow label="Irregular pour" value="12%–15%" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Use this as a planning estimate. Confirm final quantity with your
              contractor, supplier, or engineer before ordering concrete.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteWasteCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Calculate extra waste yards"
            text="Convert a waste percentage into extra cubic yards so you can see how much material is being added to the base estimate."
          />
          <InfoCard
            title="Estimate waste cost"
            text="Multiply extra concrete yards by your price per yard to understand the dollar impact of the waste allowance."
          />
          <InfoCard
            title="Plan delivery and bags"
            text="See how waste changes truckload planning, short-load risk, and bag count for small concrete jobs."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Why concrete waste allowance matters
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              Concrete estimates are based on measured volume, but real projects
              rarely match perfect dimensions. Subgrade depth, form movement,
              spillage, uneven excavation, thickened edges, pump loss, and field
              adjustments can all increase the amount needed.
            </p>
            <p>
              A small waste allowance can prevent running short during the pour.
              Running short is usually worse than ordering slightly extra because
              a second delivery can delay finishing, create cold joints, or add
              new delivery and short-load charges.
            </p>
            <p>
              Too much waste is also expensive. Extra concrete can create disposal
              work, cleanup time, and unnecessary material cost. The goal is to
              order enough extra without overbuying.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete waste planning table
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Project type</span>
              <span>Common waste</span>
              <span>Planning note</span>
            </div>
            <ProjectRow project="Simple slab or pad" waste="5%" note="Good forms and even base" />
            <ProjectRow project="Patio or driveway" waste="8%–10%" note="Larger area and base variation" />
            <ProjectRow project="Footings or trenches" waste="10%" note="Excavation can vary" />
            <ProjectRow project="Irregular forms/stairs" waste="12%–15%" note="More field variation" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete waste calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="Is 10% concrete waste enough?"
              answer="For many flatwork jobs, 10% is a reasonable planning allowance. Simple, well-formed slabs may need less, while irregular or hard-to-measure pours may need more."
            />
            <Faq
              question="Should I round concrete order yards up?"
              answer="Concrete is usually ordered in fractional or whole cubic yards depending on the supplier. Rounding up can help avoid running short, but too much extra creates waste."
            />
            <Faq
              question="Does waste allowance include spillage?"
              answer="Yes. Waste allowance can account for spillage, uneven subgrade, form variation, pump or chute loss, and small measurement errors."
            />
            <Faq
              question="What happens if I run short on concrete?"
              answer="Running short can delay the pour, add delivery charges, create finishing issues, and increase the risk of cold joints or inconsistent results."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-delivery-cost-calculator" label="Concrete Delivery Cost Calculator" />
            <RelatedLink href="/construction/concrete-short-load-fee-calculator" label="Concrete Short Load Fee Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
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
  project,
  waste,
  note,
}: {
  project: string;
  waste: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
      <span className="font-semibold text-white">{project}</span>
      <span>{waste}</span>
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
