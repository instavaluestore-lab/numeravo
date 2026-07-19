import type { Metadata } from "next";
import Link from "next/link";
import ConcreteWeightCalculatorClient from "./ConcreteWeightCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Weight Calculator | Weight of Concrete by Yard, Foot, or Slab",
  description:
    "Free concrete weight calculator. Estimate concrete weight by cubic yards, cubic feet, slab dimensions, bags, truckloads, and concrete density.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-weight-calculator",
  },
  openGraph: {
    title: "Concrete Weight Calculator",
    description:
      "Estimate concrete weight in pounds and tons from cubic yards, cubic feet, slab dimensions, bag counts, or truckload volume.",
    url: "https://numeravo.com/construction/concrete-weight-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Weight Calculator",
    description:
      "Calculate concrete weight by yard, cubic foot, slab dimensions, bags, truckloads, and density.",
  },
};

export default function ConcreteWeightCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Weight Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-weight-calculator",
    description:
      "Estimate concrete weight from cubic yards, cubic feet, slab dimensions, bag counts, truckloads, and concrete density.",
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
        name: "How much does a yard of concrete weigh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common estimating weight for normal-weight concrete is about 4,000 to 4,100 pounds per cubic yard. This calculator uses 4,050 pounds per cubic yard by default.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a cubic foot of concrete weigh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Normal-weight concrete is commonly estimated at about 145 to 150 pounds per cubic foot. This calculator uses 150 pounds per cubic foot by default.",
        },
      },
      {
        "@type": "Question",
        name: "Why does concrete weight vary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Concrete weight varies based on mix design, aggregate type, moisture, air content, reinforcement, and whether the concrete is lightweight, normal-weight, or heavyweight concrete.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use concrete weight for hauling or disposal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can use estimated concrete weight for planning, but always confirm hauling limits, disposal rules, trailer capacity, and supplier requirements before loading or transporting concrete.",
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
              Concrete Weight Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Concrete Weight Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate the weight of concrete by cubic yards, cubic feet, slab
              dimensions, bag counts, or truckload volume. Convert concrete volume
              into pounds, tons, and approximate hauling weight.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Default yard weight</p>
                <p className="mt-1 font-semibold text-white">4,050 lb / yd³</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Default foot weight</p>
                <p className="mt-1 font-semibold text-white">150 lb / ft³</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Output</p>
                <p className="mt-1 font-semibold text-white">lb + tons</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Quick estimates</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="1 cubic yard" value="~4,050 lb" />
              <QuickRow label="1 cubic foot" value="~150 lb" />
              <QuickRow label="10 cubic yards" value="~40,500 lb" />
              <QuickRow label="1 US ton" value="2,000 lb" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Use this for planning only. Verify actual weights before hauling,
              loading trailers, ordering dumpsters, or checking equipment limits.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteWeightCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Estimate concrete weight"
            text="Convert concrete volume into pounds and tons for planning, hauling, delivery, and disposal."
          />
          <InfoCard
            title="Use yards or dimensions"
            text="Calculate from cubic yards, cubic feet, slab dimensions, bag counts, or truckload volume."
          />
          <InfoCard
            title="Adjust density"
            text="Change density assumptions for lightweight, normal-weight, or heavier concrete mixes."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How much does concrete weigh?
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              Normal-weight concrete is commonly estimated at about 145 to 150
              pounds per cubic foot, or roughly 4,000 to 4,100 pounds per cubic yard.
              This calculator uses 150 pounds per cubic foot and 4,050 pounds per
              cubic yard as default estimating values.
            </p>
            <p>
              Concrete weight can change based on aggregate type, water content,
              air entrainment, reinforcement, and mix design. Lightweight concrete
              weighs less, while heavyweight mixes can weigh more.
            </p>
            <p>
              For hauling, demolition, disposal, or trailer loading, use the result
              as a planning estimate only. Always confirm actual capacity limits and
              disposal weight rules before moving material.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Common concrete weight examples
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Concrete amount</span>
              <span>Approx. pounds</span>
              <span>Approx. tons</span>
            </div>
            <ProjectRow amount="1 cubic yard" pounds="~4,050 lb" tons="~2.03 tons" />
            <ProjectRow amount="2 cubic yards" pounds="~8,100 lb" tons="~4.05 tons" />
            <ProjectRow amount="5 cubic yards" pounds="~20,250 lb" tons="~10.13 tons" />
            <ProjectRow amount="10 cubic yards" pounds="~40,500 lb" tons="~20.25 tons" />
            <ProjectRow amount="12x12 slab, 4 in" pounds="~7,200 lb before waste" tons="~3.60 tons" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete weight calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How much does one yard of concrete weigh?"
              answer="A common estimate for normal-weight concrete is about 4,050 pounds per cubic yard, or a little over 2 tons."
            />
            <Faq
              question="How much does a 10 yard concrete truck weigh?"
              answer="Ten cubic yards of concrete alone can weigh about 40,500 pounds before accounting for the truck weight."
            />
            <Faq
              question="How much does a 4 inch slab weigh?"
              answer="A 4 inch slab weighs about 50 pounds per square foot using 150 pounds per cubic foot as the density estimate."
            />
            <Faq
              question="Can this be used for demolition debris?"
              answer="Yes for rough planning, but demolition debris can include reinforcement, soil, moisture, and broken material voids, so actual disposal weight can differ."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/10x10-concrete-slab-cost" label="10x10 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/12x12-concrete-slab-cost" label="12x12 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-wall-calculator" label="Concrete Wall Calculator" />
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
  amount,
  pounds,
  tons,
}: {
  amount: string;
  pounds: string;
  tons: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
      <span className="font-semibold text-white">{amount}</span>
      <span>{pounds}</span>
      <span>{tons}</span>
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
