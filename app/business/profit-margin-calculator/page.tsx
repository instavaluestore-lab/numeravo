import type { Metadata } from "next";
import Link from "next/link";
import ProfitMarginCalculatorClient from "./ProfitMarginCalculatorClient";

const url = "https://numeravo.com/business/profit-margin-calculator";
const description = "Calculate profit margin, profit per unit, markup, selling price, allowable cost, transaction fees, and total profit for a product or service.";

export const metadata: Metadata = {
  title: "Profit Margin Calculator – Margin, Markup and Selling Price",
  description,
  alternates: { canonical: url },
  openGraph: { title: "Profit Margin Calculator – Margin and Selling Price", description, url, siteName: "Numeravo", type: "website" },
  twitter: { card: "summary_large_image", title: "Profit Margin Calculator | Numeravo", description },
};

const faqs = [
  { question: "How do you calculate profit margin?", answer: "Subtract total unit cost and applicable fees from selling price to find profit. Divide that profit by selling price and multiply by 100 to calculate profit margin percentage." },
  { question: "What is the difference between margin and markup?", answer: "Margin divides profit by selling price. Markup divides profit by cost. The percentages are different even when cost, price, and profit are identical." },
  { question: "How do I calculate a selling price from a target margin?", answer: "When there are no fees, divide cost by one minus the target margin expressed as a decimal. This calculator also adjusts for optional fixed and percentage transaction fees." },
  { question: "Can profit margin be negative?", answer: "Yes. A negative margin means the selling price is below the combined cost and included fees, producing an estimated loss." },
  { question: "What costs should I include?", answer: "Include costs directly associated with providing one unit, such as acquisition, materials, direct labor, packaging, fulfillment, or other costs relevant to your analysis. Keep your method consistent." },
  { question: "Does this calculator include payment processing or marketplace fees?", answer: "Optional fixed and percentage fees can be included. Enter the fee structure that applies to each transaction and verify the provider's current terms." },
  { question: "Is gross margin the same as net margin?", answer: "No. Gross margin generally considers revenue minus cost of goods sold. Net margin considers a broader set of operating expenses, interest, taxes, and other costs." },
  { question: "What is a good profit margin?", answer: "There is no universal target. Appropriate margins vary by industry, business model, volume, overhead, competition, customer acquisition cost, and risk." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "WebApplication", name: "Numeravo Profit Margin Calculator", url, description, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["Profit margin", "Markup on cost", "Target selling price", "Maximum allowable cost", "Transaction fees", "Quantity totals", "Price comparison", "CSV export"] },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Business Calculators", item: "https://numeravo.com/business" }, { "@type": "ListItem", position: 2, name: "Profit Margin Calculator", item: url }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
];

export default function ProfitMarginCalculatorPage() {
  return <main className="min-h-screen bg-[#0B0F19] px-6 py-12 text-white">
    {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="text-sm text-[#A0AEC0]"><Link href="/business" className="hover:text-[#06B6D4]">Business Calculators</Link><span className="mx-2">/</span><span className="text-white">Profit Margin Calculator</span></nav>
      <header className="mt-8 max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[.25em] text-[#06B6D4]">Business calculator</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Profit Margin Calculator</h1><p className="mt-6 text-lg leading-8 text-[#A0AEC0]">Calculate profit margin, markup, profit per unit, and total profit from cost and selling price. You can also work backward from a target margin to find a selling price or the maximum allowable cost.</p></header>
      <div className="mt-10"><ProfitMarginCalculatorClient /></div>

      <section className="mt-14 grid gap-4 md:grid-cols-3"><Info title="Calculate current margin">Enter cost and selling price to measure profit per unit, margin on revenue, and markup on cost.</Info><Info title="Set a target price">Enter cost and a desired margin to estimate the selling price required after optional transaction fees.</Info><Info title="Control purchasing costs">Enter price and target margin to find the maximum estimated unit cost that supports the goal.</Info></section>

      <Content title="How to use the profit margin calculator"><p>Choose the calculation that matches the unknown value. Use Calculate margin when cost and price are known. Use Find selling price when cost and target margin are known. Use Find allowable cost when price and target margin are known.</p><p>Add fixed or percentage transaction fees when they apply to each sale. Quantity expands the unit estimate into revenue, cost, fees, and profit totals without changing the underlying margin percentage.</p></Content>
      <Content title="Profit margin formula"><p>Profit equals selling price minus unit cost and included fees. Profit margin equals profit divided by selling price, multiplied by 100. Because margin uses revenue as its denominator, it describes how much of each sales dollar remains after the included costs.</p></Content>
      <Content title="Profit margin versus markup"><p>Markup measures profit relative to cost, while margin measures profit relative to selling price. For example, buying an item for $50 and selling it for $100 creates a $50 profit, a 100% markup, and a 50% margin before other fees or expenses.</p></Content>
      <Content title="How to price for a target margin"><p>Pricing from a target margin requires working backward from revenue. With no fees, selling price equals cost divided by one minus the target margin. Percentage-based fees also consume part of revenue, while fixed fees increase the amount that must be recovered.</p></Content>
      <Content title="Gross margin versus net margin"><p>This tool is most useful for unit economics and gross-margin planning. A complete net-margin analysis may also include payroll, rent, software, advertising, returns, depreciation, interest, taxes, and other overhead. Include only costs appropriate to the metric you intend to compare.</p></Content>
      <Content title="How discounts affect margin"><p>A discount reduces selling price while cost may remain unchanged, so profit margin can fall quickly. Use the 10% lower price scenario as a preliminary discount test, then enter the exact discounted price for a final estimate.</p></Content>

      <section className="mt-14 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Profit margin calculator methodology</h2><div className="mt-5 space-y-4 leading-7 text-[#A0AEC0]"><p>The calculator subtracts unit cost, fixed transaction fees, and percentage fees from selling price. It then reports profit as a share of revenue for margin and as a share of unit cost for markup.</p><p>Reverse calculations algebraically solve for selling price or allowable cost using the entered target margin and fees. Results are rounded for display, while calculations use unrounded values.</p></div></section>

      <section className="mt-14 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Profit margin calculator FAQs</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map(f => <article key={f.question} className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{f.question}</h3><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{f.answer}</p></article>)}</div></section>

      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Business-planning disclaimer</h2><p className="mt-4 leading-7 text-[#A0AEC0]">Results are educational estimates and are not financial, accounting, tax, legal, or pricing advice. Actual profitability depends on complete and accurate costs, returns, discounts, overhead, taxes, market conditions, and other business factors. Verify calculations and consult qualified professionals when appropriate.</p><p className="mt-4 text-sm text-[#718096]">Created and maintained by Numeravo Technologies LLC.</p></section>

      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Related business calculators</h2><div className="mt-5 flex flex-wrap gap-3"><Related href="/business/markup-calculator">Markup Calculator</Related><Related href="/business/break-even-calculator">Break-Even Calculator</Related><Related href="/business">All Business Calculators</Related></div></section>
    </div>
  </main>;
}

function Info({ title, children }: { title: string; children: React.ReactNode }) { return <article className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5"><h2 className="font-semibold text-[#22D3EE]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{children}</p></article>; }
function Content({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mt-12 max-w-4xl"><h2 className="text-2xl font-bold">{title}</h2><div className="mt-4 space-y-4 leading-7 text-[#A0AEC0]">{children}</div></section>; }
function Related({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#06B6D4]">{children}</Link>; }
