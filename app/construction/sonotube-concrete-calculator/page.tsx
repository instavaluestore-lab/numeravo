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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[#1F2937] pb-5 last:border-b-0 last:pb-0">
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
  );
}