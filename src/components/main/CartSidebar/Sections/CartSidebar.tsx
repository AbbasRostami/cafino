"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  CartSidebarFooter,
  CartSidebarHeader,
  CartSidebarItems,
  CartSidebarTrigger,
} from "..";
import { useAddToCartButtonLogic } from "@/hooks/business/AddToCartButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CartSidebar = () => {
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
    if (cartData && cartData?.cartItems?.length === 0) {
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
        data-testid="cart-drawer"
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-neutral-700 "
      >
        <VisuallyHidden>
          <SheetTitle>سبد خرید</SheetTitle>
          <SheetDescription>
            اینجا توضیح کوتاه در مورد دیالوگ یا Sheet
          </SheetDescription>
        </VisuallyHidden>

        <CartSidebarHeader
          cartData={cartData}
          onClearCart={handleClearCartAndClose}
          isClearLoading={false}
        />

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <CartSidebarItems cartData={cartData} isCartLoading={isCartLoading} />
        </div>

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
