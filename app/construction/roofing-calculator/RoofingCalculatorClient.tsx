"use client";

import { useMemo, useState } from "react";

type CalculationMode = "footprint" | "known-area";
type RoofStyle = "gable" | "hip" | "shed" | "complex";
type RoofingMaterial =
  | "asphalt"
  | "metal"
  | "tile"
  | "wood"
  | "slate"
  | "membrane"
  | "custom";

const materialLabels: Record<RoofingMaterial, string> = {
  asphalt: "Asphalt shingles",
  metal: "Metal roofing",
  tile: "Clay or concrete tile",
  wood: "Wood shakes or shingles",
  slate: "Slate roofing",
  membrane: "Low-slope membrane",
  custom: "Custom roofing material",
};

function safeNumber(value: number) {
  return Number.isFinite(value) && value >= 0 ? value : 0;
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

export default function RoofingCalculatorClient() {
  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>("footprint");

  const [roofStyle, setRoofStyle] =
    useState<RoofStyle>("gable");

  const [buildingLength, setBuildingLength] = useState(40);
  const [buildingWidth, setBuildingWidth] = useState(30);
  const [overhang, setOverhang] = useState(12);

  const [rise, setRise] = useState(6);
  const [run, setRun] = useState(12);
  const [knownRoofArea, setKnownRoofArea] = useState(1500);

  const [wastePercent, setWastePercent] = useState(10);
  const [roofingMaterial, setRoofingMaterial] =
    useState<RoofingMaterial>("asphalt");

  const [materialCostPerSquare, setMaterialCostPerSquare] =
    useState(0);
  const [laborCostPerSquare, setLaborCostPerSquare] =
    useState(0);

  const [tearOffLayers, setTearOffLayers] = useState(1);
  const [tearOffCostPerSquare, setTearOffCostPerSquare] =
    useState(0);

  const [disposalFee, setDisposalFee] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [permitFee, setPermitFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);

  const [salesTaxRate, setSalesTaxRate] = useState(0);
  const [rangePercent, setRangePercent] = useState(15);

  const result = useMemo(() => {
    const safeLength = safeNumber(buildingLength);
    const safeWidth = safeNumber(buildingWidth);
    const safeOverhang = safeNumber(overhang);
    const safeRise = safeNumber(rise);
    const safeRun = safeNumber(run);
    const safeKnownRoofArea = safeNumber(knownRoofArea);

    const safeWastePercent = safeNumber(wastePercent);
    const safeMaterialCostPerSquare = safeNumber(
      materialCostPerSquare,
    );
    const safeLaborCostPerSquare = safeNumber(
      laborCostPerSquare,
    );

    const safeTearOffLayers = Math.floor(
      safeNumber(tearOffLayers),
    );
    const safeTearOffCostPerSquare = safeNumber(
      tearOffCostPerSquare,
    );

    const safeDisposalFee = safeNumber(disposalFee);
    const safeDeliveryFee = safeNumber(deliveryFee);
    const safePermitFee = safeNumber(permitFee);
    const safeAdditionalFees = safeNumber(additionalFees);

    const safeSalesTaxRate = safeNumber(salesTaxRate);
    const safeRangePercent = Math.min(
      safeNumber(rangePercent),
      100,
    );

    const slope = safeRun > 0 ? safeRise / safeRun : 0;
    const risePerTwelve = slope * 12;

    const angleDegrees =
      safeRun > 0
        ? (Math.atan(slope) * 180) / Math.PI
        : 0;

    const pitchMultiplier =
      safeRun > 0
        ? Math.sqrt(
            safeRise * safeRise + safeRun * safeRun,
          ) / safeRun
        : 0;

    const overhangFeet = safeOverhang / 12;
    const roofFootprintLength =
      safeLength + overhangFeet * 2;
    const roofFootprintWidth =
      safeWidth + overhangFeet * 2;

    const horizontalRoofArea =
      roofFootprintLength * roofFootprintWidth;

    const calculatedSlopedArea =
      horizontalRoofArea * pitchMultiplier;

    const roofAreaBeforeWaste =
      calculationMode === "known-area"
        ? safeKnownRoofArea
        : calculatedSlopedArea;

    const baseRoofingSquares =
      roofAreaBeforeWaste / 100;

    const wasteArea =
      roofAreaBeforeWaste * (safeWastePercent / 100);

    const purchaseRoofArea =
      roofAreaBeforeWaste + wasteArea;

    const purchaseRoofingSquares =
      purchaseRoofArea / 100;

    const materialCost =
      purchaseRoofingSquares *
      safeMaterialCostPerSquare;

    const laborCost =
      baseRoofingSquares * safeLaborCostPerSquare;

    const tearOffCost =
      baseRoofingSquares *
      safeTearOffLayers *
      safeTearOffCostPerSquare;

    const fixedFees =
      safeDisposalFee +
      safeDeliveryFee +
      safePermitFee +
      safeAdditionalFees;

    const subtotalBeforeTax =
      materialCost +
      laborCost +
      tearOffCost +
      fixedFees;

    const estimatedTax =
      materialCost * (safeSalesTaxRate / 100);

    const expectedTotal =
      subtotalBeforeTax + estimatedTax;

    const lowEstimate =
      expectedTotal * (1 - safeRangePercent / 100);

    const highEstimate =
      expectedTotal * (1 + safeRangePercent / 100);

    const costPerSquareFoot =
      roofAreaBeforeWaste > 0
        ? expectedTotal / roofAreaBeforeWaste
        : 0;

    const costPerRoofingSquare =
      baseRoofingSquares > 0
        ? expectedTotal / baseRoofingSquares
        : 0;

    const pitchCategory =
      risePerTwelve < 4
        ? "Low slope"
        : risePerTwelve <= 9
          ? "Conventional slope"
          : "Steep slope";

    const notes: string[] = [];

    if (
      calculationMode === "footprint" &&
      (safeLength === 0 || safeWidth === 0)
    ) {
      notes.push(
        "Enter both building dimensions to calculate the roof area from the footprint.",
      );
    }

    if (
      calculationMode === "footprint" &&
      safeRun === 0
    ) {
      notes.push(
        "Enter a roof-pitch run greater than zero to calculate the sloped roof area.",
      );
    }

    if (
      calculationMode === "known-area" &&
      safeKnownRoofArea === 0
    ) {
      notes.push(
        "Enter a measured sloped roof area greater than zero.",
      );
    }

    if (safeWastePercent < 5) {
      notes.push(
        "The waste allowance is low. Valleys, hips, dormers, starter courses, cuts, and damaged material can increase waste.",
      );
    }

    if (roofStyle === "complex" && safeWastePercent < 15) {
      notes.push(
        "Complex roofs often require a higher waste allowance. Verify the layout and material requirements.",
      );
    }

    if (
      safeMaterialCostPerSquare === 0 ||
      safeLaborCostPerSquare === 0
    ) {
      notes.push(
        "Enter current material and labor pricing to generate a complete project-cost estimate.",
      );
    }

    if (
      safeTearOffLayers > 0 &&
      safeTearOffCostPerSquare === 0
    ) {
      notes.push(
        "Tear-off layers are included, but no removal cost per square has been entered.",
      );
    }

    if (safeSalesTaxRate > 0) {
      notes.push(
        "This estimate applies sales tax to material cost only. Verify the taxable amount and rate for the project location.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "This estimate uses the entered roof area, waste, unit pricing, tear-off details, fees, and uncertainty range.",
      );
    }

    return {
      safeLength,
      safeWidth,
      safeOverhang,
      safeRise,
      safeRun,
      safeKnownRoofArea,
      safeWastePercent,
      safeMaterialCostPerSquare,
      safeLaborCostPerSquare,
      safeTearOffLayers,
      safeTearOffCostPerSquare,
      safeDisposalFee,
      safeDeliveryFee,
      safePermitFee,
      safeAdditionalFees,
      safeSalesTaxRate,
      safeRangePercent,
      slope,
      risePerTwelve,
      angleDegrees,
      pitchMultiplier,
      roofFootprintLength,
      roofFootprintWidth,
      horizontalRoofArea,
      calculatedSlopedArea,
      roofAreaBeforeWaste,
      baseRoofingSquares,
      wasteArea,
      purchaseRoofArea,
      purchaseRoofingSquares,
      materialCost,
      laborCost,
      tearOffCost,
      fixedFees,
      subtotalBeforeTax,
      estimatedTax,
      expectedTotal,
      lowEstimate,
      highEstimate,
      costPerSquareFoot,
      costPerRoofingSquare,
      pitchCategory,
      notes,
    };
  }, [
    calculationMode,
    roofStyle,
    buildingLength,
    buildingWidth,
    overhang,
    rise,
    run,
    knownRoofArea,
    wastePercent,
    materialCostPerSquare,
    laborCostPerSquare,
    tearOffLayers,
    tearOffCostPerSquare,
    disposalFee,
    deliveryFee,
    permitFee,
    additionalFees,
    salesTaxRate,
    rangePercent,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Roofing Calculator",
      `Calculation mode: ${
        calculationMode === "footprint"
          ? "Building footprint"
          : "Known roof area"
      }`,
      `Roof style: ${roofStyle}`,
      `Roofing material: ${materialLabels[roofingMaterial]}`,
      ...(calculationMode === "footprint"
        ? [
            `Roof pitch: ${formatNumber(result.risePerTwelve)}:12`,
            `Roof angle: ${formatNumber(result.angleDegrees)}°`,
            `Pitch multiplier: ${formatNumber(result.pitchMultiplier, 3)}`,
          ]
        : []),
      `Roof area before waste: ${formatNumber(result.roofAreaBeforeWaste)} sq ft`,
      `Waste allowance: ${formatNumber(result.safeWastePercent)}%`,
      `Purchase roof area: ${formatNumber(result.purchaseRoofArea)} sq ft`,
      `Purchase roofing squares: ${formatNumber(result.purchaseRoofingSquares)}`,
      `Material cost: ${formatCurrency(result.materialCost)}`,
      `Labor cost: ${formatCurrency(result.laborCost)}`,
      `Tear-off cost: ${formatCurrency(result.tearOffCost)}`,
      `Subtotal before tax: ${formatCurrency(result.subtotalBeforeTax)}`,
      `Estimated tax: ${formatCurrency(result.estimatedTax)}`,
      `Expected project total: ${formatCurrency(result.expectedTotal)}`,
      `Low estimate: ${formatCurrency(result.lowEstimate)}`,
      `High estimate: ${formatCurrency(result.highEstimate)}`,
      `Cost per square foot: ${formatCurrency(result.costPerSquareFoot)}`,
      `Cost per roofing square: ${formatCurrency(result.costPerRoofingSquare)}`,
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
          Roofing project details
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Calculate roof area from a simple building footprint or
          enter a measured sloped roof area. Add current project
          pricing to estimate material, labor, removal, fees, and
          total roofing cost.
        </p>

        <div className="mt-7">
          <SelectInput
            label="Calculation mode"
            value={calculationMode}
            onChange={(value) =>
              setCalculationMode(value as CalculationMode)
            }
            options={[
              {
                value: "footprint",
                label: "Building footprint and pitch",
              },
              {
                value: "known-area",
                label: "Known sloped roof area",
              },
            ]}
          />
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <SelectInput
            label="Roof style"
            value={roofStyle}
            onChange={(value) =>
              setRoofStyle(value as RoofStyle)
            }
            options={[
              { value: "gable", label: "Gable roof" },
              { value: "hip", label: "Hip roof" },
              { value: "shed", label: "Shed roof" },
              { value: "complex", label: "Complex or multi-section" },
            ]}
          />

          <SelectInput
            label="Roofing material"
            value={roofingMaterial}
            onChange={(value) =>
              setRoofingMaterial(value as RoofingMaterial)
            }
            options={[
              {
                value: "asphalt",
                label: "Asphalt shingles",
              },
              {
                value: "metal",
                label: "Metal roofing",
              },
              {
                value: "tile",
                label: "Clay or concrete tile",
              },
              {
                value: "wood",
                label: "Wood shakes or shingles",
              },
              {
                value: "slate",
                label: "Slate roofing",
              },
              {
                value: "membrane",
                label: "Low-slope membrane",
              },
              {
                value: "custom",
                label: "Custom roofing material",
              },
            ]}
          />
        </div>

        {calculationMode === "footprint" ? (
          <>
            <InputSection title="Building and roof geometry">
              <div className="grid gap-5 sm:grid-cols-2">
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

                <NumberInput
                  label="Roof-pitch rise"
                  value={rise}
                  onChange={setRise}
                  suffix="in"
                />

                <NumberInput
                  label="Roof-pitch run"
                  value={run}
                  onChange={setRun}
                  suffix="in"
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
            </InputSection>
          </>
        ) : (
          <InputSection title="Measured roof area">
            <NumberInput
              label="Known sloped roof area"
              value={knownRoofArea}
              onChange={setKnownRoofArea}
              suffix="sq ft"
            />
          </InputSection>
        )}

        <InputSection title="Waste and unit pricing">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Waste allowance"
              value={wastePercent}
              onChange={setWastePercent}
              suffix="%"
            />

            <NumberInput
              label="Material cost per roofing square"
              value={materialCostPerSquare}
              onChange={setMaterialCostPerSquare}
              prefix="$"
              suffix="/square"
            />

            <NumberInput
              label="Labor cost per roofing square"
              value={laborCostPerSquare}
              onChange={setLaborCostPerSquare}
              prefix="$"
              suffix="/square"
            />

            <NumberInput
              label="Estimate range"
              value={rangePercent}
              onChange={setRangePercent}
              suffix="%"
            />
          </div>
        </InputSection>

        <InputSection title="Tear-off and removal">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Existing roof layers"
              value={tearOffLayers}
              onChange={setTearOffLayers}
              suffix="layers"
              integer
            />

            <NumberInput
              label="Tear-off cost per square per layer"
              value={tearOffCostPerSquare}
              onChange={setTearOffCostPerSquare}
              prefix="$"
              suffix="/square"
            />
          </div>
        </InputSection>

        <InputSection title="Project fees and tax">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Disposal fee"
              value={disposalFee}
              onChange={setDisposalFee}
              prefix="$"
            />

            <NumberInput
              label="Delivery fee"
              value={deliveryFee}
              onChange={setDeliveryFee}
              prefix="$"
            />

            <NumberInput
              label="Permit fee"
              value={permitFee}
              onChange={setPermitFee}
              prefix="$"
            />

            <NumberInput
              label="Additional fees"
              value={additionalFees}
              onChange={setAdditionalFees}
              prefix="$"
            />

            <NumberInput
              label="Sales tax on materials"
              value={salesTaxRate}
              onChange={setSalesTaxRate}
              suffix="%"
            />
          </div>
        </InputSection>

        <div className="mt-7 rounded-2xl border border-orange-500/40 bg-orange-500/10 p-5">
          <h3 className="font-semibold text-orange-300">
            Pricing guidance
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
            Enter current quotes for the selected material,
            project location, roof complexity, access conditions,
            tear-off requirements, disposal, labor, and permits.
            The calculator does not provide live supplier pricing.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
          Results
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          Roofing project estimate
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review the roof area, purchase quantity, cost breakdown,
          and editable low-to-high planning range.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Expected project total"
            value={formatCurrency(result.expectedTotal)}
            highlight
          />

          <ResultCard
            label="Purchase roofing squares"
            value={formatNumber(result.purchaseRoofingSquares)}
          />

          <ResultCard
            label="Roof area before waste"
            value={`${formatNumber(result.roofAreaBeforeWaste)} sq ft`}
          />

          <ResultCard
            label="Purchase roof area"
            value={`${formatNumber(result.purchaseRoofArea)} sq ft`}
          />

          <ResultCard
            label="Low estimate"
            value={formatCurrency(result.lowEstimate)}
          />

          <ResultCard
            label="High estimate"
            value={formatCurrency(result.highEstimate)}
          />
        </div>

        <ResultPanel title="Roof geometry">
          <ResultRow
            label="Calculation mode"
            value={
              calculationMode === "footprint"
                ? "Building footprint"
                : "Known sloped area"
            }
          />

          <ResultRow
            label="Roof style"
            value={
              roofStyle === "complex"
                ? "Complex or multi-section"
                : `${roofStyle.charAt(0).toUpperCase()}${roofStyle.slice(1)} roof`
            }
          />

          <ResultRow
            label="Roofing material"
            value={materialLabels[roofingMaterial]}
          />

          {calculationMode === "footprint" ? (
            <>
              <ResultRow
                label="Normalized roof pitch"
                value={`${formatNumber(result.risePerTwelve)}:12`}
              />

              <ResultRow
                label="Roof angle"
                value={`${formatNumber(result.angleDegrees)}°`}
              />

              <ResultRow
                label="Pitch multiplier"
                value={formatNumber(result.pitchMultiplier, 3)}
              />

              <ResultRow
                label="Pitch category"
                value={result.pitchCategory}
              />

              <ResultRow
                label="Horizontal roof area"
                value={`${formatNumber(result.horizontalRoofArea)} sq ft`}
              />
            </>
          ) : null}

          <ResultRow
            label="Roof area before waste"
            value={`${formatNumber(result.roofAreaBeforeWaste)} sq ft`}
          />

          <ResultRow
            label="Base roofing squares"
            value={formatNumber(result.baseRoofingSquares)}
          />
        </ResultPanel>

        <ResultPanel title="Purchase allowance">
          <ResultRow
            label="Waste allowance"
            value={`${formatNumber(result.safeWastePercent)}%`}
          />

          <ResultRow
            label="Additional waste area"
            value={`${formatNumber(result.wasteArea)} sq ft`}
          />

          <ResultRow
            label="Purchase roof area"
            value={`${formatNumber(result.purchaseRoofArea)} sq ft`}
          />

          <ResultRow
            label="Purchase roofing squares"
            value={formatNumber(result.purchaseRoofingSquares)}
          />
        </ResultPanel>

        <ResultPanel title="Cost breakdown">
          <ResultRow
            label="Material cost"
            value={formatCurrency(result.materialCost)}
          />

          <ResultRow
            label="Installation labor"
            value={formatCurrency(result.laborCost)}
          />

          <ResultRow
            label={`Tear-off cost (${result.safeTearOffLayers} layers)`}
            value={formatCurrency(result.tearOffCost)}
          />

          <ResultRow
            label="Disposal fee"
            value={formatCurrency(result.safeDisposalFee)}
          />

          <ResultRow
            label="Delivery fee"
            value={formatCurrency(result.safeDeliveryFee)}
          />

          <ResultRow
            label="Permit fee"
            value={formatCurrency(result.safePermitFee)}
          />

          <ResultRow
            label="Additional fees"
            value={formatCurrency(result.safeAdditionalFees)}
          />

          <ResultRow
            label="Subtotal before tax"
            value={formatCurrency(result.subtotalBeforeTax)}
          />

          <ResultRow
            label={`Estimated material tax (${formatNumber(result.safeSalesTaxRate)}%)`}
            value={formatCurrency(result.estimatedTax)}
          />

          <ResultRow
            label="Expected project total"
            value={formatCurrency(result.expectedTotal)}
          />
        </ResultPanel>

        <ResultPanel title="Cost range and unit cost">
          <ResultRow
            label={`Low estimate (-${formatNumber(result.safeRangePercent)}%)`}
            value={formatCurrency(result.lowEstimate)}
          />

          <ResultRow
            label="Expected estimate"
            value={formatCurrency(result.expectedTotal)}
          />

          <ResultRow
            label={`High estimate (+${formatNumber(result.safeRangePercent)}%)`}
            value={formatCurrency(result.highEstimate)}
          />

          <ResultRow
            label="Cost per square foot"
            value={formatCurrency(result.costPerSquareFoot)}
          />

          <ResultRow
            label="Cost per roofing square"
            value={formatCurrency(result.costPerRoofingSquare)}
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

function InputSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
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
          <option
            key={option.value}
            value={option.value}
          >
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
