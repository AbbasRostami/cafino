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
  const { cart: serverCart, isCartLoading } = useCart();

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

  const handleAdd = () => {
    if (isAuthenticated) {
      addToCart({ itemId });
    } else {
      addToLocalCart(itemData as CartItem);
    }
  };

  const handleInc = () => {
    if (isAuthenticated) {
      incItem({ itemId });
    } else {
      incLocalItem(itemId);
    }
  };

  const handleDec = () => {
    if (count === 1) {
      handleRemove();
    } else {
      if (isAuthenticated) {
        decItem({ itemId });
      } else {
        decLocalItem(itemId);
      }
    }
  };

  const handleRemove = () => {
    if (isAuthenticated) {
      removeItem({ itemId });
    } else {
      removeLocalItem(itemId);
    }
  };

  const handleClearCart = () => {
    if (isAuthenticated) {
      clearCart();
    } else {
      clearLocalCart();
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
