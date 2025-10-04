// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cafino.storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self'; img-src 'self' https://cafino.storage.c2.liara.space; connect-src 'self' https://cafino.storage.c2.liara.space",
          },
        ],
      },
    ];
  },
};
const revision = "v1";
export default async function () {
  const withSerwist = (await import("@serwist/next")).default({
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
    cacheOnNavigation: true,
    register: true,
    reloadOnOnline: true,
    dontCacheBustURLsMatching:
      /^\/_next\/static\/(?:chunks|css)\/.*\.(?:js|css)$/,
    additionalPrecacheEntries: [{ url: "/offline", revision }],
  });

  return withSerwist(nextConfig);
}
