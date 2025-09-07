import Script from "next/script";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cafinoo.vercel.app";
const siteName = "کافینو";
const siteDescription =
  "کافه و رستوران کافینو - بهترین تجربه طعم و مزه با منوی متنوع نوشیدنی‌ها، غذاها و دسرهای خوشمزه";

export const restaurantStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/assets/Logo/2.webp`,
  image: `${siteUrl}/assets/Logo/2.webp`,
  telephone: "+98-21-1234-5678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "خیابان ولیعصر",
    addressLocality: "تهران",
    addressRegion: "تهران",
    postalCode: "1234567890",
    addressCountry: "IR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "35.7219",
    longitude: "51.3347",
  },
  servesCuisine: ["ایرانی", "بین‌المللی"],
  priceRange: "$$",
  acceptsReservations: true,
  hasMenu: `${siteUrl}/menu`,
  openingHours: ["Mo-Su 08:00-23:00"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "23:00",
    },
  ],
  paymentAccepted: ["Cash", "Credit Card"],
  currenciesAccepted: "IRR",
  sameAs: ["https://instagram.com/cafino", "https://telegram.me/cafino"],
};

export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: siteName,
  description: siteDescription,
  url: siteUrl,

  telephone: "+98-21-1234-5678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "خیابان ولیعصر",
    addressLocality: "تهران",
    addressRegion: "تهران",
    postalCode: "1234567890",
    addressCountry: "IR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "35.7219",
    longitude: "51.3347",
  },

  servesCuisine: ["ایرانی", "بین‌المللی"],
  acceptsReservations: true,
  hasMenu: `${siteUrl}/menu`,
  currenciesAccepted: "IRR",
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  telephone: "+98-21-1234-5678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "خیابان ولیعصر",
    addressLocality: "تهران",
    addressRegion: "تهران",
    postalCode: "1234567890",
    addressCountry: "IR",
  },
};

export function StructuredDataScripts() {
  return (
    <>
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantStructuredData),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
    </>
  );
}
