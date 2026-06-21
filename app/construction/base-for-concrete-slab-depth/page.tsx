import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base for Concrete Slab Depth | Gravel Base Guide",
  description:
    "Learn how deep a gravel or road base should be for a concrete slab, patio, driveway, shed pad, walkway, or garage slab.",
  alternates: {
    canonical: "https://numeravo.com/construction/base-for-concrete-slab-depth",
  },
  openGraph: {
    title: "Base for Concrete Slab Depth | Numeravo",
    description:
      "Plan gravel base depth for concrete slabs, patios, driveways, walkways, shed pads, and garage slabs.",
    url: "https://numeravo.com/construction/base-for-concrete-slab-depth",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base for Concrete Slab Depth | Numeravo",
    description:
      "Learn common gravel base depths for concrete slabs and estimate material with Numeravo calculators.",
  },
};

export default function BaseForConcreteSlabDepthPage() {
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
                    name: "Base for Concrete Slab Depth",
                    item: "https://numeravo.com/construction/base-for-concrete-slab-depth",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How deep should the gravel base be for a concrete slab?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Many concrete slabs use 4 to 6 inches of compacted gravel or crushed stone base, but the right depth depends on soil conditions, drainage, slab thickness, load, and local requirements.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do I need gravel under a concrete slab?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A gravel or crushed stone base is commonly used under concrete slabs to improve drainage, provide a stable sub-base, reduce settlement risk, and support compaction.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What material is best under a concrete slab?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Crushed stone or compactable road base is commonly used under concrete slabs because it can provide drainage and a stable compacted layer. Local soil and project conditions matter.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I use the gravel calculator for a concrete slab base?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Use the Numeravo Gravel Calculator to estimate the amount of gravel, crushed stone, or road base needed under a concrete slab.",
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
            Concrete Base Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Base for Concrete Slab Depth
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Learn common gravel, crushed stone, and road base depths for
            concrete slabs, patios, driveways, shed pads, walkways, and garage
            slabs.
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
            Common base depths for concrete slabs
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            A common planning range for concrete slab base depth is 4 to 6
            inches of compacted gravel, crushed stone, or road base. Light-use
            slabs may need less, while driveways, garages, poor soil, or
            heavier loads may need deeper compacted layers.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DepthCard title="Walkway slab" depth="3–4 in" />
            <DepthCard title="Patio slab" depth="4 in" />
            <DepthCard title="Shed pad" depth="4–6 in" />
            <DepthCard title="Driveway slab" depth="4–8 in" />
            <DepthCard title="Garage slab" depth="4–8 in" />
            <DepthCard title="Poor soil conditions" depth="6–12 in" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Why base depth matters
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              The base layer helps support the slab, improve drainage, and
              reduce movement from weak soil or uneven compaction. A slab can
              fail early if the ground is soft, poorly drained, or not properly
              compacted before concrete placement.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Helps create a stable sub-base</li>
              <li>• Improves drainage below concrete</li>
              <li>• Reduces soft spots and uneven support</li>
              <li>• Helps control settlement risk</li>
              <li>• Supports better compaction before the pour</li>
              <li>• Helps separate slab prep from weak soil</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">What affects depth?</h2>

            <div className="mt-5 space-y-3">
              <InfoRow label="Soil type" value="Clay, sand, fill, rock" />
              <InfoRow label="Drainage" value="Wet or dry site" />
              <InfoRow label="Slab use" value="Foot traffic or vehicles" />
              <InfoRow label="Slab thickness" value="Commonly 4+ in" />
              <InfoRow label="Load" value="Light or heavy use" />
              <InfoRow label="Compaction" value="Layer quality matters" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example concrete slab base estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a 12 foot by 20 foot patio slab with a 4 inch gravel base, the
            base volume is about 80 cubic feet. That equals about 2.96 cubic
            yards before waste. With 10% waste, estimate about 3.26 cubic yards
            of base material.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Slab size" value="12 × 20 ft" />
            <ExampleCard label="Base depth" value="4 in" />
            <ExampleCard label="Before waste" value="2.96 yd³" />
            <ExampleCard label="With waste" value="3.26 yd³" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Best materials for slab base
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Crushed stone, compactable gravel, and road base are commonly used
              below concrete slabs. The best choice depends on drainage, soil,
              compaction needs, and local material availability.
            </p>

            <div className="mt-5 space-y-3">
              <InfoRow label="Crushed stone" value="Stable and drainable" />
              <InfoRow label="Road base" value="Compacts well" />
              <InfoRow label="Gravel" value="Useful for drainage" />
              <InfoRow label="Sand" value="Project-specific use" />
              <InfoRow label="Vapor barrier" value="Often used separately" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Base preparation checklist
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Remove organic material and soft spots</li>
              <li>• Excavate to allow slab thickness and base depth</li>
              <li>• Grade the area for drainage</li>
              <li>• Add gravel or road base in layers</li>
              <li>• Compact each layer evenly</li>
              <li>• Verify final elevation before forming</li>
              <li>• Follow local code and engineering requirements</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related tools and guides</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
  href="/construction/how-to-prepare-ground-for-concrete-slab"
  title="How to Prepare Ground for Concrete Slab"
  text="Learn excavation, grading, gravel base, compaction, forms, and final slab prep steps."
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
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete needed for patios, pads, driveways, and slabs."
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
            Base for concrete slab FAQ
          </h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How deep should the gravel base be for a concrete slab?"
              answer="Many concrete slabs use 4 to 6 inches of compacted gravel or crushed stone base. Driveways, garages, poor soil, or heavier loads may require deeper base layers."
            />

            <FAQItem
              question="Do I need gravel under a concrete slab?"
              answer="Gravel or crushed stone is commonly used under concrete slabs to support drainage, provide a stable sub-base, and reduce the risk of weak spots below the slab."
            />

            <FAQItem
              question="What material is best under a concrete slab?"
              answer="Crushed stone or compactable road base is commonly used because it can drain and compact well. The best material depends on local soil, drainage, and project requirements."
            />

            <FAQItem
              question="Can I use the Gravel Calculator for concrete slab base material?"
              answer="Yes. Use the Numeravo Gravel Calculator to estimate gravel, crushed stone, or road base for the base layer under a concrete slab."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function DepthCard({ title, depth }: { title: string; depth: string }) {
  return (
    <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-2xl font-bold text-[#F97316]">{depth}</p>
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