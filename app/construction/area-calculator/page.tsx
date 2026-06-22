import type { Metadata } from "next";
import AreaCalculatorClient from "./AreaCalculatorClient";

export const metadata: Metadata = {
  title: "Area Calculator | Square Feet, Square Yards, Acres & Square Meters",
  description:
    "Use the Numeravo area calculator to calculate square feet, square yards, square meters, acres, waste-adjusted area, and material cost for rectangles, triangles, circles, and trapezoids.",
  alternates: {
    canonical: "https://numeravo.com/construction/area-calculator",
  },
  openGraph: {
    title: "Area Calculator | Square Feet, Square Yards, Acres & Square Meters",
    description:
      "Calculate area for flooring, roofing, drywall, paint, decking, concrete slabs, landscaping, tile, and carpet projects.",
    url: "https://numeravo.com/construction/area-calculator",
    siteName: "Numeravo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Area Calculator | Square Feet, Square Yards, Acres & Square Meters",
    description:
      "Calculate square feet, square yards, square meters, acres, waste-adjusted area, and project cost.",
  },
};

export default function AreaCalculatorPage() {
  return <AreaCalculatorClient />;
}