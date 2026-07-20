import type { Metadata } from "next";
import Link from "next/link";
import ConcretePsiCalculatorClient from "./ConcretePsiCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete PSI Calculator | Choose Concrete Strength by Project Type",
  description:
    "Free concrete PSI calculator. Estimate recommended concrete strength for slabs, driveways, patios, sidewalks, garage floors, footings, and pads based on project use, thickness, load, exposure, and reinforcement.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-psi-calculator",
  },
  openGraph: {
    title: "Concrete PSI Calculator",
    description:
      "Estimate recommended concrete PSI by project type, slab thickness, vehicle load, exposure, reinforcement, and use case.",
    url: "https://numeravo.com/construction/concrete-psi-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete PSI Calculator",
    description:
      "Choose concrete strength for slabs, driveways, patios, sidewalks, garage floors, footings, and pads.",
  },
};

export default function ConcretePsiCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete PSI Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-psi-calculator",
    description:
      "Estimate recommended concrete PSI based on project type, slab thickness, load, exposure, reinforcement, and use case.",
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
        name: "What PSI concrete should I use for a driveway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many residential driveways use concrete around 3500 to 4000 PSI depending on vehicle load, thickness, climate, base preparation, and local requirements.",
        },
      },
      {
        "@type": "Question",
        name: "What PSI concrete should I use for a patio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical patio often uses concrete around 3000 to 3500 PSI, depending on slab thickness, exposure, freeze-thaw conditions, and project specifications.",
        },
      },
      {
        "@type": "Question",
        name: "Is higher PSI always better?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Higher PSI can provide more compressive strength, but it is not the only factor. Slab thickness, base preparation, reinforcement, curing, joint layout, and drainage also matter.",
        },
      },
      {
        "@type": "Question",
        name: "Does concrete PSI replace engineering requirements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This calculator is for planning. Engineered slabs, structural work, commercial projects, and local code requirements should follow project specifications and professional guidance.",
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
              Concrete PSI Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Concrete PSI Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate the recommended concrete strength for slabs, driveways,
              patios, sidewalks, garage floors, footings, and pads based on project
              use, slab thickness, load, exposure, and reinforcement.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Light duty</p>
                <p className="mt-1 font-semibold text-white">2500–3000 PSI</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Residential</p>
                <p className="mt-1 font-semibold text-white">3000–4000 PSI</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Heavy duty</p>
                <p className="mt-1 font-semibold text-white">4000+ PSI</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Common PSI ranges</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="Sidewalk / walkway" value="3000–3500 PSI" />
              <QuickRow label="Patio / slab" value="3000–3500 PSI" />
              <QuickRow label="Residential driveway" value="3500–4000 PSI" />
              <QuickRow label="Garage floor" value="3500–4000 PSI" />
              <QuickRow label="Heavy-duty slab" value="4000+ PSI" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Use this calculator for planning only. Follow local code, project
              specifications, supplier recommendations, and engineering direction.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcretePsiCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Choose concrete strength"
            text="Estimate a practical PSI range based on project type, slab thickness, load level, exposure, and reinforcement."
          />
          <InfoCard
            title="Compare use cases"
            text="Review common PSI recommendations for patios, sidewalks, driveways, garages, pads, and heavier slabs."
          />
          <InfoCard
            title="Avoid under-specifying"
            text="Get upgrade notes when vehicle loads, freeze-thaw exposure, heavy use, or thin slabs may require stronger concrete."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            What concrete PSI means
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              Concrete PSI refers to compressive strength measured in pounds per
              square inch. A 3000 PSI mix is designed to withstand about 3000 pounds
              per square inch in compression after proper curing under standard
              testing conditions.
            </p>
            <p>
              PSI is important, but it does not work alone. Slab thickness, gravel
              base, compaction, drainage, reinforcement, joint spacing, curing, and
              finishing quality can all affect performance.
            </p>
            <p>
              For structural concrete, commercial work, retaining walls, elevated
              slabs, foundations, and engineered projects, use the project drawings,
              code requirements, and professional specifications instead of relying
              only on a rule-of-thumb calculator.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Common concrete PSI examples
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Project</span>
              <span>Common PSI range</span>
              <span>Typical note</span>
            </div>
            <ProjectRow project="Sidewalk" psi="3000–3500" note="Light foot traffic" />
            <ProjectRow project="Patio" psi="3000–3500" note="General residential use" />
            <ProjectRow project="Driveway" psi="3500–4000" note="Vehicle loads" />
            <ProjectRow project="Garage floor" psi="3500–4000" note="Vehicle + slab durability" />
            <ProjectRow project="Heavy slab" psi="4000+" note="Heavy use or engineered work" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete PSI calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="What PSI concrete is best for a driveway?"
              answer="Many residential driveways use about 3500 to 4000 PSI concrete, depending on vehicle load, slab thickness, base preparation, exposure, and local requirements."
            />
            <Faq
              question="Is 3000 PSI concrete enough for a patio?"
              answer="Often yes for standard residential patios, but freeze-thaw exposure, poor drainage, thin slabs, or heavier use may justify a stronger mix."
            />
            <Faq
              question="Does higher PSI stop cracking?"
              answer="Not by itself. Crack control also depends on base prep, reinforcement, curing, joint spacing, slab thickness, and drainage."
            />
            <Faq
              question="Should I ask my concrete supplier?"
              answer="Yes. Local ready-mix suppliers know regional climate, aggregate, code requirements, and common mixes for your project type."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-slab-thickness" label="Concrete Slab Thickness Calculator" />
            <RelatedLink href="/construction/concrete-control-joint-spacing" label="Concrete Control Joint Spacing Calculator" />
            <RelatedLink href="/construction/concrete-mix-ratio" label="Concrete Mix Ratio Calculator" />
            <RelatedLink href="/construction/concrete-cure-time" label="Concrete Cure Time Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing Calculator" />
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
  psi,
  note,
}: {
  project: string;
  psi: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
      <span className="font-semibold text-white">{project}</span>
      <span>{psi} PSI</span>
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
