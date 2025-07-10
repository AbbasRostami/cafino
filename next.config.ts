import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    ],
  },
};

export default nextConfig;
