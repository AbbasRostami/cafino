"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { confirm } from "@/components/common/ConfirmModal";
import { useAddDiscount, useRemoveDiscount, useCart } from "@/store/cartStore";
import { useAddToCartButtonLogic } from "@/lib/AddToCartButton";
import { discountSchema, DiscountFormValues } from "@/schemas/main/checkout/checkout";

export const useCheckout = () => {
  const { cart } = useCart();
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const router = useRouter();

  const addDiscountMutation = useAddDiscount();
  const removeDiscountMutation = useRemoveDiscount();
  const { handleClearCart, clearLoading } = useAddToCartButtonLogic({
    itemId: "",
  });

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
  };
};
