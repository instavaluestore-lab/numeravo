"use client";

import { useMemo, useState } from "react";

type ProjectType =
  | "Patio"
  | "Sidewalk"
  | "Driveway"
  | "Garage slab"
  | "Concrete pad"
  | "Footing"
  | "Wall"
  | "Custom";

type WeatherCondition =
  | "Normal"
  | "Cold"
  | "Hot / dry"
  | "Rain risk"
  | "Windy"
  | "Humid";

const projectDefaults: Record<
  ProjectType,
  {
    thickness: number;
    firstWalkHours: number;
    lightUseDays: number;
    vehicleDays: number;
    sealDays: number;
    fullCureDays: number;
    note: string;
  }
> = {
  Patio: {
    thickness: 4,
    firstWalkHours: 36,
    lightUseDays: 3,
    vehicleDays: 0,
    sealDays: 28,
    fullCureDays: 28,
    note: "Patios usually need protection from furniture, grills, planters, and heavy foot traffic during early curing.",
  },
  Sidewalk: {
    thickness: 4,
    firstWalkHours: 36,
    lightUseDays: 3,
    vehicleDays: 0,
    sealDays: 28,
    fullCureDays: 28,
    note: "Sidewalks often allow careful foot traffic earlier than vehicle-rated slabs, but edges and corners remain vulnerable.",
  },
  Driveway: {
    thickness: 5,
    firstWalkHours: 48,
    lightUseDays: 3,
    vehicleDays: 7,
    sealDays: 28,
    fullCureDays: 28,
    note: "Driveways should avoid passenger vehicles until the concrete has gained enough early strength. Heavy vehicles need longer.",
  },
  "Garage slab": {
    thickness: 5,
    firstWalkHours: 48,
    lightUseDays: 4,
    vehicleDays: 7,
    sealDays: 28,
    fullCureDays: 28,
    note: "Garage slabs should avoid vehicle loading, jack stands, heavy storage, and point loads too early.",
  },
  "Concrete pad": {
    thickness: 4,
    firstWalkHours: 36,
    lightUseDays: 3,
    vehicleDays: 7,
    sealDays: 28,
    fullCureDays: 28,
    note: "Pads vary widely. Hot tubs, equipment, sheds, and utility pads may need longer cure time before loading.",
  },
  Footing: {
    thickness: 8,
    firstWalkHours: 48,
    lightUseDays: 4,
    vehicleDays: 0,
    sealDays: 0,
    fullCureDays: 28,
    note: "Footings may require engineer, inspector, or code approval before loading or continuing vertical construction.",
  },
  Wall: {
    thickness: 8,
    firstWalkHours: 48,
    lightUseDays: 4,
    vehicleDays: 0,
    sealDays: 0,
    fullCureDays: 28,
    note: "Concrete walls and vertical forms require special attention to form removal, bracing, weather, and structural loading.",
  },
  Custom: {
    thickness: 4,
    firstWalkHours: 36,
    lightUseDays: 3,
    vehicleDays: 7,
    sealDays: 28,
    fullCureDays: 28,
    note: "Use custom timing only as a planning estimate. Confirm project-specific cure requirements before loading concrete.",
  },
};

const weatherFactors: Record<
  WeatherCondition,
  {
    multiplier: number;
    risk: string;
    advice: string;
  }
> = {
  Normal: {
    multiplier: 1,
    risk: "Normal curing conditions",
    advice: "Maintain proper moisture and avoid early loading.",
  },
  Cold: {
    multiplier: 1.4,
    risk: "Slower strength gain",
    advice: "Cold weather slows curing. Protect fresh concrete from freezing and allow extra time before loading.",
  },
  "Hot / dry": {
    multiplier: 1.15,
    risk: "Fast surface drying",
    advice: "Hot, dry conditions can dry the surface too quickly. Use curing methods recommended by the contractor or supplier.",
  },
  "Rain risk": {
    multiplier: 1.2,
    risk: "Surface damage risk",
    advice: "Fresh concrete should be protected from rain that can damage the finish or weaken the surface.",
  },
  Windy: {
    multiplier: 1.15,
    risk: "Rapid moisture loss",
    advice: "Wind can pull moisture from the surface and increase plastic shrinkage cracking risk.",
  },
  Humid: {
    multiplier: 1.05,
    risk: "Slightly slower drying",
    advice: "Humidity may slow surface drying, but proper curing and protection still matter.",
  },
};

