import { Quote, Star } from "lucide-react";
import { MotionDiv, MotionH2, MotionP } from "@/utils/MotionWrapper";

const testimonials = [
  {
    name: "سارا حسینی",
    role: "مشتری وفادار",
    content:
      "بهترین قهوه شهر رو اینجا خوردم. فضای خیلی دنج و آرومش عالیه برای کار و استراحت.",
    rating: 5,
    avatar: "/api/placeholder/80/80",
  },
  {
    name: "محمد رضایی",
    role: "منتقد غذایی",
    content:
      "کافینو ترکیب بی‌نظیری از طعم‌های اصیل و محیط مدرن ارائه می‌ده. واقعاً تجربه متفاوتیه.",
    rating: 5,
    avatar: "/api/placeholder/80/80",
  },
  {
    name: "نازنین کریمی",
    role: "بلاگر غذایی",
    content:
      "دسرهای کافینو شاهکاره! هر بار یه طعم جدید و منحصر به فرد رو تجربه می‌کنم.",
    rating: 5,
    avatar: "/api/placeholder/80/80",
  },
];

export const TestimonialsSection: React.FC = () => {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < count ? "fill-amber-400 text-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

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
          نظرات مشتریان
        </MotionH2>
        <MotionP
          className="text-amber-700/90 dark:text-amber-300/90 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: false }}
        >
          آنچه مشتریان ما درباره کافینو می‌گویند
        </MotionP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: false }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-7 shadow-xl border border-amber-100/60 dark:border-amber-800/40 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/15 rounded-full -translate-x-7 -translate-y-7"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-500/15 rounded-full translate-x-7 translate-y-7"></div>

            <div className="relative z-10">
              <Quote className="h-9 w-9 text-amber-500/30 mb-5" />

              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

              <p className="text-amber-800/90 dark:text-amber-200/90 leading-relaxed mb-7 italic text-base">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                  <span className=" text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                    {testimonial.name}
                  </h4>
                  <p className="text-amber-600 dark:text-amber-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
};
