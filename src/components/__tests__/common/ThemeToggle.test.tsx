import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwitcher } from "../../shared/ThemeToggle";

const mockSetTheme = vi.fn();
const mockTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

Object.defineProperty(document, "startViewTransition", {
  value: vi.fn((callback) => callback()),
  writable: true,
});

Object.defineProperty(document, "documentElement", {
  value: {
    style: {
      setProperty: vi.fn(),
    },
  },
  writable: true,
});

describe("ThemeSwitcher - Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("باید دکمه اصلی را رندر کند", () => {
    render(<ThemeSwitcher />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0]).toBeDefined();
  });

  it("باید آیکون صحیح را برای تم light نمایش دهد", () => {
    render(<ThemeSwitcher />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDefined();

    const svg = buttons[0].querySelector("svg");
    expect(svg).toBeDefined();
  });

  it("باید دکمه‌های فرعی را در tooltip نمایش دهد", () => {
    render(<ThemeSwitcher />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(1);
  });

  it("باید setTheme را فراخوانی کند وقتی کلیک می‌شود", async () => {
    render(<ThemeSwitcher />);

    const button = screen.getAllByRole("button")[0];
    const user = userEvent.setup();

    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalled();
  });

  it("باید theme را درست تغییر دهد", async () => {
    render(<ThemeSwitcher />);

    const button = screen.getAllByRole("button")[0];
    const user = userEvent.setup();

    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("باید کلاس‌های CSS صحیح را داشته باشد", () => {
    render(<ThemeSwitcher />);

    const button = screen.getAllByRole("button")[0];
    expect(button.className).toContain("p-2");
    expect(button.className).toContain("rounded-full");
    expect(button.className).toContain("border");
    expect(button.className).toContain("transition-all");
  });

  it("باید tooltip را درست نمایش دهد", () => {
    render(<ThemeSwitcher />);

    const tooltipContainer = document.querySelector(".absolute");
    expect(tooltipContainer).toBeDefined();
  });

  it("باید دکمه‌های فرعی را درست رندر کند", () => {
    render(<ThemeSwitcher />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(4);
  });

  it("باید دکمه‌های فرعی را درست کلیک کند", async () => {
    render(<ThemeSwitcher />);

    const buttons = screen.getAllByRole("button");
    const user = userEvent.setup();

    await user.click(buttons[1]);

    expect(mockSetTheme).toHaveBeenCalled();
  });

  it("باید document.startViewTransition را فراخوانی کند", async () => {
    render(<ThemeSwitcher />);

    const button = screen.getAllByRole("button")[0];
    const user = userEvent.setup();

    await user.click(button);

    expect(document.startViewTransition).toHaveBeenCalled();
  });

  it("باید document.documentElement.style.setProperty را فراخوانی کند", async () => {
    render(<ThemeSwitcher />);

    const button = screen.getAllByRole("button")[0];
    const user = userEvent.setup();

    await user.click(button);

    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
      "--x",
      expect.any(String)
    );
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
      "--y",
      expect.any(String)
    );
  });

  it("باید در صورت عدم وجود startViewTransition، setTheme را مستقیماً فراخوانی کند", async () => {
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
      writable: true,
    });

    render(<ThemeSwitcher />);

    const button = screen.getAllByRole("button")[0];
    const user = userEvent.setup();

    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalled();
  });
});
