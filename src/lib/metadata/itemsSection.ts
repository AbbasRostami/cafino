import { Item } from "@/types/main/Landing/itemsSection";

export const generateItemsSectionStructuredData = (items: Item[]) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "منوی محبوب",
    description: "بهترین انتخاب‌های ما از میان صدها غذای خوشمزه",
    url: "https://cafinoo.vercel.app/menu",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.title,
        description: item.description,
        image: item.images?.[0]?.imageUrl || "/images/default.png",
        category: item.category?.title,
        brand: {
          "@type": "Brand",
          name: "Cafino",
        },
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "IRR",
          availability:
            item.quantity > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          priceValidUntil: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000
          ).toISOString(),
          seller: {
            "@type": "Organization",
            name: "Cafino",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: item?.rate || 0,
          reviewCount: item?.rate_count || 0,
          bestRating: 5,
          worstRating: 1,
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "مواد تشکیل دهنده",
            value: item.ingredients?.join(", ") || "",
          },
          {
            "@type": "PropertyValue",
            name: "موجودی",
            value: item.quantity,
          },
        ],
      },
    })),
  };

  return structuredData;
};

export const generateRestaurantStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Cafino",
    description: "رستوران و کافه با بهترین غذاها و نوشیدنی‌ها",
    url: "https://cafinoo.vercel.app",
    telephone: "+98-21-XXXXXXXX",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IR",
      addressLocality: "تهران",
      addressRegion: "تهران",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.6892,
      longitude: 51.389,
    },
    openingHours: ["Mo-Su 08:00-23:00"],
    priceRange: "$$",
    servesCuisine: ["ایرانی", "فست فود", "کافه", "دسر"],
    hasMenu: "https://cafinoo.vercel.app/menu",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: 150,
      bestRating: 5,
      worstRating: 1,
    },
  };
};
