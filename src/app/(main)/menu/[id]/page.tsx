"use client";

import { useGet } from "@/hooks/useReactQueryHooks";
import ItemsDetails from "@/components/items-details/ItemsDetails";
import { ItemDetailsSkeleton } from "@/components/skeleton/main/item-details/ItemDetailsSkeleton";
import { use } from "react";
export type Comment = {
  id: string;
  text: string;
  user: {
    id: string;
    text: string;
    user: {
      username: string;
      last_name: string;
      first_name: string;
    };
  };
  children: Comment[];
};

export type MenuItemDetails = {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  rate: number;
  rate_count: number;
  isFav: boolean;
  ingredients: string[];
  images: {
    image: string;
    imageUrl: string;
  }[];
  comments: Comment[];
  category: {
    id: string;
    title: string;
  };
};
type MenuItemClientProps = {
  params: Promise<{ id: string }>;
};
const MenuItemClient = ({ params }: MenuItemClientProps) => {
  const { id } = use(params);
  const { data: item, isLoading } = useGet<{
    data: MenuItemDetails;
    statusCode: number;
  }>(`/v1/item/${id}`, {
    queryKey: ["item", id],
    staleTime: 0,
  });
  console.log("data", item?.data);
  if (isLoading || !item?.data) return <ItemDetailsSkeleton />;

  return (
    <div className="min-h-screen pt-28 pb-10">
      <ItemsDetails item={item?.data} />
    </div>
  );
};

export default MenuItemClient;
