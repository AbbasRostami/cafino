import { NextConfig } from "next";

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
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' https://cafino.storage.c2.liara.space; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://cafino.storage.c2.liara.space https://api.cafinoo.com; font-src 'self' data:; object-src 'none'; frame-ancestors 'none';",
          },
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
              process.env.NODE_ENV === "development"
                ? "default-src 'self'; script-src 'self' 'unsafe-eval'; img-src 'self' https://cafino.storage.c2.liara.space; connect-src 'self' https://cafino.storage.c2.liara.space"
                : "default-src 'self'; script-src 'self'; img-src 'self' https://cafino.storage.c2.liara.space; connect-src 'self' https://cafino.storage.c2.liara.space",
          },
        ],
      },
    ];
  },
};

export default async function () {
  const revision = crypto.randomUUID();
  const withSerwist = (await import("@serwist/next")).default({
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
    cacheOnNavigation: true,
    register: true,
    reloadOnOnline: true,
    dontCacheBustURLsMatching:
      /^\/_next\/static\/(?:chunks|css)\/.*\.(?:js|css)$/,
    additionalPrecacheEntries: [
      { url: "/offline", revision: revision },
      { url: "/", revision: revision },
      { url: "/menu", revision: revision },
      { url: "/about-us", revision: revision },
      { url: "/contact-us", revision: revision },
      { url: "/profile", revision: revision },
      { url: "/checkout-cart", revision: revision },
      { url: "/payment", revision: revision },
      { url: "/favicon.ico", revision: revision },
      { url: "/manifest.json", revision },
      { url: "/icon-192x192.png", revision },
      { url: "/icon-512x512.png", revision },
      { url: "/Main-logo-192x192.webp", revision },
      { url: "/Main-logo-512x512.webp", revision },
    ],

    exclude: [
      /\.map$/,
      /^manifest$/,
      /\.txt$/,
      /\.xml$/,
      /\.json$/,
      /^_next\/static\/chunks\/pages\/_error/,
    ],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  });

  return withSerwist(nextConfig);
}
