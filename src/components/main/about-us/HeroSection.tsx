"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MotionButton,
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/utils/MotionWrapper";

export const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <div className="text-center mb-10 relative">
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative inline-block mb-4"
      >
        <MotionH1
          className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 dark:from-amber-300 dark:via-amber-200 dark:to-orange-300 bg-clip-text text-transparent mb-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          کافینو
        </MotionH1>
      </MotionDiv>

      <MotionP
        className="text-xl md:text-2xl text-amber-800/90 dark:text-amber-200/90 max-w-4xl mx-auto leading-relaxed font-light mb-10"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        از سال 1400 میزبان لحظات شیرین و طعم‌های به یاد ماندنی
      </MotionP>

      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex justify-center gap-5"
      >
        <MotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/menu")}
          className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
        >
          <span>مشاهده منو</span>
          <ChevronLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </MotionButton>
      </MotionDiv>
    </div>
  );
};
