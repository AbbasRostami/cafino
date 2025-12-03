import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cafino.site";
const siteName = "کافینو";
const siteDescription =
  "کافه و رستوران کافینو - بهترین تجربه طعم و مزه با منوی متنوع نوشیدنی‌ها، غذاها و دسرهای خوشمزه";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} | کافه و رستوران`,
    template: `%s`,
  },
  description: siteDescription,

  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | کافه و رستوران`,
    description: siteDescription,
    images: [
      {
        url: "/MainTel.jpg",
        width: 1200,
        height: 630,
        alt: `${siteName} - کافه و رستوران`,
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} | کافه و رستوران`,
    description: siteDescription,
    images: ["/MainTel.jpg"],
  },

  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/MainTel.jpg", sizes: "32x32", type: "image/x-icon" },
      { url: "/MainTel.jpg", sizes: "16x16", type: "image/x-icon" },
    ],
    apple: [{ url: "/MainTel.jpg", sizes: "180x180", type: "image/x-icon" }],
    other: [
      {
        rel: "mask-icon",
        url: "/MainTel.jpg",
        color: "#8B4513",
      },
    ],
  },

  appleWebApp: {
    title: siteName,
    statusBarStyle: "default",
    capable: true,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  authors: [{ name: "کافینو تیم" }],
  creator: "کافینو",
  publisher: "کافینو",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  category: "restaurant",

  other: {
    "application-name": siteName,
    "msapplication-TileColor": "#8B4513",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#8B4513",

    "business:contact_data:locality": "گیلان",
    "business:contact_data:country_name": "IR",
    "business:contact_data:website": siteUrl,

    "restaurant:cuisine": "ایرانی, بین‌المللی",
    "restaurant:price_range": "$$",
    "restaurant:accepts_reservations": "true",
  },
};

export function generatePageMetadata({
  title,
  description,
  path = "",
  images = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  noIndex?: boolean;
}): Metadata {
  const pageUrl = `${siteUrl}${path}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  const pageImages = [
    ...images,
    {
      url: "/MainTel.jpg",
      width: 1200,
      height: 600,
      alt: fullTitle,
    },
  ];

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: siteName,
      type: "website",
      locale: "fa_IR",
      images: pageImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: pageImages?.length > 0 ? [pageImages[0].url] : ["/MainTel.jpg"],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
