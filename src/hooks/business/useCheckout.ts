"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { confirm } from "@/components/shared/ConfirmModal";
import { useAddToCartButtonLogic } from "@/hooks/business/AddToCartButton";
import { Address } from "@/types/Profile";
import { discountSchemaCheckout, DiscountFormValues } from "@/schemas/main";
import {
  useRemoveDiscount,
  useAddDiscount,
  useGetAddresses,
  usePaymentGateway,
  useCart,
} from "@/services";

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
    resolver: zodResolver(discountSchemaCheckout),
  });

  const onSubmit = (data: DiscountFormValues) => {
    addDiscountMutation.mutate(
      { code: data?.code },
      {
        onSuccess: () => {
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
    setSelectedAddressId(null);
  };

  const handleAddressAdded = () => {
    if (addressesData && addressesData?.length === 1) {
      setSelectedAddressId(addressesData[0].id);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      setIsCheckoutLoading(true);

      const paymentData = {
        addressId: selectedAddressId,
        description: `سفارش از کافی‌نو - مبلغ: ${cart.paymentAmount} تومان`,
      };

      paymentGatewayMutation.mutate(paymentData, {
        onSuccess: (response: any) => {
          if (response?.data?.gatewayURL) {
            toast.success("در حال انتقال به درگاه پرداخت...");
            const orderInfo = {
              addressId: selectedAddressId,
              cartTotal: cart?.paymentAmount,
              timestamp: new Date().toISOString(),
            };
            localStorage.setItem("pendingOrder", JSON.stringify(orderInfo));

            setTimeout(() => {
              window.location.href = response?.data?.gatewayURL;
            }, 1000);
          } else {
            console.error("No gateway URL in response:", response);
            toast.error("خطا در دریافت آدرس درگاه پرداخت");
          }
        },
        onError: (error: any) => {
          toast.error("خطا در ایجاد درگاه پرداخت. لطفاً دوباره تلاش کنید");
        },
        onSettled: () => {
          setIsCheckoutLoading(false);
        },
      });
    } catch (error) {
      setIsCheckoutLoading(false);
      toast.error("خطا در تکمیل سفارش. لطفاً دوباره تلاش کنید");
    }
  };

  // Get selected address object
  const selectedAddress =
    addressesData?.find((addr: Address) => addr?.id === selectedAddressId) ||
    null;

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
    addresses: addressesData,
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
