import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Prepare Ground for Concrete Slab | Gravel Base Guide",
  description:
    "Learn how to prepare ground for a concrete slab, including excavation, grading, gravel base depth, compaction, forms, and slab preparation steps.",
  alternates: {
    canonical:
      "https://numeravo.com/construction/how-to-prepare-ground-for-concrete-slab",
  },
  openGraph: {
    title: "How to Prepare Ground for Concrete Slab | Numeravo",
    description:
      "Step-by-step guide to prepare ground for concrete slabs, patios, driveways, shed pads, and walkways.",
    url: "https://numeravo.com/construction/how-to-prepare-ground-for-concrete-slab",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Prepare Ground for Concrete Slab | Numeravo",
    description:
      "Prepare ground for a concrete slab with excavation, grading, gravel base, compaction, and slab layout steps.",
  },
};

export default function PrepareGroundForConcreteSlabPage() {
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
                    name: "How to Prepare Ground for Concrete Slab",
                    item: "https://numeravo.com/construction/how-to-prepare-ground-for-concrete-slab",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do you prepare ground for a concrete slab?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Prepare ground for a concrete slab by marking the layout, removing organic material, excavating to the correct depth, grading for drainage, adding gravel or crushed stone base, compacting the base, setting forms, and checking final elevation before pouring.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do I need gravel under a concrete slab?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A gravel or crushed stone base is commonly used under concrete slabs to improve drainage, support compaction, and create a stable layer below the slab.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should I dig for a concrete slab?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Excavation depth should allow for the concrete slab thickness plus the gravel or road base depth. For example, a 4 inch slab with a 4 inch base usually needs about 8 inches of total excavation before final grading.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should the ground be compacted before concrete?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The soil and base material should usually be compacted before concrete placement to reduce settling, soft spots, and uneven slab support.",
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
            Concrete Slab Prep Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            How to Prepare Ground for Concrete Slab
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Learn how to prepare ground for a concrete slab, including layout,
            excavation, grading, gravel base depth, compaction, forms, and final
            checks before pouring.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/construction/gravel-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Estimate Gravel Base
            </Link>

            <Link
              href="/construction/concrete-slab-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Concrete Slab Calculator
            </Link>
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Ground preparation steps for a concrete slab
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Good slab preparation starts before concrete arrives. The goal is to
            create a stable, compacted, properly graded base that supports the
            slab and drains well.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number="1"
              title="Mark layout"
              text="Measure and mark the slab area with stakes, string, or marking paint."
            />
            <StepCard
              number="2"
              title="Excavate"
              text="Remove grass, roots, topsoil, and soft material to the needed depth."
            />
            <StepCard
              number="3"
              title="Add base"
              text="Install gravel, crushed stone, or road base at the correct depth."
            />
            <StepCard
              number="4"
              title="Compact"
              text="Compact the soil and base layer before setting forms and pouring."
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Basic excavation formula
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              The total excavation depth usually needs to include both the slab
              thickness and the base material depth. Always check local code,
              frost depth, soil conditions, and engineering requirements for
              structural slabs.
            </p>

            <div className="mt-5 space-y-4">
              <FormulaBox
                title="Total excavation depth"
                text="Concrete Slab Thickness + Base Depth = Total Dig Depth"
              />
              <FormulaBox
                title="Example"
                text="4 in slab + 4 in gravel base = 8 in total excavation"
              />
              <FormulaBox
                title="Base estimate"
                text="Length × Width × Base Depth = Base Material Volume"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common prep depths</h2>

            <div className="mt-5 space-y-3">
              <InfoRow label="Walkway slab" value="3–4 in base" />
              <InfoRow label="Patio slab" value="4 in base" />
              <InfoRow label="Shed pad" value="4–6 in base" />
              <InfoRow label="Driveway slab" value="4–8 in base" />
              <InfoRow label="Garage slab" value="4–8 in base" />
              <InfoRow label="Poor soil" value="6–12 in base" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example slab preparation estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a 12 foot by 20 foot patio slab with 4 inches of concrete and 4
            inches of gravel base, the total excavation depth is about 8 inches.
            The gravel base volume is about 80 cubic feet, or 2.96 cubic yards
            before waste.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Slab size" value="12 × 20 ft" />
            <ExampleCard label="Concrete slab" value="4 in" />
            <ExampleCard label="Base depth" value="4 in" />
            <ExampleCard label="Dig depth" value="8 in" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Ground preparation checklist
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Confirm slab location and dimensions</li>
              <li>• Call utility marking service before digging</li>
              <li>• Remove grass, roots, topsoil, and organic material</li>
              <li>• Excavate for slab thickness plus base depth</li>
              <li>• Remove soft spots and unstable soil</li>
              <li>• Grade the subgrade for drainage</li>
              <li>• Add gravel, crushed stone, or road base</li>
              <li>• Compact the base in even layers</li>
              <li>• Set forms square and level</li>
              <li>• Check final elevation before the concrete pour</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Common preparation mistakes
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Pouring over grass or organic topsoil</li>
              <li>• Not excavating deep enough for base material</li>
              <li>• Skipping compaction</li>
              <li>• Using poor drainage below the slab</li>
              <li>• Leaving soft spots under the slab</li>
              <li>• Not checking slope or final grade</li>
              <li>• Overlooking local code or engineering requirements</li>
              <li>• Forgetting to plan for forms and finished elevation</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Best materials under concrete slabs
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Crushed stone, road base, and compactable gravel are common base
            materials for concrete slab preparation. The right choice depends on
            soil, drainage, load, availability, and local construction practice.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MaterialCard
              title="Crushed Stone"
              text="Good for stable, angular, drainable base layers."
            />
            <MaterialCard
              title="Road Base"
              text="Useful where compaction and load support are important."
            />
            <MaterialCard
              title="Gravel"
              text="Useful for drainage and general slab base preparation."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related tools and guides</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before preparing a concrete slab area."
            />

            <RelatedLink
              href="/construction/base-for-concrete-slab-depth"
              title="Base for Concrete Slab Depth"
              text="Learn common gravel, crushed stone, and road base depths for concrete slabs."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, cubic yards, tons, waste, and cost."
            />

            <RelatedLink
              href="/construction/road-base-calculator"
              title="Road Base Calculator"
              text="Estimate road base cubic yards, tons, waste, and cost using the Road Base preset."
            />

            <RelatedLink
              href="/construction/crushed-stone-calculator"
              title="Crushed Stone Calculator"
              text="Estimate crushed stone cubic yards, tons, waste, and cost using the Crushed Stone preset."
            />

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and project material needs."
            />

            <RelatedLink
              href="/construction/concrete-cost-calculator"
              title="Concrete Cost Calculator"
              text="Estimate concrete price, base material, rebar, labor, prep, delivery fees, and total slab project cost."
            />

            <RelatedLink
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete needed for patios, pads, driveways, and slabs."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Ground preparation FAQ
          </h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do you prepare ground for a concrete slab?"
              answer="Mark the slab layout, remove grass and organic material, excavate to the needed depth, grade the area, add gravel or road base, compact the base, set forms, and check final elevation before pouring."
            />

            <FAQItem
              question="Do I need gravel under a concrete slab?"
              answer="A gravel, crushed stone, or road base layer is commonly used under concrete slabs to improve drainage and create a stable compacted base."
            />

            <FAQItem
              question="How deep should I dig for a concrete slab?"
              answer="The dig depth should include the concrete slab thickness plus the base depth. A 4 inch slab with a 4 inch base usually needs about 8 inches of total excavation."
            />

            <FAQItem
              question="Should ground be compacted before concrete?"
              answer="Yes. Soil and base material should usually be compacted before the concrete pour to reduce settling, soft spots, and uneven slab support."
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
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
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

function MaterialCard({ title, text }: { title: string; text: string }) {
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