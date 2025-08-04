"use client";

import { ItemResponse } from "@/types/main/Landing/itemsSection/itemsSection";
import ItemSectionClient from "./ItemSectionClient";
import { useGet } from "@/hooks/useReactQueryHooks";

export default function ItemSection() {
  const { data: items, isLoading } = useGet<ItemResponse>(
    "/v1/item?page=1&limit=10",
    {
      queryKey: ["items"],
      staleTime: 0,
    }
  );
  console.log("kdsjiuhjc", items);

  return <ItemSectionClient items={items?.data || []} isLoading={isLoading} />;
}
