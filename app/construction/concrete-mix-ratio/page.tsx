import type { Metadata } from "next";
import Link from "next/link";
import ConcreteMixRatioClient from "./ConcreteMixRatioClient";

export const metadata: Metadata = {
  title: "Concrete Mix Ratio Calculator | Cement, Sand, Gravel & Water",
  description:
    "Free concrete mix ratio calculator. Estimate cement, sand, gravel, water, bags of cement, and material quantities for common concrete mix ratios.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-mix-ratio",
  },
  openGraph: {
    title: "Concrete Mix Ratio Calculator",
    description:
      "Calculate cement, sand, gravel, water, and bag quantities for common concrete mix ratios.",
    url: "https://numeravo.com/construction/concrete-mix-ratio",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Mix Ratio Calculator",
    description:
      "Estimate concrete mix materials by ratio, volume, cement bags, sand, gravel, and water.",
  },
};

export default function ConcreteMixRatioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Mix Ratio Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-mix-ratio",
    description:
      "Estimate concrete mix ratio material quantities including cement, sand, gravel, water, cement bags, and total batch volume.",
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
        name: "What is a common concrete mix ratio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common general-purpose concrete mix ratio is 1 part cement, 2 parts sand, and 3 parts gravel by volume. Project requirements can vary.",
        },
      },
      {
        "@type": "Question",
        name: "What does 1:2:3 concrete mix mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 1:2:3 concrete mix means 1 part cement, 2 parts sand, and 3 parts gravel, measured by volume before adding water.",
        },
      },
      {
        "@type": "Question",
        name: "Does this replace ready-mix concrete design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This calculator is for estimating basic batch material quantities. Structural concrete, code-regulated work, and engineered mixes should follow project specifications or supplier mix designs.",
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
              Concrete Mix Ratio Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate cement, sand, gravel, water, cement bags, and batch quantities
              for common concrete mix ratios such as 1:2:3, 1:2:4, and custom mixes.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Small batches</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Cement + aggregate</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Water estimate</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common mix ratios</h2>
            <div className="mt-5 grid gap-3">
              <RatioRow label="General purpose" value="1 : 2 : 3" />
              <RatioRow label="Lean mix" value="1 : 3 : 6" />
              <RatioRow label="Stronger small batch" value="1 : 1.5 : 3" />
              <RatioRow label="Traditional mix" value="1 : 2 : 4" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Ratios are cement : sand : gravel by volume. Final strength depends on
              materials, water, curing, compaction, and project specifications.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteMixRatioClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For small concrete batches"
            text="Estimate cement, sand, gravel, and water when mixing concrete by volume instead of ordering ready-mix."
          />
          <InfoCard
            title="For material planning"
            text="Convert a target concrete volume into approximate cement bags, aggregate volume, and water requirements."
          />
          <InfoCard
            title="For jobsite checks"
            text="Use the ratio breakdown to sanity-check small-batch quantities for pads, posts, repairs, and non-engineered work."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Concrete mix ratio FAQs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="What does 1:2:3 concrete mix mean?"
              answer="It means 1 part cement, 2 parts sand, and 3 parts gravel by volume before water is added."
            />
            <Faq
              question="How much water should I add?"
              answer="Water depends on material moisture, desired slump, and mix requirements. Add water gradually and avoid making the mix too wet."
            />
            <Faq
              question="Is 1:2:3 concrete good for all projects?"
              answer="No. It is a common general-purpose ratio, but structural work, driveways, foundations, and code-regulated projects may require specified concrete strength."
            />
            <Faq
              question="Should I use ready-mix instead?"
              answer="For larger pours or structural work, ready-mix is usually more consistent and easier to place than hand-mixed concrete."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-psi-calculator" label="Concrete PSI Calculator" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
            <RelatedLink href="/construction/sonotube-concrete-calculator" label="Sonotube Concrete Calculator" />
            <RelatedLink href="/construction/wire-mesh-calculator" label="Wire Mesh Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function RatioRow({ label, value }: { label: string; value: string }) {
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
