import Link from "next/link";
import LoanCalculatorClient from "./LoanCalculatorClient";

const url = "https://numeravo.com/finance/loan-calculator";

export const metadata = {
  title: "Loan Calculator: Payments, Interest & Payoff Schedule",
  description: "Calculate monthly loan payments, total interest, payoff time, and total borrowing cost. Compare terms and see how extra payments affect your loan.",
  alternates: { canonical: url },
  openGraph: { title: "Loan Calculator: Payments, Interest & Payoff Schedule", description: "Estimate loan payments, interest, payoff time, and savings from extra payments.", url, siteName: "Numeravo", type: "website" },
  twitter: { card: "summary_large_image", title: "Loan Calculator | Numeravo", description: "Calculate monthly payments, interest, total cost, and payoff time." },
};

const faqs = [
  { question: "How is a monthly loan payment calculated?", answer: "For a standard fixed-rate amortizing loan, the payment is calculated from the principal, periodic interest rate, and number of monthly payments. Each payment first covers accrued interest, with the remainder reducing principal." },
  { question: "What is the difference between APR and interest rate?", answer: "The interest rate is the percentage charged on the loan balance. APR is a broader annualized measure that may include certain lender fees. This calculator uses the entered interest rate and displays fees separately or finances them when selected." },
  { question: "How do extra payments affect a loan?", answer: "Extra payments reduce principal sooner. That can shorten the payoff period and reduce future interest, assuming the lender applies the extra amount directly to principal without a prepayment penalty." },
  { question: "Does a longer loan term reduce the total cost?", answer: "A longer term generally lowers the required monthly payment but usually increases total interest because the balance remains outstanding longer." },
  { question: "Can this calculator estimate variable-rate loans?", answer: "No. The estimates assume a fixed annual interest rate and monthly payments. Variable rates, interest-only periods, balloon payments, and irregular schedules require a different calculation model." },
  { question: "Why might a lender's payment differ from this estimate?", answer: "Differences can result from lender rounding, daily interest, payment dates, fees, insurance, taxes, promotional periods, or other contract terms." },
];

const applicationSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Numeravo Loan Calculator", url, description: metadata.description, applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["Monthly loan payment", "Total interest and cost", "Extra-payment comparison", "Payoff estimate", "Amortization schedule", "CSV export"] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Finance Calculators", item: "https://numeravo.com/finance" }, { "@type": "ListItem", position: 2, name: "Loan Calculator", item: url }] };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

export default function LoanCalculatorPage() {
  return <main className="min-h-screen bg-[#0B0F19] px-6 py-12 text-white">
    {[applicationSchema, breadcrumbSchema, faqSchema].map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="text-sm text-[#A0AEC0]"><Link href="/finance" className="hover:text-[#22C55E]">Finance Calculators</Link><span className="mx-2">/</span><span className="text-white">Loan Calculator</span></nav>
      <header className="mt-8 max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#22C55E]">Finance calculator</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Loan Calculator</h1><p className="mt-6 text-lg leading-8 text-[#A0AEC0]">Calculate a loan’s monthly payment, total interest, total borrowing cost, and estimated payoff date. Add optional fees or extra monthly payments to compare borrowing scenarios.</p></header>
      <div className="mt-10"><LoanCalculatorClient /></div>

      <section className="mt-14 grid gap-6 md:grid-cols-3"><Info title="Payment formula" text="Payment = P × [r(1 + r)ⁿ] ÷ [(1 + r)ⁿ − 1], where P is principal, r is the monthly interest rate, and n is the number of payments."/><Info title="Calculation method" text="This tool uses standard fixed-rate amortization with monthly compounding. Extra payments are applied to principal after the scheduled payment."/><Info title="Important limitation" text="Actual lender results may use daily interest, different rounding rules, fees, insurance, taxes, or contract-specific payment terms."/></section>

      <Content title="How to use the loan calculator"><p>Enter the amount borrowed, annual interest rate, and loan term. Choose whether the term is stated in years or months. If applicable, enter recurring extra payments and loan fees. The results update automatically.</p><p>Use the payoff comparison to see whether extra principal payments could reduce interest and shorten the loan. Review the amortization table for the estimated principal, interest, and remaining balance over time.</p></Content>
      <Content title="How loan payments are calculated"><p>A fixed-rate amortizing payment is designed to repay the principal and interest over a defined term. Early payments generally contain a larger interest portion because interest is calculated on a higher outstanding balance. As principal declines, more of each scheduled payment goes toward principal.</p><p>For a zero-interest loan, the calculator divides the financed balance evenly across the selected number of months.</p></Content>
      <Content title="How rates and terms affect loan cost"><p>A lower interest rate generally reduces both the monthly payment and total interest. A longer term can reduce the required payment, but the borrower usually pays interest for more months. Comparing total interest—not only the monthly payment—provides a clearer picture of borrowing cost.</p></Content>
      <Content title="How extra payments can change the payoff"><p>When a lender applies an extra payment directly to principal, the outstanding balance falls faster. Future interest is then calculated on a smaller balance. Confirm that your lender permits prepayment, applies additional funds to principal, and does not charge a prepayment penalty.</p></Content>
      <Content title="APR, interest rates, and loan fees"><p>The entered interest rate drives the amortization calculation. APR may include certain fees and therefore can differ from the stated interest rate. Choose “paid upfront” to add fees to total borrowing cost without increasing the balance, or “added to loan” to finance the fees and include them in interest calculations.</p></Content>

      <section className="mt-14 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Loan calculator FAQs</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map((item) => <article key={item.question} className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{item.question}</h3><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{item.answer}</p></article>)}</div></section>
      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Methodology and disclaimer</h2><p className="mt-4 leading-7 text-[#A0AEC0]">Numeravo calculates estimates using the inputs you provide and a standard monthly fixed-rate amortization model. This calculator is for educational and planning purposes only and does not provide financial, lending, tax, or legal advice. Verify all figures, fees, payment rules, and loan terms with the lender before making a financial decision.</p><p className="mt-4 text-sm text-[#718096]">Created and maintained by Numeravo Technologies LLC.</p></section>
      <section className="mt-10 rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8"><h2 className="text-2xl font-bold">Related finance calculators</h2><p className="mt-3 text-[#A0AEC0]">More finance calculators will be linked here as they become available.</p><div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/finance/savings-calculator"
          className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#22C55E]"
        >
          Savings Calculator
        </Link>

        <Link
          href="/finance/credit-card-payoff-calculator"
          className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#22C55E]"
        >
          Credit Card Payoff Calculator
        </Link>

        <Link
          href="/finance/auto-loan-calculator"
          className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#22C55E]"
        >
          Auto Loan Calculator
        </Link>

        <Link
          href="/finance/compound-interest-calculator"
          className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#22C55E]"
        >
          Compound Interest Calculator
        </Link>

        <Link
          href="/finance/mortgage-calculator"
          className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#22C55E]"
        >
          Mortgage Calculator
        </Link>

        <Link
          href="/finance"
          className="rounded-xl border border-[#374151] px-5 py-3 font-semibold hover:border-[#22C55E]"
        >
          All Finance Calculators
        </Link>
      </div></section>
    </div>
  </main>;
}

function Info({ title, text }: { title: string; text: string }) { return <article className="rounded-2xl border border-[#1F2937] bg-[#121826] p-5"><h2 className="font-semibold text-[#4ADE80]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p></article>; }
function Content({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mt-12 max-w-4xl"><h2 className="text-2xl font-bold">{title}</h2><div className="mt-4 space-y-4 leading-7 text-[#A0AEC0]">{children}</div></section>; }
