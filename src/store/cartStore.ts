import { create } from "zustand";
import { useAuthStore } from "@/store/authStore";
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
  isAvailable?: boolean;
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
      return;
    }
    const localCart = getLocalCart();
    if (JSON.stringify(get().cart) !== JSON.stringify(localCart)) {
      set({ cart: localCart });
    }
  },

  getCartItemCount: (itemId: string) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      return 0;
    }
    const localCart = getLocalCart();
    const item = localCart.cartItems.find((i) => i.itemId === itemId);
    return item?.count || 0;
  },
}));

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
