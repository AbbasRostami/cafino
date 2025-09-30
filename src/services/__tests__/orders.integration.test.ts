import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  useGetOrders,
  useGetOrdersAdmin,
  useChangeOrderStatus,
  useCancelOrder,
} from "../orders";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/hooks/api/useReactQueryHooks", () => ({
  useGet: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  usePost: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    variables: null,
  })),
  usePut: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    error: null,
    variables: null,
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

describe("Orders Services Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useGetOrders - دریافت سفارشات کاربر", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useGetOrders(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
      expect(result.current.total).toBeDefined();
      expect(result.current.page).toBeDefined();
      expect(result.current.limit).toBeDefined();
    });

    it("باید پارامترهای query را درست مدیریت کند", () => {
      const params = {
        page: 2,
        limit: 10,
      };

      const { result } = renderHook(() => useGetOrders(params), {
        wrapper: createWrapper(),
      });

      expect(result.current.page).toBe(2);
      expect(result.current.limit).toBe(10);
    });

    it("باید مقادیر پیش‌فرض را درست تنظیم کند", () => {
      const { result } = renderHook(() => useGetOrders(), {
        wrapper: createWrapper(),
      });

      expect(result.current.page).toBe(1);
      expect(result.current.limit).toBe(4);
      expect(result.current.total).toBe(0);
    });
  });

  describe("useGetOrdersAdmin - دریافت سفارشات ادمین", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(
        () =>
          useGetOrdersAdmin({
            limit: 10,
            page: 1,
            status: "pending",
            sortBy: "newest",
          }),
        {
          wrapper: createWrapper(),
        }
      );

      expect(result.current).toBeDefined();
      expect(result.current.orders).toBeDefined();
      expect(result.current.total).toBeDefined();
      expect(result.current.page).toBeDefined();
      expect(result.current.limit).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it("باید پارامترهای فیلتر را درست مدیریت کند", () => {
      const { result } = renderHook(
        () =>
          useGetOrdersAdmin({
            limit: 20,
            page: 3,
            status: "completed",
            sortBy: "oldest",
          }),
        {
          wrapper: createWrapper(),
        }
      );

      expect(result.current.limit).toBeDefined();
      expect(result.current).toBeDefined();
    });

    it("باید مقادیر پیش‌فرض ادمین را درست تنظیم کند", () => {
      const { result } = renderHook(() => useGetOrdersAdmin({}), {
        wrapper: createWrapper(),
      });

      expect(result.current.page).toBe(1);
      expect(result.current.limit).toBe(10);
      expect(result.current.total).toBe(0);
      expect(result.current.orders).toEqual([]);
    });
  });

  describe("useChangeOrderStatus - تغییر وضعیت سفارش", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useChangeOrderStatus(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBeDefined();
      expect(result.current.variables).toBeDefined();
    });

    it("باید mutate function را فراهم کند", () => {
      const { result } = renderHook(() => useChangeOrderStatus(), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.mutate).toBe("function");
    });

    it("باید loading state را مدیریت کند", () => {
      const { result } = renderHook(() => useChangeOrderStatus(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);
    });
  });

  describe("useCancelOrder - لغو سفارش", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useCancelOrder(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBeDefined();
      expect(result.current.error).toBeDefined();
      expect(result.current.cancellingOrderId).toBeDefined();
    });

    it("باید mutate function را فراهم کند", () => {
      const { result } = renderHook(() => useCancelOrder(), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.mutate).toBe("function");
    });

    it("باید loading state را مدیریت کند", () => {
      const { result } = renderHook(() => useCancelOrder(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);
      expect(result.current.cancellingOrderId).toBeNull();
    });
  });

  describe("Orders Management Integration - یکپارچگی مدیریت سفارشات", () => {
    it("باید تمام hooks را بدون خطا اجرا کند", () => {
      const { result: getOrdersResult } = renderHook(() => useGetOrders(), {
        wrapper: createWrapper(),
      });

      const { result: getOrdersAdminResult } = renderHook(
        () => useGetOrdersAdmin({}),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: changeStatusResult } = renderHook(
        () => useChangeOrderStatus(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: cancelOrderResult } = renderHook(() => useCancelOrder(), {
        wrapper: createWrapper(),
      });

      expect(getOrdersResult.current).toBeDefined();
      expect(getOrdersAdminResult.current).toBeDefined();
      expect(changeStatusResult.current).toBeDefined();
      expect(cancelOrderResult.current).toBeDefined();
    });

    it("باید state management را درست مدیریت کند", () => {
      const { result: getOrdersResult } = renderHook(() => useGetOrders(), {
        wrapper: createWrapper(),
      });

      const { result: getOrdersAdminResult } = renderHook(
        () => useGetOrdersAdmin({}),
        {
          wrapper: createWrapper(),
        }
      );

      expect(getOrdersResult.current.isLoading).toBe(false);
      expect(getOrdersAdminResult.current.isLoading).toBe(false);
      expect(getOrdersResult.current.total).toBe(0);
      expect(getOrdersAdminResult.current.total).toBe(0);
    });

    it("باید error handling را درست مدیریت کند", () => {
      const { result: getOrdersResult } = renderHook(() => useGetOrders(), {
        wrapper: createWrapper(),
      });

      const { result: cancelOrderResult } = renderHook(() => useCancelOrder(), {
        wrapper: createWrapper(),
      });

      expect(getOrdersResult.current.error).toBeNull();
      expect(cancelOrderResult.current.error).toBeNull();
    });
  });

  describe("Order Status Management - مدیریت وضعیت سفارش", () => {
    it("باید تغییر وضعیت سفارش را مدیریت کند", () => {
      const { result } = renderHook(() => useChangeOrderStatus(), {
        wrapper: createWrapper(),
      });
      expect(result.current.mutate).toBeDefined();
      expect(typeof result.current.mutate).toBe("function");
      expect(result.current.variables).toBeDefined();
    });

    it("باید لغو سفارش را مدیریت کند", () => {
      const { result } = renderHook(() => useCancelOrder(), {
        wrapper: createWrapper(),
      });

      expect(result.current.mutate).toBeDefined();
      expect(typeof result.current.mutate).toBe("function");

      expect(result.current.cancellingOrderId).toBeNull();
    });
  });

  describe("Order Data Flow - جریان داده سفارشات", () => {
    it("باید داده‌های سفارشات کاربر را درست برگرداند", () => {
      const { result } = renderHook(() => useGetOrders(), {
        wrapper: createWrapper(),
      });

      expect(result.current.total).toBe(0);
      expect(result.current.page).toBe(1);
      expect(result.current.limit).toBe(4);
    });

    it("باید داده‌های سفارشات ادمین را درست برگرداند", () => {
      const { result } = renderHook(() => useGetOrdersAdmin({}), {
        wrapper: createWrapper(),
      });

      expect(result.current.orders).toEqual([]);
      expect(result.current.total).toBe(0);
      expect(result.current.page).toBe(1);
      expect(result.current.limit).toBe(10);
    });

    it("باید pagination را درست مدیریت کند", () => {
      const { result: userOrdersResult } = renderHook(
        () => useGetOrders({ page: 2, limit: 8 }),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: adminOrdersResult } = renderHook(
        () => useGetOrdersAdmin({ page: 3, limit: 15 }),
        {
          wrapper: createWrapper(),
        }
      );

      expect(userOrdersResult.current.page).toBe(2);
      expect(userOrdersResult.current.limit).toBe(8);
      expect(adminOrdersResult.current.limit).toBeDefined();
    });
  });
});
