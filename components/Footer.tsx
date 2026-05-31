import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1F2937] bg-[#0B0F19]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-lg font-bold text-white">
              Numeravo
            </Link>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#A0AEC0]">
              Smart calculators, tools, and guides for everyday decisions.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Categories</h2>

            <div className="mt-3 flex flex-col gap-2">
              <Link href="/construction" className="text-sm text-[#A0AEC0] hover:text-white">
                Construction
              </Link>
              <Link href="/finance" className="text-sm text-[#A0AEC0] hover:text-white">
                Finance
              </Link>
              <Link href="/student" className="text-sm text-[#A0AEC0] hover:text-white">
                Student
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Tools</h2>

            <div className="mt-3 flex flex-col gap-2">
              <Link href="/business" className="text-sm text-[#A0AEC0] hover:text-white">
                Business
              </Link>
              <Link href="/converters" className="text-sm text-[#A0AEC0] hover:text-white">
                Converters
              </Link>
              <Link href="/tools" className="text-sm text-[#A0AEC0] hover:text-white">
                Utilities
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Company</h2>

            <div className="mt-3 flex flex-col gap-2">
              <Link href="/about" className="text-sm text-[#A0AEC0] hover:text-white">
                About
              </Link>
              <Link href="/contact" className="text-sm text-[#A0AEC0] hover:text-white">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-sm text-[#A0AEC0] hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-[#A0AEC0] hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1F2937] pt-5">
          <p className="text-sm text-[#A0AEC0]">
            © 2026 Numeravo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}