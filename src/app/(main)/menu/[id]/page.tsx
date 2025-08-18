"use client";

import { useGetItemDetails } from "@/services/items";
import { use } from "react";
import { MenuItemClientProps } from "@/types/main";
import { ItemDetailsSkeleton } from "@/components/skeleton";
import { ItemsDetails } from "@/components/main/items-details";

const MenuItemClient = ({ params }: MenuItemClientProps) => {
  const { id } = use(params);
  const { data: item, isLoading } = useGetItemDetails(id);

  if (isLoading || !item?.data) return <ItemDetailsSkeleton />;

  return (
    <div className="min-h-screen pt-28 pb-10">
      <ItemsDetails data={item?.data} />
    </div>
  );
};

export default MenuItemClient;
