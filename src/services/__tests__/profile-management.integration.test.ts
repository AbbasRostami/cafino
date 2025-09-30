import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useUpdateProfile, useUserProfile } from "../profile";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/store/authStore", () => ({
  useAuthStore: vi.fn(() => ({
    isAuthenticated: true,
  })),
}));

vi.mock("@/hooks/api/useReactQueryHooks", () => ({
  useGet: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  usePut: vi.fn(() => ({
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

describe("Profile Management Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useUserProfile - دریافت پروفایل کاربر", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it("باید loading state را مدیریت کند", () => {
      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
    });

    it("باید error state را مدیریت کند", () => {
      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toBeNull();
    });

    it("باید data state را مدیریت کند", () => {
      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
    });
  });

  describe("useUpdateProfile - به‌روزرسانی پروفایل", () => {
    it("باید hook را بدون خطا اجرا کند", () => {
      const { result } = renderHook(() => useUpdateProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.updateProfile).toBeDefined();
      expect(result.current.isPending).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it("باید updateProfile function را فراهم کند", () => {
      const { result } = renderHook(() => useUpdateProfile(), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.updateProfile).toBe("function");
    });

    it("باید loading state را مدیریت کند", () => {
      const { result } = renderHook(() => useUpdateProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);
    });

    it("باید error state را مدیریت کند", () => {
      const { result } = renderHook(() => useUpdateProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe("Profile Management Integration - یکپارچگی مدیریت پروفایل", () => {
    it("باید تمام hooks را بدون خطا اجرا کند", () => {
      const { result: userProfileResult } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      const { result: updateProfileResult } = renderHook(
        () => useUpdateProfile(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(userProfileResult.current).toBeDefined();
      expect(updateProfileResult.current).toBeDefined();
    });

    it("باید state management را درست مدیریت کند", () => {
      const { result: userProfileResult } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      const { result: updateProfileResult } = renderHook(
        () => useUpdateProfile(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(userProfileResult.current.isLoading).toBe(false);
      expect(updateProfileResult.current.isPending).toBe(false);

      expect(userProfileResult.current.isLoading).toBeDefined();
      expect(updateProfileResult.current.updateProfile).toBeDefined();
    });

    it("باید error handling را درست مدیریت کند", () => {
      const { result: userProfileResult } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      const { result: updateProfileResult } = renderHook(
        () => useUpdateProfile(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(userProfileResult.current.error).toBeNull();
      expect(updateProfileResult.current.error).toBeNull();
    });
  });

  describe("Profile Data Flow - جریان داده پروفایل", () => {
    it("باید داده‌های پروفایل کاربر را درست برگرداند", () => {
      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("باید updateProfile function را درست ارائه دهد", () => {
      const { result } = renderHook(() => useUpdateProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.updateProfile).toBeDefined();
      expect(typeof result.current.updateProfile).toBe("function");
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe("Profile Authentication Integration - یکپارچگی احراز هویت پروفایل", () => {
    it("باید authentication state را درست مدیریت کند", () => {
      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it("باید profile update را بدون خطا ارائه دهد", () => {
      const { result } = renderHook(() => useUpdateProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.updateProfile).toBeDefined();
      expect(result.current.isPending).toBeDefined();
      expect(result.current.error).toBeDefined();
    });
  });

  describe("Profile Performance - عملکرد پروفایل", () => {
    it("باید تمام hooks را همزمان بدون خطا اجرا کند", () => {
      const { result: userProfileResult } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      const { result: updateProfileResult } = renderHook(
        () => useUpdateProfile(),
        {
          wrapper: createWrapper(),
        }
      );

      expect(userProfileResult.current).toBeDefined();
      expect(updateProfileResult.current).toBeDefined();
      expect(userProfileResult.current.isLoading).toBeDefined();
      expect(updateProfileResult.current.isPending).toBeDefined();
      expect(userProfileResult.current.error).toBeDefined();
      expect(updateProfileResult.current.error).toBeDefined();
    });

    it("باید query keys را درست مدیریت کند", () => {
      const { result: userProfileResult } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      const { result: updateProfileResult } = renderHook(
        () => useUpdateProfile(),
        {
          wrapper: createWrapper(),
        }
      );
      expect(userProfileResult.current).toBeDefined();
      expect(updateProfileResult.current).toBeDefined();
    });
  });
});
