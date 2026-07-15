import Link from "next/link";
import type { Metadata } from "next";
import DecomposedGraniteCalculatorClient from "./DecomposedGraniteCalculatorClient";

export const metadata: Metadata = {
  title: "Decomposed Granite Calculator | Cubic Yards, Tons & Cost",
  description:
    "Calculate decomposed granite for patios, walkways, garden paths, dog runs, landscape areas, and compacted surfaces. Estimate cubic yards, tons, delivery, stabilizer cost, and total cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/decomposed-granite-calculator",
  },
  openGraph: {
    title: "Decomposed Granite Calculator | Numeravo",
    description:
      "Estimate decomposed granite cubic yards, tons, cost, delivery, stabilizer add-ons, and coverage for landscaping, patios, walkways, and compacted paths.",
    url: "https://numeravo.com/construction/decomposed-granite-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decomposed Granite Calculator | Numeravo",
    description:
      "Calculate decomposed granite volume, tons, cost, delivery, stabilizer, and coverage for landscaping and hardscape projects.",
  },
};

export default function DecomposedGraniteCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://numeravo.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Construction",
                    item: "https://numeravo.com/construction",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Decomposed Granite Calculator",
                    item: "https://numeravo.com/construction/decomposed-granite-calculator",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "Decomposed Granite Calculator",
                applicationCategory: "ConstructionApplication",
                operatingSystem: "Web",
                url: "https://numeravo.com/construction/decomposed-granite-calculator",
                description:
                  "Estimate decomposed granite cubic yards, tons, delivery loads, stabilizer cost, and total project cost for patios, walkways, garden paths, dog runs, and compacted landscape surfaces.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I calculate how much decomposed granite I need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Multiply length by width to get square feet, multiply by depth in feet to get cubic feet, divide by 27 to get cubic yards, then add waste and convert to tons using supplier density.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should decomposed granite be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Decomposed granite is often installed about 2 inches deep for decorative cover, 3 inches for walkways, 4 inches for patios, and deeper when used as part of a compacted base system.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons are in a cubic yard of decomposed granite?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Decomposed granite commonly weighs about 1.3 to 1.5 tons per cubic yard, but actual density varies by moisture, compaction, gradation, and supplier.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
            Construction Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Decomposed Granite Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate decomposed granite cubic yards, tons, material cost,
            delivery, stabilizer add-ons, and coverage for patios, walkways,
            garden paths, dog runs, landscape areas, and compacted surfaces.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#decomposed-granite-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Decomposed Granite Calculator
            </a>

            <Link
              href="/construction/river-rock-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Compare River Rock
            </Link>
          </div>
        </div>

        <div id="decomposed-granite-calculator">
          <DecomposedGraniteCalculatorClient />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate decomposed granite
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Decomposed granite is estimated by volume first, then converted to
              tons for ordering. Measure the area, choose an installed depth,
              convert inches to feet, calculate cubic feet, divide by 27 for
              cubic yards, then multiply by tons per cubic yard.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FormulaCard title="Area" text="Length × Width" />
              <FormulaCard title="Cubic Feet" text="Area × Depth in Feet" />
              <FormulaCard title="Cubic Yards" text="Cubic Feet ÷ 27" />
              <FormulaCard title="Estimated Tons" text="Cubic Yards × Tons Per Cubic Yard" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common decomposed granite depths
            </h2>

            <div className="mt-5 space-y-3">
              <DepthRow label="Decorative coverage" value="2 inches" />
              <DepthRow label="Walkways and paths" value="3 inches" />
              <DepthRow label="Patio surface" value="3–4 inches" />
              <DepthRow label="Dog runs / utility areas" value="3–4 inches" />
              <DepthRow label="Compacted base system" value="4–6 inches" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Best uses for decomposed granite
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UseCard
              title="Garden paths"
              text="Decomposed granite creates a natural-looking walking surface for garden paths and low-traffic walkways."
            />
            <UseCard
              title="Patios"
              text="Compacted decomposed granite can be used for informal patio areas, seating zones, and outdoor living spaces."
            />
            <UseCard
              title="Dog runs"
              text="DG is commonly used for dog runs and utility zones because it drains better than many bare soil surfaces."
            />
            <UseCard
              title="Landscape areas"
              text="Use decomposed granite as decorative ground cover where a finer, more compacted surface is preferred."
            />
            <UseCard
              title="Stabilized paths"
              text="Stabilized decomposed granite can reduce shifting and erosion on paths when installed correctly."
            />
            <UseCard
              title="Low-maintenance yards"
              text="DG can help reduce mud, weeds, and maintenance in xeriscape and drought-tolerant landscapes."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related gravel tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel cubic yards, tons, waste, and material cost for general gravel projects."
            />

            <RelatedLink
              href="/construction/pea-gravel-calculator"
              title="Pea Gravel Calculator"
              text="Estimate pea gravel cubic yards, tons, delivery, and cost for patios, walkways, landscaping, and drainage."
            />

            <RelatedLink
              href="/construction/river-rock-calculator"
              title="River Rock Calculator"
              text="Estimate river rock cubic yards, tons, delivery, and cost for landscaping beds, dry creek beds, and drainage."
            />

            <RelatedLink
              href="/construction/crushed-stone-calculator"
              title="Crushed Stone Calculator"
              text="Estimate crushed stone cubic yards, tons, waste, and cost."
            />

            <RelatedLink
              href="/construction/gravel-cost-calculator"
              title="Gravel Cost Calculator"
              text="Estimate gravel project cost using area, depth, cubic yards, tons, price per ton, and delivery."
            />

            <RelatedLink
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel depth, volume, cubic yards, and tons."
            />

            <RelatedLink
              href="/construction/road-base-calculator"
              title="Road Base Calculator"
              text="Estimate road base cubic yards, tons, waste, delivery, and cost."
            />

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="View all Numeravo construction calculators and project guides."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Decomposed granite calculator FAQ
          </h2>

          <div className="mt-5 space-y-4">
            <FAQItem
              question="How do I calculate how much decomposed granite I need?"
              answer="Multiply length by width to get square feet, multiply by depth in feet to get cubic feet, divide by 27 to get cubic yards, then add waste and convert to tons."
            />
            <FAQItem
              question="How deep should decomposed granite be?"
              answer="Use about 2 inches for decorative cover, 3 inches for walkways, 3 to 4 inches for patios and dog runs, and deeper sections for compacted base systems."
            />
            <FAQItem
              question="How much does a cubic yard of decomposed granite weigh?"
              answer="Decomposed granite commonly weighs about 1.3 to 1.5 tons per cubic yard, but supplier density can vary by moisture and compaction."
            />
            <FAQItem
              question="Should I use stabilized decomposed granite?"
              answer="Stabilized decomposed granite can be useful for paths, patios, and areas where erosion or loose material movement is a concern."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function FormulaCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function DepthRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function UseCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <h3 className="text-base font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
  );
}

function RelatedLink({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4 transition hover:border-[#F97316]"
    >
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </Link>
  );
}
