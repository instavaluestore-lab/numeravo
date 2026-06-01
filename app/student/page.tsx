import Link from "next/link";

const calculators = [
  {
    title: "Grade Calculator",
    description:
      "Calculate current grades, final exam scores, and class averages.",
    href: "/student/grade-calculator",
    status: "Planned",
  },
  {
    title: "GPA Calculator",
    description: "Estimate GPA using grades, credits, and course weights.",
    href: "/student/gpa-calculator",
    status: "Planned",
  },
  {
    title: "Percentage Calculator",
    description:
      "Solve common percentage problems for homework and studying.",
    href: "/student/percentage-calculator",
    status: "Planned",
  },
];

export const metadata = {
  title: "Student Calculators | GPA, Grades, Percentages & Study Tools",
  description:
    "Use Numeravo student calculators to estimate GPA, grades, percentages, final exam scores, and academic planning numbers.",
  alternates: {
    canonical: "https://numeravo.com/student",
  },
  openGraph: {
    title: "Student Calculators | Numeravo",
    description:
      "Calculate GPA, grades, percentages, and school planning numbers with Numeravo student calculators.",
    url: "https://numeravo.com/student",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Calculators | Numeravo",
    description:
      "Fast student calculators for GPA, grades, percentages, and academic planning.",
  },
};

export default function StudentPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#8B5CF6]">
            Student Calculators
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Student calculators for grades, math, and school planning.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Quickly calculate grades, GPA, percentages, and academic numbers
            with simple student-friendly tools.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:border-[#8B5CF6]"
            >
              <div className="mb-4 h-2 w-12 rounded-full bg-[#8B5CF6]" />

              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">
                  {calculator.title}
                </h2>

                <span className="rounded-full border border-[#1F2937] px-3 py-1 text-xs text-[#A0AEC0]">
                  {calculator.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#A0AEC0]">
                {calculator.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}