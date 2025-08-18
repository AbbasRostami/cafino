"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import {
  CartSidebarFooter,
  CartSidebarHeader,
  CartSidebarItems,
  CartSidebarTrigger,
} from ".";
import { CartSidebarProps } from "@/types";
import { useAddToCartButtonLogic } from "@/lib/AddToCartButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CartSidebar: React.FC<CartSidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cartLogic = useAddToCartButtonLogic({
    itemId: "",
    disabled: false,
  });

  const {
    cartData,
    isCartLoading,
    handleClearCart,
    isAuthenticated: authStatus,
  } = cartLogic;

  useEffect(() => {
    if (cartData && cartData.cartItems.length === 0) {
      setIsOpen(false);
    }
  }, [cartData]);

  const pathname = usePathname();
  const isCheckoutPage = pathname === "/checkout-cart";

  const handleOpenCartSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCheckoutPage) {
      e.preventDefault();
      return;
    }
    setIsOpen(true);
  };

  const handleClearCartAndClose = async () => {
    await handleClearCart();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <CartSidebarTrigger
          cartData={cartData}
          onOpen={handleOpenCartSidebar}
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 border-l border-gray-200 dark:border-neutral-700"
      >
        {/* Header with Clear Cart Button */}
        <CartSidebarHeader
          cartData={cartData}
          onClearCart={handleClearCartAndClose}
          isClearLoading={false}
        />

        {/* Scrollable Items Section */}
        <div className="flex-1 overflow-y-auto p-6">
          <CartSidebarItems cartData={cartData} isCartLoading={isCartLoading} />
        </div>

        {/* Fixed Bottom Section with Price and Order Button */}
        <CartSidebarFooter
          cartData={cartData}
          isAuthenticated={authStatus}
          onClose={() => setIsOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
