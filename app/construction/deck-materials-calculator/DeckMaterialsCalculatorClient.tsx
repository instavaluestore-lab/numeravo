"use client";

import { useMemo, useState } from "react";

type CalculationMode = "dimensions" | "known-area";
type DeckingDirection = "parallel-length" | "parallel-width";

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

export default function DeckMaterialsCalculatorClient() {
  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>("dimensions");

  const [deckLength, setDeckLength] = useState(16);
  const [deckWidth, setDeckWidth] = useState(12);
  const [knownDeckArea, setKnownDeckArea] = useState(192);
  const [knownAreaWidth, setKnownAreaWidth] = useState(12);
  const [deckHeight, setDeckHeight] = useState(3);

  const [deckingDirection, setDeckingDirection] =
    useState<DeckingDirection>("parallel-length");
  const [deckBoardWidth, setDeckBoardWidth] = useState(5.5);
  const [deckBoardGap, setDeckBoardGap] = useState(0.125);
  const [deckBoardStockLength, setDeckBoardStockLength] =
    useState(16);
  const [deckingWastePercent, setDeckingWastePercent] =
    useState(10);

  const [joistSpacing, setJoistSpacing] = useState(16);
  const [joistStockLength, setJoistStockLength] = useState(12);
  const [rimBoardStockLength, setRimBoardStockLength] =
    useState(12);

  const [beamLines, setBeamLines] = useState(1);
  const [beamPlies, setBeamPlies] = useState(2);
  const [beamStockLength, setBeamStockLength] = useState(16);
  const [maximumPostSpacing, setMaximumPostSpacing] =
    useState(6);

  const [includeLedger, setIncludeLedger] = useState(true);
  const [ledgerStockLength, setLedgerStockLength] =
    useState(16);

  const [concreteBagsPerFooting, setConcreteBagsPerFooting] =
    useState(3);
  const [fastenersPerSquareFoot, setFastenersPerSquareFoot] =
    useState(2.5);
  const [fastenersPerBox, setFastenersPerBox] = useState(90);

  const [railingLength, setRailingLength] = useState(28);
  const [maximumRailingPostSpacing, setMaximumRailingPostSpacing] =
    useState(6);
  const [maximumRailingSectionLength, setMaximumRailingSectionLength] =
    useState(6);

  const [includeStairs, setIncludeStairs] = useState(true);
  const [stairWidth, setStairWidth] = useState(3);
  const [maximumRiserHeight, setMaximumRiserHeight] =
    useState(7.5);
  const [maximumStringerSpacing, setMaximumStringerSpacing] =
    useState(16);

  const [deckBoardPrice, setDeckBoardPrice] = useState(30);
  const [joistPrice, setJoistPrice] = useState(18);
  const [rimBoardPrice, setRimBoardPrice] = useState(18);
  const [beamBoardPrice, setBeamBoardPrice] = useState(25);
  const [postPrice, setPostPrice] = useState(22);
  const [ledgerBoardPrice, setLedgerBoardPrice] = useState(25);
  const [concreteBagPrice, setConcreteBagPrice] = useState(8);
  const [fastenerBoxPrice, setFastenerBoxPrice] = useState(35);
  const [railingPricePerFoot, setRailingPricePerFoot] =
    useState(35);
  const [stairMaterialAllowance, setStairMaterialAllowance] =
    useState(250);
  const [hardwareAllowance, setHardwareAllowance] =
    useState(150);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(0);

  const result = useMemo(() => {
    const safeInputLength = clampNumber(deckLength);
    const safeInputWidth = clampNumber(deckWidth);
    const safeKnownDeckArea = clampNumber(knownDeckArea);
    const safeKnownAreaWidth = clampNumber(knownAreaWidth);
    const safeDeckHeight = clampNumber(deckHeight);

    const calculatedLength =
      calculationMode === "known-area"
        ? safeKnownAreaWidth > 0
          ? safeKnownDeckArea / safeKnownAreaWidth
          : 0
        : safeInputLength;

    const calculatedWidth =
      calculationMode === "known-area"
        ? safeKnownAreaWidth
        : safeInputWidth;

    const deckArea =
      calculatedLength * calculatedWidth;

    const deckPerimeter =
      2 * (calculatedLength + calculatedWidth);

    const safeDeckBoardWidth =
      clampNumber(deckBoardWidth);
    const safeDeckBoardGap =
      clampNumber(deckBoardGap);
    const safeDeckBoardStockLength =
      clampNumber(deckBoardStockLength);
    const safeDeckingWastePercent =
      clampNumber(deckingWastePercent);

    const boardRun =
      deckingDirection === "parallel-length"
        ? calculatedLength
        : calculatedWidth;

    const boardCoverageSpan =
      deckingDirection === "parallel-length"
        ? calculatedWidth
        : calculatedLength;

    const boardCourseWidth =
      (safeDeckBoardWidth + safeDeckBoardGap) / 12;

    const deckBoardCourses =
      boardCourseWidth > 0 && boardCoverageSpan > 0
        ? Math.ceil(boardCoverageSpan / boardCourseWidth)
        : 0;

    const boardSegmentsPerCourse =
      safeDeckBoardStockLength > 0 && boardRun > 0
        ? Math.ceil(boardRun / safeDeckBoardStockLength)
        : 0;

    const deckBoardsBeforeWaste =
      deckBoardCourses * boardSegmentsPerCourse;

    const deckBoardsToPurchase =
      deckBoardsBeforeWaste > 0
        ? Math.ceil(
            deckBoardsBeforeWaste *
              (1 + safeDeckingWastePercent / 100),
          )
        : 0;

    const deckingWasteBoards = Math.max(
      deckBoardsToPurchase - deckBoardsBeforeWaste,
      0,
    );

    const joistRun =
      deckingDirection === "parallel-length"
        ? calculatedWidth
        : calculatedLength;

    const joistLayoutSpan =
      deckingDirection === "parallel-length"
        ? calculatedLength
        : calculatedWidth;

    const safeJoistSpacing = clampNumber(joistSpacing);
    const safeJoistStockLength =
      clampNumber(joistStockLength);

    const joistCount =
      safeJoistSpacing > 0 && joistLayoutSpan > 0
        ? Math.ceil(
            (joistLayoutSpan * 12) / safeJoistSpacing,
          ) + 1
        : 0;

    const joistPiecesPerRun =
      safeJoistStockLength > 0 && joistRun > 0
        ? Math.ceil(joistRun / safeJoistStockLength)
        : 0;

    const joistPieces =
      joistCount * joistPiecesPerRun;

    const safeRimBoardStockLength =
      clampNumber(rimBoardStockLength);

    const rimBoardPieces =
      safeRimBoardStockLength > 0 && deckPerimeter > 0
        ? Math.ceil(
            deckPerimeter / safeRimBoardStockLength,
          )
        : 0;

    const safeBeamLines = Math.floor(
      clampNumber(beamLines),
    );
    const safeBeamPlies = Math.floor(
      clampNumber(beamPlies),
    );
    const safeBeamStockLength =
      clampNumber(beamStockLength);

    const beamLength = calculatedLength;

    const beamBoardsPerPly =
      safeBeamStockLength > 0 && beamLength > 0
        ? Math.ceil(beamLength / safeBeamStockLength)
        : 0;

    const beamBoards =
      safeBeamLines *
      safeBeamPlies *
      beamBoardsPerPly;

    const safeMaximumPostSpacing =
      clampNumber(maximumPostSpacing);

    const postsPerBeam =
      safeMaximumPostSpacing > 0 &&
      beamLength > 0 &&
      safeBeamLines > 0
        ? Math.ceil(
            beamLength / safeMaximumPostSpacing,
          ) + 1
        : 0;

    const supportPosts =
      postsPerBeam * safeBeamLines;

    const footings = supportPosts;

    const safeConcreteBagsPerFooting = Math.ceil(
      clampNumber(concreteBagsPerFooting),
    );

    const concreteBags =
      footings * safeConcreteBagsPerFooting;

    const safeLedgerStockLength =
      clampNumber(ledgerStockLength);

    const ledgerLength =
      includeLedger ? calculatedLength : 0;

    const ledgerBoards =
      includeLedger &&
      safeLedgerStockLength > 0 &&
      ledgerLength > 0
        ? Math.ceil(
            ledgerLength / safeLedgerStockLength,
          )
        : 0;

    const totalFasteners = Math.ceil(
      deckArea * clampNumber(fastenersPerSquareFoot),
    );

    const safeFastenersPerBox = Math.floor(
      clampNumber(fastenersPerBox),
    );

    const fastenerBoxes =
      safeFastenersPerBox > 0 && totalFasteners > 0
        ? Math.ceil(totalFasteners / safeFastenersPerBox)
        : 0;

    const safeRailingLength =
      clampNumber(railingLength);
    const safeMaximumRailingPostSpacing = clampNumber(
      maximumRailingPostSpacing,
    );
    const safeMaximumRailingSectionLength = clampNumber(
      maximumRailingSectionLength,
    );

    const railingPosts =
      safeMaximumRailingPostSpacing > 0 &&
      safeRailingLength > 0
        ? Math.ceil(
            safeRailingLength /
              safeMaximumRailingPostSpacing,
          ) + 1
        : 0;

    const railingSections =
      safeMaximumRailingSectionLength > 0 &&
      safeRailingLength > 0
        ? Math.ceil(
            safeRailingLength /
              safeMaximumRailingSectionLength,
          )
        : 0;

    const safeStairWidth = clampNumber(stairWidth);
    const safeMaximumRiserHeight = clampNumber(
      maximumRiserHeight,
    );
    const safeMaximumStringerSpacing = clampNumber(
      maximumStringerSpacing,
    );

    const stairRiseInches = safeDeckHeight * 12;

    const stairRisers =
      includeStairs &&
      safeMaximumRiserHeight > 0 &&
      stairRiseInches > 0
        ? Math.ceil(
            stairRiseInches / safeMaximumRiserHeight,
          )
        : 0;

    const stairTreads =
      includeStairs
        ? Math.max(stairRisers - 1, 0)
        : 0;

    const stairStringers =
      includeStairs &&
      safeMaximumStringerSpacing > 0 &&
      safeStairWidth > 0
        ? Math.ceil(
            (safeStairWidth * 12) /
              safeMaximumStringerSpacing,
          ) + 1
        : 0;

    const safeDeckBoardPrice =
      clampNumber(deckBoardPrice);
    const safeJoistPrice = clampNumber(joistPrice);
    const safeRimBoardPrice =
      clampNumber(rimBoardPrice);
    const safeBeamBoardPrice =
      clampNumber(beamBoardPrice);
    const safePostPrice = clampNumber(postPrice);
    const safeLedgerBoardPrice =
      clampNumber(ledgerBoardPrice);
    const safeConcreteBagPrice =
      clampNumber(concreteBagPrice);
    const safeFastenerBoxPrice =
      clampNumber(fastenerBoxPrice);
    const safeRailingPricePerFoot = clampNumber(
      railingPricePerFoot,
    );
    const safeStairMaterialAllowance = includeStairs
      ? clampNumber(stairMaterialAllowance)
      : 0;
    const safeHardwareAllowance =
      clampNumber(hardwareAllowance);
    const safeDeliveryFee = clampNumber(deliveryFee);
    const safeAdditionalFees =
      clampNumber(additionalFees);
    const safeSalesTaxRate =
      clampNumber(salesTaxRate);

    const deckingCost =
      deckBoardsToPurchase * safeDeckBoardPrice;
    const joistCost =
      joistPieces * safeJoistPrice;
    const rimBoardCost =
      rimBoardPieces * safeRimBoardPrice;
    const beamCost =
      beamBoards * safeBeamBoardPrice;
    const postCost =
      supportPosts * safePostPrice;
    const ledgerCost =
      ledgerBoards * safeLedgerBoardPrice;
    const concreteCost =
      concreteBags * safeConcreteBagPrice;
    const fastenerCost =
      fastenerBoxes * safeFastenerBoxPrice;
    const railingCost =
      safeRailingLength * safeRailingPricePerFoot;

    const materialSubtotal =
      deckingCost +
      joistCost +
      rimBoardCost +
      beamCost +
      postCost +
      ledgerCost +
      concreteCost +
      fastenerCost +
      railingCost +
      safeStairMaterialAllowance +
      safeHardwareAllowance;

    const estimatedTax =
      materialSubtotal * (safeSalesTaxRate / 100);

    const estimatedMaterialTotal =
      materialSubtotal +
      estimatedTax +
      safeDeliveryFee +
      safeAdditionalFees;

    const costPerSquareFoot =
      deckArea > 0
        ? estimatedMaterialTotal / deckArea
        : 0;

    const notes: string[] = [];

    if (deckArea === 0) {
      notes.push(
        "Enter valid deck dimensions or a known deck area and width.",
      );
    }

    if (safeDeckingWastePercent < 5) {
      notes.push(
        "The decking waste allowance is low. Cuts, defects, board layout, stairs, picture framing, and future repairs may require additional boards.",
      );
    }

    if (
      boardCourseWidth === 0 ||
      safeDeckBoardStockLength === 0
    ) {
      notes.push(
        "Enter valid deck-board width, gap, and stock length.",
      );
    }

    if (
      safeJoistSpacing === 0 ||
      safeJoistStockLength === 0
    ) {
      notes.push(
        "Enter valid joist spacing and stock length.",
      );
    }

    if (
      safeBeamLines > 0 &&
      (
        safeBeamPlies === 0 ||
        safeBeamStockLength === 0 ||
        safeMaximumPostSpacing === 0
      )
    ) {
      notes.push(
        "Enter valid beam, ply, stock-length, and post-spacing assumptions.",
      );
    }

    notes.push(
      "This calculator estimates quantities from editable layout assumptions. It does not design structural spans, member sizes, footings, connections, guards, or stairs.",
    );

    return {
      calculatedLength,
      calculatedWidth,
      safeDeckHeight,
      deckArea,
      deckPerimeter,
      boardRun,
      boardCoverageSpan,
      boardCourseWidth,
      deckBoardCourses,
      boardSegmentsPerCourse,
      deckBoardsBeforeWaste,
      safeDeckingWastePercent,
      deckingWasteBoards,
      deckBoardsToPurchase,
      joistRun,
      joistLayoutSpan,
      joistCount,
      joistPiecesPerRun,
      joistPieces,
      rimBoardPieces,
      beamLength,
      safeBeamLines,
      safeBeamPlies,
      beamBoards,
      postsPerBeam,
      supportPosts,
      footings,
      concreteBags,
      ledgerLength,
      ledgerBoards,
      totalFasteners,
      fastenerBoxes,
      safeRailingLength,
      railingPosts,
      railingSections,
      stairRiseInches,
      stairRisers,
      stairTreads,
      stairStringers,
      deckingCost,
      joistCost,
      rimBoardCost,
      beamCost,
      postCost,
      ledgerCost,
      concreteCost,
      fastenerCost,
      railingCost,
      safeStairMaterialAllowance,
      safeHardwareAllowance,
      materialSubtotal,
      estimatedTax,
      safeDeliveryFee,
      safeAdditionalFees,
      estimatedMaterialTotal,
      costPerSquareFoot,
      safeSalesTaxRate,
      notes,
    };
  }, [
    calculationMode,
    deckLength,
    deckWidth,
    knownDeckArea,
    knownAreaWidth,
    deckHeight,
    deckingDirection,
    deckBoardWidth,
    deckBoardGap,
    deckBoardStockLength,
    deckingWastePercent,
    joistSpacing,
    joistStockLength,
    rimBoardStockLength,
    beamLines,
    beamPlies,
    beamStockLength,
    maximumPostSpacing,
    includeLedger,
    ledgerStockLength,
    concreteBagsPerFooting,
    fastenersPerSquareFoot,
    fastenersPerBox,
    railingLength,
    maximumRailingPostSpacing,
    maximumRailingSectionLength,
    includeStairs,
    stairWidth,
    maximumRiserHeight,
    maximumStringerSpacing,
    deckBoardPrice,
    joistPrice,
    rimBoardPrice,
    beamBoardPrice,
    postPrice,
    ledgerBoardPrice,
    concreteBagPrice,
    fastenerBoxPrice,
    railingPricePerFoot,
    stairMaterialAllowance,
    hardwareAllowance,
    deliveryFee,
    additionalFees,
    salesTaxRate,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Deck Materials Calculator",
      `Deck dimensions: ${formatNumber(result.calculatedLength)} ft × ${formatNumber(result.calculatedWidth)} ft`,
      `Deck area: ${formatNumber(result.deckArea)} sq ft`,
      `Deck boards: ${formatCount(result.deckBoardsToPurchase, "board")}`,
      `Joists: ${formatCount(result.joistPieces, "piece")}`,
      `Rim boards: ${formatCount(result.rimBoardPieces, "piece")}`,
      `Beam boards: ${formatCount(result.beamBoards, "board")}`,
      `Support posts: ${formatCount(result.supportPosts, "post")}`,
      `Footings: ${formatCount(result.footings, "footing")}`,
      `Concrete bags: ${formatCount(result.concreteBags, "bag")}`,
      `Ledger boards: ${formatCount(result.ledgerBoards, "board")}`,
      `Fastener boxes: ${formatCount(result.fastenerBoxes, "box", "boxes")}`,
      `Railing length: ${formatNumber(result.safeRailingLength)} lin ft`,
      `Railing posts: ${formatCount(result.railingPosts, "post")}`,
      `Stair risers: ${formatCount(result.stairRisers, "riser")}`,
      `Stair treads: ${formatCount(result.stairTreads, "tread")}`,
      `Stair stringers: ${formatCount(result.stairStringers, "stringer")}`,
      `Material subtotal: ${formatCurrency(result.materialSubtotal)}`,
      `Estimated tax: ${formatCurrency(result.estimatedTax)}`,
      `Delivery fee: ${formatCurrency(result.safeDeliveryFee)}`,
      `Additional fees: ${formatCurrency(result.safeAdditionalFees)}`,
      `Estimated material total: ${formatCurrency(result.estimatedMaterialTotal)}`,
      `Cost per square foot: ${formatCurrency(result.costPerSquareFoot)}`,
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
          Deck project details
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Enter the deck geometry and editable material-layout
          assumptions used to prepare a preliminary shopping list.
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
                label: "Deck dimensions",
              },
              {
                value: "known-area",
                label: "Known deck area and width",
              },
            ]}
          />
        </div>

        {calculationMode === "dimensions" ? (
          <InputSection title="Deck dimensions">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Deck length"
                value={deckLength}
                onChange={setDeckLength}
                suffix="ft"
              />
              <NumberInput
                label="Deck width"
                value={deckWidth}
                onChange={setDeckWidth}
                suffix="ft"
              />
              <NumberInput
                label="Deck height"
                value={deckHeight}
                onChange={setDeckHeight}
                suffix="ft"
              />
            </div>
          </InputSection>
        ) : (
          <InputSection title="Known deck area">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Known deck area"
                value={knownDeckArea}
                onChange={setKnownDeckArea}
                suffix="sq ft"
              />
              <NumberInput
                label="Assumed deck width"
                value={knownAreaWidth}
                onChange={setKnownAreaWidth}
                suffix="ft"
              />
              <NumberInput
                label="Deck height"
                value={deckHeight}
                onChange={setDeckHeight}
                suffix="ft"
              />
            </div>
          </InputSection>
        )}

        <InputSection title="Decking layout">
          <div className="space-y-4">
            <SelectInput
              label="Deck-board direction"
              value={deckingDirection}
              onChange={(value) =>
                setDeckingDirection(
                  value as DeckingDirection,
                )
              }
              options={[
                {
                  value: "parallel-length",
                  label: "Boards parallel to deck length",
                },
                {
                  value: "parallel-width",
                  label: "Boards parallel to deck width",
                },
              ]}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Actual deck-board width"
                value={deckBoardWidth}
                onChange={setDeckBoardWidth}
                suffix="in"
              />
              <NumberInput
                label="Gap between boards"
                value={deckBoardGap}
                onChange={setDeckBoardGap}
                suffix="in"
              />
              <NumberInput
                label="Deck-board stock length"
                value={deckBoardStockLength}
                onChange={setDeckBoardStockLength}
                suffix="ft"
              />
              <NumberInput
                label="Decking waste"
                value={deckingWastePercent}
                onChange={setDeckingWastePercent}
                suffix="%"
              />
            </div>
          </div>
        </InputSection>

        <InputSection title="Joists and rim boards">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Joist spacing"
              value={joistSpacing}
              onChange={setJoistSpacing}
              suffix="in o.c."
            />
            <NumberInput
              label="Joist stock length"
              value={joistStockLength}
              onChange={setJoistStockLength}
              suffix="ft"
            />
            <NumberInput
              label="Rim-board stock length"
              value={rimBoardStockLength}
              onChange={setRimBoardStockLength}
              suffix="ft"
            />
          </div>
        </InputSection>

        <InputSection title="Beams, posts, and footings">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Beam lines"
              value={beamLines}
              onChange={setBeamLines}
              suffix="lines"
              integer
            />
            <NumberInput
              label="Beam plies"
              value={beamPlies}
              onChange={setBeamPlies}
              suffix="plies"
              integer
            />
            <NumberInput
              label="Beam-board stock length"
              value={beamStockLength}
              onChange={setBeamStockLength}
              suffix="ft"
            />
            <NumberInput
              label="Maximum post spacing"
              value={maximumPostSpacing}
              onChange={setMaximumPostSpacing}
              suffix="ft"
            />
            <NumberInput
              label="Concrete bags per footing"
              value={concreteBagsPerFooting}
              onChange={setConcreteBagsPerFooting}
              suffix="bags"
              integer
            />
          </div>
        </InputSection>

        <InputSection title="Ledger and fasteners">
          <div className="space-y-5">
            <ToggleInput
              label="Include ledger board"
              checked={includeLedger}
              onChange={setIncludeLedger}
            />

            {includeLedger ? (
              <NumberInput
                label="Ledger-board stock length"
                value={ledgerStockLength}
                onChange={setLedgerStockLength}
                suffix="ft"
              />
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Fasteners or clips per sq ft"
                value={fastenersPerSquareFoot}
                onChange={setFastenersPerSquareFoot}
                suffix="/sq ft"
              />
              <NumberInput
                label="Fasteners per box"
                value={fastenersPerBox}
                onChange={setFastenersPerBox}
                suffix="/box"
                integer
              />
            </div>
          </div>
        </InputSection>

        <InputSection title="Railing">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Required railing length"
              value={railingLength}
              onChange={setRailingLength}
              suffix="lin ft"
            />
            <NumberInput
              label="Maximum railing-post spacing"
              value={maximumRailingPostSpacing}
              onChange={setMaximumRailingPostSpacing}
              suffix="ft"
            />
            <NumberInput
              label="Maximum railing-section length"
              value={maximumRailingSectionLength}
              onChange={setMaximumRailingSectionLength}
              suffix="ft"
            />
          </div>
        </InputSection>

        <InputSection title="Deck stairs">
          <div className="space-y-5">
            <ToggleInput
              label="Include stairs"
              checked={includeStairs}
              onChange={setIncludeStairs}
            />

            {includeStairs ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  label="Stair width"
                  value={stairWidth}
                  onChange={setStairWidth}
                  suffix="ft"
                />
                <NumberInput
                  label="Maximum riser height"
                  value={maximumRiserHeight}
                  onChange={setMaximumRiserHeight}
                  suffix="in"
                />
                <NumberInput
                  label="Maximum stringer spacing"
                  value={maximumStringerSpacing}
                  onChange={setMaximumStringerSpacing}
                  suffix="in"
                />
              </div>
            ) : null}
          </div>
        </InputSection>

        <InputSection title="Supplier pricing">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Price per deck board"
              value={deckBoardPrice}
              onChange={setDeckBoardPrice}
              prefix="$"
            />
            <NumberInput
              label="Price per joist"
              value={joistPrice}
              onChange={setJoistPrice}
              prefix="$"
            />
            <NumberInput
              label="Price per rim board"
              value={rimBoardPrice}
              onChange={setRimBoardPrice}
              prefix="$"
            />
            <NumberInput
              label="Price per beam board"
              value={beamBoardPrice}
              onChange={setBeamBoardPrice}
              prefix="$"
            />
            <NumberInput
              label="Price per support post"
              value={postPrice}
              onChange={setPostPrice}
              prefix="$"
            />
            <NumberInput
              label="Price per ledger board"
              value={ledgerBoardPrice}
              onChange={setLedgerBoardPrice}
              prefix="$"
            />
            <NumberInput
              label="Price per concrete bag"
              value={concreteBagPrice}
              onChange={setConcreteBagPrice}
              prefix="$"
            />
            <NumberInput
              label="Price per fastener box"
              value={fastenerBoxPrice}
              onChange={setFastenerBoxPrice}
              prefix="$"
            />
            <NumberInput
              label="Railing price per linear foot"
              value={railingPricePerFoot}
              onChange={setRailingPricePerFoot}
              prefix="$"
            />
            <NumberInput
              label="Stair material allowance"
              value={stairMaterialAllowance}
              onChange={setStairMaterialAllowance}
              prefix="$"
            />
            <NumberInput
              label="Connectors and hardware"
              value={hardwareAllowance}
              onChange={setHardwareAllowance}
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
            Preliminary material estimate
          </h3>
          <p className="mt-3 leading-7 text-[#A0AEC0]">
            This tool estimates quantities from editable layout
            assumptions. It does not design structural spans,
            member sizes, footings, connections, guards, or stairs.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
          Results
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Deck material estimate
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review decking, preliminary framing, posts, footings,
          railing, stair assumptions, and material cost.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Deck boards"
            value={formatCount(
              result.deckBoardsToPurchase,
              "board",
            )}
            featured
          />
          <ResultCard
            label="Deck area"
            value={`${formatNumber(result.deckArea)} sq ft`}
          />
          <ResultCard
            label="Joist pieces"
            value={formatCount(result.joistPieces, "piece")}
          />
          <ResultCard
            label="Support posts"
            value={formatCount(result.supportPosts, "post")}
          />
          <ResultCard
            label="Concrete"
            value={formatCount(result.concreteBags, "bag")}
          />
          <ResultCard
            label="Material total"
            value={formatCurrency(
              result.estimatedMaterialTotal,
            )}
          />
        </div>

        <ResultSection title="Deck geometry">
          <ResultRow
            label="Calculation mode"
            value={
              calculationMode === "dimensions"
                ? "Deck dimensions"
                : "Known area and width"
            }
          />
          <ResultRow
            label="Calculated length"
            value={`${formatNumber(result.calculatedLength)} ft`}
          />
          <ResultRow
            label="Calculated width"
            value={`${formatNumber(result.calculatedWidth)} ft`}
          />
          <ResultRow
            label="Deck height"
            value={`${formatNumber(result.safeDeckHeight)} ft`}
          />
          <ResultRow
            label="Deck area"
            value={`${formatNumber(result.deckArea)} sq ft`}
          />
          <ResultRow
            label="Deck perimeter"
            value={`${formatNumber(result.deckPerimeter)} lin ft`}
          />
        </ResultSection>

        <ResultSection title="Decking">
          <ResultRow
            label="Board run"
            value={`${formatNumber(result.boardRun)} ft`}
          />
          <ResultRow
            label="Board coverage span"
            value={`${formatNumber(result.boardCoverageSpan)} ft`}
          />
          <ResultRow
            label="Board courses"
            value={formatCount(result.deckBoardCourses, "course")}
          />
          <ResultRow
            label="Board pieces per course"
            value={formatCount(
              result.boardSegmentsPerCourse,
              "piece",
            )}
          />
          <ResultRow
            label="Boards before waste"
            value={formatCount(
              result.deckBoardsBeforeWaste,
              "board",
            )}
          />
          <ResultRow
            label="Waste allowance"
            value={`${formatNumber(result.safeDeckingWastePercent)}%`}
          />
          <ResultRow
            label="Additional waste boards"
            value={formatCount(
              result.deckingWasteBoards,
              "board",
            )}
          />
          <ResultRow
            label="Deck boards to purchase"
            value={formatCount(
              result.deckBoardsToPurchase,
              "board",
            )}
          />
        </ResultSection>

        <ResultSection title="Preliminary framing">
          <ResultRow
            label="Joist run"
            value={`${formatNumber(result.joistRun)} ft`}
          />
          <ResultRow
            label="Joist layout span"
            value={`${formatNumber(result.joistLayoutSpan)} ft`}
          />
          <ResultRow
            label="Joist runs"
            value={formatCount(result.joistCount, "joist")}
          />
          <ResultRow
            label="Pieces per joist run"
            value={formatCount(
              result.joistPiecesPerRun,
              "piece",
            )}
          />
          <ResultRow
            label="Joist pieces"
            value={formatCount(result.joistPieces, "piece")}
          />
          <ResultRow
            label="Rim-board pieces"
            value={formatCount(
              result.rimBoardPieces,
              "piece",
            )}
          />
          <ResultRow
            label="Beam length"
            value={`${formatNumber(result.beamLength)} ft`}
          />
          <ResultRow
            label="Beam lines"
            value={formatNumber(result.safeBeamLines, 0)}
          />
          <ResultRow
            label="Beam plies"
            value={formatNumber(result.safeBeamPlies, 0)}
          />
          <ResultRow
            label="Beam boards"
            value={formatCount(result.beamBoards, "board")}
          />
          <ResultRow
            label="Posts per beam"
            value={formatCount(result.postsPerBeam, "post")}
          />
          <ResultRow
            label="Support posts"
            value={formatCount(result.supportPosts, "post")}
          />
          <ResultRow
            label="Footings"
            value={formatCount(result.footings, "footing")}
          />
          <ResultRow
            label="Concrete bags"
            value={formatCount(result.concreteBags, "bag")}
          />
          <ResultRow
            label="Ledger length"
            value={`${formatNumber(result.ledgerLength)} ft`}
          />
          <ResultRow
            label="Ledger boards"
            value={formatCount(result.ledgerBoards, "board")}
          />
        </ResultSection>

        <ResultSection title="Fasteners, railing, and stairs">
          <ResultRow
            label="Estimated fasteners or clips"
            value={formatCount(
              result.totalFasteners,
              "fastener",
            )}
          />
          <ResultRow
            label="Fastener boxes"
            value={formatCount(
              result.fastenerBoxes,
              "box",
              "boxes",
            )}
          />
          <ResultRow
            label="Railing length"
            value={`${formatNumber(result.safeRailingLength)} lin ft`}
          />
          <ResultRow
            label="Railing posts"
            value={formatCount(result.railingPosts, "post")}
          />
          <ResultRow
            label="Railing sections"
            value={formatCount(
              result.railingSections,
              "section",
            )}
          />
          <ResultRow
            label="Stair rise"
            value={`${formatNumber(result.stairRiseInches)} in`}
          />
          <ResultRow
            label="Stair risers"
            value={formatCount(result.stairRisers, "riser")}
          />
          <ResultRow
            label="Stair treads"
            value={formatCount(result.stairTreads, "tread")}
          />
          <ResultRow
            label="Stair stringers"
            value={formatCount(
              result.stairStringers,
              "stringer",
            )}
          />
        </ResultSection>

        <ResultSection title="Cost breakdown">
          <ResultRow
            label="Decking"
            value={formatCurrency(result.deckingCost)}
          />
          <ResultRow
            label="Joists"
            value={formatCurrency(result.joistCost)}
          />
          <ResultRow
            label="Rim boards"
            value={formatCurrency(result.rimBoardCost)}
          />
          <ResultRow
            label="Beams"
            value={formatCurrency(result.beamCost)}
          />
          <ResultRow
            label="Support posts"
            value={formatCurrency(result.postCost)}
          />
          <ResultRow
            label="Ledger"
            value={formatCurrency(result.ledgerCost)}
          />
          <ResultRow
            label="Concrete"
            value={formatCurrency(result.concreteCost)}
          />
          <ResultRow
            label="Fasteners"
            value={formatCurrency(result.fastenerCost)}
          />
          <ResultRow
            label="Railing"
            value={formatCurrency(result.railingCost)}
          />
          <ResultRow
            label="Stair allowance"
            value={formatCurrency(
              result.safeStairMaterialAllowance,
            )}
          />
          <ResultRow
            label="Connectors and hardware"
            value={formatCurrency(
              result.safeHardwareAllowance,
            )}
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
            label="Cost per square foot"
            value={formatCurrency(result.costPerSquareFoot)}
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
