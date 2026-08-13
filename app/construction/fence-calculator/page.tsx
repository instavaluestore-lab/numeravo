import type { Metadata } from "next";
import Link from "next/link";
import FenceCalculatorClient from "./FenceCalculatorClient";

export const metadata: Metadata = {
  title: "Fence Calculator | Posts, Pickets, Panels & Cost",
  description: "Estimate fence posts, rails, pickets, panels, gates, concrete, fasteners, waste, and material cost for wood and panel fence projects.",
  alternates: { canonical: "https://numeravo.com/construction/fence-calculator" },
  openGraph: {
    title: "Fence Calculator | Numeravo",
    description: "Calculate fence materials, whole-package quantities, concrete and estimated supplier cost.",
    url: "https://numeravo.com/construction/fence-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Fence Calculator | Numeravo", description: "Estimate posts, rails, pickets, panels, gates, concrete and fence material cost." },
};

const faqs = [
  ["How many fence posts do I need?", "Divide each fence run by the selected maximum post spacing, round up to whole sections, and include end, corner and gate posts. Terrain and bracing can add posts."],
  ["How far apart should fence posts be?", "Many wood fences use posts about 6 to 8 feet apart, but spacing depends on fence type, height, wind exposure, post size, soil, panels and local requirements."],
  ["How many pickets do I need?", "Convert the net fence length to inches and divide by the combined picket width and gap. Add waste and round up to a whole picket."],
  ["How much concrete is needed for fence posts?", "Concrete depends on post-hole diameter and depth, post size and post count. Product yield varies, so verify the bag label before purchasing."],
  ["Does this fence estimate include labor?", "No. The primary estimate covers editable material pricing, tax, delivery and additional fees. Installation labor, permits, demolition and site work should be priced separately."],
];

export default function FenceCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: "Numeravo Fence Calculator", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", url: "https://numeravo.com/construction/fence-calculator", description: metadata.description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numeravo.com" },
        { "@type": "ListItem", position: 2, name: "Construction", item: "https://numeravo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Fence Calculator", item: "https://numeravo.com/construction/fence-calculator" },
      ] },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-6xl">
        <nav className="text-sm text-[#A0AEC0]" aria-label="Breadcrumb"><Link href="/" className="hover:text-white">Home</Link><span className="px-2">/</span><Link href="/construction" className="hover:text-white">Construction</Link><span className="px-2">/</span><span>Fence Calculator</span></nav>

        <header className="py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">Fence material planning</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Fence Calculator</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-[#A0AEC0]">Estimate fence posts, sections, rails, pickets or panels, gate openings, post-hole concrete, fasteners, waste, and material cost using editable layout and supplier assumptions.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Callout label="Fence systems" value="Pickets + panels" />
            <Callout label="Material planning" value="Posts + concrete" />
            <Callout label="Project estimate" value="Cost + tax" />
          </div>
        </header>

        <FenceCalculatorClient />

        <section className="mt-8 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">How to use the fence calculator</h2>
          <p className="mt-4 max-w-4xl leading-8 text-[#A0AEC0]">Measure the complete fence line, identify corners and gates, then choose individual pickets or prebuilt panels. Enter the spacing and coverage assumptions for the exact system being purchased.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Step number="1" title="Measure the fence line">Record each run, corner, direction change and gate opening.</Step>
            <Step number="2" title="Choose the system">Enter post spacing, rails and pickets, or the manufactured panel width.</Step>
            <Step number="3" title="Verify the order">Confirm package coverage, concrete yield, pricing, code and utility locations.</Step>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Fence material formulas</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Formula title="Fence sections" formula="Net fence length ÷ maximum post spacing" />
            <Formula title="Pickets" formula="Net length in inches ÷ (picket width + gap)" />
            <Formula title="Panels" formula="Net fence length ÷ panel width" />
            <Formula title="Concrete per hole" formula="Hole-cylinder volume − embedded post volume" />
          </div>
          <p className="mt-5 text-sm leading-7 text-[#A0AEC0]">Calculated purchase quantities are rounded up to whole items. Waste is applied to posts, rails, pickets or panels; concrete and fasteners are rounded to whole packages.</p>
        </section>

        <section className="mt-8 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Fence planning FAQs</h2>
          <div className="mt-6 space-y-4">{faqs.map(([question, answer]) => <div key={question} className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{question}</h3><p className="mt-3 text-sm leading-7 text-[#A0AEC0]">{answer}</p></div>)}</div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
          <h2 className="text-2xl font-bold">Related construction calculators</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Related href="/construction/deck-materials-calculator" label="Deck Materials Calculator" />
            <Related href="/construction/lumber-calculator" label="Lumber Calculator" />
            <Related href="/construction/concrete-calculator" label="Concrete Calculator" />
            <Related href="/construction/concrete-bag-calculator" label="Concrete Bag Calculator" />
            <Related href="/construction/sonotube-concrete-calculator" label="Sonotube Concrete Calculator" />
            <Related href="/construction/area-calculator" label="Area Calculator" />
          </div>
        </section>
      </div>
    </main>
  );
}

function Callout({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5"><p className="text-sm text-[#A0AEC0]">{label}</p><p className="mt-2 text-lg font-bold">{value}</p></div>; }
function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><p className="text-sm font-semibold text-[#F97316]">Step {number}</p><h3 className="mt-2 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{children}</p></div>; }
function Formula({ title, formula }: { title: string; formula: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm text-orange-300">{formula}</p></div>; }
function Related({ href, label }: { href: string; label: string }) { return <Link href={href} className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-4 text-sm font-semibold transition hover:border-orange-400 hover:text-orange-300">{label}</Link>; }
