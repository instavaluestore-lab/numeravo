import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://numeravo.com";

  const routes = [
    "",
    "/construction",
    "/construction/how-much-concrete-do-i-need",
    "/construction/concrete-calculator",
    "/construction/concrete-cost-calculator",
    "/construction/concrete-bag-calculator",
    "/construction/rebar-calculator",
    "/construction/rebar-spacing-for-concrete-slab",
    "/construction/rebar-weight-calculator",
    "/construction/wire-mesh-calculator",
    "/construction/concrete-driveway-calculator",
    "/construction/concrete-patio-calculator",
    "/construction/concrete-sidewalk-calculator",
    "/construction/concrete-pad-calculator",
    "/construction/concrete-stairs-calculator",
    "/construction/concrete-truckload-calculator",
    "/construction/concrete-mix-ratio",
    "/construction/concrete-slab-thickness",
    "/construction/concrete-cure-time",
    "/construction/concrete-cost-per-yard",
    "/construction/10x10-concrete-slab-cost",
    "/construction/12x12-concrete-slab-cost",
    "/construction/concrete-slab-calculator",
    "/construction/concrete-footing-calculator",
    "/construction/sonotube-concrete-calculator",
    "/construction/concrete-wall-calculator",
    "/construction/gravel-calculator",
    "/construction/gravel-driveway-calculator",
    "/construction/gravel-driveway-cost",
    "/construction/gravel-cost-calculator",
    "/construction/how-much-gravel-do-i-need",
    "/construction/gravel-cost-per-ton",
    "/construction/pea-gravel-calculator",
    "/construction/river-rock-calculator",
    "/construction/drainage-rock-calculator",
    "/construction/decomposed-granite-calculator",
    "/construction/crushed-stone-vs-gravel",
    "/construction/crushed-stone-calculator",
    "/construction/road-base-calculator",
    "/construction/paver-base-calculator",
    "/construction/base-for-concrete-slab-depth",
    "/construction/how-to-prepare-ground-for-concrete-slab",
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
        : route.includes("how-much-concrete-do-i-need") ||
          route.includes("concrete-calculator")
          ? 0.9
          : route.includes("concrete-slab-calculator") ||
              route.includes("concrete-footing-calculator") ||
              route.includes("sonotube-concrete-calculator") ||
              route.includes("concrete-wall-calculator") ||
              route.includes("concrete-cost-calculator") ||
              route.includes("concrete-bag-calculator") ||
              route.includes("rebar-calculator") ||
              route.includes("rebar-spacing-for-concrete-slab") ||
              route.includes("rebar-weight-calculator") ||
              route.includes("wire-mesh-calculator") ||
              route.includes("concrete-driveway-calculator") ||
              route.includes("concrete-patio-calculator") ||
              route.includes("concrete-sidewalk-calculator") ||
              route.includes("concrete-pad-calculator") ||
              route.includes("concrete-stairs-calculator") ||
              route.includes("concrete-truckload-calculator") ||
              route.includes("concrete-mix-ratio") ||
              route.includes("concrete-slab-thickness") ||
              route.includes("concrete-cure-time") ||
              route.includes("concrete-cost-per-yard") ||
              route.includes("10x10-concrete-slab-cost") ||
              route.includes("12x12-concrete-slab-cost") ||
              route.includes("gravel-calculator") ||
              route.includes("gravel-driveway-calculator") ||
              route.includes("gravel-driveway-cost") ||
              route.includes("gravel-cost-calculator") ||
              route.includes("how-much-gravel-do-i-need") ||
              route.includes("gravel-cost-per-ton") ||
              route.includes("pea-gravel-calculator") ||
              route.includes("river-rock-calculator") ||
              route.includes("drainage-rock-calculator") ||
              route.includes("decomposed-granite-calculator") ||
route.includes("crushed-stone-vs-gravel") ||
route.includes("crushed-stone-calculator") ||
route.includes("road-base-calculator") ||
              route.includes("paver-base-calculator") ||
route.includes("base-for-concrete-slab-depth") ||
route.includes("how-to-prepare-ground-for-concrete-slab")
            ? 0.85
            : route === "/about" ||
                route === "/contact" ||
                route === "/privacy-policy" ||
                route === "/terms"
              ? 0.5
              : 0.8,
  }));
}