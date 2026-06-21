import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gravel Cost Per Ton | Estimate Gravel Price & Project Cost",
  description:
    "Learn how gravel cost per ton works and estimate gravel material cost for driveways, patios, walkways, drainage, landscaping, and concrete base layers.",
  alternates: {
    canonical: "https://numeravo.com/construction/gravel-cost-per-ton",
  },
  openGraph: {
    title: "Gravel Cost Per Ton | Numeravo",
    description:
      "Estimate gravel cost per ton, total tons needed, waste allowance, delivery factors, and project material cost.",
    url: "https://numeravo.com/construction/gravel-cost-per-ton",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravel Cost Per Ton | Numeravo",
    description:
      "Estimate gravel price per ton and total project material cost for driveway, patio, walkway, and base projects.",
  },
};

export default function GravelCostPerTonPage() {
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
                    name: "Gravel Cost Per Ton",
                    item: "https://numeravo.com/construction/gravel-cost-per-ton",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I estimate gravel cost per ton?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Estimate the total tons of gravel needed, then multiply by the gravel price per ton. Delivery, taxes, labor, equipment, and site preparation may add to the final project cost.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What affects gravel price per ton?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Gravel price per ton can vary by material type, local supplier pricing, delivery distance, order size, availability, season, and whether the gravel is decorative, crushed stone, washed stone, or base material.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons of gravel do I need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Calculate gravel volume using length, width, and depth, convert to cubic yards, then multiply cubic yards by tons per cubic yard. A common planning estimate is about 1.4 tons per cubic yard, but actual density varies.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does gravel cost per ton include delivery?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Usually not. Gravel cost per ton often refers to material only. Delivery fees, fuel surcharges, minimum order charges, taxes, spreading, and compaction are usually separate.",
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
            Gravel Cost Per Ton
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Learn how gravel cost per ton works and estimate material cost for
            driveways, patios, walkways, drainage, landscaping, and concrete
            base layer projects.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/construction/gravel-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Open Gravel Calculator
            </Link>

            <Link
              href="/construction/how-much-gravel-do-i-need"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              How Much Gravel Do I Need?
            </Link>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate gravel cost per ton
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              To estimate gravel material cost, first calculate the total tons
              of gravel needed. Then multiply the estimated tons by the gravel
              price per ton from your supplier. Add delivery, taxes, equipment,
              labor, and site preparation separately.
            </p>

            <div className="mt-5 space-y-4">
              <FormulaBox
                title="Step 1"
                text="Length × Width × Depth = Gravel Volume"
              />
              <FormulaBox
                title="Step 2"
                text="Cubic Yards × Tons Per Cubic Yard = Estimated Tons"
              />
              <FormulaBox
                title="Step 3"
                text="Estimated Tons × Price Per Ton = Material Cost"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common gravel cost factors
            </h2>

            <div className="mt-5 space-y-3">
              <CostFactor label="Gravel type" value="Base vs decorative" />
              <CostFactor label="Order size" value="Bulk orders may vary" />
              <CostFactor label="Delivery distance" value="Can add fees" />
              <CostFactor label="Supplier pricing" value="Local variation" />
              <CostFactor label="Material density" value="Changes tons needed" />
              <CostFactor label="Waste allowance" value="Often 5–10%" />
              <CostFactor label="Site preparation" value="Usually separate" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example gravel cost estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Suppose your project needs 10 tons of gravel and your supplier
            charges $45 per ton. The material estimate is 10 × $45, or $450,
            before delivery, taxes, spreading, compaction, labor, or equipment
            rental.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Estimated gravel" value="10 tons" />
            <ExampleCard label="Price per ton" value="$45" />
            <ExampleCard label="Material cost" value="$450" />
            <ExampleCard label="Delivery" value="Separate" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Material cost vs total project cost
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Gravel cost per ton usually only covers the material price. Your
              total project cost may be higher if you need delivery, grading,
              excavation, landscape fabric, edging, spreading, compaction, or
              equipment rental.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Gravel material</li>
              <li>• Delivery fee or minimum order charge</li>
              <li>• Taxes and supplier fees</li>
              <li>• Excavation or grading</li>
              <li>• Landscape fabric or edging</li>
              <li>• Spreading and leveling</li>
              <li>• Compaction equipment</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Projects that use gravel pricing
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Gravel cost per ton is useful when comparing supplier quotes or
              estimating projects where material is ordered by weight instead of
              by volume.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Gravel driveways</li>
              <li>• Patio and paver bases</li>
              <li>• Concrete slab base layers</li>
              <li>• Walkways and paths</li>
              <li>• Drainage trenches</li>
              <li>• Landscape gravel beds</li>
              <li>• Shed pads and equipment pads</li>
            </ul>
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
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel volume, depth, cubic yards, tons, and waste."
            />

            <RelatedLink
              href="/construction/gravel-driveway-calculator"
              title="Gravel Driveway Calculator"
              text="Estimate gravel tons, cubic yards, depth, waste, and cost for driveway projects."
            />

            <RelatedLink
  href="/construction/gravel-cost-calculator"
  title="Gravel Cost Calculator"
  text="Estimate gravel project cost using area, depth, cubic yards, tons, waste, price per ton, and delivery."
/>

            <RelatedLink
  href="/construction/gravel-driveway-cost"
  title="Gravel Driveway Cost"
  text="Estimate total driveway cost using gravel depth, tons, price per ton, delivery, and project factors."
/>

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and cost for slabs, footings, piers, and pads."
            />

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="View all Numeravo construction calculators and project guides."
            />

          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Gravel cost FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I estimate gravel cost per ton?"
              answer="Estimate the total tons of gravel needed, then multiply that number by the gravel price per ton. Add delivery, taxes, labor, equipment, and site preparation separately."
            />

            <FAQItem
              question="What affects gravel price per ton?"
              answer="Gravel price can vary by material type, local supplier, delivery distance, order size, availability, and whether the material is base gravel, crushed stone, washed stone, or decorative gravel."
            />

            <FAQItem
              question="How many tons of gravel do I need?"
              answer="Calculate project volume from length, width, and depth. Convert to cubic yards, then multiply by tons per cubic yard. A common planning estimate is 1.4 tons per cubic yard."
            />

            <FAQItem
              question="Does gravel cost per ton include delivery?"
              answer="Usually no. Gravel cost per ton is often material only. Delivery fees, minimum order charges, fuel surcharges, taxes, spreading, and compaction may be separate."
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

function CostFactor({ label, value }: { label: string; value: string }) {
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