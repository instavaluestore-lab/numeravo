"use client";

import { useMemo, useState } from "react";

type PresetType =
  | "Slab"
  | "Driveway"
  | "Patio"
  | "Pad"
  | "Footing"
  | "Custom";

const presets: Record<
  PresetType,
  {
    length: number;
    width: number;
    extraFormRuns: number;
    formRuns: number;
    boardLength: number;
    boardCost: number;
    stakeSpacing: number;
    stakeCost: number;
    braceSpacing: number;
    braceCost: number;
    fastenerCostPerBoard: number;
    formOilCostPerFoot: number;
    wastePercent: number;
    laborHours: number;
    laborRate: number;
  }
> = {
  Slab: {
    length: 20,
    width: 20,
    extraFormRuns: 0,
    formRuns: 1,
    boardLength: 12,
    boardCost: 9.5,
    stakeSpacing: 3,
    stakeCost: 2.25,
    braceSpacing: 6,
    braceCost: 3.5,
    fastenerCostPerBoard: 1.25,
    formOilCostPerFoot: 0.08,
    wastePercent: 10,
    laborHours: 5,
    laborRate: 65,
  },
  Driveway: {
    length: 40,
    width: 12,
    extraFormRuns: 0,
    formRuns: 1,
    boardLength: 12,
    boardCost: 9.5,
    stakeSpacing: 3,
    stakeCost: 2.25,
    braceSpacing: 6,
    braceCost: 3.5,
    fastenerCostPerBoard: 1.25,
    formOilCostPerFoot: 0.08,
    wastePercent: 10,
    laborHours: 7,
    laborRate: 65,
  },
  Patio: {
    length: 16,
    width: 14,
    extraFormRuns: 0,
    formRuns: 1,
    boardLength: 12,
    boardCost: 9.5,
    stakeSpacing: 3,
    stakeCost: 2.25,
    braceSpacing: 6,
    braceCost: 3.5,
    fastenerCostPerBoard: 1.25,
    formOilCostPerFoot: 0.08,
    wastePercent: 10,
    laborHours: 4,
    laborRate: 65,
  },
  Pad: {
    length: 10,
    width: 10,
    extraFormRuns: 0,
    formRuns: 1,
    boardLength: 12,
    boardCost: 9.5,
    stakeSpacing: 3,
    stakeCost: 2.25,
    braceSpacing: 6,
    braceCost: 3.5,
    fastenerCostPerBoard: 1.25,
    formOilCostPerFoot: 0.08,
    wastePercent: 8,
    laborHours: 3,
    laborRate: 65,
  },
  Footing: {
    length: 40,
    width: 2,
    extraFormRuns: 0,
    formRuns: 2,
    boardLength: 12,
    boardCost: 9.5,
    stakeSpacing: 3,
    stakeCost: 2.25,
    braceSpacing: 5,
    braceCost: 3.5,
    fastenerCostPerBoard: 1.25,
    formOilCostPerFoot: 0.08,
    wastePercent: 12,
    laborHours: 6,
    laborRate: 65,
  },
  Custom: {
    length: 20,
    width: 20,
    extraFormRuns: 0,
    formRuns: 1,
    boardLength: 12,
    boardCost: 9.5,
    stakeSpacing: 3,
    stakeCost: 2.25,
    braceSpacing: 6,
    braceCost: 3.5,
    fastenerCostPerBoard: 1.25,
    formOilCostPerFoot: 0.08,
    wastePercent: 10,
    laborHours: 5,
    laborRate: 65,
  },
};

