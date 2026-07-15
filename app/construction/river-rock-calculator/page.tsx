import Link from "next/link";
import type { Metadata } from "next";
import RiverRockCalculatorClient from "./RiverRockCalculatorClient";

export const metadata: Metadata = {
  title: "River Rock Calculator | Cubic Yards, Tons & Cost",
  description:
    "Calculate river rock for landscaping beds, dry creek beds, drainage areas, borders, walkways, and decorative ground cover. Estimate cubic yards, tons, delivery, and cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/river-rock-calculator",
  },
  openGraph: {
    title: "River Rock Calculator | Numeravo",
    description:
      "Estimate river rock cubic yards, tons, cost, delivery, and coverage for landscaping, drainage, dry creek beds, and decorative projects.",
    url: "https://numeravo.com/construction/river-rock-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "River Rock Calculator | Numeravo",
    description:
      "Calculate river rock volume, tons, cost, delivery, and coverage for landscaping and drainage projects.",
  },
};

export default function RiverRockCalculatorPage() {
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
                    name: "River Rock Calculator",
                    item: "https://numeravo.com/construction/river-rock-calculator",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "River Rock Calculator",
                applicationCategory: "ConstructionApplication",
                operatingSystem: "Web",
                url: "https://numeravo.com/construction/river-rock-calculator",
                description:
                  "Estimate river rock cubic yards, tons, delivery loads, and project cost for landscaping beds, dry creek beds, drainage areas, borders, walkways, and decorative ground cover.",
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
                    name: "How do I calculate how much river rock I need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Multiply length by width to get square feet, multiply by depth in feet to get cubic feet, divide by 27 to get cubic yards, then add waste and convert to tons using supplier density.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should river rock be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "River rock is often installed 2 inches deep for decorative cover, 3 inches for landscape beds, 4 inches for dry creek beds, and 6 inches or more for some drainage areas.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons are in a cubic yard of river rock?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "River rock commonly weighs about 1.3 to 1.5 tons per cubic yard, but actual density varies by stone size, moisture, and supplier.",
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
            River Rock Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate river rock cubic yards, tons, material cost, delivery, and
            coverage for landscaping beds, dry creek beds, drainage zones,
            borders, walkways, and decorative ground cover.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#river-rock-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use River Rock Calculator
            </a>

            <Link
              href="/construction/pea-gravel-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Compare Pea Gravel
            </Link>
          </div>
        </div>

        <div id="river-rock-calculator">
          <RiverRockCalculatorClient />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate river rock
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              River rock is estimated by volume first, then converted into tons
              for ordering. Measure the area, choose an installed depth, convert
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
            <h2 className="text-2xl font-semibold">Common river rock depths</h2>

            <div className="mt-5 space-y-3">
              <DepthRow label="Decorative coverage" value="2 inches" />
              <DepthRow label="Landscape beds" value="3 inches" />
              <DepthRow label="Dry creek beds" value="4 inches" />
              <DepthRow label="Drainage areas" value="4–6 inches" />
              <DepthRow label="Large river rock" value="Depth varies by stone size" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Best uses for river rock</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UseCard
              title="Dry creek beds"
              text="River rock is commonly used to create decorative drainage swales and dry creek bed features."
            />
            <UseCard
              title="Landscaping beds"
              text="Smooth rounded rock creates a finished landscape look around shrubs, trees, and low-maintenance beds."
            />
            <UseCard
              title="Drainage areas"
              text="River rock can help control splash, runoff, and erosion when installed over proper fabric and base preparation."
            />
            <UseCard
              title="Decorative borders"
              text="Use river rock along walkways, patios, foundations, and planting borders for clean visual separation."
            />
            <UseCard
              title="Walkway accents"
              text="River rock can border paths or fill low-traffic decorative zones, though it may shift under foot traffic."
            />
            <UseCard
              title="Ground cover"
              text="It helps reduce mud, improve appearance, and create durable exterior coverage areas."
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
          <h2 className="text-2xl font-semibold">River rock calculator FAQ</h2>

          <div className="mt-5 space-y-4">
            <FAQItem
              question="How do I calculate how much river rock I need?"
              answer="Multiply length by width to get square feet, multiply by depth in feet to get cubic feet, divide by 27 to get cubic yards, then add waste and convert to tons."
            />
            <FAQItem
              question="How deep should river rock be?"
              answer="Use about 2 inches for decorative cover, 3 inches for landscape beds, 4 inches for dry creek beds, and 4 to 6 inches for some drainage areas."
            />
            <FAQItem
              question="How much does a cubic yard of river rock weigh?"
              answer="River rock commonly weighs about 1.3 to 1.5 tons per cubic yard, but supplier density can vary by stone size and moisture."
            />
            <FAQItem
              question="Is river rock good for drainage?"
              answer="River rock can work well in decorative drainage areas, dry creek beds, and runoff zones, but proper slope, fabric, base preparation, and outlet design still matter."
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
