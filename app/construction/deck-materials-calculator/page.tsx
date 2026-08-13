import type { Metadata } from "next";
import Link from "next/link";
import DeckMaterialsCalculatorClient from "./DeckMaterialsCalculatorClient";

const canonicalUrl =
  "https://numeravo.com/construction/deck-materials-calculator";

export const metadata: Metadata = {
  title: "Deck Materials Calculator | Boards, Framing & Cost",
  description:
    "Estimate deck boards, joists, beams, posts, footings, concrete, ledger, fasteners, railing, stairs, waste, and material cost.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Deck Materials Calculator | Numeravo",
    description:
      "Calculate preliminary decking, framing, posts, footings, railing, stairs, hardware, and material costs.",
    url: canonicalUrl,
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deck Materials Calculator | Numeravo",
    description:
      "Estimate deck boards, preliminary framing quantities, railing, stairs, and material cost.",
  },
};

const faqItems = [
  {
    question: "How do I calculate how many deck boards I need?",
    answer:
      "Determine the number of board courses from the deck span, actual board width, and gap. Multiply by the number of stock-length segments required for each course, then add waste and round up.",
  },
  {
    question: "How much decking waste should I add?",
    answer:
      "Ten percent is a common planning allowance. Diagonal decking, picture-frame borders, stairs, complex shapes, defects, butt joints, and future repairs can require more.",
  },
  {
    question: "Can this calculator determine deck joist and beam sizes?",
    answer:
      "No. It estimates quantities from user-entered spacing, stock lengths, beam lines, plies, and post spacing. Structural member sizes and spans require code-compliant design for the site and loads.",
  },
  {
    question: "How are deck posts and footings estimated?",
    answer:
      "The calculator divides each assumed beam length by the entered maximum post spacing, rounds up, and adds an end post. It assigns one footing to each estimated support post.",
  },
  {
    question: "How are deck stairs estimated?",
    answer:
      "The calculator divides deck height by the entered maximum riser height to estimate risers, subtracts one for tread count, and estimates stringers from stair width and maximum stringer spacing.",
  },
  {
    question: "Do I need a permit or engineered deck plans?",
    answer:
      "Requirements vary by location, deck height, attachment, size, loads, soil, frost depth, occupancy, and other conditions. Confirm permits and design requirements with the local authority and qualified professionals.",
  },
];

const applicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Deck Materials Calculator",
  url: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Estimate deck boards, preliminary framing, posts, footings, concrete, fasteners, railing, stairs, and material cost.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function DeckMaterialsCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Link
              href="/construction"
              className="inline-flex rounded-full border border-[#1F2937] bg-[#121826] px-4 py-2 text-sm font-medium text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              ← Construction calculators
            </Link>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Deck quantity and cost planning
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Deck Materials Calculator
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate deck boards, preliminary joists and beams, posts,
              footings, concrete, ledger boards, fasteners, railing, stairs,
              waste, and material cost using editable layout assumptions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Decking" value="Boards + waste" />
              <SummaryCard label="Framing" value="Joists + beams" />
              <SummaryCard label="Project" value="Railing + stairs" />
            </div>
          </div>

          <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              What this calculator includes
            </h2>

            <div className="mt-6 space-y-4">
              <FeatureRow label="Deck geometry" value="area + perimeter" />
              <FeatureRow label="Decking" value="courses + boards" />
              <FeatureRow label="Framing" value="joists + beams" />
              <FeatureRow label="Supports" value="posts + footings" />
              <FeatureRow label="Features" value="railing + stairs" />
            </div>
          </section>
        </section>

        <div className="mt-12">
          <DeckMaterialsCalculatorClient />
        </div>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            How to estimate deck materials
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-[#A0AEC0]">
            Begin with deck dimensions and board direction. Enter actual board
            width, gap, stock lengths, waste, and preliminary framing-layout
            assumptions. Complete the estimate with railing, stairs, hardware,
            concrete, supplier prices, delivery, fees, and tax.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StepCard
              step="Step 1"
              title="Enter deck geometry"
              text="Use deck dimensions or a known area with an assumed width to establish length, area, and perimeter."
            />
            <StepCard
              step="Step 2"
              title="Enter material layout"
              text="Select board direction and enter board, joist, beam, post, ledger, and footing assumptions."
            />
            <StepCard
              step="Step 3"
              title="Add features and pricing"
              text="Enter railing, stair, fastener, hardware, concrete, supplier-price, delivery, fee, and tax information."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            Deck material formulas
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <FormulaCard
              title="Deck area"
              formula="deck length × deck width"
              text="Area is used for fastener quantities, unit cost, and general planning."
            />
            <FormulaCard
              title="Deck-board courses"
              formula="board coverage span ÷ (board width + gap)"
              text="Board width and gap are converted from inches to feet before calculating courses."
            />
            <FormulaCard
              title="Deck boards"
              formula="courses × pieces per course × waste multiplier"
              text="The final result is rounded up to whole stock-length boards."
            />
            <FormulaCard
              title="Joist runs"
              formula="joist layout span ÷ spacing + one end joist"
              text="Joist spacing is converted from inches to feet and the result is rounded up."
            />
            <FormulaCard
              title="Posts per beam"
              formula="beam length ÷ maximum post spacing + one end post"
              text="This is a quantity assumption and not a structural post-spacing design."
            />
            <FormulaCard
              title="Stair risers"
              formula="total deck rise ÷ maximum riser height"
              text="The result is rounded up; actual stair geometry must be designed as a code-compliant system."
            />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <InfoCard title="Decking layout affects quantity">
            <p>
              Board direction, stock length, butt joints, breaker boards,
              picture framing, diagonal installation, stairs, and deck shape
              can substantially change the required decking quantity.
            </p>
            <p className="mt-4">
              Prepare a scaled board layout before ordering expensive decking
              or hidden-fastener systems.
            </p>
          </InfoCard>

          <InfoCard title="Structural quantities require a design">
            <p>
              Joist, beam, post, footing, ledger, connector, guard, and stair
              requirements depend on loads, species, grades, spans, soil,
              frost depth, attachment, exposure, and local code.
            </p>
            <p className="mt-4">
              Use approved plans or a qualified professional to establish the
              structural system before relying on material quantities.
            </p>
          </InfoCard>
        </section>

        <section className="mt-12 rounded-3xl border border-orange-500/50 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Structural and safety notice
          </h2>

          <p className="mt-4 leading-8 text-[#A0AEC0]">
            This calculator is a preliminary material-planning tool and does
            not design or approve deck spans, member sizes, foundations,
            ledgers, flashing, lateral connections, guards, handrails, or
            stairs. Obtain required permits and confirm the complete design
            with local authorities and qualified professionals.
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"
              >
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 leading-7 text-[#A0AEC0]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Related construction calculators
          </h2>

          <p className="mt-3 text-[#A0AEC0]">
            Continue planning lumber, footings, concrete, area, and related
            construction materials.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RelatedLink
              href="/construction/fence-calculator"
              label="Fence Calculator"
            />
            <RelatedLink
              href="/construction/lumber-calculator"
              label="Lumber Calculator"
            />
            <RelatedLink
              href="/construction/concrete-footing-calculator"
              label="Concrete Footing Calculator"
            />
            <RelatedLink
              href="/construction/area-calculator"
              label="Area Calculator"
            />
            <RelatedLink
              href="/construction"
              label="All Construction Calculators"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5">
      <p className="text-sm text-[#A0AEC0]">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function FeatureRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <p className="text-sm font-semibold text-[#F97316]">{step}</p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-[#A0AEC0]">{text}</p>
    </article>
  );
}

function FormulaCard({
  title,
  formula,
  text,
}: {
  title: string;
  formula: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="text-lg font-semibold text-orange-300">{title}</h3>
      <p className="mt-3 font-semibold text-white">{formula}</p>
      <p className="mt-3 leading-7 text-[#A0AEC0]">{text}</p>
    </article>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 leading-8 text-[#A0AEC0]">{children}</div>
    </article>
  );
}

function RelatedLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
    >
      {label}
    </Link>
  );
}
