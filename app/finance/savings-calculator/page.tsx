import type { Metadata } from "next";
import Link from "next/link";
import SavingsCalculatorClient from "./SavingsCalculatorClient";

const url = "https://numeravo.com/finance/savings-calculator";
const description = "Calculate how much to save each month, estimate future savings growth, and see when you may reach your goal using contributions, APY, and compound interest.";

export const metadata: Metadata = {
  title: "Savings Calculator – Monthly Savings and Goal Growth",
  description,
  alternates: { canonical: url },
  openGraph: { title: "Savings Calculator – Monthly Savings and Goal Growth", description, url, siteName: "Numeravo", type: "website" },
  twitter: { card: "summary_large_image", title: "Savings Calculator | Numeravo", description },
};

const faqs = [
  { question: "How much should I save each month?", answer: "Choose a goal amount and target date, then use the required monthly savings mode. The result depends on your current balance, estimated rate, contribution timing, fees, and optional annual contribution increases." },
  { question: "How long will it take to reach my savings goal?", answer: "The time depends mainly on your starting balance, recurring contribution, and actual interest rate. Try several time periods or contribution amounts to compare achievable plans." },
  { question: "Does this calculator include compound interest?", answer: "Yes. It converts the entered annual rate into an equivalent monthly rate and applies growth each month. Actual institutions may calculate and credit interest differently." },
  { question: "What is the difference between APR and APY?", answer: "APR generally states a nominal annual rate, while APY reflects compounding over a year. Savings products commonly advertise APY. Enter the best reasonable annual growth estimate available for your account." },
  { question: "Should I contribute at the beginning or end of each month?", answer: "Beginning-of-month deposits have slightly more time to earn interest. Choose the option that most closely matches when your automatic transfer occurs." },
  { question: "How does inflation affect savings?", answer: "Inflation reduces future purchasing power. The calculator shows an estimated inflation-adjusted value so you can compare the future balance with its approximate value in today's dollars." },
  { question: "Can I increase my savings contribution each year?", answer: "Yes. Open advanced options and enter an annual contribution increase. This can model gradually raising transfers after salary increases." },
  { question: "Is savings interest taxable?", answer: "Interest may be taxable depending on the account, jurisdiction, and your circumstances. The calculator does not subtract taxes; consult current tax guidance or a qualified professional." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "WebApplication", name: "Numeravo Savings Calculator", url, description, applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["Required monthly savings", "Future savings projection", "Savings goal tracking", "Interest and contribution breakdown", "Inflation adjustment", "Scenario comparison", "CSV export"] },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Finance Calculators", item: "https://numeravo.com/finance" }, { "@type": "ListItem", position: 2, name: "Savings Calculator", item: url }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
];

