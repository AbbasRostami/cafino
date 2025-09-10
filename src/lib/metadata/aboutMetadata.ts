import { Metadata } from "next";
import { generatePageMetadata } from "./rootMetadata";

export const aboutUsMetadata: Metadata = generatePageMetadata({
  title: "درباره کافینو | کافه و رستوران",
  description:
    "از سال ۱۳۹۵، کافینو به عنوان یکی از پیشگامان صنعت کافه‌داری در تهران، تجربه‌ای منحصر به فرد از طعم‌های اصیل و محیطی گرم و دوستانه ارائه می‌دهد. با تیم متخصص و ارزش‌های منحصر به فرد.",
  path: "/about-us",
  images: [
    {
      url: "./../../assets/Gallery/Gallery1.avif",
      width: 1200,
      height: 630,
      alt: "درباره کافینو - کافه و رستوران",
    },
  ],
});
