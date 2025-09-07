import {
  getMenuQueryParams,
  convertSearchParamsToURLSearchParams,
} from "@/lib/query";
import { getItemsServer } from "@/services/server/useGetItemsServer";
import { Suspense } from "react";
import Menus from "@/components/main/menu/Menus";
import type { Metadata, ResolvingMetadata } from "next";
import { buildMenuMetadata } from "@/lib/metadata/buildMenuMetadata";
import { GenerateProps, MenuPageProps } from "@/types/main";

async function fetchMenuData(searchParams: URLSearchParams) {
  const { queryString, query } = getMenuQueryParams(searchParams);
  const serverData = await getItemsServer({ queryString });
  return { serverData, query };
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const resolvedSearchParams = await searchParams;
  const urlSearchParams =
    convertSearchParamsToURLSearchParams(resolvedSearchParams);

  const { serverData, query } = await fetchMenuData(urlSearchParams);

  return (
    <div className="min-h-screen pt-20 md:pt-32 px-4 text-gray-800 dark:text-gray-200">
      <Suspense fallback={<div>Loading...</div>}>
        <Menus initialData={serverData} query={query} />
      </Suspense>
    </div>
  );
}

// SEO - Metadata
export async function generateMetadata(
  { searchParams }: GenerateProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const urlSearchParams =
    convertSearchParamsToURLSearchParams(resolvedSearchParams);

  const { queryString } = getMenuQueryParams(urlSearchParams);

  const menuData = await getItemsServer({ queryString });
  const previousImages = (await parent).openGraph?.images || [];

  return buildMenuMetadata(menuData, {
    parent: parent,
    parentImages: previousImages as any,
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    searchParams: resolvedSearchParams,
  });
}