export default function SavingsCalculatorPage() {
  return <main className="min-h-screen bg-[#0B0F19] px-6 py-12 text-white">
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="text-sm text-[#A0AEC0]"><Link href="/finance" className="hover:text-[#22C55E]">Finance Calculators</Link><span className="mx-2">/</span><span className="text-white">Savings Calculator</span></nav>
      <header className="mt-8 max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[.25em] text-[#22C55E]">Finance calculator</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Savings Calculator</h1><p className="mt-6 text-lg leading-8 text-[#A0AEC0]">Calculate how much your savings could grow or determine the monthly contribution needed to reach a specific goal. Include your current balance, estimated APY, recurring deposits, time period, contribution timing, fees, and optional annual increases.</p></header>
      <div className="mt-10"><SavingsCalculatorClient /></div>

      <section className="mt-14 grid gap-4 md:grid-cols-3"><Info title="Plan a specific goal">Estimate savings for an emergency fund, home down payment, vehicle, vacation, wedding, education expense, or major purchase.</Info><Info title="Find a monthly target">Work backward from a goal and date to calculate an estimated monthly and weekly contribution.</Info><Info title="Compare realistic scenarios">See how saving 10% more or less changes the projected balance before choosing an automatic transfer amount.</Info></section>

      <Content title="How to use the savings calculator"><p>Select “Required monthly savings” when you know your goal and deadline. Select “Future savings” when you know how much you can contribute and want to estimate the future balance. Enter a reasonable rate based on the type of savings account you expect to use.</p><p>Advanced options can model annual contribution increases, recurring account fees, and inflation. Treat every result as an estimate because rates, fees, taxes, and deposit timing can change.</p></Content>
      <Content title="How much should I save each month?"><p>A useful target starts with the amount required for the goal, the money already saved, and the number of months available. Interest may help, but recurring contributions usually produce most of the balance over shorter savings periods. If the required amount is not affordable, compare a later deadline, a smaller goal, or a gradual annual contribution increase.</p></Content>
      <Content title="Savings interest, APY, and compound growth"><p>Compound growth means previously credited interest can earn additional interest. APY is designed to express the annual effect of compounding, but savings rates are often variable. A higher estimated rate improves the projection, yet the calculator should not replace checking the current account terms.</p></Content>
      <Content title="Monthly versus weekly savings"><p>Monthly contributions are convenient for budgeting and automatic transfers. The weekly figure shown in required-savings mode is an approximate annual equivalent, calculated from the monthly target. Actual results can differ when weekly deposits receive additional time in the account.</p></Content>
      <Content title="How inflation changes purchasing power"><p>A future dollar may purchase less than a dollar today. The inflation-adjusted result discounts the projected balance using your estimated annual inflation rate. For a goal whose price may rise—such as education, housing, or a vehicle—consider increasing the goal itself over time.</p></Content>
      <Content title="How to reach a savings goal faster"><p>Starting earlier, automating deposits, increasing contributions after income changes, reducing account fees, and directing one-time income toward the goal can shorten the timeline. Use the scenario cards to identify whether a modest contribution increase creates a meaningful difference.</p></Content>

      <section className="mt-14 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Savings calculator formulas and methodology</h2><div className="mt-5 space-y-4 leading-7 text-[#A0AEC0]"><p>Numeravo converts the entered annual growth rate into an equivalent monthly rate, then processes deposits, interest, and fees in chronological order. Beginning-of-month contributions are added before that month's growth; end-of-month contributions are added afterward.</p><p>Required contributions are solved iteratively until the projected balance reaches the entered goal. Annual contribution increases are applied after each completed 12-month period. Inflation-adjusted value equals the future balance divided by (1 + inflation rate) raised to the number of years.</p></div></section>

      <section className="mt-14 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Savings calculator FAQs</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map(f => <article key={f.question} className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{f.question}</h3><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{f.answer}</p></article>)}</div></section>

      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Methodology and financial disclaimer</h2><p className="mt-4 leading-7 text-[#A0AEC0]">Results are educational planning estimates and are not financial, investment, tax, or legal advice. Actual savings growth depends on changing rates, institution-specific compounding methods, deposit timing, account fees, withdrawals, taxes, and other factors. Verify product terms and consider qualified professional guidance before making financial decisions.</p><p className="mt-4 text-sm text-[#718096]">Created and maintained by Numeravo Technologies LLC.</p></section>

      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Related finance calculators</h2><div className="mt-5 flex flex-wrap gap-3"><Related href="/finance/compound-interest-calculator">Compound Interest Calculator</Related><Related href="/finance/credit-card-payoff-calculator">Credit Card Payoff Calculator</Related><Related href="/finance/loan-calculator">Loan Calculator</Related><Related href="/finance/mortgage-calculator">Mortgage Calculator</Related><Related href="/finance">All Finance Calculators</Related></div></section>
    </div>
  </main>;
}

function Info({ title, children }: { title: string; children: React.ReactNode }) { return <article className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5"><h2 className="font-semibold text-[#4ADE80]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{children}</p></article>; }
function Content({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mt-12 max-w-4xl"><h2 className="text-2xl font-bold">{title}</h2><div className="mt-4 space-y-4 leading-7 text-[#A0AEC0]">{children}</div></section>; }
function Related({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#22C55E]">{children}</Link>; }
