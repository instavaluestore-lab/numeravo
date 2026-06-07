export const metadata = {
  title: "Terms of Use | Numeravo",
  description:
    "Read the Numeravo terms of use for calculators, tools, estimates, affiliate links, and website usage.",
  alternates: {
    canonical: "https://numeravo.com/terms",
  },
  openGraph: {
    title: "Terms of Use | Numeravo",
    description:
      "Review the terms for using Numeravo calculators, tools, guides, estimates, and website content.",
    url: "https://numeravo.com/terms",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Numeravo",
    description:
      "Review the terms for using Numeravo calculators, tools, and guides.",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3B82F6]">
          Terms of Use
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Terms of Use
        </h1>

        <p className="mt-6 text-sm leading-7 text-[#A0AEC0]">
          Last updated: June 1, 2026
        </p>

        <div className="mt-10 space-y-6 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <TermsSection title="Overview">
            By using Numeravo, you agree to these Terms of Use. Numeravo
            provides calculators, tools, and guides for general informational,
            educational, and planning purposes.
          </TermsSection>

          <TermsSection title="Calculator results are estimates">
            Numeravo calculators are designed to provide helpful estimates based
            on the inputs you enter. Results may vary based on real-world
            conditions, local pricing, measurement accuracy, materials,
            professional requirements, taxes, fees, waste, and other factors.
          </TermsSection>

          <TermsSection title="No professional advice">
            Numeravo does not provide legal, financial, engineering,
            construction, tax, medical, or other professional advice. You should
            consult a qualified professional before making decisions that depend
            on accuracy, safety, compliance, or financial risk.
          </TermsSection>

          <TermsSection title="User responsibility">
            You are responsible for verifying calculator inputs, reviewing
            results, and determining whether the information is appropriate for
            your situation. Do not rely on Numeravo as the only source for
            critical decisions.
          </TermsSection>

          <TermsSection title="Website content">
            Numeravo may publish calculator pages, guides, examples, formulas,
            explanations, and recommendations. We aim to keep information useful
            and accurate, but we do not guarantee that all content is complete,
            current, or error-free.
          </TermsSection>

          <TermsSection title="Affiliate links and advertising">
            Numeravo may include affiliate links, sponsored links, product
            recommendations, or advertisements. If you click an affiliate link
            and make a purchase, Numeravo may earn a commission at no additional
            cost to you. You are responsible for reviewing product details,
            pricing, shipping, warranties, and seller terms before purchasing.
          </TermsSection>

          <TermsSection title="Third-party websites">
            Numeravo may link to third-party websites. We do not control and are
            not responsible for third-party content, policies, products,
            services, pricing, or availability.
          </TermsSection>

          <TermsSection title="Acceptable use">
            You agree not to misuse Numeravo, interfere with the website,
            attempt unauthorized access, copy large portions of the site for
            commercial scraping, or use the site in a way that violates
            applicable laws.
          </TermsSection>

          <TermsSection title="Limitation of liability">
            Numeravo is provided “as is” and “as available.” To the fullest
            extent permitted by law, Numeravo is not liable for damages, losses,
            errors, project issues, financial outcomes, or decisions made based
            on calculator results or website content.
          </TermsSection>

          <TermsSection title="Changes to these terms">
            Numeravo may update these Terms of Use from time to time. Updates
            will be posted on this page with a revised “Last updated” date.
          </TermsSection>

          <TermsSection title="Contact">
            If you have questions about these Terms of Use, contact Numeravo at
            contact@numeravo.com.
          </TermsSection>
        </div>

        <p className="mt-6 text-sm leading-7 text-[#A0AEC0]">
          This page is a general terms-of-use draft and should be reviewed
          before relying on it for specific legal, regulatory, or compliance
          requirements.
        </p>
      </section>
    </main>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#1F2937] pb-6 last:border-b-0 last:pb-0">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">{children}</p>
    </section>
  );
}