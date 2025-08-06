"use client";

import {
  useAddToCart,
  useIncItem,
  useDecItem,
  useRemoveItem,
  useClearCart,
  useCart,
  useCartStore,
  CartItem,
} from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

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

  // برای کاربران لاگین شده از React Query استفاده کن
  const { cart: serverCart, isCartLoading, refetch } = useCart();

  // برای مهمان‌ها از Zustand store استفاده کن
  const { cart: localCart, getCartItemCount } = useCartStore();

  // انتخاب cart مناسب بر اساس وضعیت احراز هویت
  const cart = isAuthenticated ? serverCart : localCart;
  const count = isAuthenticated
    ? cart?.cartItems?.find((i: any) => i.itemId === itemId)?.count || 0
    : getCartItemCount(itemId);

  // React Query hooks برای کاربران لاگین شده
  const { mutate: addToCart, isPending: addLoading } = useAddToCart();
  const { mutate: incItem, isPending: incLoading } = useIncItem();
  const { mutate: decItem, isPending: decLoading } = useDecItem();
  const { mutate: removeItem, isPending: removeLoading } = useRemoveItem();
  const { mutate: clearCart, isPending: clearLoading } = useClearCart();

  // Zustand store methods برای مهمان‌ها
  const {
    addToCart: addToLocalCart,
    incItem: incLocalItem,
    decItem: decLocalItem,
    removeItem: removeLocalItem,
    clearCart: clearLocalCart,
  } = useCartStore();

  const handleAdd = async () => {
    if (isAuthenticated) {
      // برای کاربران لاگین شده
      try {
        await addToCart({ itemId });
        await refetch();
      } catch (error) {
        // مدیریت خطا در صورت نیاز
      }
    } else {
      // برای مهمان‌ها
      if (itemData) {
        await addToLocalCart(itemData);
      } else {
        console.error("Item data is required for guest users");
      }
    }
  };

  const handleInc = async () => {
    if (isAuthenticated) {
      // برای کاربران لاگین شده
      try {
        await incItem({ itemId });
        await refetch();
      } catch (error) {
        // مدیریت خطا در صورت نیاز
      }
    } else {
      // برای مهمان‌ها
      await incLocalItem(itemId);
    }
  };

  const handleDec = async () => {
    if (count === 1) {
      await handleRemove();
    } else {
      if (isAuthenticated) {
        // برای کاربران لاگین شده
        try {
          await decItem({ itemId });
          await refetch();
        } catch (error) {
          // مدیریت خطا در صورت نیاز
        }
      } else {
        // برای مهمان‌ها
        await decLocalItem(itemId);
      }
    }
  };

  const handleRemove = async () => {
    if (isAuthenticated) {
      // برای کاربران لاگین شده
      try {
        await removeItem({ itemId });
        await refetch();
      } catch (error) {
        // مدیریت خطا در صورت نیاز
      }
    } else {
      // برای مهمان‌ها
      await removeLocalItem(itemId);
    }
  };

  const handleClearCart = async () => {
    if (isAuthenticated) {
      // برای کاربران لاگین شده
      try {
        await clearCart();
        await refetch();
      } catch (error) {
        // مدیریت خطا در صورت نیاز
      }
    } else {
      // برای مهمان‌ها
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
    cartData: cart, // اضافه کردن cartData
  };
}
