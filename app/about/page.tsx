export const metadata = {
  title: "About Numeravo | Smart Calculators, Tools, and Guides",
  description:
    "Learn about Numeravo, a calculator platform built to help people make faster, clearer decisions with practical calculators, tools, and guides.",
  alternates: {
    canonical: "https://numeravo.com/about",
  },
  openGraph: {
    title: "About Numeravo",
    description:
      "Numeravo provides smart calculators, tools, and guides for everyday decisions across construction, finance, business, student work, conversions, and utilities.",
    url: "https://numeravo.com/about",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Numeravo",
    description:
      "Smart calculators, tools, and guides for everyday decisions.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3B82F6]">
          About Numeravo
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Smart calculators, tools, and guides for everyday decisions.
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
          Numeravo is a practical calculator platform built to help people solve
          everyday calculation problems quickly. Our goal is to make useful
          calculators easier to understand, faster to use, and more helpful for
          real-world decisions.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">What Numeravo covers</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Numeravo includes calculators and tools for construction,
              finance, student work, business planning, unit conversions, and
              general utility calculations.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">How we build calculators</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              We focus on clean inputs, clear formulas, useful results, mobile
              usability, and simple explanations so users can understand the
              numbers they are working with.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Our purpose</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Many online calculators are cluttered, confusing, or outdated.
              Numeravo is designed to feel modern, trustworthy, and easy to use
              on both desktop and mobile devices.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Important note</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Numeravo calculators are provided for planning and estimation.
              Results may vary based on real-world conditions, local pricing,
              professional requirements, and project-specific details.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}