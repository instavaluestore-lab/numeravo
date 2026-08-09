"use client";

import { useMemo, useState } from "react";

type CalculationMode = "interior" | "exterior" | "known-area";

type PurchaseQuantity = {
  exactGallons: number;
  gallons: number;
  quarts: number;
  purchasedGallons: number;
};

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

function calculatePurchaseQuantity(
  requiredCoverage: number,
  coveragePerGallon: number,
): PurchaseQuantity {
  if (requiredCoverage <= 0 || coveragePerGallon <= 0) {
    return {
      exactGallons: 0,
      gallons: 0,
      quarts: 0,
      purchasedGallons: 0,
    };
  }

  const exactGallons = requiredCoverage / coveragePerGallon;
  let gallons = Math.floor(exactGallons);
  const remainingGallons = exactGallons - gallons;
  let quarts =
    remainingGallons > 0
      ? Math.ceil(remainingGallons * 4)
      : 0;

  if (quarts >= 4) {
    gallons += 1;
    quarts = 0;
  }

  return {
    exactGallons,
    gallons,
    quarts,
    purchasedGallons: gallons + quarts / 4,
  };
}

export default function PaintCalculatorClient() {
  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>("interior");

  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(12);
  const [wallHeight, setWallHeight] = useState(8);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [includeCeiling, setIncludeCeiling] = useState(true);

  const [buildingLength, setBuildingLength] = useState(40);
  const [buildingWidth, setBuildingWidth] = useState(30);
  const [exteriorWallHeight, setExteriorWallHeight] = useState(10);

  const [knownWallArea, setKnownWallArea] = useState(500);
  const [knownCeilingArea, setKnownCeilingArea] = useState(0);

  const [doorCount, setDoorCount] = useState(1);
  const [doorWidth, setDoorWidth] = useState(3);
  const [doorHeight, setDoorHeight] = useState(7);
  const [windowCount, setWindowCount] = useState(2);
  const [windowWidth, setWindowWidth] = useState(3);
  const [windowHeight, setWindowHeight] = useState(4);

  const [wallCoats, setWallCoats] = useState(2);
  const [ceilingCoats, setCeilingCoats] = useState(2);
  const [primerCoats, setPrimerCoats] = useState(1);
  const [wastePercent, setWastePercent] = useState(10);

  const [trimLength, setTrimLength] = useState(48);
  const [trimCoats, setTrimCoats] = useState(2);
  const [trimCoveragePerGallon, setTrimCoveragePerGallon] =
    useState(400);

  const [wallCoveragePerGallon, setWallCoveragePerGallon] =
    useState(350);
  const [ceilingCoveragePerGallon, setCeilingCoveragePerGallon] =
    useState(350);
  const [primerCoveragePerGallon, setPrimerCoveragePerGallon] =
    useState(300);

  const [wallGallonPrice, setWallGallonPrice] = useState(45);
  const [wallQuartPrice, setWallQuartPrice] = useState(18);
  const [ceilingGallonPrice, setCeilingGallonPrice] = useState(38);
  const [ceilingQuartPrice, setCeilingQuartPrice] = useState(16);
  const [trimGallonPrice, setTrimGallonPrice] = useState(50);
  const [trimQuartPrice, setTrimQuartPrice] = useState(20);
  const [primerGallonPrice, setPrimerGallonPrice] = useState(32);

  const [suppliesCost, setSuppliesCost] = useState(35);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(0);

  const result = useMemo(() => {
    const safeRoomLength = clampNumber(roomLength);
    const safeRoomWidth = clampNumber(roomWidth);
    const safeWallHeight = clampNumber(wallHeight);
    const safeNumberOfRooms = Math.floor(
      clampNumber(numberOfRooms),
    );

    const safeBuildingLength = clampNumber(buildingLength);
    const safeBuildingWidth = clampNumber(buildingWidth);
    const safeExteriorWallHeight =
      clampNumber(exteriorWallHeight);

    const safeKnownWallArea = clampNumber(knownWallArea);
    const safeKnownCeilingArea = clampNumber(knownCeilingArea);

    const safeDoorCount = Math.floor(clampNumber(doorCount));
    const safeDoorWidth = clampNumber(doorWidth);
    const safeDoorHeight = clampNumber(doorHeight);
    const safeWindowCount = Math.floor(clampNumber(windowCount));
    const safeWindowWidth = clampNumber(windowWidth);
    const safeWindowHeight = clampNumber(windowHeight);

    const safeWallCoats = Math.floor(clampNumber(wallCoats));
    const safeCeilingCoats = Math.floor(
      clampNumber(ceilingCoats),
    );
    const safePrimerCoats = Math.floor(clampNumber(primerCoats));
    const safeWastePercent = clampNumber(wastePercent);
    const safeWasteMultiplier = 1 + safeWastePercent / 100;

    const safeTrimLength = clampNumber(trimLength);
    const safeTrimCoats = Math.floor(clampNumber(trimCoats));

    const openingArea =
      safeDoorCount * safeDoorWidth * safeDoorHeight +
      safeWindowCount * safeWindowWidth * safeWindowHeight;

    let grossWallArea = 0;
    let grossCeilingArea = 0;

    if (calculationMode === "interior") {
      grossWallArea =
        2 *
        (safeRoomLength + safeRoomWidth) *
        safeWallHeight *
        safeNumberOfRooms;

      grossCeilingArea = includeCeiling
        ? safeRoomLength *
          safeRoomWidth *
          safeNumberOfRooms
        : 0;
    } else if (calculationMode === "exterior") {
      grossWallArea =
        2 *
        (safeBuildingLength + safeBuildingWidth) *
        safeExteriorWallHeight;
    } else {
      grossWallArea = safeKnownWallArea;
      grossCeilingArea = safeKnownCeilingArea;
    }

    const applicableOpeningArea =
      calculationMode === "known-area"
        ? 0
        : Math.min(openingArea, grossWallArea);

    const netWallArea = Math.max(
      grossWallArea - applicableOpeningArea,
      0,
    );

    const wallCoatedArea =
      netWallArea * safeWallCoats * safeWasteMultiplier;

    const ceilingCoatedArea =
      grossCeilingArea *
      safeCeilingCoats *
      safeWasteMultiplier;

    const primerCoatedArea =
      (netWallArea + grossCeilingArea) *
      safePrimerCoats *
      safeWasteMultiplier;

    const trimCoatedLength =
      safeTrimLength * safeTrimCoats * safeWasteMultiplier;

    const wallPurchase = calculatePurchaseQuantity(
      wallCoatedArea,
      clampNumber(wallCoveragePerGallon),
    );

    const ceilingPurchase = calculatePurchaseQuantity(
      ceilingCoatedArea,
      clampNumber(ceilingCoveragePerGallon),
    );

    const trimPurchase = calculatePurchaseQuantity(
      trimCoatedLength,
      clampNumber(trimCoveragePerGallon),
    );

    const primerExactGallons =
      primerCoatedArea > 0 &&
      clampNumber(primerCoveragePerGallon) > 0
        ? primerCoatedArea /
          clampNumber(primerCoveragePerGallon)
        : 0;

    const primerGallons =
      primerExactGallons > 0
        ? Math.ceil(primerExactGallons)
        : 0;

    const wallPaintCost =
      wallPurchase.gallons * clampNumber(wallGallonPrice) +
      wallPurchase.quarts * clampNumber(wallQuartPrice);

    const ceilingPaintCost =
      ceilingPurchase.gallons *
        clampNumber(ceilingGallonPrice) +
      ceilingPurchase.quarts *
        clampNumber(ceilingQuartPrice);

    const trimPaintCost =
      trimPurchase.gallons * clampNumber(trimGallonPrice) +
      trimPurchase.quarts * clampNumber(trimQuartPrice);

    const primerCost =
      primerGallons * clampNumber(primerGallonPrice);

    const safeSuppliesCost = clampNumber(suppliesCost);
    const safeDeliveryFee = clampNumber(deliveryFee);
    const safeAdditionalFees = clampNumber(additionalFees);
    const safeSalesTaxRate = clampNumber(salesTaxRate);

    const materialSubtotal =
      wallPaintCost +
      ceilingPaintCost +
      trimPaintCost +
      primerCost +
      safeSuppliesCost;

    const estimatedTax =
      materialSubtotal * (safeSalesTaxRate / 100);

    const estimatedMaterialTotal =
      materialSubtotal +
      estimatedTax +
      safeDeliveryFee +
      safeAdditionalFees;

    const totalBaseArea = netWallArea + grossCeilingArea;

    const costPerSquareFoot =
      totalBaseArea > 0
        ? estimatedMaterialTotal / totalBaseArea
        : 0;

    const notes: string[] = [];

    if (totalBaseArea === 0) {
      notes.push(
        "Enter a paintable wall or ceiling area greater than zero.",
      );
    }

    if (
      wallCoatedArea > 0 &&
      clampNumber(wallCoveragePerGallon) === 0
    ) {
      notes.push(
        "Enter wall-paint coverage greater than zero.",
      );
    }

    if (
      ceilingCoatedArea > 0 &&
      clampNumber(ceilingCoveragePerGallon) === 0
    ) {
      notes.push(
        "Enter ceiling-paint coverage greater than zero.",
      );
    }

    if (
      primerCoatedArea > 0 &&
      clampNumber(primerCoveragePerGallon) === 0
    ) {
      notes.push(
        "Enter primer coverage greater than zero.",
      );
    }

    if (safeWastePercent < 5) {
      notes.push(
        "The waste allowance is low. Texture, touch-ups, spills, color changes, and surface porosity can increase paint requirements.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "Verify product coverage, required coats, surface condition, and current supplier pricing before purchasing.",
      );
    }

    return {
      safeWastePercent,
      safeWallCoats,
      safeCeilingCoats,
      safePrimerCoats,
      safeTrimCoats,
      grossWallArea,
      grossCeilingArea,
      openingArea: applicableOpeningArea,
      netWallArea,
      totalBaseArea,
      wallCoatedArea,
      ceilingCoatedArea,
      primerCoatedArea,
      trimCoatedLength,
      wallPurchase,
      ceilingPurchase,
      trimPurchase,
      primerExactGallons,
      primerGallons,
      wallPaintCost,
      ceilingPaintCost,
      trimPaintCost,
      primerCost,
      safeSuppliesCost,
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
    roomLength,
    roomWidth,
    wallHeight,
    numberOfRooms,
    includeCeiling,
    buildingLength,
    buildingWidth,
    exteriorWallHeight,
    knownWallArea,
    knownCeilingArea,
    doorCount,
    doorWidth,
    doorHeight,
    windowCount,
    windowWidth,
    windowHeight,
    wallCoats,
    ceilingCoats,
    primerCoats,
    wastePercent,
    trimLength,
    trimCoats,
    trimCoveragePerGallon,
    wallCoveragePerGallon,
    ceilingCoveragePerGallon,
    primerCoveragePerGallon,
    wallGallonPrice,
    wallQuartPrice,
    ceilingGallonPrice,
    ceilingQuartPrice,
    trimGallonPrice,
    trimQuartPrice,
    primerGallonPrice,
    suppliesCost,
    deliveryFee,
    additionalFees,
    salesTaxRate,
  ]);

  async function copyResults() {
    const text = [
      "Numeravo Paint Calculator",
      `Calculation mode: ${
        calculationMode === "interior"
          ? "Interior room"
          : calculationMode === "exterior"
            ? "Exterior building"
            : "Known paintable area"
      }`,
      `Gross wall area: ${formatNumber(result.grossWallArea)} sq ft`,
      `Opening deduction: ${formatNumber(result.openingArea)} sq ft`,
      `Net wall area: ${formatNumber(result.netWallArea)} sq ft`,
      `Ceiling area: ${formatNumber(result.grossCeilingArea)} sq ft`,
      `Waste allowance: ${formatNumber(result.safeWastePercent)}%`,
      `Wall paint: ${result.wallPurchase.gallons} gal + ${result.wallPurchase.quarts} qt`,
      `Ceiling paint: ${result.ceilingPurchase.gallons} gal + ${result.ceilingPurchase.quarts} qt`,
      `Trim paint: ${result.trimPurchase.gallons} gal + ${result.trimPurchase.quarts} qt`,
      `Primer: ${result.primerGallons} gal`,
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
          Paint project details
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Measure the paintable surfaces, select the number of
          coats, and enter product coverage and current pricing.
        </p>

        <div className="mt-6">
          <SelectInput
            label="Calculation mode"
            value={calculationMode}
            onChange={(value) =>
              setCalculationMode(value as CalculationMode)
            }
            options={[
              { value: "interior", label: "Interior room" },
              { value: "exterior", label: "Exterior building" },
              { value: "known-area", label: "Known paintable area" },
            ]}
          />
        </div>

        {calculationMode === "interior" ? (
          <InputSection title="Interior room dimensions">
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
                label="Wall height"
                value={wallHeight}
                onChange={setWallHeight}
                suffix="ft"
              />
              <NumberInput
                label="Identical rooms"
                value={numberOfRooms}
                onChange={setNumberOfRooms}
                suffix="rooms"
                integer
              />
            </div>

            <label className="mt-4 flex items-center gap-3 text-sm text-[#A0AEC0]">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(event) =>
                  setIncludeCeiling(event.target.checked)
                }
                className="h-4 w-4 accent-orange-500"
              />
              Include ceiling
            </label>
          </InputSection>
        ) : null}

        {calculationMode === "exterior" ? (
          <InputSection title="Exterior building dimensions">
            <div className="grid gap-4 sm:grid-cols-2">
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
                label="Exterior wall height"
                value={exteriorWallHeight}
                onChange={setExteriorWallHeight}
                suffix="ft"
              />
            </div>
          </InputSection>
        ) : null}

        {calculationMode === "known-area" ? (
          <InputSection title="Known paintable area">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Wall area"
                value={knownWallArea}
                onChange={setKnownWallArea}
                suffix="sq ft"
              />
              <NumberInput
                label="Ceiling area"
                value={knownCeilingArea}
                onChange={setKnownCeilingArea}
                suffix="sq ft"
              />
            </div>
          </InputSection>
        ) : null}

        {calculationMode !== "known-area" ? (
          <InputSection title="Door and window deductions">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Doors"
                value={doorCount}
                onChange={setDoorCount}
                suffix="doors"
                integer
              />
              <NumberInput
                label="Door width"
                value={doorWidth}
                onChange={setDoorWidth}
                suffix="ft"
              />
              <NumberInput
                label="Door height"
                value={doorHeight}
                onChange={setDoorHeight}
                suffix="ft"
              />
              <NumberInput
                label="Windows"
                value={windowCount}
                onChange={setWindowCount}
                suffix="windows"
                integer
              />
              <NumberInput
                label="Window width"
                value={windowWidth}
                onChange={setWindowWidth}
                suffix="ft"
              />
              <NumberInput
                label="Window height"
                value={windowHeight}
                onChange={setWindowHeight}
                suffix="ft"
              />
            </div>
          </InputSection>
        ) : null}

        <InputSection title="Coats and waste">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Wall coats"
              value={wallCoats}
              onChange={setWallCoats}
              suffix="coats"
              integer
            />
            <NumberInput
              label="Ceiling coats"
              value={ceilingCoats}
              onChange={setCeilingCoats}
              suffix="coats"
              integer
            />
            <NumberInput
              label="Primer coats"
              value={primerCoats}
              onChange={setPrimerCoats}
              suffix="coats"
              integer
            />
            <NumberInput
              label="Waste allowance"
              value={wastePercent}
              onChange={setWastePercent}
              suffix="%"
            />
            <NumberInput
              label="Trim length"
              value={trimLength}
              onChange={setTrimLength}
              suffix="lin ft"
            />
            <NumberInput
              label="Trim coats"
              value={trimCoats}
              onChange={setTrimCoats}
              suffix="coats"
              integer
            />
          </div>
        </InputSection>

        <InputSection title="Product coverage">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Wall paint coverage"
              value={wallCoveragePerGallon}
              onChange={setWallCoveragePerGallon}
              suffix="sq ft/gal"
            />
            <NumberInput
              label="Ceiling paint coverage"
              value={ceilingCoveragePerGallon}
              onChange={setCeilingCoveragePerGallon}
              suffix="sq ft/gal"
            />
            <NumberInput
              label="Primer coverage"
              value={primerCoveragePerGallon}
              onChange={setPrimerCoveragePerGallon}
              suffix="sq ft/gal"
            />
            <NumberInput
              label="Trim paint coverage"
              value={trimCoveragePerGallon}
              onChange={setTrimCoveragePerGallon}
              suffix="lin ft/gal"
            />
          </div>
        </InputSection>

        <InputSection title="Supplier pricing">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Wall paint per gallon"
              value={wallGallonPrice}
              onChange={setWallGallonPrice}
              prefix="$"
            />
            <NumberInput
              label="Wall paint per quart"
              value={wallQuartPrice}
              onChange={setWallQuartPrice}
              prefix="$"
            />
            <NumberInput
              label="Ceiling paint per gallon"
              value={ceilingGallonPrice}
              onChange={setCeilingGallonPrice}
              prefix="$"
            />
            <NumberInput
              label="Ceiling paint per quart"
              value={ceilingQuartPrice}
              onChange={setCeilingQuartPrice}
              prefix="$"
            />
            <NumberInput
              label="Trim paint per gallon"
              value={trimGallonPrice}
              onChange={setTrimGallonPrice}
              prefix="$"
            />
            <NumberInput
              label="Trim paint per quart"
              value={trimQuartPrice}
              onChange={setTrimQuartPrice}
              prefix="$"
            />
            <NumberInput
              label="Primer per gallon"
              value={primerGallonPrice}
              onChange={setPrimerGallonPrice}
              prefix="$"
            />
            <NumberInput
              label="Supplies"
              value={suppliesCost}
              onChange={setSuppliesCost}
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
              label="Sales tax"
              value={salesTaxRate}
              onChange={setSalesTaxRate}
              suffix="%"
            />
          </div>
        </InputSection>

        <div className="mt-6 rounded-2xl border border-orange-500/50 bg-orange-500/10 p-5">
          <h3 className="font-semibold text-orange-300">
            Coverage guidance
          </h3>
          <p className="mt-3 leading-7 text-[#A0AEC0]">
            Coverage varies by paint, surface texture, porosity,
            application method, color change, and manufacturer.
            Enter the coverage printed on the exact product.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">
          Results
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Paint material estimate
        </h2>
        <p className="mt-3 leading-7 text-[#A0AEC0]">
          Review paintable area, coats, whole-container quantities,
          and estimated material cost.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Estimated material total"
            value={formatCurrency(result.estimatedMaterialTotal)}
            featured
          />
          <ResultCard
            label="Net wall area"
            value={`${formatNumber(result.netWallArea)} sq ft`}
          />
          <ResultCard
            label="Wall paint"
            value={`${result.wallPurchase.gallons} gal + ${result.wallPurchase.quarts} qt`}
          />
          <ResultCard
            label="Primer"
            value={`${result.primerGallons} gal`}
          />
          <ResultCard
            label="Ceiling paint"
            value={`${result.ceilingPurchase.gallons} gal + ${result.ceilingPurchase.quarts} qt`}
          />
          <ResultCard
            label="Trim paint"
            value={`${result.trimPurchase.gallons} gal + ${result.trimPurchase.quarts} qt`}
          />
        </div>

        <ResultSection title="Surface calculations">
          <ResultRow
            label="Gross wall area"
            value={`${formatNumber(result.grossWallArea)} sq ft`}
          />
          <ResultRow
            label="Opening deduction"
            value={`${formatNumber(result.openingArea)} sq ft`}
          />
          <ResultRow
            label="Net wall area"
            value={`${formatNumber(result.netWallArea)} sq ft`}
          />
          <ResultRow
            label="Ceiling area"
            value={`${formatNumber(result.grossCeilingArea)} sq ft`}
          />
          <ResultRow
            label="Total base area"
            value={`${formatNumber(result.totalBaseArea)} sq ft`}
          />
          <ResultRow
            label="Waste allowance"
            value={`${formatNumber(result.safeWastePercent)}%`}
          />
        </ResultSection>

        <ResultSection title="Paint quantities">
          <PurchaseRows
            label="Wall paint"
            purchase={result.wallPurchase}
          />
          <PurchaseRows
            label="Ceiling paint"
            purchase={result.ceilingPurchase}
          />
          <PurchaseRows
            label="Trim paint"
            purchase={result.trimPurchase}
          />
          <ResultRow
            label="Exact primer required"
            value={`${formatNumber(result.primerExactGallons)} gal`}
          />
          <ResultRow
            label="Primer to purchase"
            value={`${result.primerGallons} gal`}
          />
        </ResultSection>

        <ResultSection title="Cost breakdown">
          <ResultRow
            label="Wall paint"
            value={formatCurrency(result.wallPaintCost)}
          />
          <ResultRow
            label="Ceiling paint"
            value={formatCurrency(result.ceilingPaintCost)}
          />
          <ResultRow
            label="Trim paint"
            value={formatCurrency(result.trimPaintCost)}
          />
          <ResultRow
            label="Primer"
            value={formatCurrency(result.primerCost)}
          />
          <ResultRow
            label="Supplies"
            value={formatCurrency(result.safeSuppliesCost)}
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
            value={formatCurrency(result.estimatedMaterialTotal)}
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

function PurchaseRows({
  label,
  purchase,
}: {
  label: string;
  purchase: PurchaseQuantity;
}) {
  return (
    <>
      <ResultRow
        label={`${label} required`}
        value={`${formatNumber(purchase.exactGallons)} gal`}
      />
      <ResultRow
        label={`${label} to purchase`}
        value={`${purchase.gallons} gal + ${purchase.quarts} qt`}
      />
      <ResultRow
        label={`${label} purchased volume`}
        value={`${formatNumber(purchase.purchasedGallons)} gal`}
      />
    </>
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
