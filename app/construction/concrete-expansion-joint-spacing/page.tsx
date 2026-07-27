import type { Metadata } from "next";
import Link from "next/link";
import ConcreteExpansionJointSpacingClient from "./ConcreteExpansionJointSpacingClient";

export const metadata: Metadata = {
  title: "Concrete Expansion Joint Spacing Calculator | Joint Layout",
  description:
    "Calculate concrete expansion joint spacing, joint count, joint layout, isolation joints, joint material length, and estimated expansion joint cost for slabs, driveways, patios, and sidewalks.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-expansion-joint-spacing",
  },
  openGraph: {
    title: "Concrete Expansion Joint Spacing Calculator",
    description:
      "Estimate expansion joint spacing, joint count, layout, material length, and joint cost for concrete slabs, driveways, patios, and sidewalks.",
    url: "https://numeravo.com/construction/concrete-expansion-joint-spacing",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Expansion Joint Spacing Calculator",
    description:
      "Plan concrete expansion joint spacing, joint layout, isolation joints, and material length.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How far apart should concrete expansion joints be?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Expansion joint spacing depends on the slab type, dimensions, adjacent structures, exposure, and local practice. Many exterior slabs use expansion or isolation joints at fixed structures, transitions, and long runs, while control joints handle shrinkage cracking inside the slab.",
      },
    },
    {
      "@type": "Question",
      name: "Are expansion joints the same as control joints?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Expansion joints separate concrete from fixed objects or adjacent slabs so movement can occur. Control joints are weakened planes cut or tooled into concrete to help control shrinkage cracking.",
      },
    },
    {
      "@type": "Question",
      name: "Where should expansion joints be placed in concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Expansion or isolation joints are commonly placed where concrete meets buildings, walls, steps, curbs, columns, existing slabs, driveway aprons, sidewalks, and other fixed objects.",
      },
    },
    {
      "@type": "Question",
      name: "How much expansion joint material do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Expansion joint material length can be estimated by adding the planned joint runs across the slab, plus isolation joint length around fixed structures or edges that require separation.",
      },
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Concrete Expansion Joint Spacing Calculator",
  applicationCategory: "ConstructionApplication",
  operatingSystem: "Any",
  url: "https://numeravo.com/construction/concrete-expansion-joint-spacing",
  description:
    "Calculate concrete expansion joint spacing, joint count, joint layout, isolation joint length, material length, and estimated joint cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcreteExpansionJointSpacingPage() {
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
              Concrete movement joint planning
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Concrete Expansion Joint Spacing Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete expansion joint spacing, joint count, joint
              layout, isolation joint length, material quantity, and estimated
              joint material cost for slabs, driveways, patios, sidewalks, pads,
              and garage slabs.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Main output</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Joint spacing
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Layout</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Joint count
                </p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Materials</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Linear feet
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">What this calculator includes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#A0AEC0]">
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Expansion spacing</span>
                <span className="font-semibold text-white">target ft</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Joint layout</span>
                <span className="font-semibold text-white">runs + panels</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F2937] pb-3">
                <span>Isolation joints</span>
                <span className="font-semibold text-white">edge length</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Material estimate</span>
                <span className="font-semibold text-white">linear feet + cost</span>
              </div>
            </div>
          </div>
        </div>

        <ConcreteExpansionJointSpacingClient />

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Expansion joints vs. control joints</h2>
          <p className="mt-4 leading-7 text-[#A0AEC0]">
            Expansion joints and isolation joints separate concrete from fixed
            objects or adjacent slabs so movement does not transfer directly
            into the new pour. Control joints are different: they are saw-cut or
            tooled lines used to guide shrinkage cracking within the slab. Most
            concrete flatwork needs both concepts considered.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">1. Measure the slab</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Enter length and width so the calculator can estimate panel
                runs and joint material length.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">2. Choose the joint spacing</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Use a preset or enter a custom expansion joint spacing based on
                the job type and site conditions.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
              <h3 className="font-semibold">3. Add isolation joints</h3>
              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Add joint length around buildings, walls, steps, columns,
                existing slabs, and other fixed objects.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related concrete calculators</h2>
          <p className="mt-3 text-[#A0AEC0]">
            Use these tools to plan concrete layout, control joints, slab cost,
            formwork, removal, demolition, and replacement concrete.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-saw-cut-calculator" label="Concrete Saw Cut Calculator" />
            <RelatedLink href="/construction/concrete-control-joint-spacing" label="Concrete Control Joint Spacing" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-formwork-calculator" label="Concrete Formwork Calculator" />
            <RelatedLink href="/construction/concrete-removal-cost-calculator" label="Concrete Removal Cost Calculator" />
            <RelatedLink href="/construction/concrete-demolition-calculator" label="Concrete Demolition Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-waste-calculator" label="Concrete Waste Calculator" />
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
