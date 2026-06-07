export const metadata = {
  title: "Contact Numeravo | Questions, Feedback & Support",
  description:
    "Contact Numeravo for calculator feedback, questions, corrections, partnership inquiries, and support.",
  alternates: {
    canonical: "https://numeravo.com/contact",
  },
  openGraph: {
    title: "Contact Numeravo",
    description:
      "Get in touch with Numeravo for calculator questions, feedback, corrections, support, and partnership inquiries.",
    url: "https://numeravo.com/contact",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Numeravo",
    description:
      "Contact Numeravo for calculator questions, feedback, and support.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3B82F6]">
          Contact
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contact Numeravo
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
          Have a question, correction, feature request, or partnership inquiry?
          Use the contact information below to reach Numeravo.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Email</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              For general questions, calculator feedback, correction requests,
              and support, email:
            </p>

            <a
              href="mailto:contact@numeravo.com"
              className="mt-4 inline-block rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
            >
              contact@numeravo.com
            </a>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Calculator feedback</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              If you notice an issue with a calculator, include the calculator
              name, the inputs you used, the result you expected, and the result
              you received.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Partnerships</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              For affiliate, content, product, or business partnership
              inquiries, include your company name, website, and a short
              description of the opportunity.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Response time</h2>

            <p className="mt-4 text-sm leading-7 text-[#A0AEC0]">
              Numeravo is a growing calculator platform. We review messages and
              prioritize calculator corrections, technical issues, and relevant
              partnership inquiries.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
