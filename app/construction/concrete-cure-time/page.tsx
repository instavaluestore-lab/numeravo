import type { Metadata } from "next";
import Link from "next/link";
import ConcreteCureTimeClient from "./ConcreteCureTimeClient";

export const metadata: Metadata = {
  title: "Concrete Cure Time Calculator | When Can You Walk or Drive on Concrete?",
  description:
    "Free concrete cure time calculator. Estimate when concrete is ready for foot traffic, forms, light use, vehicles, sealing, and full cure based on slab type, thickness, temperature, and weather.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-cure-time",
  },
  openGraph: {
    title: "Concrete Cure Time Calculator",
    description:
      "Estimate when concrete is ready for foot traffic, vehicles, sealing, and full cure based on slab type, thickness, temperature, and weather.",
    url: "https://numeravo.com/construction/concrete-cure-time",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Cure Time Calculator",
    description:
      "Estimate concrete cure timing for walking, driving, sealing, forms, and full cure.",
  },
};

export default function ConcreteCureTimePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Cure Time Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-cure-time",
    description:
      "Estimate concrete cure timing for walking, driving, sealing, forms, light use, and full cure.",
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
        name: "How long does concrete take to cure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Concrete is often considered substantially cured at about 28 days, but it can usually handle foot traffic, light use, and some construction activities earlier depending on mix, temperature, slab thickness, weather, and project requirements.",
        },
      },
      {
        "@type": "Question",
        name: "When can you walk on new concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many residential concrete slabs can handle careful foot traffic after about 24 to 48 hours under normal conditions, but timing depends on temperature, moisture, thickness, mix design, and site conditions.",
        },
      },
      {
        "@type": "Question",
        name: "When can you drive on new concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many residential driveways should wait about 7 days before normal passenger vehicle traffic, and longer for heavy vehicles. Always follow contractor, supplier, engineer, and local guidance.",
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
              Concrete Cure Time Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate when new concrete may be ready for walking, form removal,
              light use, vehicles, sealing, and full cure based on slab type,
              thickness, temperature, and weather exposure.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Cure planning</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Traffic timing</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Weather impact</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Typical concrete timing</h2>
            <div className="mt-5 grid gap-3">
              <CureRow label="Careful foot traffic" value="24–48 hrs" />
              <CureRow label="Light use" value="2–3 days" />
              <CureRow label="Passenger vehicles" value="~7 days" />
              <CureRow label="Full design cure" value="~28 days" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              These are planning estimates, not structural approvals. Always follow
              the concrete supplier, contractor, engineer, and local requirements.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteCureTimeClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Avoid early damage"
            text="Driving, sealing, loading, or placing heavy items too early can mark, crack, weaken, or damage fresh concrete."
          />
          <InfoCard
            title="Weather matters"
            text="Cold weather slows curing. Hot, dry, windy weather can dry the surface too fast and increase cracking risk."
          />
          <InfoCard
            title="Plan the schedule"
            text="Use the calculator to estimate when a slab, driveway, patio, sidewalk, or pad may be ready for the next step."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Concrete cure time FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How long before you can walk on concrete?"
              answer="Under normal conditions, many slabs can handle careful foot traffic after about 24 to 48 hours. Cold weather, thick sections, shaded areas, and specialty mixes can change timing."
            />
            <Faq
              question="How long before you can drive on a new concrete driveway?"
              answer="A common planning estimate is about 7 days for normal passenger vehicles, with longer wait times for heavy trucks, trailers, dumpsters, or equipment."
            />
            <Faq
              question="When is concrete fully cured?"
              answer="Concrete is commonly referenced as reaching full design cure around 28 days, although hydration and strength gain can continue beyond that."
            />
            <Faq
              question="Can concrete cure too fast?"
              answer="Yes. Hot, dry, or windy conditions can dry the surface too quickly, increasing the risk of shrinkage cracks and weak surface performance."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-slab-thickness" label="Concrete Slab Thickness Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-psi-calculator" label="Concrete PSI Calculator" />
            <RelatedLink href="/construction/concrete-mix-ratio" label="Concrete Mix Ratio Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function CureRow({ label, value }: { label: string; value: string }) {
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
