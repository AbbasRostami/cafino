import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nestjs.storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cafino.storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "4kwallpapers.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uiparadox.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Proxy API requests to external API
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cafino-api.onrender.com/:path*",
      },
    ];
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ["@svgr/webpack"],
      }
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