export default function ConcreteCureTimeClient() {
  const [projectType, setProjectType] = useState<ProjectType>("Driveway");
  const [weather, setWeather] = useState<WeatherCondition>("Normal");
  const [thicknessInches, setThicknessInches] = useState(5);
  const [averageTemperature, setAverageTemperature] = useState(70);
  const [customWalkHours, setCustomWalkHours] = useState(48);
  const [customLightUseDays, setCustomLightUseDays] = useState(3);
  const [customVehicleDays, setCustomVehicleDays] = useState(7);
  const [customSealDays, setCustomSealDays] = useState(28);
  const [copied, setCopied] = useState(false);

  function applyProject(type: ProjectType) {
    setProjectType(type);
    const preset = projectDefaults[type];
    setThicknessInches(preset.thickness);
    setCustomWalkHours(preset.firstWalkHours);
    setCustomLightUseDays(preset.lightUseDays);
    setCustomVehicleDays(preset.vehicleDays);
    setCustomSealDays(preset.sealDays);
  }

  const results = useMemo(() => {
    const preset = projectDefaults[projectType];
    const weatherFactor = weatherFactors[weather];

    let temperatureFactor = 1;
    if (averageTemperature < 40) temperatureFactor = 1.6;
    else if (averageTemperature < 50) temperatureFactor = 1.35;
    else if (averageTemperature < 60) temperatureFactor = 1.15;
    else if (averageTemperature > 90) temperatureFactor = 1.15;
    else if (averageTemperature > 80) temperatureFactor = 1.05;

    const thicknessFactor =
      thicknessInches > preset.thickness
        ? 1 + Math.min((thicknessInches - preset.thickness) * 0.04, 0.25)
        : 1;

    const combinedFactor = weatherFactor.multiplier * temperatureFactor * thicknessFactor;

    const walkHours = Math.ceil(customWalkHours * combinedFactor);
    const lightUseDays = Math.ceil(customLightUseDays * combinedFactor);
    const vehicleDays =
      customVehicleDays > 0 ? Math.ceil(customVehicleDays * combinedFactor) : 0;
    const sealDays = customSealDays > 0 ? Math.ceil(customSealDays * combinedFactor) : 0;
    const fullCureDays = Math.ceil(preset.fullCureDays * Math.max(1, temperatureFactor));

    let riskLevel = "Normal";
    if (combinedFactor >= 1.6) riskLevel = "High delay risk";
    else if (combinedFactor >= 1.25) riskLevel = "Moderate delay risk";

    return {
      walkHours,
      lightUseDays,
      vehicleDays,
      sealDays,
      fullCureDays,
      combinedFactor,
      riskLevel,
      weatherRisk: weatherFactor.risk,
      weatherAdvice: weatherFactor.advice,
      projectNote: preset.note,
    };
  }, [
    projectType,
    weather,
    thicknessInches,
    averageTemperature,
    customWalkHours,
    customLightUseDays,
    customVehicleDays,
    customSealDays,
  ]);

  function formatNumber(value: number, digits = 0) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete Cure Time Estimate
Project type: ${projectType}
Thickness: ${thicknessInches} in
Average temperature: ${averageTemperature} °F
Weather condition: ${weather}
Risk level: ${results.riskLevel}
Careful foot traffic: about ${results.walkHours} hours
Light use: about ${results.lightUseDays} days
Passenger vehicles: ${results.vehicleDays > 0 ? `about ${results.vehicleDays} days` : "not applicable"}
Sealing / coating: ${results.sealDays > 0 ? `about ${results.sealDays} days` : "not applicable"}
Full design cure reference: about ${results.fullCureDays} days
Weather note: ${results.weatherAdvice}
Project note: ${results.projectNote}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete cure timing
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Select the project type, slab thickness, average temperature, and weather
          conditions to estimate cure-time milestones.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              "Patio",
              "Sidewalk",
              "Driveway",
              "Garage slab",
              "Concrete pad",
              "Footing",
              "Wall",
              "Custom",
            ] as ProjectType[]
          ).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => applyProject(type)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                projectType === type
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput
            label="Concrete thickness"
            suffix="in"
            value={thicknessInches}
            setValue={(value) => {
              setProjectType("Custom");
              setThicknessInches(value);
            }}
          />
          <NumberInput
            label="Average temperature"
            suffix="°F"
            value={averageTemperature}
            setValue={setAverageTemperature}
          />
          <NumberInput
            label="Base foot-traffic timing"
            suffix="hrs"
            value={customWalkHours}
            setValue={(value) => {
              setProjectType("Custom");
              setCustomWalkHours(value);
            }}
          />
          <NumberInput
            label="Base light-use timing"
            suffix="days"
            value={customLightUseDays}
            setValue={(value) => {
              setProjectType("Custom");
              setCustomLightUseDays(value);
            }}
          />
          <NumberInput
            label="Base vehicle timing"
            suffix="days"
            value={customVehicleDays}
            setValue={(value) => {
              setProjectType("Custom");
              setCustomVehicleDays(value);
            }}
          />
          <NumberInput
            label="Base sealing timing"
            suffix="days"
            value={customSealDays}
            setValue={(value) => {
              setProjectType("Custom");
              setCustomSealDays(value);
            }}
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-white">Weather condition</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(["Normal", "Cold", "Hot / dry", "Rain risk", "Windy", "Humid"] as WeatherCondition[]).map(
              (condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => setWeather(condition)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    weather === condition
                      ? "border-[#F97316] bg-[#F97316] text-white"
                      : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
                  }`}
                >
                  {condition}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Curing note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">{results.projectNote}</p>
          <p className="mt-3 text-sm font-semibold text-white">Weather note</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            {results.weatherAdvice}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Cure-time estimate</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Risk level</p>
          <p className="mt-2 text-4xl font-bold text-white">{results.riskLevel}</p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            Adjustment factor: {formatNumber(results.combinedFactor, 2)}x
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Careful foot traffic" value={`~${results.walkHours} hrs`} />
          <ResultRow label="Light use" value={`~${results.lightUseDays} days`} />
          <ResultRow
            label="Passenger vehicles"
            value={results.vehicleDays > 0 ? `~${results.vehicleDays} days` : "N/A"}
          />
          <ResultRow
            label="Sealing / coating"
            value={results.sealDays > 0 ? `~${results.sealDays} days` : "N/A"}
          />
          <ResultRow label="Full cure reference" value={`~${results.fullCureDays} days`} />
          <ResultRow label="Weather risk" value={results.weatherRisk} />
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          Cure time depends on mix design, cement type, water content, admixtures,
          temperature, humidity, wind, finishing, curing method, slab thickness,
          load requirements, and local specifications. This tool is for planning only.
        </p>
      </div>
    </div>
  );
}

function NumberInput({
  label,
  suffix,
  value,
  setValue,
}: {
  label: string;
  suffix: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-white">{label}</span>
      <div className="flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-[#F97316]">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="w-full bg-transparent px-4 py-3 text-white outline-none"
        />
        <span className="flex items-center border-l border-[#1F2937] px-3 text-sm text-[#A0AEC0]">
          {suffix}
        </span>
      </div>
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}
