import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-[#1F2937] bg-[#0B0F19]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6] text-base font-bold text-white">
            N
          </div>

          <div>
            <p className="text-lg font-bold leading-none text-white">
              Numeravo
            </p>
            <p className="mt-1 text-xs text-[#A0AEC0]">
              Smart calculators
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/construction"
            className="text-sm font-medium text-[#A0AEC0] hover:text-white"
          >
            Construction
          </Link>

          <Link
            href="/finance"
            className="text-sm font-medium text-[#A0AEC0] hover:text-white"
          >
            Finance
          </Link>

          <Link
            href="/tools"
            className="text-sm font-medium text-[#A0AEC0] hover:text-white"
          >
            Tools
          </Link>
        </nav>

        <Link
          href="/construction/concrete-calculator"
          className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Try Calculator
        </Link>
      </div>
    </header>
  );
}