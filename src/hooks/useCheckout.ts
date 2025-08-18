"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { confirm } from "@/components/common/ConfirmModal/ConfirmModal";
import { useAddDiscount, useRemoveDiscount, useCart } from "@/store/cartStore";
import { useAddToCartButtonLogic } from "@/lib/AddToCartButton";
import { useGetAddresses, usePaymentGateway } from "@/services";
import { Address } from "@/types/Profile";
import {
  discountSchema,
  DiscountFormValues,
} from "@/schemas/main/checkout";

export const useCheckout = () => {
  const { cart } = useCart();
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const router = useRouter();

  const addDiscountMutation = useAddDiscount();
  const removeDiscountMutation = useRemoveDiscount();
  const { handleClearCart, clearLoading } = useAddToCartButtonLogic({
    itemId: "",
  });

  // Address management
  const { data: addressesData, isLoading: addressesLoading } =
    useGetAddresses();

  // Payment gateway
  const paymentGatewayMutation = usePaymentGateway();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
  });

  const onSubmit = (data: DiscountFormValues) => {
    addDiscountMutation.mutate(
      { code: data?.code },
      {
        onSuccess: () => {
          toast.success("کد تخفیف اعمال شد");
          setIsDiscountApplied(true);
        },
      }
    );
  };

  const handleRemove = () => {
    removeDiscountMutation.mutate(
      { code: cart?.generalDiscount?.code },
      {
        onSuccess: () => {
          toast.success("کد تخفیف حذف شد");
          setIsDiscountApplied(false);
          reset();
        },
      }
    );
  };

  const handleBackClick = () => {
    router.push("/menu");
  };

  const handleClearCartClick = async () => {
    const result = await confirm({
      title: "حذف همه محصولات",
      description: "همه محصولات سبد خرید شما حذف خواهند شد؟",
      confirmText: "حذف",
      cancelText: "انصراف",
    });
    if (result) {
      handleClearCart();
    }
  };

  // Address selection handlers
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handleEditAddress = () => {
    // This will be handled by the AddressSelector component
    // to show the address selection again
    setSelectedAddressId(null);
  };

  const handleAddressAdded = () => {
    // Refresh addresses and select the newly added one if it's the first
    if (addressesData?.data && addressesData.data.length === 1) {
      setSelectedAddressId(addressesData.data[0].id);
    }
  };

  // Complete order handler - redirect directly to payment gateway
  // Complete order handler - redirect directly to payment gateway
  const handleCompleteOrder = async () => {
    console.log("🛒 [Checkout] شروع فرآیند تکمیل سفارش...");

    if (!selectedAddressId) {
      toast.error("لطفاً ابتدا آدرس تحویل را انتخاب کنید");
      console.warn("⚠️ [Checkout] آدرس انتخاب نشده است");
      return;
    }

    if (!cart?.cartItems || cart.cartItems.length === 0) {
      toast.error("سبد خرید شما خالی است");
      console.warn("⚠️ [Checkout] سبد خرید خالی است");
      return;
    }

    try {
      console.log("⏳ [Checkout] در حال ساخت درگاه پرداخت...");
      setIsCheckoutLoading(true);

      // Create payment gateway data
      const paymentData = {
        addressId: selectedAddressId,
        description: `سفارش از کافی‌نو - مبلغ: ${cart.paymentAmount?.toLocaleString(
          "fa-IR"
        )} تومان`,
      };

      console.log("📦 [Checkout] دیتا برای ارسال به API:", paymentData);

      paymentGatewayMutation.mutate(paymentData, {
        onSuccess: (response: any) => {
          console.log("✅ [Checkout] درگاه پرداخت ساخته شد:", response);
          toast.success("درگاه پرداخت با موفقیت ایجاد شد");

          if (response?.gatewayURL) {
            console.log("🔗 [Checkout] آدرس درگاه:", response.gatewayURL);

            // Store order info in localStorage
            const orderInfo = {
              addressId: selectedAddressId,
              cartTotal: cart.paymentAmount,
              timestamp: new Date().toISOString(),
            };
            localStorage.setItem("pendingOrder", JSON.stringify(orderInfo));
            console.log(
              "💾 [Checkout] اطلاعات سفارش در localStorage ذخیره شد:",
              orderInfo
            );

            // Redirect to payment gateway
            console.log("➡️ [Checkout] ریدایرکت کاربر به درگاه پرداخت...");
            window.location.href = response.gatewayURL;
          } else {
            toast.error("خطا در دریافت آدرس درگاه پرداخت");
            console.error(
              "❌ [Checkout] gatewayURL در پاسخ وجود ندارد:",
              response
            );
          }
        },
        onError: (error: any) => {
          toast.error("خطا در ایجاد درگاه پرداخت. لطفاً دوباره تلاش کنید");
          console.error("❌ [Checkout] خطا در ساخت درگاه:", error);
        },
        onSettled: () => {
          setIsCheckoutLoading(false);
          console.log(
            "🔚 [Checkout] فرآیند ساخت درگاه (موفق یا ناموفق) به پایان رسید"
          );
        },
      });
    } catch (error) {
      setIsCheckoutLoading(false);
      toast.error("خطا در تکمیل سفارش. لطفاً دوباره تلاش کنید");
      console.error("💥 [Checkout] خطای غیرمنتظره:", error);
    }
  };

  // Get selected address object
  const selectedAddress =
    addressesData?.data?.find(
      (addr: Address) => addr.id === selectedAddressId
    ) || null;

  return {
    // Form
    register,
    handleSubmit,
    errors,
    onSubmit,

    // Discount
    isDiscountApplied,
    handleRemove,
    addDiscountLoading: addDiscountMutation.isPending,
    removeDiscountLoading: removeDiscountMutation.isPending,

    // Cart
    handleBackClick,
    handleClearCartClick,
    clearLoading,

    // Address
    addresses: addressesData?.data,
    addressesLoading,
    selectedAddressId,
    selectedAddress,
    handleAddressSelect,
    handleEditAddress,
    handleAddressAdded,

    // Checkout
    isCheckoutLoading,
    handleCompleteOrder,
  };
};
