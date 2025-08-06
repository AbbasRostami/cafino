import { create } from "zustand";
import {
  usePost,
  useDelete,
  usePatch,
  useGet,
} from "@/hooks/useReactQueryHooks";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CartItem {
  itemId: string;
  title: string;
  description: string;
  count: number;
  images: string[];
  price: string;
  discount: string;
  finalPrice: number;
  category: {
    title: string;
  };
  quantity?: number;
  isFav?: boolean;
}

export interface CartApiResponse {
  totalAmount: number;
  totalDiscount: number;
  paymentAmount: number;
  cartItems: CartItem[];
  generalDiscount?: any;
  statusCode?: number;
}

const isBrowser = typeof window !== "undefined";

function getDefaultCart(): CartApiResponse {
  return {
    totalAmount: 0,
    totalDiscount: 0,
    paymentAmount: 0,
    cartItems: [],
  };
}

const LOCAL_CART_KEY = "guest-cart";

function getLocalCart(): CartApiResponse {
  if (!isBrowser) return getDefaultCart();
  const raw = localStorage.getItem(LOCAL_CART_KEY);
  if (!raw) return getDefaultCart();
  try {
    return JSON.parse(raw);
  } catch {
    return getDefaultCart();
  }
}

function setLocalCart(cart: CartApiResponse) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  } catch {}
}

function clearLocalCart() {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(LOCAL_CART_KEY);
  } catch {}
}

interface CartState {
  cart: CartApiResponse;
  addToCart: (item: CartItem) => Promise<void>;
  incItem: (itemId: string) => Promise<void>;
  decItem: (itemId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => void;
  getCartItemCount: (itemId: string) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: getLocalCart(),

  addToCart: async (item) => {
    // مهمان: کار با localStorage
    const prev = getLocalCart();
    const existing = prev.cartItems.find((i) => i.itemId === item.itemId);
    let newCartItems;

    if (existing) {
      const maxQty = typeof item.quantity === "number" ? item.quantity : 10;
      if (existing.count >= maxQty) {
        toast.error(`حداکثر تعداد موجودی این محصول ${maxQty} عدد است`);
        return;
      }
      newCartItems = prev.cartItems.map((i) =>
        i.itemId === item.itemId ? { ...i, count: i.count + 1 } : i
      );
    } else {
      newCartItems = [...prev.cartItems, { ...item, count: 1 }];
    }

    const totalAmount = newCartItems.reduce(
      (sum, i) => sum + Number(i.finalPrice) * i.count,
      0
    );
    const totalDiscount = newCartItems.reduce(
      (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
      0
    );

    const cart: CartApiResponse = {
      ...prev,
      cartItems: newCartItems,
      totalAmount,
      paymentAmount: totalAmount,
      totalDiscount,
    };

    setLocalCart(cart);
    set({ cart });
    toast.success("محصول با موفقیت به سبد خرید اضافه شد");
  },

  incItem: async (itemId) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated) {
      // برای کاربران لاگین شده، عملیات در کامپوننت یا هوک API انجام می‌شود
      return;
    }

    const prev = getLocalCart();
    const item = prev.cartItems.find((i) => i.itemId === itemId);

    if (!item) return;

    const maxQty = typeof item.quantity === "number" ? item.quantity : 10;
    if (item.count >= maxQty) {
      toast.error(`حداکثر تعداد موجودی این محصول ${maxQty} عدد است`);
      return;
    }

    const newCartItems = prev.cartItems.map((i) =>
      i.itemId === itemId ? { ...i, count: i.count + 1 } : i
    );

    const totalAmount = newCartItems.reduce(
      (sum, i) => sum + Number(i.finalPrice) * i.count,
      0
    );
    const totalDiscount = newCartItems.reduce(
      (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
      0
    );

    const cart: CartApiResponse = {
      ...prev,
      cartItems: newCartItems,
      totalAmount,
      paymentAmount: totalAmount,
      totalDiscount,
    };

    setLocalCart(cart);
    set({ cart });
    toast.success("تعداد محصول با موفقیت افزایش یافت");
  },

  decItem: async (itemId) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated) {
      // برای کاربران لاگین شده، عملیات در کامپوننت یا هوک API انجام می‌شود
      return;
    }

    const prev = getLocalCart();
    const newCartItems = prev.cartItems
      .map((i) => (i.itemId === itemId ? { ...i, count: i.count - 1 } : i))
      .filter((i) => i.count > 0);

    const totalAmount = newCartItems.reduce(
      (sum, i) => sum + Number(i.finalPrice) * i.count,
      0
    );
    const totalDiscount = newCartItems.reduce(
      (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
      0
    );

    const cart: CartApiResponse = {
      ...prev,
      cartItems: newCartItems,
      totalAmount,
      paymentAmount: totalAmount,
      totalDiscount,
    };

    setLocalCart(cart);
    set({ cart });
    toast.success("تعداد محصول با موفقیت کاهش یافت");
  },

