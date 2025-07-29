"use client";

import ItemSectionClient from "./ItemSectionClient";
import { useGet } from "@/hooks/useReactQueryHooks";

export default function ItemSection() {
  const { data: items, isLoading } = useGet<any>("/v1/item?page=1&limit=10", {
    queryKey: ["items"],
    staleTime: 0,
  });
  return <ItemSectionClient items={items?.data || []} isLoading={isLoading} />;
}
