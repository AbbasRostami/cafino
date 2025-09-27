import type { Metadata, ResolvingMetadata } from "next";
import { MenuItemResponse } from "@/types/main/menu";

type BuildMenuMetadataOptions = {
  baseUrl?: string;
  parent?: ResolvingMetadata;
  parentImages?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

type MenuItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  images?: Array<{ imageUrl: string }>;
  category?: { title: string };
};

// Type guard for menu data
function isValidMenuData(data: unknown): data is MenuItemResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof (data as any).data === "object" &&
    "items" in (data as any).data &&
    Array.isArray((data as any).data.items)
  );
}

// Build canonical URL with query params
function buildCanonicalUrl(
  baseUrl: string,
  searchParams?: { [key: string]: string | string[] | undefined }
): string {
  const url = new URL("/menu", baseUrl);

  if (searchParams) {
    // Only include relevant SEO parameters in canonical URL
    const seoParams = ["category", "search", "sortBy", "page"];

    seoParams.forEach((key) => {
      const value = searchParams[key];
      if (value !== undefined && value !== "" && value !== "all") {
        if (Array.isArray(value)) {
          value.forEach((v) => url.searchParams.append(key, v));
        } else {
          url.searchParams.set(key, value);
        }
      }
    });
  }

  return url.toString();
}

// Build pagination links
function buildPaginationLinks(
  baseUrl: string,
  currentPage: number,
  totalPages: number,
  searchParams?: { [key: string]: string | string[] | undefined }
) {
  const links: { prev?: string; next?: string } = {};

  const addParamsToUrl = (
    url: URL,
    params: { [key: string]: string | string[] | undefined }
  ) => {
    const seoParams = ["category", "search", "sortBy"];

    seoParams.forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== "" && value !== "all") {
        if (Array.isArray(value)) {
          value.forEach((v) => url.searchParams.append(key, v));
        } else {
          url.searchParams.set(key, value);
        }
      }
    });
  };

  if (currentPage > 1) {
    const prevUrl = new URL("/menu", baseUrl);
    if (searchParams) {
      addParamsToUrl(prevUrl, searchParams);
    }
    prevUrl.searchParams.set("page", String(currentPage - 1));
    links.prev = prevUrl.toString();
  }

  if (currentPage < totalPages) {
    const nextUrl = new URL("/menu", baseUrl);
    if (searchParams) {
      addParamsToUrl(nextUrl, searchParams);
    }
    nextUrl.searchParams.set("page", String(currentPage + 1));
    links.next = nextUrl.toString();
  }

  return links;
}

export function buildMenuMetadata(
  menuData: MenuItemResponse | undefined,
  { baseUrl, parentImages, searchParams }: BuildMenuMetadataOptions
): Metadata {
  // Error handling
  if (!isValidMenuData(menuData)) {
    return {
      title: "خطا در دریافت منو",
      description: "اطلاعات منو یافت نشد",
      robots: { index: false, follow: false },
    };
  }

  const siteUrl =
    baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = buildCanonicalUrl(siteUrl, searchParams);

  let title = "منوی کافینو";
  let description =
    "منوی کامل کافینو با انواع نوشیدنی‌ها، غذاها و دسرهای خوشمزه";

  if (searchParams) {
    const category = searchParams?.category;
    const search = searchParams?.search;
    const page = searchParams?.page;
    const sortBy = searchParams?.sortBy;

    // Base title and description
    if (category) {
      title = `منوی ${category} - کافینو`;
      description = `انواع ${category} در کافینو با کیفیت عالی و قیمت مناسب`;
    } else if (search) {
      title = `جستجو: ${search} - کافینو`;
      description = `نتایج جستجو برای "${search}" در منوی کافینو`;
    }

    // Add sorting information to title and description
    if (sortBy) {
      const sortLabels: { [key: string]: string } = {
        newest: "جدیدترین",
        topRated: "بیشترین امتیاز",
        highestDiscount: "بیشترین تخفیف",
        highestPrice: "گران‌ترین",
        lowestPrice: "ارزان‌ترین",
        all: "همه",
      };

      const sortLabel = sortLabels[sortBy as keyof typeof sortLabels] || sortBy;

      if (category) {
        title = `منوی ${category} - ${sortLabel} - کافینو`;
        description = `انواع ${category} در کافینو مرتب شده بر اساس ${sortLabel} با کیفیت عالی و قیمت مناسب`;
      } else if (search) {
        title = `جستجو: ${search} - ${sortLabel} - کافینو`;
        description = `نتایج جستجو برای "${search}" در منوی کافینو مرتب شده بر اساس ${sortLabel}`;
      } else {
        title = `منوی کافینو - ${sortLabel}`;
        description = `منوی کامل کافینو مرتب شده بر اساس ${sortLabel} با انواع نوشیدنی‌ها، غذاها و دسرهای خوشمزه`;
      }
    }

    if (page && Number(page) > 1) {
      title += ` - صفحه ${page}`;
    }
  }

  const featuredImages = menuData?.data?.items
    .slice(0, 3)
    .map((item: MenuItem) => ({
      url: item.images?.[0]?.imageUrl || "",
      width: 1200,
      height: 630,
      alt: item.title,
    }))
    .filter((img) => img.url);

  const ogImages = [...featuredImages, ...(parentImages || [])];

  const totalItems = menuData?.data?.total || 0;
  const currentPage = menuData?.data?.page || 1;
  const totalPages = Math.ceil(totalItems / (menuData?.data?.limit || 6));

  const paginationLinks = buildPaginationLinks(
    siteUrl,
    currentPage,
    totalPages,
    searchParams
  );

  const limitedItems = menuData?.data?.items.slice(0, 8);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...(paginationLinks.prev && { prev: paginationLinks.prev }),
      ...(paginationLinks.next && { next: paginationLinks.next }),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "کافینو",
      type: "website",
      images: ogImages,
      locale: "fa_IR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: featuredImages.length > 0 ? [featuredImages[0].url] : undefined,
    },
    other: {
      "menu:total_items": String(totalItems),
      "menu:current_page": String(currentPage),
      "menu:total_pages": String(totalPages),
      "menu:items_per_page": String(menuData?.data?.limit || 6),
      "schema:itemlist": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: title,
        description: description,
        numberOfItems: limitedItems.length,
        ...(searchParams?.sortBy && {
          sortOrder:
            searchParams.sortBy === "newest"
              ? "desc"
              : searchParams.sortBy === "topRated"
              ? "desc"
              : searchParams.sortBy === "highestDiscount"
              ? "desc"
              : searchParams.sortBy === "highestPrice"
              ? "desc"
              : searchParams.sortBy === "lowestPrice"
              ? "asc"
              : undefined,
        }),
        itemListElement: limitedItems?.map((item: MenuItem, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: item?.title,
            description: item.description,
            image: item.images?.[0]?.imageUrl,
            offers: {
              "@type": "Offer",
              price:
                item?.discount > 0
                  ? item.price - (item.price * item.discount) / 100
                  : item.price,
              priceCurrency: "IRR",
              availability:
                item?.quantity > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
            category: item.category?.title || "عمومی",
          },
        })),
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
  };
}
