import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { usePaymentGateway, usePaymentVerify } from "../payment";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/hooks/api/useReactQueryHooks", () => ({
  usePost: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    error: null,
  })),
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

describe("Payment Services Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("usePaymentGateway - ایجاد درگاه پرداخت", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => usePaymentGateway(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBeDefined();
    });

    it("باید error state را داشته باشد", () => {
      const { result } = renderHook(() => usePaymentGateway(), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toBeDefined();
    });
  });

  describe("usePaymentVerify - تایید پرداخت", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(
        () =>
          usePaymentVerify({
            authority: "ABC123",
            status: "OK",
          }),
        {
          wrapper: createWrapper(),
        }
      );

      expect(result.current).toBeDefined();
      expect(result.current.data).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });
  });

  describe("Payment Flow Integration - یکپارچگی فرآیند پرداخت", () => {
    it("باید هر دو hook را بدون خطا اجرا کند", () => {
      const { result: gatewayResult } = renderHook(() => usePaymentGateway(), {
        wrapper: createWrapper(),
      });

      const { result: verifyResult } = renderHook(
        () =>
          usePaymentVerify({
            authority: "ABC123",
            status: "OK",
          }),
        {
          wrapper: createWrapper(),
        }
      );

      expect(gatewayResult.current).toBeDefined();
      expect(verifyResult.current).toBeDefined();
    });
  });
});
