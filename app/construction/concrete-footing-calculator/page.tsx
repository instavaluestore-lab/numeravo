import Link from "next/link";

export const metadata = {
  title: "Concrete Footing Calculator | Estimate Footings & Trenches",
  description:
    "Use the Numeravo concrete footing calculator guide to estimate concrete for strip footings, trench footings, wall footings, retaining wall footings, and grade beams.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-footing-calculator",
  },
  openGraph: {
    title: "Concrete Footing Calculator | Numeravo",
    description:
      "Estimate concrete for strip footings, trenches, retaining wall footings, wall footings, and grade beams.",
    url: "https://numeravo.com/construction/concrete-footing-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Footing Calculator | Numeravo",
    description:
      "Estimate footing concrete volume, waste, cubic yards, and material cost.",
  },
};

export default function ConcreteFootingCalculatorPage() {
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
                  name: "Concrete Footing Calculator",
                  item: "https://numeravo.com/construction/concrete-footing-calculator",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What measurements do I need for a footing estimate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You need the total footing length, footing width, footing depth, quantity if there are multiple runs, waste percentage, and concrete price.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can this estimate trench footings?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Use the Footing / Trench mode in the main concrete calculator and enter the trench length, width, and depth.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does this account for rebar?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. This page estimates concrete volume only. Rebar, chairs, tie wire, labor, excavation, gravel, and inspections are separate.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use metric units?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. The Numeravo concrete calculator supports metric footing estimates using meters, centimeters, and cubic meters.",
                  },
                },
              ],
            },
          ],
        }),
      }}
    />
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
          Concrete Footing Calculator
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Concrete footing calculator for trenches, wall footings, and grade beams.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
          Estimate concrete for continuous strip footings, trench footings,
          retaining wall footings, foundation runs, deck beam trenches, and grade
          beams. Use the main concrete calculator to enter length, width, depth,
          quantity, waste, and price.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/construction/concrete-calculator"
            className="rounded-xl bg-[#F97316] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#EA580C]"
          >
            Open Concrete Calculator
          </Link>

          <Link
            href="/construction"
            className="rounded-xl border border-[#1F2937] px-6 py-4 text-center text-sm font-semibold text-[#A0AEC0] transition hover:border-[#F97316] hover:text-white"
          >
            View Construction Calculators
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">
              How to calculate concrete for a footing
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              For a concrete footing or trench, multiply the total length by the
              footing width by the footing depth. If you have multiple footing
              runs with the same dimensions, multiply the result by the quantity.
            </p>

            <div className="mt-5 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm font-semibold text-white">Formula</p>
              <p className="mt-2 text-sm text-[#A0AEC0]">
                Length × Width × Depth × Quantity = Concrete Volume
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Footing dimensions often depend on structure type, soil conditions,
              loads, frost depth, reinforcement, and local code. Use this page
              for estimating material volume, then confirm requirements with a
              qualified professional when needed.
            </p>
          </section>

          <aside className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common footing projects</h2>

            <div className="mt-5 space-y-3">
              {[
                "Continuous strip footings",
                "Trench footings",
                "Foundation wall footings",
                "Retaining wall footings",
                "Deck beam footing trenches",
                "Grade beams",
                "Multiple footing runs",
                "Small structure footings",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4 text-sm text-[#A0AEC0]"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Concrete footing example</h2>

          <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
            A footing that is 40 ft long, 12 inches wide, and 12 inches deep has
            a volume of 40 cubic feet. Since one cubic yard equals 27 cubic feet,
            that is about 1.48 cubic yards before waste. With 10% waste, the
            estimate is about 1.63 cubic yards.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Bags vs Truck Delivery
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Should you use concrete bags or ready-mix for footings?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Small footing runs, deck footings, fence post holes, and short
              trenches can sometimes be handled with bagged concrete. Longer
              wall footings, retaining wall footings, grade beams, and foundation
              runs usually make more sense with ready-mix truck delivery.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Bagged concrete
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Best for smaller footing projects where access is limited or
                  the quantity is low. The main concrete calculator can estimate
                  80 lb bags, 60 lb bags, pallet counts, and bag cost.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  One-pallet rule
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  One common pickup-load pallet is about 42 bags of 80 lb
                  concrete or 56 bags of 60 lb concrete. If your footing estimate
                  exceeds one pallet, ready-mix delivery may be the better option.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Ready-mix truck
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Ready-mix is typically better for long trenches, wall footings,
                  grade beams, and structural pours. A standard concrete truck is
                  commonly limited to about 10 cubic yards per legal load.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/construction/concrete-calculator"
                className="inline-flex rounded-xl bg-[#F97316] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#EA580C]"
              >
                Calculate footing bags, pallets, and truck loads
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related footing tools</h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Use these related calculators to estimate project area, concrete volume,
            slab quantities, wall pours, sonotubes, gravel base, and overall
            construction material needs.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating footing materials."
            />

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and material cost for slabs, footings, piers, walls, stairs, curbs, and columns."
            />

            <RelatedLink
              href="/construction/concrete-cost-calculator"
              title="Concrete Cost Calculator"
              text="Estimate footing concrete price, base material, rebar, labor, prep, delivery fees, and total project cost."
            />

            <RelatedLink
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete needed for patios, pads, driveways, garage floors, and slab projects."
            />

            <RelatedLink
              href="/construction/concrete-wall-calculator"
              title="Concrete Wall Calculator"
              text="Estimate concrete for foundation walls, retaining walls, stem walls, and poured wall sections."
            />

            <RelatedLink
              href="/construction/sonotube-concrete-calculator"
              title="Sonotube Concrete Calculator"
              text="Estimate concrete for round piers, post holes, deck posts, fence posts, and sonotube forms."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, cubic yards, tons, waste, and cost for footing base preparation."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Footing calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="What measurements do I need for a footing estimate?"
              answer="You need the total footing length, footing width, footing depth, quantity if there are multiple runs, waste percentage, and concrete price."
            />

            <FAQItem
              question="Can this estimate trench footings?"
              answer="Yes. Use the Footing / Trench mode in the main concrete calculator and enter the trench length, width, and depth."
            />

            <FAQItem
              question="Does this account for rebar?"
              answer="No. This page estimates concrete volume only. Rebar, chairs, tie wire, labor, excavation, gravel, and inspections are separate."
            />

            <FAQItem
              question="Can I use metric units?"
              answer="Yes. The Numeravo concrete calculator supports metric footing estimates using meters, centimeters, and cubic meters."
            />
          </div>
        </section>
      </section>
    </main>
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