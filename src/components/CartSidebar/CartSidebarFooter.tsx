"use client";

import { CartSidebarFooterProps } from "@/types/main/cartSidebar/CartSidebar";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const CartSidebarFooter: React.FC<CartSidebarFooterProps> = ({
  cartData,
  isAuthenticated,
  onClose,
}) => {
  if (!cartData || !cartData?.cartItems || cartData?.cartItems?.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 dark:border-neutral-700 p-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              مجموع پرداختی:
            </span>
            <span className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {cartData.paymentAmount?.toLocaleString("fa-IR")} تومان
            </span>
          </div>
          {cartData.totalDiscount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-green-600 dark:text-green-400 font-medium">
                تخفیف:
              </span>
              <span className="text-green-600 dark:text-green-400 font-bold">
                -{cartData.totalDiscount?.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          )}
        </div>
        {isAuthenticated ? (
          <Link href="/checkout-cart">
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              onClick={onClose}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              ثبت سفارش
            </Button>
          </Link>
        ) : (
          <Button
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            onClick={() => {
              toast.error("برای ثبت سفارش ابتدا وارد حساب کاربری شوید.");
            }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            ثبت سفارش
          </Button>
        )}
      </div>
    </div>
  );
};
