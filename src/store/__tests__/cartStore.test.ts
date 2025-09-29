import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCartStore, CartItem, CartApiResponse } from "../cartStore";
import { useAuthStore } from "../authStore";

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useCartStore - Store", () => {
  beforeEach(() => {
    useCartStore.setState({
      cart: {
        totalAmount: 0,
        totalDiscount: 0,
        paymentAmount: 0,
        cartItems: [],
      },
    });

    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockLocalStorage.setItem.mockImplementation(() => {});
    mockLocalStorage.removeItem.mockImplementation(() => {});
  });

  it("باید در حالت اولیه سبد خرید خالی باشد", () => {
    const state = useCartStore.getState();

    expect(state.cart.cartItems).toEqual([]);
    expect(state.cart.totalAmount).toBe(0);
    expect(state.cart.totalDiscount).toBe(0);
    expect(state.cart.paymentAmount).toBe(0);
  });

  it("باید محصول جدید را به سبد خرید اضافه کند", async () => {
    const mockItem: CartItem = {
      itemId: "1",
      title: "محصول تست",
      description: "توضیحات محصول",
      count: 1,
      images: ["image1.jpg"],
      price: "10000",
      discount: "0",
      finalPrice: 10000,
      category: { title: "دسته‌بندی" },
      quantity: 10,
    };

    await useCartStore.getState().addToCart(mockItem);

    const state = useCartStore.getState();
    expect(state.cart.cartItems).toHaveLength(1);
    expect(state.cart.cartItems[0].itemId).toBe("1");
    expect(state.cart.cartItems[0].count).toBe(1);
    expect(state.cart.totalAmount).toBe(10000);
  });

  it("باید محصول را از سبد خرید حذف کند", async () => {
    const mockItem: CartItem = {
      itemId: "1",
      title: "محصول تست",
      description: "توضیحات محصول",
      count: 1,
      images: ["image1.jpg"],
      price: "10000",
      discount: "0",
      finalPrice: 10000,
      category: { title: "دسته‌بندی" },
      quantity: 10,
    };

    await useCartStore.getState().addToCart(mockItem);

    await useCartStore.getState().removeItem("1");

    const state = useCartStore.getState();
    expect(state.cart.cartItems).toHaveLength(0);
    expect(state.cart.totalAmount).toBe(0);
  });

  it("باید سبد خرید را پاک کند", async () => {
    const mockItem: CartItem = {
      itemId: "1",
      title: "محصول تست",
      description: "توضیحات محصول",
      count: 1,
      images: ["image1.jpg"],
      price: "10000",
      discount: "0",
      finalPrice: 10000,
      category: { title: "دسته‌بندی" },
      quantity: 10,
    };

    await useCartStore.getState().addToCart(mockItem);

    await useCartStore.getState().clearCart();

    const state = useCartStore.getState();
    expect(state.cart.cartItems).toHaveLength(0);
    expect(state.cart.totalAmount).toBe(0);
  });

  it("باید برای کاربران احراز هویت شده کار نکند", async () => {
    useAuthStore.setState({
      user: {
        id: "1",
        username: "testuser",
        first_name: "تست",
        last_name: "کاربر",
        birthday: "1990-01-01",
        image: "avatar.jpg",
        imageUrl: "https://example.com/avatar.jpg",
        phone: "09123456789",
        email: "test@example.com",
        role: "user",
        is_email_verified: true,
        status: "active",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        addressList: [],
      },
      isAuthenticated: true,
      isLoading: false,
    });

    await useCartStore.getState().incItem("1");

    const state = useCartStore.getState();
    expect(state.cart.cartItems).toHaveLength(0);
  });

  it("باید تخفیف را درست محاسبه کند", async () => {
    const mockItem: CartItem = {
      itemId: "1",
      title: "محصول تست",
      description: "توضیحات محصول",
      count: 1,
      images: ["image1.jpg"],
      price: "10000",
      discount: "20",
      finalPrice: 8000,
      category: { title: "دسته‌بندی" },
      quantity: 10,
    };

    await useCartStore.getState().addToCart(mockItem);

    const state = useCartStore.getState();
    expect(state.cart.totalAmount).toBe(8000);
    expect(state.cart.totalDiscount).toBe(2000);
    expect(state.cart.paymentAmount).toBe(8000);
  });

  it("باید syncCart را درست اجرا کند", () => {
    const mockCart: CartApiResponse = {
      totalAmount: 5000,
      totalDiscount: 0,
      paymentAmount: 5000,
      cartItems: [
        {
          itemId: "1",
          title: "محصول تست",
          description: "توضیحات محصول",
          count: 1,
          images: ["image1.jpg"],
          price: "5000",
          discount: "0",
          finalPrice: 5000,
          category: { title: "دسته‌بندی" },
          quantity: 10,
        },
      ],
    };

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockCart));

    useCartStore.getState().syncCart();

    const state = useCartStore.getState();
    expect(state.cart.cartItems).toHaveLength(1);
    expect(state.cart.totalAmount).toBe(5000);
  });

  it("باید getCartItemCount را درست محاسبه کند", () => {
    const count = useCartStore.getState().getCartItemCount("1");
    expect(count).toBe(0);
  });
});
