import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Numeravo | Smart Calculators, Tools, and Guides",
    template: "%s | Numeravo",
  },
  description:
    "Numeravo provides smart calculators, tools, and guides for everyday decisions across construction, finance, student work, business, conversions, and utility tools.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
  <Header />
  {children}
  <Footer />
  <Analytics />
</body>
    </html>
  );
}