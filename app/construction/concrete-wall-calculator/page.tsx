import Link from "next/link";

export const metadata = {
  title: "Concrete Wall Calculator | Estimate Walls, Stem Walls & Retaining Walls",
  description:
    "Use the Numeravo concrete wall calculator guide to estimate concrete for walls, foundation walls, retaining walls, stem walls, and landscape walls.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-wall-calculator",
  },
  openGraph: {
    title: "Concrete Wall Calculator | Numeravo",
    description:
      "Estimate concrete volume and material cost for concrete walls, foundation walls, retaining walls, stem walls, and short landscape walls.",
    url: "https://numeravo.com/construction/concrete-wall-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Wall Calculator | Numeravo",
    description:
      "Estimate concrete for walls, retaining walls, foundation walls, and stem walls.",
  },
};

export default function ConcreteWallCalculatorPage() {
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
                  name: "Concrete Wall Calculator",
                  item: "https://numeravo.com/construction/concrete-wall-calculator",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What measurements do I need for a concrete wall estimate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You need wall length, wall height, wall thickness, waste percentage, and concrete price. For imperial estimates, length and height are usually entered in feet and thickness in inches.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can this estimate retaining walls?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Use the Wall mode in the main concrete calculator to estimate concrete volume for simple retaining wall sections.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does this include forms or rebar?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. This estimate covers concrete volume and material cost only. Forms, bracing, reinforcement, labor, excavation, drainage, and engineering are separate.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I calculate wall concrete in metric units?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. The Numeravo concrete calculator supports metric wall estimates using meters, centimeters, and cubic meters.",
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
          Concrete Wall Calculator
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Concrete wall calculator for foundation walls, retaining walls, and stem walls.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
          Estimate concrete for poured walls, foundation walls, retaining walls,
          stem walls, short landscape walls, and other vertical concrete
          sections. Use the main concrete calculator to enter wall length,
          height, thickness, waste, and concrete price.
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
              How to calculate concrete for a wall
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              For a concrete wall, multiply wall length by wall height by wall
              thickness. If you are using imperial measurements, wall length and
              height are commonly entered in feet while wall thickness is entered
              in inches. The calculator converts the result into cubic feet and
              cubic yards.
            </p>

            <div className="mt-5 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm font-semibold text-white">Formula</p>
              <p className="mt-2 text-sm text-[#A0AEC0]">
                Length × Height × Thickness = Concrete Volume
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Concrete walls can require additional planning for forms, bracing,
              reinforcement, vibration, access, and placement method. This page
              is intended for volume and material-cost estimating only.
            </p>
          </section>

          <aside className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common wall projects</h2>

            <div className="mt-5 space-y-3">
              {[
                "Foundation walls",
                "Retaining walls",
                "Stem walls",
                "Short landscape walls",
                "Poured concrete walls",
                "Basement wall sections",
                "Equipment screen walls",
                "Site walls",
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
          <h2 className="text-2xl font-semibold">Concrete wall example</h2>

          <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
            A wall that is 20 ft long, 4 ft high, and 8 inches thick has a
            volume of about 53.33 cubic feet. Since one cubic yard equals 27
            cubic feet, that is about 1.98 cubic yards before waste. With 10%
            waste, the estimate is about 2.17 cubic yards.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Bags vs Truck Delivery
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Should you use concrete bags or ready-mix for walls?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Small landscape walls, short stem wall sections, and minor repair
              pours may sometimes be handled with bagged concrete. Larger
              foundation walls, retaining walls, basement walls, and structural
              wall pours usually make more sense with ready-mix truck delivery.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Bagged concrete
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Best for small wall sections, patch work, short landscape
                  walls, and low-volume pours. The main concrete calculator can
                  estimate 80 lb bags, 60 lb bags, pallet counts, and bag cost.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  One-pallet rule
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  One common pickup-load pallet is about 42 bags of 80 lb
                  concrete or 56 bags of 60 lb concrete. Wall pours can exceed
                  that quickly, so compare bagged concrete against ready-mix.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Ready-mix truck
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Ready-mix is usually better for foundation walls, retaining
                  walls, stem walls, and tall or long wall sections. A standard
                  concrete truck is commonly limited to about 10 cubic yards per
                  legal load.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/construction/concrete-calculator"
                className="inline-flex rounded-xl bg-[#F97316] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#EA580C]"
              >
                Calculate wall bags, pallets, and truck loads
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related wall tools</h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Use these related calculators to estimate wall area, concrete volume,
            footing needs, slab quantities, gravel base, and overall construction
            material planning.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating wall or formwork areas."
            />

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and material cost for slabs, footings, piers, walls, stairs, curbs, and columns."
            />

            <RelatedLink
              href="/construction/concrete-cost-calculator"
              title="Concrete Cost Calculator"
              text="Estimate wall concrete price, base material, rebar, labor, prep, delivery fees, and total project cost."
            />

            <RelatedLink
              href="/construction/concrete-footing-calculator"
              title="Concrete Footing Calculator"
              text="Estimate concrete for strip footings, trench footings, wall footings, and grade beams."
            />

            <RelatedLink
              href="/construction/concrete-bag-calculator"
              title="Concrete Bag Calculator"
              text="Estimate bagged concrete quantities for smaller pours, pads, repairs, and support projects."
            />

            <RelatedLink
              href="/construction/concrete-slab-calculator"
              title="Concrete Slab Calculator"
              text="Estimate concrete needed for patios, pads, driveways, garage floors, and slab projects."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, cubic yards, tons, waste, and cost for base preparation."
            />

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="Browse concrete, gravel, base, area, and construction estimating calculators."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Wall calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="What measurements do I need for a concrete wall estimate?"
              answer="You need wall length, wall height, wall thickness, waste percentage, and concrete price. For imperial estimates, length and height are usually entered in feet and thickness in inches."
            />

            <FAQItem
              question="Can this estimate retaining walls?"
              answer="Yes. Use the Wall mode in the main concrete calculator to estimate concrete volume for simple retaining wall sections."
            />

            <FAQItem
              question="Does this include forms or rebar?"
              answer="No. This estimate covers concrete volume and material cost only. Forms, bracing, reinforcement, labor, excavation, drainage, and engineering are separate."
            />

            <FAQItem
              question="Can I calculate wall concrete in metric units?"
              answer="Yes. The Numeravo concrete calculator supports metric wall estimates using meters, centimeters, and cubic meters."
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