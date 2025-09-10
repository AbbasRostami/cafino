import { Heart, Users, Award, Coffee } from "lucide-react";
import { MotionDiv, MotionH2, MotionP } from "@/utils/MotionWrapper";

const values = [
  {
    icon: Heart,
    title: "عشق به کیفیت",
    description:
      "ما عاشق ارائه بهترین کیفیت در هر فنجان قهوه و هر وعده غذایی هستیم.",
    color: "from-rose-500 to-pink-500",
    gradient: "bg-gradient-to-br from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Users,
    title: "مشتری مداری",
    description:
      "رضایت مشتریان ما اولویت اول ماست و همیشه در تلاش برای بهبود خدمات هستیم.",
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Award,
    title: "تخصص و تجربه",
    description:
      "سال‌ها تجربه در صنعت کافه‌داری و تیم متخصص ما تضمین کیفیت است.",
    color: "from-amber-500 to-orange-500",
    gradient: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Coffee,
    title: "قهوه‌های ویژه",
    description:
      "انتخاب بهترین دانه‌های قهوه از سراسر جهان برای تجربه‌ای منحصر به فرد.",
    color: "from-emerald-500 to-teal-500",
    gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
  },
];

export const ValuesSection: React.FC = () => {
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
          ارزش‌های ما
        </MotionH2>
        <MotionP
          className="text-amber-700/90 dark:text-amber-300/90 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: false }}
        >
          اصولی که در هر کاری دنبال می‌کنیم و ما را از دیگران متمایز می‌کند
        </MotionP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: false }}
            className="group text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100/60 dark:border-amber-800/40 hover:border-amber-200 dark:hover:border-amber-700/60 relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
            ></div>

            <div
              className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg relative z-10`}
            >
              <value.icon className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 relative z-10">
              {value.title}
            </h3>

            <p className="text-amber-700/90 dark:text-amber-300/90 leading-relaxed text-sm relative z-10">
              {value.description}
            </p>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
};
