import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://numeravo.com";

  const routes = [
    "",
    "/construction",
    "/construction/concrete-calculator",
    "/finance",
    "/student",
    "/business",
    "/converters",
    "/tools",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("concrete-calculator") ? 0.9 : 0.8,
  }));
}