import Link from "next/link";
import MarkupCalculatorClient from "./MarkupCalculatorClient";

const url = "https://numeravo.com/business/markup-calculator";
const faqs = [
  { question: "What is markup?", answer: "Markup is profit expressed as a percentage of cost. A product costing $60 with a 40% markup has a $24 gross profit and an $84 selling price." },
  { question: "Is markup the same as profit margin?", answer: "No. Markup divides gross profit by cost, while margin divides gross profit by selling price. A 40% markup on cost equals about a 28.57% gross margin." },
  { question: "What costs should I include?", answer: "Include the costs directly associated with delivering one unit, such as materials, wholesale cost, direct labor, packaging, inbound freight, and other variable costs relevant to your business." },
  { question: "Why include fees and discounts?", answer: "Marketplace, card, platform, or transaction fees and customer discounts reduce the money retained from a sale. Testing them helps prevent an apparently profitable price from becoming a loss." },
];

export const metadata = {
  title: "Markup Calculator: Cost, Selling Price & Profit Margin",
  description: "Calculate markup, selling price, gross profit, equivalent margin, transaction fees, discounts, break-even price, and quantity totals for business pricing.",
  alternates: { canonical: url },
  openGraph: { title: "Markup Calculator for Business Pricing | Numeravo", description: "Turn product cost and markup into a selling price, then test fees, discounts, profit, and margin.", url, siteName: "Numeravo", type: "website" },
  twitter: { card: "summary_large_image", title: "Markup Calculator | Numeravo", description: "Calculate markup, price, margin, fees, discounts, and profit." },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "WebApplication", name: "Numeravo Markup Calculator", url, description: metadata.description, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["Selling price from cost and markup", "Equivalent profit margin", "Fee and discount analysis", "Break-even price", "Quantity totals", "CSV export"] },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Business Calculators", item: "https://numeravo.com/business" }, { "@type": "ListItem", position: 2, name: "Markup Calculator", item: url }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
];

export default function Page() {
  return <main className="min-h-screen bg-[#0B0F19] px-6 py-12 text-white">
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="text-sm text-[#A0AEC0]"><Link href="/business" className="hover:text-[#22D3EE]">Business Calculators</Link><span className="mx-2">/</span><span className="text-white">Markup Calculator</span></nav>
      <header className="mt-8 max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[.25em] text-[#22D3EE]">Business pricing calculator</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Markup Calculator</h1><p className="mt-6 text-lg leading-8 text-[#A0AEC0]">Calculate a selling price from cost and markup, then see gross profit, equivalent margin, fees, discounts, break-even price, and totals for multiple units. Use it to test product, wholesale, retail, service, and project pricing before quoting a customer.</p></header>
      <div className="mt-10"><MarkupCalculatorClient /></div>

      <section className="mt-14 grid gap-5 md:grid-cols-3">
        <Info title="Markup">Markup measures gross profit against cost: (selling price − cost) ÷ cost × 100.</Info>
        <Info title="Profit margin">Margin measures gross profit against selling price: (selling price − cost) ÷ selling price × 100.</Info>
        <Info title="Selling price">Selling price is the amount charged before or after the discount you choose to test.</Info>
      </section>

      <Content title="Markup versus margin: the important difference">Markup and margin describe the same gross profit from different starting points, so their percentages are not interchangeable. If an item costs $60 and sells for $100, gross profit is $40. The markup is 66.67% because $40 is divided by the $60 cost. The margin is 40% because $40 is divided by the $100 selling price. Confusing the two can cause systematic underpricing.</Content>
      <Content title="How to set a useful selling price">Start with a complete unit cost, not only the supplier invoice. Include direct labor, materials, packaging, inbound freight, and other variable costs that belong to the item or job. Apply the desired markup, then test payment fees, marketplace fees, and planned discounts. Finally, check profit after fees and the break-even price before publishing the price or sending a quote.</Content>
      <Content title="Gross profit is not net business profit">The calculator’s gross profit subtracts the entered unit cost from selling price. Profit after fees also subtracts the entered fixed and percentage transaction fees. Neither figure automatically includes rent, salaries, insurance, taxes, marketing, returns, overhead, or every cost of operating the business. Include relevant costs and verify the final price using your accounting records.</Content>

      <section className="mt-14 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Markup calculator FAQs</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map(faq => <article key={faq.question} className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{faq.question}</h3><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{faq.answer}</p></article>)}</div></section>
      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Methodology and disclaimer</h2><p className="mt-4 leading-7 text-[#A0AEC0]">Numeravo calculates estimates from the values you enter. Results are for business planning and educational use and are not accounting, tax, legal, or financial advice. Confirm costs, fees, taxes, and pricing decisions using current records and qualified professional guidance.</p><p className="mt-4 text-sm text-[#718096]">Created and maintained by Numeravo Technologies LLC.</p></section>
      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Related business calculators</h2><div className="mt-5 flex flex-wrap gap-3"><Link href="/business/profit-margin-calculator" className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#06B6D4]">Profit Margin Calculator</Link><Link href="/business" className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#06B6D4]">All Business Calculators</Link></div></section>
    </div>
  </main>;
}

function Info({ title, children }: { title: string; children: React.ReactNode }) { return <article className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5"><h2 className="font-semibold text-[#22D3EE]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{children}</p></article>; }
function Content({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mt-12 max-w-4xl"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-4 leading-7 text-[#A0AEC0]">{children}</p></section>; }
