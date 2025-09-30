import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  useAddToCart,
  useCart,
  useIncItem,
  useDecItem,
  useRemoveItem,
  useClearCart,
} from "../cart";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockFetchApi = {
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  get: vi.fn(),
};

const mockIsAuthenticated = vi.fn(() => true);
vi.mock("@/store/authStore", () => ({
  useAuthStore: (selector: any) => {
    if (selector.toString().includes("isAuthenticated")) {
      return mockIsAuthenticated();
    }
    return {};
  },
}));

vi.mock("@/hooks/api/useReactQueryHooks", () => ({
  usePost: vi.fn((getUrl, getBody, options) => ({
    mutate: vi.fn((data, mutationOptions) => {
      const url = typeof getUrl === "function" ? getUrl(data) : getUrl;
      const body = getBody ? getBody(data) : data;

      return mockFetchApi
        .post(url, body)
        .then((response: any) => {
          if (mutationOptions?.onSuccess) {
            mutationOptions.onSuccess(response);
          }
          return response;
        })
        .catch((error: any) => {
          if (mutationOptions?.onError) {
            mutationOptions.onError(error);
          }
          throw error;
        });
    }),
    isPending: false,
    error: null,
  })),
  usePatch: vi.fn((getUrl, getBody, options) => ({
    mutate: vi.fn((data, mutationOptions) => {
      const url = typeof getUrl === "function" ? getUrl(data) : getUrl;
      const body = getBody ? getBody(data) : data;

      return mockFetchApi
        .patch(url, body)
        .then((response: any) => {
          if (mutationOptions?.onSuccess) {
            mutationOptions.onSuccess(response);
          }
          return response;
        })
        .catch((error: any) => {
          if (mutationOptions?.onError) {
            mutationOptions.onError(error);
          }
          throw error;
        });
    }),
    isPending: false,
    error: null,
  })),
  useDelete: vi.fn((getUrl, options) => ({
    mutate: vi.fn((data, mutationOptions) => {
      const url = typeof getUrl === "function" ? getUrl(data) : getUrl;

      return mockFetchApi
        .delete(url)
        .then((response: any) => {
          if (mutationOptions?.onSuccess) {
            mutationOptions.onSuccess(response);
          }
          return response;
        })
        .catch((error: any) => {
          if (mutationOptions?.onError) {
            mutationOptions.onError(error);
          }
          throw error;
        });
    }),
    isPending: false,
    error: null,
  })),
  useGet: vi.fn((url, options) => ({
    data: options?.initialData || null,
    isLoading: false,
    refetch: vi.fn(),
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

describe("Cart Services Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticated.mockReturnValue(true);
  });

  describe("useAddToCart - add to cart", () => {
    it("باید محصول را با موفقیت به سبد اضافه کند", async () => {
      const mockResponse = { success: true, message: "Item added to cart" };
      mockFetchApi.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useAddToCart(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        result.current.mutate({ itemId });
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/cart/add", {
        itemId,
      });
    });

    it("باید خطای محصول موجود در سبد را درست مدیریت کند", async () => {
      const mockError = {
        message: "item is already in your cart",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useAddToCart(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        try {
          await result.current.mutate({ itemId });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/cart/add", {
        itemId,
      });
    });

    it("باید خطای عمومی را درست مدیریت کند", async () => {
      const mockError = {
        message: "Server error",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useAddToCart(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        try {
          await result.current.mutate({ itemId });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/cart/add", {
        itemId,
      });
    });
  });

  describe("useIncItem - افزایش تعداد محصول", () => {
    it("باید تعداد محصول را با موفقیت افزایش دهد", async () => {
      const mockResponse = { success: true, message: "Item count increased" };
      mockFetchApi.patch.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useIncItem(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        result.current.mutate({ itemId });
      });

      expect(mockFetchApi.patch).toHaveBeenCalledWith("/v1/cart/inc-item", {
        itemId,
      });
    });

    it("باید خطای موجودی ناکافی را درست مدیریت کند", async () => {
      const mockError = {
        status: 422,
        message: "Insufficient stock",
      };
      mockFetchApi.patch.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useIncItem(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        try {
          await result.current.mutate({ itemId });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.patch).toHaveBeenCalledWith("/v1/cart/inc-item", {
        itemId,
      });
    });

    it("باید خطای عمومی را درست مدیریت کند", async () => {
      const mockError = {
        status: 500,
        message: "Server error",
      };
      mockFetchApi.patch.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useIncItem(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        try {
          await result.current.mutate({ itemId });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.patch).toHaveBeenCalledWith("/v1/cart/inc-item", {
        itemId,
      });
    });
  });

  describe("useDecItem - کاهش تعداد محصول", () => {
    it("باید تعداد محصول را با موفقیت کاهش دهد", async () => {
      const mockResponse = { success: true, message: "Item count decreased" };
      mockFetchApi.patch.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useDecItem(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        result.current.mutate({ itemId });
      });

      expect(mockFetchApi.patch).toHaveBeenCalledWith("/v1/cart/dec-item", {
        itemId,
      });
    });
  });

  describe("useRemoveItem - حذف محصول از سبد", () => {
    it("باید محصول را با موفقیت از سبد حذف کند", async () => {
      const mockResponse = { success: true, message: "Item removed from cart" };
      mockFetchApi.delete.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useRemoveItem(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        result.current.mutate({ itemId });
      });

      expect(mockFetchApi.delete).toHaveBeenCalledWith("/v1/cart/remove");
    });
  });

  describe("useClearCart - پاک کردن سبد خرید", () => {
    it("باید سبد خرید را با موفقیت پاک کند", async () => {
      const mockResponse = { success: true, message: "Cart cleared" };
      mockFetchApi.delete.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useClearCart(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.mutate();
      });

      expect(mockFetchApi.delete).toHaveBeenCalledWith("/v1/cart");
    });
  });

  describe("useCart - دریافت سبد خرید", () => {
    it("باید سبد خرید را برای کاربر احراز هویت شده دریافت کند", () => {
      mockIsAuthenticated.mockReturnValue(true);

      const { result } = renderHook(() => useCart(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isCartLoading).toBe(false);
    });

    it("باید سبد خرید را برای کاربر مهمان غیرفعال کند", () => {
      mockIsAuthenticated.mockReturnValue(false);

      const { result } = renderHook(() => useCart(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("Cart Services Integration - یکپارچگی سرویس‌های سبد", () => {
    it("باید عملیات‌های مختلف سبد را با هم هماهنگ کند", async () => {
      mockFetchApi.post.mockResolvedValueOnce({ success: true });
      mockFetchApi.patch.mockResolvedValueOnce({ success: true });
      mockFetchApi.delete.mockResolvedValueOnce({ success: true });

      const { result: addResult } = renderHook(() => useAddToCart(), {
        wrapper: createWrapper(),
      });
      const { result: incResult } = renderHook(() => useIncItem(), {
        wrapper: createWrapper(),
      });
      const { result: removeResult } = renderHook(() => useRemoveItem(), {
        wrapper: createWrapper(),
      });

      const itemId = "item-123";

      await act(async () => {
        addResult.current.mutate({ itemId });
      });

      await act(async () => {
        incResult.current.mutate({ itemId });
      });

      await act(async () => {
        removeResult.current.mutate({ itemId });
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/cart/add", {
        itemId,
      });
      expect(mockFetchApi.patch).toHaveBeenCalledWith("/v1/cart/inc-item", {
        itemId,
      });
      expect(mockFetchApi.delete).toHaveBeenCalledWith("/v1/cart/remove");
    });
  });
});
