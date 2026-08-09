"use client";

import { useMemo, useState } from "react";

type CalculationMode = "dimensions" | "known-area";

const surfaceOptions = [
  "Floor",
  "Wall",
  "Backsplash",
  "Shower walls",
  "Shower floor",
  "Countertop",
  "Other tile surface",
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

export default function TileCalculatorClient() {
  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>("dimensions");
  const [surfaceType, setSurfaceType] = useState("Floor");

  const [surfaceLength, setSurfaceLength] = useState(12);
  const [surfaceWidth, setSurfaceWidth] = useState(10);
  const [numberOfSurfaces, setNumberOfSurfaces] = useState(1);
  const [additionalArea, setAdditionalArea] = useState(0);
  const [deductionArea, setDeductionArea] = useState(0);
  const [knownTileArea, setKnownTileArea] = useState(120);

  const [wastePercent, setWastePercent] = useState(10);
  const [tileLength, setTileLength] = useState(24);
  const [tileWidth, setTileWidth] = useState(12);
  const [groutJointWidth, setGroutJointWidth] = useState(0.125);
  const [boxCoverage, setBoxCoverage] = useState(15.5);

  const [includeThinset, setIncludeThinset] = useState(true);
  const [thinsetCoverage, setThinsetCoverage] = useState(50);
  const [includeGrout, setIncludeGrout] = useState(true);
  const [groutCoverage, setGroutCoverage] = useState(100);

  const [includeBackerBoard, setIncludeBackerBoard] =
    useState(true);
  const [backerBoardCoverage, setBackerBoardCoverage] =
    useState(15);

  const [edgeTrimLength, setEdgeTrimLength] = useState(20);
  const [edgeTrimPieceLength, setEdgeTrimPieceLength] =
    useState(8);

  const [tilePricePerBox, setTilePricePerBox] = useState(45);
  const [thinsetPricePerBag, setThinsetPricePerBag] =
    useState(25);
  const [groutPricePerBag, setGroutPricePerBag] = useState(22);
  const [backerBoardPricePerSheet, setBackerBoardPricePerSheet] =
    useState(15);
  const [edgeTrimPricePerPiece, setEdgeTrimPricePerPiece] =
    useState(12);
  const [accessoryCost, setAccessoryCost] = useState(25);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(0);

  const result = useMemo(() => {
    const safeSurfaceLength = clampNumber(surfaceLength);
    const safeSurfaceWidth = clampNumber(surfaceWidth);
    const safeNumberOfSurfaces = Math.floor(
      clampNumber(numberOfSurfaces),
    );
    const safeAdditionalArea = clampNumber(additionalArea);
    const safeDeductionArea = clampNumber(deductionArea);
    const safeKnownTileArea = clampNumber(knownTileArea);

    const safeWastePercent = clampNumber(wastePercent);
    const safeWasteMultiplier = 1 + safeWastePercent / 100;

    const safeTileLength = clampNumber(tileLength);
    const safeTileWidth = clampNumber(tileWidth);
    const safeGroutJointWidth = clampNumber(groutJointWidth);
    const safeBoxCoverage = clampNumber(boxCoverage);

    const safeThinsetCoverage = clampNumber(thinsetCoverage);
    const safeGroutCoverage = clampNumber(groutCoverage);
    const safeBackerBoardCoverage =
      clampNumber(backerBoardCoverage);

    const safeEdgeTrimLength = clampNumber(edgeTrimLength);
    const safeEdgeTrimPieceLength =
      clampNumber(edgeTrimPieceLength);

    const grossTileArea =
      calculationMode === "dimensions"
        ? safeSurfaceLength *
            safeSurfaceWidth *
            safeNumberOfSurfaces +
          safeAdditionalArea
        : safeKnownTileArea;

    const applicableDeduction = Math.min(
      safeDeductionArea,
      grossTileArea,
    );

    const netTileArea = Math.max(
      grossTileArea - applicableDeduction,
      0,
    );

    const wasteArea =
      netTileArea * (safeWastePercent / 100);

    const purchaseTileArea =
      netTileArea * safeWasteMultiplier;

    const tileFaceArea =
      (safeTileLength * safeTileWidth) / 144;

    const tileModuleArea =
      ((safeTileLength + safeGroutJointWidth) *
        (safeTileWidth + safeGroutJointWidth)) /
      144;

    const tilesNeeded =
      tileFaceArea > 0
        ? Math.ceil(purchaseTileArea / tileFaceArea)
        : 0;

    const boxesRequired =
      safeBoxCoverage > 0
        ? Math.ceil(purchaseTileArea / safeBoxCoverage)
        : 0;

    const purchasedTileCoverage =
      boxesRequired * safeBoxCoverage;

    const wholeBoxOverage = Math.max(
      purchasedTileCoverage - purchaseTileArea,
      0,
    );

    const estimatedTilesPurchased =
      tileFaceArea > 0
        ? Math.ceil(purchasedTileCoverage / tileFaceArea)
        : 0;

    const thinsetBags =
      includeThinset &&
      safeThinsetCoverage > 0 &&
      purchaseTileArea > 0
        ? Math.ceil(purchaseTileArea / safeThinsetCoverage)
        : 0;

    const groutBags =
      includeGrout &&
      safeGroutCoverage > 0 &&
      purchaseTileArea > 0
        ? Math.ceil(purchaseTileArea / safeGroutCoverage)
        : 0;

    const backerBoardSheets =
      includeBackerBoard &&
      safeBackerBoardCoverage > 0 &&
      netTileArea > 0
        ? Math.ceil(netTileArea / safeBackerBoardCoverage)
        : 0;

    const purchasedBackerBoardCoverage =
      backerBoardSheets * safeBackerBoardCoverage;

    const edgeTrimPieces =
      safeEdgeTrimPieceLength > 0 &&
      safeEdgeTrimLength > 0
        ? Math.ceil(
            safeEdgeTrimLength / safeEdgeTrimPieceLength,
          )
        : 0;

    const purchasedEdgeTrimLength =
      edgeTrimPieces * safeEdgeTrimPieceLength;

    const safeTilePricePerBox =
      clampNumber(tilePricePerBox);
    const safeThinsetPricePerBag =
      clampNumber(thinsetPricePerBag);
    const safeGroutPricePerBag =
      clampNumber(groutPricePerBag);
    const safeBackerBoardPricePerSheet = clampNumber(
      backerBoardPricePerSheet,
    );
    const safeEdgeTrimPricePerPiece = clampNumber(
      edgeTrimPricePerPiece,
    );
    const safeAccessoryCost = clampNumber(accessoryCost);
    const safeDeliveryFee = clampNumber(deliveryFee);
    const safeAdditionalFees = clampNumber(additionalFees);
    const safeSalesTaxRate = clampNumber(salesTaxRate);

    const tileCost =
      boxesRequired * safeTilePricePerBox;

    const thinsetCost =
      thinsetBags * safeThinsetPricePerBag;

    const groutCost =
      groutBags * safeGroutPricePerBag;

    const backerBoardCost =
      backerBoardSheets * safeBackerBoardPricePerSheet;

    const edgeTrimCost =
      edgeTrimPieces * safeEdgeTrimPricePerPiece;

    const materialSubtotal =
      tileCost +
      thinsetCost +
      groutCost +
      backerBoardCost +
      edgeTrimCost +
      safeAccessoryCost;

    const estimatedTax =
      materialSubtotal * (safeSalesTaxRate / 100);

    const estimatedMaterialTotal =
      materialSubtotal +
      estimatedTax +
      safeDeliveryFee +
      safeAdditionalFees;

    const costPerNetSquareFoot =
      netTileArea > 0
        ? estimatedMaterialTotal / netTileArea
        : 0;

    const tileCostPerPurchasedSquareFoot =
      purchasedTileCoverage > 0
        ? tileCost / purchasedTileCoverage
        : 0;

    const notes: string[] = [];

    if (netTileArea === 0) {
      notes.push(
        "Enter a net tile area greater than zero.",
      );
    }

    if (safeWastePercent < 5) {
      notes.push(
        "The waste allowance is low. Cuts, breakage, pattern matching, tile variation, and future repairs may require additional tile.",
      );
    }

    if (tileFaceArea === 0) {
      notes.push(
        "Enter valid tile dimensions to calculate the estimated tile quantity.",
      );
    }

    if (safeBoxCoverage === 0) {
      notes.push(
        "Enter the exact square-foot coverage printed on one tile box.",
      );
    }

    if (
      includeThinset &&
      safeThinsetCoverage === 0
    ) {
      notes.push(
        "Enter thinset or adhesive coverage, or turn off thinset.",
      );
    }

    if (
      includeGrout &&
      safeGroutCoverage === 0
    ) {
      notes.push(
        "Enter grout coverage based on the tile and joint size, or turn off grout.",
      );
    }

    if (
      includeBackerBoard &&
      safeBackerBoardCoverage === 0
    ) {
      notes.push(
        "Enter backer-board sheet coverage, or turn off backer board.",
      );
    }

    if (
      safeEdgeTrimLength > 0 &&
      safeEdgeTrimPieceLength === 0
    ) {
      notes.push(
        "Enter an edge-trim piece length greater than zero.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "Verify tile box coverage, lot or shade information, waste, substrate preparation, mortar, grout, waterproofing, and manufacturer requirements before ordering.",
      );
    }

    return {
      safeWastePercent,
      safeGroutJointWidth,
      grossTileArea,
      applicableDeduction,
      netTileArea,
      wasteArea,
      purchaseTileArea,
      tileFaceArea,
      tileModuleArea,
      tilesNeeded,
      boxesRequired,
      safeBoxCoverage,
      purchasedTileCoverage,
      wholeBoxOverage,
      estimatedTilesPurchased,
      thinsetBags,
      safeThinsetCoverage,
      groutBags,
      safeGroutCoverage,
      backerBoardSheets,
      safeBackerBoardCoverage,
      purchasedBackerBoardCoverage,
      safeEdgeTrimLength,
      safeEdgeTrimPieceLength,
      edgeTrimPieces,
      purchasedEdgeTrimLength,
      tileCost,
      thinsetCost,
      groutCost,
      backerBoardCost,
      edgeTrimCost,
      safeAccessoryCost,
      materialSubtotal,
      estimatedTax,
      safeDeliveryFee,
      safeAdditionalFees,
      estimatedMaterialTotal,
      costPerNetSquareFoot,
      tileCostPerPurchasedSquareFoot,
      safeSalesTaxRate,
      notes,
    };
  }, [
    calculationMode,
    surfaceLength,
    surfaceWidth,
    numberOfSurfaces,
    additionalArea,
    deductionArea,
    knownTileArea,
    wastePercent,
    tileLength,
    tileWidth,
    groutJointWidth,
    boxCoverage,
    includeThinset,
    thinsetCoverage,
    includeGrout,
    groutCoverage,
    includeBackerBoard,
    backerBoardCoverage,
    edgeTrimLength,
    edgeTrimPieceLength,
    tilePricePerBox,
    thinsetPricePerBag,
    groutPricePerBag,
    backerBoardPricePerSheet,
    edgeTrimPricePerPiece,
    accessoryCost,
    deliveryFee,
    additionalFees,
    salesTaxRate,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Tile Calculator",
      `Calculation mode: ${
        calculationMode === "dimensions"
          ? "Surface dimensions"
          : "Known tile area"
      }`,
      `Surface type: ${surfaceType}`,
      `Gross tile area: ${formatNumber(result.grossTileArea)} sq ft`,
      `Area deduction: ${formatNumber(result.applicableDeduction)} sq ft`,
      `Net tile area: ${formatNumber(result.netTileArea)} sq ft`,
      `Waste allowance: ${formatNumber(result.safeWastePercent)}%`,
      `Purchase tile area: ${formatNumber(result.purchaseTileArea)} sq ft`,
      `Tiles needed: ${formatCount(result.tilesNeeded, "tile")}`,
      `Tile boxes: ${formatCount(result.boxesRequired, "box", "boxes")}`,
      `Purchased tile coverage: ${formatNumber(result.purchasedTileCoverage)} sq ft`,
      `Whole-box overage: ${formatNumber(result.wholeBoxOverage)} sq ft`,
      `Thinset or adhesive: ${formatCount(result.thinsetBags, "bag")}`,
      `Grout: ${formatCount(result.groutBags, "bag")}`,
      `Backer board: ${formatCount(result.backerBoardSheets, "sheet")}`,
      `Edge trim: ${formatCount(result.edgeTrimPieces, "piece")}`,
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
          Tile project details
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Enter the tile surface, product dimensions, box
          coverage, waste, setting materials, trim, and pricing.
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
                value: "dimensions",
                label: "Surface dimensions",
              },
              {
                value: "known-area",
                label: "Known tile area",
              },
            ]}
          />
        </div>

        <div className="mt-4">
          <SelectInput
            label="Tile surface"
            value={surfaceType}
            onChange={setSurfaceType}
            options={surfaceOptions.map((option) => ({
              value: option,
              label: option,
            }))}
          />
        </div>

        {calculationMode === "dimensions" ? (
          <InputSection title="Surface dimensions">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Surface length"
                value={surfaceLength}
                onChange={setSurfaceLength}
                suffix="ft"
              />
              <NumberInput
                label="Surface width or height"
                value={surfaceWidth}
                onChange={setSurfaceWidth}
                suffix="ft"
              />
              <NumberInput
                label="Identical surfaces"
                value={numberOfSurfaces}
                onChange={setNumberOfSurfaces}
                suffix="surfaces"
                integer
              />
              <NumberInput
                label="Additional tile area"
                value={additionalArea}
                onChange={setAdditionalArea}
                suffix="sq ft"
              />
              <NumberInput
                label="Opening or area deduction"
                value={deductionArea}
                onChange={setDeductionArea}
                suffix="sq ft"
              />
            </div>
          </InputSection>
        ) : (
          <InputSection title="Known tile area">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Known tile area"
                value={knownTileArea}
                onChange={setKnownTileArea}
                suffix="sq ft"
              />
              <NumberInput
                label="Opening or area deduction"
                value={deductionArea}
                onChange={setDeductionArea}
                suffix="sq ft"
              />
            </div>
          </InputSection>
        )}

        <InputSection title="Tile product and waste">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Waste allowance"
              value={wastePercent}
              onChange={setWastePercent}
              suffix="%"
            />
            <NumberInput
              label="Coverage per tile box"
              value={boxCoverage}
              onChange={setBoxCoverage}
              suffix="sq ft"
            />
            <NumberInput
              label="Tile length"
              value={tileLength}
              onChange={setTileLength}
              suffix="in"
            />
            <NumberInput
              label="Tile width"
              value={tileWidth}
              onChange={setTileWidth}
              suffix="in"
            />
            <NumberInput
              label="Grout-joint width"
              value={groutJointWidth}
              onChange={setGroutJointWidth}
              suffix="in"
            />
          </div>
        </InputSection>

        <InputSection title="Setting and grout materials">
          <div className="space-y-5">
            <ToggleInput
              label="Include thinset or adhesive"
              checked={includeThinset}
              onChange={setIncludeThinset}
            />
            {includeThinset ? (
              <NumberInput
                label="Thinset or adhesive coverage per bag"
                value={thinsetCoverage}
                onChange={setThinsetCoverage}
                suffix="sq ft"
              />
            ) : null}

            <ToggleInput
              label="Include grout"
              checked={includeGrout}
              onChange={setIncludeGrout}
            />
            {includeGrout ? (
              <NumberInput
                label="Grout coverage per bag"
                value={groutCoverage}
                onChange={setGroutCoverage}
                suffix="sq ft"
              />
            ) : null}
          </div>
        </InputSection>

        <InputSection title="Backer board and edge trim">
          <div className="space-y-5">
            <ToggleInput
              label="Include backer board"
              checked={includeBackerBoard}
              onChange={setIncludeBackerBoard}
            />
            {includeBackerBoard ? (
              <NumberInput
                label="Coverage per backer-board sheet"
                value={backerBoardCoverage}
                onChange={setBackerBoardCoverage}
                suffix="sq ft"
              />
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Edge-trim length"
                value={edgeTrimLength}
                onChange={setEdgeTrimLength}
                suffix="lin ft"
              />
              <NumberInput
                label="Length per trim piece"
                value={edgeTrimPieceLength}
                onChange={setEdgeTrimPieceLength}
                suffix="ft"
              />
            </div>
          </div>
        </InputSection>

        <InputSection title="Supplier pricing">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Price per tile box"
              value={tilePricePerBox}
              onChange={setTilePricePerBox}
              prefix="$"
            />
            <NumberInput
              label="Price per thinset bag"
              value={thinsetPricePerBag}
              onChange={setThinsetPricePerBag}
              prefix="$"
            />
            <NumberInput
              label="Price per grout bag"
              value={groutPricePerBag}
              onChange={setGroutPricePerBag}
              prefix="$"
            />
            <NumberInput
              label="Price per backer-board sheet"
              value={backerBoardPricePerSheet}
              onChange={setBackerBoardPricePerSheet}
              prefix="$"
            />
            <NumberInput
              label="Price per edge-trim piece"
              value={edgeTrimPricePerPiece}
              onChange={setEdgeTrimPricePerPiece}
              prefix="$"
            />
            <NumberInput
              label="Spacers and accessories"
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
            Coverage must match the product
          </h3>
          <p className="mt-3 leading-7 text-[#A0AEC0]">
            Use coverage from the exact tile box, mortar,
            adhesive, grout, and backer-board products. Grout
            coverage depends heavily on tile size, thickness,
            and joint width.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
          Results
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Tile material estimate
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review whole-box tile quantities, coverage, setting
          materials, backer board, trim, overage, and cost.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Tile boxes"
            value={formatCount(
              result.boxesRequired,
              "box",
              "boxes",
            )}
            featured
          />
          <ResultCard
            label="Net tile area"
            value={`${formatNumber(result.netTileArea)} sq ft`}
          />
          <ResultCard
            label="Purchased coverage"
            value={`${formatNumber(result.purchasedTileCoverage)} sq ft`}
          />
          <ResultCard
            label="Estimated material total"
            value={formatCurrency(
              result.estimatedMaterialTotal,
            )}
          />
          <ResultCard
            label="Thinset or adhesive"
            value={formatCount(result.thinsetBags, "bag")}
          />
          <ResultCard
            label="Grout"
            value={formatCount(result.groutBags, "bag")}
          />
        </div>

        <ResultSection title="Tile area">
          <ResultRow
            label="Calculation mode"
            value={
              calculationMode === "dimensions"
                ? "Surface dimensions"
                : "Known tile area"
            }
          />
          <ResultRow label="Surface type" value={surfaceType} />
          <ResultRow
            label="Gross tile area"
            value={`${formatNumber(result.grossTileArea)} sq ft`}
          />
          <ResultRow
            label="Area deduction"
            value={`${formatNumber(result.applicableDeduction)} sq ft`}
          />
          <ResultRow
            label="Net tile area"
            value={`${formatNumber(result.netTileArea)} sq ft`}
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
            label="Purchase tile area"
            value={`${formatNumber(result.purchaseTileArea)} sq ft`}
          />
        </ResultSection>

        <ResultSection title="Tile order">
          <ResultRow
            label="Tile face area"
            value={`${formatNumber(result.tileFaceArea)} sq ft`}
          />
          <ResultRow
            label="Tile module area with joint"
            value={`${formatNumber(result.tileModuleArea)} sq ft`}
          />
          <ResultRow
            label="Grout-joint width"
            value={`${formatNumber(result.safeGroutJointWidth, 3)} in`}
          />
          <ResultRow
            label="Estimated tiles needed"
            value={formatCount(result.tilesNeeded, "tile")}
          />
          <ResultRow
            label="Coverage per box"
            value={`${formatNumber(result.safeBoxCoverage)} sq ft`}
          />
          <ResultRow
            label="Boxes to purchase"
            value={formatCount(
              result.boxesRequired,
              "box",
              "boxes",
            )}
          />
          <ResultRow
            label="Purchased tile coverage"
            value={`${formatNumber(result.purchasedTileCoverage)} sq ft`}
          />
          <ResultRow
            label="Whole-box overage"
            value={`${formatNumber(result.wholeBoxOverage)} sq ft`}
          />
          <ResultRow
            label="Estimated tiles purchased"
            value={formatCount(
              result.estimatedTilesPurchased,
              "tile",
            )}
          />
        </ResultSection>

        <ResultSection title="Installation materials">
          <ResultRow
            label="Thinset or adhesive bags"
            value={formatCount(result.thinsetBags, "bag")}
          />
          <ResultRow
            label="Grout bags"
            value={formatCount(result.groutBags, "bag")}
          />
          <ResultRow
            label="Backer-board sheets"
            value={formatCount(
              result.backerBoardSheets,
              "sheet",
            )}
          />
          <ResultRow
            label="Purchased backer-board coverage"
            value={`${formatNumber(result.purchasedBackerBoardCoverage)} sq ft`}
          />
          <ResultRow
            label="Edge-trim length"
            value={`${formatNumber(result.safeEdgeTrimLength)} lin ft`}
          />
          <ResultRow
            label="Edge-trim pieces"
            value={formatCount(
              result.edgeTrimPieces,
              "piece",
            )}
          />
          <ResultRow
            label="Purchased edge-trim length"
            value={`${formatNumber(result.purchasedEdgeTrimLength)} lin ft`}
          />
        </ResultSection>

        <ResultSection title="Cost breakdown">
          <ResultRow
            label="Tile cost"
            value={formatCurrency(result.tileCost)}
          />
          <ResultRow
            label="Thinset or adhesive cost"
            value={formatCurrency(result.thinsetCost)}
          />
          <ResultRow
            label="Grout cost"
            value={formatCurrency(result.groutCost)}
          />
          <ResultRow
            label="Backer-board cost"
            value={formatCurrency(result.backerBoardCost)}
          />
          <ResultRow
            label="Edge-trim cost"
            value={formatCurrency(result.edgeTrimCost)}
          />
          <ResultRow
            label="Spacers and accessories"
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
            label="Tile cost per purchased square foot"
            value={formatCurrency(
              result.tileCostPerPurchasedSquareFoot,
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

function ToggleInput({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-[#A0AEC0]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-orange-500"
      />
      {label}
    </label>
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
