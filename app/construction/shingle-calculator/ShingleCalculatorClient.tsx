"use client";

import { useMemo, useState } from "react";

type CalculationMode = "footprint" | "known-area";
type RoofStyle = "gable" | "hip" | "shed" | "complex";
type ShingleType =
  | "architectural"
  | "three-tab"
  | "premium"
  | "custom";

const shingleTypeLabels: Record<ShingleType, string> = {
  architectural: "Architectural shingles",
  "three-tab": "Three-tab shingles",
  premium: "Premium or designer shingles",
  custom: "Custom asphalt shingles",
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

export default function ShingleCalculatorClient() {
  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>("footprint");

  const [roofStyle, setRoofStyle] =
    useState<RoofStyle>("gable");

  const [shingleType, setShingleType] =
    useState<ShingleType>("architectural");

  const [buildingLength, setBuildingLength] = useState(40);
  const [buildingWidth, setBuildingWidth] = useState(30);
  const [overhang, setOverhang] = useState(12);
  const [rise, setRise] = useState(6);
  const [run, setRun] = useState(12);
  const [knownRoofArea, setKnownRoofArea] = useState(1500);
  const [wastePercent, setWastePercent] = useState(10);

  const [bundleCoverage, setBundleCoverage] =
    useState(33.33);
  const [shinglesPerBundle, setShinglesPerBundle] =
    useState(29);

  const [underlaymentCoverage, setUnderlaymentCoverage] =
    useState(400);

  const [starterLength, setStarterLength] = useState(140);
  const [starterCoverage, setStarterCoverage] =
    useState(100);

  const [ridgeHipLength, setRidgeHipLength] = useState(40);
  const [ridgeCapCoverage, setRidgeCapCoverage] =
    useState(25);

  const [dripEdgeLength, setDripEdgeLength] = useState(140);
  const [dripEdgePieceLength, setDripEdgePieceLength] =
    useState(10);

  const [nailsPerSquare, setNailsPerSquare] = useState(320);
  const [nailsPerBox, setNailsPerBox] = useState(7200);

  const [bundlePrice, setBundlePrice] = useState(0);
  const [underlaymentRollPrice, setUnderlaymentRollPrice] =
    useState(0);
  const [starterBundlePrice, setStarterBundlePrice] =
    useState(0);
  const [ridgeCapBundlePrice, setRidgeCapBundlePrice] =
    useState(0);
  const [dripEdgePiecePrice, setDripEdgePiecePrice] =
    useState(0);
  const [nailBoxPrice, setNailBoxPrice] = useState(0);

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(0);

  const result = useMemo(() => {
    const safeLength = safeNumber(buildingLength);
    const safeWidth = safeNumber(buildingWidth);
    const safeOverhang = safeNumber(overhang);
    const safeRise = safeNumber(rise);
    const safeRun = safeNumber(run);
    const safeKnownRoofArea = safeNumber(knownRoofArea);
    const safeWastePercent = safeNumber(wastePercent);

    const safeBundleCoverage = safeNumber(bundleCoverage);
    const safeShinglesPerBundle = Math.floor(
      safeNumber(shinglesPerBundle),
    );

    const safeUnderlaymentCoverage = safeNumber(
      underlaymentCoverage,
    );

    const safeStarterLength = safeNumber(starterLength);
    const safeStarterCoverage = safeNumber(starterCoverage);

    const safeRidgeHipLength = safeNumber(ridgeHipLength);
    const safeRidgeCapCoverage = safeNumber(
      ridgeCapCoverage,
    );

    const safeDripEdgeLength = safeNumber(dripEdgeLength);
    const safeDripEdgePieceLength = safeNumber(
      dripEdgePieceLength,
    );

    const safeNailsPerSquare = Math.floor(
      safeNumber(nailsPerSquare),
    );
    const safeNailsPerBox = Math.floor(
      safeNumber(nailsPerBox),
    );

    const safeBundlePrice = safeNumber(bundlePrice);
    const safeUnderlaymentRollPrice = safeNumber(
      underlaymentRollPrice,
    );
    const safeStarterBundlePrice = safeNumber(
      starterBundlePrice,
    );
    const safeRidgeCapBundlePrice = safeNumber(
      ridgeCapBundlePrice,
    );
    const safeDripEdgePiecePrice = safeNumber(
      dripEdgePiecePrice,
    );
    const safeNailBoxPrice = safeNumber(nailBoxPrice);

    const safeDeliveryFee = safeNumber(deliveryFee);
    const safeAdditionalFees = safeNumber(additionalFees);
    const safeSalesTaxRate = safeNumber(salesTaxRate);

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

    const shingleBundles =
      safeBundleCoverage > 0
        ? Math.ceil(
            purchaseRoofArea / safeBundleCoverage,
          )
        : 0;

    const purchasedShingleCoverage =
      shingleBundles * safeBundleCoverage;

    const coverageOverage =
      Math.max(
        purchasedShingleCoverage - purchaseRoofArea,
        0,
      );

    const estimatedIndividualShingles =
      shingleBundles * safeShinglesPerBundle;

    const underlaymentRolls =
      safeUnderlaymentCoverage > 0
        ? Math.ceil(
            purchaseRoofArea / safeUnderlaymentCoverage,
          )
        : 0;

    const starterBundles =
      safeStarterCoverage > 0
        ? Math.ceil(
            safeStarterLength / safeStarterCoverage,
          )
        : 0;

    const ridgeCapBundles =
      safeRidgeCapCoverage > 0
        ? Math.ceil(
            safeRidgeHipLength / safeRidgeCapCoverage,
          )
        : 0;

    const dripEdgePieces =
      safeDripEdgePieceLength > 0
        ? Math.ceil(
            safeDripEdgeLength /
              safeDripEdgePieceLength,
          )
        : 0;

    const totalNails = Math.ceil(
      purchaseRoofingSquares * safeNailsPerSquare,
    );

    const nailBoxes =
      safeNailsPerBox > 0
        ? Math.ceil(totalNails / safeNailsPerBox)
        : 0;

    const shingleCost =
      shingleBundles * safeBundlePrice;

    const underlaymentCost =
      underlaymentRolls *
      safeUnderlaymentRollPrice;

    const starterCost =
      starterBundles * safeStarterBundlePrice;

    const ridgeCapCost =
      ridgeCapBundles *
      safeRidgeCapBundlePrice;

    const dripEdgeCost =
      dripEdgePieces * safeDripEdgePiecePrice;

    const nailCost =
      nailBoxes * safeNailBoxPrice;

    const materialSubtotal =
      shingleCost +
      underlaymentCost +
      starterCost +
      ridgeCapCost +
      dripEdgeCost +
      nailCost;

    const estimatedTax =
      materialSubtotal * (safeSalesTaxRate / 100);

    const estimatedTotal =
      materialSubtotal +
      estimatedTax +
      safeDeliveryFee +
      safeAdditionalFees;

    const materialCostPerSquareFoot =
      roofAreaBeforeWaste > 0
        ? estimatedTotal / roofAreaBeforeWaste
        : 0;

    const materialCostPerRoofingSquare =
      baseRoofingSquares > 0
        ? estimatedTotal / baseRoofingSquares
        : 0;

    const notes: string[] = [];

    if (
      calculationMode === "footprint" &&
      (safeLength === 0 || safeWidth === 0)
    ) {
      notes.push(
        "Enter both building dimensions to calculate roof area from the footprint.",
      );
    }

    if (
      calculationMode === "footprint" &&
      safeRun === 0
    ) {
      notes.push(
        "Enter a roof-pitch run greater than zero.",
      );
    }

    if (
      calculationMode === "known-area" &&
      safeKnownRoofArea === 0
    ) {
      notes.push(
        "Enter a known sloped roof area greater than zero.",
      );
    }

    if (safeWastePercent < 5) {
      notes.push(
        "The waste allowance is low. Roof shape, valleys, hips, dormers, cuts, damage, and product layout can require additional shingles.",
      );
    }

    if (
      roofStyle === "complex" &&
      safeWastePercent < 15
    ) {
      notes.push(
        "Complex roofs often require a higher waste allowance. Verify the roof-plane takeoff and shingle layout.",
      );
    }

    if (safeBundleCoverage === 0) {
      notes.push(
        "Enter the exact square-foot coverage printed for the selected shingle bundle.",
      );
    }

    if (
      safeUnderlaymentCoverage === 0 ||
      safeStarterCoverage === 0 ||
      safeRidgeCapCoverage === 0 ||
      safeDripEdgePieceLength === 0 ||
      safeNailsPerBox === 0
    ) {
      notes.push(
        "One or more accessory coverage values are zero. Enter the applicable product coverage to complete the shopping list.",
      );
    }

    if (
      safeBundlePrice === 0 ||
      safeUnderlaymentRollPrice === 0
    ) {
      notes.push(
        "Enter current supplier pricing to calculate a complete material-cost estimate.",
      );
    }

    if (safeSalesTaxRate > 0) {
      notes.push(
        "Sales tax is applied to the calculated material subtotal. Verify local taxability and the applicable rate.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "The shopping list uses whole-package rounding and the editable product coverage entered for each material.",
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
      safeBundleCoverage,
      safeShinglesPerBundle,
      safeUnderlaymentCoverage,
      safeStarterLength,
      safeStarterCoverage,
      safeRidgeHipLength,
      safeRidgeCapCoverage,
      safeDripEdgeLength,
      safeDripEdgePieceLength,
      safeNailsPerSquare,
      safeNailsPerBox,
      safeBundlePrice,
      safeUnderlaymentRollPrice,
      safeStarterBundlePrice,
      safeRidgeCapBundlePrice,
      safeDripEdgePiecePrice,
      safeNailBoxPrice,
      safeDeliveryFee,
      safeAdditionalFees,
      safeSalesTaxRate,
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
      shingleBundles,
      purchasedShingleCoverage,
      coverageOverage,
      estimatedIndividualShingles,
      underlaymentRolls,
      starterBundles,
      ridgeCapBundles,
      dripEdgePieces,
      totalNails,
      nailBoxes,
      shingleCost,
      underlaymentCost,
      starterCost,
      ridgeCapCost,
      dripEdgeCost,
      nailCost,
      materialSubtotal,
      estimatedTax,
      estimatedTotal,
      materialCostPerSquareFoot,
      materialCostPerRoofingSquare,
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
    bundleCoverage,
    shinglesPerBundle,
    underlaymentCoverage,
    starterLength,
    starterCoverage,
    ridgeHipLength,
    ridgeCapCoverage,
    dripEdgeLength,
    dripEdgePieceLength,
    nailsPerSquare,
    nailsPerBox,
    bundlePrice,
    underlaymentRollPrice,
    starterBundlePrice,
    ridgeCapBundlePrice,
    dripEdgePiecePrice,
    nailBoxPrice,
    deliveryFee,
    additionalFees,
    salesTaxRate,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Shingle Calculator",
      `Calculation mode: ${
        calculationMode === "footprint"
          ? "Building footprint"
          : "Known sloped roof area"
      }`,
      `Roof style: ${roofStyle}`,
      `Shingle type: ${shingleTypeLabels[shingleType]}`,
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
      `Shingle bundles: ${formatNumber(result.shingleBundles, 0)}`,
      `Estimated individual shingles: ${formatNumber(result.estimatedIndividualShingles, 0)}`,
      `Underlayment rolls: ${formatNumber(result.underlaymentRolls, 0)}`,
      `Starter bundles: ${formatNumber(result.starterBundles, 0)}`,
      `Ridge-cap bundles: ${formatNumber(result.ridgeCapBundles, 0)}`,
      `Drip-edge pieces: ${formatNumber(result.dripEdgePieces, 0)}`,
      `Roofing nails: ${formatNumber(result.totalNails, 0)}`,
      `Nail boxes: ${formatNumber(result.nailBoxes, 0)}`,
      `Material subtotal: ${formatCurrency(result.materialSubtotal)}`,
      `Estimated tax: ${formatCurrency(result.estimatedTax)}`,
      `Delivery fee: ${formatCurrency(result.safeDeliveryFee)}`,
      `Additional fees: ${formatCurrency(result.safeAdditionalFees)}`,
      `Estimated material total: ${formatCurrency(result.estimatedTotal)}`,
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
          Shingle project details
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Calculate roof area from a simple footprint or enter a
          known sloped area. Use exact product coverage and current
          supplier pricing to prepare a rounded shopping list.
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
              {
                value: "complex",
                label: "Complex or multi-section",
              },
            ]}
          />

          <SelectInput
            label="Shingle type"
            value={shingleType}
            onChange={(value) =>
              setShingleType(value as ShingleType)
            }
            options={[
              {
                value: "architectural",
                label: "Architectural shingles",
              },
              {
                value: "three-tab",
                label: "Three-tab shingles",
              },
              {
                value: "premium",
                label: "Premium or designer",
              },
              {
                value: "custom",
                label: "Custom asphalt shingles",
              },
            ]}
          />
        </div>

        {calculationMode === "footprint" ? (
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

        <InputSection title="Shingle coverage">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Waste allowance"
              value={wastePercent}
              onChange={setWastePercent}
              suffix="%"
            />

            <NumberInput
              label="Coverage per shingle bundle"
              value={bundleCoverage}
              onChange={setBundleCoverage}
              suffix="sq ft"
            />

            <NumberInput
              label="Shingles per bundle"
              value={shinglesPerBundle}
              onChange={setShinglesPerBundle}
              suffix="shingles"
              integer
            />
          </div>
        </InputSection>

        <InputSection title="Underlayment">
          <NumberInput
            label="Coverage per underlayment roll"
            value={underlaymentCoverage}
            onChange={setUnderlaymentCoverage}
            suffix="sq ft"
          />
        </InputSection>

        <InputSection title="Starter and ridge cap">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Starter-strip length"
              value={starterLength}
              onChange={setStarterLength}
              suffix="lin ft"
            />

            <NumberInput
              label="Starter coverage per bundle"
              value={starterCoverage}
              onChange={setStarterCoverage}
              suffix="lin ft"
            />

            <NumberInput
              label="Ridge and hip length"
              value={ridgeHipLength}
              onChange={setRidgeHipLength}
              suffix="lin ft"
            />

            <NumberInput
              label="Ridge-cap coverage per bundle"
              value={ridgeCapCoverage}
              onChange={setRidgeCapCoverage}
              suffix="lin ft"
            />
          </div>
        </InputSection>

        <InputSection title="Drip edge and roofing nails">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Total drip-edge length"
              value={dripEdgeLength}
              onChange={setDripEdgeLength}
              suffix="lin ft"
            />

            <NumberInput
              label="Length per drip-edge piece"
              value={dripEdgePieceLength}
              onChange={setDripEdgePieceLength}
              suffix="ft"
            />

            <NumberInput
              label="Roofing nails per square"
              value={nailsPerSquare}
              onChange={setNailsPerSquare}
              suffix="nails"
              integer
            />

            <NumberInput
              label="Roofing nails per box"
              value={nailsPerBox}
              onChange={setNailsPerBox}
              suffix="nails"
              integer
            />
          </div>
        </InputSection>

        <InputSection title="Supplier pricing">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              label="Price per shingle bundle"
              value={bundlePrice}
              onChange={setBundlePrice}
              prefix="$"
              suffix="/bundle"
            />

            <NumberInput
              label="Price per underlayment roll"
              value={underlaymentRollPrice}
              onChange={setUnderlaymentRollPrice}
              prefix="$"
              suffix="/roll"
            />

            <NumberInput
              label="Price per starter bundle"
              value={starterBundlePrice}
              onChange={setStarterBundlePrice}
              prefix="$"
              suffix="/bundle"
            />

            <NumberInput
              label="Price per ridge-cap bundle"
              value={ridgeCapBundlePrice}
              onChange={setRidgeCapBundlePrice}
              prefix="$"
              suffix="/bundle"
            />

            <NumberInput
              label="Price per drip-edge piece"
              value={dripEdgePiecePrice}
              onChange={setDripEdgePiecePrice}
              prefix="$"
              suffix="/piece"
            />

            <NumberInput
              label="Price per roofing-nail box"
              value={nailBoxPrice}
              onChange={setNailBoxPrice}
              prefix="$"
              suffix="/box"
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
            Product coverage matters
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#A0AEC0]">
            Coverage, piece counts, fastening rates, package
            quantities, and installation requirements vary by
            manufacturer and product. Use the packaging and
            installation instructions for the exact materials
            being purchased.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
          Results
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          Shingle shopping list
        </h2>

        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review whole-package quantities, calculated coverage,
          accessory requirements, and estimated supplier cost.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Shingle bundles"
            value={formatCount(result.shingleBundles, "bundle")}
            highlight
          />

          <ResultCard
            label="Purchase roofing squares"
            value={formatNumber(result.purchaseRoofingSquares)}
          />

          <ResultCard
            label="Purchase roof area"
            value={`${formatNumber(result.purchaseRoofArea)} sq ft`}
          />

          <ResultCard
            label="Estimated material total"
            value={formatCurrency(result.estimatedTotal)}
          />

          <ResultCard
            label="Underlayment"
            value={formatCount(result.underlaymentRolls, "roll")}
          />

          <ResultCard
            label="Ridge cap"
            value={formatCount(result.ridgeCapBundles, "bundle")}
          />
        </div>

        <ResultPanel title="Roof quantity">
          <ResultRow
            label="Calculation mode"
            value={
              calculationMode === "footprint"
                ? "Building footprint"
                : "Known sloped roof area"
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
            label="Shingle type"
            value={shingleTypeLabels[shingleType]}
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
            label="Waste allowance"
            value={`${formatNumber(result.safeWastePercent)}%`}
          />

          <ResultRow
            label="Waste area"
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

        <ResultPanel title="Shingles">
          <ResultRow
            label="Coverage per bundle"
            value={`${formatNumber(result.safeBundleCoverage)} sq ft`}
          />

          <ResultRow
            label="Shingle bundles to purchase"
            value={formatCount(result.shingleBundles, "bundle")}
          />

          <ResultRow
            label="Purchased shingle coverage"
            value={`${formatNumber(result.purchasedShingleCoverage)} sq ft`}
          />

          <ResultRow
            label="Whole-bundle overage"
            value={`${formatNumber(result.coverageOverage)} sq ft`}
          />

          <ResultRow
            label="Estimated individual shingles"
            value={formatCount(
              result.estimatedIndividualShingles,
              "shingle",
            )}
          />
        </ResultPanel>

        <ResultPanel title="Accessory shopping list">
          <ResultRow
            label="Underlayment rolls"
            value={formatCount(result.underlaymentRolls, "roll")}
          />

          <ResultRow
            label="Starter bundles"
            value={formatCount(result.starterBundles, "bundle")}
          />

          <ResultRow
            label="Ridge-cap bundles"
            value={formatCount(result.ridgeCapBundles, "bundle")}
          />

          <ResultRow
            label="Drip-edge pieces"
            value={formatCount(
              result.dripEdgePieces,
              "piece",
              "pieces",
            )}
          />

          <ResultRow
            label="Estimated roofing nails"
            value={formatCount(result.totalNails, "nail")}
          />

          <ResultRow
            label="Roofing-nail boxes"
            value={formatCount(
              result.nailBoxes,
              "box",
              "boxes",
            )}
          />
        </ResultPanel>

        <ResultPanel title="Material cost">
          <ResultRow
            label="Shingle cost"
            value={formatCurrency(result.shingleCost)}
          />

          <ResultRow
            label="Underlayment cost"
            value={formatCurrency(result.underlaymentCost)}
          />

          <ResultRow
            label="Starter cost"
            value={formatCurrency(result.starterCost)}
          />

          <ResultRow
            label="Ridge-cap cost"
            value={formatCurrency(result.ridgeCapCost)}
          />

          <ResultRow
            label="Drip-edge cost"
            value={formatCurrency(result.dripEdgeCost)}
          />

          <ResultRow
            label="Roofing-nail cost"
            value={formatCurrency(result.nailCost)}
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
            value={formatCurrency(result.estimatedTotal)}
          />

          <ResultRow
            label="Material cost per square foot"
            value={formatCurrency(result.materialCostPerSquareFoot)}
          />

          <ResultRow
            label="Material cost per roofing square"
            value={formatCurrency(result.materialCostPerRoofingSquare)}
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
          Copy shopping list
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
