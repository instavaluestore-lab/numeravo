import Link from "next/link";
import type { Metadata } from "next";
import PaverBaseCalculatorClient from "./PaverBaseCalculatorClient";

export const metadata: Metadata = {
  title: "Paver Base Calculator | Gravel Base, Sand, Tons & Cost",
  description:
    "Calculate paver base gravel, bedding sand, cubic yards, tons, delivery, and cost for patios, walkways, driveways, and hardscape projects.",
  alternates: {
    canonical: "https://numeravo.com/construction/paver-base-calculator",
  },
  openGraph: {
    title: "Paver Base Calculator | Numeravo",
    description:
      "Estimate paver base gravel, bedding sand, cubic yards, tons, delivery, and total project cost for patios, walkways, driveways, and hardscape installations.",
    url: "https://numeravo.com/construction/paver-base-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paver Base Calculator | Numeravo",
    description:
      "Calculate compacted paver base, bedding sand, tons, cubic yards, delivery, and cost.",
  },
};

export default function PaverBaseCalculatorPage() {
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
                    name: "Paver Base Calculator",
                    item: "https://numeravo.com/construction/paver-base-calculator",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "Paver Base Calculator",
                applicationCategory: "ConstructionApplication",
                operatingSystem: "Web",
                url: "https://numeravo.com/construction/paver-base-calculator",
                description:
                  "Estimate compacted paver base gravel, bedding sand, cubic yards, tons, delivery, and total cost for patios, walkways, driveways, and hardscape projects.",
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
                    name: "How do I calculate paver base?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Multiply length by width to get square feet, multiply by base depth in feet to get cubic feet, divide by 27 to get cubic yards, then convert to tons using the material density.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should paver base be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Walkways commonly use about 4 inches of compacted base, patios often use about 6 inches, and driveways may require about 8 inches or more depending on soil and load conditions.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much bedding sand do pavers need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Most paver installations use about 1 inch of bedding sand above the compacted gravel base, but project specifications can vary.",
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
            Paver Base Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate compacted paver base gravel, bedding sand, cubic yards,
            tons, delivery, and total material cost for patios, walkways,
            driveways, paver pads, and hardscape projects.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#paver-base-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Paver Base Calculator
            </a>

            <Link
              href="/construction/road-base-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Compare Road Base
            </Link>
          </div>
        </div>

        <div id="paver-base-calculator">
          <PaverBaseCalculatorClient />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate paver base
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Paver projects need two separate material estimates: compacted
              gravel base and bedding sand. Calculate each layer by area and
              depth, convert cubic feet to cubic yards, then convert cubic yards
              to tons using local supplier density.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FormulaCard title="Area" text="Length × Width" />
              <FormulaCard title="Base Cubic Feet" text="Area × Base Depth in Feet" />
              <FormulaCard title="Sand Cubic Feet" text="Area × Sand Depth in Feet" />
              <FormulaCard title="Cubic Yards" text="Cubic Feet ÷ 27" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common paver base depths
            </h2>

            <div className="mt-5 space-y-3">
              <DepthRow label="Walkways" value="4 inches base" />
              <DepthRow label="Patios" value="6 inches base" />
              <DepthRow label="Driveways" value="8+ inches base" />
              <DepthRow label="Bedding sand" value="1 inch" />
              <DepthRow label="Waste allowance" value="5–10%" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Paver base calculator FAQ
          </h2>

          <div className="mt-5 space-y-4">
            <FAQItem
              question="How much paver base do I need?"
              answer="Measure the project area, multiply by the compacted base depth, divide by 27 to convert cubic feet to cubic yards, then convert cubic yards to tons using your supplier density."
            />
            <FAQItem
              question="How deep should paver base be?"
              answer="A common starting point is 4 inches for walkways, 6 inches for patios, and 8 inches or more for driveways. Soil, drainage, climate, and traffic load can change the required depth."
            />
            <FAQItem
              question="How much bedding sand do I need for pavers?"
              answer="Most paver projects use about 1 inch of bedding sand over the compacted base. The calculator estimates bedding sand separately from the gravel base."
            />
            <FAQItem
              question="Should I include waste?"
              answer="Yes. Add 5 to 10 percent for waste, grading variation, compaction loss, and ordering tolerance."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related construction tools</h2>

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
              href="/construction/road-base-calculator"
              title="Road Base Calculator"
              text="Estimate road base cubic yards, tons, waste, delivery, and cost."
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
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete slab volume, yards, cost, and material needs."
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
