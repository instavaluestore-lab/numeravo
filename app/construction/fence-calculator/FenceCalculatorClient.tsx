"use client";

import { useMemo, useState } from "react";

type FenceMode = "pickets" | "panels";

const number = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};
const whole = (value: number) => (value > 0 ? Math.ceil(value) : 0);
const format = (value: number, digits = 2) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
const plural = (count: number, singular: string, pluralForm = `${singular}s`) =>
  `${format(count, 0)} ${count === 1 ? singular : pluralForm}`;

export default function FenceCalculatorClient() {
  const [mode, setMode] = useState<FenceMode>("pickets");
  const [fenceLength, setFenceLength] = useState("100");
  const [fenceHeight, setFenceHeight] = useState("6");
  const [postSpacing, setPostSpacing] = useState("8");
  const [corners, setCorners] = useState("4");
  const [gateCount, setGateCount] = useState("1");
  const [gateWidth, setGateWidth] = useState("4");
  const [railsPerSection, setRailsPerSection] = useState("3");
  const [picketWidth, setPicketWidth] = useState("5.5");
  const [picketGap, setPicketGap] = useState("0");
  const [panelWidth, setPanelWidth] = useState("8");
  const [postHoleDiameter, setPostHoleDiameter] = useState("10");
  const [postHoleDepth, setPostHoleDepth] = useState("30");
  const [postWidth, setPostWidth] = useState("3.5");
  const [bagYield, setBagYield] = useState("0.6");
  const [fastenersPerPicket, setFastenersPerPicket] = useState("6");
  const [fastenersPerBox, setFastenersPerBox] = useState("1000");
  const [waste, setWaste] = useState("10");
  const [postPrice, setPostPrice] = useState("18");
  const [railPrice, setRailPrice] = useState("8");
  const [picketPrice, setPicketPrice] = useState("3.5");
  const [panelPrice, setPanelPrice] = useState("85");
  const [concreteBagPrice, setConcreteBagPrice] = useState("6.5");
  const [fastenerBoxPrice, setFastenerBoxPrice] = useState("38");
  const [gatePrice, setGatePrice] = useState("175");
  const [deliveryFee, setDeliveryFee] = useState("0");
  const [additionalFees, setAdditionalFees] = useState("0");
  const [taxRate, setTaxRate] = useState("0");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const totalLength = number(fenceLength);
    const gates = whole(number(gateCount));
    const totalGateWidth = Math.min(totalLength, gates * number(gateWidth));
    const netFenceLength = Math.max(0, totalLength - totalGateWidth);
    const spacing = number(postSpacing);
    const baseSections = spacing > 0 ? whole(netFenceLength / spacing) : 0;
    const cornerPosts = whole(number(corners));
    const gatePosts = gates * 2;
    const linePosts = Math.max(0, baseSections - 1);
    const postsBeforeWaste = netFenceLength > 0 ? linePosts + 2 + cornerPosts + gatePosts : 0;
    const wasteFactor = 1 + number(waste) / 100;
    const posts = whole(postsBeforeWaste * wasteFactor);
    const sections = Math.max(0, postsBeforeWaste - 1 - gatePosts);
    const rails = mode === "pickets" ? whole(sections * number(railsPerSection) * wasteFactor) : 0;
    const moduleWidthInches = number(picketWidth) + number(picketGap);
    const picketsBeforeWaste = moduleWidthInches > 0 ? whole((netFenceLength * 12) / moduleWidthInches) : 0;
    const pickets = mode === "pickets" ? whole(picketsBeforeWaste * wasteFactor) : 0;
    const panelsBeforeWaste = number(panelWidth) > 0 ? whole(netFenceLength / number(panelWidth)) : 0;
    const panels = mode === "panels" ? whole(panelsBeforeWaste * wasteFactor) : 0;

    const holeRadiusFeet = number(postHoleDiameter) / 24;
    const holeDepthFeet = number(postHoleDepth) / 12;
    const postAreaSquareFeet = Math.pow(number(postWidth) / 12, 2);
    const concretePerHole = Math.max(
      0,
      Math.PI * Math.pow(holeRadiusFeet, 2) * holeDepthFeet - postAreaSquareFeet * holeDepthFeet,
    );
    const concreteCubicFeet = concretePerHole * postsBeforeWaste;
    const concreteBags = number(bagYield) > 0 ? whole(concreteCubicFeet / number(bagYield)) : 0;
    const fasteners =
      mode === "pickets"
        ? whole(pickets * number(fastenersPerPicket))
        : whole(panels * 8);
    const fastenerBoxes = number(fastenersPerBox) > 0 ? whole(fasteners / number(fastenersPerBox)) : 0;

    const postCost = posts * number(postPrice);
    const railCost = rails * number(railPrice);
    const infillCost =
      mode === "pickets" ? pickets * number(picketPrice) : panels * number(panelPrice);
    const concreteCost = concreteBags * number(concreteBagPrice);
    const fastenerCost = fastenerBoxes * number(fastenerBoxPrice);
    const gateCost = gates * number(gatePrice);
    const materialSubtotal = postCost + railCost + infillCost + concreteCost + fastenerCost + gateCost;
    const tax = materialSubtotal * (number(taxRate) / 100);
    const total = materialSubtotal + tax + number(deliveryFee) + number(additionalFees);
    const costPerFoot = totalLength > 0 ? total / totalLength : 0;

    return {
      totalLength, totalGateWidth, netFenceLength, gates, postsBeforeWaste, posts, sections,
      rails, picketsBeforeWaste, pickets, panelsBeforeWaste, panels, concreteCubicFeet,
      concreteBags, fasteners, fastenerBoxes, postCost, railCost, infillCost, concreteCost,
      fastenerCost, gateCost, materialSubtotal, tax, total, costPerFoot,
    };
  }, [mode, fenceLength, postSpacing, corners, gateCount, gateWidth, railsPerSection,
    picketWidth, picketGap, panelWidth, postHoleDiameter, postHoleDepth, postWidth, bagYield,
    fastenersPerPicket, fastenersPerBox, waste, postPrice, railPrice, picketPrice, panelPrice,
    concreteBagPrice, fastenerBoxPrice, gatePrice, deliveryFee, additionalFees, taxRate]);

  async function copyResults() {
    const text = [
      "Numeravo Fence Calculator",
      `Fence system: ${mode === "pickets" ? "Pickets and rails" : "Prebuilt panels"}`,
      `Fence length: ${format(result.totalLength)} ft`,
      `Fence height: ${format(number(fenceHeight))} ft`,
      `Gate openings: ${format(result.totalGateWidth)} ft`,
      `Net fenced length: ${format(result.netFenceLength)} ft`,
      `Posts before waste: ${format(result.postsBeforeWaste, 0)}`,
      `Posts to purchase: ${format(result.posts, 0)}`,
      mode === "pickets" ? `Rails: ${format(result.rails, 0)}` : `Panels: ${format(result.panels, 0)}`,
      ...(mode === "pickets" ? [`Pickets: ${format(result.pickets, 0)}`] : []),
      `Concrete: ${format(result.concreteCubicFeet)} cu ft`,
      `Concrete bags: ${format(result.concreteBags, 0)}`,
      `Fasteners: ${format(result.fasteners, 0)}`,
      `Fastener boxes: ${format(result.fastenerBoxes, 0)}`,
      `Material subtotal: ${money(result.materialSubtotal)}`,
      `Estimated tax: ${money(result.tax)}`,
      `Estimated material total: ${money(result.total)}`,
      `Cost per linear foot: ${money(result.costPerFoot)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <Eyebrow>Inputs</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold">Fence project details</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#A0AEC0]">Estimate posts, rails, pickets or panels, gates, concrete, fasteners, waste, and material cost.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ModeButton active={mode === "pickets"} title="Pickets and rails" text="Individual boards with horizontal rails" onClick={() => setMode("pickets")} />
          <ModeButton active={mode === "panels"} title="Prebuilt panels" text="Factory-built fence panels" onClick={() => setMode("panels")} />
        </div>

        <InputGroup title="Fence layout">
          <Input label="Total fence length" value={fenceLength} setValue={setFenceLength} suffix="ft" />
          <Input label="Fence height" value={fenceHeight} setValue={setFenceHeight} suffix="ft" />
          <Input label="Maximum post spacing" value={postSpacing} setValue={setPostSpacing} suffix="ft" />
          <Input label="Corners / direction changes" value={corners} setValue={setCorners} suffix="corners" />
          <Input label="Number of gates" value={gateCount} setValue={setGateCount} suffix="gates" />
          <Input label="Width per gate" value={gateWidth} setValue={setGateWidth} suffix="ft" />
        </InputGroup>

        <InputGroup title={mode === "pickets" ? "Pickets and rails" : "Fence panels"}>
          {mode === "pickets" ? <>
            <Input label="Rails per section" value={railsPerSection} setValue={setRailsPerSection} suffix="rails" />
            <Input label="Picket width" value={picketWidth} setValue={setPicketWidth} suffix="in" />
            <Input label="Gap between pickets" value={picketGap} setValue={setPicketGap} suffix="in" />
            <Input label="Fasteners per picket" value={fastenersPerPicket} setValue={setFastenersPerPicket} suffix="fasteners" />
          </> : <Input label="Panel width" value={panelWidth} setValue={setPanelWidth} suffix="ft" />}
          <Input label="Waste allowance" value={waste} setValue={setWaste} suffix="%" />
        </InputGroup>

        <InputGroup title="Post holes, concrete and fasteners">
          <Input label="Post-hole diameter" value={postHoleDiameter} setValue={setPostHoleDiameter} suffix="in" />
          <Input label="Post-hole depth" value={postHoleDepth} setValue={setPostHoleDepth} suffix="in" />
          <Input label="Post width" value={postWidth} setValue={setPostWidth} suffix="in" />
          <Input label="Concrete yield per bag" value={bagYield} setValue={setBagYield} suffix="cu ft" />
          <Input label="Fasteners per box" value={fastenersPerBox} setValue={setFastenersPerBox} suffix="fasteners" />
        </InputGroup>

        <InputGroup title="Supplier pricing">
          <Input label="Price per post" value={postPrice} setValue={setPostPrice} prefix="$" suffix="/post" />
          {mode === "pickets" ? <>
            <Input label="Price per rail" value={railPrice} setValue={setRailPrice} prefix="$" suffix="/rail" />
            <Input label="Price per picket" value={picketPrice} setValue={setPicketPrice} prefix="$" suffix="/picket" />
          </> : <Input label="Price per panel" value={panelPrice} setValue={setPanelPrice} prefix="$" suffix="/panel" />}
          <Input label="Price per concrete bag" value={concreteBagPrice} setValue={setConcreteBagPrice} prefix="$" suffix="/bag" />
          <Input label="Price per fastener box" value={fastenerBoxPrice} setValue={setFastenerBoxPrice} prefix="$" suffix="/box" />
          <Input label="Price per gate" value={gatePrice} setValue={setGatePrice} prefix="$" suffix="/gate" />
          <Input label="Delivery fee" value={deliveryFee} setValue={setDeliveryFee} prefix="$" />
          <Input label="Additional fees" value={additionalFees} setValue={setAdditionalFees} prefix="$" />
          <Input label="Sales tax on materials" value={taxRate} setValue={setTaxRate} suffix="%" />
        </InputGroup>

        <div className="mt-6 rounded-2xl border border-[#F97316] bg-[#2A1D1A] p-5">
          <h3 className="font-semibold text-orange-300">Planning and safety</h3>
          <p className="mt-2 text-sm leading-7 text-[#A0AEC0]">Confirm property lines, easements, permits, fence height, post depth, frost depth, wind design and utility locations before digging. Call 811 before excavation. Gate, corner and bracing requirements vary by system.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-[#1F2937] bg-[#121826] p-6 md:p-8">
        <Eyebrow>Results</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold">Fence material estimate</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Metric accent label="Estimated material total" value={money(result.total)} />
          <Metric label="Posts to purchase" value={plural(result.posts, "post")} />
          <Metric label={mode === "pickets" ? "Pickets to purchase" : "Panels to purchase"} value={mode === "pickets" ? plural(result.pickets, "picket") : plural(result.panels, "panel")} />
          <Metric label="Concrete bags" value={plural(result.concreteBags, "bag")} />
          <Metric label="Fastener boxes" value={plural(result.fastenerBoxes, "box", "boxes")} />
          <Metric label="Cost per linear foot" value={money(result.costPerFoot)} />
        </div>

        <ResultGroup title="Fence layout">
          <Row label="Total fence length" value={`${format(result.totalLength)} ft`} />
          <Row label="Gate-opening width" value={`${format(result.totalGateWidth)} ft`} />
          <Row label="Net fenced length" value={`${format(result.netFenceLength)} ft`} />
          <Row label="Fence sections" value={format(result.sections, 0)} />
          <Row label="Posts before waste" value={format(result.postsBeforeWaste, 0)} />
          <Row label="Posts to purchase" value={format(result.posts, 0)} />
        </ResultGroup>

        <ResultGroup title="Material list">
          {mode === "pickets" ? <>
            <Row label="Rails" value={format(result.rails, 0)} />
            <Row label="Pickets before waste" value={format(result.picketsBeforeWaste, 0)} />
            <Row label="Pickets to purchase" value={format(result.pickets, 0)} />
          </> : <>
            <Row label="Panels before waste" value={format(result.panelsBeforeWaste, 0)} />
            <Row label="Panels to purchase" value={format(result.panels, 0)} />
          </>}
          <Row label="Concrete volume" value={`${format(result.concreteCubicFeet)} cu ft`} />
          <Row label="Concrete bags" value={format(result.concreteBags, 0)} />
          <Row label="Estimated fasteners" value={format(result.fasteners, 0)} />
          <Row label="Fastener boxes" value={format(result.fastenerBoxes, 0)} />
        </ResultGroup>

        <ResultGroup title="Material cost">
          <Row label="Posts" value={money(result.postCost)} />
          {mode === "pickets" && <Row label="Rails" value={money(result.railCost)} />}
          <Row label={mode === "pickets" ? "Pickets" : "Panels"} value={money(result.infillCost)} />
          <Row label="Concrete" value={money(result.concreteCost)} />
          <Row label="Fasteners" value={money(result.fastenerCost)} />
          <Row label="Gates" value={money(result.gateCost)} />
          <Row label="Material subtotal" value={money(result.materialSubtotal)} />
          <Row label={`Estimated tax (${format(number(taxRate))}%)`} value={money(result.tax)} />
          <Row label="Delivery and additional fees" value={money(number(deliveryFee) + number(additionalFees))} />
          <Row label="Estimated material total" value={money(result.total)} />
        </ResultGroup>

        <button type="button" onClick={copyResults} className="mt-6 w-full rounded-2xl bg-[#F97316] px-5 py-4 font-semibold text-[#0B0F19] transition hover:bg-orange-400">{copied ? "Results copied" : "Copy results"}</button>
      </section>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F97316]">{children}</p>; }
function ModeButton({ active, title, text, onClick }: { active: boolean; title: string; text: string; onClick: () => void }) { return <button type="button" onClick={onClick} className={active ? "rounded-2xl border border-[#F97316] bg-[#1C2433] p-4 text-left" : "rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4 text-left hover:border-orange-400"}><span className="block font-semibold text-white">{title}</span><span className="mt-1 block text-sm text-[#A0AEC0]">{text}</span></button>; }
function InputGroup({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{title}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div></div>; }
function Input({ label, value, setValue, prefix, suffix }: { label: string; value: string; setValue: (value: string) => void; prefix?: string; suffix?: string }) { return <label><span className="text-sm text-[#A0AEC0]">{label}</span><div className="mt-2 flex overflow-hidden rounded-xl border border-[#1F2937] bg-[#121826]">{prefix && <span className="border-r border-[#1F2937] px-3 py-3 text-sm text-[#A0AEC0]">{prefix}</span>}<input type="number" min="0" step="any" value={value} onChange={(event) => setValue(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none" />{suffix && <span className="border-l border-[#1F2937] px-3 py-3 text-sm text-[#A0AEC0]">{suffix}</span>}</div></label>; }
function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) { return <div className={accent ? "rounded-2xl bg-[#F97316] p-5 text-[#0B0F19]" : "rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"}><p className={accent ? "text-sm" : "text-sm text-[#A0AEC0]"}>{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>; }
function ResultGroup({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-5"><h3 className="font-semibold">{title}</h3><div className="mt-3">{children}</div></div>; }
function Row({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between gap-4 border-b border-[#1F2937] py-3 last:border-b-0"><span className="text-sm text-[#A0AEC0]">{label}</span><span className="text-right text-sm font-semibold text-white">{value}</span></div>; }
