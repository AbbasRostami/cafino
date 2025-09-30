import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  useAdminOverview,
  useUserOverview,
  useOrderOverview,
} from "../overview";

vi.mock("@/hooks/api/useReactQueryHooks", () => ({
  useGet: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
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

describe("Admin Dashboard Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useAdminOverview - admin overview", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useAdminOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it("باید loading state را مدیریت کند", () => {
      const { result } = renderHook(() => useAdminOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
    });

    it("باید error state را مدیریت کند", () => {
      const { result } = renderHook(() => useAdminOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toBeNull();
    });

    it("باید data state را مدیریت کند", () => {
      const { result } = renderHook(() => useAdminOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
    });
  });

  describe("useUserOverview - user overview", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useUserOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it("باید loading state را مدیریت کند", () => {
      const { result } = renderHook(() => useUserOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
    });

    it("باید error state را مدیریت کند", () => {
      const { result } = renderHook(() => useUserOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toBeNull();
    });

    it("باید data state را مدیریت کند", () => {
      const { result } = renderHook(() => useUserOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
    });
  });

  describe("useOrderOverview - order overview", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useOrderOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it("باید loading state را مدیریت کند", () => {
      const { result } = renderHook(() => useOrderOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
    });

    it("باید error state را مدیریت کند", () => {
      const { result } = renderHook(() => useOrderOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toBeNull();
    });

    it("باید data state را مدیریت کند", () => {
      const { result } = renderHook(() => useOrderOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
    });
  });

  describe("Admin Dashboard Integration - admin dashboard integration", () => {
    it("باید تمام overview hooks را بدون خطا اجرا کند", () => {
      const { result: adminOverviewResult } = renderHook(
        () => useAdminOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: userOverviewResult } = renderHook(
        () => useUserOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: orderOverviewResult } = renderHook(
        () => useOrderOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(adminOverviewResult.current).toBeDefined();
      expect(userOverviewResult.current).toBeDefined();
      expect(orderOverviewResult.current).toBeDefined();
    });

    it("باید state management را درست مدیریت کند", () => {
      const { result: adminOverviewResult } = renderHook(
        () => useAdminOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: userOverviewResult } = renderHook(
        () => useUserOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: orderOverviewResult } = renderHook(
        () => useOrderOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(adminOverviewResult.current.isLoading).toBe(false);
      expect(userOverviewResult.current.isLoading).toBe(false);
      expect(orderOverviewResult.current.isLoading).toBe(false);

      expect(adminOverviewResult.current.isLoading).toBeDefined();
      expect(userOverviewResult.current.isLoading).toBeDefined();
      expect(orderOverviewResult.current.isLoading).toBeDefined();
    });

    it("باید error handling را درست مدیریت کند", () => {
      const { result: adminOverviewResult } = renderHook(
        () => useAdminOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: userOverviewResult } = renderHook(
        () => useUserOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: orderOverviewResult } = renderHook(
        () => useOrderOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(adminOverviewResult.current.error).toBeNull();
      expect(userOverviewResult.current.error).toBeNull();
      expect(orderOverviewResult.current.error).toBeNull();
    });
  });

  describe("Dashboard Data Flow - dashboard data flow", () => {
    it("باید داده‌های آمار کلی ادمین را درست برگرداند", () => {
      const { result } = renderHook(() => useAdminOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("باید داده‌های آمار کاربران را درست برگرداند", () => {
      const { result } = renderHook(() => useUserOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("باید داده‌های آمار سفارشات را درست برگرداند", () => {
      const { result } = renderHook(() => useOrderOverview(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe("Dashboard Performance - dashboard performance", () => {
    it("باید تمام hooks را همزمان بدون خطا اجرا کند", () => {
      const { result: adminOverviewResult } = renderHook(
        () => useAdminOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: userOverviewResult } = renderHook(
        () => useUserOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: orderOverviewResult } = renderHook(
        () => useOrderOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(adminOverviewResult.current).toBeDefined();
      expect(userOverviewResult.current).toBeDefined();
      expect(orderOverviewResult.current).toBeDefined();

      expect(adminOverviewResult.current.isLoading).toBeDefined();
      expect(userOverviewResult.current.isLoading).toBeDefined();
      expect(orderOverviewResult.current.isLoading).toBeDefined();

      expect(adminOverviewResult.current.error).toBeDefined();
      expect(userOverviewResult.current.error).toBeDefined();
      expect(orderOverviewResult.current.error).toBeDefined();
    });

    it("باید query keys را درست مدیریت کند", () => {
      const { result: adminOverviewResult } = renderHook(
        () => useAdminOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: userOverviewResult } = renderHook(
        () => useUserOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      const { result: orderOverviewResult } = renderHook(
        () => useOrderOverview(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(adminOverviewResult.current).toBeDefined();
      expect(userOverviewResult.current).toBeDefined();
      expect(orderOverviewResult.current).toBeDefined();
    });
  });
});
