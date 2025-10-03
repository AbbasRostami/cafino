import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "کافی‌نو - کافه و رستوران آنلاین",
    short_name: "کافی‌نو",
    description: "سفارش آنلاین غذا از بهترین کافه/رستوران شهر - کافی‌نو",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f59e0b",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-1.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/screenshot-2.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
    categories: ["food", "restaurant", "shopping"],
    lang: "fa",
    dir: "rtl",
  };
}
