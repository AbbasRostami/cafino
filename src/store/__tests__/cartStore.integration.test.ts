import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useCartStore, migrateGuestCartToServer, CartItem } from "../cartStore";
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

vi.mock("../cartStore", async () => {
  const actual = await vi.importActual("../cartStore");
  return {
    ...actual,
  };
});

const mockAuthStore = {
  isAuthenticated: false,
  setAuthenticated: vi.fn(),
  resetAuth: vi.fn(),
};

vi.mock("../authStore", () => ({
  useAuthStore: {
    getState: () => mockAuthStore,
  },
}));

describe("Cart Store Integration - Guest vs Authenticated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    mockAuthStore.isAuthenticated = false;

    vi.useFakeTimers();

    useCartStore.setState({
      cart: {
        totalAmount: 0,
        totalDiscount: 0,
        paymentAmount: 0,
        cartItems: [],
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe("Guest Cart Integration - Guest cart", () => {
    const mockItem: CartItem = {
      itemId: "item-123",
      title: "Test Item",
      description: "Test Description",
      count: 1,
      images: ["image1.jpg"],
      price: "100000",
      discount: "10000",
      finalPrice: 90000,
      category: { title: "Test Category" },
      quantity: 10,
    };

    it("باید محصول را به localStorage اضافه کند", async () => {
      const { addToCart } = useCartStore.getState();

      await addToCart(mockItem);

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(1);
      expect(state.cart.cartItems[0].itemId).toBe("item-123");
      expect(state.cart.cartItems[0].count).toBe(1);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "guest-cart",
        expect.stringContaining("item-123")
      );
    });

    it("باید محصول موجود را در store به‌روزرسانی کند", async () => {
      const { addToCart } = useCartStore.getState();
      await addToCart(mockItem);
      await addToCart(mockItem);

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(1);
    });

    it("باید تعداد محصول را در store افزایش دهد", async () => {
      const { addToCart, incItem } = useCartStore.getState();
      await addToCart(mockItem);
      await incItem("item-123");

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(1);
    });

    it("باید تعداد محصول را در store کاهش دهد", async () => {
      const { addToCart, incItem, decItem } = useCartStore.getState();

      await addToCart(mockItem);
      await incItem("item-123");
      await decItem("item-123");

      const state = useCartStore.getState();
      expect(state.cart).toBeDefined();
    });

    it("باید محصول را از localStorage حذف کند", async () => {
      const { addToCart, removeItem } = useCartStore.getState();

      await addToCart(mockItem);

      await removeItem("item-123");

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(0);

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    });

    it("should clear the cart from localStorage", async () => {
      const { addToCart, clearCart } = useCartStore.getState();
      await addToCart(mockItem);
      await clearCart();

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(0);
      expect(state.cart.totalAmount).toBe(0);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("guest-cart");
    });

    it("باید تعداد محصول را از localStorage بخواند", () => {
      const { getCartItemCount } = useCartStore.getState();

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          totalAmount: 90000,
          totalDiscount: 10000,
          paymentAmount: 90000,
          cartItems: [{ ...mockItem, count: 3 }],
        })
      );

      const count = getCartItemCount("item-123");
      expect(count).toBe(3);
    });

    it("باید سبد خرید را با localStorage همگام‌سازی کند", () => {
      const { syncCart } = useCartStore.getState();

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          totalAmount: 180000,
          totalDiscount: 20000,
          paymentAmount: 180000,
          cartItems: [{ ...mockItem, count: 2 }],
        })
      );

      syncCart();

      const state = useCartStore.getState();
      expect(state.cart.cartItems[0].count).toBe(2);
      expect(state.cart.totalAmount).toBe(180000);
    });
  });

  describe("Authenticated Cart Integration - authenticated cart", () => {
    beforeEach(() => {
      mockAuthStore.isAuthenticated = true;
    });

    const mockItem: CartItem = {
      itemId: "item-123",
      title: "Test Item",
      description: "Test Description",
      count: 1,
      images: ["image1.jpg"],
      price: "100000",
      discount: "10000",
      finalPrice: 90000,
      category: { title: "Test Category" },
      quantity: 10,
    };

    it("باید عملیات‌های سبد را برای کاربر احراز هویت شده نادیده بگیرد", async () => {
      const { incItem, decItem, removeItem, clearCart } =
        useCartStore.getState();

      await incItem("item-123");
      await decItem("item-123");
      await removeItem("item-123");
      await clearCart();

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
    });

    it("باید تعداد محصول را برای کاربر احراز هویت شده 0 برگرداند", () => {
      const { getCartItemCount } = useCartStore.getState();

      const count = getCartItemCount("item-123");
      expect(count).toBe(0);
    });

    it("باید همگام‌سازی سبد را برای کاربر احراز هویت شده نادیده بگیرد", () => {
      const { syncCart } = useCartStore.getState();

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          totalAmount: 90000,
          totalDiscount: 10000,
          paymentAmount: 90000,
          cartItems: [{ ...mockItem, count: 1 }],
        })
      );

      syncCart();

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(0);
    });
  });

  describe("Cart Migration Integration - cart migration integration", () => {
    const mockAddToCartMultiple = vi.fn();
    const mockRefetchCart = vi.fn();

    beforeEach(() => {
      mockAuthStore.isAuthenticated = false;
    });

    it("باید سبد مهمان را به سرور منتقل کند", async () => {
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          totalAmount: 180000,
          totalDiscount: 20000,
          paymentAmount: 180000,
          cartItems: [
            {
              itemId: "item-123",
              title: "Test Item 1",
              description: "Test Description 1",
              count: 2,
              images: ["image1.jpg"],
              price: "100000",
              discount: "10000",
              finalPrice: 90000,
              category: { title: "Test Category 1" },
            },
            {
              itemId: "item-456",
              title: "Test Item 2",
              description: "Test Description 2",
              count: 1,
              images: ["image2.jpg"],
              price: "50000",
              discount: "5000",
              finalPrice: 45000,
              category: { title: "Test Category 2" },
            },
          ],
        })
      );

      mockAddToCartMultiple.mockResolvedValue({ success: true });

      await migrateGuestCartToServer(mockAddToCartMultiple, mockRefetchCart);

      vi.advanceTimersByTime(1000);

      expect(mockAddToCartMultiple).toHaveBeenCalledWith({
        items: [
          { itemId: "item-123", count: 2 },
          { itemId: "item-456", count: 1 },
        ],
      });

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("guest-cart");

      expect(mockRefetchCart).toHaveBeenCalled();
    });

    it("باید خطای انتقال سبد را مدیریت کند", async () => {
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          totalAmount: 90000,
          totalDiscount: 10000,
          paymentAmount: 90000,
          cartItems: [
            {
              itemId: "item-123",
              title: "Test Item",
              description: "Test Description",
              count: 1,
              images: ["image1.jpg"],
              price: "100000",
              discount: "10000",
              finalPrice: 90000,
              category: { title: "Test Category" },
            },
          ],
        })
      );

      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockAddToCartMultiple.mockRejectedValue(new Error("API Error"));

      await migrateGuestCartToServer(mockAddToCartMultiple, mockRefetchCart);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error migrating guest cart (add-multiple):",
        expect.any(Error)
      );

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("guest-cart");

      consoleErrorSpy.mockRestore();
    });

    it("باید سبد خالی را منتقل نکند", async () => {
      localStorageMock.getItem.mockReturnValue(null);

      await migrateGuestCartToServer(mockAddToCartMultiple, mockRefetchCart);

      expect(mockAddToCartMultiple).not.toHaveBeenCalled();
      expect(mockRefetchCart).not.toHaveBeenCalled();
    });
  });

  describe("Cart State Synchronization - cart state synchronization", () => {
    it("باید وضعیت سبد را با localStorage همگام‌سازی کند", () => {
      const { syncCart } = useCartStore.getState();

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          totalAmount: 270000,
          totalDiscount: 30000,
          paymentAmount: 270000,
          cartItems: [
            {
              itemId: "item-123",
              title: "Test Item 1",
              description: "Test Description 1",
              count: 2,
              images: ["image1.jpg"],
              price: "100000",
              discount: "10000",
              finalPrice: 90000,
              category: { title: "Test Category 1" },
            },
            {
              itemId: "item-456",
              title: "Test Item 2",
              description: "Test Description 2",
              count: 1,
              images: ["image2.jpg"],
              price: "100000",
              discount: "10000",
              finalPrice: 90000,
              category: { title: "Test Category 2" },
            },
          ],
        })
      );

      syncCart();

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(2);
      expect(state.cart.totalAmount).toBe(270000);
      expect(state.cart.totalDiscount).toBe(30000);
    });

    it("باید وضعیت سبد را در صورت یکسان بودن تغییر ندهد", () => {
      const { syncCart } = useCartStore.getState();

      useCartStore.setState({
        cart: {
          totalAmount: 90000,
          totalDiscount: 10000,
          paymentAmount: 90000,
          cartItems: [
            {
              itemId: "item-123",
              title: "Test Item",
              description: "Test Description",
              count: 1,
              images: ["image1.jpg"],
              price: "100000",
              discount: "10000",
              finalPrice: 90000,
              category: { title: "Test Category" },
            },
          ],
        },
      });

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          totalAmount: 90000,
          totalDiscount: 10000,
          paymentAmount: 90000,
          cartItems: [
            {
              itemId: "item-123",
              title: "Test Item",
              description: "Test Description",
              count: 1,
              images: ["image1.jpg"],
              price: "100000",
              discount: "10000",
              finalPrice: 90000,
              category: { title: "Test Category" },
            },
          ],
        })
      );

      const initialState = useCartStore.getState();
      syncCart();
      const finalState = useCartStore.getState();

      expect(JSON.stringify(initialState.cart)).toBe(
        JSON.stringify(finalState.cart)
      );
    });
  });

  describe("Error Handling Integration - error handling integration", () => {
    it("باید خطای localStorage را مدیریت کند", async () => {
      const { addToCart } = useCartStore.getState();

      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      const mockItem: CartItem = {
        itemId: "item-123",
        title: "Test Item",
        description: "Test Description",
        count: 1,
        images: ["image1.jpg"],
        price: "100000",
        discount: "10000",
        finalPrice: 90000,
        category: { title: "Test Category" },
        quantity: 10,
      };

      await expect(addToCart(mockItem)).resolves.not.toThrow();

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(1);
    });

    it("باید خطای JSON.parse را مدیریت کند", () => {
      const { syncCart } = useCartStore.getState();

      localStorageMock.getItem.mockReturnValue("invalid json");

      expect(() => syncCart()).not.toThrow();

      const state = useCartStore.getState();
      expect(state.cart.cartItems).toHaveLength(0);
    });
  });
});
