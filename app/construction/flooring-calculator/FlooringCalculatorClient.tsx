"use client";

import { useMemo, useState } from "react";

type CalculationMode = "room" | "known-area";

const flooringOptions = [
  "Laminate",
  "Luxury vinyl plank",
  "Hardwood",
  "Engineered hardwood",
  "Bamboo",
  "Cork",
  "Carpet tile",
  "Other flooring",
];

const clampNumber = (value: number) =>
  Number.isFinite(value) ? Math.max(value, 0) : 0;

const formatNumber = (value: number, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const formatCount = (
  value: number,
  singular: string,
  plural = `${singular}s`,
) => `${formatNumber(value, 0)} ${value === 1 ? singular : plural}`;

export default function FlooringCalculatorClient() {
  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>("room");
  const [flooringType, setFlooringType] =
    useState("Luxury vinyl plank");

  const [roomLength, setRoomLength] = useState(15);
  const [roomWidth, setRoomWidth] = useState(12);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [additionalArea, setAdditionalArea] = useState(0);
  const [deductionArea, setDeductionArea] = useState(0);
  const [knownFloorArea, setKnownFloorArea] = useState(180);

  const [wastePercent, setWastePercent] = useState(10);
  const [plankLength, setPlankLength] = useState(48);
  const [plankWidth, setPlankWidth] = useState(7);
  const [cartonCoverage, setCartonCoverage] = useState(23.77);

  const [underlaymentCoverage, setUnderlaymentCoverage] =
    useState(100);
  const [includeUnderlayment, setIncludeUnderlayment] =
    useState(true);

  const [baseboardOpeningDeduction, setBaseboardOpeningDeduction] =
    useState(6);
  const [knownBaseboardLength, setKnownBaseboardLength] =
    useState(54);
  const [baseboardPieceLength, setBaseboardPieceLength] =
    useState(8);
  const [baseboardWastePercent, setBaseboardWastePercent] =
    useState(10);

  const [flooringPricePerCarton, setFlooringPricePerCarton] =
    useState(52);
  const [underlaymentPricePerRoll, setUnderlaymentPricePerRoll] =
    useState(35);
  const [baseboardPricePerPiece, setBaseboardPricePerPiece] =
    useState(14);
  const [accessoryCost, setAccessoryCost] = useState(30);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(0);

  const result = useMemo(() => {
    const safeRoomLength = clampNumber(roomLength);
    const safeRoomWidth = clampNumber(roomWidth);
    const safeNumberOfRooms = Math.floor(
      clampNumber(numberOfRooms),
    );
    const safeAdditionalArea = clampNumber(additionalArea);
    const safeDeductionArea = clampNumber(deductionArea);
    const safeKnownFloorArea = clampNumber(knownFloorArea);

    const safeWastePercent = clampNumber(wastePercent);
    const safeWasteMultiplier = 1 + safeWastePercent / 100;

    const safePlankLength = clampNumber(plankLength);
    const safePlankWidth = clampNumber(plankWidth);
    const safeCartonCoverage = clampNumber(cartonCoverage);

    const safeUnderlaymentCoverage =
      clampNumber(underlaymentCoverage);

    const safeBaseboardOpeningDeduction = clampNumber(
      baseboardOpeningDeduction,
    );
    const safeKnownBaseboardLength =
      clampNumber(knownBaseboardLength);
    const safeBaseboardPieceLength =
      clampNumber(baseboardPieceLength);
    const safeBaseboardWastePercent = clampNumber(
      baseboardWastePercent,
    );

    const grossRoomArea =
      calculationMode === "room"
        ? safeRoomLength *
            safeRoomWidth *
            safeNumberOfRooms +
          safeAdditionalArea
        : safeKnownFloorArea;

    const applicableDeduction = Math.min(
      safeDeductionArea,
      grossRoomArea,
    );

    const netFloorArea = Math.max(
      grossRoomArea - applicableDeduction,
      0,
    );

    const flooringWasteArea =
      netFloorArea * (safeWastePercent / 100);

    const purchaseFloorArea =
      netFloorArea * safeWasteMultiplier;

    const plankArea =
      (safePlankLength * safePlankWidth) / 144;

    const piecesNeeded =
      plankArea > 0
        ? Math.ceil(purchaseFloorArea / plankArea)
        : 0;

    const cartonsRequired =
      safeCartonCoverage > 0
        ? Math.ceil(purchaseFloorArea / safeCartonCoverage)
        : 0;

    const purchasedCoverage =
      cartonsRequired * safeCartonCoverage;

    const wholeCartonOverage = Math.max(
      purchasedCoverage - purchaseFloorArea,
      0,
    );

    const estimatedPurchasedPieces =
      plankArea > 0
        ? Math.ceil(purchasedCoverage / plankArea)
        : 0;

    const underlaymentRolls =
      includeUnderlayment &&
      safeUnderlaymentCoverage > 0 &&
      purchaseFloorArea > 0
        ? Math.ceil(
            purchaseFloorArea / safeUnderlaymentCoverage,
          )
        : 0;

    const purchasedUnderlaymentCoverage =
      underlaymentRolls * safeUnderlaymentCoverage;

    const grossBaseboardLength =
      calculationMode === "room"
        ? 2 *
          (safeRoomLength + safeRoomWidth) *
          safeNumberOfRooms
        : safeKnownBaseboardLength;

    const netBaseboardLength = Math.max(
      grossBaseboardLength -
        safeBaseboardOpeningDeduction,
      0,
    );

    const baseboardPurchaseLength =
      netBaseboardLength *
      (1 + safeBaseboardWastePercent / 100);

    const baseboardPieces =
      safeBaseboardPieceLength > 0 &&
      baseboardPurchaseLength > 0
        ? Math.ceil(
            baseboardPurchaseLength /
              safeBaseboardPieceLength,
          )
        : 0;

    const purchasedBaseboardLength =
      baseboardPieces * safeBaseboardPieceLength;

    const safeFlooringPricePerCarton = clampNumber(
      flooringPricePerCarton,
    );
    const safeUnderlaymentPricePerRoll = clampNumber(
      underlaymentPricePerRoll,
    );
    const safeBaseboardPricePerPiece = clampNumber(
      baseboardPricePerPiece,
    );
    const safeAccessoryCost = clampNumber(accessoryCost);
    const safeDeliveryFee = clampNumber(deliveryFee);
    const safeAdditionalFees = clampNumber(additionalFees);
    const safeSalesTaxRate = clampNumber(salesTaxRate);

    const flooringCost =
      cartonsRequired * safeFlooringPricePerCarton;

    const underlaymentCost =
      underlaymentRolls * safeUnderlaymentPricePerRoll;

    const baseboardCost =
      baseboardPieces * safeBaseboardPricePerPiece;

    const materialSubtotal =
      flooringCost +
      underlaymentCost +
      baseboardCost +
      safeAccessoryCost;

    const estimatedTax =
      materialSubtotal * (safeSalesTaxRate / 100);

    const estimatedMaterialTotal =
      materialSubtotal +
      estimatedTax +
      safeDeliveryFee +
      safeAdditionalFees;

    const costPerNetSquareFoot =
      netFloorArea > 0
        ? estimatedMaterialTotal / netFloorArea
        : 0;

    const flooringCostPerPurchasedSquareFoot =
      purchasedCoverage > 0
        ? flooringCost / purchasedCoverage
        : 0;

    const notes: string[] = [];

    if (netFloorArea === 0) {
      notes.push(
        "Enter a net flooring area greater than zero.",
      );
    }

    if (safeWastePercent < 5) {
      notes.push(
        "The flooring waste allowance is low. Cuts, pattern matching, damaged pieces, room shape, and future repairs may require additional material.",
      );
    }

    if (plankArea === 0) {
      notes.push(
        "Enter valid flooring-piece dimensions to calculate estimated pieces.",
      );
    }

    if (safeCartonCoverage === 0) {
      notes.push(
        "Enter the exact coverage printed on one flooring carton.",
      );
    }

    if (
      includeUnderlayment &&
      safeUnderlaymentCoverage === 0
    ) {
      notes.push(
        "Enter underlayment coverage or turn off underlayment.",
      );
    }

    if (
      baseboardPurchaseLength > 0 &&
      safeBaseboardPieceLength === 0
    ) {
      notes.push(
        "Enter a baseboard piece length greater than zero.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "Verify carton coverage, dye lot or production batch, waste, installation direction, manufacturer requirements, and current supplier pricing before ordering.",
      );
    }

    return {
      safeWastePercent,
      safeBaseboardWastePercent,
      grossRoomArea,
      applicableDeduction,
      netFloorArea,
      flooringWasteArea,
      purchaseFloorArea,
      plankArea,
      piecesNeeded,
      cartonsRequired,
      purchasedCoverage,
      wholeCartonOverage,
      estimatedPurchasedPieces,
      underlaymentRolls,
      purchasedUnderlaymentCoverage,
      grossBaseboardLength,
      netBaseboardLength,
      baseboardPurchaseLength,
      baseboardPieces,
      purchasedBaseboardLength,
      flooringCost,
      underlaymentCost,
      baseboardCost,
      safeAccessoryCost,
      materialSubtotal,
      estimatedTax,
      safeDeliveryFee,
      safeAdditionalFees,
      estimatedMaterialTotal,
      costPerNetSquareFoot,
      flooringCostPerPurchasedSquareFoot,
      safeSalesTaxRate,
      safeCartonCoverage,
      safeUnderlaymentCoverage,
      safeBaseboardPieceLength,
      notes,
    };
  }, [
    calculationMode,
    roomLength,
    roomWidth,
    numberOfRooms,
    additionalArea,
    deductionArea,
    knownFloorArea,
    wastePercent,
    plankLength,
    plankWidth,
    cartonCoverage,
    underlaymentCoverage,
    includeUnderlayment,
    baseboardOpeningDeduction,
    knownBaseboardLength,
    baseboardPieceLength,
    baseboardWastePercent,
    flooringPricePerCarton,
    underlaymentPricePerRoll,
    baseboardPricePerPiece,
    accessoryCost,
    deliveryFee,
    additionalFees,
    salesTaxRate,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Flooring Calculator",
      `Calculation mode: ${
        calculationMode === "room"
          ? "Room dimensions"
          : "Known floor area"
      }`,
      `Flooring type: ${flooringType}`,
      `Gross floor area: ${formatNumber(result.grossRoomArea)} sq ft`,
      `Area deduction: ${formatNumber(result.applicableDeduction)} sq ft`,
      `Net floor area: ${formatNumber(result.netFloorArea)} sq ft`,
      `Waste allowance: ${formatNumber(result.safeWastePercent)}%`,
      `Purchase floor area: ${formatNumber(result.purchaseFloorArea)} sq ft`,
      `Flooring cartons: ${formatCount(result.cartonsRequired, "carton")}`,
      `Purchased coverage: ${formatNumber(result.purchasedCoverage)} sq ft`,
      `Whole-carton overage: ${formatNumber(result.wholeCartonOverage)} sq ft`,
      `Estimated flooring pieces: ${formatCount(result.estimatedPurchasedPieces, "piece")}`,
      `Underlayment rolls: ${formatCount(result.underlaymentRolls, "roll")}`,
      `Baseboard pieces: ${formatCount(result.baseboardPieces, "piece")}`,
      `Material subtotal: ${formatCurrency(result.materialSubtotal)}`,
      `Estimated tax: ${formatCurrency(result.estimatedTax)}`,
      `Delivery fee: ${formatCurrency(result.safeDeliveryFee)}`,
      `Additional fees: ${formatCurrency(result.safeAdditionalFees)}`,
      `Estimated material total: ${formatCurrency(result.estimatedMaterialTotal)}`,
      `Cost per net square foot: ${formatCurrency(result.costPerNetSquareFoot)}`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
          Inputs
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Flooring project details
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Enter the floor area, flooring dimensions, carton
          coverage, waste, accessories, and supplier pricing.
        </p>

        <div className="mt-6">
          <SelectInput
            label="Calculation mode"
            value={calculationMode}
            onChange={(value) =>
              setCalculationMode(value as CalculationMode)
            }
            options={[
              {
                value: "room",
                label: "Room dimensions",
              },
              {
                value: "known-area",
                label: "Known floor area",
              },
            ]}
          />
        </div>

        <div className="mt-4">
          <SelectInput
            label="Flooring type"
            value={flooringType}
            onChange={setFlooringType}
            options={flooringOptions.map((option) => ({
              value: option,
              label: option,
            }))}
          />
        </div>

        {calculationMode === "room" ? (
          <InputSection title="Room dimensions">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Room length"
                value={roomLength}
                onChange={setRoomLength}
                suffix="ft"
              />
              <NumberInput
                label="Room width"
                value={roomWidth}
                onChange={setRoomWidth}
                suffix="ft"
              />
              <NumberInput
                label="Identical rooms"
                value={numberOfRooms}
                onChange={setNumberOfRooms}
                suffix="rooms"
                integer
              />
              <NumberInput
                label="Additional area"
                value={additionalArea}
                onChange={setAdditionalArea}
                suffix="sq ft"
              />
              <NumberInput
                label="Permanent-area deduction"
                value={deductionArea}
                onChange={setDeductionArea}
                suffix="sq ft"
              />
            </div>
          </InputSection>
        ) : (
          <InputSection title="Known flooring area">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Known floor area"
                value={knownFloorArea}
                onChange={setKnownFloorArea}
                suffix="sq ft"
              />
              <NumberInput
                label="Permanent-area deduction"
                value={deductionArea}
                onChange={setDeductionArea}
                suffix="sq ft"
              />
              <NumberInput
                label="Known baseboard length"
                value={knownBaseboardLength}
                onChange={setKnownBaseboardLength}
                suffix="lin ft"
              />
            </div>
          </InputSection>
        )}

        <InputSection title="Flooring product and waste">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Waste allowance"
              value={wastePercent}
              onChange={setWastePercent}
              suffix="%"
            />
            <NumberInput
              label="Coverage per carton"
              value={cartonCoverage}
              onChange={setCartonCoverage}
              suffix="sq ft"
            />
            <NumberInput
              label="Plank or piece length"
              value={plankLength}
              onChange={setPlankLength}
              suffix="in"
            />
            <NumberInput
              label="Plank or piece width"
              value={plankWidth}
              onChange={setPlankWidth}
              suffix="in"
            />
          </div>
        </InputSection>

        <InputSection title="Underlayment">
          <label className="flex items-center gap-3 text-sm text-[#A0AEC0]">
            <input
              type="checkbox"
              checked={includeUnderlayment}
              onChange={(event) =>
                setIncludeUnderlayment(event.target.checked)
              }
              className="h-4 w-4 accent-orange-500"
            />
            Include underlayment
          </label>

          {includeUnderlayment ? (
            <div className="mt-4">
              <NumberInput
                label="Coverage per underlayment roll"
                value={underlaymentCoverage}
                onChange={setUnderlaymentCoverage}
                suffix="sq ft"
              />
            </div>
          ) : null}
        </InputSection>

        <InputSection title="Baseboard">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Door and opening deduction"
              value={baseboardOpeningDeduction}
              onChange={setBaseboardOpeningDeduction}
              suffix="lin ft"
            />
            <NumberInput
              label="Baseboard waste"
              value={baseboardWastePercent}
              onChange={setBaseboardWastePercent}
              suffix="%"
            />
            <NumberInput
              label="Length per baseboard piece"
              value={baseboardPieceLength}
              onChange={setBaseboardPieceLength}
              suffix="ft"
            />
          </div>
        </InputSection>

        <InputSection title="Supplier pricing">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Price per flooring carton"
              value={flooringPricePerCarton}
              onChange={setFlooringPricePerCarton}
              prefix="$"
            />
            <NumberInput
              label="Price per underlayment roll"
              value={underlaymentPricePerRoll}
              onChange={setUnderlaymentPricePerRoll}
              prefix="$"
            />
            <NumberInput
              label="Price per baseboard piece"
              value={baseboardPricePerPiece}
              onChange={setBaseboardPricePerPiece}
              prefix="$"
            />
            <NumberInput
              label="Transitions and accessories"
              value={accessoryCost}
              onChange={setAccessoryCost}
              prefix="$"
            />
            <NumberInput
              label="Delivery fee"
              value={deliveryFee}
              onChange={setDeliveryFee}
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

        <div className="mt-6 rounded-2xl border border-orange-500/50 bg-orange-500/10 p-5">
          <h3 className="font-semibold text-orange-300">
            Product coverage matters
          </h3>
          <p className="mt-3 leading-7 text-[#A0AEC0]">
            Use the coverage printed on the exact flooring carton.
            Plank dimensions are used for an estimated piece count,
            while purchasing is rounded using carton coverage.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
          Results
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Flooring material estimate
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review whole-carton flooring quantities, coverage,
          underlayment, baseboard, overage, and material cost.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Flooring cartons"
            value={formatCount(
              result.cartonsRequired,
              "carton",
            )}
            featured
          />
          <ResultCard
            label="Net floor area"
            value={`${formatNumber(result.netFloorArea)} sq ft`}
          />
          <ResultCard
            label="Purchased coverage"
            value={`${formatNumber(result.purchasedCoverage)} sq ft`}
          />
          <ResultCard
            label="Estimated material total"
            value={formatCurrency(
              result.estimatedMaterialTotal,
            )}
          />
          <ResultCard
            label="Underlayment"
            value={formatCount(
              result.underlaymentRolls,
              "roll",
            )}
          />
          <ResultCard
            label="Baseboard"
            value={formatCount(
              result.baseboardPieces,
              "piece",
            )}
          />
        </div>

        <ResultSection title="Floor area">
          <ResultRow
            label="Calculation mode"
            value={
              calculationMode === "room"
                ? "Room dimensions"
                : "Known floor area"
            }
          />
          <ResultRow
            label="Flooring type"
            value={flooringType}
          />
          <ResultRow
            label="Gross floor area"
            value={`${formatNumber(result.grossRoomArea)} sq ft`}
          />
          <ResultRow
            label="Area deduction"
            value={`${formatNumber(result.applicableDeduction)} sq ft`}
          />
          <ResultRow
            label="Net floor area"
            value={`${formatNumber(result.netFloorArea)} sq ft`}
          />
          <ResultRow
            label="Waste allowance"
            value={`${formatNumber(result.safeWastePercent)}%`}
          />
          <ResultRow
            label="Waste area"
            value={`${formatNumber(result.flooringWasteArea)} sq ft`}
          />
          <ResultRow
            label="Purchase floor area"
            value={`${formatNumber(result.purchaseFloorArea)} sq ft`}
          />
        </ResultSection>

        <ResultSection title="Flooring order">
          <ResultRow
            label="Area per flooring piece"
            value={`${formatNumber(result.plankArea)} sq ft`}
          />
          <ResultRow
            label="Estimated pieces needed"
            value={formatCount(
              result.piecesNeeded,
              "piece",
            )}
          />
          <ResultRow
            label="Coverage per carton"
            value={`${formatNumber(result.safeCartonCoverage)} sq ft`}
          />
          <ResultRow
            label="Cartons to purchase"
            value={formatCount(
              result.cartonsRequired,
              "carton",
            )}
          />
          <ResultRow
            label="Purchased coverage"
            value={`${formatNumber(result.purchasedCoverage)} sq ft`}
          />
          <ResultRow
            label="Whole-carton overage"
            value={`${formatNumber(result.wholeCartonOverage)} sq ft`}
          />
          <ResultRow
            label="Estimated pieces purchased"
            value={formatCount(
              result.estimatedPurchasedPieces,
              "piece",
            )}
          />
        </ResultSection>

        <ResultSection title="Accessories">
          <ResultRow
            label="Underlayment rolls"
            value={formatCount(
              result.underlaymentRolls,
              "roll",
            )}
          />
          <ResultRow
            label="Purchased underlayment coverage"
            value={`${formatNumber(result.purchasedUnderlaymentCoverage)} sq ft`}
          />
          <ResultRow
            label="Gross baseboard length"
            value={`${formatNumber(result.grossBaseboardLength)} lin ft`}
          />
          <ResultRow
            label="Net baseboard length"
            value={`${formatNumber(result.netBaseboardLength)} lin ft`}
          />
          <ResultRow
            label="Baseboard purchase length"
            value={`${formatNumber(result.baseboardPurchaseLength)} lin ft`}
          />
          <ResultRow
            label="Baseboard pieces"
            value={formatCount(
              result.baseboardPieces,
              "piece",
            )}
          />
          <ResultRow
            label="Purchased baseboard length"
            value={`${formatNumber(result.purchasedBaseboardLength)} lin ft`}
          />
        </ResultSection>

        <ResultSection title="Cost breakdown">
          <ResultRow
            label="Flooring cost"
            value={formatCurrency(result.flooringCost)}
          />
          <ResultRow
            label="Underlayment cost"
            value={formatCurrency(result.underlaymentCost)}
          />
          <ResultRow
            label="Baseboard cost"
            value={formatCurrency(result.baseboardCost)}
          />
          <ResultRow
            label="Transitions and accessories"
            value={formatCurrency(result.safeAccessoryCost)}
          />
          <ResultRow
            label="Material subtotal"
            value={formatCurrency(result.materialSubtotal)}
          />
          <ResultRow
            label={`Estimated tax (${formatNumber(result.safeSalesTaxRate)}%)`}
            value={formatCurrency(result.estimatedTax)}
          />
          <ResultRow
            label="Delivery fee"
            value={formatCurrency(result.safeDeliveryFee)}
          />
          <ResultRow
            label="Additional fees"
            value={formatCurrency(result.safeAdditionalFees)}
          />
          <ResultRow
            label="Estimated material total"
            value={formatCurrency(
              result.estimatedMaterialTotal,
            )}
          />
          <ResultRow
            label="Cost per net square foot"
            value={formatCurrency(
              result.costPerNetSquareFoot,
            )}
          />
          <ResultRow
            label="Flooring cost per purchased square foot"
            value={formatCurrency(
              result.flooringCostPerPurchasedSquareFoot,
            )}
          />
        </ResultSection>

        <ResultSection title="Planning notes">
          <ul className="space-y-3 text-sm leading-7 text-[#A0AEC0]">
            {result.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </ResultSection>

        <button
          type="button"
          onClick={copyResults}
          className="mt-6 w-full rounded-2xl bg-[#F97316] px-5 py-4 font-semibold text-[#0B0F19] transition hover:bg-orange-400"
        >
          Copy results
        </button>
      </section>
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
    <section className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
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
  featured = false,
}: {
  label: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "rounded-2xl bg-[#F97316] p-5 text-[#0B0F19]"
          : "rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"
      }
    >
      <p
        className={
          featured
            ? "text-sm text-[#0B0F19]"
            : "text-sm text-[#A0AEC0]"
        }
      >
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
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
    <section className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
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
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}
