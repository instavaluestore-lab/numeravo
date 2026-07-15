import Link from "next/link";
import CrushedStoneCalculatorClient from "./CrushedStoneCalculatorClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crushed Stone Calculator | Estimate Tons, Yards & Cost",
  description:
    "Use this crushed stone calculator guide to estimate cubic yards, tons, waste, and cost. Open the Numeravo Gravel Calculator and select Crushed Stone.",
  alternates: {
    canonical: "https://numeravo.com/construction/crushed-stone-calculator",
  },
  openGraph: {
    title: "Crushed Stone Calculator | Numeravo",
    description:
      "Estimate crushed stone volume, cubic yards, tons, waste, and cost for driveways, drainage, patios, landscaping, and base layers.",
    url: "https://numeravo.com/construction/crushed-stone-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crushed Stone Calculator | Numeravo",
    description:
      "Estimate crushed stone cubic yards, tons, waste, and material cost using the Numeravo Gravel Calculator.",
  },
};

export default function CrushedStoneCalculatorPage() {
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
                    name: "Crushed Stone Calculator",
                    item: "https://numeravo.com/construction/crushed-stone-calculator",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I calculate crushed stone?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Measure length, width, and depth. Convert the depth to feet for imperial projects, multiply length by width by depth to get cubic feet, divide by 27 to get cubic yards, then multiply by tons per cubic yard.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I use the gravel calculator for crushed stone?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Open the Numeravo Gravel Calculator and select the Crushed Stone material preset to estimate cubic yards, tons, waste, and material cost.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much crushed stone should I add for waste?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A 5% to 10% waste allowance is commonly used for crushed stone estimates to account for spreading loss, uneven ground, compaction, and small measurement differences.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is crushed stone estimated by ton or cubic yard?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Project volume is usually calculated in cubic yards, while crushed stone is commonly sold by the ton. A complete estimate should show both cubic yards and tons.",
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
            Crushed Stone Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Crushed Stone Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate crushed stone volume, cubic yards, tons, waste allowance,
            and material cost for driveways, patios, drainage, landscaping, and
            compacted base layers.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#crushed-stone-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Crushed Stone Calculator
            </a>

            <Link
              href="/construction/crushed-stone-vs-gravel"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Crushed Stone vs Gravel
            </Link>
          </div>
        </div>

        <div id="crushed-stone-calculator">
          <CrushedStoneCalculatorClient />
        </div>

        <section className="mt-12 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Use the Gravel Calculator for crushed stone
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Numeravo uses one upgraded gravel and stone calculator instead of
            separate duplicate calculators. To estimate crushed stone, open the
            Gravel Calculator and select the <strong>Crushed Stone</strong>{" "}
            material preset. The calculator will estimate volume, cubic yards,
            tons, waste-adjusted quantity, and material cost.
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
                text="Choose Crushed Stone."
              />
              <StepCard
                number="3"
                title="Enter dimensions"
                text="Add length, width, and depth."
              />
              <StepCard
                number="4"
                title="Review results"
                text="Check yards, tons, and cost."
              />
            </div>

            <Link
              href="/construction/gravel-calculator"
              className="mt-6 inline-block rounded-xl bg-[#F97316] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Use Crushed Stone Preset
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to estimate crushed stone
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Crushed stone estimates start with the project area and depth.
              Once the volume is calculated, convert to cubic yards and then
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
              <InfoRow label="Depth" value="Stone thickness" />
              <InfoRow label="Density" value="Tons per cubic yard" />
              <InfoRow label="Waste" value="Usually 5–10%" />
              <InfoRow label="Price" value="Per ton" />
              <InfoRow label="Delivery" value="Separate cost" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example crushed stone estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a 30 foot by 12 foot area with 4 inches of crushed stone, the
            volume is about 120 cubic feet. That equals about 4.44 cubic yards.
            If crushed stone weighs about 1.4 tons per cubic yard, the project
            needs about 6.22 tons before waste. With 10% waste, estimate about
            6.84 tons.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Project size" value="30 × 12 ft" />
            <ExampleCard label="Depth" value="4 in" />
            <ExampleCard label="With waste" value="6.84 tons" />
            <ExampleCard label="At $50/ton" value="$342" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common crushed stone uses
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Crushed stone is useful when a project needs a stable, angular,
              compactable material. It is common below slabs, patios, driveways,
              walkways, drainage systems, and hardscape projects.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Driveway base layers</li>
              <li>• Patio and walkway bases</li>
              <li>• Concrete slab base preparation</li>
              <li>• Drainage and French drains</li>
              <li>• Landscape beds and borders</li>
              <li>• Foundation backfill areas</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common crushed stone depths
            </h2>

            <div className="mt-5 space-y-3">
              <InfoRow label="Decorative landscape layer" value="2–3 in" />
              <InfoRow label="Walkway base" value="3–4 in" />
              <InfoRow label="Patio base" value="4–6 in" />
              <InfoRow label="Driveway top layer" value="3–4 in" />
              <InfoRow label="Driveway base" value="4–8 in" />
              <InfoRow label="Drainage trench" value="Varies by design" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Crushed stone estimating tips
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TipCard
              title="Convert depth correctly"
              text="Four inches equals 0.333 feet. Six inches equals 0.5 feet."
            />
            <TipCard
              title="Add waste"
              text="Use 5% to 10% waste for uneven ground, spreading loss, and compaction."
            />
            <TipCard
              title="Check density"
              text="Stone size, moisture, and supplier material can affect tons per cubic yard."
            />
            <TipCard
              title="Separate delivery"
              text="Delivery, spreading, grading, and compaction may be separate from material cost."
            />
            <TipCard
              title="Match stone to use"
              text="Drainage, base, decorative, and driveway projects may need different stone sizes."
            />
            <TipCard
              title="Compact base layers"
              text="Load-bearing areas usually perform better with compacted layers."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related gravel tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating crushed stone volume and tons."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, pea gravel, river rock, paver base, and drainage rock."
            />

            <RelatedLink
              href="/construction/crushed-stone-vs-gravel"
              title="Crushed Stone vs Gravel"
              text="Compare crushed stone and gravel for driveways, drainage, landscaping, and base layers."
            />

            <RelatedLink
              href="/construction/pea-gravel-calculator"
              title="Pea Gravel Calculator"
              text="Estimate pea gravel cubic yards, tons, delivery, and cost for landscaping, patios, walkways, drainage, and ground cover."
            />

            <RelatedLink
              href="/construction/road-base-calculator"
              title="Road Base Calculator"
              text="Estimate road base cubic yards, tons, waste, and cost using the Road Base material preset."
            />

            <RelatedLink
              href="/construction/base-for-concrete-slab-depth"
              title="Base for Concrete Slab Depth"
              text="Learn common gravel, crushed stone, and road base depths for concrete slabs, patios, driveways, and shed pads."
            />

            <RelatedLink
              href="/construction/how-to-prepare-ground-for-concrete-slab"
              title="How to Prepare Ground for Concrete Slab"
              text="Learn excavation, grading, gravel base, compaction, forms, and final slab prep steps."
            />

            <RelatedLink
              href="/construction/gravel-cost-calculator"
              title="Gravel Cost Calculator"
              text="Estimate gravel project cost using area, depth, cubic yards, tons, waste, price per ton, and delivery."
            />

            <RelatedLink
              href="/construction/gravel-cost-per-ton"
              title="Gravel Cost Per Ton"
              text="Learn how gravel and crushed stone price per ton affects total project cost."
            />

            <RelatedLink
              href="/construction/gravel-driveway-cost"
              title="Gravel Driveway Cost"
              text="Estimate total driveway cost using size, depth, tons, delivery, and material price."
            />

            <RelatedLink
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel volume, depth, cubic yards, tons, and waste."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Crushed stone calculator FAQ
          </h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I calculate crushed stone?"
              answer="Measure length, width, and depth. Multiply them to get cubic feet, divide by 27 to get cubic yards, then multiply by tons per cubic yard to estimate tons."
            />

            <FAQItem
              question="Can I use the Gravel Calculator for crushed stone?"
              answer="Yes. Open the Numeravo Gravel Calculator and select the Crushed Stone preset to estimate cubic yards, tons, waste, and material cost."
            />

            <FAQItem
              question="How much waste should I add for crushed stone?"
              answer="A 5% to 10% waste allowance is commonly useful for uneven ground, compaction, spreading loss, and small measurement differences."
            />

            <FAQItem
              question="Is crushed stone calculated by ton or cubic yard?"
              answer="Use both. Project volume is usually calculated in cubic yards, but suppliers commonly sell crushed stone by the ton."
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