import { ItemsDetails } from "@/components/main/items-details";
import { useGetItemsDetailsServer } from "@/services/server";
import { GenerateProps, MenuItemClientProps, Item } from "@/types/main";
import type { Metadata, ResolvingMetadata } from "next";
import { buildItemMetadata } from "@/lib/metadata";
import { ItemDetailsSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/components/providers/queryClient";

export default async function MenuItemPage({ params }: MenuItemClientProps) {
  return (
    <div className="min-h-screen pt-28 pb-10">
      <Suspense fallback={<ItemDetailsSkeleton />}>
        <MenuItemPageWithPrefetch params={params} />
      </Suspense>
    </div>
  );
}

async function MenuItemPageWithPrefetch({ params }: MenuItemClientProps) {
  const { id, slug } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["item-details", id, slug],
    queryFn: () => useGetItemsDetailsServer(id, slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemsDetails id={id} slug={slug} />
    </HydrationBoundary>
  );
}

// SEO - Metadata
export async function generateMetadata(
  { params }: GenerateProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, slug } = await params;
  const serverData = await useGetItemsDetailsServer(id, slug);
  const item = serverData?.item as Item | undefined;

  const previousImages = (await parent).openGraph?.images || [];
  return buildItemMetadata(item, {
    id,
    parent: parent,
    parentImages: previousImages as any,
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
}
