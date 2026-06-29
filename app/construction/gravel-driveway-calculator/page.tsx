import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gravel Driveway Calculator | Estimate Tons, Yards & Cost",
  description:
    "Estimate gravel needed for a driveway, including cubic yards, tons, depth, waste, and material cost. Plan gravel driveways for cars, trucks, and residential access.",
  alternates: {
    canonical: "https://numeravo.com/construction/gravel-driveway-calculator",
  },
  openGraph: {
    title: "Gravel Driveway Calculator | Numeravo",
    description:
      "Estimate gravel tons, cubic yards, depth, waste, and cost for residential driveway projects.",
    url: "https://numeravo.com/construction/gravel-driveway-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravel Driveway Calculator | Numeravo",
    description:
      "Estimate gravel tons, cubic yards, depth, waste, and cost for driveway projects.",
  },
};

export default function GravelDrivewayCalculatorPage() {
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
                    name: "Gravel Driveway Calculator",
                    item: "https://numeravo.com/construction/gravel-driveway-calculator",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I calculate gravel for a driveway?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Multiply driveway length by width by gravel depth to calculate volume. Convert the result to cubic yards, add waste, then multiply by tons per cubic yard to estimate total gravel weight.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should gravel be for a driveway?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A light residential gravel driveway often uses 4 to 6 inches of gravel. Heavier-use driveways, poor soil, or truck traffic may require 6 to 12 inches or a layered base system.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons of gravel are in a cubic yard?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A common estimate is about 1.4 tons per cubic yard of gravel, but actual weight depends on gravel type, moisture, compaction, and supplier specifications.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I add extra gravel for waste?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. A 5% to 10% waste allowance is commonly used for driveway gravel to account for spreading, compaction, uneven ground, and material loss.",
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
            Gravel Calculator Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Gravel Driveway Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Estimate how much gravel you need for a driveway, including cubic
            yards, tons, depth, waste allowance, and material cost.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/construction/gravel-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Open Gravel Calculator
            </Link>

            <Link
              href="/construction"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              View Construction Calculators
            </Link>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate gravel for a driveway
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              To calculate driveway gravel, multiply the driveway length by its
              width and planned gravel depth. For imperial measurements, convert
              depth from inches to feet first. Then divide cubic feet by 27 to
              convert to cubic yards.
            </p>

            <div className="mt-5 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm font-semibold text-white">
                Driveway gravel formula
              </p>

              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Length × Width × Depth = Cubic Feet
              </p>

              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Cubic Feet ÷ 27 = Cubic Yards
              </p>

              <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                Cubic Yards × Tons Per Cubic Yard = Estimated Tons
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common driveway depths</h2>

            <div className="mt-5 space-y-3">
              <DepthRow label="Light residential driveway" value="4–6 inches" />
              <DepthRow label="Standard driveway base" value="6 inches" />
              <DepthRow label="Heavy-use driveway" value="6–12 inches" />
              <DepthRow label="Poor soil conditions" value="Layered base" />
              <DepthRow label="Top dressing existing gravel" value="2–3 inches" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            Example: 100-foot gravel driveway
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a driveway that is 100 feet long, 12 feet wide, and 6 inches
            deep, the volume is 600 cubic feet. Divide by 27 to get about 22.22
            cubic yards before waste. At 1.4 tons per cubic yard, that is about
            31.11 tons before waste.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Length" value="100 ft" />
            <ExampleCard label="Width" value="12 ft" />
            <ExampleCard label="Depth" value="6 in" />
            <ExampleCard label="Estimated gravel" value="31.11 tons" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Gravel driveway cost factors
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Driveway gravel cost depends on material type, driveway size,
              depth, delivery distance, local supplier pricing, compaction
              requirements, and whether you need excavation, grading, or base
              preparation.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Gravel type and density</li>
              <li>• Total driveway square footage</li>
              <li>• Gravel depth</li>
              <li>• Delivery fees</li>
              <li>• Site prep and grading</li>
              <li>• Compaction equipment</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Recommended driveway project tools
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Tape measure or laser distance measure</li>
              <li>• Landscape rake</li>
              <li>• Shovel</li>
              <li>• Wheelbarrow</li>
              <li>• Landscape fabric</li>
              <li>• Tamper or plate compactor</li>
              <li>• Work gloves and safety glasses</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related gravel tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate driveway square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating gravel depth and tons."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel volume, tons, waste, and material cost."
            />

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete for slabs, footings, piers, walls, and pads."
            />

            <RelatedLink
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete slab volume for patios, driveways, and pads."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Gravel driveway FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I calculate gravel for a driveway?"
              answer="Multiply driveway length by width by depth to get volume. Convert depth from inches to feet, divide cubic feet by 27 to get cubic yards, then multiply by tons per cubic yard."
            />

            <FAQItem
              question="How deep should gravel be for a driveway?"
              answer="A light residential gravel driveway often uses 4 to 6 inches. Heavier-use driveways, poor soil, or truck traffic may need 6 to 12 inches or a layered base."
            />

            <FAQItem
              question="How many tons of gravel are in a cubic yard?"
              answer="A common planning estimate is about 1.4 tons per cubic yard, but actual weight depends on gravel type, moisture, compaction, and supplier specs."
            />

            <FAQItem
              question="Should I add waste to a gravel driveway estimate?"
              answer="Yes. A 5% to 10% waste allowance is useful for spreading, compaction, uneven ground, and material loss."
            />
          </div>
        </section>
      </section>
    </main>
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