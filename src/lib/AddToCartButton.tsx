"use client";

import {
  useAddToCart,
  useIncItem,
  useDecItem,
  useRemoveItem,
} from "@/store/cartStore";
import { useGet } from "@/hooks/useReactQueryHooks";

interface AddToCartButtonLogicProps {
  itemId: string;
  disabled?: boolean;
}

export function useAddToCartButtonLogic({
  itemId,
  disabled = false,
}: AddToCartButtonLogicProps) {
  const {
    data: cart,
    isLoading: isCartLoading,
    refetch,
  } = useGet<any>("/v1/cart", {
    queryKey: ["/v1/cart"],
    staleTime: 0,
  });

  const cartItem = cart?.cartItems?.find((i: any) => i.itemId === itemId);
  const count = cartItem?.count || 0;

  const {
    mutate: addToCart,
    isPending: addLoading,
    error: addError,
  } = useAddToCart();
  const {
    mutate: incItem,
    isPending: incLoading,
    error: incError,
  } = useIncItem();
  const {
    mutate: decItem,
    isPending: decLoading,
    error: decError,
  } = useDecItem();
  const {
    mutate: removeItem,
    isPending: removeLoading,
    error: removeError,
  } = useRemoveItem();

  // گرفتن isLoading از هر mutation به صورت جداگانه

  const handleAdd = async () => {
    try {
      await addToCart({ itemId });
      await refetch();
    } catch (error) {
      // مدیریت خطا در صورت نیاز
    }
  };

  const handleInc = async () => {
    try {
      await incItem({ itemId });
      await refetch();
    } catch (error) {
      // مدیریت خطا در صورت نیاز
    }
  };

  const handleDec = async () => {
    if (count === 1) {
      await handleRemove();
    } else {
      try {
        await decItem({ itemId });
        await refetch();
      } catch (error) {
        // مدیریت خطا در صورت نیاز
      }
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem({ itemId });
      await refetch();
    } catch (error) {
      // مدیریت خطا در صورت نیاز
    }
  };

  return {
    count,
    disabled,
    isCartLoading,
    addLoading,
    incLoading,
    decLoading,
    removeLoading,
    handleAdd,
    handleInc,
    handleDec,
    handleRemove,
  };
}
