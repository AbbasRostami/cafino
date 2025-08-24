"use client";

import { ItemResponse } from "@/types/main/Landing/itemsSection";
import ItemSectionClient from "./ItemSectionClient";
import { useGet } from "@/hooks/useReactQueryHooks";
import { SkeletonItemSection } from "@/components/skeleton";
import { MotionDiv } from "@/utils/MotionWrapper";
import {
  generateItemsSectionStructuredData,
  generateRestaurantStructuredData,
} from "@/lib/metadata/itemsSection";
import Script from "next/script";

export default function ItemSection() {
  const { data: itemsResponse, isLoading } = useGet<ItemResponse>(
    "/v1/item?page=1&limit=15&sortBy=newest",
    {
      queryKey: ["items"],
      staleTime: 0,
    }
  );

  if (isLoading) {
    return (
      <section className="container mx-auto px-2 py-12 pb-16" dir="rtl">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-500 relative z-10">
              منوی محبوب
            </span>
            <span className="absolute -top-3 -right-4 text-amber-400 dark:text-amber-500 text-9xl opacity-20">
              ✨
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            بهترین انتخاب‌های ما از میان صدها غذای خوشمزه
          </p>
        </div>
        <div className="overflow-hidden pt-2 px-2 rounded-2xl">
          <MotionDiv
            className="flex gap-6 flex-nowrap"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonItemSection key={index} />
            ))}
          </MotionDiv>
        </div>
      </section>
    );
  }

  const items = itemsResponse?.data.items || [];
  const itemsStructuredData = generateItemsSectionStructuredData(items);
  const restaurantStructuredData = generateRestaurantStructuredData();

  return (
    <>
      <Script
        id="items-section-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemsStructuredData).replace(/</g, "\u003c"),
        }}
      />
      <Script
        id="restaurant-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantStructuredData).replace(
            /</g,
            "\u003c"
          ),
        }}
      />
      <ItemSectionClient items={items} />
    </>
  );
}
