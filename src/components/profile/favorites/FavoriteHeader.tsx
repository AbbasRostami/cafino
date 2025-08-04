import { Heart } from "lucide-react";
import { MotionDiv } from "@/utils/MotionWrapper";

export const FavoriteHeader = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
        <Heart size={32} className="text-rose-500" />
        لیست علاقه‌مندی‌های شما
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        تمام محصولات و غذاهای مورد علاقه‌تان در یکجا جمع‌آوری شده‌اند. هر زمان
        که خواستید می‌توانید به راحتی آنها را سفارش دهید.
      </p>
    </MotionDiv>
  );
};
