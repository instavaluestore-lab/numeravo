import Link from "next/link";
import BreakEvenCalculatorClient from "./BreakEvenCalculatorClient";

const url = "https://numeravo.com/business/break-even-calculator";
const faqs = [
  { question: "What is the break-even point?", answer: "The break-even point is the sales level where total contribution equals fixed costs, producing neither an operating profit nor an operating loss under the entered assumptions." },
  { question: "How do you calculate break-even units?", answer: "Divide fixed costs by contribution margin per unit. Contribution margin per unit equals selling price minus variable cost per unit. Round units up because a partial unit normally cannot be sold." },
  { question: "What is contribution margin?", answer: "Contribution margin is the amount remaining from each sale after variable costs. It first covers fixed costs; sales above break-even then contribute toward operating profit." },
  { question: "What is margin of safety?", answer: "Margin of safety is the amount current or forecast sales exceed break-even sales. It indicates how far volume could decline before the business reaches its modeled break-even point." },
  { question: "Can this calculate units needed for a target profit?", answer: "Yes. It adds the target profit to fixed costs and divides that total by contribution margin per unit, rounding the result up to a whole unit." },
  { question: "Which costs are fixed and which are variable?", answer: "Fixed costs generally do not change directly with short-term unit volume, while variable costs rise with each unit sold. Classification depends on the business, time period, and relevant range, so verify assumptions with current records." },
];

export const metadata = {
  title: "Break-Even Calculator: Units, Revenue & Target Profit",
  description: "Calculate break-even units and revenue, contribution margin, target-profit sales, margin of safety, daily volume, capacity, and pricing scenarios.",
  alternates: { canonical: url },
  openGraph: { title: "Business Break-Even Calculator | Numeravo", description: "Estimate break-even sales, contribution margin, target-profit volume, safety margin, and capacity requirements.", url, siteName: "Numeravo", type: "website" },
  twitter: { card: "summary_large_image", title: "Break-Even Calculator | Numeravo", description: "Calculate break-even units, revenue, target-profit volume, and margin of safety." },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "WebApplication", name: "Numeravo Break-Even Calculator", url, description: metadata.description, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["Break-even units", "Break-even revenue", "Contribution margin", "Target-profit volume", "Margin of safety", "Capacity analysis", "Scenario comparison", "CSV export"] },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Business Calculators", item: "https://numeravo.com/business" }, { "@type": "ListItem", position: 2, name: "Break-Even Calculator", item: url }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
];

export default function Page() {
  return <main className="min-h-screen bg-[#0B0F19] px-6 py-12 text-white">
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="text-sm text-[#A0AEC0]"><Link href="/business" className="hover:text-[#22D3EE]">Business Calculators</Link><span className="mx-2">/</span><span className="text-white">Break-Even Calculator</span></nav>
      <header className="mt-8 max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[.25em] text-[#22D3EE]">Business planning calculator</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Break-Even Calculator</h1><p className="mt-6 text-lg leading-8 text-[#A0AEC0]">Calculate the units and revenue needed to cover fixed and variable costs. Then estimate target-profit volume, contribution margin, margin of safety, daily sales requirements, capacity feasibility, and the effect of changing price or variable cost.</p></header>
      <div className="mt-10"><BreakEvenCalculatorClient /></div>

      <section className="mt-14 grid gap-5 md:grid-cols-3"><Info title="Break-even units">Fixed costs ÷ contribution margin per unit.</Info><Info title="Contribution per unit">Selling price per unit − variable cost per unit.</Info><Info title="Target-profit units">(Fixed costs + target profit) ÷ contribution margin per unit.</Info></section>

      <Content title="How to use the break-even calculator"><p>Choose one consistent planning period, such as a month, quarter, year, project, event, or production run. Enter all fixed costs attributable to that period, the average selling price per unit, and the variable cost required to produce or deliver one unit. The calculator estimates the minimum whole units and approximate revenue required to cover those modeled costs.</p><p>Add current or forecast sales to measure estimated profit and margin of safety. Add a target profit to identify the required volume. Capacity and operating days turn the result into a feasibility check: a mathematically valid target may still be unrealistic if the business cannot produce, sell, or deliver enough units.</p></Content>
      <Content title="Fixed costs versus variable costs"><p>Fixed costs generally remain stable within the chosen period and relevant operating range. Examples may include rent, salaried administrative labor, software subscriptions, insurance, and equipment leases. Variable costs typically increase with each unit, such as product cost, direct materials, piece-rate labor, packaging, transaction charges, shipping subsidies, or job-specific supplies.</p><p>Some costs are mixed or step-based rather than perfectly fixed or variable. Classify costs consistently, use averages when appropriate, and run more than one scenario when volume could change staffing, facilities, equipment, or supplier pricing.</p></Content>
      <Content title="Contribution margin, target profit, and margin of safety"><p>Contribution margin is not the same as gross margin or final net profit. It measures what remains from each sale after the entered variable cost and shows how much each unit contributes toward fixed costs and profit. Target-profit analysis adds the desired profit to fixed costs before calculating required units.</p><p>Margin of safety compares current or forecast volume with break-even volume. A larger positive margin provides more modeled room for a sales decline; a negative margin indicates that the entered sales volume remains below break-even.</p></Content>
      <Content title="Use scenario comparison before changing price"><p>A higher selling price can reduce the units required to break even, but demand may also change. Lower variable costs may improve contribution without changing customer price, but quality, fulfillment, or supplier constraints can be affected. Compare scenarios here, then validate assumptions using actual sales behavior, customer research, capacity, and current cost records.</p></Content>

      <section className="mt-14 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Break-even calculator FAQs</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map(faq => <article key={faq.question} className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{faq.question}</h3><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{faq.answer}</p></article>)}</div></section>
      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Methodology and disclaimer</h2><p className="mt-4 leading-7 text-[#A0AEC0]">Numeravo uses the values entered and a standard contribution-margin model. It assumes selling price, variable cost per unit, and fixed costs remain constant within the modeled relevant range. Results are planning estimates and are not accounting, tax, legal, investment, or financial advice. Verify classifications and assumptions using current business records and qualified professional guidance.</p><p className="mt-4 text-sm text-[#718096]">Created and maintained by Numeravo Technologies LLC.</p></section>
      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Related business calculators</h2><div className="mt-5 flex flex-wrap gap-3"><Related href="/business/profit-margin-calculator">Profit Margin Calculator</Related><Related href="/business/markup-calculator">Markup Calculator</Related><Related href="/business">All Business Calculators</Related></div></section>
    </div>
  </main>;
}

function Info({ title, children }: { title: string; children: React.ReactNode }) { return <article className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5"><h2 className="font-semibold text-[#22D3EE]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{children}</p></article>; }
function Content({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mt-12 max-w-4xl"><h2 className="text-2xl font-bold">{title}</h2><div className="mt-4 space-y-4 leading-7 text-[#A0AEC0]">{children}</div></section>; }
function Related({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#06B6D4]">{children}</Link>; }
