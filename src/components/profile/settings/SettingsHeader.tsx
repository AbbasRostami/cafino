import { MotionDiv } from "@/utils/MotionWrapper";
import { User } from "lucide-react";

export const SettingsHeader = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
        <User size={32} className="text-amber-600" />
        تنظیمات پروفایل کاربری
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        اطلاعات شخصی خود را مدیریت و به‌روزرسانی کنید
      </p>
    </MotionDiv>
  );
};
