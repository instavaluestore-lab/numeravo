import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much Gravel Do I Need? | Gravel Calculator Guide",
  description:
    "Learn how to calculate how much gravel you need for driveways, patios, walkways, drainage, landscaping, and concrete base layers. Estimate cubic yards, tons, depth, and cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/how-much-gravel-do-i-need",
  },
  openGraph: {
    title: "How Much Gravel Do I Need? | Numeravo",
    description:
      "Calculate how much gravel you need using length, width, depth, cubic yards, tons, and waste allowance.",
    url: "https://numeravo.com/construction/how-much-gravel-do-i-need",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Gravel Do I Need? | Numeravo",
    description:
      "Learn how to estimate gravel volume, tons, depth, waste, and project cost.",
  },
};

export default function HowMuchGravelDoINeedPage() {
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
                    name: "How Much Gravel Do I Need?",
                    item: "https://numeravo.com/construction/how-much-gravel-do-i-need",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I calculate how much gravel I need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Multiply length by width by depth to calculate gravel volume. For imperial measurements, convert depth from inches to feet, calculate cubic feet, then divide by 27 to get cubic yards.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many tons of gravel do I need?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "After calculating cubic yards, multiply cubic yards by the gravel density. A common estimate is about 1.4 tons per cubic yard, but the actual amount depends on gravel type, moisture, and compaction.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How deep should gravel be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Decorative landscaping gravel may only need 2 to 3 inches. Walkways often use 2 to 4 inches, patios and concrete base layers often use 4 to 6 inches, and driveways often use 4 to 12 inches depending on soil and load.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I add extra gravel for waste?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. A 5% to 10% waste allowance is commonly used to account for uneven ground, compaction, spreading, and material loss.",
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
            How Much Gravel Do I Need?
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Learn how to estimate gravel for driveways, patios, walkways,
            landscaping, drainage, and concrete base layers using length, width,
            depth, cubic yards, tons, and waste allowance.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/construction/gravel-calculator"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#fb8a3c]"
            >
              Open Gravel Calculator
            </Link>

            <Link
              href="/construction/gravel-driveway-calculator"
              className="rounded-xl border border-[#1F2937] px-5 py-3 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
            >
              Gravel Driveway Guide
            </Link>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Gravel calculation formula
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              To calculate how much gravel you need, measure the project length,
              width, and planned gravel depth. Convert the depth into feet if
              you are using inches. Then multiply length by width by depth to
              get cubic feet.
            </p>

            <div className="mt-5 space-y-4">
              <FormulaBox
                title="Step 1"
                text="Length × Width × Depth = Cubic Feet"
              />
              <FormulaBox
                title="Step 2"
                text="Cubic Feet ÷ 27 = Cubic Yards"
              />
              <FormulaBox
                title="Step 3"
                text="Cubic Yards × Tons Per Cubic Yard = Estimated Tons"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common gravel depths</h2>

            <div className="mt-5 space-y-3">
              <DepthRow label="Decorative landscaping" value="2–3 inches" />
              <DepthRow label="Walkway or garden path" value="2–4 inches" />
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
            Example gravel estimate
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            For a 20-foot by 10-foot area with 4 inches of gravel, convert 4
            inches to 0.33 feet. The volume is about 66.67 cubic feet. Divide by
            27 to get about 2.47 cubic yards. At 1.4 tons per cubic yard, that
            equals about 3.46 tons before waste.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ExampleCard label="Length" value="20 ft" />
            <ExampleCard label="Width" value="10 ft" />
            <ExampleCard label="Depth" value="4 in" />
            <ExampleCard label="Estimated gravel" value="3.46 tons" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              Gravel projects this works for
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              The same basic gravel formula works for many construction,
              landscaping, and drainage projects. The main variable is depth,
              because driveway gravel, patio base, decorative gravel, and
              drainage gravel often require different material thicknesses.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Driveways</li>
              <li>• Patios and paver bases</li>
              <li>• Walkways and paths</li>
              <li>• Concrete slab base layers</li>
              <li>• Drainage trenches and French drains</li>
              <li>• Decorative landscaping beds</li>
              <li>• Gravel pads for sheds, equipment, and small structures</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              What affects how much gravel you need?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Gravel estimates can change depending on material type, depth,
              compaction, soil condition, drainage needs, slope, and waste
              allowance. For larger projects, confirm final quantities with a
              local supplier or contractor.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <li>• Project length and width</li>
              <li>• Gravel depth</li>
              <li>• Gravel type and density</li>
              <li>• Compaction</li>
              <li>• Uneven ground</li>
              <li>• Delivery and spreading loss</li>
              <li>• Whether the area needs a base and top layer</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related gravel tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
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
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and cost for slabs, footings, piers, walls, and pads."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">
            How much gravel do I need FAQ
          </h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How do I calculate how much gravel I need?"
              answer="Multiply length by width by depth to calculate gravel volume. Convert depth from inches to feet when using imperial units. Then divide cubic feet by 27 to get cubic yards."
            />

            <FAQItem
              question="How many tons of gravel do I need?"
              answer="After calculating cubic yards, multiply cubic yards by the gravel density. A common planning estimate is 1.4 tons per cubic yard, but actual weight varies by material type, moisture, and supplier."
            />

            <FAQItem
              question="How deep should gravel be?"
              answer="Decorative gravel may need 2 to 3 inches, walkways often use 2 to 4 inches, concrete base layers often use 4 to 6 inches, and driveways may use 4 to 12 inches depending on load and soil."
            />

            <FAQItem
              question="Should I add waste to my gravel estimate?"
              answer="Yes. Add 5% to 10% extra gravel for spreading, compaction, uneven ground, and material loss."
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