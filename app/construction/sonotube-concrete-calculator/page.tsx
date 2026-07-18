import Link from "next/link";

export const metadata = {
  title: "Sonotube Concrete Calculator | Estimate Concrete for Piers & Posts",
  description:
    "Use the Numeravo sonotube concrete calculator guide to estimate concrete for round piers, deck posts, fence posts, pole barn footings, and concrete tube forms.",
  alternates: {
    canonical:
      "https://numeravo.com/construction/sonotube-concrete-calculator",
  },
  openGraph: {
    title: "Sonotube Concrete Calculator | Numeravo",
    description:
      "Estimate concrete for sonotubes, round piers, fence posts, deck footings, and pole barn post holes.",
    url: "https://numeravo.com/construction/sonotube-concrete-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonotube Concrete Calculator | Numeravo",
    description:
      "Estimate concrete volume, waste, and cost for sonotubes, post holes, and round piers.",
  },
};

export default function SonotubeConcreteCalculatorPage() {
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
                  name: "Sonotube Concrete Calculator",
                  item: "https://numeravo.com/construction/sonotube-concrete-calculator",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What measurements do I need for a sonotube estimate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You need the tube diameter, depth or height, quantity of tubes, waste percentage, and concrete price.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is a sonotube calculated as a cylinder?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. A sonotube is a cylindrical form, so the volume formula uses pi times radius squared times depth.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can this be used for fence post holes?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Use the Round Pier / Sonotube mode in the main concrete calculator and enter the hole diameter, depth, and quantity.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does this include the post volume?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. This estimate assumes the hole or tube is filled with concrete. If a post displaces concrete volume, the actual amount may be slightly lower.",
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
          Sonotube Concrete Calculator
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Sonotube concrete calculator for piers, posts, and round footings.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
          Estimate concrete for sonotube forms, round piers, deck footings,
          fence post holes, pole barn post footings, and cylindrical concrete
          columns. Use the main concrete calculator to enter diameter, depth,
          quantity, waste, and concrete price.
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
              How to calculate concrete for a sonotube
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              A sonotube or round pier is calculated like a cylinder. Convert
              the tube diameter into a radius, square the radius, multiply by
              pi, then multiply by depth and quantity.
            </p>

            <div className="mt-5 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm font-semibold text-white">Formula</p>
              <p className="mt-2 text-sm text-[#A0AEC0]">
                π × Radius² × Depth × Quantity = Concrete Volume
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              For imperial estimates, diameter is commonly entered in inches and
              depth in feet. The calculator converts the result into cubic feet
              and cubic yards. For metric estimates, diameter is entered in
              centimeters and depth in meters.
            </p>
          </section>

          <aside className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common sonotube projects</h2>

            <div className="mt-5 space-y-3">
              {[
                "Deck post footings",
                "Fence post holes",
                "Pergola footings",
                "Pole barn post footings",
                "Round concrete piers",
                "Sonotube columns",
                "Mailbox post footings",
                "Small structure support posts",
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
          <h2 className="text-2xl font-semibold">Sonotube concrete example</h2>

          <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
            Four round piers with a 12 inch diameter and 3 ft depth require
            about 9.42 cubic feet of concrete. Since one cubic yard equals 27
            cubic feet, that is about 0.35 cubic yards before waste. With 10%
            waste, the estimate is about 0.38 cubic yards.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Bags vs Truck Delivery
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Should you use concrete bags or ready-mix for sonotubes?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Sonotubes, fence post holes, deck footings, pergola footings, and
              small round piers are often good candidates for bagged concrete.
              Larger pier layouts, pole barn footings, and projects with many
              tubes may become faster and more practical with ready-mix truck
              delivery.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Bagged concrete
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Best for post holes, deck piers, mailbox posts, small pergola
                  footings, and low-volume tube forms. The main concrete
                  calculator estimates 80 lb bags, 60 lb bags, pallets, and bag
                  cost.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  One-pallet rule
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  One common pickup-load pallet is about 42 bags of 80 lb
                  concrete or 56 bags of 60 lb concrete. If your sonotube project
                  exceeds one pallet, compare the bag cost against truck delivery.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Ready-mix truck
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Ready-mix may be better for many piers, deep tubes, pole barn
                  posts, and structural round footings. A standard concrete truck
                  is commonly limited to about 10 cubic yards per legal load.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/construction/concrete-calculator"
                className="inline-flex rounded-xl bg-[#F97316] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#EA580C]"
              >
                Calculate sonotube bags, pallets, and truck loads
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related sonotube tools</h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A0AEC0]">
            Use these related calculators to estimate project area, concrete volume,
            round piers, footing trenches, slab quantities, gravel base, and overall
            construction material needs.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating post, deck, or pier layouts."
            />

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, waste, and material cost for slabs, footings, piers, walls, stairs, curbs, and columns."
            />

            <RelatedLink
              href="/construction/concrete-cost-calculator"
              title="Concrete Cost Calculator"
              text="Estimate sonotube concrete price, rebar, labor, prep, delivery fees, and total project cost."
            />

            <RelatedLink
              href="/construction/concrete-footing-calculator"
              title="Concrete Footing Calculator"
              text="Estimate concrete for strip footings, trench footings, wall footings, and grade beams."
            />

            <RelatedLink
              href="/construction/rebar-calculator"
              title="Rebar Calculator"
              text="Estimate rebar length, weight, waste, and cost for piers, posts, sonotubes, and concrete reinforcement."
            />

            <RelatedLink
              href="/construction/concrete-mix-ratio"
              title="Concrete Mix Ratio Calculator"
              text="Estimate cement, sand, gravel, water, cement bags, and material quantities for common concrete mix ratios."
            />

            <RelatedLink
              href="/construction/concrete-bag-calculator"
              title="Concrete Bag Calculator"
              text="Estimate how many bags of concrete are needed for post holes, sonotubes, small piers, and deck footings."
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
          <h2 className="text-2xl font-semibold">Sonotube calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="What measurements do I need for a sonotube estimate?"
              answer="You need the tube diameter, depth or height, quantity of tubes, waste percentage, and concrete price."
            />

            <FAQItem
              question="Is a sonotube calculated as a cylinder?"
              answer="Yes. A sonotube is a cylindrical form, so the volume formula uses pi times radius squared times depth."
            />

            <FAQItem
              question="Can this be used for fence post holes?"
              answer="Yes. Use the Round Pier / Sonotube mode in the main concrete calculator and enter the hole diameter, depth, and quantity."
            />

            <FAQItem
              question="Does this include the post volume?"
              answer="No. This estimate assumes the hole or tube is filled with concrete. If a post displaces concrete volume, the actual amount may be slightly lower."
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