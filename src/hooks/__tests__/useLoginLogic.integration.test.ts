import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useLoginLogic } from "../business/useLoginLogic";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/store/cartStore", async () => {
  const actual = await vi.importActual("@/store/cartStore");
  return {
    ...actual,
    migrateGuestCartToServer: vi.fn(),
  };
});

const mockSendOTP = vi.fn();
const mockVerifyOTP = vi.fn();
const mockResendOTP = vi.fn();
const mockAddToCartMultiple = vi.fn();
const mockRefetchCart = vi.fn();

vi.mock("@/services", () => ({
  useSendOTP: () => ({
    mutate: mockSendOTP,
    isPending: false,
  }),
  useVerifyOTP: () => ({  
    mutate: mockVerifyOTP,
    isPending: false,
  }),
  useResendOTP: () => ({
    mutate: mockResendOTP,
    isPending: false,
  }),
  useAddToCartMultiple: () => ({
    mutateAsync: mockAddToCartMultiple,
  }),
  useCart: () => ({
    refetch: mockRefetchCart,
  }),
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

describe("useLoginLogic - Authentication Flow Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.getState().resetAuth();
    useCartStore.getState().clearCart();
  });

  describe("Initial State", () => {
    it("باید با حالت اولیه صحیح شروع شود", () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      expect(result.current.step).toBe("phone");
      expect(result.current.phoneValue).toBe("");
      expect(result.current.resendTimer).toBe(0);
      expect(result.current.isSendOTPLoading).toBe(false);
      expect(result.current.isVerifyOTPLoading).toBe(false);
      expect(result.current.isResendOTPLoading).toBe(false);
    });
  });

  describe("Phone Step", () => {
    it("باید شماره موبایل را ارسال کند و به مرحله OTP برود", async () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        result.current.handleSendOTP(phone);
      });

      expect(mockSendOTP).toHaveBeenCalledWith(
        { phone },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );

      await act(async () => {
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(result.current.step).toBe("otp");
      expect(result.current.phoneValue).toBe(phone);
      expect(result.current.resendTimer).toBe(120);
    });

    it("باید در صورت خطا در ارسال OTP، در مرحله phone باقی بماند", async () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      const phone = "09123456789";

      await act(async () => {
        result.current.handleSendOTP(phone);
      });

      expect(mockSendOTP).toHaveBeenCalledWith(
        { phone },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );

      expect(result.current.step).toBe("phone");
      expect(result.current.phoneValue).toBe("");
    });
  });

  describe("OTP Step", () => {
    it("باید کد تایید را تایید کند و احراز هویت شود", async () => {
      const mockOnSuccess = vi.fn();
      const { result } = renderHook(
        () => useLoginLogic({ onSuccess: mockOnSuccess }),
        {
          wrapper: createWrapper(),
        }
      );

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(result.current.step).toBe("otp");

      const otp = "12345";
      const phone = "09123456789";

      await act(async () => {
        result.current.handleVerifyOTP(otp, phone);
      });

      expect(mockVerifyOTP).toHaveBeenCalledWith(
        { phone, otpCode: otp },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );

      await act(async () => {
        const onSuccessCallback = mockVerifyOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(mockOnSuccess).toHaveBeenCalled();
      expect(result.current.step).toBe("phone");
    });

    it("باید کد تایید را مجدداً ارسال کند", async () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      await act(async () => {
        result.current.handleResendOTP();
      });

      expect(mockResendOTP).toHaveBeenCalledWith(
        { phone: "09123456789" },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );

      await act(async () => {
        const onSuccessCallback = mockResendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(result.current.resendTimer).toBe(120);
    });

    it("باید به مرحله phone برگردد", async () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(result.current.step).toBe("otp");

      await act(async () => {
        result.current.goBackToPhone();
      });

      expect(result.current.step).toBe("phone");
    });
  });

  describe("Timer Functionality", () => {
    it("باید تایمر resend را درست مدیریت کند", async () => {
      vi.useFakeTimers();

      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(result.current.resendTimer).toBe(120);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.resendTimer).toBe(119);

      await act(async () => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.resendTimer).toBe(118);

      vi.useRealTimers();
    });

    it("باید تایمر را درست فرمت کند", () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      expect(result.current.formatTime(125)).toBe("2:05");
      expect(result.current.formatTime(65)).toBe("1:05");
      expect(result.current.formatTime(5)).toBe("0:05");
      expect(result.current.formatTime(0)).toBe("0:00");
    });
  });

  describe("Cart Migration Integration", () => {
    it("باید سبد خرید مهمان را بعد از احراز هویت منتقل کند", async () => {
      const { migrateGuestCartToServer } = await import("@/store/cartStore");

      const mockOnSuccess = vi.fn();
      const { result } = renderHook(
        () => useLoginLogic({ onSuccess: mockOnSuccess }),
        {
          wrapper: createWrapper(),
        }
      );

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      await act(async () => {
        result.current.handleVerifyOTP("12345", "09123456789");
        const onSuccessCallback = mockVerifyOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(migrateGuestCartToServer).toHaveBeenCalledWith(
        mockAddToCartMultiple,
        mockRefetchCart
      );
    });
  });

  describe("Error Handling", () => {
    it("باید در صورت خطا در تایید OTP، در مرحله OTP باقی بماند", async () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      await act(async () => {
        result.current.handleVerifyOTP("12345", "09123456789");
      });

      expect(result.current.step).toBe("otp");
    });

    it("باید در صورت خطا در ارسال مجدد OTP، تایمر را تغییر ندهد", async () => {
      const { result } = renderHook(() => useLoginLogic(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      const initialTimer = result.current.resendTimer;

      await act(async () => {
        result.current.handleResendOTP();
      });

      expect(result.current.resendTimer).toBe(initialTimer);
    });
  });

  describe("Callback Integration", () => {
    it("باید onSuccess callback را بعد از احراز هویت موفق فراخوانی کند", async () => {
      const mockOnSuccess = vi.fn();
      const { result } = renderHook(
        () => useLoginLogic({ onSuccess: mockOnSuccess }),
        {
          wrapper: createWrapper(),
        }
      );

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      await act(async () => {
        result.current.handleVerifyOTP("12345", "09123456789");
        const onSuccessCallback = mockVerifyOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });

    it("باید onClose callback را بعد از احراز هویت موفق فراخوانی کند", async () => {
      const mockOnClose = vi.fn();
      const { result } = renderHook(
        () => useLoginLogic({ onClose: mockOnClose }),
        {
          wrapper: createWrapper(),
        }
      );

      await act(async () => {
        result.current.handleSendOTP("09123456789");
        const onSuccessCallback = mockSendOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      await act(async () => {
        result.current.handleVerifyOTP("12345", "09123456789");
        const onSuccessCallback = mockVerifyOTP.mock.calls[0][1].onSuccess;
        onSuccessCallback();
      });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
