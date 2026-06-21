import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://numeravo.com";

  const routes = [
    "",
    "/construction",
    "/construction/concrete-calculator",
    "/construction/concrete-slab-calculator",
    "/construction/concrete-footing-calculator",
    "/construction/sonotube-concrete-calculator",
    "/construction/concrete-wall-calculator",
    "/construction/gravel-calculator",
    "/finance",
    "/student",
    "/business",
    "/converters",
    "/tools",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route.includes("concrete-calculator")
          ? 0.9
          : route.includes("concrete-slab-calculator") ||
              route.includes("concrete-footing-calculator") ||
              route.includes("sonotube-concrete-calculator") ||
              route.includes("concrete-wall-calculator") ||
              route.includes("gravel-calculator")
            ? 0.85
            : route === "/about" ||
                route === "/contact" ||
                route === "/privacy-policy" ||
                route === "/terms"
              ? 0.5
              : 0.8,
  }));
}