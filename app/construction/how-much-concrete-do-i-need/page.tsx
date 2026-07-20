import type { Metadata } from "next";
import Link from "next/link";
import HowMuchConcreteClient from "./HowMuchConcreteClient";

export const metadata: Metadata = {
  title: "How Much Concrete Do I Need? | Concrete Yardage Calculator",
  description:
    "Find out how much concrete you need for slabs, patios, driveways, footings, walls, stairs, pads, and piers. Estimate cubic yards, bags, ready-mix loads, waste, and project cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/how-much-concrete-do-i-need",
  },
  openGraph: {
    title: "How Much Concrete Do I Need?",
    description:
      "Estimate concrete yards, bags, ready-mix loads, waste, and cost for slabs, patios, driveways, footings, walls, stairs, pads, and piers.",
    url: "https://numeravo.com/construction/how-much-concrete-do-i-need",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Concrete Do I Need?",
    description:
      "Calculate concrete quantity for slabs, patios, driveways, footings, walls, pads, stairs, and piers.",
  },
};

export default function HowMuchConcreteDoINeedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "How Much Concrete Do I Need Calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Web",
    url: "https://numeravo.com/construction/how-much-concrete-do-i-need",
    description:
      "Estimate how much concrete you need in cubic yards, bags, ready-mix loads, waste allowance, and cost for common concrete projects.",
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
        name: "How do I calculate how much concrete I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For a slab, multiply length by width by thickness to get cubic feet, then divide by 27 to convert to cubic yards. Add a waste allowance, commonly 5 to 10 percent.",
        },
      },
      {
        "@type": "Question",
        name: "How many cubic feet are in one cubic yard of concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "One cubic yard equals 27 cubic feet. Concrete is usually ordered by the cubic yard for ready-mix delivery.",
        },
      },
      {
        "@type": "Question",
        name: "Should I order extra concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many small projects use a 5 to 10 percent waste allowance to account for uneven subgrade, form variation, spillage, and measurement error.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use bags instead of ready-mix concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Small repairs and very small pads may be practical with bags. Larger slabs, patios, and driveways usually require ready-mix concrete because bag counts become high quickly.",
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
              Concrete Quantity Calculator
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              How Much Concrete Do I Need?
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A0AEC0]">
              Estimate concrete quantity for slabs, patios, driveways, pads,
              footings, walls, piers, stairs, and small flatwork. Calculate cubic
              yards, bags, ready-mix loads, waste allowance, estimated weight, and
              basic material cost.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Main unit</p>
                <p className="mt-1 font-semibold text-white">Cubic yards</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Formula</p>
                <p className="mt-1 font-semibold text-white">ft³ ÷ 27</p>
              </div>
              <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-4">
                <p className="text-sm text-[#A0AEC0]">Waste range</p>
                <p className="mt-1 font-semibold text-white">5%–10%</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Quick formula</h2>
            <div className="mt-5 space-y-3">
              <QuickRow label="Cubic feet" value="Length × width × thickness" />
              <QuickRow label="Cubic yards" value="Cubic feet ÷ 27" />
              <QuickRow label="Order amount" value="Yards + waste" />
              <QuickRow label="Common waste" value="5% to 10%" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Always confirm final order quantities with your contractor or concrete
              supplier before scheduling delivery.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <HowMuchConcreteClient />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="For slabs and flatwork"
            text="Use this for patios, shed pads, walkways, garage slabs, driveway sections, and general rectangular concrete pours."
          />
          <InfoCard
            title="For delivery planning"
            text="See approximate ready-mix yards, short-load risk, concrete weight, and basic material cost before contacting suppliers."
          />
          <InfoCard
            title="For bag comparison"
            text="Compare ready-mix yards against 40 lb, 60 lb, and 80 lb bag counts to decide whether bags are practical."
          />
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How to calculate concrete
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#A0AEC0]">
            <p>
              Concrete quantity is usually measured in cubic yards. For a rectangular
              slab, multiply length by width by thickness to get cubic feet. Then
              divide by 27 because one cubic yard contains 27 cubic feet.
            </p>
            <p>
              Example: a 12 ft by 12 ft slab at 4 inches thick is 144 square feet.
              Four inches equals 0.333 ft, so the slab volume is about 48 cubic feet.
              Divide 48 by 27 to get about 1.78 cubic yards before waste.
            </p>
            <p>
              Small projects often need a waste allowance because the subgrade may
              not be perfectly level, forms may vary, and some material is lost during
              placement. A 5 to 10 percent allowance is common for many small pours.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How much concrete do common projects need?
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#1F2937]">
            <div className="grid grid-cols-3 bg-[#0B0F19] px-4 py-3 text-sm font-semibold text-white">
              <span>Project</span>
              <span>Common size</span>
              <span>Approx. concrete</span>
            </div>
            <ProjectRow project="10x10 slab" size="100 sq ft at 4 in" amount="~1.23 yd³ before waste" />
            <ProjectRow project="12x12 slab" size="144 sq ft at 4 in" amount="~1.78 yd³ before waste" />
            <ProjectRow project="10x20 patio" size="200 sq ft at 4 in" amount="~2.47 yd³ before waste" />
            <ProjectRow project="20x20 driveway section" size="400 sq ft at 4 in" amount="~4.94 yd³ before waste" />
            <ProjectRow project="Sidewalk section" size="4 ft × 20 ft at 4 in" amount="~0.99 yd³ before waste" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">
            How much concrete FAQs
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq
              question="How much concrete should I order?"
              answer="Order the calculated cubic yards plus a waste allowance. For many small slabs and flatwork projects, 5 to 10 percent extra is common."
            />
            <Faq
              question="How many cubic yards are in a truckload?"
              answer="Many ready-mix trucks carry around 8 to 10 cubic yards, but capacity and delivery minimums vary by supplier and region."
            />
            <Faq
              question="How much does one cubic yard of concrete weigh?"
              answer="A common estimating number is about 4,000 to 4,100 pounds per cubic yard for normal-weight concrete."
            />
            <Faq
              question="When should I use a more specific calculator?"
              answer="Use a slab, footing, wall, stairs, bag, or truckload calculator when the project has a specific shape, delivery constraint, or cost detail."
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold text-white">Related concrete calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href="/construction/concrete-weight-calculator" label="Concrete Weight Calculator" />
            <RelatedLink href="/construction/concrete-short-load-fee-calculator" label="Concrete Short Load Fee Calculator" />
            <RelatedLink href="/construction/concrete-waste-calculator" label="Concrete Waste Calculator" />
            <RelatedLink href="/construction/concrete-delivery-cost-calculator" label="Concrete Delivery Cost Calculator" />
            <RelatedLink href="/construction/concrete-yard-calculator" label="Concrete Yard Calculator" />
            <RelatedLink href="/construction/concrete-calculator" label="Concrete Calculator" />
            <RelatedLink href="/construction/concrete-slab-calculator" label="Concrete Slab Calculator" />
            <RelatedLink href="/construction/concrete-cost-calculator" label="Concrete Cost Calculator" />
            <RelatedLink href="/construction/concrete-cost-per-yard" label="Concrete Cost Per Yard Calculator" />
            <RelatedLink href="/construction/10x10-concrete-slab-cost" label="10x10 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/12x12-concrete-slab-cost" label="12x12 Concrete Slab Cost Calculator" />
            <RelatedLink href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <RelatedLink href="/construction/concrete-truckload-calculator" label="Concrete Truckload Calculator" />
            <RelatedLink href="/construction/concrete-footing-calculator" label="Concrete Footing Calculator" />
            <RelatedLink href="/construction/concrete-wall-calculator" label="Concrete Wall Calculator" />
            <RelatedLink href="/construction/concrete-stairs-calculator" label="Concrete Stairs Calculator" />
            <RelatedLink href="/construction/concrete-pad-calculator" label="Concrete Pad Calculator" />
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
