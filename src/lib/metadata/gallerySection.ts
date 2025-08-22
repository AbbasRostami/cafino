export const gallerySectionStructuredData = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "گالری تصاویر کافینو",
  description: "گالری تصاویر فضای داخلی و بیرونی کافه کافینو با طراحی مدرن",
  url: "https://cafinoo.vercel.app",
  mainEntity: {
    "@type": "Restaurant",
    name: "کافینو",
    description: "کافه مدرن با فضای آرامش‌بخش و منوی متنوع",
    address: {
      "@type": "PostalAddress",
      streetAddress: "خیابان ولیعصر، پلاک ۱۲۳",
      addressLocality: "تهران",
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.6892,
      longitude: 51.389,
    },
    servesCuisine: ["کافه", "قهوه", "صبحانه"],
    priceRange: "$$",
  },
  image: [
    {
      "@type": "ImageObject",
      name: "فضای داخلی کافه",
      description: "فضای آرامش‌بخش با طراحی مدرن و دکوراسیون چشم‌نواز",
      contentUrl: "/assets/Gallery/Gallery4.avif",
    },
    {
      "@type": "ImageObject",
      name: "قهوه تخصصی",
      description: "دانه‌های قهوه باکیفیت از بهترین مناطق جهان",
      contentUrl: "/assets/Gallery/Gallery3.avif",
    },
    {
      "@type": "ImageObject",
      name: "صبحانه لذیذ",
      description: "صبحانه‌های متنوع و سالم با مواد اولیه تازه",
      contentUrl: "/assets/Gallery/Gallery2.avif",
    },
    {
      "@type": "ImageObject",
      name: "فضای بیرونی",
      description: "محیطی دلنشین برای لذت بردن از طبیعت و قهوه",
      contentUrl: "/assets/Gallery/Gallery1.avif",
    },
  ],
  about: {
    "@type": "Thing",
    name: "فضای کافه",
    description:
      "محیطی آرامش‌بخش با طراحی مدرن برای استراحت و لذت بردن از قهوه",
  },
};
