import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserDropdown from "../../../shared/Header/UserDropdown";
import { UserDropdownProps } from "../../../../types/main";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockLogout = vi.fn();
const mockIsPending = false;

vi.mock("../../../../services/auth", () => ({
  useLogout: () => ({
    logout: mockLogout,
    isPending: mockIsPending,
  }),
}));

describe("UserDropdown - کامپوننت منوی کاربر", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUser = {
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

  it("باید دکمه ورود را نمایش دهد وقتی کاربر احراز هویت نشده", () => {
    const props: UserDropdownProps = {
      user: null,
      isAuthenticated: false,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    expect(screen.getByText("ورود / ثبت نام")).toBeDefined();
    expect(screen.queryByText("تست")).toBeNull();
  });

  it("باید دکمه ورود را کلیک کند و onLoginClick را فراخوانی کند", async () => {
    const mockOnLoginClick = vi.fn();
    const props: UserDropdownProps = {
      user: null,
      isAuthenticated: false,
      onLoginClick: mockOnLoginClick,
    };

    render(<UserDropdown {...props} />);

    const loginButton = screen.getByText("ورود / ثبت نام");
    const user = userEvent.setup();

    await user.click(loginButton);

    expect(mockOnLoginClick).toHaveBeenCalledTimes(1);
  });

  it("باید آواتار و نام کاربر را نمایش دهد وقتی احراز هویت شده", () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    expect(screen.getByText("تست")).toBeDefined();
    expect(screen.queryByText("ورود / ثبت نام")).toBeNull();
  });

  it("باید آواتار را با تصویر کاربر نمایش دهد", () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toBeDefined();
  });

  it("باید آواتار fallback را نمایش دهد وقتی تصویر وجود ندارد", () => {
    const userWithoutImage = {
      ...mockUser,
      imageUrl: "",
    };

    const props: UserDropdownProps = {
      user: userWithoutImage,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const button = screen.getByText("تست");
    expect(button).toBeDefined();
  });

  it("باید نام کاربر را درست نمایش دهد", () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    expect(screen.getByText("تست")).toBeDefined();
  });

  it("باید username را نمایش دهد وقتی first_name وجود ندارد", () => {
    const userWithoutFirstName = {
      ...mockUser,
      first_name: "",
    };

    const props: UserDropdownProps = {
      user: userWithoutFirstName,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    expect(screen.getByText("testuser")).toBeDefined();
  });

  it("باید dropdown menu را باز کند", async () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const triggerButton = screen.getByText("تست");
    const user = userEvent.setup();

    await user.click(triggerButton);

    expect(screen.getByText("تست کاربر")).toBeDefined();
    expect(screen.getByText("09123456789")).toBeDefined();
  });

  it("باید لینک‌های منو را نمایش دهد", async () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const triggerButton = screen.getByText("تست");
    const user = userEvent.setup();

    await user.click(triggerButton);

    expect(screen.getByText("پنل کاربری")).toBeDefined();
    expect(screen.getByText("لیست سفارشات")).toBeDefined();
    expect(screen.getByText("خروج از حساب کاربری")).toBeDefined();
  });

  it("باید لینک پنل کاربری را درست تنظیم کند", async () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const triggerButton = screen.getByText("تست");
    const user = userEvent.setup();

    await user.click(triggerButton);

    const profileLink = screen.getByText("پنل کاربری");
    expect(profileLink.closest("a")?.getAttribute("href")).toBe(
      "/profile/overview"
    );
  });

  it("باید لینک لیست سفارشات را درست تنظیم کند", async () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const triggerButton = screen.getByText("تست");
    const user = userEvent.setup();

    await user.click(triggerButton);

    const ordersLink = screen.getByText("لیست سفارشات");
    expect(ordersLink.closest("a")?.getAttribute("href")).toBe(
      "/checkout-cart"
    );
  });

  it("باید دکمه خروج را کلیک کند و logout را فراخوانی کند", async () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const triggerButton = screen.getByText("تست");
    const user = userEvent.setup();

    await user.click(triggerButton);

    const logoutButton = screen.getByText("خروج از حساب کاربری");
    await user.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledWith("/");
  });

  it("باید دکمه خروج را نمایش دهد", async () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const triggerButton = screen.getByText("تست");
    const user = userEvent.setup();

    await user.click(triggerButton);

    const logoutButton = screen.getByText("خروج از حساب کاربری");
    expect(logoutButton).toBeDefined();
  });

  it("باید کلاس‌های CSS صحیح را داشته باشد", () => {
    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const button = screen.getByText("تست");
    expect(button).toBeDefined();

    const buttonElement = button.closest("button");
    expect(buttonElement?.className).toContain("rounded-full");
    expect(buttonElement?.className).toContain("gap-2");
    expect(buttonElement?.className).toContain("cursor-pointer");
  });

  it("باید آیکون‌ها را درست نمایش دهد", () => {
    const props: UserDropdownProps = {
      user: null,
      isAuthenticated: false,
      onLoginClick: vi.fn(),
    };

    render(<UserDropdown {...props} />);

    const loginIcon = document.querySelector(".lucide-log-in");
    expect(loginIcon).toBeDefined();
  });
});
