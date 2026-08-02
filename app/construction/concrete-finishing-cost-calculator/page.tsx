import type { Metadata } from "next";
import Link from "next/link";
import ConcreteFinishingCostCalculatorClient from "./ConcreteFinishingCostCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Finishing Cost Calculator | Slab, Driveway & Patio Finish",
  description:
    "Estimate concrete finishing cost by square footage, finish type, labor rate, crew size, saw cuts, curing, sealing, broom finish, trowel finish, stamped finish, and total project cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-finishing-cost-calculator",
  },
  openGraph: {
    title: "Concrete Finishing Cost Calculator",
    description:
      "Calculate concrete finishing cost for slabs, driveways, patios, sidewalks, pads, broom finish, trowel finish, stamped concrete, curing, and sealing.",
    url: "https://numeravo.com/construction/concrete-finishing-cost-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Finishing Cost Calculator",
    description:
      "Estimate concrete finishing labor, finish type costs, curing, sealing, saw cuts, and total finishing cost.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does concrete finishing cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete finishing cost depends on square footage, finish type, crew labor rate, project complexity, access, slab thickness, timing, curing, sealing, saw cuts, and whether decorative finishing is included.",
      },
    },
    {
      "@type": "Question",
      name: "What affects concrete finishing labor cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Concrete finishing labor cost is affected by area, finish difficulty, crew size, production rate, weather, concrete set time, edge work, control joints, surface texture, and cleanup requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Is broom finish cheaper than stamped concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Broom finish is usually one of the lower-cost exterior concrete finishes, while stamped concrete typically costs more because it requires additional labor, timing, coloring, stamping tools, release agent, and sealing.",
      },
    },
    {
      "@type": "Question",
      name: "Does concrete finishing include sealing?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Not always. Some estimates include curing compound or basic finishing only, while sealing may be priced separately. This calculator lets you add curing, sealing, saw cuts, and other finishing-related costs.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Concrete Finishing Cost Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/concrete-finishing-cost-calculator",
  description:
    "Estimate concrete finishing cost by area, finish type, labor rate, crew production, curing, sealing, saw cuts, and total project cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcreteFinishingCostCalculatorPage() {
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
              Concrete labor, finish, curing, and sealing
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Concrete Finishing Cost Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete finishing cost by square footage, finish type,
              labor rate, crew productivity, curing, sealing, saw cuts, edge
              work, decorative finish add-ons, and total cost per square foot.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Finish type</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Broom / trowel
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Labor</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Crew hours
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Cost</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  $/sq ft
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator includes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Surface area</span>
                <span className="font-semibold text-white">square feet</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Finish labor</span>
                <span className="font-semibold text-white">crew hours</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Add-ons</span>
                <span className="font-semibold text-white">cuts + sealing</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Total estimate</span>
                <span className="font-semibold text-white">cost / sq ft</span>
              </div>
            </div>
          </div>
        </div>

        <ConcreteFinishingCostCalculatorClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How concrete finishing cost is estimated</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Concrete finishing cost is usually based on slab area, finish
            difficulty, labor productivity, crew rate, surface texture, edge
            work, saw cutting, curing, sealing, and cleanup. Decorative finishes
            such as stamped concrete often require more labor, materials, timing,
            and sealing than a basic broom or trowel finish.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Enter area</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Use length and width to calculate the finishing surface area.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Choose finish</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Select broom, trowel, exposed aggregate, stamped, or custom
                finish pricing.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Add extras</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Add curing, sealing, saw cuts, edge work, cleanup, and minimum
                job charges.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to estimate concrete volume, total slab cost,
            pumping cost, saw cutting, and project-specific concrete work.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-saw-cut-calculator" label="Concrete Saw Cut Calculator" />
            <RelatedLink href="/construction/concrete-pump-truck-cost-calculator" label="Concrete Pump Truck Cost Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-waste-calculator" label="Concrete Waste Calculator" />
            <RelatedLink href="/construction/concrete-cure-time" label="Concrete Cure Time Calculator" />
            <RelatedLink href="/construction/concrete-psi-calculator" label="Concrete PSI Calculator" />
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
