import type { Metadata } from "next";
import Link from "next/link";
import TileCalculatorClient from "./TileCalculatorClient";

const canonicalUrl =
  "https://numeravo.com/construction/tile-calculator";

export const metadata: Metadata = {
  title: "Tile Calculator | Boxes, Thinset, Grout & Cost",
  description:
    "Estimate tile area, waste, tiles, boxes, thinset, grout, backer board, edge trim, purchased coverage, overage, and material cost.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Tile Calculator | Numeravo",
    description:
      "Calculate tile boxes, pieces, waste, thinset, grout, backer board, trim, coverage, and material cost.",
    url: canonicalUrl,
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tile Calculator | Numeravo",
    description:
      "Estimate tile quantities, setting materials, grout, backer board, trim, and cost.",
  },
};

const faqItems = [
  {
    question: "How do I calculate how much tile I need?",
    answer:
      "Calculate the net tile area, add a suitable waste allowance, divide by the coverage printed on one tile box, and round up to a whole box.",
  },
  {
    question: "How much waste should I add for tile?",
    answer:
      "Ten percent is common for straightforward layouts. Diagonal patterns, mosaics, complex cuts, matching veins or patterns, breakage, tile variation, and future repairs may require more.",
  },
  {
    question: "Should I buy tile by piece or by box?",
    answer:
      "Use the exact square-foot coverage per box for purchasing. Individual tile dimensions are useful for estimating pieces, but boxes may contain different quantities.",
  },
  {
    question: "How much thinset or tile adhesive do I need?",
    answer:
      "Coverage depends on the product, trowel notch, tile size, substrate flatness, application method, and required mortar thickness. Enter the coverage specified for the exact installation.",
  },
  {
    question: "How much grout do I need?",
    answer:
      "Grout coverage varies significantly with tile dimensions, tile thickness, grout-joint width, and product density. Use the manufacturer's coverage chart for the selected tile and joint.",
  },
  {
    question: "Do I need backer board or waterproofing?",
    answer:
      "Requirements depend on the substrate, installation location, moisture exposure, tile assembly, manufacturer instructions, and local code. Backer board alone is not automatically a waterproofing system.",
  },
];

const applicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tile Calculator",
  url: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Estimate tile boxes, pieces, waste, thinset, grout, backer board, edge trim, coverage, and material cost.",
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

export default function TileCalculatorPage() {
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
              Tile quantity and material planning
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Tile Calculator
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate floor, wall, backsplash, shower, and countertop tile.
              Calculate pieces, boxes, waste, thinset, grout, backer board,
              edge trim, purchased coverage, overage, and material cost.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Tile surfaces" value="Floor + wall" />
              <SummaryCard label="Purchase order" value="Tiles + boxes" />
              <SummaryCard label="Installation" value="Mortar + grout" />
            </div>
          </div>

          <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              What this calculator includes
            </h2>

            <div className="mt-6 space-y-4">
              <FeatureRow label="Tile quantity" value="area + waste" />
              <FeatureRow label="Tile order" value="pieces + boxes" />
              <FeatureRow label="Setting materials" value="mortar + grout" />
              <FeatureRow label="Substrate and trim" value="board + edges" />
              <FeatureRow label="Cost estimate" value="materials + fees" />
            </div>
          </section>
        </section>

        <div className="mt-12">
          <TileCalculatorClient />
        </div>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            How to calculate tile for a project
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-[#A0AEC0]">
            Measure the surfaces that will receive tile, subtract openings,
            add waste, and divide the purchase area by the exact coverage
            printed on one box. Calculate mortar, grout, backer board, and
            trim using the coverage or package information for each product.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StepCard
              step="Step 1"
              title="Measure tile area"
              text="Enter surface dimensions, identical-surface quantity, additional area, deductions, or a known tile area."
            />
            <StepCard
              step="Step 2"
              title="Add tile and waste"
              text="Enter tile dimensions, grout-joint width, waste, and exact square-foot coverage per box."
            />
            <StepCard
              step="Step 3"
              title="Add installation materials"
              text="Enter mortar, grout, backer-board, trim, accessory, pricing, tax, delivery, and fee information."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-10">
          <h2 className="text-3xl font-bold">
            Tile calculation formulas
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <FormulaCard
              title="Tile surface area"
              formula="surface length × surface width × number of surfaces"
              text="Additional tile areas can be added and openings or permanent areas deducted."
            />
            <FormulaCard
              title="Purchase tile area"
              formula="net tile area × (1 + waste percentage ÷ 100)"
              text="Waste helps cover cuts, breakage, layout, variation, and future repairs."
            />
            <FormulaCard
              title="Tile boxes"
              formula="purchase tile area ÷ box coverage, rounded up"
              text="Use the exact square-foot coverage shown on the selected product."
            />
            <FormulaCard
              title="Estimated individual tiles"
              formula="purchase tile area ÷ tile face area, rounded up"
              text="Box coverage controls purchasing even when an individual piece estimate is displayed."
            />
            <FormulaCard
              title="Mortar and grout packages"
              formula="purchase tile area ÷ applicable product coverage, rounded up"
              text="Coverage must correspond to the tile size, joint, trowel, substrate, and installation."
            />
            <FormulaCard
              title="Edge-trim pieces"
              formula="required trim length ÷ piece length, rounded up"
              text="Measure exposed tile edges and use the purchasable length of the selected trim."
            />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <InfoCard title="Use product-specific coverage">
            <p>
              Tile box coverage and piece counts differ by manufacturer and
              product. Mortar and grout coverage also changes with tile size,
              thickness, trowel notch, joint width, and substrate condition.
            </p>
            <p className="mt-4">
              Use packaging, technical data sheets, and manufacturer coverage
              tools for the products being installed.
            </p>
          </InfoCard>

          <InfoCard title="Plan pattern and color variation">
            <p>
              Diagonal layouts, borders, mosaics, offsets, niches, corners,
              vein matching, and patterned tile can substantially increase
              cuts and waste.
            </p>
            <p className="mt-4">
              Confirm caliber, shade, dye lot, production run, and acceptable
              variation before installation begins.
            </p>
          </InfoCard>
        </section>

        <section className="mt-12 rounded-3xl border border-orange-500/50 bg-orange-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-300">
            Substrate and waterproofing notice
          </h2>

          <p className="mt-4 leading-8 text-[#A0AEC0]">
            This calculator provides a material-planning estimate. Confirm
            structural support, substrate preparation, deflection, movement
            joints, waterproofing, drainage, mortar compatibility, grout,
            sealant, cure times, and installation requirements with product
            manufacturers, local code, and qualified tile professionals.
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
            Continue planning flooring, area, drywall, and other interior
            construction materials.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RelatedLink
              href="/construction/flooring-calculator"
              label="Flooring Calculator"
            />
            <RelatedLink
              href="/construction/area-calculator"
              label="Area Calculator"
            />
            <RelatedLink
              href="/construction/drywall-calculator"
              label="Drywall Calculator"
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
