"use client";

import { use } from "react";
import { useGet } from "@/hooks/useReactQueryHooks";
import ItemsDetails from "@/components/items-details/ItemsDetails";
import { ItemDetailsSkeleton } from "@/components/skeleton/ItemDetailsSkeleton";

const MenuItemClient = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: item, isLoading } = useGet<any>(`/v1/item/${id}`, {
    queryKey: ["item", id],
    staleTime: 0,
  });
  console.log("data", item?.data);
  if (isLoading) return <ItemDetailsSkeleton />;

  return (
    <div className="min-h-screen pt-28 pb-10">
      <ItemsDetails item={item?.data} />
    </div>
  );
};

export default MenuItemClient;
