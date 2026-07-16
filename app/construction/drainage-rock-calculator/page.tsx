import type { Metadata } from "next";
import Link from "next/link";
import DrainageRockCalculatorClient from "./DrainageRockCalculatorClient";

export const metadata: Metadata = {
  title: "Drainage Rock Calculator | French Drain Rock, Tons & Cost",
  description:
    "Calculate drainage rock for French drains, trench drains, dry wells, retaining wall drainage, and landscape drainage beds. Estimate cubic yards, tons, delivery, and cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/drainage-rock-calculator",
  },
  openGraph: {
    title: "Drainage Rock Calculator | French Drain Rock, Tons & Cost",
    description:
      "Estimate drainage rock cubic yards, tons, delivery, and cost for French drains, dry wells, retaining walls, and drainage beds.",
    url: "https://numeravo.com/construction/drainage-rock-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drainage Rock Calculator | French Drain Rock, Tons & Cost",
    description:
      "Estimate drainage rock cubic yards, tons, delivery, and cost for drainage projects.",
  },
};

export default function DrainageRockCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Construction Calculators",
        item: "https://numeravo.com/construction",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Drainage Rock Calculator",
        item: "https://numeravo.com/construction/drainage-rock-calculator",
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Drainage Rock Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A free construction calculator for estimating drainage rock cubic yards, tons, delivery, and cost for French drains, dry wells, retaining wall drainage, trench drains, and drainage beds.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much drainage rock do I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply the drainage area length by width by depth to get cubic feet, divide by 27 to convert to cubic yards, then multiply by the tons-per-cubic-yard density factor. Add 5% to 15% waste for settlement, spillage, and uneven trench bottoms.",
        },
      },
      {
        "@type": "Question",
        name: "What size rock is best for drainage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Clean, washed drainage rock is commonly used because it allows water to move through the void spaces. Many French drain projects use 3/4 inch to 1-1/2 inch clean stone, but the right size depends on the pipe, fabric, soil, and local drainage conditions.",
        },
      },
      {
        "@type": "Question",
        name: "How deep should drainage rock be for a French drain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many French drains use a trench around 12 to 24 inches deep, but depth depends on the water problem, pipe placement, slope, soil, and discharge point. The pipe should usually be surrounded by clean drainage stone and wrapped with suitable filter fabric.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0B0F19] text-white">
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/construction" className="text-sm font-medium text-[#F97316] hover:underline">
              ← Back to Construction Calculators
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
                Construction Calculator
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Drainage Rock Calculator
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
                Estimate drainage rock volume, tons, delivery, and cost for French drains,
                trench drains, dry wells, retaining wall drainage, swales, and drainage beds.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#drainage-rock-calculator"
                  className="rounded-xl bg-[#F97316] px-6 py-3 text-center font-semibold text-white transition hover:opacity-90"
                >
                  Use Drainage Rock Calculator
                </a>
                <Link
                  href="/construction/gravel-calculator"
                  className="rounded-xl border border-[#1F2937] px-6 py-3 text-center font-semibold text-white transition hover:border-[#F97316]"
                >
                  Compare Gravel Calculator
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
              <h2 className="text-xl font-semibold">Common drainage rock uses</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#A0AEC0]">
                <li>• French drain trenches</li>
                <li>• Retaining wall backfill drainage</li>
                <li>• Dry well stone beds</li>
                <li>• Yard drainage swales</li>
                <li>• Drainage pipe bedding</li>
                <li>• Landscape drainage zones</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="drainage-rock-calculator" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <DrainageRockCalculatorClient />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
              <h2 className="text-2xl font-semibold">Drainage rock formula</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#A0AEC0]">
                <p>
                  <strong className="text-white">Cubic feet</strong> = length × width × depth
                </p>
                <p>
                  <strong className="text-white">Cubic yards</strong> = cubic feet ÷ 27
                </p>
                <p>
                  <strong className="text-white">Tons</strong> = cubic yards with waste × tons per cubic yard
                </p>
                <p>
                  <strong className="text-white">Estimated cost</strong> = tons × price per ton + delivery
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
              <h2 className="text-2xl font-semibold">Typical drainage rock depths</h2>
              <div className="mt-4 overflow-hidden rounded-xl border border-[#1F2937]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0B0F19] text-white">
                    <tr>
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">Typical depth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F2937] text-[#A0AEC0]">
                    <tr>
                      <td className="px-4 py-3">French drain</td>
                      <td className="px-4 py-3">12–24 inches</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Retaining wall drainage</td>
                      <td className="px-4 py-3">12–24 inches behind wall</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Dry well stone bed</td>
                      <td className="px-4 py-3">18–36 inches</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Landscape drainage bed</td>
                      <td className="px-4 py-3">4–12 inches</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Related gravel and base calculators</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <RelatedLink
                href="/construction/gravel-calculator"
                title="Gravel Calculator"
                text="Estimate gravel, crushed stone, road base, pea gravel, river rock, paver base, and drainage rock."
              />
              <RelatedLink
                href="/construction/road-base-calculator"
                title="Road Base Calculator"
                text="Estimate compacted road base volume, tons, waste, delivery, and cost."
              />
              <RelatedLink
                href="/construction/river-rock-calculator"
                title="River Rock Calculator"
                text="Estimate decorative river rock for landscape beds, borders, and drainage areas."
              />
              <RelatedLink
                href="/construction/crushed-stone-calculator"
                title="Crushed Stone Calculator"
                text="Estimate crushed stone cubic yards, tons, waste, and material cost."
              />
              <RelatedLink
                href="/construction/how-much-gravel-do-i-need"
                title="How Much Gravel Do I Need?"
                text="Use a general gravel estimator and guide for different gravel project types."
              />
              <RelatedLink
                href="/construction/paver-base-calculator"
                title="Paver Base Calculator"
                text="Estimate paver base gravel and bedding sand for patios, walkways, and driveways."
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Drainage rock FAQ</h2>
            <div className="mt-5 space-y-5 text-sm leading-7 text-[#A0AEC0]">
              <div>
                <h3 className="font-semibold text-white">How much drainage rock do I need?</h3>
                <p>
                  Multiply length by width by depth to get cubic feet. Divide by 27 for cubic yards,
                  then multiply by the material density to estimate tons. Add waste for uneven trenches,
                  settlement, and ordering tolerance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Should drainage rock be washed?</h3>
                <p>
                  Clean washed stone is usually better for drainage because fines and dust can reduce
                  water flow. For French drains, use suitable drainage fabric to help keep soil out of the stone.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Does this calculator include pipe or fabric?</h3>
                <p>
                  No. This calculator estimates drainage rock only. Pipe, fittings, filter fabric,
                  excavation, labor, disposal, and permits should be estimated separately.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
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
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </Link>
  );
}
