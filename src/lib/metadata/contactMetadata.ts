import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata/rootMetadata";

export const contactUsMetadata: Metadata = generatePageMetadata({
  title: "تماس با کافینو | ارتباط با ما و سوالات متداول",
  description:
    "سوالات، پیشنهادات و انتقادات خود را با ما در میان بگذارید. تیم پشتیبانی کافینو آماده پاسخگویی به شما است. اطلاعات تماس، ساعات کاری و سوالات متداول.",
  path: "/contact-us",
  images: [
    {
      url: "./../../assets/Logo/2.webp",
      width: 1200,
      height: 630,
      alt: "تماس با کافینو - پشتیبانی ۲۴/۷",
    },
  ],
});
