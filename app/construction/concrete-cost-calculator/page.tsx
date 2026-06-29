import type { Metadata } from "next";
import ConcreteCostCalculatorClient from "./ConcreteCostCalculatorClient";

export const metadata: Metadata = {
  title: "Concrete Cost Calculator | Estimate Concrete Price, Base, Rebar & Labor",
  description:
    "Use the Numeravo concrete cost calculator to estimate concrete cubic yards, ready-mix cost, gravel base, reinforcement, labor, delivery fees, and total project cost.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-cost-calculator",
  },
  openGraph: {
    title: "Concrete Cost Calculator | Numeravo",
    description:
      "Estimate concrete cost by cubic yard, slab area, gravel base, reinforcement, labor, delivery, and total installed project cost.",
    url: "https://numeravo.com/construction/concrete-cost-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Cost Calculator | Numeravo",
    description:
      "Calculate concrete cubic yards, ready-mix cost, base material, reinforcement, labor, and total concrete project cost.",
  },
};

export default function ConcreteCostCalculatorPage() {
  return <ConcreteCostCalculatorClient />;
}
