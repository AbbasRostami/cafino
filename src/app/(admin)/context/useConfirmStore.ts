import { create } from "zustand";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmStore = {
  isOpen: boolean;
  options: ConfirmOptions;
  resolve: (result: boolean) => void;
  openConfirm: (options: ConfirmOptions) => Promise<boolean>;
  closeConfirm: () => void;
};

export const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  options: {},
  resolve: () => {},
  openConfirm: (options) => {
    return new Promise((resolve) => {
      set({
        isOpen: true,
        options,
        resolve,
      });
    });
  },
  closeConfirm: () => set({ isOpen: false }),
}));
