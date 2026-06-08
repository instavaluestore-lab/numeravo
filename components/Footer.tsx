import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#0B0F19] px-6 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/numeravo-logo.png"
              alt="Numeravo logo"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />

            <div>
              <p className="font-bold leading-none">Numeravo</p>
              <p className="mt-1 text-sm text-[#A0AEC0]">Smart calculators</p>
            </div>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#A0AEC0]">
            Smart calculators, tools, and guides for everyday decisions across
            construction, finance, student work, business, conversions, and
            general utility tools.
          </p>
        </div>

        <FooterGroup
          title="Calculators"
          links={[
            { label: "Construction", href: "/construction" },
            { label: "Finance", href: "/finance" },
            { label: "Student", href: "/student" },
            { label: "Business", href: "/business" },
          ]}
        />

        <FooterGroup
          title="Tools"
          links={[
            { label: "Converters", href: "/converters" },
            { label: "Utilities", href: "/tools" },
            {
              label: "Concrete Calculator",
              href: "/construction/concrete-calculator",
            },
          ]}
        />

        <FooterGroup
          title="Company"
          links={[
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms", href: "/terms" },
          ]}
        />
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-[#1F2937] pt-6 text-sm text-[#A0AEC0] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Numeravo. All rights reserved.</p>

        <p>Calculator results are estimates for planning purposes.</p>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="font-semibold text-white">{title}</h2>

      <div className="mt-4 space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block text-sm text-[#A0AEC0] transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}