export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-start gap-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3B82F6]">
            Numeravo
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Smart calculators, tools, and guides for everyday decisions.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#A0AEC0]">
            Numeravo helps people quickly solve everyday calculation problems
            across construction, finance, student work, business, conversions,
            and general utility tools.
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <div className="mb-4 h-2 w-12 rounded-full bg-[#F97316]" />
            <h2 className="text-xl font-semibold">Construction</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Concrete, gravel, square footage, materials, and project cost
              calculators.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <div className="mb-4 h-2 w-12 rounded-full bg-[#22C55E]" />
            <h2 className="text-xl font-semibold">Finance</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Loans, savings, interest, payoff, ROI, and personal finance tools.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <div className="mb-4 h-2 w-12 rounded-full bg-[#8B5CF6]" />
            <h2 className="text-xl font-semibold">Student</h2>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Math, grades, percentages, study helpers, and academic calculators.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
