import { MotionDiv } from "@/utils/MotionWrapper";

export const FavoriteFooter = () => {
  return (
    <MotionDiv
      className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center pb-10 sm:pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-sm max-w-2xl mx-auto">
        شما می‌توانید حداکثر ۵۰ مورد را در لیست علاقه‌مندی‌های خود ذخیره کنید. و
        هر زمان که به راحتی سفارش دهید.
      </p>
    </MotionDiv>
  );
};
