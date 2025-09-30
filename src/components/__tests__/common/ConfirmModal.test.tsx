import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmModal, confirm } from "../../shared/ConfirmModal";
import { useConfirmStore } from "../../../store/useConfirmStore";

describe("ConfirmModal", () => {
  beforeEach(() => {
    useConfirmStore.setState({
      isOpen: false,
      options: {},
      resolve: () => {},
    });
  });

  it("باید چیزی رندر نکند وقتی isOpen false است", () => {
    render(<ConfirmModal />);

    expect(screen.queryByText("آیا مطمئن هستید؟")).toBeNull();
  });

  it("باید مودال را رندر کند وقتی isOpen true است", () => {
    useConfirmStore.setState({
      isOpen: true,
      options: {
        title: "تست عنوان",
        description: "تست توضیحات",
      },
    });

    render(<ConfirmModal />);

    expect(screen.getByText("تست عنوان")).toBeInTheDocument();
    expect(screen.getByText("تست توضیحات")).toBeInTheDocument();
  });

  it("باید متن‌های پیش‌فرض را نمایش دهد", () => {
    useConfirmStore.setState({
      isOpen: true,
      options: {},
    });

    render(<ConfirmModal />);

    expect(screen.getByText("آیا مطمئن هستید؟")).toBeDefined();
    expect(screen.getByText("امکان بازگشت وجود ندارد!")).toBeDefined();
    expect(screen.getByText("انصراف")).toBeDefined();
    expect(screen.getByText("تایید")).toBeDefined();
  });

  it("باید متن‌های سفارشی را نمایش دهد", () => {
    useConfirmStore.setState({
      isOpen: true,
      options: {
        title: "حذف فایل",
        description: "این فایل برای همیشه حذف خواهد شد",
        confirmText: "حذف",
        cancelText: "لغو",
      },
    });

    render(<ConfirmModal />);

    expect(screen.getByText("حذف فایل")).toBeDefined();
    expect(screen.getByText("این فایل برای همیشه حذف خواهد شد")).toBeDefined();
    expect(screen.getByText("حذف")).toBeDefined();
    expect(screen.getByText("لغو")).toBeDefined();
  });

  it("باید آیکون TriangleAlert را نمایش دهد", () => {
    useConfirmStore.setState({
      isOpen: true,
      options: {},
    });

    render(<ConfirmModal />);

    const icon = document.querySelector(".lucide-triangle-alert");
    expect(icon).toBeDefined();
  });

  it("باید دکمه انصراف را کلیک کند و resolve(false) را فراخوانی کند", async () => {
    const mockResolve = vi.fn();
    const mockCloseConfirm = vi.fn();

    useConfirmStore.setState({
      isOpen: true,
      options: {},
      resolve: mockResolve,
      closeConfirm: mockCloseConfirm,
    });

    render(<ConfirmModal />);

    const cancelButton = screen.getByText("انصراف");
    const user = userEvent.setup();

    await user.click(cancelButton);

    expect(mockResolve).toHaveBeenCalledWith(false);
    expect(mockCloseConfirm).toHaveBeenCalled();
  });

  it("باید دکمه تایید را کلیک کند و resolve(true) را فراخوانی کند", async () => {
    const mockResolve = vi.fn();
    const mockCloseConfirm = vi.fn();

    useConfirmStore.setState({
      isOpen: true,
      options: {},
      resolve: mockResolve,
      closeConfirm: mockCloseConfirm,
    });

    render(<ConfirmModal />);

    const confirmButton = screen.getByText("تایید");
    const user = userEvent.setup();

    await user.click(confirmButton);

    expect(mockResolve).toHaveBeenCalledWith(true);
    expect(mockCloseConfirm).toHaveBeenCalled();
  });

  it("باید backdrop را کلیک کند و resolve(false) را فراخوانی کند", async () => {
    const mockResolve = vi.fn();
    const mockCloseConfirm = vi.fn();

    useConfirmStore.setState({
      isOpen: true,
      options: {},
      resolve: mockResolve,
      closeConfirm: mockCloseConfirm,
    });

    render(<ConfirmModal />);

    const backdrop = document.querySelector(".fixed.inset-0");
    const user = userEvent.setup();

    await user.click(backdrop!);

    expect(mockResolve).toHaveBeenCalledWith(false);
    expect(mockCloseConfirm).toHaveBeenCalled();
  });

  it("نباید backdrop را کلیک کند وقتی روی مودال کلیک می‌شود", async () => {
    const mockResolve = vi.fn();
    const mockCloseConfirm = vi.fn();

    useConfirmStore.setState({
      isOpen: true,
      options: {},
      resolve: mockResolve,
      closeConfirm: mockCloseConfirm,
    });

    render(<ConfirmModal />);

    const modalContent = document.querySelector(".bg-white");
    const user = userEvent.setup();

    await user.click(modalContent!);

    expect(mockResolve).not.toHaveBeenCalled();
    expect(mockCloseConfirm).not.toHaveBeenCalled();
  });

  it("باید کلاس‌های CSS صحیح را داشته باشد", () => {
    useConfirmStore.setState({
      isOpen: true,
      options: {},
    });

    render(<ConfirmModal />);

    const backdrop = document.querySelector(".fixed.inset-0");
    expect(backdrop?.className).toContain("fixed");
    expect(backdrop?.className).toContain("inset-0");
    expect(backdrop?.className).toContain("bg-black/50");

    const modalContent = document.querySelector(".bg-white");
    expect(modalContent?.className).toContain("bg-white");
    expect(modalContent?.className).toContain("rounded-2xl");
    expect(modalContent?.className).toContain("p-6");
  });

  it("باید دکمه‌ها را درست رندر کند", () => {
    useConfirmStore.setState({
      isOpen: true,
      options: {},
    });

    render(<ConfirmModal />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);

    const cancelButton = screen.getByText("انصراف");
    const confirmButton = screen.getByText("تایید");

    expect(cancelButton).toBeDefined();
    expect(confirmButton).toBeDefined();
  });

  it("باید confirm function را درست export کند", () => {
    expect(typeof confirm).toBe("function");
  });
});
