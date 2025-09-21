import { Heart, X, Plus } from "lucide-react";
import { MotionButton, MotionDiv } from "@/utils/MotionWrapper";
import { useRouter } from "next/navigation";

export const EmptyState = () => {
  const router = useRouter();
  return (
    <MotionDiv
      className="text-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative inline-block">
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart
            className="text-rose-500 dark:text-rose-400"
            size={48}
            fill="currentColor"
          />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center">
          <X className="text-white" size={16} />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        لیست علاقه‌مندی‌های شما خالی است
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        هنوز هیچ محصولی را به لیست علاقه‌مندی‌های خود اضافه نکرده‌اید. از منوی
        محصولات دیدن کنید و موارد دلخواه خود را اضافه کنید.
      </p>
      <MotionButton
        className="mt-6 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full flex items-center gap-2 mx-auto font-medium shadow-lg"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 5px 15px rgba(236, 72, 153, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/menu")}
      >
        مشاهده محصولات
        <Plus size={18} />
      </MotionButton>
    </MotionDiv>
  );
};
