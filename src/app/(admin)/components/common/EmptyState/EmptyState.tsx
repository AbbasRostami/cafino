import { MotionDiv, MotionH3, MotionP } from "@/utils/MotionWrapper";
import { Frown } from "lucide-react";

const EmptyState = ({
  message = "هیچ داده‌ای برای نمایش وجود ندارد",
  description = "برای افزودن داده جدید، روی دکمه افزودن کلیک کنید",
  icon,
}: {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <tr>
      <td colSpan={1000} className="py-10">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 text-center max-w-lg mx-auto px-4"
        >
          <MotionDiv
            initial={{ y: 20, opacity: 0, scale: 0.9, rotate: -10 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
            className="relative"
          >
            {icon || (
              <Frown className="w-20 h-20 text-amber-600 dark:text-amber-400  " />
            )}
          </MotionDiv>

          <div className="space-y-4 relative z-10">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-800 bg-clip-text text-transparent dark:from-amber-300 dark:to-amber-200"
            >
              {message}
            </MotionH3>
            <MotionP
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-600 dark:text-gray-300 max-w-md text-sm md:text-base font-medium"
            >
              {description}
            </MotionP>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {[...Array(5)].map((_, i) => (
              <MotionDiv
                key={i}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 1.8, 1] }}
                transition={{
                  duration: 1.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="h-1 w-8 bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-600 dark:to-amber-800 rounded-full origin-bottom"
              />
            ))}
          </div>
        </MotionDiv>
      </td>
    </tr>
  );
};

export default EmptyState;
