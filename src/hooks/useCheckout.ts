"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { confirm } from "@/components/common/ConfirmModal/ConfirmModal";
import { useAddDiscount, useCart } from "@/services/cart";
import { useAddToCartButtonLogic } from "@/lib/AddToCartButton";
import { useGetAddresses, usePaymentGateway } from "@/services";
import { Address } from "@/types/Profile";
import {
  discountSchemaCheckout,
  DiscountFormValues,
} from "@/schemas/main/checkout";
import { useRemoveDiscount } from "@/services";

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
    if (addressesData?.data && addressesData?.data?.length === 1) {
      setSelectedAddressId(addressesData?.data[0].id);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      setIsCheckoutLoading(true);

      const paymentData = {
        addressId: selectedAddressId,
        description: `سفارش از کافی‌نو - مبلغ: ${cart.paymentAmount?.toLocaleString(
          "fa-IR"
        )} تومان`,
      };

      paymentGatewayMutation.mutate(paymentData, {
        onSuccess: (response: any) => {
          toast.success("درگاه پرداخت با موفقیت ایجاد شد");

          if (response?.gatewayURL) {
            // Store order info in localStorage
            const orderInfo = {
              addressId: selectedAddressId,
              cartTotal: cart.paymentAmount,
              timestamp: new Date().toISOString(),
            };
            localStorage.setItem("pendingOrder", JSON.stringify(orderInfo));
            // Redirect to payment gateway
            window.location.href = response.gatewayURL;
          } else {
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
