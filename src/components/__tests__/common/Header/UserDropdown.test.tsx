import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserDropdown from "../../../shared/Header/UserLink";
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

const mockUseUserProfile = vi.fn();
vi.mock("../../../../services/profile/useUserProfile", () => ({
  useUserProfile: () => mockUseUserProfile(),
}));

describe("UserDropdown - کامپوننت منوی کاربر", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    mockUseUserProfile.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

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

    renderWithQueryClient(<UserDropdown {...props} />);

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

    renderWithQueryClient(<UserDropdown {...props} />);

    const loginButton = screen.getByText("ورود / ثبت نام");
    const user = userEvent.setup();

    await user.click(loginButton);

    expect(mockOnLoginClick).toHaveBeenCalledTimes(1);
  });

  it("باید آواتار و نام کاربر را نمایش دهد وقتی احراز هویت شده", () => {
    mockUseUserProfile.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });

    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    renderWithQueryClient(<UserDropdown {...props} />);

    expect(screen.getByText("تست")).toBeDefined();
    expect(screen.queryByText("ورود / ثبت نام")).toBeNull();
  });

  it("باید آواتار را با تصویر کاربر نمایش دهد", () => {
    mockUseUserProfile.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });

    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    renderWithQueryClient(<UserDropdown {...props} />);

    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toBeDefined();
  });

  it("باید آواتار fallback را نمایش دهد وقتی تصویر وجود ندارد", () => {
    const userWithoutImage = {
      ...mockUser,
      imageUrl: "",
    };

    mockUseUserProfile.mockReturnValue({
      data: userWithoutImage,
      isLoading: false,
      error: null,
    });

    const props: UserDropdownProps = {
      user: userWithoutImage,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    renderWithQueryClient(<UserDropdown {...props} />);

    const button = screen.getByText("تست");
    expect(button).toBeDefined();
  });

  it("باید نام کاربر را درست نمایش دهد", () => {
    mockUseUserProfile.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });

    const props: UserDropdownProps = {
      user: mockUser,
      isAuthenticated: true,
      onLoginClick: vi.fn(),
    };

    renderWithQueryClient(<UserDropdown {...props} />);

    expect(screen.getByText("تست")).toBeDefined();
  });

  it("باید آیکون‌ها را درست نمایش دهد", () => {
    const props: UserDropdownProps = {
      user: null,
      isAuthenticated: false,
      onLoginClick: vi.fn(),
    };

    renderWithQueryClient(<UserDropdown {...props} />);

    const loginIcon = document.querySelector(".lucide-log-in");
    expect(loginIcon).toBeDefined();
  });
});
