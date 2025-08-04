"use client";

import { AnimatePresence } from "framer-motion";
import { CheckoutCartProps } from "@/types/main/checkout/checkout";
import { useCheckout } from "@/hooks/useCheckout";
import {
  CheckoutHeader,
  CartItemCard,
  DiscountSection,
  OrderSummary,
  EmptyCart,
} from "./index";

export default function CheckoutCart({ cart }: CheckoutCartProps) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isDiscountApplied,
    handleRemove,
    addDiscountLoading,
    removeDiscountLoading,
    handleBackClick,
    handleClearCartClick,
    clearLoading,
  } = useCheckout();

  return (
    <div className="min-h-screen pt-36 py-8 px-4 relative ">
      {/* افکت‌های پس‌زمینه */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')] opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <div className="container mx-auto px-2 md:px-8 lg:px-16">
        {/* هدر صفحه */}
        <CheckoutHeader
          cart={cart}
          onBackClick={handleBackClick}
          onClearCart={handleClearCartClick}
          clearLoading={clearLoading}
        />

        {/* حالت سبد خالی */}
        {cart?.cartItems?.length === 0 ||
        cart?.cartItems?.length === undefined ? (
          <EmptyCart onBackToMenu={handleBackClick} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* بخش آیتم‌های سبد خرید */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart?.cartItems?.map((item: any) => (
                  <CartItemCard key={item?.itemId} item={item} />
                ))}
              </AnimatePresence>

              {/* بخش کد تخفیف */}
              <DiscountSection
                cart={cart}
                onSubmit={onSubmit}
                onRemove={handleRemove}
                isDiscountApplied={isDiscountApplied}
                addDiscountLoading={addDiscountLoading}
                removeDiscountLoading={removeDiscountLoading}
                errors={errors}
                register={register}
                handleSubmit={handleSubmit}
              />
            </div>

            {/* بخش خلاصه سفارش (دسکتاپ) */}
            <OrderSummary cart={cart} />
          </div>
        )}

        {/* بخش خلاصه سفارش (موبایل) */}
        {cart?.cartItems?.length && cart?.cartItems?.length > 0 && (
          <OrderSummary cart={cart} isMobile={true} />
        )}
      </div>
    </div>
  );
}
