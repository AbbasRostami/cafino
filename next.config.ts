import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cafino.storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
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
};

export default nextConfig;
