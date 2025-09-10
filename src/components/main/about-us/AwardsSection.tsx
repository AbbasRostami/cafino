import { Award, Gem, Star } from "lucide-react";
import { MotionDiv, MotionH2, MotionP } from "@/utils/MotionWrapper";

const awards = [
  {
    title: "بهترین کافه سال ۱۴۰۱",
    organization: "انجمن صنفی رستوران‌داران",
    icon: Award,
  },
  {
    title: "جایزه طراحی داخلی",
    organization: "مجله معماری معاصر",
    icon: Gem,
  },
  {
    title: "برترین خدمات مشتری",
    organization: "مرکز رضایت مشتری ایران",
    icon: Star,
  },
];

export const AwardsSection: React.FC = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: false, margin: "-100px" }}
      className="mb-14"
    >
      <div className="text-center mb-8">
        <MotionH2
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-300 dark:to-orange-300 bg-clip-text text-transparent mb-5"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: false }}
        >
          افتخارات و جوایز
        </MotionH2>
        <MotionP
          className="text-amber-700/90 dark:text-amber-300/90 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: false }}
        >
          افتخارات و دستاوردهایی که در این سال‌ها کسب کرده‌ایم
        </MotionP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {awards.map((award, index) => {
          const IconComponent = award.icon;
          return (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: false }}
              className="group text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100/60 dark:border-amber-800/40 hover:border-amber-200 dark:hover:border-amber-700/60 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg relative z-10">
                <IconComponent className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3 relative z-10">
                {award.title}
              </h3>

              <p className="text-amber-700/90 dark:text-amber-300/90 leading-relaxed text-sm relative z-10">
                {award.organization}
              </p>
            </MotionDiv>
          );
        })}
      </div>
    </MotionDiv>
  );
};