  removeItem: async (itemId) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated) {
      // برای کاربران لاگین شده، عملیات در کامپوننت یا هوک API انجام می‌شود
      return;
    }

    const prev = getLocalCart();
    const newCartItems = prev.cartItems.filter((i) => i.itemId !== itemId);

    const totalAmount = newCartItems.reduce(
      (sum, i) => sum + Number(i.finalPrice) * i.count,
      0
    );
    const totalDiscount = newCartItems.reduce(
      (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
      0
    );

    const cart: CartApiResponse = {
      ...prev,
      cartItems: newCartItems,
      totalAmount,
      paymentAmount: totalAmount,
      totalDiscount,
    };

    setLocalCart(cart);
    set({ cart });
    toast.success("محصول با موفقیت از سبد خرید حذف شد");
  },

  clearCart: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated) {
      // برای کاربران لاگین شده، عملیات در کامپوننت یا هوک API انجام می‌شود
      return;
    }

    clearLocalCart();
    const emptyCart = getDefaultCart();
    set({ cart: emptyCart });
    toast.success("سبد خرید با موفقیت پاک شد");
  },

  syncCart: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated) {
      // اگر لاگین است، از سرور داده بگیر
      // این عملیات در useCart hook انجام می‌شود
      return;
    }

    // برای مهمان‌ها، از localStorage بخوان
    const localCart = getLocalCart();
    if (JSON.stringify(get().cart) !== JSON.stringify(localCart)) {
      set({ cart: localCart });
    }
  },

  getCartItemCount: (itemId: string) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated) {
      // برای کاربران لاگین شده، از سرور بخوان
      // این عملیات در useCart hook انجام می‌شود
      return 0;
    }

    // برای مهمان‌ها، از localStorage بخوان
    const localCart = getLocalCart();
    const item = localCart.cartItems.find((i) => i.itemId === itemId);
    return item?.count || 0;
  },
}));

// React Query Hooks for mutations (for authenticated users only)
export const useCart = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const {
    data: cart,
    isLoading: isCartLoading,
    refetch,
    error: cartError,
  } = useGet<any>("/v1/cart", {
    queryKey: ["/v1/cart"],
    staleTime: 0,
    enabled: isAuthenticated,
  });

  return { cart, isCartLoading, refetch, cartError, isAuthenticated };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<any, { itemId: string }>(
    () => "/v1/cart/add",
    undefined,
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت به سبد خرید اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error) => {
        const errorMessage = error?.message;
        if (errorMessage === "item is already in your cart") {
          toast.error("محصول قبلاً در سبد خرید شما وجود دارد");
        } else {
          toast.error("خطا در اضافه کردن محصول به سبد خرید");
        }
      },
    }
  );
  return { mutate, isPending, error };
};

export const useIncItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePatch<any, { itemId: string }>(
    "/v1/cart/inc-item",
    undefined,
    {
      onSuccess: () => {
        toast.success("تعداد محصول با موفقیت افزایش یافت");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error: any) => {
        if (error?.response?.data?.available_qunatity) {
          toast.error(
            `موجودی فعلی این محصول: ${error?.response?.data?.available_qunatity} عدد است.`
          );
        } else {
          toast.error("خطا در افزایش تعداد محصول");
        }
      },
    }
  );
  return { mutate, isPending, error };
};

export const useDecItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePatch<any, { itemId: string }>(
    "/v1/cart/dec-item",
    undefined,
    {
      onSuccess: () => {
        toast.success("تعداد محصول با موفقیت کاهش یافت");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error) => {
        toast.error("خطا در کاهش تعداد محصول");
      },
    }
  );

  return { mutate, isPending, error };
};

export const useRemoveItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<any, { itemId: string }>(
    () => "/v1/cart/remove",
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت از سبد خرید حذف شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },

      onError: (error) => {
        toast.error("خطا در حذف محصول");
      },
    }
  );
  return { mutate, isPending, error };
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<any, void>(() => "/v1/cart", {
    onSuccess: () => {
      toast.success("سبد خرید با موفقیت پاک شد");
      queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
      queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
    },

    onError: (error) => {
      toast.error("خطا در پاک کردن سبد خرید");
    },
  });
  return { mutate, isPending, error };
};

export const useAddDiscount = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<{ code: string }>(
    () => "/v1/cart/add-discount",
    undefined,
    {
      onSuccess: () => {
        toast.success("کد تخفیف با موفقیت اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },

      onError: (error: any) => {
        const errorMessage = error?.message;

        if (errorMessage === "Already Used Discount") {
          toast.error("شما قبلاً از این کد تخفیف استفاده کرده‌اید");
        } else {
          toast.error("خطا در اضافه کردن کد تخفیف");
        }
      },
    }
  );
  return { mutate, isPending, error };
};

export const useRemoveDiscount = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<{ code: string }>(
    () => "/v1/cart/remove-discount/",
    {
      onSuccess: () => {
        toast.success("کد تخفیف با موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف کد تخفیف");
      },
    }
  );
  return { mutate, isPending, error };
};

// React Query hook for add-multiple
export const useAddToCartMultiple = () => {
  const queryClient = useQueryClient();
  return usePost<any, { items: { itemId: string; count: number }[] }>(
    () => "/v1/cart/add-multiple",
    undefined,
    {
      onSuccess: () => {
        toast.success("سبد خرید با موفقیت منتقل شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: () => {
        toast.error("خطا در انتقال سبد خرید مهمان");
      },
    }
  );
};

// Migration function: move guest cart to server after login
export async function migrateGuestCartToServer(
  addToCartMultipleApi: (data: {
    items: { itemId: string; count: number }[];
  }) => Promise<any>,
  refetchCart: () => void
) {
  if (typeof window === "undefined") return;

  const guestCart = getLocalCart();
  if (guestCart?.cartItems?.length) {
    const items = guestCart.cartItems.map((item) => ({
      itemId: item.itemId,
      count: item.count,
    }));
    try {
      await addToCartMultipleApi({ items });
    } catch (e) {
      console.error("Error migrating guest cart (add-multiple):", e);
    }
    clearLocalCart();
    setTimeout(() => refetchCart(), 1000);
  }
}