export default function ConcreteFormworkCalculatorClient() {
  const [presetType, setPresetType] = useState<PresetType>("Slab");
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(20);
  const [extraFormRuns, setExtraFormRuns] = useState(0);
  const [formRuns, setFormRuns] = useState(1);
  const [boardLength, setBoardLength] = useState(12);
  const [boardCost, setBoardCost] = useState(9.5);
  const [stakeSpacing, setStakeSpacing] = useState(3);
  const [stakeCost, setStakeCost] = useState(2.25);
  const [braceSpacing, setBraceSpacing] = useState(6);
  const [braceCost, setBraceCost] = useState(3.5);
  const [fastenerCostPerBoard, setFastenerCostPerBoard] = useState(1.25);
  const [formOilCostPerFoot, setFormOilCostPerFoot] = useState(0.08);
  const [wastePercent, setWastePercent] = useState(10);
  const [laborHours, setLaborHours] = useState(5);
  const [laborRate, setLaborRate] = useState(65);
  const [copied, setCopied] = useState(false);

  function applyPreset(type: PresetType) {
    const preset = presets[type];

    setPresetType(type);
    setLength(preset.length);
    setWidth(preset.width);
    setExtraFormRuns(preset.extraFormRuns);
    setFormRuns(preset.formRuns);
    setBoardLength(preset.boardLength);
    setBoardCost(preset.boardCost);
    setStakeSpacing(preset.stakeSpacing);
    setStakeCost(preset.stakeCost);
    setBraceSpacing(preset.braceSpacing);
    setBraceCost(preset.braceCost);
    setFastenerCostPerBoard(preset.fastenerCostPerBoard);
    setFormOilCostPerFoot(preset.formOilCostPerFoot);
    setWastePercent(preset.wastePercent);
    setLaborHours(preset.laborHours);
    setLaborRate(preset.laborRate);
  }

  const results = useMemo(() => {
    const perimeter = 2 * (length + width);
    const baseFormLinearFeet = perimeter * formRuns + extraFormRuns;
    const wasteLinearFeet = baseFormLinearFeet * (wastePercent / 100);
    const totalFormLinearFeet = baseFormLinearFeet + wasteLinearFeet;

    const boardCount =
      boardLength > 0 ? Math.ceil(totalFormLinearFeet / boardLength) : 0;
    const stakeCount =
      stakeSpacing > 0 ? Math.ceil(baseFormLinearFeet / stakeSpacing) + 4 : 0;
    const braceCount =
      braceSpacing > 0 ? Math.ceil(baseFormLinearFeet / braceSpacing) : 0;

    const boardCostTotal = boardCount * boardCost;
    const stakeCostTotal = stakeCount * stakeCost;
    const braceCostTotal = braceCount * braceCost;
    const fastenerCost = boardCount * fastenerCostPerBoard;
    const formOilCost = totalFormLinearFeet * formOilCostPerFoot;
    const materialCost =
      boardCostTotal + stakeCostTotal + braceCostTotal + fastenerCost + formOilCost;
    const laborCost = laborHours * laborRate;
    const totalCost = materialCost + laborCost;

    const costPerLinearFoot =
      totalFormLinearFeet > 0 ? totalCost / totalFormLinearFeet : 0;
    const laborCostPerLinearFoot =
      totalFormLinearFeet > 0 ? laborCost / totalFormLinearFeet : 0;

    const notes: string[] = [];

    if (stakeSpacing > 4) {
      notes.push("Stake spacing is wide. Use closer spacing for deeper forms, soft soil, corners, curves, or long straight runs.");
    } else {
      notes.push("Stake spacing is within a common planning range for many flatwork forms.");
    }

    if (formRuns > 1) {
      notes.push("Multiple form runs are included, which is common for footings, trench forms, or two-sided forms.");
    }

    if (wastePercent < 5) {
      notes.push("Waste allowance is low. Add extra board length if cuts, corners, and damaged boards are likely.");
    }

    if (laborCost > materialCost) {
      notes.push("Labor is the largest cost driver in this estimate.");
    }

    return {
      perimeter,
      baseFormLinearFeet,
      wasteLinearFeet,
      totalFormLinearFeet,
      boardCount,
      stakeCount,
      braceCount,
      boardCostTotal,
      stakeCostTotal,
      braceCostTotal,
      fastenerCost,
      formOilCost,
      materialCost,
      laborCost,
      totalCost,
      costPerLinearFoot,
      laborCostPerLinearFoot,
      notes,
    };
  }, [
    length,
    width,
    extraFormRuns,
    formRuns,
    boardLength,
    boardCost,
    stakeSpacing,
    stakeCost,
    braceSpacing,
    braceCost,
    fastenerCostPerBoard,
    formOilCostPerFoot,
    wastePercent,
    laborHours,
    laborRate,
  ]);

  function formatNumber(value: number, digits = 2) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  async function copyResults() {
    const text = `Concrete Formwork Calculator
Preset: ${presetType}
Length: ${formatNumber(length)} ft
Width: ${formatNumber(width)} ft
Perimeter: ${formatNumber(results.perimeter)} ft
Form runs: ${formatNumber(formRuns)}
Extra form runs: ${formatNumber(extraFormRuns)} ft
Base form linear feet: ${formatNumber(results.baseFormLinearFeet)} ft
Waste allowance: ${formatNumber(wastePercent)}%
Total form linear feet: ${formatNumber(results.totalFormLinearFeet)} ft
Board length: ${formatNumber(boardLength)} ft
Board count: ${results.boardCount}
Stake count: ${results.stakeCount}
Brace count: ${results.braceCount}
Material cost: $${formatNumber(results.materialCost)}
Labor cost: $${formatNumber(results.laborCost)}
Total formwork cost: $${formatNumber(results.totalCost)}
Cost per linear foot: $${formatNumber(results.costPerLinearFoot)}
Notes: ${results.notes.join(" ")}`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h2 className="text-2xl font-semibold text-white">
          Calculate concrete formwork materials
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
          Enter form dimensions, board pricing, stake spacing, bracing, fasteners,
          form release, and labor to estimate total formwork cost.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(presets) as PresetType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => applyPreset(type)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                presetType === type
                  ? "border-[#F97316] bg-[#F97316] text-white"
                  : "border-[#1F2937] bg-[#0B0F19] text-white hover:border-[#F97316]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <NumberInput label="Pour length" suffix="ft" value={length} setValue={setLength} />
          <NumberInput label="Pour width" suffix="ft" value={width} setValue={setWidth} />
          <NumberInput label="Form runs" suffix="runs" value={formRuns} setValue={setFormRuns} />
          <NumberInput label="Extra form length" suffix="ft" value={extraFormRuns} setValue={setExtraFormRuns} />
          <NumberInput label="Board length" suffix="ft" value={boardLength} setValue={setBoardLength} />
          <NumberInput label="Cost per board" suffix="$" value={boardCost} setValue={setBoardCost} />
          <NumberInput label="Stake spacing" suffix="ft" value={stakeSpacing} setValue={setStakeSpacing} />
          <NumberInput label="Cost per stake" suffix="$" value={stakeCost} setValue={setStakeCost} />
          <NumberInput label="Brace spacing" suffix="ft" value={braceSpacing} setValue={setBraceSpacing} />
          <NumberInput label="Cost per brace" suffix="$" value={braceCost} setValue={setBraceCost} />
          <NumberInput label="Fastener cost per board" suffix="$" value={fastenerCostPerBoard} setValue={setFastenerCostPerBoard} />
          <NumberInput label="Form oil cost" suffix="$/ft" value={formOilCostPerFoot} setValue={setFormOilCostPerFoot} />
          <NumberInput label="Waste allowance" suffix="%" value={wastePercent} setValue={setWastePercent} />
          <NumberInput label="Labor hours" suffix="hr" value={laborHours} setValue={setLaborHours} />
          <NumberInput label="Labor rate" suffix="$/hr" value={laborRate} setValue={setLaborRate} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm font-semibold text-white">Formula used</p>
          <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
            Form linear feet = perimeter × form runs + extra form length. Board
            count is rounded up after adding the selected waste allowance.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121826] p-6">
        <h3 className="text-xl font-semibold text-white">Formwork results</h3>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <p className="text-sm text-[#A0AEC0]">Estimated total formwork cost</p>
          <p className="mt-2 text-4xl font-bold text-white">
            ${formatNumber(results.totalCost)}
          </p>
          <p className="mt-2 text-sm text-[#A0AEC0]">
            ${formatNumber(results.costPerLinearFoot)} per linear foot of forms
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <ResultRow label="Perimeter" value={`${formatNumber(results.perimeter)} ft`} />
          <ResultRow label="Base form linear feet" value={`${formatNumber(results.baseFormLinearFeet)} ft`} />
          <ResultRow label="Waste linear feet" value={`${formatNumber(results.wasteLinearFeet)} ft`} />
          <ResultRow label="Total form linear feet" value={`${formatNumber(results.totalFormLinearFeet)} ft`} />
          <ResultRow label="Form boards" value={`${results.boardCount}`} />
          <ResultRow label="Stakes" value={`${results.stakeCount}`} />
          <ResultRow label="Braces" value={`${results.braceCount}`} />
          <ResultRow label="Board cost" value={`$${formatNumber(results.boardCostTotal)}`} />
          <ResultRow label="Stake cost" value={`$${formatNumber(results.stakeCostTotal)}`} />
          <ResultRow label="Brace cost" value={`$${formatNumber(results.braceCostTotal)}`} />
          <ResultRow label="Fasteners" value={`$${formatNumber(results.fastenerCost)}`} />
          <ResultRow label="Form oil/release" value={`$${formatNumber(results.formOilCost)}`} />
          <ResultRow label="Material cost" value={`$${formatNumber(results.materialCost)}`} />
          <ResultRow label="Labor cost" value={`$${formatNumber(results.laborCost)}`} />
          <ResultRow label="Labor cost per linear foot" value={`$${formatNumber(results.laborCostPerLinearFoot)}`} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4">
          <p className="text-sm font-semibold text-white">Planning notes</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[#A0AEC0]">
            {results.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={copyResults}
          className="mt-5 w-full rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#A0AEC0]">
          Use this as a planning estimate. Actual formwork requirements can change
          with form height, soil, curves, slopes, concrete pressure, and inspection requirements.
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
