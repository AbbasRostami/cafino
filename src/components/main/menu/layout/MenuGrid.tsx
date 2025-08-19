"use client";
import { MenuItemCard } from "../item/MenuItemCard";
import { MenuGridProps, MenuItem } from "@/types/main";

export const MenuGrid = ({ items, viewMode }: MenuGridProps) => {
  return (
    <div
      className={`${
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          : "grid grid-cols-1 xl:grid-cols-2 gap-7"
      }`}
    >
      {items?.map((item: MenuItem) => (
        <MenuItemCard key={item?.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  );
};
