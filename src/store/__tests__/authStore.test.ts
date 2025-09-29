import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuthStore, User } from "../authStore";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useAuthStore - Store of authentication", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: true,
    });

    vi.clearAllMocks();
  });

  it("باید در حالت اولیه درست تنظیم شود", () => {
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(true);
  });

  it("باید کاربر را تنظیم کند و isAuthenticated را true کند", () => {
    const mockUser: User = {
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
    };

    useAuthStore.getState().setUser(mockUser);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it("باید کاربر null را تنظیم کند و isAuthenticated را false کند", () => {
    const mockUser: User = {
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
    };

    useAuthStore.getState().setUser(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().setUser(null);

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("باید loading state را تنظیم کند", () => {
    useAuthStore.getState().setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);

    useAuthStore.getState().setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);
  });

  it("باید isAuthenticated را مستقیماً تنظیم کند", () => {
    useAuthStore.getState().setAuthenticated(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().setAuthenticated(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("باید auth state را reset کند", () => {
    const mockUser: User = {
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
    };

    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setLoading(false);

    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().isLoading).toBe(false);

    useAuthStore.getState().resetAuth();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it("باید setUser با کاربر معتبر isAuthenticated را true کند", () => {
    const mockUser: User = {
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
    };

    useAuthStore.getState().setUser(mockUser);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
  });

  it("باید setUser با null isAuthenticated را false کند", () => {
    useAuthStore.getState().setUser(null);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
  });

  it("باید state را درست به‌روزرسانی کند", () => {
    let state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(true);

    const mockUser: User = {
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
    };

    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setLoading(false);

    state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });
});
