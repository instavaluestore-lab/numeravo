"use client";

import { useMemo, useState } from "react";

type CalculationMode = "room" | "known-area";
type SurfaceSelection = "walls" | "ceiling" | "both";
type SheetSize =
  | "4x8"
  | "4x10"
  | "4x12"
  | "54x12"
  | "custom";

const sheetSizeLabels: Record<SheetSize, string> = {
  "4x8": "4 ft × 8 ft",
  "4x10": "4 ft × 10 ft",
  "4x12": "4 ft × 12 ft",
  "54x12": "4.5 ft × 12 ft",
  custom: "Custom sheet size",
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

function formatCount(
  value: number,
  singular: string,
  plural = `${singular}s`,
) {
  const count = Math.floor(
    Number.isFinite(value) ? value : 0,
  );

  return `${formatNumber(count, 0)} ${
    count === 1 ? singular : plural
  }`;
}

export default function DrywallCalculatorClient() {
  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>("room");

  const [surfaceSelection, setSurfaceSelection] =
    useState<SurfaceSelection>("both");

  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(12);
  const [wallHeight, setWallHeight] = useState(8);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  const [doorCount, setDoorCount] = useState(1);
  const [doorWidth, setDoorWidth] = useState(3);
  const [doorHeight, setDoorHeight] = useState(7);

  const [windowCount, setWindowCount] = useState(2);
  const [windowWidth, setWindowWidth] = useState(3);
  const [windowHeight, setWindowHeight] = useState(4);

  const [knownArea, setKnownArea] = useState(500);
  const [wastePercent, setWastePercent] = useState(10);

  const [sheetSize, setSheetSize] =
    useState<SheetSize>("4x8");

  const [customSheetWidth, setCustomSheetWidth] =
    useState(4);
  const [customSheetLength, setCustomSheetLength] =
    useState(8);

  const [screwsPerSheet, setScrewsPerSheet] = useState(32);
  const [screwsPerBox, setScrewsPerBox] = useState(1000);

  const [tapePerHundredSqFt, setTapePerHundredSqFt] =
    useState(35);
  const [tapeRollLength, setTapeRollLength] =
    useState(250);

  const [compoundCoverage, setCompoundCoverage] =
    useState(500);

  const [cornerBeadLength, setCornerBeadLength] =
    useState(32);
  const [cornerBeadPieceLength, setCornerBeadPieceLength] =
    useState(8);

  const [sheetPrice, setSheetPrice] = useState(0);
  const [screwBoxPrice, setScrewBoxPrice] = useState(0);
  const [tapeRollPrice, setTapeRollPrice] = useState(0);
  const [compoundContainerPrice, setCompoundContainerPrice] =
    useState(0);
  const [cornerBeadPiecePrice, setCornerBeadPiecePrice] =
    useState(0);

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(0);

  const result = useMemo(() => {
    const safeRoomLength = safeNumber(roomLength);
    const safeRoomWidth = safeNumber(roomWidth);
    const safeWallHeight = safeNumber(wallHeight);

    const safeNumberOfRooms = Math.floor(
      safeNumber(numberOfRooms),
    );

    const safeDoorCount = Math.floor(
      safeNumber(doorCount),
    );
    const safeDoorWidth = safeNumber(doorWidth);
    const safeDoorHeight = safeNumber(doorHeight);

    const safeWindowCount = Math.floor(
      safeNumber(windowCount),
    );
    const safeWindowWidth = safeNumber(windowWidth);
    const safeWindowHeight = safeNumber(windowHeight);

    const safeKnownArea = safeNumber(knownArea);
    const safeWastePercent = safeNumber(wastePercent);

    const safeCustomSheetWidth = safeNumber(
      customSheetWidth,
    );
    const safeCustomSheetLength = safeNumber(
      customSheetLength,
    );

    const safeScrewsPerSheet = Math.floor(
      safeNumber(screwsPerSheet),
    );
    const safeScrewsPerBox = Math.floor(
      safeNumber(screwsPerBox),
    );

    const safeTapePerHundredSqFt = safeNumber(
      tapePerHundredSqFt,
    );
    const safeTapeRollLength = safeNumber(tapeRollLength);

    const safeCompoundCoverage = safeNumber(
      compoundCoverage,
    );

    const safeCornerBeadLength = safeNumber(
      cornerBeadLength,
    );
    const safeCornerBeadPieceLength = safeNumber(
      cornerBeadPieceLength,
    );

    const safeSheetPrice = safeNumber(sheetPrice);
    const safeScrewBoxPrice = safeNumber(screwBoxPrice);
    const safeTapeRollPrice = safeNumber(tapeRollPrice);
    const safeCompoundContainerPrice = safeNumber(
      compoundContainerPrice,
    );
    const safeCornerBeadPiecePrice = safeNumber(
      cornerBeadPiecePrice,
    );

    const safeDeliveryFee = safeNumber(deliveryFee);
    const safeAdditionalFees = safeNumber(additionalFees);
    const safeSalesTaxRate = safeNumber(salesTaxRate);

    const grossWallArea =
      2 *
      (safeRoomLength + safeRoomWidth) *
      safeWallHeight *
      safeNumberOfRooms;

    const grossCeilingArea =
      safeRoomLength *
      safeRoomWidth *
      safeNumberOfRooms;

    const doorArea =
      safeDoorCount * safeDoorWidth * safeDoorHeight;

    const windowArea =
      safeWindowCount *
      safeWindowWidth *
      safeWindowHeight;

    const openingArea =
      doorArea + windowArea;

    const selectedGrossArea =
      surfaceSelection === "walls"
        ? grossWallArea
        : surfaceSelection === "ceiling"
          ? grossCeilingArea
          : grossWallArea + grossCeilingArea;

    const applicableOpeningArea =
      surfaceSelection === "ceiling" ? 0 : openingArea;

    const calculatedNetArea = Math.max(
      selectedGrossArea - applicableOpeningArea,
      0,
    );

    const netDrywallArea =
      calculationMode === "known-area"
        ? safeKnownArea
        : calculatedNetArea;

    const wasteArea =
      netDrywallArea * (safeWastePercent / 100);

    const purchaseDrywallArea =
      netDrywallArea + wasteArea;

    const sheetDimensions: Record<
      Exclude<SheetSize, "custom">,
      { width: number; length: number }
    > = {
      "4x8": { width: 4, length: 8 },
      "4x10": { width: 4, length: 10 },
      "4x12": { width: 4, length: 12 },
      "54x12": { width: 4.5, length: 12 },
    };

    const selectedSheetWidth =
      sheetSize === "custom"
        ? safeCustomSheetWidth
        : sheetDimensions[sheetSize].width;

    const selectedSheetLength =
      sheetSize === "custom"
        ? safeCustomSheetLength
        : sheetDimensions[sheetSize].length;

    const sheetArea =
      selectedSheetWidth * selectedSheetLength;

    const sheetsRequired =
      sheetArea > 0
        ? Math.ceil(purchaseDrywallArea / sheetArea)
        : 0;

    const purchasedSheetCoverage =
      sheetsRequired * sheetArea;

    const sheetCoverageOverage = Math.max(
      purchasedSheetCoverage - purchaseDrywallArea,
      0,
    );

    const totalScrews =
      sheetsRequired * safeScrewsPerSheet;

    const screwBoxes =
      safeScrewsPerBox > 0
        ? Math.ceil(totalScrews / safeScrewsPerBox)
        : 0;

    const estimatedTapeLength =
      (purchaseDrywallArea / 100) *
      safeTapePerHundredSqFt;

    const tapeRolls =
      safeTapeRollLength > 0
        ? Math.ceil(
            estimatedTapeLength / safeTapeRollLength,
          )
        : 0;

    const compoundContainers =
      safeCompoundCoverage > 0
        ? Math.ceil(
            purchaseDrywallArea / safeCompoundCoverage,
          )
        : 0;

    const cornerBeadPieces =
      safeCornerBeadPieceLength > 0
        ? Math.ceil(
            safeCornerBeadLength /
              safeCornerBeadPieceLength,
          )
        : 0;

    const drywallSheetCost =
      sheetsRequired * safeSheetPrice;

    const screwCost =
      screwBoxes * safeScrewBoxPrice;

    const tapeCost =
      tapeRolls * safeTapeRollPrice;

    const compoundCost =
      compoundContainers *
      safeCompoundContainerPrice;

    const cornerBeadCost =
      cornerBeadPieces *
      safeCornerBeadPiecePrice;

    const materialSubtotal =
      drywallSheetCost +
      screwCost +
      tapeCost +
      compoundCost +
      cornerBeadCost;

    const estimatedTax =
      materialSubtotal * (safeSalesTaxRate / 100);

    const estimatedMaterialTotal =
      materialSubtotal +
      estimatedTax +
      safeDeliveryFee +
      safeAdditionalFees;

    const costPerSquareFoot =
      netDrywallArea > 0
        ? estimatedMaterialTotal / netDrywallArea
        : 0;

    const notes: string[] = [];

    if (
      calculationMode === "room" &&
      (
        safeRoomLength === 0 ||
        safeRoomWidth === 0 ||
        safeWallHeight === 0 ||
        safeNumberOfRooms === 0
      )
    ) {
      notes.push(
        "Enter room dimensions and a room count greater than zero.",
      );
    }

    if (
      calculationMode === "known-area" &&
      safeKnownArea === 0
    ) {
      notes.push(
        "Enter a known drywall surface area greater than zero.",
      );
    }

    if (
      applicableOpeningArea > selectedGrossArea &&
      calculationMode === "room"
    ) {
      notes.push(
        "The entered opening area exceeds the selected wall area. Verify door and window quantities and dimensions.",
      );
    }

    if (safeWastePercent < 5) {
      notes.push(
        "The waste allowance is low. Cuts, damaged panels, layout changes, offcuts, and repairs can require additional drywall.",
      );
    }

    if (sheetArea === 0) {
      notes.push(
        "Enter valid drywall sheet dimensions to calculate the sheet quantity.",
      );
    }

    if (
      safeScrewsPerBox === 0 ||
      safeTapeRollLength === 0 ||
      safeCompoundCoverage === 0 ||
      safeCornerBeadPieceLength === 0
    ) {
      notes.push(
        "One or more package coverage values are zero. Enter the applicable product coverage to complete the shopping list.",
      );
    }

    if (
      safeSheetPrice === 0 ||
      safeCompoundContainerPrice === 0
    ) {
      notes.push(
        "Enter current supplier pricing to calculate a complete drywall material estimate.",
      );
    }

    if (safeSalesTaxRate > 0) {
      notes.push(
        "Sales tax is applied to the calculated material subtotal. Verify local taxability and the applicable rate.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "This shopping list uses whole-package rounding and editable installation and product-coverage assumptions.",
      );
    }

    return {
      safeRoomLength,
      safeRoomWidth,
      safeWallHeight,
      safeNumberOfRooms,
      safeDoorCount,
      safeDoorWidth,
      safeDoorHeight,
      safeWindowCount,
      safeWindowWidth,
      safeWindowHeight,
      safeKnownArea,
      safeWastePercent,
      safeCustomSheetWidth,
      safeCustomSheetLength,
      safeScrewsPerSheet,
      safeScrewsPerBox,
      safeTapePerHundredSqFt,
      safeTapeRollLength,
      safeCompoundCoverage,
      safeCornerBeadLength,
      safeCornerBeadPieceLength,
      safeSheetPrice,
      safeScrewBoxPrice,
      safeTapeRollPrice,
      safeCompoundContainerPrice,
      safeCornerBeadPiecePrice,
      safeDeliveryFee,
      safeAdditionalFees,
      safeSalesTaxRate,
      grossWallArea,
      grossCeilingArea,
      doorArea,
      windowArea,
      openingArea,
      selectedGrossArea,
      applicableOpeningArea,
      calculatedNetArea,
      netDrywallArea,
      wasteArea,
      purchaseDrywallArea,
      selectedSheetWidth,
      selectedSheetLength,
      sheetArea,
      sheetsRequired,
      purchasedSheetCoverage,
      sheetCoverageOverage,
      totalScrews,
      screwBoxes,
      estimatedTapeLength,
      tapeRolls,
      compoundContainers,
      cornerBeadPieces,
      drywallSheetCost,
      screwCost,
      tapeCost,
      compoundCost,
      cornerBeadCost,
      materialSubtotal,
      estimatedTax,
      estimatedMaterialTotal,
      costPerSquareFoot,
      notes,
    };
  }, [
    calculationMode,
    surfaceSelection,
    roomLength,
    roomWidth,
    wallHeight,
    numberOfRooms,
    doorCount,
    doorWidth,
    doorHeight,
    windowCount,
    windowWidth,
    windowHeight,
    knownArea,
    wastePercent,
    sheetSize,
    customSheetWidth,
    customSheetLength,
    screwsPerSheet,
    screwsPerBox,
    tapePerHundredSqFt,
    tapeRollLength,
    compoundCoverage,
    cornerBeadLength,
    cornerBeadPieceLength,
    sheetPrice,
    screwBoxPrice,
    tapeRollPrice,
    compoundContainerPrice,
    cornerBeadPiecePrice,
    deliveryFee,
    additionalFees,
    salesTaxRate,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Drywall Calculator",
      `Calculation mode: ${
        calculationMode === "room"
          ? "Room dimensions"
          : "Known drywall area"
      }`,
      ...(calculationMode === "room"
        ? [
            `Surfaces: ${surfaceSelection}`,
            `Gross wall area: ${formatNumber(result.grossWallArea)} sq ft`,
            `Gross ceiling area: ${formatNumber(result.grossCeilingArea)} sq ft`,
            `Opening deduction: ${formatNumber(result.applicableOpeningArea)} sq ft`,
          ]
        : []),
      `Net drywall area: ${formatNumber(result.netDrywallArea)} sq ft`,
      `Waste allowance: ${formatNumber(result.safeWastePercent)}%`,
      `Purchase drywall area: ${formatNumber(result.purchaseDrywallArea)} sq ft`,
      `Sheet size: ${formatNumber(result.selectedSheetWidth)} ft × ${formatNumber(result.selectedSheetLength)} ft`,
      `Drywall sheets: ${formatNumber(result.sheetsRequired, 0)}`,
      `Drywall screws: ${formatNumber(result.totalScrews, 0)}`,
      `Screw boxes: ${formatNumber(result.screwBoxes, 0)}`,
      `Joint tape: ${formatNumber(result.estimatedTapeLength)} lin ft`,
      `Tape rolls: ${formatNumber(result.tapeRolls, 0)}`,
      `Joint compound containers: ${formatNumber(result.compoundContainers, 0)}`,
      `Corner-bead pieces: ${formatNumber(result.cornerBeadPieces, 0)}`,
      `Material subtotal: ${formatCurrency(result.materialSubtotal)}`,
      `Estimated tax: ${formatCurrency(result.estimatedTax)}`,
      `Delivery fee: ${formatCurrency(result.safeDeliveryFee)}`,
      `Additional fees: ${formatCurrency(result.safeAdditionalFees)}`,
      `Estimated material total: ${formatCurrency(result.estimatedMaterialTotal)}`,
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
          Drywall project details
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Calculate walls, ceilings, or both from room dimensions,
          or enter a known drywall area. Add openings, waste,
          panel size, product coverage, and supplier pricing.
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
                value: "room",
                label: "Room dimensions",
              },
              {
                value: "known-area",
                label: "Known drywall surface area",
              },
            ]}
          />
        </div>

        {calculationMode === "room" ? (
          <>
            <div className="mt-5">
              <SelectInput
                label="Surfaces to cover"
                value={surfaceSelection}
                onChange={(value) =>
                  setSurfaceSelection(
                    value as SurfaceSelection,
                  )
                }
                options={[
                  {
                    value: "walls",
                    label: "Walls only",
                  },
                  {
                    value: "ceiling",
                    label: "Ceiling only",
                  },
                  {
                    value: "both",
                    label: "Walls and ceiling",
                  },
                ]}
              />
            </div>

            <InputSection title="Room dimensions">
              <div className="grid gap-5 sm:grid-cols-2">
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
                  label="Wall height"
                  value={wallHeight}
                  onChange={setWallHeight}
                  suffix="ft"
                />

                <NumberInput
                  label="Number of identical rooms"
                  value={numberOfRooms}
                  onChange={setNumberOfRooms}
                  suffix="rooms"
                  integer
                />
              </div>
            </InputSection>

            {surfaceSelection !== "ceiling" ? (
              <InputSection title="Door and window deductions">
                <div className="grid gap-5 sm:grid-cols-3">
                  <NumberInput
                    label="Total doors"
                    value={doorCount}
                    onChange={setDoorCount}
                    suffix="doors"
                    integer
                  />

                  <NumberInput
                    label="Average door width"
                    value={doorWidth}
                    onChange={setDoorWidth}
                    suffix="ft"
                  />

                  <NumberInput
                    label="Average door height"
                    value={doorHeight}
                    onChange={setDoorHeight}
                    suffix="ft"
                  />

                  <NumberInput
                    label="Total windows"
                    value={windowCount}
                    onChange={setWindowCount}
                    suffix="windows"
                    integer
                  />

                  <NumberInput
                    label="Average window width"
                    value={windowWidth}
                    onChange={setWindowWidth}
                    suffix="ft"
                  />

                  <NumberInput
                    label="Average window height"
                    value={windowHeight}
                    onChange={setWindowHeight}
                    suffix="ft"
                  />
                </div>
              </InputSection>
            ) : null}
          </>
        ) : (
          <InputSection title="Known drywall area">
            <NumberInput
              label="Net drywall surface area"
              value={knownArea}
              onChange={setKnownArea}
              suffix="sq ft"
            />
          </InputSection>
        )}

        <InputSection title="Panel size and waste">
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectInput
              label="Drywall sheet size"
              value={sheetSize}
              onChange={(value) =>
                setSheetSize(value as SheetSize)
              }
              options={[
                {
                  value: "4x8",
                  label: "4 ft × 8 ft",
                },
                {
                  value: "4x10",
                  label: "4 ft × 10 ft",
                },
                {
                  value: "4x12",
                  label: "4 ft × 12 ft",
                },
                {
                  value: "54x12",
                  label: "4.5 ft × 12 ft",
                },
                {
                  value: "custom",
                  label: "Custom sheet size",
                },
              ]}
            />

            <NumberInput
              label="Waste allowance"
              value={wastePercent}
              onChange={setWastePercent}
              suffix="%"
            />
          </div>

          {sheetSize === "custom" ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <NumberInput
                label="Custom sheet width"
                value={customSheetWidth}
                onChange={setCustomSheetWidth}
                suffix="ft"
              />

              <NumberInput
                label="Custom sheet length"
                value={customSheetLength}
                onChange={setCustomSheetLength}
                suffix="ft"
              />
            </div>
          ) : null}
        </InputSection>

        <InputSection title="Drywall screws">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Screws per sheet"
              value={screwsPerSheet}
              onChange={setScrewsPerSheet}
              suffix="screws"
              integer
            />

            <NumberInput
              label="Screws per box"
              value={screwsPerBox}
              onChange={setScrewsPerBox}
              suffix="screws"
              integer
            />
          </div>
        </InputSection>

        <InputSection title="Joint tape and compound">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Tape per 100 square feet"
              value={tapePerHundredSqFt}
              onChange={setTapePerHundredSqFt}
              suffix="lin ft"
            />

            <NumberInput
              label="Tape length per roll"
              value={tapeRollLength}
              onChange={setTapeRollLength}
              suffix="lin ft"
            />

            <NumberInput
              label="Compound coverage per container"
              value={compoundCoverage}
              onChange={setCompoundCoverage}
              suffix="sq ft"
            />
          </div>
        </InputSection>

        <InputSection title="Corner bead">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Total outside-corner length"
              value={cornerBeadLength}
              onChange={setCornerBeadLength}
              suffix="lin ft"
            />

            <NumberInput
              label="Corner-bead piece length"
              value={cornerBeadPieceLength}
              onChange={setCornerBeadPieceLength}
              suffix="ft"
            />
          </div>
        </InputSection>

        <InputSection title="Supplier pricing">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Price per drywall sheet"
              value={sheetPrice}
              onChange={setSheetPrice}
              prefix="$"
              suffix="/sheet"
            />

            <NumberInput
              label="Price per screw box"
              value={screwBoxPrice}
              onChange={setScrewBoxPrice}
              prefix="$"
              suffix="/box"
            />

            <NumberInput
              label="Price per tape roll"
              value={tapeRollPrice}
              onChange={setTapeRollPrice}
              prefix="$"
              suffix="/roll"
            />

            <NumberInput
              label="Price per compound container"
              value={compoundContainerPrice}
              onChange={setCompoundContainerPrice}
              prefix="$"
              suffix="/container"
            />

            <NumberInput
              label="Price per corner-bead piece"
              value={cornerBeadPiecePrice}
              onChange={setCornerBeadPiecePrice}
              prefix="$"
              suffix="/piece"
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

        <div className="mt-7 rounded-2xl border border-orange-500/40 bg-orange-500/10 p-5">
          <h3 className="font-semibold text-orange-300">
            Verify the installation system
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
            Drywall thickness, fire or moisture rating, framing
            spacing, orientation, fastening schedule, joint layout,
            finish level, compound type, and product coverage can
            change the final order.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
          Results
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          Drywall shopping list
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review calculated surface area, whole-sheet quantities,
          fasteners, finishing materials, and estimated cost.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Drywall sheets"
            value={formatCount(
              result.sheetsRequired,
              "sheet",
            )}
            highlight
          />

          <ResultCard
            label="Purchase drywall area"
            value={`${formatNumber(result.purchaseDrywallArea)} sq ft`}
          />

          <ResultCard
            label="Joint compound"
            value={formatCount(
              result.compoundContainers,
              "container",
            )}
          />

          <ResultCard
            label="Estimated material total"
            value={formatCurrency(
              result.estimatedMaterialTotal,
            )}
          />

          <ResultCard
            label="Joint tape"
            value={formatCount(
              result.tapeRolls,
              "roll",
            )}
          />

          <ResultCard
            label="Screw boxes"
            value={formatCount(
              result.screwBoxes,
              "box",
              "boxes",
            )}
          />
        </div>

        <ResultPanel title="Surface-area calculation">
          <ResultRow
            label="Calculation mode"
            value={
              calculationMode === "room"
                ? "Room dimensions"
                : "Known drywall area"
            }
          />

          {calculationMode === "room" ? (
            <>
              <ResultRow
                label="Selected surfaces"
                value={
                  surfaceSelection === "walls"
                    ? "Walls only"
                    : surfaceSelection === "ceiling"
                      ? "Ceiling only"
                      : "Walls and ceiling"
                }
              />

              <ResultRow
                label="Gross wall area"
                value={`${formatNumber(result.grossWallArea)} sq ft`}
              />

              <ResultRow
                label="Gross ceiling area"
                value={`${formatNumber(result.grossCeilingArea)} sq ft`}
              />

              <ResultRow
                label="Opening deduction"
                value={`${formatNumber(result.applicableOpeningArea)} sq ft`}
              />
            </>
          ) : null}

          <ResultRow
            label="Net drywall area"
            value={`${formatNumber(result.netDrywallArea)} sq ft`}
          />

          <ResultRow
            label="Waste allowance"
            value={`${formatNumber(result.safeWastePercent)}%`}
          />

          <ResultRow
            label="Waste area"
            value={`${formatNumber(result.wasteArea)} sq ft`}
          />

          <ResultRow
            label="Purchase drywall area"
            value={`${formatNumber(result.purchaseDrywallArea)} sq ft`}
          />
        </ResultPanel>

        <ResultPanel title="Drywall sheets">
          <ResultRow
            label="Selected sheet size"
            value={`${formatNumber(result.selectedSheetWidth)} ft × ${formatNumber(result.selectedSheetLength)} ft`}
          />

          <ResultRow
            label="Coverage per sheet"
            value={`${formatNumber(result.sheetArea)} sq ft`}
          />

          <ResultRow
            label="Sheets to purchase"
            value={formatCount(
              result.sheetsRequired,
              "sheet",
            )}
          />

          <ResultRow
            label="Purchased sheet coverage"
            value={`${formatNumber(result.purchasedSheetCoverage)} sq ft`}
          />

          <ResultRow
            label="Whole-sheet overage"
            value={`${formatNumber(result.sheetCoverageOverage)} sq ft`}
          />
        </ResultPanel>

        <ResultPanel title="Fasteners and finishing materials">
          <ResultRow
            label="Estimated drywall screws"
            value={formatCount(
              result.totalScrews,
              "screw",
            )}
          />

          <ResultRow
            label="Screw boxes"
            value={formatCount(
              result.screwBoxes,
              "box",
              "boxes",
            )}
          />

          <ResultRow
            label="Estimated joint tape"
            value={`${formatNumber(result.estimatedTapeLength)} lin ft`}
          />

          <ResultRow
            label="Joint-tape rolls"
            value={formatCount(
              result.tapeRolls,
              "roll",
            )}
          />

          <ResultRow
            label="Joint-compound containers"
            value={formatCount(
              result.compoundContainers,
              "container",
            )}
          />

          <ResultRow
            label="Corner-bead pieces"
            value={formatCount(
              result.cornerBeadPieces,
              "piece",
              "pieces",
            )}
          />
        </ResultPanel>

        <ResultPanel title="Material cost">
          <ResultRow
            label="Drywall sheet cost"
            value={formatCurrency(result.drywallSheetCost)}
          />

          <ResultRow
            label="Drywall screw cost"
            value={formatCurrency(result.screwCost)}
          />

          <ResultRow
            label="Joint-tape cost"
            value={formatCurrency(result.tapeCost)}
          />

          <ResultRow
            label="Joint-compound cost"
            value={formatCurrency(result.compoundCost)}
          />

          <ResultRow
            label="Corner-bead cost"
            value={formatCurrency(result.cornerBeadCost)}
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
            label="Material cost per net square foot"
            value={formatCurrency(result.costPerSquareFoot)}
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
