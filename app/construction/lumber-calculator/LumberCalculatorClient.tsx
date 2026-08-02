"use client";

import { useMemo, useState } from "react";

type LumberSize =
  | "1×4"
  | "1×6"
  | "1×8"
  | "2×4"
  | "2×6"
  | "2×8"
  | "2×10"
  | "2×12"
  | "4×4"
  | "6×6"
  | "Custom";

type LumberSpecies =
  | "SPF (Spruce-Pine-Fir)"
  | "Southern Yellow Pine"
  | "Douglas Fir"
  | "Cedar"
  | "Redwood"
  | "Hardwood"
  | "Other";

type LumberGrade =
  | "Stud"
  | "No. 2"
  | "No. 1"
  | "Select Structural"
  | "Appearance"
  | "Ungraded / Other";

type LumberTreatment =
  | "Untreated"
  | "Pressure-treated"
  | "Ground-contact"
  | "Kiln-dried"
  | "Other";

type PricingMethod =
  | "Per board"
  | "Per linear foot"
  | "Per board foot"
  | "Per package";

const lumberSizes: Record<
  Exclude<LumberSize, "Custom">,
  { thickness: number; width: number }
> = {
  "1×4": { thickness: 1, width: 4 },
  "1×6": { thickness: 1, width: 6 },
  "1×8": { thickness: 1, width: 8 },
  "2×4": { thickness: 2, width: 4 },
  "2×6": { thickness: 2, width: 6 },
  "2×8": { thickness: 2, width: 8 },
  "2×10": { thickness: 2, width: 10 },
  "2×12": { thickness: 2, width: 12 },
  "4×4": { thickness: 4, width: 4 },
  "6×6": { thickness: 6, width: 6 },
};

function clampNumber(value: number, fallback = 0) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
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

