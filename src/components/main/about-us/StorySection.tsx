import { Leaf, Target } from "lucide-react";
import { MotionDiv, MotionH2, MotionP } from "@/utils/MotionWrapper";

export const StorySection: React.FC = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: false, margin: "-100px" }}
      className="relative"
    >
      <div className="absolute -top-7 -left-7 w-28 h-28 bg-amber-400/25 rounded-full blur-xl"></div>
      <div className="absolute -bottom-7 -right-7 w-36 h-36 bg-orange-400/25 rounded-full blur-xl"></div>

      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-9 shadow-2xl border border-amber-100/60 dark:border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/15 rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-orange-500/15 rounded-full translate-x-24 translate-y-24"></div>

        <div className="relative z-10">
          <MotionH2
            className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-7 flex items-center gap-3"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="w-2 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
            داستان ما
          </MotionH2>

          <MotionP
            className="text-amber-800/90 dark:text-amber-200/90 leading-relaxed mb-7 text-lg"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false }}
          >
            کافینو با رویای ایجاد فضایی گرم و دوستانه برای دوستداران قهوه و
            غذاهای خوشمزه شروع شد. ما معتقدیم که هر فنجان قهوه و هر وعده غذایی
            باید تجربه‌ای خاص و به یاد ماندنی باشد.
          </MotionP>

          <MotionP
            className="text-amber-800/90 dark:text-amber-200/90 leading-relaxed mb-8 text-lg"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: false }}
          >
            امروز، کافینو نه تنها یک کافه، بلکه جایی است که مردم برای استراحت،
            کار، ملاقات با دوستان و لذت بردن از طعم‌های بی‌نظیر به آن می‌آیند.
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: false }}
            className="flex flex-wrap items-center gap-5"
          >
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/30 px-4 py-2 rounded-full">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">مواد اولیه ارگانیک</span>
            </div>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/30 px-4 py-2 rounded-full">
              <Target className="h-5 w-5" />
              <span className="font-medium">کیفیت تضمینی</span>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
};
