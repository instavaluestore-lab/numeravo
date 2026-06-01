import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Concrete Calculator | Slabs, Footings, Piers & Cost Estimator",
  description:
    "Use the Numeravo concrete calculator to estimate cubic feet, cubic yards, concrete with waste, and material cost for slabs, footings, trenches, piers, posts, and columns.",
  alternates: {
    canonical: "https://numeravo.com/construction/concrete-calculator",
  },
  openGraph: {
    title: "Concrete Calculator | Numeravo",
    description:
      "Estimate concrete volume and material cost for slabs, footings, trenches, piers, posts, sonotubes, and columns.",
    url: "https://numeravo.com/construction/concrete-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Calculator | Numeravo",
    description:
      "Estimate concrete volume, cubic yards, waste, and concrete material cost.",
  },
};

export default function ConcreteCalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}