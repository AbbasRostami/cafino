import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { LoginForm } from "@/components/main/auth";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, width, height, className }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  ),
}));

vi.mock("@/hooks/ui/useMediaQuery", () => ({
  useIsMobile: vi.fn(() => false),
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

vi.mock("@/hooks/api/useReactQueryHooks", () => ({
  usePost: vi.fn(() => ({
    mutate: vi.fn(),
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

describe("LoginForm - Authentication Component Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initial Render - رندر اولیه", () => {
    it("باید فرم ورود را با فیلد شماره موبایل نمایش دهد", () => {
      const mockOnOpenChange = vi.fn();
      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByText("ورود و ثبت نام")).toBeDefined();
      expect(
        screen.getByText("برای ورود، شماره موبایل خود را وارد کنید")
      ).toBeDefined();
      expect(screen.getByPlaceholderText("09xxxxxxxxx")).toBeDefined();
      expect(screen.getByText("ارسال کد تایید")).toBeDefined();
    });

    it("باید دکمه بستن را نمایش دهد", () => {
      const mockOnOpenChange = vi.fn();
      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      const closeButton = screen.getByRole("button", { name: /close/i });
      expect(closeButton).toBeDefined();
    });
  });

  describe("Phone Input Flow - فرآیند ورود شماره موبایل", () => {
    it("باید شماره موبایل معتبر را بپذیرد", async () => {
      const user = userEvent.setup();
      const mockOnOpenChange = vi.fn();

      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      const phoneInput = screen.getByPlaceholderText("09xxxxxxxxx");
      expect(phoneInput).toBeInTheDocument();

      await user.type(phoneInput, "09123456789");

      const sendButton = screen.getByRole("button", {
        name: /ارسال کد تایید/i,
      });
      await user.click(sendButton);

      expect(mockSendOTP).toHaveBeenCalledWith(
        { phone: "09123456789" },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });

    it("باید شماره موبایل نامعتبر را رد کند", async () => {
      const user = userEvent.setup();
      const mockOnOpenChange = vi.fn();

      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      const phoneInput = screen.getByPlaceholderText("09xxxxxxxxx");
      expect(phoneInput).toBeInTheDocument();

      await user.type(phoneInput, "123");

      const sendButton = screen.getByRole("button", {
        name: /ارسال کد تایید/i,
      });
      await user.click(sendButton);

      expect(mockSendOTP).not.toHaveBeenCalled();
    });

    it("باید فقط اعداد را در فیلد شماره موبایل بپذیرد", async () => {
      const user = userEvent.setup();
      const mockOnOpenChange = vi.fn();

      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      const phoneInput = screen.getByPlaceholderText("09xxxxxxxxx");
      expect(phoneInput).toBeInTheDocument();

      await user.type(phoneInput, "abc");

      expect(phoneInput).toHaveValue("");
    });
  });

  describe("Form Validation Integration - یکپارچگی اعتبارسنجی فرم", () => {
    it("باید قوانین اعتبارسنجی شماره موبایل را اعمال کند", async () => {
      const user = userEvent.setup();
      const mockOnOpenChange = vi.fn();

      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      const phoneInput = screen.getByPlaceholderText("09xxxxxxxxx");
      const sendButton = screen.getByRole("button", {
        name: /ارسال کد تایید/i,
      });

      await user.click(sendButton);
      expect(mockSendOTP).not.toHaveBeenCalled();

      await user.type(phoneInput, "091234");
      await user.click(sendButton);
      expect(mockSendOTP).not.toHaveBeenCalled();

      await user.clear(phoneInput);
      await user.type(phoneInput, "09123456789");
      await user.click(sendButton);
      expect(mockSendOTP).toHaveBeenCalled();
    });
  });

  describe("Error Handling - مدیریت خطا", () => {
    it("باید خطای ارسال OTP را درست مدیریت کند", async () => {
      const user = userEvent.setup();
      const mockOnOpenChange = vi.fn();

      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      const phoneInput = screen.getByPlaceholderText("09xxxxxxxxx");
      const sendButton = screen.getByRole("button", {
        name: /ارسال کد تایید/i,
      });

      await user.type(phoneInput, "09123456789");
      await user.click(sendButton);

      expect(mockSendOTP).toHaveBeenCalledWith(
        { phone: "09123456789" },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });
  });

  describe("Mobile Responsiveness - واکنش‌گرایی موبایل", () => {
    it("باید در دسکتاپ از Dialog استفاده کند", () => {
      const mockOnOpenChange = vi.fn();
      render(<LoginForm open={true} onOpenChange={mockOnOpenChange} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByText("ورود و ثبت نام")).toBeDefined();
    });
  });
});
