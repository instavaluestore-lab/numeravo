import type { Metadata } from "next";
import Link from "next/link";
import ConcreteYardCalculatorClient from "./ConcreteYardCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Yard Calculator | Cubic Yards for Concrete",
  description:
    "Free concrete yard calculator. Convert slab, footing, wall, pier, or known volume measurements into cubic yards, cubic feet, concrete bags, truckloads, weight, waste, and material cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-yard-calculator",
  },
  openGraph: {
    title: "Concrete Yard Calculator",
    description:
      "Calculate cubic yards of concrete for slabs, patios, driveways, footings, walls, piers, pads, and known volume projects.",
    url: "https://numeravo.com/construction/concrete-yard-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Yard Calculator",
    description:
      "Convert concrete dimensions into cubic yards, bags, truckloads, weight, waste, and estimated material cost.",
  },
};

export default function ConcreteYardCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Yard Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/concrete-yard-calculator",
    description:
      "Calculate cubic yards of concrete from project dimensions, including slabs, footings, walls, piers, known cubic feet, and known cubic yards.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate concrete yards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calculate cubic feet first, then divide by 27. For a slab, multiply length by width by thickness in feet, then divide by 27 to get cubic yards.",
        },
      },
      {
        "@type": "Question",
        name: "How many cubic feet are in a yard of concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "One cubic yard of concrete equals 27 cubic feet.",
        },
      },
      {
        "@type": "Question",
        name: "How much extra concrete should I order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many concrete projects add 5 to 10 percent extra for waste, uneven subgrade, spillage, form variation, and measurement error.",
        },
      },
      {
        "@type": "Question",
        name: "How many bags of concrete are in one cubic yard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Approximate bag counts per cubic yard are about 90 bags of 40 lb concrete, 60 bags of 60 lb concrete, or 45 bags of 80 lb concrete, depending on actual bag yield.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/construction"
            className="text-sm font-medium text-[#F97316] hover:underline"
          >
            ← Back to Construction Calculators
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              Concrete Volume Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Concrete Yard Calculator
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Calculate cubic yards of concrete for slabs, patios, driveways,
              footings, walls, round piers, pads, and known-volume projects. Estimate
              yards before waste, order yards with waste, bags, truckloads, weight,
              and material cost.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">1 cubic yard</p>
                <p className="mt-1 font-semibold text-white">27 ft³</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Typical waste</p>
                <p className="mt-1 font-semibold text-white">5%–10%</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Ready-mix unit</p>
                <p className="mt-1 font-semibold text-white">yd³</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Concrete yard formula</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="Cubic feet" value="L × W × thickness" />
              <QuickRow label="Cubic yards" value="Cubic feet ÷ 27" />
              <QuickRow label="Order quantity" value="Cubic yards + waste" />
              <QuickRow label="Weight estimate" value="~4,050 lb / yd³" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Supplier rules, truck capacity, minimum orders, and short-load fees
              vary. Confirm final order quantity with your ready-mix supplier.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ConcreteYardCalculatorClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Calculate concrete yards"
            text="Convert common construction dimensions into cubic yards for ready-mix ordering."
          />
          <InfoCard
            title="Compare bags and ready-mix"
            text="See approximate 40 lb, 60 lb, and 80 lb bag counts to decide when ready-mix is more practical."
          />
          <InfoCard
            title="Add waste allowance"
            text="Account for subgrade variation, form movement, uneven depth, spillage, and ordering safety margin."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How to convert concrete dimensions to yards
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              Concrete is usually ordered in cubic yards. First calculate the project
              volume in cubic feet. Then divide cubic feet by 27 because there are
              27 cubic feet in one cubic yard.
            </p>
            <p>
              For slabs, use length × width × thickness. Convert thickness from
              inches to feet before multiplying. A 4 inch slab is 0.333 feet thick.
            </p>
            <p>
              After calculating base cubic yards, add a waste allowance. Many small
              flatwork jobs use 5 to 10 percent extra, but complex pours or uneven
              subgrades may require more.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Common concrete yard examples
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Project</span>
              <span>Size</span>
              <span>Approx. yards</span>
            </div>
            <ProjectRow project="10x10 slab" size="4 in thick" amount="~1.23 yd³" />
            <ProjectRow project="12x12 slab" size="4 in thick" amount="~1.78 yd³" />
            <ProjectRow project="20x20 slab" size="4 in thick" amount="~4.94 yd³" />
            <ProjectRow project="40 ft footing" size="18 in wide × 12 in deep" amount="~2.22 yd³" />
            <ProjectRow project="Round pier" size="12 in diameter × 36 in deep" amount="~0.07 yd³ each" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Concrete yard calculator FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="What is a yard of concrete?"
              answer="A yard of concrete means one cubic yard, which equals 27 cubic feet of concrete volume."
            />
            <Faq
              question="How do I calculate yards for a concrete slab?"
              answer="Multiply slab length by width by thickness in feet to get cubic feet. Divide cubic feet by 27 to get cubic yards."
            />
            <Faq
              question="Should I round concrete yards up?"
              answer="Usually yes. Concrete orders are commonly rounded up after adding waste because running short during a pour can be expensive."
            />
            <Faq
              question="Is this the same as a concrete calculator?"
              answer="A concrete yard calculator focuses specifically on cubic yards for ordering. A full concrete calculator may include shapes, cost, bags, reinforcement, and project-specific details."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-weight-calculator" label="Concrete Weight Calculator" />
            <RelatedLink href="/construction/how-much-concrete-do-i-need" label="How Much Concrete Do I Need?" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
            <RelatedLink href="/construction/concrete-wall-calculator" label="Concrete Wall Calculator" />
            <RelatedLink href="/construction/10x10-concrete-slab-cost" label="10x10 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/12x12-concrete-slab-cost" label="12x12 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/sonotube-concrete-calculator" label="Sonotube Concrete Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function QuickRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </div>
  );
}

function ProjectRow({
  project,
  size,
  amount,
}: {
  project: string;
  size: string;
  amount: string;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
      <span className="font-semibold text-white">{project}</span>
      <span>{size}</span>
      <span>{amount}</span>
    </div>
  );
}

function Faq({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{answer}</p>
    </div>
  );
}

function RelatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#F97316]"
    >
      {label}
    </Link>
  );
}
