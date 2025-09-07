"use client";

import { CartSidebarItemsProps } from "@/types";
import { CartItemCard } from "./Sections/CartItemCard";
import { CartSidebarLoading } from "../../skeleton/main/cartSidebar";
import { CartSidebarEmpty } from "./EmptyStates";

export const CartSidebarItems: React.FC<CartSidebarItemsProps> = ({
  cartData,
  isCartLoading,
}) => {
  if (isCartLoading) {
    return <CartSidebarLoading />;
  }

  if (!cartData?.cartItems || cartData?.cartItems?.length === 0) {
    return <CartSidebarEmpty />;
  }

  return (
    <div className="space-y-4">
      {cartData?.cartItems?.map((item) => (
        <CartItemCard key={item?.itemId} item={item} />
      ))}
    </div>
  );
};
