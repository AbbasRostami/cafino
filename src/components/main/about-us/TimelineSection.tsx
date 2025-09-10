import { Crown, Gem, MapPin, Award, Coffee } from "lucide-react";
import { MotionDiv, MotionH2, MotionP } from "@/utils/MotionWrapper";

const timelineData = [
  {
    year: "1400",
    title: "تأسیس کافینو",
    description: "شروع فعالیت با یک شعبه کوچک در تهران",
    icon: Crown,
  },
  {
    year: "1401",
    title: "توسعه منو",
    description: "اضافه شدن غذاهای بین‌المللی و دسرهای ویژه",
    icon: Gem,
  },
  {
    year: "1403",
    title: "افتتاح شعبه دوم",
    description: "گسترش فعالیت با افتتاح شعبه در شمال تهران",
    icon: MapPin,
  },
  {
    year: "1404",
    title: "برند برتر",
    description: "کسب عنوان برترین کافه رستوران پایتخت",
    icon: Award,
  },
  {
    year: "1404",
    title: "ارسال آنلاین",
    description: "راه‌اندازی سرویس تحویل در محل در سراسر تهران",
    icon: Coffee,
  },
];

export const TimelineSection: React.FC = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: false, margin: "-100px" }}
      className="mb-11"
    >
      <div className="text-center mb-8">
        <MotionH2
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-300 dark:to-orange-300 bg-clip-text text-transparent mb-5"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: false }}
        >
          تاریخچه کافینو
        </MotionH2>
        <MotionP
          className="text-amber-700/90 dark:text-amber-300/90 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: false }}
        >
          مسیر رشد و موفقیت ما از ابتدا تاکنون
        </MotionP>
      </div>

      <div className="relative">
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-amber-500 to-orange-500 shadow-lg"></div>

        <div className="space-y-6 relative">
          {timelineData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: false }}
                className={`flex flex-col sm:flex-row items-center ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-full sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-10" : "sm:pl-10"
                  }`}
                >
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-7 shadow-xl border border-amber-100/60 dark:border-amber-800/40 relative overflow-hidden group">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100/60 dark:bg-amber-900/40 p-3 rounded-2xl flex-shrink-0">
                        <IconComponent className="h-7 w-7 text-amber-700 dark:text-amber-300" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-amber-700 dark:text-amber-300 mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-amber-700/90 dark:text-amber-300/90">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full border-4 border-white dark:border-gray-950 shadow-lg z-10 items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                <div className="hidden sm:block w-1/2"></div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </MotionDiv>
  );
};
