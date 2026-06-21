import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gravel Cost Calculator | Estimate Tons, Yards & Total Cost",
  description:
    "Use this gravel cost calculator guide to estimate gravel tons, cubic yards, waste, price per ton, delivery, and total project cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/gravel-cost-calculator",
  },
  openGraph: {
    title: "Gravel Cost Calculator | Numeravo",
    description:
      "Estimate gravel cost using project size, depth, cubic yards, tons, waste allowance, price per ton, and delivery factors.",
    url: "https://numeravo.com/construction/gravel-cost-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravel Cost Calculator | Numeravo",
    description:
      "Estimate gravel tons, cubic yards, waste, price per ton, and total material cost.",
  },
};

export default function GravelCostCalculatorPage() {
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
                    name: "Gravel Cost Calculator",
                    item: "https://numeravo.com/construction/gravel-cost-calculator",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I calculate gravel cost?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Calculate gravel volume from length, width, and depth. Convert cubic feet to cubic yards, estimate tons, multiply by price per ton, then add waste, delivery, and project preparation costs.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What information do I need for a gravel cost estimate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "You need project length, width, depth, gravel density or tons per cubic yard, price per ton, waste percentage, and any delivery or labor costs.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I calculate gravel by ton or cubic yard?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Gravel is often sold by the ton, but project volume is usually measured in cubic yards. A good gravel cost estimate calculates both cubic yards and tons.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I include waste in gravel cost?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. A 5% to 10% waste allowance is commonly useful for uneven ground, compaction, spreading loss, and measurement differences.",
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
            Gravel Cost Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Gravel Cost Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate gravel cost using project dimensions, gravel depth, cubic
            yards, tons, waste allowance, price per ton, delivery, and basic
            project factors.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/construction/gravel-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Open Gravel Calculator
            </Link>

            <Link
              href="/construction/gravel-cost-per-ton"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Gravel Cost Per Ton Guide
            </Link>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How a gravel cost calculator works
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              A gravel cost calculator starts with project size and gravel
              depth. It converts the area into volume, converts volume into
              cubic yards and tons, then estimates cost using price per ton or
              price per cubic yard.
            </p>

            <div className="mt-5 space-y-4">
              <FormulaBox
                title="Volume"
                text="Length × Width × Depth = Cubic Feet"
              />
              <FormulaBox title="Cubic yards" text="Cubic Feet ÷ 27" />
              <FormulaBox
                title="Estimated tons"
                text="Cubic Yards × Tons Per Cubic Yard"
              />
              <FormulaBox
                title="Material cost"
                text="Estimated Tons × Price Per Ton"
              />
              <FormulaBox
                title="Total estimate"
                text="Material Cost + Delivery + Labor + Extra Project Costs"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Inputs you need</h2>

            <div className="mt-5 space-y-3">
              <CostRow label="Length" value="Project length" />
              <CostRow label="Width" value="Project width" />
              <CostRow label="Depth" value="Gravel thickness" />
              <CostRow label="Density" value="Tons per cubic yard" />
              <CostRow label="Waste" value="Usually 5–10%" />
              <CostRow label="Price" value="Per ton or yard" />
              <CostRow label="Delivery" value="Optional add-on" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example gravel cost estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a 20 foot by 20 foot area with 4 inches of gravel, the volume is
            about 133.33 cubic feet. That equals about 4.94 cubic yards. If the
            gravel weighs 1.4 tons per cubic yard, the project needs about 6.91
            tons before waste. With 10% waste, the estimate becomes about 7.6
            tons.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Project size" value="20 × 20 ft" />
            <ExampleCard label="Depth" value="4 in" />
            <ExampleCard label="With waste" value="7.6 tons" />
            <ExampleCard label="At $45/ton" value="$342" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              What affects gravel cost?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Gravel cost depends on more than square footage. Depth, gravel
              type, compaction, delivery distance, local supply, and preparation
              work all affect the final estimate.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Project length and width</li>
              <li>• Gravel depth</li>
              <li>• Gravel type and size</li>
              <li>• Tons per cubic yard</li>
              <li>• Waste allowance</li>
              <li>• Delivery distance</li>
              <li>• Site preparation or grading</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common gravel cost uses
            </h2>

            <div className="mt-5 space-y-3">
              <CostRow label="Driveways" value="Base and top layer" />
              <CostRow label="Walkways" value="Decorative gravel" />
              <CostRow label="Patios" value="Base or finish layer" />
              <CostRow label="Drainage" value="French drains" />
              <CostRow label="Landscaping" value="Beds and borders" />
              <CostRow label="Concrete prep" value="Compacted base" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Gravel cost estimating tips
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TipCard
              title="Measure in feet"
              text="Use consistent units for length, width, and depth before converting to cubic yards."
            />
            <TipCard
              title="Convert depth correctly"
              text="Four inches is 0.333 feet. Six inches is 0.5 feet. Depth errors can change the estimate quickly."
            />
            <TipCard
              title="Add waste"
              text="Include a small waste allowance for uneven ground, spreading loss, and compaction."
            />
            <TipCard
              title="Check material density"
              text="Different gravel types can have different tons-per-yard values."
            />
            <TipCard
              title="Separate delivery"
              text="Delivery may be priced separately from the material cost."
            />
            <TipCard
              title="Use related calculators"
              text="Use the driveway calculator for driveway-specific estimates and the cost-per-ton guide for pricing."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related gravel tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel volume, cubic yards, tons, waste, and material cost."
            />

            <RelatedLink
              href="/construction/gravel-driveway-calculator"
              title="Gravel Driveway Calculator"
              text="Estimate gravel volume, tons, depth, waste, and cost for driveway projects."
            />

            <RelatedLink
              href="/construction/gravel-driveway-cost"
              title="Gravel Driveway Cost"
              text="Estimate gravel driveway cost using size, depth, tons, delivery, and price per ton."
            />

            <RelatedLink
              href="/construction/gravel-cost-per-ton"
              title="Gravel Cost Per Ton"
              text="Learn how gravel price per ton works and how to estimate material cost."
            />

            <RelatedLink
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel volume, depth, cubic yards, tons, and waste."
            />

            <RelatedLink
              href="/construction/crushed-stone-vs-gravel"
              title="Crushed Stone vs Gravel"
              text="Compare crushed stone and gravel for driveways, drainage, landscaping, and base layers."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Gravel cost calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I calculate gravel cost?"
              answer="Measure the project length, width, and gravel depth. Convert the volume to cubic yards, estimate tons, multiply by price per ton, then add waste, delivery, labor, and site preparation costs."
            />

            <FAQItem
              question="What information do I need for a gravel cost estimate?"
              answer="You need project dimensions, gravel depth, tons per cubic yard, waste percentage, price per ton or cubic yard, and any delivery or labor costs."
            />

            <FAQItem
              question="Should I estimate gravel by ton or cubic yard?"
              answer="Use both. Project size is usually calculated in cubic yards, but gravel is often sold by the ton."
            />

            <FAQItem
              question="Should I include waste in gravel cost?"
              answer="Yes. A 5% to 10% waste allowance helps account for uneven ground, compaction, spreading loss, and small measurement differences."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function FormulaBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function ExampleCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <p className="text-sm text-[#A0AEC0]">{label}</p>
      <p className="mt-2 text-xl font-bold text-[#F97316]">{value}</p>
    </div>
  );
}

function TipCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p>
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
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5 transition hover:border-[#F97316]"
    >
      <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </Link>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[#1F2937] pb-5 last:border-b-0 last:pb-0">
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
  );
}