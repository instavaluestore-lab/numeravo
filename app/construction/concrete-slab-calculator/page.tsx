import Link from "next/link";

export const metadata = {
  title: "Concrete Slab Calculator | Estimate Concrete for Slabs & Pads",
  description:
    "Use the Numeravo concrete slab calculator guide to estimate concrete for slabs, patios, driveways, sidewalks, garage floors, shed pads, and flat concrete pours.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-slab-calculator",
  },
  openGraph: {
    title: "Concrete Slab Calculator | Numeravo",
    description:
      "Estimate concrete for slabs, patios, driveways, sidewalks, shed pads, garage floors, and flat concrete pours.",
    url: "https://numeravo.com/construction/concrete-slab-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Slab Calculator | Numeravo",
    description:
      "Estimate slab concrete volume, waste, cubic yards, and project cost.",
  },
};

export default function ConcreteSlabCalculatorPage() {
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
                    name: "Concrete Slab Calculator",
                    item: "https://numeravo.com/construction/concrete-slab-calculator",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How thick should a concrete slab be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Many patios, sidewalks, and shed pads use 4 inches as a common slab thickness, but requirements can vary by project, soil, load, reinforcement, and local code.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I add waste to a slab estimate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. A 5% to 10% waste allowance is commonly used for planning because real pours can require extra concrete.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I calculate concrete slabs in metric units?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The Numeravo concrete calculator supports metric inputs using meters and centimeters and outputs cubic meters.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does the slab calculator include labor?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. The calculator estimates concrete volume and material cost only. Labor, delivery, forms, reinforcement, gravel, and finishing costs are separate.",
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
          Concrete Slab Calculator
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Concrete slab calculator for patios, driveways, sidewalks, and pads.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
          Estimate how much concrete you need for rectangular slabs, square
          pads, patios, sidewalks, driveways, garage floors, and shed pads. Use
          the main concrete calculator to enter dimensions, add waste, switch
          between imperial and metric units, and estimate material cost.
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
              How to calculate concrete for a slab
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              For a rectangular concrete slab, multiply length by width by
              thickness. If you are using imperial measurements, enter length
              and width in feet and thickness in inches. The calculator converts
              the result into cubic feet and cubic yards.
            </p>

            <div className="mt-5 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
              <p className="text-sm font-semibold text-white">Formula</p>
              <p className="mt-2 text-sm text-[#A0AEC0]">
                Length × Width × Thickness = Concrete Volume
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Most concrete slab estimates should include extra material for
              waste, uneven base conditions, forms, spillage, and small
              measurement differences. A common waste allowance is 5% to 10%.
            </p>
          </section>

          <aside className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Common slab projects</h2>

            <div className="mt-5 space-y-3">
              {[
                "Patio slabs",
                "Driveway slabs",
                "Sidewalks and walkways",
                "Garage floors",
                "Shed pads",
                "Hot tub pads",
                "Equipment pads",
                "Small concrete pads",
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
          <h2 className="text-2xl font-semibold">Concrete slab example</h2>

          <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
            A 10 ft by 10 ft slab that is 4 inches thick has a volume of about
            33.33 cubic feet. Since one cubic yard equals 27 cubic feet, that is
            about 1.23 cubic yards before waste. With 10% waste, the estimate is
            about 1.36 cubic yards, usually rounded up to a practical order
            amount.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Bags vs Truck Delivery
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Should you use concrete bags or a ready-mix truck for a slab?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Small concrete slabs can sometimes be poured with bagged concrete,
              but larger patios, driveways, garage floors, and shed pads usually
              make more sense with ready-mix truck delivery. The main concrete
              calculator can now estimate 80 lb bags, 60 lb bags, pallet counts,
              bag cost, cubic yards, and truck loads.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Bagged concrete
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Best for very small slabs, patch work, small pads, and areas
                  where a concrete truck cannot reach. Bagged concrete becomes
                  labor-heavy as slab size increases.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  One-pallet rule
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  One common pickup-load pallet is about 42 bags of 80 lb
                  concrete or 56 bags of 60 lb concrete. If your slab needs more
                  than one pallet, consider ready-mix delivery.
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Ready-mix truck
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
                  Ready-mix is usually better for larger slabs. A standard
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
                Calculate bags, pallets, and truck loads
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related slab tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/area-calculator"
              title="Area Calculator"
              text="Calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost before estimating concrete for a slab."
            />

            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, cubic yards, waste, and material cost for slabs, footings, piers, columns, and walls."
            />

            <RelatedLink
              href="/construction/concrete-driveway-calculator"
              title="Concrete Driveway Calculator"
              text="Estimate concrete driveway cubic yards, slab thickness, base material, reinforcement, labor, and total cost."
            />

            <RelatedLink
              href="/construction/rebar-calculator"
              title="Rebar Calculator"
              text="Estimate rebar size, spacing, linear feet, stick count, weight, lap allowance, and material cost for slab reinforcement."
            />

            <RelatedLink
              href="/construction/concrete-bag-calculator"
              title="Concrete Bag Calculator"
              text="Estimate how many bags of concrete are needed for small slabs, pads, patios, and repairs."
            />

            <RelatedLink
              href="/construction/concrete-cost-calculator"
              title="Concrete Cost Calculator"
              text="Estimate concrete price, base material, rebar, labor, prep, delivery fees, and total slab project cost."
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
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, pea gravel, river rock, paver base, and drainage rock."
            />

            <RelatedLink
              href="/construction/road-base-calculator"
              title="Road Base Calculator"
              text="Estimate road base cubic yards, tons, waste, and cost using the Road Base material preset."
            />

            <RelatedLink
              href="/construction/concrete-footing-calculator"
              title="Concrete Footing Calculator"
              text="Estimate concrete for footings, trenches, foundation strips, and other support pours."
            />

            <RelatedLink
              href="/construction/concrete-wall-calculator"
              title="Concrete Wall Calculator"
              text="Estimate concrete volume for poured walls, retaining walls, stem walls, and wall sections."
            />

            <RelatedLink
              href="/construction/sonotube-concrete-calculator"
              title="Sonotube Concrete Calculator"
              text="Estimate concrete for round piers, post holes, deck footings, and column forms."
            />

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="Browse concrete, gravel, base, and construction estimating calculators."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Slab calculator FAQ</h2>

          <div className="mt-6 space-y-5">
            <FAQItem
              question="How thick should a concrete slab be?"
              answer="Many patios, sidewalks, and shed pads use 4 inches as a common slab thickness, but requirements can vary by project, soil, load, reinforcement, and local code."
            />

            <FAQItem
              question="Should I add waste to a slab estimate?"
              answer="Yes. A 5% to 10% waste allowance is commonly used for planning because real pours can require extra concrete."
            />

            <FAQItem
              question="Can I calculate concrete slabs in metric units?"
              answer="Yes. The Numeravo concrete calculator supports metric inputs using meters and centimeters and outputs cubic meters."
            />

            <FAQItem
              question="Does the slab calculator include labor?"
              answer="No. The calculator estimates concrete volume and material cost only. Labor, delivery, forms, reinforcement, gravel, and finishing costs are separate."
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