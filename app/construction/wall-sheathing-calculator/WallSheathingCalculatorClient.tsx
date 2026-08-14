"use client";

import { useMemo, useState } from "react";

type AreaMode = "dimensions" | "known";
type LengthUnit = "ft" | "in";
type LengthKey =
  | "wallLength"
  | "wallHeight"
  | "doorWidth"
  | "doorHeight"
  | "windowWidth"
  | "windowHeight"
  | "panelWidth"
  | "panelLength";
const n = (value: string) => { const parsed = Number(value); return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0; };
const ceil = (value: number) => value > 0 ? Math.ceil(value) : 0;
const fmt = (value: number, digits = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
const usd = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
const qty = (value: number, one: string, many = `${one}s`) => `${fmt(value, 0)} ${value === 1 ? one : many}`;

export default function WallSheathingCalculatorClient() {
  const [mode, setMode] = useState<AreaMode>("dimensions");
  const [wallLength, setWallLength] = useState("40");
  const [wallHeight, setWallHeight] = useState("8");
  const [wallQuantity, setWallQuantity] = useState("1");
  const [knownArea, setKnownArea] = useState("320");
  const [doorCount, setDoorCount] = useState("1");
  const [doorWidth, setDoorWidth] = useState("3");
  const [doorHeight, setDoorHeight] = useState("6.67");
  const [windowCount, setWindowCount] = useState("2");
  const [windowWidth, setWindowWidth] = useState("3");
  const [windowHeight, setWindowHeight] = useState("4");
  const [panelWidth, setPanelWidth] = useState("4");
  const [panelLength, setPanelLength] = useState("8");
  const [lengthUnits, setLengthUnits] = useState<Record<LengthKey, LengthUnit>>({
    wallLength: "ft",
    wallHeight: "ft",
    doorWidth: "ft",
    doorHeight: "ft",
    windowWidth: "ft",
    windowHeight: "ft",
    panelWidth: "ft",
    panelLength: "ft",
  });
  const [waste, setWaste] = useState("10");
  const [fastenersPerPanel, setFastenersPerPanel] = useState("50");
  const [fastenersPerBox, setFastenersPerBox] = useState("1000");
  const [housewrapCoverage, setHousewrapCoverage] = useState("1000");
  const [housewrapWaste, setHousewrapWaste] = useState("10");
  const [tapeCoverage, setTapeCoverage] = useState("165");
  const [tapePerPanel, setTapePerPanel] = useState("24");
  const [panelPrice, setPanelPrice] = useState("35");
  const [fastenerBoxPrice, setFastenerBoxPrice] = useState("45");
  const [housewrapRollPrice, setHousewrapRollPrice] = useState("175");
  const [tapeRollPrice, setTapeRollPrice] = useState("18");
  const [deliveryFee, setDeliveryFee] = useState("0");
  const [additionalFees, setAdditionalFees] = useState("0");
  const [taxRate, setTaxRate] = useState("0");
  const [copied, setCopied] = useState(false);

  function changeLengthUnit(
    key: LengthKey,
    value: string,
    setValue: (value: string) => void,
    nextUnit: LengthUnit,
  ) {
    const currentUnit = lengthUnits[key];
    if (currentUnit === nextUnit) return;
    const converted = currentUnit === "ft" ? n(value) * 12 : n(value) / 12;
    setValue(Number(converted.toFixed(4)).toString());
    setLengthUnits((current) => ({ ...current, [key]: nextUnit }));
  }

  const result = useMemo(() => {
    const grossArea = mode === "dimensions" ? feet(wallLength, lengthUnits.wallLength) * feet(wallHeight, lengthUnits.wallHeight) * n(wallQuantity) : n(knownArea);
    const doorArea = mode === "dimensions" ? n(doorCount) * feet(doorWidth, lengthUnits.doorWidth) * feet(doorHeight, lengthUnits.doorHeight) : 0;
    const windowArea = mode === "dimensions" ? n(windowCount) * feet(windowWidth, lengthUnits.windowWidth) * feet(windowHeight, lengthUnits.windowHeight) : 0;
    const openingArea = doorArea + windowArea;
    const netArea = Math.max(0, grossArea - openingArea);
    const purchaseArea = netArea * (1 + n(waste) / 100);
    const panelArea = feet(panelWidth, lengthUnits.panelWidth) * feet(panelLength, lengthUnits.panelLength);
    const panels = panelArea > 0 ? ceil(purchaseArea / panelArea) : 0;
    const purchasedCoverage = panels * panelArea;
    const overage = Math.max(0, purchasedCoverage - netArea);
    const fasteners = ceil(panels * n(fastenersPerPanel));
    const fastenerBoxes = n(fastenersPerBox) > 0 ? ceil(fasteners / n(fastenersPerBox)) : 0;
    const wrapArea = netArea * (1 + n(housewrapWaste) / 100);
    const wrapRolls = n(housewrapCoverage) > 0 ? ceil(wrapArea / n(housewrapCoverage)) : 0;
    const estimatedTape = panels * n(tapePerPanel);
    const tapeRolls = n(tapeCoverage) > 0 ? ceil(estimatedTape / n(tapeCoverage)) : 0;
    const panelCost = panels * n(panelPrice);
    const fastenerCost = fastenerBoxes * n(fastenerBoxPrice);
    const wrapCost = wrapRolls * n(housewrapRollPrice);
    const tapeCost = tapeRolls * n(tapeRollPrice);
    const subtotal = panelCost + fastenerCost + wrapCost + tapeCost;
    const tax = subtotal * n(taxRate) / 100;
    const total = subtotal + tax + n(deliveryFee) + n(additionalFees);
    const costPerSquareFoot = netArea > 0 ? total / netArea : 0;
    return { grossArea, doorArea, windowArea, openingArea, netArea, purchaseArea, panelArea, panels, purchasedCoverage, overage, fasteners, fastenerBoxes, wrapArea, wrapRolls, estimatedTape, tapeRolls, panelCost, fastenerCost, wrapCost, tapeCost, subtotal, tax, total, costPerSquareFoot };
  }, [mode, wallLength, wallHeight, wallQuantity, knownArea, doorCount, doorWidth, doorHeight, windowCount, windowWidth, windowHeight, panelWidth, panelLength, lengthUnits, waste, fastenersPerPanel, fastenersPerBox, housewrapCoverage, housewrapWaste, tapeCoverage, tapePerPanel, panelPrice, fastenerBoxPrice, housewrapRollPrice, tapeRollPrice, deliveryFee, additionalFees, taxRate]);

  async function copyResults() {
    const text = ["Numeravo Wall Sheathing Calculator", `Calculation mode: ${mode === "dimensions" ? "Wall dimensions" : "Known net area"}`, `Gross wall area: ${fmt(result.grossArea)} sq ft`, `Opening deduction: ${fmt(result.openingArea)} sq ft`, `Net sheathing area: ${fmt(result.netArea)} sq ft`, `Waste-adjusted area: ${fmt(result.purchaseArea)} sq ft`, `Panel size: ${fmt(n(panelWidth))} ft × ${fmt(n(panelLength))} ft`, `Panels to purchase: ${fmt(result.panels, 0)}`, `Purchased coverage: ${fmt(result.purchasedCoverage)} sq ft`, `Fasteners: ${fmt(result.fasteners, 0)}`, `Fastener boxes: ${fmt(result.fastenerBoxes, 0)}`, `Housewrap rolls: ${fmt(result.wrapRolls, 0)}`, `Tape rolls: ${fmt(result.tapeRolls, 0)}`, `Material subtotal: ${usd(result.subtotal)}`, `Estimated tax: ${usd(result.tax)}`, `Estimated material total: ${usd(result.total)}`, `Cost per net square foot: ${usd(result.costPerSquareFoot)}`].join("\n");
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  }

  return <div className="space-y-6">
    <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
      <Tag>Inputs</Tag><h2 className="mt-3 text-2xl font-bold">Wall sheathing project details</h2><p className="mt-3 max-w-3xl leading-7 text-[#A0AEC0]">Calculate net wall area, whole sheathing panels, fasteners, housewrap, seam tape, waste, and estimated material cost.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2"><Mode active={mode === "dimensions"} title="Wall dimensions" text="Calculate area and deduct openings" onClick={() => setMode("dimensions")} /><Mode active={mode === "known"} title="Known net area" text="Enter an already measured sheathing area" onClick={() => setMode("known")} /></div>
      <Group title="Wall area">
        {mode === "dimensions" ? <><LengthInput label="Wall length" value={wallLength} set={setWallLength} unit={lengthUnits.wallLength} change={(unit) => changeLengthUnit("wallLength", wallLength, setWallLength, unit)} /><LengthInput label="Wall height" value={wallHeight} set={setWallHeight} unit={lengthUnits.wallHeight} change={(unit) => changeLengthUnit("wallHeight", wallHeight, setWallHeight, unit)} /><Input label="Number of matching walls" value={wallQuantity} set={setWallQuantity} suffix="walls" /></> : <Input label="Known net sheathing area" value={knownArea} set={setKnownArea} suffix="sq ft" />}
      </Group>
      {mode === "dimensions" && <Group title="Door and window deductions"><Input label="Number of doors" value={doorCount} set={setDoorCount} /><LengthInput label="Door width" value={doorWidth} set={setDoorWidth} unit={lengthUnits.doorWidth} change={(unit) => changeLengthUnit("doorWidth", doorWidth, setDoorWidth, unit)} /><LengthInput label="Door height" value={doorHeight} set={setDoorHeight} unit={lengthUnits.doorHeight} change={(unit) => changeLengthUnit("doorHeight", doorHeight, setDoorHeight, unit)} /><Input label="Number of windows" value={windowCount} set={setWindowCount} /><LengthInput label="Window width" value={windowWidth} set={setWindowWidth} unit={lengthUnits.windowWidth} change={(unit) => changeLengthUnit("windowWidth", windowWidth, setWindowWidth, unit)} /><LengthInput label="Window height" value={windowHeight} set={setWindowHeight} unit={lengthUnits.windowHeight} change={(unit) => changeLengthUnit("windowHeight", windowHeight, setWindowHeight, unit)} /></Group>}
      <Group title="Panels and waste"><LengthInput label="Panel width" value={panelWidth} set={setPanelWidth} unit={lengthUnits.panelWidth} change={(unit) => changeLengthUnit("panelWidth", panelWidth, setPanelWidth, unit)} /><LengthInput label="Panel length" value={panelLength} set={setPanelLength} unit={lengthUnits.panelLength} change={(unit) => changeLengthUnit("panelLength", panelLength, setPanelLength, unit)} /><Input label="Panel waste allowance" value={waste} set={setWaste} suffix="%" /></Group>
      <Group title="Fasteners and weather barrier"><Input label="Fasteners per panel" value={fastenersPerPanel} set={setFastenersPerPanel} /><Input label="Fasteners per box" value={fastenersPerBox} set={setFastenersPerBox} /><Input label="Housewrap coverage per roll" value={housewrapCoverage} set={setHousewrapCoverage} suffix="sq ft" /><Input label="Housewrap overlap / waste" value={housewrapWaste} set={setHousewrapWaste} suffix="%" /><Input label="Estimated taped seam per panel" value={tapePerPanel} set={setTapePerPanel} suffix="lin ft" /><Input label="Tape coverage per roll" value={tapeCoverage} set={setTapeCoverage} suffix="lin ft" /></Group>
      <Group title="Supplier pricing"><Input label="Price per sheathing panel" value={panelPrice} set={setPanelPrice} prefix="$" suffix="/panel" /><Input label="Price per fastener box" value={fastenerBoxPrice} set={setFastenerBoxPrice} prefix="$" suffix="/box" /><Input label="Price per housewrap roll" value={housewrapRollPrice} set={setHousewrapRollPrice} prefix="$" suffix="/roll" /><Input label="Price per tape roll" value={tapeRollPrice} set={setTapeRollPrice} prefix="$" suffix="/roll" /><Input label="Delivery fee" value={deliveryFee} set={setDeliveryFee} prefix="$" /><Input label="Additional fees" value={additionalFees} set={setAdditionalFees} prefix="$" /><Input label="Sales tax on materials" value={taxRate} set={setTaxRate} suffix="%" /></Group>
      <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#2A1D1A] p-5"><h3 className="font-semibold text-orange-300">Structural and installation guidance</h3><p className="mt-2 text-sm leading-7 text-[#A0AEC0]">This is a quantity estimate, not a structural design. Verify panel type, thickness, grade, orientation, expansion gaps, edge blocking, fastening schedule, shear-wall requirements, weather-resistive barrier details and local code with approved plans and manufacturer instructions.</p></div>
    </section>

    <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
      <Tag>Results</Tag><h2 className="mt-3 text-2xl font-bold">Wall sheathing material estimate</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Metric accent label="Estimated material total" value={usd(result.total)} /><Metric label="Panels to purchase" value={qty(result.panels, "panel")} /><Metric label="Net sheathing area" value={`${fmt(result.netArea)} sq ft`} /><Metric label="Fastener boxes" value={qty(result.fastenerBoxes, "box", "boxes")} /><Metric label="Housewrap rolls" value={qty(result.wrapRolls, "roll")} /><Metric label="Cost per net sq ft" value={usd(result.costPerSquareFoot)} /></div>
      <Results title="Area and purchase allowance"><Row label="Gross wall area" value={`${fmt(result.grossArea)} sq ft`} /><Row label="Door area" value={`${fmt(result.doorArea)} sq ft`} /><Row label="Window area" value={`${fmt(result.windowArea)} sq ft`} /><Row label="Total opening deduction" value={`${fmt(result.openingArea)} sq ft`} /><Row label="Net sheathing area" value={`${fmt(result.netArea)} sq ft`} /><Row label={`Area with ${fmt(n(waste))}% waste`} value={`${fmt(result.purchaseArea)} sq ft`} /><Row label="Panel coverage" value={`${fmt(result.panelArea)} sq ft`} /><Row label="Panels to purchase" value={fmt(result.panels, 0)} /><Row label="Purchased coverage" value={`${fmt(result.purchasedCoverage)} sq ft`} /><Row label="Whole-panel overage" value={`${fmt(result.overage)} sq ft`} /></Results>
      <Results title="Accessories"><Row label="Estimated fasteners" value={fmt(result.fasteners, 0)} /><Row label="Fastener boxes" value={fmt(result.fastenerBoxes, 0)} /><Row label="Housewrap planning area" value={`${fmt(result.wrapArea)} sq ft`} /><Row label="Housewrap rolls" value={fmt(result.wrapRolls, 0)} /><Row label="Estimated taped seams" value={`${fmt(result.estimatedTape)} lin ft`} /><Row label="Tape rolls" value={fmt(result.tapeRolls, 0)} /></Results>
      <Results title="Material cost"><Row label="Sheathing panels" value={usd(result.panelCost)} /><Row label="Fasteners" value={usd(result.fastenerCost)} /><Row label="Housewrap" value={usd(result.wrapCost)} /><Row label="Seam tape" value={usd(result.tapeCost)} /><Row label="Material subtotal" value={usd(result.subtotal)} /><Row label={`Estimated tax (${fmt(n(taxRate))}%)`} value={usd(result.tax)} /><Row label="Delivery and additional fees" value={usd(n(deliveryFee) + n(additionalFees))} /><Row label="Estimated material total" value={usd(result.total)} /></Results>
      <button type="button" onClick={copyResults} className="mt-6 w-full rounded-2xl bg-[#F97316] px-5 py-4 font-semibold text-[#0B0F19] transition hover:bg-orange-400">{copied ? "Results copied" : "Copy results"}</button>
    </section>
  </div>;
}

function Tag({ children }: { children: React.ReactNode }) { return <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">{children}</p>; }
function Mode({ active, title, text, onClick }: { active: boolean; title: string; text: string; onClick: () => void }) { return <button type="button" onClick={onClick} className={active ? "rounded-2xl border border-[#F97316] bg-[#1C2433] p-4 text-left" : "rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4 text-left hover:border-orange-400"}><span className="block font-semibold">{title}</span><span className="mt-1 block text-sm text-[#A0AEC0]">{text}</span></button>; }
function Group({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{title}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div></div>; }
function LengthInput({ label, value, set, unit, change }: { label: string; value: string; set: (value: string) => void; unit: LengthUnit; change: (unit: LengthUnit) => void }) { return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#121826] focus-within:border-[#F97316]"><input type="number" min="0" step="any" value={value} onChange={(event) => set(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none" /><select aria-label={`${label} unit`} value={unit} onChange={(event) => change(event.target.value as LengthUnit)} className="border-l border-[#1F2937] bg-[#121826] px-3 py-3 text-sm font-semibold text-white outline-none"><option value="ft">ft</option><option value="in">in</option></select></div></label>; }
function Input({ label, value, set, prefix, suffix }: { label: string; value: string; set: (value: string) => void; prefix?: string; suffix?: string }) { return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#121826]">{prefix && <span className="border-r border-[#1F2937] px-3 py-3 text-sm text-[#A0AEC0]">{prefix}</span>}<input type="number" min="0" step="any" value={value} onChange={(event) => set(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none" />{suffix && <span className="border-l border-[#1F2937] px-3 py-3 text-sm text-[#A0AEC0]">{suffix}</span>}</div></label>; }
function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) { return <div className={accent ? "rounded-2xl bg-[#F97316] p-5 text-[#0B0F19]" : "rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"}><p className={accent ? "text-sm" : "text-sm text-[#A0AEC0]"}>{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>; }
function Results({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{title}</h3><div className="mt-3">{children}</div></div>; }
function Row({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] py-3 last:border-b-0"><span className="text-sm text-[#A0AEC0]">{label}</span><span className="text-right text-sm font-semibold">{value}</span></div>; }
function feet(value: string, unit: LengthUnit) { return unit === "ft" ? n(value) : n(value) / 12; }
