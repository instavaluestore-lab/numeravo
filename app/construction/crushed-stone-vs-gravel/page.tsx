import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crushed Stone vs Gravel | Differences, Uses & Calculator Guide",
  description:
    "Compare crushed stone vs gravel for driveways, patios, drainage, landscaping, and concrete base layers. Learn the differences, best uses, depth tips, and how to estimate material.",
  alternates: {
    canonical: "https://numeravo.com/construction/crushed-stone-vs-gravel",
  },
  openGraph: {
    title: "Crushed Stone vs Gravel | Numeravo",
    description:
      "Learn the difference between crushed stone and gravel, when to use each material, and how to estimate volume, tons, and cost.",
    url: "https://numeravo.com/construction/crushed-stone-vs-gravel",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crushed Stone vs Gravel | Numeravo",
    description:
      "Compare crushed stone vs gravel for driveways, patios, drainage, landscaping, and concrete base projects.",
  },
};

export default function CrushedStoneVsGravelPage() {
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
                    name: "Crushed Stone vs Gravel",
                    item: "https://numeravo.com/construction/crushed-stone-vs-gravel",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is the difference between crushed stone and gravel?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Crushed stone is mechanically crushed rock with angular edges. Gravel is often naturally rounded or weathered stone, though suppliers may use the term gravel broadly for several aggregate products.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is crushed stone or gravel better for a driveway?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Crushed stone is often preferred for driveway base layers because its angular edges compact and lock together well. Gravel can work for driveways too, especially when properly graded and compacted.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is crushed stone good for drainage?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Clean crushed stone or washed gravel can be useful for drainage because the spaces between stones allow water to move through. The best material depends on trench design, soil, and local supplier options.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I use gravel under concrete?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Many concrete slabs use a compacted gravel or crushed stone base layer to support the slab and improve drainage. Common base depths are often 4 to 6 inches, depending on soil and project requirements.",
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
            Gravel Material Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Crushed Stone vs Gravel
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Compare crushed stone and gravel for driveways, patios, drainage,
            landscaping, walkways, and concrete base layers. Learn how the
            materials differ and when each one makes sense.
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

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <ComparisonCard
            title="Crushed stone"
            description="Crushed stone is rock that has been mechanically broken into angular pieces. It usually compacts well because the sharp edges lock together."
            points={[
              "Angular edges",
              "Good compaction",
              "Common for base layers",
              "Useful for driveways and concrete bases",
              "Often sold by size or grade",
            ]}
          />

          <ComparisonCard
            title="Gravel"
            description="Gravel is often naturally rounded or weathered stone, though suppliers may use the word gravel broadly for different aggregate products."
            points={[
              "Often rounded or mixed aggregate",
              "Common for landscaping",
              "Can work for driveways",
              "Useful for drainage depending on type",
              "May shift more than angular stone",
            ]}
          />
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Crushed stone vs gravel: quick comparison
          </h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] text-sm font-semibold text-white">
              <div className="border-r border-[#1F2937] p-4">Feature</div>
              <div className="border-r border-[#1F2937] p-4">Crushed Stone</div>
              <div className="p-4">Gravel</div>
            </div>

            <ComparisonRow
              feature="Shape"
              crushed="Angular and sharp-edged"
              gravel="Often rounded or mixed"
            />
            <ComparisonRow
              feature="Compaction"
              crushed="Locks together well"
              gravel="Can shift more depending on type"
            />
            <ComparisonRow
              feature="Driveway base"
              crushed="Often a strong choice"
              gravel="Can work if properly graded"
            />
            <ComparisonRow
              feature="Drainage"
              crushed="Good when clean and open-graded"
              gravel="Good when washed and properly sized"
            />
            <ComparisonRow
              feature="Landscaping"
              crushed="Clean, structured look"
              gravel="Natural decorative look"
            />
            <ComparisonRow
              feature="Concrete base"
              crushed="Common for compacted base"
              gravel="Also common depending on local material"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Which material should you use?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              The right material depends on the project. Crushed stone is often
              useful where compaction and stability matter. Gravel is often
              chosen for decorative landscaping, drainage, or general coverage
              depending on the stone type and local supplier options.
            </p>

            <div className="mt-5 space-y-4">
              <UseBox
                title="Driveways"
                text="Crushed stone or well-graded gravel can work. Angular crushed stone often performs well as a compacted base."
              />
              <UseBox
                title="Concrete base layers"
                text="A compacted crushed stone or gravel base can help support slabs and improve drainage."
              />
              <UseBox
                title="Drainage"
                text="Clean stone with open space between particles is useful for drainage trenches and French drains."
              />
              <UseBox
                title="Landscaping"
                text="Decorative gravel or crushed stone can both work, depending on color, shape, and appearance."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common depth guide</h2>

            <div className="mt-5 space-y-3">
              <DepthRow label="Decorative landscaping" value="2–3 inches" />
              <DepthRow label="Walkways and paths" value="2–4 inches" />
              <DepthRow label="Patio or paver base" value="4 inches" />
              <DepthRow label="Concrete slab base" value="4–6 inches" />
              <DepthRow label="Light driveway" value="4–6 inches" />
              <DepthRow label="Heavy-use driveway" value="6–12 inches" />
              <DepthRow label="Drainage trench" value="Varies by design" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            How to estimate crushed stone or gravel
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Use the same basic method for either material: measure length,
            width, and depth, calculate volume, convert to cubic yards, then
            estimate tons using the material density. Supplier density can vary,
            so confirm the final tons with your local supplier.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <FormulaBox title="Volume" text="Length × Width × Depth" />
            <FormulaBox title="Cubic yards" text="Cubic Feet ÷ 27" />
            <FormulaBox
              title="Estimated tons"
              text="Cubic Yards × Tons Per Cubic Yard"
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
              href="/construction/how-much-gravel-do-i-need"
              title="How Much Gravel Do I Need?"
              text="Learn how to estimate gravel depth, volume, cubic yards, and tons."
            />

            <RelatedLink
              href="/construction/gravel-cost-per-ton"
              title="Gravel Cost Per Ton"
              text="Learn how gravel price per ton works and estimate total material cost."
            />

            <RelatedLink
              href="/construction/gravel-driveway-calculator"
              title="Gravel Driveway Calculator"
              text="Estimate gravel tons, cubic yards, depth, waste, and cost for driveway projects."
            />

            <RelatedLink
  href="/construction/gravel-driveway-cost"
  title="Gravel Driveway Cost"
  text="Estimate total gravel driveway cost using driveway size, depth, tons, price per ton, delivery, and project factors."
