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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[#1F2937] pb-5 last:border-b-0 last:pb-0">
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
  );
}