export default function LumberCalculatorClient() {
  const [lumberSize, setLumberSize] = useState<LumberSize>("2×4");
  const [species, setSpecies] =
    useState<LumberSpecies>("SPF (Spruce-Pine-Fir)");
  const [grade, setGrade] = useState<LumberGrade>("No. 2");
  const [treatment, setTreatment] =
    useState<LumberTreatment>("Untreated");
  const [customThickness, setCustomThickness] = useState(2);
  const [customWidth, setCustomWidth] = useState(4);
  const [boardLength, setBoardLength] = useState(8);
  const [quantity, setQuantity] = useState(20);
  const [wastePercent, setWastePercent] = useState(10);
  const [pricingMethod, setPricingMethod] =
    useState<PricingMethod>("Per board");
  const [unitPrice, setUnitPrice] = useState(0);
  const [piecesPerPackage, setPiecesPerPackage] = useState(20);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [priceSource, setPriceSource] = useState("");
  const [priceDate, setPriceDate] = useState("");

  const result = useMemo(() => {
    const dimensions =
      lumberSize === "Custom"
        ? {
            thickness: clampNumber(customThickness),
            width: clampNumber(customWidth),
          }
        : lumberSizes[lumberSize];

    const safeLength = clampNumber(boardLength);
    const safeQuantity = Math.ceil(clampNumber(quantity));
    const safeWaste = clampNumber(wastePercent);
    const safeUnitPrice = clampNumber(unitPrice);
    const safeDiscountPercent = clampNumber(discountPercent);
    const safeDeliveryFee = clampNumber(deliveryFee);
    const safeAdditionalFees = clampNumber(additionalFees);
    const safeTaxRate = clampNumber(taxRate);
    const safePiecesPerPackage = Math.max(
      Math.floor(clampNumber(piecesPerPackage, 1)),
      1,
    );

    const piecesNeededWithWaste = Math.ceil(
      safeQuantity * (1 + safeWaste / 100),
    );

    const packagesRequired =
      pricingMethod === "Per package"
        ? Math.ceil(piecesNeededWithWaste / safePiecesPerPackage)
        : 0;

    const purchasePieces =
      pricingMethod === "Per package"
        ? packagesRequired * safePiecesPerPackage
        : piecesNeededWithWaste;

    const additionalPieces = Math.max(purchasePieces - safeQuantity, 0);
    const packageOverage = Math.max(
      purchasePieces - piecesNeededWithWaste,
      0,
    );

    const linearFeetBeforeWaste = safeQuantity * safeLength;
    const totalLinearFeet = purchasePieces * safeLength;

    const boardFeetPerPiece =
      (dimensions.thickness * dimensions.width * safeLength) / 12;
    const boardFeetBeforeWaste = boardFeetPerPiece * safeQuantity;
    const totalBoardFeet = boardFeetPerPiece * purchasePieces;

    let baseMaterialCost = 0;
    let totalMaterialCost = 0;

    if (pricingMethod === "Per board") {
      baseMaterialCost = safeQuantity * safeUnitPrice;
      totalMaterialCost = purchasePieces * safeUnitPrice;
    } else if (pricingMethod === "Per linear foot") {
      baseMaterialCost = linearFeetBeforeWaste * safeUnitPrice;
      totalMaterialCost = totalLinearFeet * safeUnitPrice;
    } else if (pricingMethod === "Per board foot") {
      baseMaterialCost = boardFeetBeforeWaste * safeUnitPrice;
      totalMaterialCost = totalBoardFeet * safeUnitPrice;
    } else {
      const basePackages = Math.ceil(
        safeQuantity / safePiecesPerPackage,
      );
      baseMaterialCost = basePackages * safeUnitPrice;
      totalMaterialCost = packagesRequired * safeUnitPrice;
    }

    const allowanceAndRoundingCost = Math.max(
      totalMaterialCost - baseMaterialCost,
      0,
    );

    const discountAmount =
      totalMaterialCost * (safeDiscountPercent / 100);
    const discountedMaterialCost = Math.max(
      totalMaterialCost - discountAmount,
      0,
    );
    const subtotalBeforeTax =
      discountedMaterialCost + safeDeliveryFee + safeAdditionalFees;
    const estimatedTax = subtotalBeforeTax * (safeTaxRate / 100);
    const deliveredTotal = subtotalBeforeTax + estimatedTax;

    const costPerBoardFoot =
      totalBoardFeet > 0 ? totalMaterialCost / totalBoardFeet : 0;
    const deliveredCostPerBoardFoot =
      totalBoardFeet > 0 ? deliveredTotal / totalBoardFeet : 0;

    const notes: string[] = [];

    if (safeWaste < 5) {
      notes.push(
        "The waste allowance is low. Cuts, defects, sorting, and field changes may require additional pieces.",
      );
    }

    if (safeLength > 16) {
      notes.push(
        "Long boards may have limited availability and higher delivery or handling costs.",
      );
    }

    if (lumberSize === "Custom") {
      notes.push(
        "Custom dimensions are calculated from the thickness and width entered below.",
      );
    }

    if (pricingMethod === "Per package" && packageOverage > 0) {
      notes.push(
        `Package rounding adds ${packageOverage} board${packageOverage === 1 ? "" : "s"} beyond the quantity required after waste.`,
      );
    }

    if (safeUnitPrice === 0) {
      notes.push(
        "Enter the current supplier price for the exact size, length, species, grade, and treatment selected.",
      );
    }

    if (safeQuantity === 0 || safeLength === 0) {
      notes.push(
        "Enter a board quantity and length greater than zero to generate a complete estimate.",
      );
    }

    if (notes.length === 0) {
      notes.push(
        "This estimate uses whole-board rounding and the selected supplier pricing method.",
      );
    }

    return {
      thickness: dimensions.thickness,
      width: dimensions.width,
      safeQuantity,
      safeLength,
      safeWaste,
      safeUnitPrice,
      safePiecesPerPackage,
      piecesNeededWithWaste,
      packagesRequired,
      purchasePieces,
      additionalPieces,
      packageOverage,
      linearFeetBeforeWaste,
      totalLinearFeet,
      boardFeetPerPiece,
      boardFeetBeforeWaste,
      totalBoardFeet,
      baseMaterialCost,
      allowanceAndRoundingCost,
      totalMaterialCost,
      safeDiscountPercent,
      discountAmount,
      discountedMaterialCost,
      safeDeliveryFee,
      safeAdditionalFees,
      safeTaxRate,
      subtotalBeforeTax,
      estimatedTax,
      deliveredTotal,
      costPerBoardFoot,
      deliveredCostPerBoardFoot,
      notes,
    };
  }, [
    lumberSize,
    customThickness,
    customWidth,
    boardLength,
    quantity,
    wastePercent,
    pricingMethod,
    unitPrice,
    piecesPerPackage,
    discountPercent,
    deliveryFee,
    additionalFees,
    taxRate,
  ]);

  function copyResults() {
    const summary = [
      "Lumber Estimate",
      `Lumber size: ${lumberSize}`,
      `Species: ${species}`,
      `Grade: ${grade}`,
      `Treatment: ${treatment}`,
      `Dimensions used: ${formatNumber(result.thickness)} in × ${formatNumber(result.width)} in`,
      `Board length: ${formatNumber(result.safeLength)} ft`,
      `Required pieces: ${formatNumber(result.safeQuantity, 0)}`,
      `Waste allowance: ${formatNumber(result.safeWaste)}%`,
      `Additional pieces purchased: ${formatNumber(result.additionalPieces, 0)}`,
      `Recommended purchase quantity: ${formatNumber(result.purchasePieces, 0)}`,
      `Total linear feet: ${formatNumber(result.totalLinearFeet)} ft`,
      `Board feet per piece: ${formatNumber(result.boardFeetPerPiece)}`,
      `Total board feet: ${formatNumber(result.totalBoardFeet)}`,
      `Pricing method: ${pricingMethod}`,
      `Supplier unit price: ${formatCurrency(result.safeUnitPrice)}`,
      `Price source: ${priceSource || "Not provided"}`,
      `Price checked: ${priceDate || "Not provided"}`,
      `Material cost: ${formatCurrency(result.totalMaterialCost)}`,
      `Supplier discount: -${formatCurrency(result.discountAmount)}`,
      `Delivery fee: ${formatCurrency(result.safeDeliveryFee)}`,
      `Additional fees: ${formatCurrency(result.safeAdditionalFees)}`,
      `Subtotal before tax: ${formatCurrency(result.subtotalBeforeTax)}`,
      `Estimated tax: ${formatCurrency(result.estimatedTax)}`,
      `Estimated delivered total: ${formatCurrency(result.deliveredTotal)}`,
      `Delivered cost per board foot: ${formatCurrency(result.deliveredCostPerBoardFoot)}`,
    ].join("\n");

    navigator.clipboard?.writeText(summary);
  }

  return (
    <section className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8 lg:sticky lg:top-24">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Inputs
          </p>
          <h2 className="text-2xl font-bold">Lumber estimate details</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Select the exact lumber product, board length, required
            quantity, waste allowance, and supplier pricing method.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          <SelectInput
            label="Lumber size"
            value={lumberSize}
            onChange={(value) => setLumberSize(value as LumberSize)}
            options={[...Object.keys(lumberSizes), "Custom"]}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectInput
              label="Species"
              value={species}
              onChange={(value) => setSpecies(value as LumberSpecies)}
              options={[
                "SPF (Spruce-Pine-Fir)",
                "Southern Yellow Pine",
                "Douglas Fir",
                "Cedar",
                "Redwood",
                "Hardwood",
                "Other",
              ]}
            />
            <SelectInput
              label="Grade"
              value={grade}
              onChange={(value) => setGrade(value as LumberGrade)}
              options={[
                "Stud",
                "No. 2",
                "No. 1",
                "Select Structural",
                "Appearance",
                "Ungraded / Other",
              ]}
            />
          </div>

          <SelectInput
            label="Treatment"
            value={treatment}
            onChange={(value) =>
              setTreatment(value as LumberTreatment)
            }
            options={[
              "Untreated",
              "Pressure-treated",
              "Ground-contact",
              "Kiln-dried",
              "Other",
            ]}
          />

          {lumberSize === "Custom" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Custom thickness"
                suffix="in"
                value={customThickness}
                onChange={setCustomThickness}
              />
              <NumberInput
                label="Custom width"
                suffix="in"
                value={customWidth}
                onChange={setCustomWidth}
              />
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Board length"
              suffix="ft"
              value={boardLength}
              onChange={setBoardLength}
            />
            <NumberInput
              label="Required pieces"
              suffix="pcs"
              value={quantity}
              onChange={setQuantity}
            />
          </div>

          <NumberInput
            label="Waste allowance"
            suffix="%"
            value={wastePercent}
            onChange={setWastePercent}
          />

          <SelectInput
            label="Supplier pricing method"
            value={pricingMethod}
            onChange={(value) =>
              setPricingMethod(value as PricingMethod)
            }
            options={[
              "Per board",
              "Per linear foot",
              "Per board foot",
              "Per package",
            ]}
          />

          {pricingMethod === "Per package" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Boards per package"
                suffix="pcs"
                value={piecesPerPackage}
                onChange={setPiecesPerPackage}
              />
              <NumberInput
                label="Price per package"
                prefix="$"
                suffix="/pkg"
                value={unitPrice}
                onChange={setUnitPrice}
              />
            </div>
          ) : (
            <NumberInput
              label={
                pricingMethod === "Per board"
                  ? "Price per board"
                  : pricingMethod === "Per linear foot"
                    ? "Price per linear foot"
                    : "Price per board foot"
              }
              prefix="$"
              suffix={
                pricingMethod === "Per board"
                  ? "/board"
                  : pricingMethod === "Per linear foot"
                    ? "/lin ft"
                    : "/bd ft"
              }
              value={unitPrice}
              onChange={setUnitPrice}
            />
          )}

          <p className="-mt-2 text-xs leading-5 text-[#A0AEC0]">
            Enter the current supplier price for the exact size, length,
            species, grade, and treatment selected.
          </p>

          <div className="rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
            <h3 className="font-semibold">Delivered-cost details</h3>
            <p className="mt-2 text-sm leading-6 text-[#A0AEC0]">
              Add supplier discounts, delivery, fees, and tax when you need a
              more complete project cost.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Supplier discount"
                suffix="%"
                value={discountPercent}
                onChange={setDiscountPercent}
              />
              <NumberInput
                label="Sales tax"
                suffix="%"
                value={taxRate}
                onChange={setTaxRate}
              />
              <NumberInput
                label="Delivery fee"
                prefix="$"
                value={deliveryFee}
                onChange={setDeliveryFee}
              />
              <NumberInput
                label="Additional fees"
                prefix="$"
                value={additionalFees}
                onChange={setAdditionalFees}
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-[#A0AEC0]">
              Estimated tax is applied to discounted materials, delivery, and
              additional fees. Confirm taxable charges and rates with the
              supplier or applicable tax authority.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextInput
                label="Price source"
                placeholder="Supplier or store"
                value={priceSource}
                onChange={setPriceSource}
              />
              <TextInput
                label="Price checked"
                type="date"
                value={priceDate}
                onChange={setPriceDate}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-orange-400/40 bg-orange-400/10 p-5">
            <h3 className="font-semibold text-orange-300">
              Board-foot formula
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#A0AEC0]">
              Board feet per piece = thickness in inches × width in inches ×
              length in feet ÷ 12. Presets use nominal lumber dimensions.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Results
          </p>
          <h2 className="text-2xl font-bold">Lumber material estimate</h2>
          <p className="text-sm leading-6 text-[#A0AEC0]">
            Review the purchase quantity, linear feet, board feet, waste, and
            estimated material cost.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard
            label="Purchase quantity"
            value={`${formatNumber(result.purchasePieces, 0)} pcs`}
            highlight
          />
          <ResultCard
            label="Total linear feet"
            value={`${formatNumber(result.totalLinearFeet)} ft`}
          />
          <ResultCard
            label="Total board feet"
            value={`${formatNumber(result.totalBoardFeet)} bd ft`}
          />
          <ResultCard
            label="Delivered total"
            value={formatCurrency(result.deliveredTotal)}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Board details</h3>
          <div className="mt-4 space-y-3">
            <ResultRow label="Selected size" value={lumberSize} />
            <ResultRow label="Species" value={species} />
            <ResultRow label="Grade" value={grade} />
            <ResultRow label="Treatment" value={treatment} />
            <ResultRow
              label="Dimensions used"
              value={`${formatNumber(result.thickness)} in × ${formatNumber(result.width)} in`}
            />
            <ResultRow
              label="Board length"
              value={`${formatNumber(result.safeLength)} ft`}
            />
            <ResultRow
              label="Board feet per piece"
              value={`${formatNumber(result.boardFeetPerPiece)} bd ft`}
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5">
          <h3 className="font-semibold">Quantity and cost</h3>
          <div className="mt-4 space-y-3">
            <ResultRow
              label="Required pieces"
              value={`${formatNumber(result.safeQuantity, 0)} pcs`}
            />
            <ResultRow
              label="Additional pieces purchased"
              value={`${formatNumber(result.additionalPieces, 0)} pcs`}
            />
            <ResultRow
              label="Purchase quantity"
              value={`${formatNumber(result.purchasePieces, 0)} pcs`}
            />
            <ResultRow
              label="Linear feet before waste"
              value={`${formatNumber(result.linearFeetBeforeWaste)} ft`}
            />
            <ResultRow
              label="Total linear feet"
              value={`${formatNumber(result.totalLinearFeet)} ft`}
            />
            <ResultRow
              label="Board feet before waste"
              value={`${formatNumber(result.boardFeetBeforeWaste)} bd ft`}
            />
            <ResultRow
              label="Total board feet"
              value={`${formatNumber(result.totalBoardFeet)} bd ft`}
            />
            <ResultRow
              label="Pricing method"
              value={pricingMethod}
            />
            <ResultRow
              label="Supplier unit price"
              value={formatCurrency(result.safeUnitPrice)}
            />
            {pricingMethod === "Per package" ? (
              <>
                <ResultRow
                  label="Boards per package"
                  value={`${formatNumber(result.safePiecesPerPackage, 0)} pcs`}
                />
                <ResultRow
                  label="Packages required"
                  value={`${formatNumber(result.packagesRequired, 0)} pkg`}
                />
                <ResultRow
                  label="Package overage"
                  value={`${formatNumber(result.packageOverage, 0)} pcs`}
                />
              </>
            ) : null}
            <ResultRow
              label="Base material cost"
              value={formatCurrency(result.baseMaterialCost)}
            />
            <ResultRow
              label="Allowance and rounding cost"
              value={formatCurrency(result.allowanceAndRoundingCost)}
            />
            <ResultRow
              label="Material cost"
              value={formatCurrency(result.totalMaterialCost)}
            />
            <ResultRow
              label="Supplier discount"
              value={`-${formatCurrency(result.discountAmount)}`}
            />
            <ResultRow
              label="Discounted material cost"
              value={formatCurrency(result.discountedMaterialCost)}
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
              label="Subtotal before tax"
              value={formatCurrency(result.subtotalBeforeTax)}
            />
            <ResultRow
              label={`Estimated tax (${formatNumber(result.safeTaxRate)}%)`}
              value={formatCurrency(result.estimatedTax)}
            />
            <ResultRow
              label="Estimated delivered total"
              value={formatCurrency(result.deliveredTotal)}
            />
            <ResultRow
              label="Material cost per board foot"
              value={formatCurrency(result.costPerBoardFoot)}
            />
            <ResultRow
              label="Delivered cost per board foot"
              value={formatCurrency(result.deliveredCostPerBoardFoot)}
            />
            <ResultRow
              label="Price source"
              value={priceSource || "Not provided"}
            />
            <ResultRow
              label="Price checked"
              value={priceDate || "Not provided"}
            />
          </div>
        </div>

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
          className="mt-6 w-full rounded-2xl bg-orange-400 px-5 py-4 text-sm font-bold text-[#0B0F19] transition hover:bg-orange-300"
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
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">
        {label}
      </span>
      <div className="flex overflow-hidden rounded-2xl border border-[#1F2937] bg-[#0B0F19] focus-within:border-orange-400">
        {prefix ? (
          <span className="flex items-center px-3 text-sm text-[#A0AEC0]">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => onChange(Number(event.target.value))}
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

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date";
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#1F2937] bg-[#121826] px-4 py-3 text-white outline-none transition placeholder:text-[#A0AEC0]/60 focus:border-orange-400"
      />
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
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#A0AEC0]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#1F2937] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-orange-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-orange-400 bg-orange-400 text-[#0B0F19]"
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-[#A0AEC0]">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}
