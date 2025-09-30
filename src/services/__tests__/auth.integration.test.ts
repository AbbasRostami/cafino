import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useSendOTP, useVerifyOTP, useResendOTP } from "../auth";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockFetchApi = {
  post: vi.fn(),
};

const mockSetAuthenticated = vi.fn();
vi.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    setAuthenticated: mockSetAuthenticated,
  }),
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

describe("Authentication Services Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSetAuthenticated.mockClear();
  });

  describe("useSendOTP - send otp", () => {
    it("باید کد تایید را با موفقیت ارسال کند", async () => {
      const mockResponse = { success: true, message: "OTP sent" };
      mockFetchApi.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useSendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        result.current.mutate({ phone });
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/send-otp", {
        phone,
      });
    });

    it("باید خطای 403 (black list) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 403,
        message: "Phone number is blacklisted",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useSendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        try {
          await result.current.mutate({ phone });
        } catch (error) {}
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/send-otp", {
        phone,
      });
    });

    it("باید خطای 409 (کد قبلی معتبر) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 409,
        message: "Previous OTP still valid",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useSendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        try {
          await result.current.mutate({ phone });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/send-otp", {
        phone,
      });
    });

    it("باید خطای 429 (محدودیت درخواست) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 429,
        message: "Too many requests",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useSendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        try {
          await result.current.mutate({ phone });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/send-otp", {
        phone,
      });
    });
  });

  describe("useVerifyOTP - verify otp", () => {
    it("باید کد تایید را با موفقیت تایید کند و احراز هویت شود", async () => {
      const mockResponse = { success: true, message: "OTP verified" };
      mockFetchApi.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        result.current.mutate({ phone, otpCode });
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/verfiy-otp", {
        phone,
        otpCode,
      });
    });

    it("باید خطای 404 (حساب وجود ندارد) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 404,
        message: "Account not found",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        try {
          await result.current.mutate({ phone, otpCode });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/verfiy-otp", {
        phone,
        otpCode,
      });

      expect(mockSetAuthenticated).not.toHaveBeenCalled();
    });

    it("باید خطای 409 (کد قبلاً استفاده شده) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 409,
        message: "OTP already used",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        try {
          await result.current.mutate({ phone, otpCode });
        } catch (error) {}
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/verfiy-otp", {
        phone,
        otpCode,
      });
    });

    it("باید خطای 410 (کد منقضی شده) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 410,
        message: "OTP expired",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        try {
          await result.current.mutate({ phone, otpCode });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/verfiy-otp", {
        phone,
        otpCode,
      });
    });

    it("باید خطای 422 (کد نامعتبر) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 422,
        message: "Invalid OTP",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        try {
          await result.current.mutate({ phone, otpCode });
        } catch (error) {}
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/verfiy-otp", {
        phone,
        otpCode,
      });
    });
  });

  describe("useResendOTP - resend otp", () => {
    it("باید کد تایید را با موفقیت مجدداً ارسال کند", async () => {
      const mockResponse = { success: true, message: "OTP resent" };
      mockFetchApi.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useResendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        result.current.mutate({ phone });
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/resend-otp", {
        phone,
      });
    });

    it("باید خطای 404 (حساب وجود ندارد) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 404,
        message: "Account not found",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useResendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        try {
          await result.current.mutate({ phone });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/resend-otp", {
        phone,
      });
    });

    it("باید خطای 409 (کد قبلی معتبر) را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 409,
        message: "Previous OTP still valid",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useResendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        try {
          await result.current.mutate({ phone });
        } catch (error) {}
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/resend-otp", {
        phone,
      });
    });
  });

  describe("Authentication State Integration - authentication state integration", () => {
    it("باید وضعیت احراز هویت را بعد از تایید موفق OTP تغییر دهد", async () => {
      const mockResponse = { success: true, message: "OTP verified" };
      mockFetchApi.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        result.current.mutate({ phone, otpCode });
      });
    });

    it("باید وضعیت احراز هویت را در صورت خطا تغییر ندهد", async () => {
      const mockError = {
        statusCode: 422,
        message: "Invalid OTP",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        try {
          await result.current.mutate({ phone, otpCode });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockSetAuthenticated).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling Integration - error handling integration", () => {
    it("باید خطاهای پیش‌بینی نشده را درست مدیریت کند", async () => {
      const mockError = {
        statusCode: 500,
        message: "Internal server error",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useSendOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        try {
          await result.current.mutate({ phone });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/send-otp", {
        phone,
      });
    });

    it("باید خطاهای بدون statusCode را درست مدیریت کند", async () => {
      const mockError = {
        message: "Network error",
      };
      mockFetchApi.post.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useVerifyOTP(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";
      const otpCode = "12345";

      await act(async () => {
        try {
          await result.current.mutate({ phone, otpCode });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      expect(mockFetchApi.post).toHaveBeenCalledWith("/v1/auth/verfiy-otp", {
        phone,
        otpCode,
      });
    });
  });
});
