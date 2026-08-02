"use client";

import { useMemo, useState } from "react";

type StudSpacing = "12" | "16" | "24";

function clampNumber(value: number, fallback = 0) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function StudCalculatorClient() {
  const [wallLength, setWallLength] = useState(20);
  const [numberOfWalls, setNumberOfWalls] = useState(1);
  const [wallHeight, setWallHeight] = useState(8);
  const [studSpacing, setStudSpacing] = useState<StudSpacing>("16");

  const [corners, setCorners] = useState(0);
  const [extraStudsPerCorner, setExtraStudsPerCorner] = useState(2);

  const [doors, setDoors] = useState(0);
  const [windows, setWindows] = useState(0);
  const [extraStudsPerOpening, setExtraStudsPerOpening] = useState(2);

  const [otherFramingStuds, setOtherFramingStuds] = useState(0);
  const [wastePercent, setWastePercent] = useState(10);

  const [topPlateLayers, setTopPlateLayers] = useState(2);
  const [bottomPlateLayers, setBottomPlateLayers] = useState(1);

  const [pricePerStud, setPricePerStud] = useState(0);
  const [platePricePerLinearFoot, setPlatePricePerLinearFoot] =
    useState(0);

  const result = useMemo(() => {
    const safeWallLength = clampNumber(wallLength);
    const safeNumberOfWalls = Math.max(
      Math.floor(clampNumber(numberOfWalls)),
      0,
    );
    const safeWallHeight = clampNumber(wallHeight);
    const spacingInches = Number(studSpacing);

    const safeCorners = Math.floor(clampNumber(corners));
    const safeExtraStudsPerCorner = Math.floor(
      clampNumber(extraStudsPerCorner),
    );

    const safeDoors = Math.floor(clampNumber(doors));
    const safeWindows = Math.floor(clampNumber(windows));
    const safeExtraStudsPerOpening = Math.floor(
      clampNumber(extraStudsPerOpening),
    );

    const safeOtherFramingStuds = Math.floor(
      clampNumber(otherFramingStuds),
    );
    const safeWastePercent = clampNumber(wastePercent);

    const safeTopPlateLayers = Math.floor(
      clampNumber(topPlateLayers),
    );
    const safeBottomPlateLayers = Math.floor(
      clampNumber(bottomPlateLayers),
    );

    const safePricePerStud = clampNumber(pricePerStud);
    const safePlatePricePerLinearFoot = clampNumber(
      platePricePerLinearFoot,
    );

    const wallLengthInches = safeWallLength * 12;

    const layoutStudsPerWall =
      safeWallLength > 0
        ? Math.ceil(wallLengthInches / spacingInches) + 1
        : 0;

    const totalLayoutStuds =
      layoutStudsPerWall * safeNumberOfWalls;

    const cornerStuds =
      safeCorners * safeExtraStudsPerCorner;

    const totalOpenings = safeDoors + safeWindows;
    const openingStuds =
      totalOpenings * safeExtraStudsPerOpening;

    const studsBeforeWaste =
      totalLayoutStuds +
      cornerStuds +
      openingStuds +
      safeOtherFramingStuds;

    const purchaseStuds = Math.ceil(
      studsBeforeWaste * (1 + safeWastePercent / 100),
    );

    const wasteAndRoundingStuds = Math.max(
      purchaseStuds - studsBeforeWaste,
      0,
    );

    const totalWallLength =
      safeWallLength * safeNumberOfWalls;

    const totalPlateLayers =
      safeTopPlateLayers + safeBottomPlateLayers;

    const plateLinearFeet =
      totalWallLength * totalPlateLayers;

    const studLinearFeet =
      purchaseStuds * safeWallHeight;

    const totalFramingLinearFeet =
      studLinearFeet + plateLinearFeet;

    const studCost =
      purchaseStuds * safePricePerStud;

    const plateCost =
      plateLinearFeet * safePlatePricePerLinearFoot;

    const materialCost = studCost + plateCost;

    const costPerWall =
      safeNumberOfWalls > 0
        ? materialCost / safeNumberOfWalls
        : 0;

    const notes: string[] = [];

    if (safeWastePercent < 5) {
      notes.push(
        "The waste allowance is low. Cuts, defects, damaged lumber, and layout changes may require additional studs.",
      );
    }

    if (safeExtraStudsPerCorner === 0 && safeCorners > 0) {
      notes.push(
        "No additional corner studs are included. Verify the corner framing method used for the project.",
      );
    }

    if (
      totalOpenings > 0 &&
      safeExtraStudsPerOpening === 0
    ) {
      notes.push(
        "Doors or windows are entered without additional opening studs. Verify king, jack, cripple, and header-support requirements.",
      );
    }

    if (
      safePricePerStud === 0 ||
      safePlatePricePerLinearFoot === 0
    ) {
      notes.push(
        "Enter current supplier pricing for both studs and plate lumber to generate a complete material-cost estimate.",
      );
    }

    if (safeWallLength === 0 || safeNumberOfWalls === 0) {
      notes.push(
        "Enter a wall length and number of walls greater than zero to generate a framing estimate.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "This estimate includes layout studs, editable corner and opening allowances, other framing studs, plates, and waste.",
      );
    }

    return {
      safeWallLength,
      safeNumberOfWalls,
      safeWallHeight,
      spacingInches,
      safeCorners,
      safeExtraStudsPerCorner,
      safeDoors,
      safeWindows,
      safeExtraStudsPerOpening,
      safeOtherFramingStuds,
      safeWastePercent,
      safeTopPlateLayers,
      safeBottomPlateLayers,
      safePricePerStud,
      safePlatePricePerLinearFoot,
      layoutStudsPerWall,
      totalLayoutStuds,
      cornerStuds,
      totalOpenings,
      openingStuds,
      studsBeforeWaste,
      purchaseStuds,
      wasteAndRoundingStuds,
      totalWallLength,
      totalPlateLayers,
      plateLinearFeet,
      studLinearFeet,
      totalFramingLinearFeet,
      studCost,
      plateCost,
      materialCost,
      costPerWall,
      notes,
    };
  }, [
    wallLength,
    numberOfWalls,
    wallHeight,
    studSpacing,
    corners,
    extraStudsPerCorner,
    doors,
    windows,
    extraStudsPerOpening,
    otherFramingStuds,
    wastePercent,
    topPlateLayers,
    bottomPlateLayers,
    pricePerStud,
    platePricePerLinearFoot,
  ]);

  function copyResults() {
    const summary = [
      "Wall Stud Estimate",
      `Wall length: ${formatNumber(result.safeWallLength)} ft each`,
      `Number of walls: ${formatNumber(result.safeNumberOfWalls, 0)}`,
      `Wall height: ${formatNumber(result.safeWallHeight)} ft`,
      `Stud spacing: ${result.spacingInches} in on center`,
      `Layout studs per wall: ${formatNumber(result.layoutStudsPerWall, 0)}`,
      `Total layout studs: ${formatNumber(result.totalLayoutStuds, 0)}`,
      `Additional corner studs: ${formatNumber(result.cornerStuds, 0)}`,
      `Additional opening studs: ${formatNumber(result.openingStuds, 0)}`,
      `Other framing studs: ${formatNumber(result.safeOtherFramingStuds, 0)}`,
      `Studs before waste: ${formatNumber(result.studsBeforeWaste, 0)}`,
      `Waste allowance: ${formatNumber(result.safeWastePercent)}%`,
      `Studs to purchase: ${formatNumber(result.purchaseStuds, 0)}`,
      `Plate linear feet: ${formatNumber(result.plateLinearFeet)} ft`,
      `Total framing linear feet: ${formatNumber(result.totalFramingLinearFeet)} ft`,
      `Stud cost: ${formatCurrency(result.studCost)}`,
      `Plate cost: ${formatCurrency(result.plateCost)}`,
      `Estimated material cost: ${formatCurrency(result.materialCost)}`,
    ].join("\n");

    navigator.clipboard?.writeText(summary);
  }

  return (
    <section className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8 lg:sticky lg:top-24">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Inputs
          </p>
          <h2 className="text-2xl font-bold">
            Wall framing details
          </h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Enter equal-length wall sections, stud spacing, framing
            allowances, plates, waste, and supplier pricing.
          </p>
        </div>

        <div className="mt-8 grid gap-6">
          <InputSection title="Wall layout">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Length of each wall"
                suffix="ft"
                value={wallLength}
                onChange={setWallLength}
              />
              <NumberInput
                label="Number of walls"
                integer
                suffix="walls"
                value={numberOfWalls}
                onChange={setNumberOfWalls}
              />
              <NumberInput
                label="Wall height"
                suffix="ft"
                value={wallHeight}
                onChange={setWallHeight}
              />
              <SelectInput
                label="Stud spacing"
                value={studSpacing}
                onChange={(value) =>
                  setStudSpacing(value as StudSpacing)
                }
                options={[
                  { value: "12", label: '12" on center' },
                  { value: "16", label: '16" on center' },
                  { value: "24", label: '24" on center' },
                ]}
              />
            </div>
          </InputSection>

          <InputSection title="Corners and openings">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Corners"
                integer
                value={corners}
                onChange={setCorners}
              />
              <NumberInput
                label="Extra studs per corner"
                integer
                suffix="studs"
                value={extraStudsPerCorner}
                onChange={setExtraStudsPerCorner}
              />
              <NumberInput
                label="Doors"
                integer
                value={doors}
                onChange={setDoors}
              />
              <NumberInput
                label="Windows"
                integer
                value={windows}
                onChange={setWindows}
              />
            </div>

            <div className="mt-4">
              <NumberInput
                label="Extra studs per opening"
                integer
                suffix="studs"
                value={extraStudsPerOpening}
                onChange={setExtraStudsPerOpening}
              />
            </div>
          </InputSection>

          <InputSection title="Allowances and plates">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Other framing studs"
                integer
                suffix="studs"
                value={otherFramingStuds}
                onChange={setOtherFramingStuds}
              />
              <NumberInput
                label="Waste allowance"
                suffix="%"
                value={wastePercent}
                onChange={setWastePercent}
              />
              <NumberInput
                label="Top-plate layers"
                integer
                value={topPlateLayers}
                onChange={setTopPlateLayers}
              />
              <NumberInput
                label="Bottom-plate layers"
                integer
                value={bottomPlateLayers}
                onChange={setBottomPlateLayers}
              />
            </div>
          </InputSection>

          <InputSection title="Material pricing">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Price per stud"
                prefix="$"
                suffix="/stud"
                value={pricePerStud}
                onChange={setPricePerStud}
              />
              <NumberInput
                label="Plate price"
                prefix="$"
                suffix="/lin ft"
                value={platePricePerLinearFoot}
                onChange={setPlatePricePerLinearFoot}
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Use current supplier prices for the exact stud size,
              length, species, grade, and treatment required.
            </p>
          </InputSection>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">
            Stud and plate estimate
          </h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review layout studs, framing allowances, purchase
            quantity, plates, linear feet, and estimated cost.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Studs to purchase"
            value={`${formatNumber(result.purchaseStuds, 0)} studs`}
            highlight
          />
          <ResultCard
            label="Plate lumber"
            value={`${formatNumber(result.plateLinearFeet)} lin ft`}
          />
          <ResultCard
            label="Framing lumber"
            value={`${formatNumber(result.totalFramingLinearFeet)} lin ft`}
          />
          <ResultCard
            label="Material cost"
            value={formatCurrency(result.materialCost)}
          />
        </div>

        <ResultSection title="Wall layout">
          <ResultRow
            label="Length of each wall"
            value={`${formatNumber(result.safeWallLength)} ft`}
          />
          <ResultRow
            label="Number of walls"
            value={formatNumber(result.safeNumberOfWalls, 0)}
          />
          <ResultRow
            label="Total wall length"
            value={`${formatNumber(result.totalWallLength)} ft`}
          />
          <ResultRow
            label="Wall height"
            value={`${formatNumber(result.safeWallHeight)} ft`}
          />
          <ResultRow
            label="Stud spacing"
            value={`${result.spacingInches} in on center`}
          />
          <ResultRow
            label="Layout studs per wall"
            value={formatNumber(result.layoutStudsPerWall, 0)}
          />
        </ResultSection>

        <ResultSection title="Stud quantity">
          <ResultRow
            label="Total layout studs"
            value={`${formatNumber(result.totalLayoutStuds, 0)} studs`}
          />
          <ResultRow
            label="Additional corner studs"
            value={`${formatNumber(result.cornerStuds, 0)} studs`}
          />
          <ResultRow
            label="Doors and windows"
            value={formatNumber(result.totalOpenings, 0)}
          />
          <ResultRow
            label="Additional opening studs"
            value={`${formatNumber(result.openingStuds, 0)} studs`}
          />
          <ResultRow
            label="Other framing studs"
            value={`${formatNumber(result.safeOtherFramingStuds, 0)} studs`}
          />
          <ResultRow
            label="Studs before waste"
            value={`${formatNumber(result.studsBeforeWaste, 0)} studs`}
          />
          <ResultRow
            label="Waste and rounding"
            value={`${formatNumber(result.wasteAndRoundingStuds, 0)} studs`}
          />
          <ResultRow
            label="Studs to purchase"
            value={`${formatNumber(result.purchaseStuds, 0)} studs`}
          />
        </ResultSection>

        <ResultSection title="Plates and linear feet">
          <ResultRow
            label="Top-plate layers"
            value={formatNumber(result.safeTopPlateLayers, 0)}
          />
          <ResultRow
            label="Bottom-plate layers"
            value={formatNumber(result.safeBottomPlateLayers, 0)}
          />
          <ResultRow
            label="Total plate layers"
            value={formatNumber(result.totalPlateLayers, 0)}
          />
          <ResultRow
            label="Plate linear feet"
            value={`${formatNumber(result.plateLinearFeet)} ft`}
          />
          <ResultRow
            label="Stud linear feet"
            value={`${formatNumber(result.studLinearFeet)} ft`}
          />
          <ResultRow
            label="Total framing linear feet"
            value={`${formatNumber(result.totalFramingLinearFeet)} ft`}
          />
        </ResultSection>

        <ResultSection title="Material cost">
          <ResultRow
            label="Price per stud"
            value={formatCurrency(result.safePricePerStud)}
          />
          <ResultRow
            label="Stud cost"
            value={formatCurrency(result.studCost)}
          />
          <ResultRow
            label="Plate price per linear foot"
            value={formatCurrency(
              result.safePlatePricePerLinearFoot,
            )}
          />
          <ResultRow
            label="Plate cost"
            value={formatCurrency(result.plateCost)}
          />
          <ResultRow
            label="Estimated material cost"
            value={formatCurrency(result.materialCost)}
          />
          <ResultRow
            label="Estimated cost per wall"
            value={formatCurrency(result.costPerWall)}
          />
        </ResultSection>

        <div className="mt-6 rounded-2xl border border-orange-400/40 bg-orange-400/10 p-5">
          <h3 className="font-semibold text-orange-300">
            Framing reminder
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
            Headers, cripple studs, fire blocking, backing,
            intersecting walls, bracing, structural details, and
            local-code requirements may require additional lumber.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Planning notes</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#A0AEC0]">
            {result.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={copyResults}
          className="mt-6 w-full rounded-2xl bg-orange-400 px-5 py-4 text-sm font-bold text-[#0B0F19] transition hover:bg-orange-300"
        >
          Copy results
        </button>
      </div>
    </section>
  );
}

function InputSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="mb-4 font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  integer = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  integer?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">
        {label}
      </span>
      <div className="flex overflow-hidden rounded-2xl border border-[#1F2937] bg-[#121826] focus-within:border-orange-400">
        {prefix ? (
          <span className="flex items-center px-3 text-sm text-[#A0AEC0]">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          min="0"
          step={integer ? "1" : "0.01"}
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            onChange(
              integer
                ? Math.max(Math.floor(nextValue), 0)
                : nextValue,
            );
          }}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none"
        />
        {suffix ? (
          <span className="flex items-center px-3 text-sm text-[#A0AEC0]">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
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
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#1F2937] bg-[#121826] px-4 py-3 text-white outline-none transition focus:border-orange-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-orange-400 bg-orange-400 text-[#0B0F19]"
          : "border-[#1F2937] bg-[#0B0F19] text-white"
      }`}
    >
      <p
        className={`text-sm ${
          highlight
            ? "text-[#0B0F19]/70"
            : "text-[#A0AEC0]"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}
