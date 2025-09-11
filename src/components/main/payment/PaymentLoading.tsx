"use client";

import { MotionDiv } from "@/utils/MotionWrapper";

export const PaymentLoading = () => {
  return (
    <div className="min-h-screen pt-36 py-8 px-4 flex items-center justify-center">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
      </MotionDiv>
    </div>
  );
};
