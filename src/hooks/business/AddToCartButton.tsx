"use client";

import {
  useAddToCart,
  useCart,
  useClearCart,
  useDecItem,
  useIncItem,
  useRemoveItem,
} from "@/services";
import { useAuthStore } from "@/store/authStore";
import { CartItem, useCartStore } from "@/store/cartStore";

interface AddToCartButtonLogicProps {
  itemId: string;
  itemData?: CartItem;
  disabled?: boolean;
}

export function useAddToCartButtonLogic({
  itemId,
  itemData,
  disabled = false,
}: AddToCartButtonLogicProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // for authenticated users
  const { cart: serverCart, isCartLoading, refetch } = useCart();

  // for guest users
  const { cart: localCart, getCartItemCount } = useCartStore();

  // select cart based on authentication status
  const cart = isAuthenticated ? serverCart : localCart;
  const count = isAuthenticated
    ? cart?.cartItems?.find((i: any) => i.itemId === itemId)?.count || 0
    : getCartItemCount(itemId);

  // React Query hooks for authenticated users
  const { mutate: addToCart, isPending: addLoading } = useAddToCart();
  const { mutate: incItem, isPending: incLoading } = useIncItem();
  const { mutate: decItem, isPending: decLoading } = useDecItem();
  const { mutate: removeItem, isPending: removeLoading } = useRemoveItem();
  const { mutate: clearCart, isPending: clearLoading } = useClearCart();

  // Zustand store methods for guest users
  const {
    addToCart: addToLocalCart,
    incItem: incLocalItem,
    decItem: decLocalItem,
    removeItem: removeLocalItem,
    clearCart: clearLocalCart,
  } = useCartStore();

  const handleAdd = async () => {
    if (isAuthenticated) {
      try {
        await addToCart({ itemId });
        await refetch();
      } catch (error) {}
    } else {
      if (itemData) {
        await addToLocalCart(itemData);
      } else {
        console.error("Item data is required for guest users");
      }
    }
  };

  const handleInc = async () => {
    if (isAuthenticated) {
      try {
        await incItem({ itemId });
        await refetch();
      } catch (error) {}
    } else {
      await incLocalItem(itemId);
    }
  };

  const handleDec = async () => {
    if (count === 1) {
      await handleRemove();
    } else {
      if (isAuthenticated) {
        try {
          await decItem({ itemId });
          await refetch();
        } catch (error) {}
      } else {
        await decLocalItem(itemId);
      }
    }
  };

  const handleRemove = async () => {
    if (isAuthenticated) {
      try {
        await removeItem({ itemId });
        await refetch();
      } catch (error) {}
    } else {
      await removeLocalItem(itemId);
    }
  };

  const handleClearCart = async () => {
    if (isAuthenticated) {
      try {
        await clearCart();
        await refetch();
      } catch (error) {}
    } else {
      await clearLocalCart();
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
    clearLoading,
    handleAdd,
    handleInc,
    handleDec,
    handleRemove,
    handleClearCart,
    isAuthenticated,
    cartData: cart,
  };
}
