import type { Metadata } from "next";
import Link from "next/link";
import ConcreteControlJointSpacingClient from "./ConcreteControlJointSpacingClient";

export const metadata: Metadata = {
  title: "Concrete Control Joint Spacing Calculator | Slab Saw Cut Layout",
  description:
    "Free concrete control joint spacing calculator. Estimate saw cut spacing, panel layout, joint depth, number of cuts, and crack-control guidance for slabs, driveways, patios, sidewalks, and pads.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-control-joint-spacing",
  },
  openGraph: {
    title: "Concrete Control Joint Spacing Calculator",
    description:
      "Estimate concrete control joint spacing, saw cut depth, panel layout, and cut counts for slabs, driveways, patios, sidewalks, and pads.",
    url: "https://numeravo.com/construction/concrete-control-joint-spacing",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Control Joint Spacing Calculator",
    description:
      "Calculate control joint spacing, joint depth, panel layout, and saw cut counts for concrete slabs.",
  },
};

export default function ConcreteControlJointSpacingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Control Joint Spacing Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-control-joint-spacing",
    description:
      "Estimate concrete control joint spacing, saw cut depth, panel layout, and cut counts for concrete slabs, driveways, patios, sidewalks, and pads.",
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
        name: "How far apart should concrete control joints be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common rule of thumb is to space control joints about 24 to 30 times the slab thickness in inches. For a 4 inch slab, that often means roughly 8 to 10 feet between joints.",
        },
      },
      {
        "@type": "Question",
        name: "How deep should concrete control joints be cut?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common saw cut depth is at least one quarter of the slab thickness. For a 4 inch slab, that is about 1 inch deep.",
        },
      },
      {
        "@type": "Question",
        name: "Do control joints prevent all cracks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Control joints do not prevent all cracking. They create planned weak points so shrinkage cracks are more likely to occur in controlled, straighter lines.",
        },
      },
      {
        "@type": "Question",
        name: "When should concrete control joints be cut?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Timing depends on concrete mix, weather, equipment, and finishing conditions. Joints are usually cut as soon as the concrete can be sawed without raveling, but before random shrinkage cracking occurs.",
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
              Concrete Control Joint Spacing
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Concrete Control Joint Spacing Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete control joint spacing, saw cut depth, panel
              layout, number of cuts, and recommended joint placement for slabs,
              driveways, patios, sidewalks, and pads.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Spacing rule</p>
                <p className="mt-1 font-semibold text-white">24×–30× thickness</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Cut depth rule</p>
                <p className="mt-1 font-semibold text-white">¼ slab thickness</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Best use</p>
                <p className="mt-1 font-semibold text-white">Crack control</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Quick spacing guide</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="3.5 inch slab" value="7–9 ft spacing" />
              <QuickRow label="4 inch slab" value="8–10 ft spacing" />
              <QuickRow label="5 inch slab" value="10–12.5 ft spacing" />
              <QuickRow label="6 inch slab" value="12–15 ft spacing" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Confirm joint layout with project specifications, local standards,
              concrete contractor judgment, and engineering requirements where applicable.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteControlJointSpacingClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Estimate joint spacing"
            text="Use slab thickness and the 24× to 30× rule of thumb to estimate recommended control joint spacing."
          />
          <InfoCard
            title="Plan saw cuts"
            text="Estimate cut depth, number of lengthwise cuts, number of widthwise cuts, total cut length, and panel size."
          />
          <InfoCard
            title="Reduce random cracking"
            text="Control joints help guide shrinkage cracking into planned lines instead of random cracks across the slab."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How concrete control joint spacing is estimated
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              A common field rule is to space concrete control joints about 24 to
              30 times the slab thickness in inches. A 4 inch slab is often jointed
              about every 8 to 10 feet. A 5 inch slab is often jointed about every
              10 to 12.5 feet.
            </p>
            <p>
              Saw cut depth is commonly estimated at one quarter of the slab
              thickness. For a 4 inch slab, that means a cut depth of about 1 inch.
              Thicker slabs require deeper cuts.
            </p>
            <p>
              Panel shape matters. Long, narrow panels are more likely to crack.
              For best results, keep panels close to square and avoid a panel length
              that is more than about 1.5 times the panel width when possible.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Common control joint spacing examples
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Slab thickness</span>
              <span>Typical spacing range</span>
              <span>Minimum cut depth</span>
            </div>
            <ProjectRow thickness="3.5 in" spacing="7–9 ft" depth="~0.9 in" />
            <ProjectRow thickness="4 in" spacing="8–10 ft" depth="~1.0 in" />
            <ProjectRow thickness="5 in" spacing="10–12.5 ft" depth="~1.25 in" />
            <ProjectRow thickness="6 in" spacing="12–15 ft" depth="~1.5 in" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete control joint spacing FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How far apart should control joints be in a 4 inch slab?"
              answer="A common estimate is about 8 to 10 feet apart, based on 24 to 30 times the slab thickness in inches."
            />
            <Faq
              question="How deep should saw cuts be in concrete?"
              answer="A common minimum is one quarter of the slab thickness. For a 4 inch slab, that is about 1 inch deep."
            />
            <Faq
              question="Should concrete panels be square?"
              answer="Panels should be as close to square as practical. Long, narrow panels have a higher risk of random cracking."
            />
            <Faq
              question="Can control joints guarantee no cracks?"
              answer="No. Concrete can still crack, but control joints create planned weak points that help guide shrinkage cracks into cleaner, straighter lines."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-driveway-calculator" label="Concrete Driveway Calculator" />
            <RelatedLink href="/construction/concrete-patio-calculator" label="Concrete Patio Calculator" />
            <RelatedLink href="/construction/concrete-sidewalk-calculator" label="Concrete Sidewalk Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
            <RelatedLink href="/construction/concrete-slab-thickness" label="Concrete Slab Thickness Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/rebar-spacing-for-concrete-slab" label="Rebar Spacing Calculator" />
            <RelatedLink href="/construction/wire-mesh-calculator" label="Wire Mesh Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-cure-time" label="Concrete Cure Time Calculator" />
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
  thickness,
  spacing,
  depth,
}: {
  thickness: string;
  spacing: string;
  depth: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
      <span className="font-semibold text-white">{thickness}</span>
      <span>{spacing}</span>
      <span>{depth}</span>
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
