import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#1F2937] bg-[#0B0F19] px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/numeravo-logo.png"
            alt="Numeravo logo"
            width={44}
            height={44}
            priority
            className="rounded-full object-cover"
          />

          <div>
            <p className="font-bold leading-none">Numeravo</p>
            <p className="mt-1 text-sm text-[#A0AEC0]">Smart calculators</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#A0AEC0] md:flex">
          <Link href="/construction" className="transition hover:text-white">
            Construction
          </Link>

          <Link href="/finance" className="transition hover:text-white">
            Finance
          </Link>

          <Link href="/tools" className="transition hover:text-white">
            Tools
          </Link>
        </nav>

        <Link
          href="/construction/concrete-calculator"
          className="hidden rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2563EB] sm:inline-block"
        >
          Try Calculator
        </Link>
      </div>
    </header>
  );
}