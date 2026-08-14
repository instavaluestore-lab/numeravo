import type { Metadata } from "next";
import Link from "next/link";
import WallSheathingCalculatorClient from "./WallSheathingCalculatorClient";

export const metadata: Metadata = {
  title: "Wall Sheathing Calculator | Panels, Fasteners & Cost",
  description: "Estimate OSB or plywood wall sheathing panels, net wall area, opening deductions, waste, fasteners, housewrap, seam tape, and material cost.",
  alternates: { canonical: "https://numeravo.com/construction/wall-sheathing-calculator" },
  openGraph: { title: "Wall Sheathing Calculator | Numeravo", description: "Calculate wall sheathing panels, fasteners, weather barrier, waste and estimated material cost.", url: "https://numeravo.com/construction/wall-sheathing-calculator", siteName: "Numeravo", type: "website" },
  twitter: { card: "summary_large_image", title: "Wall Sheathing Calculator | Numeravo", description: "Estimate sheathing panels, fasteners, housewrap, tape and material cost." },
};

const faqs = [
  ["How many sheathing panels do I need?", "Calculate the net wall area after opening deductions, add waste, divide by the coverage of one panel, and round up to a whole panel."],
  ["Should door and window openings be deducted?", "Large openings can be deducted for planning. Some contractors keep small openings in the area because surrounding cuts and offcuts may consume similar material."],
  ["What wall sheathing thickness should I use?", "Required material, thickness, grade, span rating and fastening depend on approved plans, framing spacing, wind and seismic design, shear walls, cladding and local code."],
  ["How much waste should be added?", "A 10% allowance is a common planning starting point, but complex layouts, many openings, angled cuts, damage and limited reuse of offcuts can require more."],
  ["Does housewrap replace sheathing?", "No. Structural sheathing and weather-resistive barriers perform different functions. Follow the approved wall assembly and manufacturer installation instructions."],
];

export default function WallSheathingCalculatorPage() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: "Numeravo Wall Sheathing Calculator", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", url: "https://numeravo.com/construction/wall-sheathing-calculator", description: metadata.description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://numeravo.com" }, { "@type": "ListItem", position: 2, name: "Construction", item: "https://numeravo.com/construction" }, { "@type": "ListItem", position: 3, name: "Wall Sheathing Calculator", item: "https://numeravo.com/construction/wall-sheathing-calculator" }] },
  ] };

  return <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="mx-auto max-w-6xl">
    <nav className="text-sm text-[#A0AEC0]" aria-label="Breadcrumb"><Link href="/" className="hover:text-white">Home</Link><span className="px-2">/</span><Link href="/construction" className="hover:text-white">Construction</Link><span className="px-2">/</span><span>Wall Sheathing Calculator</span></nav>
    <header className="py-12"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">Exterior wall material planning</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Wall Sheathing Calculator</h1><p className="mt-5 max-w-4xl text-lg leading-8 text-[#A0AEC0]">Estimate net wall area, OSB or plywood panels, opening deductions, waste, fasteners, housewrap, seam tape, purchased coverage, and material cost.</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><Card label="Wall coverage" value="Area − openings" /><Card label="Material order" value="Panels + accessories" /><Card label="Project planning" value="Cost + overage" /></div></header>
    <WallSheathingCalculatorClient />
    <Section title="How to use the wall sheathing calculator"><p>Enter wall dimensions or a known net sheathing area. For dimension mode, add matching walls and deduct door and window openings. Then enter the exact panel coverage, waste, fastening, weather-barrier and supplier assumptions for the planned assembly.</p><div className="mt-6 grid gap-4 md:grid-cols-3"><Step number="1" title="Measure wall area">Enter wall dimensions and quantities, then account for openings.</Step><Step number="2" title="Set product coverage">Use the purchased panel, fastener, wrap and tape specifications.</Step><Step number="3" title="Verify the assembly">Check plans, code, fastening schedules and manufacturer instructions.</Step></div></Section>
    <Section title="Wall sheathing formulas"><div className="grid gap-4 md:grid-cols-2"><Formula title="Gross wall area" text="Length × height × wall quantity" /><Formula title="Net sheathing area" text="Gross wall area − door and window area" /><Formula title="Panels to purchase" text="Net area × waste factor ÷ panel coverage" /><Formula title="Whole-panel overage" text="Purchased panel coverage − net wall area" /></div></Section>
    <Section title="Wall sheathing planning FAQs"><div className="space-y-4">{faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{question}</h3><p className="mt-3 text-sm leading-7 text-[#A0AEC0]">{answer}</p></article>)}</div></Section>
    <Section title="Related construction calculators"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><Related href="/construction/stud-calculator" label="Stud Calculator" /><Related href="/construction/lumber-calculator" label="Lumber Calculator" /><Related href="/construction/area-calculator" label="Area Calculator" /><Related href="/construction/drywall-calculator" label="Drywall Calculator" /><Related href="/construction/paint-calculator" label="Paint Calculator" /><Related href="/construction/fence-calculator" label="Fence Calculator" /></div></Section>
  </div></main>;
}

function Card({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5"><p className="text-sm text-[#A0AEC0]">{label}</p><p className="mt-2 text-lg font-bold">{value}</p></div>; }
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mt-8 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">{title}</h2><div className="mt-4 leading-8 text-[#A0AEC0]">{children}</div></section>; }
function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><p className="text-sm font-semibold text-[#F97316]">Step {number}</p><h3 className="mt-2 font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6">{children}</p></div>; }
function Formula({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold text-white">{title}</h3><p className="mt-3 text-sm text-orange-300">{text}</p></div>; }
function Related({ href, label }: { href: string; label: string }) { return <Link href={href} className="rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-4 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-300">{label}</Link>; }
