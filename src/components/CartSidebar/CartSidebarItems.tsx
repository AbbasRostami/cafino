"use client";

import { CartItemCard } from "./CartItemCard";
import { CartSidebarLoading } from "./CartSidebarLoading";
import { CartSidebarEmpty } from "./EmptyStates";
import { CartSidebarItemsProps } from "../../types/main/cartSidebar/CartSidebar";

export const CartSidebarItems: React.FC<CartSidebarItemsProps> = ({
  cartData,
  isCartLoading,
}) => {
  if (isCartLoading) {
    return <CartSidebarLoading />;
  }

  if (!cartData?.cartItems || cartData.cartItems.length === 0) {
    return <CartSidebarEmpty />;
  }

  return (
    <div className="space-y-4">
      {cartData.cartItems.map((item) => (
        <CartItemCard key={item.itemId} item={item} />
      ))}
    </div>
  );
};
