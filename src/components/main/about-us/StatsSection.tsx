import { Award, Coffee, Heart, Clock } from "lucide-react";
import { MotionDiv } from "@/utils/MotionWrapper";

export const StatsSection: React.FC = () => {
  const stats = [
    { number: "4+", label: "سال تجربه", icon: Award },
    { number: "۵۰+", label: "نوع نوشیدنی", icon: Coffee },
    { number: "۱۰۰۰+", label: "مشتری راضی", icon: Heart },
    { number: "۲۴/۷", label: "پشتیبانی", icon: Clock },
  ];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.9 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14"
    >
      {stats.map((stat, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.2, duration: 0.7 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="group text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-7 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-amber-100/60 dark:border-amber-800/40 hover:border-amber-200 dark:hover:border-amber-700/60 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg relative z-10">
            <stat.icon className="h-8 w-8 text-white" />
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-3 relative z-10">
            {stat.number}
          </div>
          <div className="text-amber-700/90 dark:text-amber-300/90 font-medium text-sm relative z-10">
            {stat.label}
          </div>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
};
