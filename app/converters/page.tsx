import Link from "next/link";

const calculators = [
  {
    title: "Unit Converter",
    description:
      "Convert common measurements for length, weight, volume, and more.",
    href: "/converters/unit-converter",
    status: "Planned",
  },
  {
    title: "Length Converter",
    description:
      "Convert inches, feet, yards, miles, millimeters, centimeters, and meters.",
    href: "/converters/length-converter",
    status: "Planned",
  },
  {
    title: "Temperature Converter",
    description:
      "Convert Fahrenheit, Celsius, and Kelvin quickly.",
    href: "/converters/temperature-converter",
    status: "Planned",
  },
];

export const metadata = {
  title: "Unit and Measurement Converters",
  description:
    "Use Numeravo converters for units, length, weight, temperature, measurements, and everyday conversions.",
};

export default function ConvertersPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#EC4899]">
            Unit Converters
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Conversion tools for everyday measurements.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Convert units, measurements, length, weight, temperature, and more
            with fast utility converters.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6 transition hover:border-[#EC4899]"
            >
              <div className="mb-4 h-2 w-12 rounded-full bg-[#EC4899]" />

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