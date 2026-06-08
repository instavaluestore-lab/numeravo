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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[#1F2937] pb-5 last:border-b-0 last:pb-0">
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
  );
}