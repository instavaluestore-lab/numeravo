export const metadata = {
  title: "Privacy Policy | Numeravo",
  description:
    "Read the Numeravo privacy policy to understand how we handle information, analytics, cookies, affiliate links, and user contact.",
  alternates: {
    canonical: "https://numeravo.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Numeravo",
    description:
      "Learn how Numeravo handles information, analytics, cookies, affiliate links, and user contact.",
    url: "https://numeravo.com/privacy-policy",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Numeravo",
    description:
      "Read the Numeravo privacy policy for information about data, cookies, analytics, and contact.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3B82F6]">
          Privacy Policy
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-6 text-sm leading-7 text-[#A0AEC0]">
          Last updated: June 1, 2026
        </p>

        <div className="mt-10 space-y-6 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <PolicySection title="Overview">
            Numeravo provides calculators, tools, and guides for general
            informational and planning purposes. This Privacy Policy explains
            how Numeravo may collect, use, and protect information when you use
            this website.
          </PolicySection>

          <PolicySection title="Information we may collect">
            Numeravo may collect limited information that you voluntarily
            provide, such as your name, email address, or message if you contact
            us. We may also collect standard technical information such as
            browser type, device information, pages visited, referring pages,
            and general usage data.
          </PolicySection>

          <PolicySection title="Calculator inputs">
            Calculator inputs are used to generate results on the page. Unless a
            specific feature clearly says otherwise, calculator inputs are not
            intended to be submitted as account data or stored as personal
            records.
          </PolicySection>

          <PolicySection title="Cookies and analytics">
            Numeravo may use cookies, analytics tools, or similar technologies
            to understand site performance, improve user experience, and measure
            page usage. These tools may collect information such as pages
            visited, approximate location, device type, and browser behavior.
          </PolicySection>

          <PolicySection title="Affiliate links and advertising">
            Numeravo may include affiliate links, sponsored links, product
            recommendations, or advertisements. If you click an affiliate link
            and make a purchase, Numeravo may earn a commission at no additional
            cost to you. Affiliate relationships do not change the goal of
            providing useful calculator tools and practical information.
          </PolicySection>

          <PolicySection title="How information may be used">
            Information may be used to operate the website, improve calculators,
            respond to messages, troubleshoot issues, understand traffic,
            prevent abuse, and improve content quality.
          </PolicySection>

          <PolicySection title="Third-party services">
            Numeravo may use third-party services for hosting, analytics,
            email, affiliate programs, advertising, or website performance.
            These services may process information according to their own
            privacy policies and terms.
          </PolicySection>

          <PolicySection title="Data security">
            We use reasonable efforts to protect information, but no website,
            transmission, or storage system can be guaranteed to be completely
            secure.
          </PolicySection>

          <PolicySection title="Children's privacy">
            Numeravo is not intended to knowingly collect personal information
            from children. If you believe a child has provided personal
            information, contact us so we can review and take appropriate action.
          </PolicySection>

          <PolicySection title="Changes to this policy">
            Numeravo may update this Privacy Policy from time to time. Updates
            will be posted on this page with a revised “Last updated” date.
          </PolicySection>

          <PolicySection title="Contact">
            If you have questions about this Privacy Policy, contact Numeravo at
            contact@numeravo.com.
          </PolicySection>
        </div>

        <p className="mt-6 text-sm leading-7 text-[#A0AEC0]">
          This page is a general website privacy policy draft and should be
          reviewed before relying on it for specific legal, regulatory, or
          compliance requirements.
        </p>
      </section>
    </main>
  );
}

function PolicySection({
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