import { Suspense } from "react";
import Menus from "@/components/main/menu/Menus";
import type { Metadata, ResolvingMetadata } from "next";
import { buildMenuMetadata } from "@/lib/metadata";
import { GenerateProps } from "@/types/main";
import { MenuSkeleton } from "@/components/skeleton";
import { MenuHeader } from "@/components/main/menu";
import { loadMenuSearchParams } from "@/utils/menuSearchParams";
import { buildQueryString } from "@/utils/menuSearchParams";
import { getItemsServer } from "@/services/server";

export default async function MenuPage({ searchParams }: GenerateProps) {
  const filters = await loadMenuSearchParams(searchParams);
  const queryString = buildQueryString(filters);

  return (
    <div className="min-h-screen pt-28 md:pt-32 px-4 text-gray-800 dark:text-gray-200">
      <MenuHeader />
      <Suspense fallback={<MenuSkeleton />}>
        <MenuContent queryString={queryString} />
      </Suspense>
    </div>
  );
}

async function MenuContent({ queryString }: { queryString: string }) {
  const initialData = await getItemsServer({ queryString });
  return <Menus initialData={initialData} />;
}

// SEO - Metadata
export async function generateMetadata(
  { searchParams }: GenerateProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const filters = await loadMenuSearchParams(searchParams);
  const queryString = buildQueryString(filters);

  const menuData = await getItemsServer({ queryString });
  const previousImages = (await parent).openGraph?.images || [];

  return buildMenuMetadata(menuData, {
    parent: parent,
    parentImages: previousImages as any,
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    searchParams: resolvedSearchParams,
  });
}
