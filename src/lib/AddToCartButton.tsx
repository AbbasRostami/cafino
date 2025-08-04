"use client";

import {
  useAddToCart,
  useIncItem,
  useDecItem,
  useRemoveItem,
  useClearCart,
  useCart,
} from "@/store/cartStore";

interface AddToCartButtonLogicProps {
  itemId: string;
  disabled?: boolean;
}

export function useAddToCartButtonLogic({
  itemId,
  disabled = false,
}: AddToCartButtonLogicProps) {
  const { cart, isCartLoading, refetch } = useCart();

  const cartItem = cart?.cartItems?.find((i: any) => i.itemId === itemId);
  const count = cartItem?.count || 0;

  const { mutate: addToCart, isPending: addLoading } = useAddToCart();
  const { mutate: incItem, isPending: incLoading } = useIncItem();
  const { mutate: decItem, isPending: decLoading } = useDecItem();
  const { mutate: removeItem, isPending: removeLoading } = useRemoveItem();
  const { mutate: clearCart, isPending: clearLoading } = useClearCart();

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
  const handleClearCart = async () => {
    try {
      await clearCart();
      await refetch();
    } catch (error) {}
  };
  
  return {
    count,
    disabled,
    isCartLoading,
    addLoading,
    incLoading,
    decLoading,
    removeLoading,
    clearLoading,
    handleAdd,
    handleInc,
    handleDec,
    handleRemove,
    handleClearCart,
  };
}
