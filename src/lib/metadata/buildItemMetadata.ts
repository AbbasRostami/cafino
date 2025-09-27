import type { Metadata, ResolvingMetadata } from "next";
import { Item } from "@/types";

type BuildItemMetadataOptions = {
  id: string;
  baseUrl?: string;
  parent?: ResolvingMetadata;
  parentImages?: NonNullable<Metadata["openGraph"]> extends infer T
    ? T extends { images?: any }
      ? NonNullable<T["images"]>
      : never
    : never;
};

export function buildItemMetadata(
  item: Item | undefined,
  { id, baseUrl, parentImages }: BuildItemMetadataOptions
): Metadata {
  const siteUrl =
    baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}/menu/${id}`;

  if (!item) {
    return {
      title: "محصول یافت نشد",
      description: "این محصول در دسترس نیست یا حذف شده است.",
      alternates: { canonical: url },
      robots: { index: false, follow: false },
      openGraph: {
        title: "محصول یافت نشد",
        description: "این محصول در دسترس نیست یا حذف شده است.",
        url,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: "محصول یافت نشد",
        description: "این محصول در دسترس نیست یا حذف شده است.",
      },
    };
  }

  const title = item?.title;
  const description = item?.description;
  const primaryImage = item.images?.[0]?.imageUrl;
  const ogImages = [
    ...(primaryImage
      ? [
          {
            url: primaryImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ]
      : []),
    ...((parentImages as any[]) || []),
  ];

  const keywords = [
    title,
    ...(item?.ingredients || []),
    item.category?.title || "",
    "کافینو",
  ].filter(Boolean) as string[];

  const price = item?.price;
  const discount = item?.discount || 0;
  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: "Cafino",
      type: "website",
      images: ogImages as any,
      locale: "fa_IR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: primaryImage ? [primaryImage] : undefined,
    },
    other: {
      "product:price:amount": String(finalPrice),
      "product:price:currency": "IRR",
      "product:availability": item?.quantity > 0 ? "in stock" : "out of stock",
      "product:category": item?.category?.title || "محصول",
      "product:brand": "کافینو",
      "schema:product": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description: description,
        image: primaryImage ? [primaryImage] : [],
        offers: {
          "@type": "Offer",
          price: finalPrice,
          priceCurrency: "IRR",
          availability:
            item?.quantity > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
      }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  } as Metadata;
}
