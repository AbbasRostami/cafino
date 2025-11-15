import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/admin/", "/private/", "/api/"],
    },
    sitemap: "https://cafino.site/sitemap.xml",
  };
}
