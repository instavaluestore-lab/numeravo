import type { Metadata } from "next";
import Link from "next/link";
import RebarWeightCalculatorClient from "./RebarWeightCalculatorClient";

export const metadata: Metadata = {
  title: "Rebar Weight Calculator | Rebar Weight, Length & Cost",
  description:
    "Free rebar weight calculator. Estimate rebar weight by size, length, quantity, stock bars, total feet, total pounds, tons, and material cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/rebar-weight-calculator",
  },
  openGraph: {
    title: "Rebar Weight Calculator",
    description:
      "Calculate rebar weight, total feet, pounds, tons, stock bar count, and material cost by rebar size and length.",
    url: "https://numeravo.com/construction/rebar-weight-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebar Weight Calculator",
    description:
      "Estimate rebar weight, length, quantity, pounds, tons, and cost for construction material takeoffs.",
  },
};

export default function RebarWeightCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Rebar Weight Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/rebar-weight-calculator",
    description:
      "Estimate rebar weight by size, bar length, quantity, total linear feet, pounds, tons, and material cost.",
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
        name: "How much does rebar weigh per foot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "#3 rebar weighs about 0.376 lb per foot, #4 about 0.668 lb per foot, #5 about 1.043 lb per foot, and #6 about 1.502 lb per foot.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate rebar weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply the total linear feet of rebar by the weight per foot for the selected rebar size. Divide pounds by 2,000 to estimate tons.",
        },
      },
      {
        "@type": "Question",
        name: "Why calculate rebar weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rebar weight helps estimate material cost, delivery requirements, handling needs, hauling loads, and construction takeoff quantities.",
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
              Rebar Weight Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate rebar weight by bar size, bar length, quantity, total linear
              feet, pounds, tons, and material cost for slabs, footings, walls,
              driveways, patios, pads, and reinforcement takeoffs.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Rebar takeoffs</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Weight + tons</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Cost estimate</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common rebar weights</h2>
            <div className="mt-5 grid gap-3">
              <WeightRow label="#3 rebar" value="0.376 lb/ft" />
              <WeightRow label="#4 rebar" value="0.668 lb/ft" />
              <WeightRow label="#5 rebar" value="1.043 lb/ft" />
              <WeightRow label="#6 rebar" value="1.502 lb/ft" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Use supplier data for final ordering when exact grade, coating, or bar
              specifications matter.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <RebarWeightCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For material takeoffs"
            text="Estimate total rebar feet, pounds, tons, and number of stock bars needed before ordering."
          />
          <InfoCard
            title="For delivery planning"
            text="Use estimated weight to plan handling, hauling, jobsite delivery, and storage requirements."
          />
          <InfoCard
            title="For cost estimating"
            text="Calculate estimated rebar material cost using price per foot, price per pound, or price per stock bar."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Rebar weight calculator FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How much does #4 rebar weigh?"
              answer="#4 rebar weighs about 0.668 pounds per foot. A 20-foot stick weighs about 13.36 pounds before rounding."
            />
            <Faq
              question="How do I convert rebar pounds to tons?"
              answer="Divide total rebar pounds by 2,000 to estimate short tons."
            />
            <Faq
              question="Does epoxy-coated rebar weigh the same?"
              answer="The steel weight is generally based on the bar size. Coatings can add small differences, so supplier data should be used for final ordering."
            />
            <Faq
              question="Can this calculator estimate cost?"
              answer="Yes. You can estimate cost by price per foot, price per pound, or price per stock bar."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing for Concrete Slab" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function WeightRow({ label, value }: { label: string; value: string }) {
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
