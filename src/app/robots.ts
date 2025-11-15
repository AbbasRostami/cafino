import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/"],
        disallow: [
          "/_next/image/",
          "/_next/data/",
          "/admin/",
          "/private/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://cafino.site/sitemap.xml",
  };
}
