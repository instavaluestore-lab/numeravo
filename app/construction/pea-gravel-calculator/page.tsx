import Link from "next/link";
import type { Metadata } from "next";
import PeaGravelCalculatorClient from "./PeaGravelCalculatorClient";

export const metadata: Metadata = {
  title: "Pea Gravel Calculator | Cubic Yards, Tons & Cost",
  description:
    "Calculate pea gravel for patios, walkways, landscaping beds, playground areas, drainage, and ground cover. Estimate cubic yards, tons, truckloads, and cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/pea-gravel-calculator",
  },
  openGraph: {
    title: "Pea Gravel Calculator | Numeravo",
    description:
      "Estimate pea gravel cubic yards, tons, cost, delivery, and coverage for landscaping, patios, walkways, and drainage projects.",
    url: "https://numeravo.com/construction/pea-gravel-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pea Gravel Calculator | Numeravo",
    description:
      "Calculate pea gravel volume, tons, cost, delivery, and coverage for landscaping and hardscape projects.",
  },
};

export default function PeaGravelCalculatorPage() {
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
                    name: "Pea Gravel Calculator",
                    item: "https://numeravo.com/construction/pea-gravel-calculator",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "Pea Gravel Calculator",
                applicationCategory: "ConstructionApplication",
                operatingSystem: "Web",
                url: "https://numeravo.com/construction/pea-gravel-calculator",
                description:
                  "Estimate pea gravel cubic yards, tons, delivery loads, and project cost for landscaping, walkways, patios, drainage, and ground cover.",
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
                    name: "How do I calculate how much pea gravel I need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Multiply length by width to get square feet, multiply by depth in feet to get cubic feet, divide by 27 to get cubic yards, then add a waste allowance.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should pea gravel be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Pea gravel is often installed 2 inches deep for decorative coverage, 3 inches for walkways, and 4 inches or more for patios or deeper coverage areas.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons are in a cubic yard of pea gravel?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Pea gravel commonly weighs about 1.3 to 1.4 tons per cubic yard, but actual density varies by supplier, moisture, and stone size.",
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
            Pea Gravel Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate pea gravel cubic yards, tons, material cost, delivery, and
            coverage for landscaping beds, patios, walkways, playground areas,
            drainage zones, and decorative ground cover.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#pea-gravel-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Pea Gravel Calculator
            </a>

            <Link
              href="/construction/gravel-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Open Gravel Calculator
            </Link>
          </div>
        </div>

        <div id="pea-gravel-calculator">
          <PeaGravelCalculatorClient />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate pea gravel
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Pea gravel is estimated by volume first, then converted into tons
              for ordering. Measure the project area, choose a depth, convert
              inches to feet, calculate cubic feet, divide by 27 for cubic
              yards, then multiply by tons per cubic yard.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FormulaCard title="Area" text="Length × Width" />
              <FormulaCard title="Cubic Feet" text="Area × Depth in Feet" />
              <FormulaCard title="Cubic Yards" text="Cubic Feet ÷ 27" />
              <FormulaCard title="Estimated Tons" text="Cubic Yards × Tons Per Cubic Yard" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common pea gravel depths</h2>

            <div className="mt-5 space-y-3">
              <DepthRow label="Decorative landscaping" value="2 inches" />
              <DepthRow label="Walkways and paths" value="3 inches" />
              <DepthRow label="Patio coverage" value="3–4 inches" />
              <DepthRow label="Playground surface" value="4–6 inches" />
              <DepthRow label="Drainage areas" value="Varies by design" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Best uses for pea gravel</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UseCard
              title="Landscaping beds"
              text="Pea gravel creates clean decorative ground cover around planting beds and low-maintenance landscape zones."
            />
            <UseCard
              title="Walkways"
              text="A 3-inch layer can work well for garden paths and pedestrian walkways when edged properly."
            />
            <UseCard
              title="Patios"
              text="Pea gravel patios are budget-friendly, permeable, and fast to install compared with poured hardscape surfaces."
            />
            <UseCard
              title="Drainage"
              text="Pea gravel may be used for some drainage applications, but washed stone size and soil conditions matter."
            />
            <UseCard
              title="Play areas"
              text="Pea gravel can be used in playground or pet areas when depth, containment, and maintenance are planned."
            />
            <UseCard
              title="Ground cover"
              text="It helps reduce mud, improve appearance, and create defined outdoor utility areas."
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
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel depth, volume, cubic yards, and tons."
            />

            <RelatedLink
              href="/construction/gravel-cost-calculator"
              title="Gravel Cost Calculator"
              text="Estimate gravel project cost using area, depth, cubic yards, tons, price per ton, and delivery."
            />

            <RelatedLink
              href="/construction/crushed-stone-calculator"
              title="Crushed Stone Calculator"
              text="Estimate crushed stone cubic yards, tons, waste, and cost."
            />

            <RelatedLink
              href="/construction/crushed-stone-vs-gravel"
              title="Crushed Stone vs Gravel"
              text="Compare crushed stone and gravel for driveways, drainage, landscaping, and base layers."
            />

            <RelatedLink
              href="/construction/road-base-calculator"
              title="Road Base Calculator"
              text="Estimate road base cubic yards, tons, waste, delivery, and cost."
            />

            <RelatedLink
              href="/construction/gravel-driveway-calculator"
              title="Gravel Driveway Calculator"
              text="Estimate gravel driveway tons, cubic yards, depth, waste, and cost."
            />

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="View all Numeravo construction calculators and project guides."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Pea gravel calculator FAQ</h2>

          <div className="mt-5 space-y-4">
            <FAQItem
              question="How do I calculate how much pea gravel I need?"
              answer="Multiply length by width to get square feet, multiply by depth in feet to get cubic feet, divide by 27 to get cubic yards, then add waste."
            />
            <FAQItem
              question="How deep should pea gravel be?"
              answer="Use about 2 inches for decorative cover, 3 inches for walkways, and 4 inches or more for patios, play areas, or deeper coverage."
            />
            <FAQItem
              question="How much does a cubic yard of pea gravel weigh?"
              answer="Pea gravel commonly weighs about 1.3 to 1.4 tons per cubic yard, but supplier density can vary."
            />
            <FAQItem
              question="Should I order pea gravel by the ton or cubic yard?"
              answer="Many suppliers sell by the ton, while calculators often start with cubic yards. Convert cubic yards to tons using the supplier density."
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
