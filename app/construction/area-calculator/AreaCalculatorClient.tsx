"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Shape = "rectangle" | "triangle" | "circle" | "trapezoid";
type Unit = "feet" | "yards" | "meters";

type AreaItem = {
  id: number;
  name: string;
  shape: Shape;
  unit: Unit;
  material: string;
  wastePercent: string;
  costPerSquareFoot: string;
  length: string;
  width: string;
  base: string;
  height: string;
  radius: string;
  baseOne: string;
  baseTwo: string;
};

const materials = [
  "Flooring",
  "Roofing",
  "Drywall",
  "Paint",
  "Decking",
  "Concrete slab",
  "Landscaping",
  "Tile",
  "Carpet",
];

function createArea(id: number): AreaItem {
  return {
    id,
    name: `Area ${id}`,
    shape: "rectangle",
    unit: "feet",
    material: "Flooring",
    wastePercent: "10",
    costPerSquareFoot: "3.50",
    length: "12",
    width: "10",
    base: "12",
    height: "10",
    radius: "5",
    baseOne: "12",
    baseTwo: "8",
  };
}

export default function AreaCalculatorClient() {
  const [areas, setAreas] = useState<AreaItem[]>([createArea(1)]);

  const results = useMemo(() => {
    return areas.map((area) => {
      const squareFeet = calculateSquareFeet(area);
      const wasteMultiplier = 1 + toNumber(area.wastePercent) / 100;
      const squareFeetWithWaste = squareFeet * wasteMultiplier;
      const cost = squareFeetWithWaste * toNumber(area.costPerSquareFoot);

      return {
        id: area.id,
        squareFeet,
        squareFeetWithWaste,
        squareYards: squareFeet / 9,
        squareMeters: squareFeet / 10.7639,
        acres: squareFeet / 43560,
        squareYardsWithWaste: squareFeetWithWaste / 9,
        squareMetersWithWaste: squareFeetWithWaste / 10.7639,
        acresWithWaste: squareFeetWithWaste / 43560,
        cost,
      };
    });
  }, [areas]);

  const totals = useMemo(() => {
    const squareFeet = results.reduce((sum, item) => sum + item.squareFeet, 0);
    const squareFeetWithWaste = results.reduce(
      (sum, item) => sum + item.squareFeetWithWaste,
      0,
    );
    const cost = results.reduce((sum, item) => sum + item.cost, 0);

    return {
      squareFeet,
      squareFeetWithWaste,
      squareYards: squareFeet / 9,
      squareMeters: squareFeet / 10.7639,
      acres: squareFeet / 43560,
      squareYardsWithWaste: squareFeetWithWaste / 9,
      squareMetersWithWaste: squareFeetWithWaste / 10.7639,
      acresWithWaste: squareFeetWithWaste / 43560,
      cost,
    };
  }, [results]);

  function updateArea(id: number, updates: Partial<AreaItem>) {
    setAreas((current) =>
      current.map((area) => (area.id === id ? { ...area, ...updates } : area)),
    );
  }

  function addArea() {
    setAreas((current) => {
      const nextId = Math.max(...current.map((area) => area.id)) + 1;
      return [...current, createArea(nextId)];
    });
  }

  function removeArea(id: number) {
    setAreas((current) =>
      current.length === 1 ? current : current.filter((area) => area.id !== id),
    );
  }

  function duplicateArea(id: number) {
    setAreas((current) => {
      const item = current.find((area) => area.id === id);
      if (!item) return current;

      const nextId = Math.max(...current.map((area) => area.id)) + 1;

      return [
        ...current,
        {
          ...item,
          id: nextId,
          name: `${item.name} Copy`,
        },
      ];
    });
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Numeravo Area Calculator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://numeravo.com/construction/area-calculator",
                description:
                  "Calculate square feet, square yards, square meters, acres, waste-adjusted area, and estimated material cost.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://numeravo.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Construction",
                    item: "https://numeravo.com/construction",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Area Calculator",
                    item: "https://numeravo.com/construction/area-calculator",
                  },
                ],
              },
            ],
          }),
        }}
      />

      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
            Construction Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Area Calculator
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#A0AEC0]">
            Calculate square feet, square yards, square meters, acres,
            waste-adjusted area, and estimated material cost for flooring,
            roofing, drywall, paint, decking, concrete slabs, landscaping, tile,
            and carpet projects.
          </p>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {areas.map((area, index) => {
              const result = results.find((item) => item.id === area.id);

              return (
                <section
                  key={area.id}
                  className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                        Area {index + 1}
                      </p>

                      <input
                        value={area.name}
                        onChange={(event) =>
                          updateArea(area.id, { name: event.target.value })
                        }
                        className="mt-3 w-full bg-transparent text-2xl font-semibold text-white outline-none"
                      />

                      <p className="mt-2 text-sm text-[#A0AEC0]">
                        Choose a shape, unit system, material, waste percentage,
                        and cost per square foot.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => duplicateArea(area.id)}
                        className="rounded-xl border border-[#1F2937] px-3 py-2 text-xs font-semibold text-[#A0AEC0] hover:border-[#F97316] hover:text-white"
                      >
                        Duplicate
                      </button>

                      <button
                        type="button"
                        onClick={() => removeArea(area.id)}
                        disabled={areas.length === 1}
                        className="rounded-xl border border-[#1F2937] px-3 py-2 text-xs font-semibold text-[#A0AEC0] hover:border-[#F97316] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <SelectInput
                      label="Shape"
                      value={area.shape}
                      onChange={(value) =>
                        updateArea(area.id, { shape: value as Shape })
                      }
                      options={[
                        { value: "rectangle", label: "Rectangle / Square" },
                        { value: "triangle", label: "Triangle" },
                        { value: "circle", label: "Circle" },
                        { value: "trapezoid", label: "Trapezoid" },
                      ]}
                    />

                    <SelectInput
                      label="Unit"
                      value={area.unit}
                      onChange={(value) =>
                        updateArea(area.id, { unit: value as Unit })
                      }
                      options={[
                        { value: "feet", label: "Feet" },
                        { value: "yards", label: "Yards" },
                        { value: "meters", label: "Meters" },
                      ]}
                    />

                    <SelectInput
                      label="Material"
                      value={area.material}
                      onChange={(value) =>
                        updateArea(area.id, { material: value })
                      }
                      options={materials.map((material) => ({
                        value: material,
                        label: material,
                      }))}
                    />

                    <NumberInput
                      label="Waste Percentage"
                      value={area.wastePercent}
                      onChange={(value) =>
                        updateArea(area.id, { wastePercent: value })
                      }
                      suffix="%"
                    />

                    {area.shape === "rectangle" && (
                      <>
                        <NumberInput
                          label="Length"
                          value={area.length}
                          onChange={(value) =>
                            updateArea(area.id, { length: value })
                          }
                          suffix={area.unit}
                        />

                        <NumberInput
                          label="Width"
                          value={area.width}
                          onChange={(value) =>
                            updateArea(area.id, { width: value })
                          }
                          suffix={area.unit}
                        />
                      </>
                    )}

                    {area.shape === "triangle" && (
                      <>
                        <NumberInput
                          label="Base"
                          value={area.base}
                          onChange={(value) =>
                            updateArea(area.id, { base: value })
                          }
                          suffix={area.unit}
                        />

                        <NumberInput
                          label="Height"
                          value={area.height}
                          onChange={(value) =>
                            updateArea(area.id, { height: value })
                          }
                          suffix={area.unit}
                        />
                      </>
                    )}

                    {area.shape === "circle" && (
                      <NumberInput
                        label="Radius"
                        value={area.radius}
                        onChange={(value) =>
                          updateArea(area.id, { radius: value })
                        }
                        suffix={area.unit}
                      />
                    )}

                    {area.shape === "trapezoid" && (
                      <>
                        <NumberInput
                          label="Base 1"
                          value={area.baseOne}
                          onChange={(value) =>
                            updateArea(area.id, { baseOne: value })
                          }
                          suffix={area.unit}
                        />

                        <NumberInput
                          label="Base 2"
                          value={area.baseTwo}
                          onChange={(value) =>
                            updateArea(area.id, { baseTwo: value })
                          }
                          suffix={area.unit}
                        />

                        <NumberInput
                          label="Height"
                          value={area.height}
                          onChange={(value) =>
                            updateArea(area.id, { height: value })
                          }
                          suffix={area.unit}
                        />
                      </>
                    )}

                    <NumberInput
                      label="Cost Per Square Foot"
                      value={area.costPerSquareFoot}
                      onChange={(value) =>
                        updateArea(area.id, { costPerSquareFoot: value })
                      }
                      prefix="$"
                    />
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <ResultRow
                      label="Square Feet"
                      value={`${formatNumber(result?.squareFeet ?? 0)} sq ft`}
                    />
                    <ResultRow
                      label="With Waste"
                      value={`${formatNumber(
                        result?.squareFeetWithWaste ?? 0,
                      )} sq ft`}
                      highlight
                    />
                    <ResultRow
                      label="Square Yards"
                      value={`${formatNumber(result?.squareYards ?? 0)} sq yd`}
                    />
                    <ResultRow
                      label="Square Meters"
                      value={`${formatNumber(result?.squareMeters ?? 0)} sq m`}
                    />
                    <ResultRow
                      label="Acres"
                      value={`${formatNumber(result?.acres ?? 0)} acres`}
                    />
                    <ResultRow
                      label="Estimated Cost"
                      value={formatCurrency(result?.cost ?? 0)}
                      highlight
                    />
                  </div>
                </section>
              );
            })}

            <button
              type="button"
              onClick={addArea}
              className="w-full rounded-2xl border border-dashed border-[#F97316] bg-[#121826] px-5 py-5 text-sm font-semibold text-white transition hover:bg-[#1C2433]"
            >
              + Add Another Area
            </button>
          </div>

          <aside className="h-fit rounded-2xl border border-[#1F2937] bg-[#121826] p-6 lg:sticky lg:top-6">
            <h2 className="text-2xl font-semibold">Total Area</h2>

            <p className="mt-2 text-sm text-[#A0AEC0]">
              Combined totals from all areas.
            </p>

            <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#0B0F19] p-5">
              <p className="text-sm text-[#A0AEC0]">Waste-adjusted area</p>

              <p className="mt-2 text-4xl font-bold text-[#F97316]">
                {formatNumber(totals.squareFeetWithWaste)} sq ft
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <ResultRow
                label="Square Feet"
                value={`${formatNumber(totals.squareFeet)} sq ft`}
              />
              <ResultRow
                label="Square Feet With Waste"
                value={`${formatNumber(totals.squareFeetWithWaste)} sq ft`}
                highlight
              />
              <ResultRow
                label="Square Yards With Waste"
                value={`${formatNumber(totals.squareYardsWithWaste)} sq yd`}
              />
              <ResultRow
                label="Square Meters With Waste"
                value={`${formatNumber(totals.squareMetersWithWaste)} sq m`}
              />
              <ResultRow
                label="Acres With Waste"
                value={`${formatNumber(totals.acresWithWaste)} acres`}
              />
              <ResultRow
                label="Estimated Material Cost"
                value={formatCurrency(totals.cost)}
                highlight
              />
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Supported shapes</h2>

            <div className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <p>Rectangle / Square: length × width</p>
              <p>Triangle: (base × height) ÷ 2</p>
              <p>Circle: π × radius²</p>
              <p>Trapezoid: ((base 1 + base 2) ÷ 2) × height</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
            <h2 className="text-2xl font-semibold">Area conversions</h2>

            <div className="mt-5 space-y-3 text-sm text-[#A0AEC0]">
              <p>1 square yard = 9 square feet</p>
              <p>1 acre = 43,560 square feet</p>
              <p>1 square meter = 10.7639 square feet</p>
              <p>Feet to meters = feet ÷ 3.28084</p>
              <p>Meters to feet = meters × 3.28084</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
          <h2 className="text-2xl font-semibold">Related construction tools</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RelatedLink
              href="/construction/concrete-calculator"
              title="Concrete Calculator"
              text="Estimate concrete volume, cubic yards, waste, and material cost."
            />

            <RelatedLink
              href="/construction/concrete-cost-calculator"
              title="Concrete Cost Calculator"
              text="Estimate concrete price, base material, rebar, labor, prep, delivery fees, and total project cost."
            />

            <RelatedLink
              href="/construction/gravel-calculator"
              title="Gravel Calculator"
              text="Estimate gravel, crushed stone, road base, pea gravel, and drainage rock."
            />

            <RelatedLink
              href="/construction/base-for-concrete-slab-depth"
              title="Base for Concrete Slab Depth"
              text="Learn common base depths for concrete slabs, patios, driveways, and shed pads."
            />

            <RelatedLink
              href="/construction/how-to-prepare-ground-for-concrete-slab"
              title="How to Prepare Ground for Concrete Slab"
              text="Learn excavation, grading, gravel base, compaction, forms, and slab prep steps."
            />

            <RelatedLink
              href="/construction/road-base-calculator"
              title="Road Base Calculator"
              text="Estimate road base cubic yards, tons, waste, and cost."
            />

            <RelatedLink
              href="/construction"
              title="Construction Calculators"
              text="Browse concrete, gravel, base, and construction estimating calculators."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#A0AEC0]">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#0B0F19]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#A0AEC0]">{label}</span>

      <div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F19]">
        {prefix && (
          <span className="border-r border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent px-4 py-3 text-white outline-none"
        />

        {suffix && (
          <span className="border-l border-[#1F2937] px-4 py-3 text-sm text-[#A0AEC0]">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1F2937] bg-[#0B0F19] p-4">
      <span className="text-sm text-[#A0AEC0]">{label}</span>

      <span
        className={
          highlight
            ? "text-right text-lg font-bold text-[#F97316]"
            : "text-right text-lg font-semibold text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

function RelatedLink({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-[#1F2937] bg-[#0B0F19] p-5 transition hover:border-[#F97316]"
    >
      <div className="mb-4 h-2 w-10 rounded-full bg-[#F97316]" />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">{text}</p>
    </Link>
  );
}

function calculateSquareFeet(area: AreaItem) {
  const multiplier = getSquareFeetMultiplier(area.unit);

  if (area.shape === "rectangle") {
    return toNumber(area.length) * toNumber(area.width) * multiplier;
  }

  if (area.shape === "triangle") {
    return ((toNumber(area.base) * toNumber(area.height)) / 2) * multiplier;
  }

  if (area.shape === "circle") {
    return Math.PI * Math.pow(toNumber(area.radius), 2) * multiplier;
  }

  if (area.shape === "trapezoid") {
    return (
      ((toNumber(area.baseOne) + toNumber(area.baseTwo)) / 2) *
      toNumber(area.height) *
      multiplier
    );
  }

  return 0;
}

function getSquareFeetMultiplier(unit: Unit) {
  if (unit === "yards") {
    return 9;
  }

  if (unit === "meters") {
    return 10.7639;
  }

  return 1;
}

function toNumber(value: string) {
  const number = Number(value);

  if (Number.isNaN(number) || number < 0) {
    return 0;
  }

  return number;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}
