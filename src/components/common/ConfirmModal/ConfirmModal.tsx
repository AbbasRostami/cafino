"use client";

import { useConfirmStore } from "../../../store/useConfirmStore";
import { TriangleAlert } from "lucide-react";

export const ConfirmModal = () => {
  const { isOpen, options, resolve, closeConfirm } = useConfirmStore();

  if (!isOpen) return null;

  const handleCancel = () => {
    closeConfirm();
    resolve(false);
  };

  const handleConfirm = () => {
    closeConfirm();
    resolve(true);
  };
  const handleBackdropClick = () => {
    handleCancel();
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center gap-8 z-[99999]"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-gray-900  dark:border-gray-700 dark:border-2 rounded-2xl p-6 w-[90%] max-w-lg text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <TriangleAlert className="mx-auto mb-4 w-[100px] h-[100px] text-amber-500" />
        <h2 className="text-2xl font-black mb-3 text-gray-800 dark:text-white">
          {options.title || "آیا مطمئن هستید؟"}
        </h2>
        <p className="text-meduim mb-6 text-gray-600 dark:text-gray-300">
          {options.description || "امکان بازگشت وجود ندارد!"}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 shadow-2xl  text-black dark:text-white px-10 py-2 rounded-xl"
          >
            {options.cancelText || "انصراف"}
          </button>
          <button
            onClick={handleConfirm}
            className="bg-gradient-to-br from-[#e82700] to-[#ff8b48] hover:scale-110 transition-all duration-300 hover:bg-amber-500 text-white dark:text-black px-10 shadow-2xl py-2 rounded-xl"
          >
            {options.confirmText || "تایید"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const confirm = async (options: {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}): Promise<boolean> => {
  const { openConfirm } = useConfirmStore.getState();
  return await openConfirm(options);
};
