"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  // useCartStore,
  useClearCart,
} from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useGet } from "@/hooks/useReactQueryHooks";
import type { CartApiResponse } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartItemControls } from "@/lib/CartItemControls";
import { useCart } from "@/store/cartStore";

interface CartSidebarProps {
  // cartItems is now handled internally from cart store
}

const CartSidebar: React.FC<CartSidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Guest cart store
  // const guestCart = useCartStore((s) => s.cart);
  // const guestIncItem = useCartStore((s) => s.incItem);
  // const guestDecItem = useCartStore((s) => s.decItem);
  // const guestRemoveItem = useCartStore((s) => s.removeItem);
  // const guestClearCart = useCartStore((s) => s.clearCart);
  // const guestSyncCart = useCartStore((s) => s.syncCart);

  // Server cart (authenticated)
  const { cart, isCartLoading, refetch, cartError } = useCart();
  const cartData = isAuthenticated
    ? cartError && "statusCode" in cartError && cartError.statusCode === 404
      ? { cartItems: [], totalAmount: 0, totalDiscount: 0, paymentAmount: 0 }
      : cart
    : { cartItems: [], totalAmount: 0, totalDiscount: 0, paymentAmount: 0 }; // guestCart

  const clearCartMutation = useClearCart();

  const handleClearCart = async () => {
    if (isAuthenticated) {
      try {
        clearCartMutation.mutate();
        setIsOpen(false);
        setTimeout(() => {
          refetch();
        }, 100);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      // guestClearCart();
      // guestSyncCart();
      setIsOpen(false);
    }
  };

  const getItemMaxQuantity = (itemId: string) => {
    const item = cartData?.cartItems?.find(
      (item: any) => item.itemId === itemId
    );
    return item?.quantity ?? 10;
  };

  // Close modal when cart is cleared
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
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative mr-2">
          <button
            onClick={handleOpenCartSidebar}
            className="p-2.5 rounded-full border transition-all cursor-pointer duration-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg hover:scale-110 group"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
            {cartData?.cartItems && cartData.cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[22px] flex items-center justify-center border-2 border-white dark:border-neutral-800 shadow-lg animate-pulse">
                {cartData.cartItems.length}
              </span>
            )}
          </button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 border-l border-gray-200 dark:border-neutral-700"
      >
        {/* Header with Clear Cart Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <h2 className=" text-sm sm:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              سبد خرید شما
            </h2>
          </div>
          {cartData?.cartItems && cartData.cartItems.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              disabled={clearCartMutation.isPending}
              className="flex items-center gap-2 cursor-pointer border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              حذف همه
            </Button>
          )}
        </div>

        {/* Scrollable Items Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isCartLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                در حال به‌روزرسانی سبد خرید...
              </h3>
            </div>
          ) : !cartData?.cartItems || cartData.cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-600 flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400 dark:text-neutral-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                سبد خرید خالی است
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                محصولات مورد نظر خود را به سبد خرید اضافه کنید
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartData?.cartItems?.map((item: any) => {
                const maxQuantity = getItemMaxQuantity(item.itemId);

                return (
                  <div
                    key={item.itemId}
                    className="group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-100 dark:border-neutral-800 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-all duration-300"
                  >
                    {/* نوار رنگی لوکس در بالای کارت */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>

                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* تصویر محصول با افکت شیشه‌ای */}
                        <div className="relative">
                          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden w-20 h-20 flex items-center justify-center backdrop-blur-sm">
                            <img
                              src={item?.images[0]}
                              alt={item?.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-white dark:ring-neutral-900">
                            {item?.count}
                          </div>
                        </div>

                        {/* محتوای متنی */}
                        <div className="flex-1 min-w-0">
                          {/* عنوان و قیمت */}
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 line-clamp-2 tracking-tight">
                              {item?.title}
                            </h3>
                            <div className="flex flex-col items-end">
                              <span className="text-base font-semibold text-amber-700 dark:text-amber-400">
                                {Math.round(item?.price).toLocaleString(
                                  "fa-IR"
                                )}
                              </span>
                              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                تومان
                              </span>
                            </div>
                          </div>

                          {/* تخفیف */}
                          {Number(item.discount) > 0 && (
                            <div className="mb-2">
                              <span className="inline-flex items-center text-xs font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                                <span className="ml-1">
                                  %{Number(item.discount)}
                                </span>
                                تخفیف
                              </span>
                            </div>
                          )}

                          {/* کنترل‌های تعداد */}
                          <div className="flex items-center justify-between mt-4">
                            <CartItemControls itemId={item.itemId} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Fixed Bottom Section with Price and Order Button */}
        {cartData && cartData?.cartItems && cartData?.cartItems?.length > 0 && (
          <div className="border-t border-gray-200 dark:border-neutral-700 p-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-200">
                    مجموع پرداختی:
                  </span>
                  <span className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {cartData?.paymentAmount?.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
                {cartData?.totalDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      تخفیف:
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      -{cartData?.totalDiscount?.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                )}
              </div>
              <Link href="/checkout-cart">
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  ثبت سفارش
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
