import Link from "next/link";
import GravelDrivewayCostClient from "./GravelDrivewayCostClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gravel Driveway Cost | Estimate Tons, Yards & Project Price",
  description:
    "Estimate gravel driveway cost using driveway size, gravel depth, tons, cubic yards, price per ton, waste allowance, delivery, and project cost factors.",
  alternates: {
    canonical: "https://numeravo.com/construction/gravel-driveway-cost",
  },
  openGraph: {
    title: "Gravel Driveway Cost | Numeravo",
    description:
      "Learn how to estimate gravel driveway cost, including tons, cubic yards, depth, delivery, waste, and material pricing.",
    url: "https://numeravo.com/construction/gravel-driveway-cost",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravel Driveway Cost | Numeravo",
    description:
      "Estimate gravel driveway cost using driveway dimensions, depth, tons, price per ton, and delivery factors.",
  },
};

export default function GravelDrivewayCostPage() {
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
                    name: "Gravel Driveway Cost",
                    item: "https://numeravo.com/construction/gravel-driveway-cost",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I estimate gravel driveway cost?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Estimate driveway gravel volume from length, width, and depth. Convert volume to cubic yards, estimate tons, then multiply by gravel price per ton. Add delivery, grading, compaction, fabric, edging, and labor separately.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What affects gravel driveway cost?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Gravel driveway cost depends on driveway size, gravel depth, material type, price per ton, delivery distance, site preparation, grading, compaction, drainage, and waste allowance.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should a gravel driveway be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A light residential gravel driveway often uses 4 to 6 inches of gravel. Heavy-use driveways, poor soil, or truck traffic may require 6 to 12 inches or multiple compacted layers.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does gravel driveway cost include delivery?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Not always. Gravel material pricing is often listed per ton, while delivery fees, minimum order charges, fuel surcharges, spreading, grading, and compaction may be separate.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much does a gravel driveway cost per square foot?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Gravel driveway cost per square foot depends on gravel depth, price per ton, delivery, site prep, spreading, and compaction. Divide the estimated total project cost by the driveway square footage to estimate cost per square foot.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many truckloads of gravel does a driveway need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Truckloads depend on estimated tons and truck capacity. A small dump truck may carry about 5 tons, a standard dump truck about 10 tons, and a larger dump truck or tri-axle about 15 tons, but capacity varies by supplier and road limits.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is included in a gravel driveway cost estimate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A complete gravel driveway cost estimate may include gravel material, delivery, site prep, grading, drainage work, landscape fabric, spreading, compaction, edging, and waste allowance.",
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
            Gravel Driveway Cost
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate gravel driveway cost using driveway size, gravel depth,
            cubic yards, tons, price per ton, waste allowance, delivery, and
            project preparation factors.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#driveway-cost-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Cost Calculator
            </a>

            <Link
              href="/construction/gravel-driveway-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Gravel Driveway Calculator
            </Link>
          </div>
        </div>

        <div id="driveway-cost-calculator">
          <GravelDrivewayCostClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to estimate gravel driveway cost
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Start by measuring the driveway length and width. Choose a gravel
              depth based on how the driveway will be used. Then calculate
              volume, convert to cubic yards, estimate tons, and multiply by the
              material price per ton.
            </p>

            <div className="mt-5 space-y-4">
              <FormulaBox
                title="Step 1"
                text="Length × Width × Depth = Driveway Gravel Volume"
              />
              <FormulaBox
                title="Step 2"
                text="Cubic Feet ÷ 27 = Cubic Yards"
              />
              <FormulaBox
                title="Step 3"
                text="Cubic Yards × Tons Per Cubic Yard = Estimated Tons"
              />
              <FormulaBox
                title="Step 4"
                text="Estimated Tons × Price Per Ton = Material Cost"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Main driveway cost factors
            </h2>

            <div className="mt-5 space-y-3">
              <CostRow label="Driveway size" value="Length × width" />
              <CostRow label="Gravel depth" value="Commonly 4–12 in" />
              <CostRow label="Material price" value="Usually per ton" />
              <CostRow label="Waste allowance" value="Often 5–10%" />
              <CostRow label="Delivery" value="Often separate" />
              <CostRow label="Site prep" value="Grading/excavation" />
              <CostRow label="Compaction" value="Equipment or labor" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example gravel driveway cost estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a driveway that is 100 feet long, 12 feet wide, and 6 inches
            deep, the volume is 600 cubic feet. That equals about 22.22 cubic
            yards. At 1.4 tons per cubic yard, the driveway needs about 31.11
            tons before waste. If gravel costs $45 per ton, the material cost is
            about $1,400 before delivery and other project costs.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Driveway size" value="100 × 12 ft" />
            <ExampleCard label="Depth" value="6 in" />
            <ExampleCard label="Estimated tons" value="31.11 tons" />
            <ExampleCard label="Material cost" value="$1,400" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Material cost vs total driveway cost
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Gravel material cost is only one part of the project. The final
              driveway cost can increase if the site needs excavation, grading,
              drainage correction, landscape fabric, edging, delivery,
              spreading, or compaction.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Gravel material</li>
              <li>• Delivery fee or minimum order charge</li>
              <li>• Site grading or excavation</li>
              <li>• Drainage improvements</li>
              <li>• Landscape fabric</li>
              <li>• Edging or borders</li>
              <li>• Spreading and compaction</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common gravel driveway depths
            </h2>

            <div className="mt-5 space-y-3">
              <CostRow label="Top dressing existing driveway" value="2–3 in" />
              <CostRow label="Light residential driveway" value="4–6 in" />
              <CostRow label="Standard driveway base" value="6 in" />
              <CostRow label="Heavy-use driveway" value="6–12 in" />
              <CostRow label="Poor soil conditions" value="Layered base" />
              <CostRow label="Truck or equipment access" value="Deeper base" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Ways to reduce gravel driveway cost
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TipCard
              title="Measure accurately"
              text="Small measurement errors can become large cost differences on long driveways."
            />
            <TipCard
              title="Compare local suppliers"
              text="Gravel price per ton and delivery fees can vary by supplier and distance."
            />
            <TipCard
              title="Choose the right depth"
              text="Too little gravel can fail early, but over-ordering increases material cost."
            />
            <TipCard
              title="Plan delivery access"
              text="Easy delivery access can reduce handling, spreading, and labor time."
            />
            <TipCard
              title="Use proper compaction"
              text="Compaction helps the driveway perform better and may reduce future repairs."
            />
            <TipCard
              title="Add waste carefully"
              text="A 5% to 10% waste allowance is useful without overbuying too much material."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related gravel tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate driveway square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating gravel driveway cost."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel volume, cubic yards, tons, waste, and material cost."
            />

            <RelatedLink
              href="/construction/gravel-driveway-calculator"
              title="Gravel Driveway Calculator"
              text="Estimate gravel tons, cubic yards, depth, waste, and cost for driveway projects."
            />

            <RelatedLink
              href="/construction/gravel-cost-per-ton"
              title="Gravel Cost Per Ton"
              text="Learn how gravel price per ton works and estimate material cost."
            />

            <RelatedLink
  href="/construction/gravel-cost-calculator"
  title="Gravel Cost Calculator"
  text="Estimate gravel project cost using area, depth, cubic yards, tons, waste, price per ton, and delivery."
/>
<RelatedLink
  href="/construction/road-base-calculator"
  title="Road Base Calculator"
  text="Estimate road base cubic yards, tons, waste, and cost using the Road Base material preset."
/>

            <RelatedLink
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel volume, depth, cubic yards, tons, and waste."
            />

            <RelatedLink
              href="/construction/crushed-stone-vs-gravel"
              title="Crushed Stone vs Gravel"
              text="Compare crushed stone and gravel for driveway, drainage, and base projects."
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
            Gravel driveway cost FAQ
          </h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I estimate gravel driveway cost?"
              answer="Measure driveway length, width, and gravel depth. Convert the volume to cubic yards, estimate tons, multiply by price per ton, then add delivery, site prep, spreading, and compaction costs separately."
            />

            <FAQItem
              question="What affects gravel driveway cost?"
              answer="Driveway size, gravel depth, gravel type, price per ton, delivery distance, grading, drainage, compaction, and waste allowance all affect final cost."
            />

            <FAQItem
              question="How deep should a gravel driveway be?"
              answer="A light residential driveway often uses 4 to 6 inches of gravel. Heavy-use driveways, weak soil, or truck traffic may require 6 to 12 inches or multiple compacted layers."
            />

            <FAQItem
              question="Does gravel driveway cost include delivery?"
              answer="Not always. Gravel is often priced per ton as material only. Delivery fees, fuel surcharges, minimum order charges, spreading, and compaction may be separate."
            />

            <FAQItem
              question="How much does a gravel driveway cost per square foot?"
              answer="Gravel driveway cost per square foot depends on gravel depth, price per ton, delivery, site prep, spreading, and compaction. Divide the estimated total project cost by the driveway square footage to estimate cost per square foot."
            />

            <FAQItem
              question="How many truckloads of gravel does a driveway need?"
              answer="Truckloads depend on estimated tons and truck capacity. A small dump truck may carry about 5 tons, a standard dump truck about 10 tons, and a larger dump truck or tri-axle about 15 tons, but capacity varies by supplier and road limits."
            />

            <FAQItem
              question="What is included in a gravel driveway cost estimate?"
              answer="A complete gravel driveway cost estimate may include gravel material, delivery, site prep, grading, drainage work, landscape fabric, spreading, compaction, edging, and waste allowance."
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