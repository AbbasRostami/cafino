import { describe, it, expect, beforeEach, vi } from "vitest";
import { useConfirmStore } from "../useConfirmStore";

describe("useConfirmStore - Store", () => {
  beforeEach(() => {
    useConfirmStore.setState({
      isOpen: false,
      options: {},
      resolve: () => {},
    });
  });

  it("باید در حالت اولیه بسته باشد", () => {
    const state = useConfirmStore.getState();

    expect(state.isOpen).toBe(false);
    expect(state.options).toEqual({});
  });

  it("باید مودال را باز کند و options را تنظیم کند", () => {
    const options = {
      title: "تایید حذف",
      description: "آیا مطمئن هستید؟",
      confirmText: "بله",
      cancelText: "خیر",
    };

    const promise = useConfirmStore.getState().openConfirm(options);

    const state = useConfirmStore.getState();
    expect(state.isOpen).toBe(true);
    expect(state.options).toEqual(options);
    expect(state.resolve).toBeDefined();

    expect(promise).toBeInstanceOf(Promise);
  });

  it("باید مودال را ببندد", () => {
    const options = { title: "تست" };
    useConfirmStore.getState().openConfirm(options);

    expect(useConfirmStore.getState().isOpen).toBe(true);

    useConfirmStore.getState().closeConfirm();

    const state = useConfirmStore.getState();
    expect(state.isOpen).toBe(false);
  });

  it("باید Promise را با true resolve کند", async () => {
    const options = { title: "تست Promise" };
    const promise = useConfirmStore.getState().openConfirm(options);

    const state = useConfirmStore.getState();
    state.resolve(true);

    const result = await promise;
    expect(result).toBe(true);
  });

  it("باید Promise را با false resolve کند", async () => {
    const options = { title: "تست Promise" };
    const promise = useConfirmStore.getState().openConfirm(options);

    const state = useConfirmStore.getState();
    state.resolve(false);

    const result = await promise;
    expect(result).toBe(false);
  });

  it("باید options پیش‌فرض را بپذیرد", () => {
    const options = {
      title: "فقط عنوان",
    };

    useConfirmStore.getState().openConfirm(options);

    const state = useConfirmStore.getState();
    expect(state.options.title).toBe("فقط عنوان");
    expect(state.options.description).toBeUndefined();
    expect(state.options.confirmText).toBeUndefined();
    expect(state.options.cancelText).toBeUndefined();
  });

  it("باید options کامل را بپذیرد", () => {
    const options = {
      title: "عنوان کامل",
      description: "توضیحات کامل",
      confirmText: "تایید کامل",
      cancelText: "انصراف کامل",
    };

    useConfirmStore.getState().openConfirm(options);

    const state = useConfirmStore.getState();
    expect(state.isOpen).toBe(true);
    expect(state.options).toEqual(options);
  });

  it("باید resolve function را درست تنظیم کند", () => {
    const options = { title: "تست resolve" };
    useConfirmStore.getState().openConfirm(options);

    const state = useConfirmStore.getState();
    expect(typeof state.resolve).toBe("function");

    const mockResolve = vi.fn();
    state.resolve = mockResolve;

    state.resolve(true);
    expect(mockResolve).toHaveBeenCalledWith(true);
  });

  it("بایداستیت را درست به‌روزرسانی کند", () => {
    let state = useConfirmStore.getState();
    expect(state.isOpen).toBe(false);

    const options = { title: "تست state" };
    useConfirmStore.getState().openConfirm(options);

    state = useConfirmStore.getState();
    expect(state.isOpen).toBe(true);
    expect(state.options).toEqual(options);

    useConfirmStore.getState().closeConfirm();

    state = useConfirmStore.getState();
    expect(state.isOpen).toBe(false);
  });
});
