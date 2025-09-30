import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useCheckout } from "../business/useCheckout";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock("@/components/shared/ConfirmModal", () => ({
  confirm: vi.fn(() => Promise.resolve(true)),
}));

vi.mock("@/hooks/business/AddToCartButton", () => ({
  useAddToCartButtonLogic: vi.fn(() => ({
    handleClearCart: vi.fn(),
    clearLoading: false,
  })),
}));

vi.mock("@/services", () => ({
  useRemoveDiscount: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
  useAddDiscount: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
  useGetAddresses: vi.fn(() => ({
    data: [],
    isLoading: false,
  })),
  usePaymentGateway: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
  useCart: vi.fn(() => ({
    cart: {
      paymentAmount: 50000,
      totalAmount: 50000,
      totalDiscount: 0,
      cartItems: [],
      generalDiscount: null,
    },
  })),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useCheckout Hook Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: vi.fn(),
        getItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });

    Object.defineProperty(window, "location", {
      value: {
        href: "",
      },
      writable: true,
    });
  });

  describe("Initial State - حالت اولیه", () => {
    it("باید با حالت اولیه صحیح شروع شود", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.register).toBeDefined();
      expect(result.current.handleSubmit).toBeDefined();
      expect(result.current.isDiscountApplied).toBe(false);
      expect(result.current.selectedAddressId).toBeNull();
      expect(result.current.isCheckoutLoading).toBe(false);
    });
  });

  describe("Address Management - مدیریت آدرس", () => {
    it("باید آدرس را انتخاب کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.handleAddressSelect("addr-123");
      });

      expect(result.current.selectedAddressId).toBe("addr-123");
    });

    it("باید آدرس انتخاب شده را ویرایش کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.handleAddressSelect("addr-123");
      });

      act(() => {
        result.current.handleEditAddress();
      });

      expect(result.current.selectedAddressId).toBeNull();
    });

    it("باید handleAddressAdded function را داشته باشد", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.handleAddressAdded).toBeDefined();

      act(() => {
        result.current.handleAddressAdded();
      });
    });
  });

  describe("Discount Management - مدیریت تخفیف", () => {
    it("باید فرم تخفیف را فراهم کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.register).toBeDefined();
      expect(result.current.handleSubmit).toBeDefined();
      expect(result.current.onSubmit).toBeDefined();
      expect(result.current.handleRemove).toBeDefined();
    });

    it("باید حالت loading تخفیف را نمایش دهد", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.addDiscountLoading).toBeDefined();
      expect(result.current.removeDiscountLoading).toBeDefined();
    });
  });

  describe("Cart Management - مدیریت سبد خرید", () => {
    it("باید توابع مدیریت سبد را فراهم کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.handleBackClick).toBeDefined();
      expect(result.current.handleClearCartClick).toBeDefined();
      expect(result.current.clearLoading).toBeDefined();
    });
  });

  describe("Payment Flow - فرآیند پرداخت", () => {
    it("باید handleCompleteOrder function را داشته باشد", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.handleCompleteOrder).toBeDefined();
      expect(typeof result.current.handleCompleteOrder).toBe("function");
    });

    it("باید حالت loading در طول پرداخت را مدیریت کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isCheckoutLoading).toBe(false);
    });
  });

  describe("Error Handling - مدیریت خطا", () => {
    it("باید function ها را بدون خطا ارائه دهد", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.handleCompleteOrder).toBeDefined();
      expect(result.current.handleBackClick).toBeDefined();
      expect(result.current.handleClearCartClick).toBeDefined();
    });
  });

  describe("Data Integration - یکپارچگی داده‌ها", () => {
    it("باید وضعیت checkout را داشته باشد", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.addresses).toBeDefined();
      expect(result.current.addressesLoading).toBeDefined();
      expect(result.current.selectedAddress).toBeDefined();
    });

    it("باید آدرس انتخاب شده را مدیریت کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.selectedAddressId).toBeNull();
      expect(result.current.selectedAddress).toBeNull();

      act(() => {
        result.current.handleAddressSelect("addr-123");
      });

      expect(result.current.selectedAddressId).toBe("addr-123");
    });
  });

  describe("Form Integration - یکپارچگی فرم", () => {
    it("باید فرم تخفیف را با validation مدیریت کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.register).toBeDefined();
      expect(result.current.errors).toBeDefined();
      expect(result.current.handleSubmit).toBeDefined();
    });

    it("باید حالت تخفیف اعمال شده را مدیریت کند", () => {
      const { result } = renderHook(() => useCheckout(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isDiscountApplied).toBe(false);
    });
  });
});