/>
<RelatedLink
  href="/construction/base-for-concrete-slab-depth"
  title="Base for Concrete Slab Depth"
  text="Learn common gravel, crushed stone, and road base depths for concrete slabs, patios, driveways, and shed pads."
/>

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and cost for slabs, footings, piers, and pads."
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
  href="/construction/crushed-stone-calculator"
  title="Crushed Stone Calculator"
  text="Estimate crushed stone cubic yards, tons, waste, and cost using the Crushed Stone material preset."
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
            Crushed stone vs gravel FAQ
          </h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="What is the difference between crushed stone and gravel?"
              answer="Crushed stone is mechanically crushed rock with angular edges. Gravel is often naturally rounded or weathered stone, though suppliers may use the word gravel broadly for several aggregate products."
            />

            <FAQItem
              question="Is crushed stone or gravel better for a driveway?"
              answer="Crushed stone is often preferred for driveway base layers because angular edges compact and lock together well. Gravel can also work when it is properly graded and compacted."
            />

            <FAQItem
              question="Is crushed stone good for drainage?"
              answer="Clean crushed stone or washed gravel can be useful for drainage because open spaces between stones allow water to move through."
            />

            <FAQItem
              question="Can I use gravel under concrete?"
              answer="Yes. Many concrete slabs use a compacted gravel or crushed stone base layer for support and drainage."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function ComparisonCard({
  title,
  description,
  points,
}: {
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">{description}</p>

      <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
        {points.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonRow({
  feature,
  crushed,
  gravel,
}: {
  feature: string;
  crushed: string;
  gravel: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] text-sm">
      <div className="border-r border-[#1F2937] p-4 font-semibold text-white">
        {feature}
      </div>
      <div className="border-r border-[#1F2937] p-4 text-[#A0AEC0]">
        {crushed}
      </div>
      <div className="p-4 text-[#A0AEC0]">{gravel}</div>
    </div>
  );
}

function UseBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function DepthRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
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