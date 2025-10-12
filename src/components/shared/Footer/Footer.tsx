import FooterBrand from "../../main/Footer/FooterBrand";
import WorkingHours from "../../main/Footer/WorkingHours";
import QuickLinks from "../../main/Footer/QuickLinks";
import ContactInfo from "../../main/Footer/ContactInfo";
import FooterBottom from "../../main/Footer/FooterBottom";
import FooterBackground from "../../main/Footer/FooterBackground";
import { footerStructuredData } from "@/lib/metadata/footer";
import Script from "next/script";
import { Grid2X2, Home, Info, Menu, Phone } from "lucide-react";

const footerData = {
  workingHours: [
    { day: "شنبه - یکشنبه", time: "۹:۰۰ صبح – ۶:۰۰ عصر" },
    { day: "دوشنبه", time: "۹:۰۰ صبح – ６:۰۰ عصر" },
    { day: "سه شنبه", time: "۱۰:۰۰ صبح – ۵:۰۰ عصر" },
    { day: "چهار و پنجشنبه", time: "۹:۰۰ صبح – ۵:۰۰ عصر" },
    { day: "جمعه", time: "بسته" },
  ],
  quickLinks: [
    { href: "/", text: "صفحه اصلی", icon: Home },
    { href: "/category", text: "دسته بندی", icon: Grid2X2 },
    { href: "/menu", text: "منو", icon: Menu },
    { href: "/about-us", text: "درباره ما", icon: Info },
    { href: "/contact-us", text: "تماس با ما", icon: Phone },
  ],

  contactInfo: [
    { icon: "MapPin", text: "تهران، خیابان ولیعصر، پلاک ۱۲۳" },
    { icon: "Phone", text: "۰۲۱-۱۲۳۴۵۶۷۸", href: "tel:02112345678" },
    { icon: "Mail", text: "info@cafino.ir", href: "mailto:info@cafino.ir" },
    { icon: "Clock", text: "همه روزه: ۸ صبح تا ۱۱ شب" },
  ],

  socialMedia: [
    { icon: "Facebook", color: "bg-blue-600", hover: "bg-blue-700", href: "#" },
    {
      icon: "Instagram",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      hover: "from-purple-600 to-pink-600",
      href: "#",
    },
    { icon: "Twitter", color: "bg-blue-400", hover: "bg-blue-500", href: "#" },
    { icon: "Youtube", color: "bg-red-600", hover: "bg-red-700", href: "#" },
    {
      icon: "RiTelegram2Fill",
      color: "bg-blue-600",
      hover: "bg-blue-700",
      href: "#",
    },
  ],
};

const Footer = () => {
  return (
    <footer
      data-testid="footer"
      className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#0a0a0a]"
    >
      <FooterBackground />

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(footerStructuredData),
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-12 pt-12 pb-5 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 pb-3 items-start">
          <FooterBrand />
          <WorkingHours workingHours={footerData?.workingHours} />
          <QuickLinks quickLinks={footerData?.quickLinks} />
          <ContactInfo
            contactInfo={footerData?.contactInfo}
            socialMedia={footerData?.socialMedia}
          />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
