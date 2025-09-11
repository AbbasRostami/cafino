import { ItemsDetails } from "@/components/main/items-details";
import { useGetItemsDetailsServer } from "@/services/server/useGetItemsDetailsServer";
import { GenerateProps, MenuItemClientProps, Item } from "@/types/main";
import type { Metadata, ResolvingMetadata } from "next";
import { buildItemMetadata } from "@/lib/metadata/buildItemMetadata";

async function fetchItem(id: string) {
  const serverData = await useGetItemsDetailsServer(id);
  return serverData?.item as Item | undefined;
}

export default async function MenuItemPage({ params }: MenuItemClientProps) {
  const { id } = await params;
  const initialItem = await fetchItem(id);

  return (
    <div className="min-h-screen pt-28 pb-10">
      <ItemsDetails id={id} initialItem={initialItem} />
    </div>
  );
}

export async function generateMetadata(
  { params }: GenerateProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItem(id);

  const previousImages = (await parent).openGraph?.images || [];
  return buildItemMetadata(item, {
    id,
    parent: parent,
    parentImages: previousImages as any,
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
}
