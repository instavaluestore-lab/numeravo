import Link from "next/link";
import RoadBaseCalculatorClient from "./RoadBaseCalculatorClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Road Base Calculator | Estimate Tons, Yards & Cost",
  description:
    "Use this road base calculator guide to estimate cubic yards, tons, waste, and cost. Open the Numeravo Gravel Calculator and select Road Base.",
  alternates: {
    canonical: "https://numeravo.com/construction/road-base-calculator",
  },
  openGraph: {
    title: "Road Base Calculator | Numeravo",
    description:
      "Estimate road base volume, cubic yards, tons, waste, and cost for driveways, parking pads, gravel bases, and compacted sub-base layers.",
    url: "https://numeravo.com/construction/road-base-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Road Base Calculator | Numeravo",
    description:
      "Estimate road base cubic yards, tons, waste, and material cost using the Numeravo Gravel Calculator.",
  },
};

export default function RoadBaseCalculatorPage() {
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
                    name: "Road Base Calculator",
                    item: "https://numeravo.com/construction/road-base-calculator",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I calculate road base?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Measure the length, width, and depth of the area. Convert depth to feet for imperial projects, multiply length by width by depth to get cubic feet, divide by 27 to get cubic yards, then multiply by tons per cubic yard.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I use the gravel calculator for road base?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Open the Numeravo Gravel Calculator and select the Road Base material preset to estimate cubic yards, tons, waste, and material cost.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should road base be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Road base depth depends on traffic, soil, drainage, and project type. Light-use areas may use 4 to 6 inches, while driveways, parking pads, and poor soil conditions may need deeper compacted layers.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should road base include waste?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. A 5% to 10% waste allowance is commonly useful for compaction, uneven grade, spreading loss, and measurement differences.",
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
            Road Base Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Road Base Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate road base volume, cubic yards, tons, waste allowance, and
            material cost for driveways, parking pads, gravel roads, compacted
            sub-base layers, and site preparation projects.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#road-base-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Road Base Calculator
            </a>

            <Link
              href="/construction/gravel-cost-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Gravel Cost Calculator
            </Link>
          </div>
        </div>

        <div id="road-base-calculator">
          <RoadBaseCalculatorClient />
        </div>

        <section className="mt-12 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Use the Gravel Calculator for road base
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Numeravo uses one upgraded gravel and stone calculator instead of
            duplicate calculators for each material. To estimate road base, open
            the Gravel Calculator and select the <strong>Road Base</strong>{" "}
            material preset. The calculator will estimate cubic yards, tons,
            waste-adjusted quantity, and material cost.
          </p>

          <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              Recommended workflow
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <StepCard
                number="1"
                title="Open calculator"
                text="Go to the Gravel Calculator."
              />
              <StepCard
                number="2"
                title="Select material"
                text="Choose Road Base."
              />
              <StepCard
                number="3"
                title="Enter dimensions"
                text="Add length, width, and depth."
              />
              <StepCard
                number="4"
                title="Review results"
                text="Check yards, tons, waste, and cost."
              />
            </div>

            <Link
              href="/construction/gravel-calculator"
              className="mt-6 inline-block rounded-xl bg-[#F97316] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Road Base Preset
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to estimate road base
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Road base estimates start with the project area and compacted
              depth. Once volume is calculated, convert to cubic yards and then
              estimate tons using the material density.
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
                title="With waste"
                text="Estimated Tons × Waste Multiplier"
              />
              <FormulaBox
                title="Material cost"
                text="Final Tons × Price Per Ton"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common inputs</h2>

            <div className="mt-5 space-y-3">
              <InfoRow label="Length" value="Project length" />
              <InfoRow label="Width" value="Project width" />
              <InfoRow label="Depth" value="Base thickness" />
              <InfoRow label="Density" value="Tons per cubic yard" />
              <InfoRow label="Waste" value="Usually 5–10%" />
              <InfoRow label="Price" value="Per ton" />
              <InfoRow label="Delivery" value="Separate cost" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example road base estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a 40 foot by 12 foot driveway base with 6 inches of road base,
            the volume is about 240 cubic feet. That equals about 8.89 cubic
            yards. If road base weighs about 1.5 tons per cubic yard, the
            project needs about 13.33 tons before waste. With 10% waste,
            estimate about 14.67 tons.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Project size" value="40 × 12 ft" />
            <ExampleCard label="Depth" value="6 in" />
            <ExampleCard label="With waste" value="14.67 tons" />
            <ExampleCard label="At $42/ton" value="$616" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common road base uses</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Road base is commonly used when a project needs a compacted,
              load-bearing layer below the finished surface. It is useful for
              driveways, parking pads, gravel roads, paver bases, and site prep.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Gravel driveway base layers</li>
              <li>• Parking pad preparation</li>
              <li>• Private road and access road base</li>
              <li>• Paver patio and walkway sub-base</li>
              <li>• Concrete slab base preparation</li>
              <li>• Equipment access areas</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common road base depths</h2>

            <div className="mt-5 space-y-3">
              <InfoRow label="Light walkway base" value="3–4 in" />
              <InfoRow label="Patio or paver base" value="4–6 in" />
              <InfoRow label="Light driveway base" value="4–6 in" />
              <InfoRow label="Standard driveway base" value="6–8 in" />
              <InfoRow label="Heavy-use driveway" value="8–12 in" />
              <InfoRow label="Poor soil conditions" value="Layered base" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Road base estimating tips
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TipCard
              title="Use compacted depth"
              text="Estimate based on the final compacted depth needed for the project."
            />
            <TipCard
              title="Add waste"
              text="Use 5% to 10% waste for uneven ground, spreading loss, and compaction differences."
            />
            <TipCard
              title="Check local material"
              text="Road base density can vary by supplier, aggregate type, and moisture content."
            />
            <TipCard
              title="Plan for compaction"
              text="Road base usually performs best when installed in compacted layers."
            />
            <TipCard
              title="Consider drainage"
              text="Poor drainage can reduce base performance and may require extra preparation."
            />
            <TipCard
              title="Separate delivery"
              text="Delivery, spreading, grading, and equipment costs may be separate from material cost."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related gravel tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating road base volume and tons."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, pea gravel, river rock, paver base, and drainage rock."
            />

            <RelatedLink
              href="/construction/gravel-cost-calculator"
              title="Gravel Cost Calculator"
              text="Estimate gravel project cost using area, depth, cubic yards, tons, waste, price per ton, and delivery."
            />

            <RelatedLink
              href="/construction/crushed-stone-calculator"
              title="Crushed Stone Calculator"
              text="Estimate crushed stone cubic yards, tons, waste, and cost using the Crushed Stone material preset."
            />

            <RelatedLink
  href="/construction/how-to-prepare-ground-for-concrete-slab"
  title="How to Prepare Ground for Concrete Slab"
  text="Learn excavation, grading, gravel base, compaction, forms, and final slab prep steps."
/>

            <RelatedLink
  href="/construction/base-for-concrete-slab-depth"
  title="Base for Concrete Slab Depth"
  text="Learn common road base, gravel, and crushed stone depths for concrete slabs, patios, driveways, and shed pads."
/>

            <RelatedLink
              href="/construction/crushed-stone-vs-gravel"
              title="Crushed Stone vs Gravel"
              text="Compare crushed stone and gravel for driveways, drainage, landscaping, and base layers."
            />

            <RelatedLink
              href="/construction/gravel-driveway-cost"
              title="Gravel Driveway Cost"
              text="Estimate total driveway cost using size, depth, tons, delivery, and material price."
            />

            <RelatedLink
              href="/construction/gravel-cost-per-ton"
              title="Gravel Cost Per Ton"
              text="Learn how gravel and road base price per ton affects total project cost."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Road base calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I calculate road base?"
              answer="Measure length, width, and depth. Multiply them to get cubic feet, divide by 27 to get cubic yards, then multiply by tons per cubic yard to estimate tons."
            />

            <FAQItem
              question="Can I use the Gravel Calculator for road base?"
              answer="Yes. Open the Numeravo Gravel Calculator and select the Road Base material preset to estimate cubic yards, tons, waste, and material cost."
            />

            <FAQItem
              question="How deep should road base be?"
              answer="Road base depth depends on traffic, soil, drainage, and project type. Driveways and parking pads often need deeper compacted layers than light walkways."
            />

            <FAQItem
              question="Should I include waste for road base?"
              answer="Yes. A 5% to 10% waste allowance helps account for compaction, uneven grade, spreading loss, and measurement differences."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#121826] p-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F97316] text-sm font-bold text-white">
        {number}
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
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

function InfoRow({ label, value }: { label: string; value: string }) {
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