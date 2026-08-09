"use client";

import { useMemo, useState } from "react";

type RoofStyle = "gable" | "hip" | "shed";

function safeNumber(value: number) {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatDegrees(value: number) {
  return `${formatNumber(value, 2)}°`;
}

export default function RoofPitchCalculatorClient() {
  const [rise, setRise] = useState(6);
  const [run, setRun] = useState(12);
  const [roofStyle, setRoofStyle] = useState<RoofStyle>("gable");
  const [buildingLength, setBuildingLength] = useState(40);
  const [buildingWidth, setBuildingWidth] = useState(30);
  const [overhang, setOverhang] = useState(12);

  const result = useMemo(() => {
    const safeRise = safeNumber(rise);
    const safeRun = safeNumber(run);
    const safeLength = safeNumber(buildingLength);
    const safeWidth = safeNumber(buildingWidth);
    const safeOverhang = safeNumber(overhang);

    const slope = safeRun > 0 ? safeRise / safeRun : 0;
    const angleDegrees =
      safeRun > 0 ? (Math.atan(slope) * 180) / Math.PI : 0;
    const percentSlope = slope * 100;
    const risePerTwelve = slope * 12;
    const pitchMultiplier =
      safeRun > 0
        ? Math.sqrt(
            safeRise * safeRise + safeRun * safeRun,
          ) / safeRun
        : 0;

    const overhangFeet = safeOverhang / 12;
    const roofLength = safeLength + overhangFeet * 2;
    const roofWidth = safeWidth + overhangFeet * 2;
    const horizontalRoofArea = roofLength * roofWidth;
    const slopedRoofArea =
      horizontalRoofArea * pitchMultiplier;
    const roofingSquares = slopedRoofArea / 100;

    const horizontalRafterRun =
      roofStyle === "shed" ? roofWidth : roofWidth / 2;
    const commonRafterLength =
      horizontalRafterRun * pitchMultiplier;

    const roofRiseFeet =
      horizontalRafterRun * slope;
    const roofRiseInches = roofRiseFeet * 12;

    const pitchCategory =
      risePerTwelve < 4
        ? "Low slope"
        : risePerTwelve <= 9
          ? "Conventional slope"
          : "Steep slope";

    const walkability =
      angleDegrees < 18
        ? "Generally lower slope"
        : angleDegrees <= 33
          ? "Use appropriate roof safety"
          : "Steep-roof safety required";

    const notes: string[] = [];

    if (safeRun === 0) {
      notes.push(
        "Enter a run greater than zero to calculate the roof pitch.",
      );
    }

    if (safeRise === 0) {
      notes.push(
        "A zero rise produces a flat result. Most roofs require positive drainage.",
      );
    }

    if (safeLength === 0 || safeWidth === 0) {
      notes.push(
        "Enter both building dimensions to calculate roof area and roofing squares.",
      );
    }

    if (angleDegrees > 45) {
      notes.push(
        "This is a steep roof. Verify measurements and use appropriate fall-protection procedures.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "The area estimate assumes one rectangular roof footprint with a consistent pitch and overhang.",
      );
    }

    return {
      safeRise,
      safeRun,
      safeLength,
      safeWidth,
      safeOverhang,
      slope,
      angleDegrees,
      percentSlope,
      risePerTwelve,
      pitchMultiplier,
      roofLength,
      roofWidth,
      horizontalRoofArea,
      slopedRoofArea,
      roofingSquares,
      horizontalRafterRun,
      commonRafterLength,
      roofRiseFeet,
      roofRiseInches,
      pitchCategory,
      walkability,
      notes,
    };
  }, [
    rise,
    run,
    roofStyle,
    buildingLength,
    buildingWidth,
    overhang,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Roof Pitch Calculator",
      `Pitch: ${formatNumber(result.risePerTwelve)}:12`,
      `Angle: ${formatDegrees(result.angleDegrees)}`,
      `Percent slope: ${formatNumber(result.percentSlope)}%`,
      `Pitch multiplier: ${formatNumber(result.pitchMultiplier, 3)}`,
      `Roof style: ${roofStyle}`,
      `Horizontal roof area: ${formatNumber(result.horizontalRoofArea)} sq ft`,
      `Sloped roof area: ${formatNumber(result.slopedRoofArea)} sq ft`,
      `Roofing squares: ${formatNumber(result.roofingSquares)}`,
      `Common rafter length: ${formatNumber(result.commonRafterLength)} ft`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
          Inputs
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          Roof pitch details
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Enter the vertical rise and horizontal run. Add building
          dimensions when you also want estimated roof area,
          roofing squares, and common-rafter length.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <NumberInput
            label="Rise"
            value={rise}
            onChange={setRise}
            suffix="in"
          />

          <NumberInput
            label="Run"
            value={run}
            onChange={setRun}
            suffix="in"
          />
        </div>

        <div className="mt-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">
              Roof style
            </span>

            <select
              value={roofStyle}
              onChange={(event) =>
                setRoofStyle(event.target.value as RoofStyle)
              }
              className="w-full rounded-2xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-orange-400"
            >
              <option value="gable">Gable roof</option>
              <option value="hip">Hip roof</option>
              <option value="shed">Shed roof</option>
            </select>
          </label>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <NumberInput
            label="Building length"
            value={buildingLength}
            onChange={setBuildingLength}
            suffix="ft"
          />

          <NumberInput
            label="Building width"
            value={buildingWidth}
            onChange={setBuildingWidth}
            suffix="ft"
          />
        </div>

        <div className="mt-5">
          <NumberInput
            label="Roof overhang on each side"
            value={overhang}
            onChange={setOverhang}
            suffix="in"
          />
        </div>

        <div className="mt-7 rounded-2xl border border-orange-500/40 bg-orange-500/10 p-5">
          <h3 className="font-semibold text-orange-300">
            Roof-pitch formula
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
            Pitch multiplier = √(rise² + run²) ÷ run. The
            horizontal roof footprint is multiplied by this factor
            to estimate the sloped roof surface area.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
          Results
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          Roof pitch results
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review the converted pitch, roof slope, area estimate,
          roofing squares, and common-rafter length.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Roof pitch"
            value={`${formatNumber(result.risePerTwelve)}:12`}
            highlight
          />

          <ResultCard
            label="Roof angle"
            value={formatDegrees(result.angleDegrees)}
          />

          <ResultCard
            label="Percent slope"
            value={`${formatNumber(result.percentSlope)}%`}
          />

          <ResultCard
            label="Pitch multiplier"
            value={formatNumber(result.pitchMultiplier, 3)}
          />

          <ResultCard
            label="Sloped roof area"
            value={`${formatNumber(result.slopedRoofArea)} sq ft`}
          />

          <ResultCard
            label="Roofing squares"
            value={formatNumber(result.roofingSquares)}
          />
        </div>

        <ResultPanel title="Pitch conversion">
          <ResultRow
            label="Rise"
            value={`${formatNumber(result.safeRise)} in`}
          />
          <ResultRow
            label="Run"
            value={`${formatNumber(result.safeRun)} in`}
          />
          <ResultRow
            label="Slope ratio"
            value={formatNumber(result.slope, 4)}
          />
          <ResultRow
            label="Pitch category"
            value={result.pitchCategory}
          />
          <ResultRow
            label="Safety note"
            value={result.walkability}
          />
        </ResultPanel>

        <ResultPanel title="Roof dimensions">
          <ResultRow
            label="Roof footprint length"
            value={`${formatNumber(result.roofLength)} ft`}
          />
          <ResultRow
            label="Roof footprint width"
            value={`${formatNumber(result.roofWidth)} ft`}
          />
          <ResultRow
            label="Horizontal roof area"
            value={`${formatNumber(result.horizontalRoofArea)} sq ft`}
          />
          <ResultRow
            label="Sloped roof area"
            value={`${formatNumber(result.slopedRoofArea)} sq ft`}
          />
          <ResultRow
            label="Roofing squares"
            value={`${formatNumber(result.roofingSquares)} squares`}
          />
        </ResultPanel>

        <ResultPanel title="Rafter estimate">
          <ResultRow
            label="Horizontal rafter run"
            value={`${formatNumber(result.horizontalRafterRun)} ft`}
          />
          <ResultRow
            label="Vertical roof rise"
            value={`${formatNumber(result.roofRiseFeet)} ft`}
          />
          <ResultRow
            label="Vertical roof rise"
            value={`${formatNumber(result.roofRiseInches)} in`}
          />
          <ResultRow
            label="Common rafter length"
            value={`${formatNumber(result.commonRafterLength)} ft`}
          />
        </ResultPanel>

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
          className="mt-6 w-full rounded-2xl bg-[#F97316] px-5 py-4 font-semibold text-[#0B0F19] transition hover:bg-orange-400"
        >
          Copy results
        </button>
      </div>
    </section>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-2xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-orange-400">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
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

function ResultCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-[#F97316] bg-[#F97316] text-[#0B0F19]"
          : "border-[#1F2937] bg-[#0B0F19] text-white"
      }`}
    >
      <p
        className={`text-sm ${
          highlight ? "text-[#0B0F19]/70" : "text-[#A0AEC0]"
        }`}
      >
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function ResultPanel({
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
