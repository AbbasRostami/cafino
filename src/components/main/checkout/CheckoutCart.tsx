"use client";

import { CheckoutCartProps } from "@/types/main";
import { useCheckout } from "@/hooks/business/useCheckout";
import {
  AddressSelector,
  CartItemCard,
  CheckoutHeader,
  DiscountSection,
  EmptyCart,
  OrderSummary,
  SelectedAddressDisplay,
} from "./index";
import { MotionAnimatePresence } from "@/utils/MotionWrapper";

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

    // Address related
    addresses,
    addressesLoading,
    selectedAddressId,
    selectedAddress,
    handleAddressSelect,
    handleEditAddress,
    handleAddressAdded,

    // Checkout related
    isCheckoutLoading,
    handleCompleteOrder,
  } = useCheckout();

  const unavailableItems =
    cart?.cartItems?.filter((item) => item?.isAvailable === false) || [];
  const availableItems =
    cart?.cartItems?.filter((item) => item?.isAvailable !== false) || [];
  const hasUnavailableItems = unavailableItems.length > 0;
  const hasAvailableItems = availableItems.length > 0;

  return (
    <div className="min-h-screen pt-36 py-8 px-4 relative ">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')] opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <div className="container mx-auto px-2 md:px-8 lg:px-16">
        <CheckoutHeader
          cart={cart}
          onBackClick={handleBackClick}
          onClearCart={handleClearCartClick}
          clearLoading={clearLoading}
        />

        {cart?.cartItems?.length === 0 ||
        cart?.cartItems?.length === undefined ? (
          <EmptyCart onBackToMenu={handleBackClick} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {selectedAddress ? (
                <SelectedAddressDisplay
                  selectedAddress={selectedAddress}
                  onEditAddress={handleEditAddress}
                />
              ) : (
                <AddressSelector
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onAddressSelect={handleAddressSelect}
                  isLoading={addressesLoading}
                  onAddressAdded={handleAddressAdded}
                />
              )}

              <MotionAnimatePresence mode="popLayout">
                <div className="flex items-center gap-3 ">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    لیست سبد خرید
                  </h3>
                  <div className="flex-1 rounded-2xl h-0.5 bg-gradient-to-r from-amber-700 to-transparent"></div>
                </div>
                {hasUnavailableItems && (
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-orange-800 dark:text-orange-200 font-semibold text-sm mb-1">
                          {unavailableItems.length} محصول در سبد خرید شما در
                          دسترس نیست
                        </h4>
                        <p className="text-orange-700 dark:text-orange-300 text-xs leading-relaxed">
                          برای تکمیل خرید، ابتدا محصولات غیرفعال را از سبد خرید
                          حذف کنید. این محصولات ممکن است حذف شده یا موقتاً
                          غیرفعال باشند.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {cart?.cartItems?.map((item: any) => (
                  <CartItemCard key={item?.itemId} item={item} />
                ))}
              </MotionAnimatePresence>

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

            <OrderSummary
              cart={cart}
              selectedAddress={selectedAddress}
              isAddressSelected={!!selectedAddressId}
              onCompleteOrder={handleCompleteOrder}
              isCheckoutLoading={isCheckoutLoading}
              hasUnavailableItems={hasUnavailableItems}
              hasAvailableItems={hasAvailableItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}
