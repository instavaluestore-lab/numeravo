import type { Metadata } from "next";
import Link from "next/link";
import ConcreteLaborCostCalculatorClient from "./ConcreteLaborCostCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Labor Cost Calculator | Crew Hours & Labor Estimate",
  description:
    "Estimate concrete labor cost, crew hours, person hours, labor rate, production rate, setup, forming, finishing, cleanup, overhead, and total labor cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-labor-cost-calculator",
  },
  openGraph: {
    title: "Concrete Labor Cost Calculator",
    description:
      "Calculate concrete labor cost for slabs, driveways, patios, sidewalks, pads, formwork, finishing, removal, demolition, and placement work.",
    url: "https://numeravo.com/construction/concrete-labor-cost-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Labor Cost Calculator",
    description:
      "Estimate crew hours, person hours, labor rate, productivity, overhead, minimum charge, and total concrete labor cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate concrete labor cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete labor cost can be estimated by multiplying crew hours by crew size to get person hours, then multiplying person hours by the labor rate. Additional costs may include setup, forming, finishing, cleanup, overhead, and minimum job charges.",
      },
    },
    {
      "@type": "Question",
      name: "What affects concrete labor cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete labor cost is affected by project size, crew size, productivity, finish type, access, formwork, reinforcement, pump or chute placement, weather, demolition, cleanup, and local wage rates.",
      },
    },
    {
      "@type": "Question",
      name: "Is concrete labor priced per square foot or per hour?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete labor may be estimated by the hour, by person hour, by square foot, by cubic yard, or as a minimum job charge. This calculator uses crew productivity and labor rate to estimate both total labor cost and cost per square foot.",
      },
    },
    {
      "@type": "Question",
      name: "Does concrete labor include materials?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Usually labor estimates are separate from concrete material, delivery, pumping, reinforcement, and other supplies. This calculator focuses on labor and labor-related charges, while related Numeravo calculators estimate concrete volume, delivery, forms, finishing, saw cuts, and removal.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Concrete Labor Cost Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/concrete-labor-cost-calculator",
  description:
    "Estimate concrete labor cost, crew hours, person hours, labor rate, production rate, setup, forming, finishing, cleanup, overhead, and total labor cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcreteLaborCostCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Link
              href="/construction"
              className="mb-5 inline-flex rounded-full border border-[#1F2937] bg-[#121826] px-4 py-2 text-sm font-medium text-[#A0AEC0] transition hover:border-orange-400 hover:text-white"
            >
              ← Construction calculators
            </Link>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
              Concrete crew hours and labor estimating
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Concrete Labor Cost Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete labor cost using project area, crew size,
              production rate, labor rate, setup time, forming labor, finishing
              labor, cleanup, overhead, minimum charge, and cost per square foot.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Crew</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Person hrs
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Productivity</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Sq ft / hr
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Labor cost</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Total + unit
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator includes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Project size</span>
                <span className="font-semibold text-white">sq ft + yd³</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Crew labor</span>
                <span className="font-semibold text-white">person hours</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Labor phases</span>
                <span className="font-semibold text-white">setup + finish</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Total estimate</span>
                <span className="font-semibold text-white">cost / sq ft</span>
              </div>
            </div>
          </div>
        </div>

        <ConcreteLaborCostCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How concrete labor cost is estimated</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Concrete labor cost is usually driven by crew size, production rate,
            wage rate, site access, project complexity, forming, reinforcement,
            placement method, finishing requirements, cleanup, and minimum job
            charges. This calculator separates labor phases so you can estimate
            crew time and total labor cost more clearly.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Enter project size</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Use length, width, and thickness to estimate surface area and
                concrete volume.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Set crew productivity</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Adjust crew size, production rate, labor rate, and extra phase
                hours for forming, finishing, and cleanup.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Review labor cost</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Compare direct labor, overhead, minimum charge, cost per square
                foot, and cost per cubic yard.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to estimate concrete material, delivery, pumping,
            finishing, formwork, removal, demolition, and total project cost.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-finishing-cost-calculator" label="Concrete Finishing Cost Calculator" />
            <RelatedLink href="/construction/concrete-formwork-calculator" label="Concrete Formwork Calculator" />
            <RelatedLink href="/construction/concrete-pump-truck-cost-calculator" label="Concrete Pump Truck Cost Calculator" />
            <RelatedLink href="/construction/concrete-saw-cut-calculator" label="Concrete Saw Cut Calculator" />
            <RelatedLink href="/construction/concrete-removal-cost-calculator" label="Concrete Removal Cost Calculator" />
            <RelatedLink href="/construction/concrete-demolition-calculator" label="Concrete Demolition Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function RelatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
    >
      {label}
    </Link>
  );
}
