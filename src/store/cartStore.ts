import { create } from "zustand";
import { usePost, useDelete, usePatch } from "@/hooks/useReactQueryHooks";
import { useAuthStore } from "@/store/authStore";
import queryClient from "@/hooks/QueryProviders";
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

// Helper: check if running in browser
const isBrowser = typeof window !== "undefined";

function getDefaultCart(): CartApiResponse {
  return {
    totalAmount: 0,
    totalDiscount: 0,
    paymentAmount: 0,
    cartItems: [],
  };
}

// --- Guest cart management (localStorage) ---
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
  } catch (e) {
    // می‌توانی اینجا لاگ کنی یا بی‌صدا رد کنی
    // console.error('localStorage set error:', e);
  }
}

function clearLocalCart() {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(LOCAL_CART_KEY);
  } catch (e) {
    // می‌توانی اینجا لاگ کنی یا بی‌صدا رد کنی
    // console.error('localStorage clear error:', e);
  }
}

interface CartState {
  cart: CartApiResponse;
  addToCart: (item: CartItem) => void;
  incItem: (itemId: string) => void;
  decItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  syncCart: () => void;
}

// export const useCartStore = create<CartState>()((set, get) => ({
//   cart: getLocalCart(),
//   addToCart: (item) => {
//     const isAuthenticated = useAuthStore.getState().isAuthenticated;
//     if (isAuthenticated) {
//       // عملیات سرور باید در کامپوننت انجام شود (هوک useAddToCart)
//       return;
//     }
//     const prev = getLocalCart();
//     const existing = prev.cartItems.find((i) => i.itemId === item.itemId);
//     let newCartItems;
//     if (existing) {
//       // محدودیت: اگر تعداد فعلی به اندازه quantity بود، افزایش نده
//       const maxQty = typeof item.quantity === "number" ? item.quantity : 10;
//       if (existing.count >= maxQty) {
//         newCartItems = prev.cartItems;
//       } else {
//         newCartItems = prev.cartItems.map((i) =>
//           i.itemId === item.itemId ? { ...i, count: i.count + 1 } : i
//         );
//       }
//     } else {
//       newCartItems = [...prev.cartItems, { ...item, count: 1 }];
//     }
//     const totalAmount = newCartItems.reduce(
//       (sum, i) => sum + Number(i.finalPrice) * i.count,
//       0
//     );
//     const totalDiscount = newCartItems.reduce(
//       (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
//       0
//     );
//     const cart: CartApiResponse = {
//       ...prev,
//       cartItems: newCartItems,
//       totalAmount,
//       paymentAmount: totalAmount,
//       totalDiscount,
//     };
//     setLocalCart(cart);
//     if (JSON.stringify(get().cart) !== JSON.stringify(cart)) {
//       set({ cart });
//     }
//   },
//   incItem: (itemId) => {
//     const prev = getLocalCart();
//     const item = prev.cartItems.find((i) => i.itemId === itemId);
//     const maxQty = typeof item?.quantity === "number" ? item.quantity : 10;
//     if (item && item.count >= maxQty) {
//       setLocalCart(prev);
//       return;
//     }
//     const newCartItems = prev.cartItems.map((i) =>
//       i.itemId === itemId ? { ...i, count: i.count + 1 } : i
//     );
//     const totalAmount = newCartItems.reduce(
//       (sum, i) => sum + Number(i.finalPrice) * i.count,
//       0
//     );
//     const totalDiscount = newCartItems.reduce(
//       (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
//       0
//     );
//     const cart: CartApiResponse = {
//       ...prev,
//       cartItems: newCartItems,
//       totalAmount,
//       paymentAmount: totalAmount,
//       totalDiscount,
//     };
//     setLocalCart(cart);
//     if (JSON.stringify(get().cart) !== JSON.stringify(cart)) {
//       set({ cart });
//     }
//   },
//   decItem: (itemId) => {
//     const prev = getLocalCart();
//     const newCartItems = prev.cartItems
//       .map((i) => (i.itemId === itemId ? { ...i, count: i.count - 1 } : i))
//       .filter((i) => i.count > 0);
//     const totalAmount = newCartItems.reduce(
//       (sum, i) => sum + Number(i.finalPrice) * i.count,
//       0
//     );
//     const totalDiscount = newCartItems.reduce(
//       (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
//       0
//     );
//     const cart: CartApiResponse = {
//       ...prev,
//       cartItems: newCartItems,
//       totalAmount,
//       paymentAmount: totalAmount,
//       totalDiscount,
//     };
//     setLocalCart(cart);
//     if (JSON.stringify(get().cart) !== JSON.stringify(cart)) {
//       set({ cart });
//     }
//   },
//   removeItem: (itemId) => {
//     const prev = getLocalCart();
//     const newCartItems = prev.cartItems.filter((i) => i.itemId !== itemId);
//     const totalAmount = newCartItems.reduce(
//       (sum, i) => sum + Number(i.finalPrice) * i.count,
//       0
//     );
//     const totalDiscount = newCartItems.reduce(
//       (sum, i) => sum + (Number(i.price) - Number(i.finalPrice)) * i.count,
//       0
//     );
//     const cart: CartApiResponse = {
//       ...prev,
//       cartItems: newCartItems,
//       totalAmount,
//       paymentAmount: totalAmount,
//       totalDiscount,
//     };
//     setLocalCart(cart);
//     if (JSON.stringify(get().cart) !== JSON.stringify(cart)) {
//       set({ cart });
//     }
//   },
//   clearCart: () => {
//     clearLocalCart();
//     const emptyCart = getDefaultCart();
//     if (JSON.stringify(get().cart) !== JSON.stringify(emptyCart)) {
//       set({ cart: emptyCart });
//     }
//   },
//   syncCart: () => {
//     const localCart = getLocalCart();
//     if (JSON.stringify(get().cart) !== JSON.stringify(localCart)) {
//       set({ cart: localCart });
//     }
//   },
// }));

// Migration function: move guest cart to server after login
// export async function migrateGuestCartToServer(
//   addToCartApi: (itemId: string) => Promise<any>,
//   refetchCart: () => void
// ) {
//   if (typeof window === "undefined") return;
//   const guestCart = getLocalCart();
//   if (guestCart?.cartItems?.length) {
//     for (const item of guestCart.cartItems) {
//       for (let i = 0; i < item.count; i++) {
//         try {
//           await addToCartApi(item.itemId);
//         } catch (e) {
//           // اگر خطا داشت، ادامه بده
//         }
//       }
//     }
//     clearLocalCart();
//     setTimeout(() => refetchCart(), 1000);
//   }
// }

// React Query Hooks for mutations (for authenticated users only)
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<any, { itemId: string }>(
    () => "/v1/cart/add",
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
  const { mutate, isPending, error } = usePost<any, { code: string }>(
    () => "/v1/cart/add-discount",
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
  const { mutate, isPending, error } = useDelete<any, { code: string }>(
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

// Optional: preload cart on app start (client-side only)
/*
if (typeof window !== "undefined") {
  // useCartStore.getState().refetchCart(); // Removed
}
*/
