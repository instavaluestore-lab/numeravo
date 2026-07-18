import type { Metadata } from "next";
import Link from "next/link";
import RebarSpacingForConcreteSlabClient from "./RebarSpacingForConcreteSlabClient";

export const metadata: Metadata = {
  title: "Rebar Spacing for Concrete Slab Calculator | Rebar Grid Layout",
  description:
    "Free rebar spacing for concrete slab calculator. Estimate rebar grid spacing, number of bars, linear feet, lap allowance, waste, weight, and material cost for concrete slabs.",
  alternates: {
    canonical: "https://numeravo.com/construction/rebar-spacing-for-concrete-slab",
  },
  openGraph: {
    title: "Rebar Spacing for Concrete Slab Calculator",
    description:
      "Calculate rebar spacing, bar count, grid layout, linear feet, lap allowance, waste, weight, and material cost for concrete slabs.",
    url: "https://numeravo.com/construction/rebar-spacing-for-concrete-slab",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebar Spacing for Concrete Slab Calculator",
    description:
      "Estimate rebar spacing, grid layout, bar count, linear feet, weight, and cost for concrete slab reinforcement.",
  },
};

export default function RebarSpacingForConcreteSlabPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Rebar Spacing for Concrete Slab Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/rebar-spacing-for-concrete-slab",
    description:
      "Estimate concrete slab rebar spacing, grid layout, bar count, linear feet, lap allowance, waste, weight, and material cost.",
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
        name: "What is common rebar spacing for a concrete slab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common slab rebar spacing is often 12 inches, 16 inches, 18 inches, or 24 inches on center, depending on slab use, thickness, soil conditions, local code, and engineering requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Does closer rebar spacing make a slab stronger?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Closer spacing can increase reinforcement density, but slab performance also depends on concrete thickness, subbase, jointing, reinforcement size, placement depth, loads, and engineering design.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate rebar pieces for a slab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divide the slab dimension by the spacing, round up, and add one bar for each direction of the grid. Then calculate bar lengths, lap allowance, waste, and stock length requirements.",
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
              Rebar Spacing for Concrete Slab Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate slab rebar spacing, grid layout, bars in each direction,
              total linear feet, lap allowance, waste, stick count, weight, and
              material cost for reinforced concrete slabs.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best for</p>
                <p className="mt-1 font-semibold text-white">Slabs + pads</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Calculates</p>
                <p className="mt-1 font-semibold text-white">Grid spacing</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Includes</p>
                <p className="mt-1 font-semibold text-white">Weight + cost</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Spacing note</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              This tool is for planning and material estimates. Structural slabs,
              driveways, commercial work, foundations, suspended slabs, and heavy-load
              areas may require engineering or local code requirements.
            </p>
            <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Common slab spacing</p>
              <p className="mt-2 text-2xl font-bold text-white">12–24 in. OC</p>
              <p className="mt-2 text-xs leading-5 text-[#A0AEC0]">
                OC means on-center spacing between parallel bars.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <RebarSpacingForConcreteSlabClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For slab planning"
            text="Estimate how many bars are needed in each direction before ordering reinforcement for a slab or pad."
          />
          <InfoCard
            title="For cost estimating"
            text="Calculate total linear feet, stick count, weight, waste, lap allowance, and estimated material cost."
          />
          <InfoCard
            title="For better takeoffs"
            text="Use spacing, edge clearance, bar size, stock length, and lap settings to create a more realistic rebar takeoff."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Rebar spacing for concrete slab FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="What does rebar spacing on center mean?"
              answer="On-center spacing means the distance from the center of one bar to the center of the next parallel bar."
            />
            <Faq
              question="Is 12 inch or 24 inch rebar spacing better?"
              answer="Tighter spacing adds more reinforcement, but the correct spacing depends on slab use, loads, soil, thickness, local code, and engineering requirements."
            />
            <Faq
              question="Do slabs always need rebar?"
              answer="Not always. Some slabs use wire mesh, fiber reinforcement, or no steel reinforcement depending on project type, load, soil conditions, and local requirements."
            />
            <Faq
              question="Does this replace an engineer?"
              answer="No. This calculator estimates material quantities. Structural design should follow local code, project specifications, and professional engineering when required."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/rebar-calculator" label="Rebar Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
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
