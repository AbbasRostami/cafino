import { MessageSquare, Phone, Mailbox, MapPin, Clock } from "lucide-react";
import { MotionDiv } from "@/utils/MotionWrapper";

export const ContactInfoSection = () => {
  const contactInfo = [
    {
      icon: MessageSquare,
      title: "پیام بفرستید",
      description: "از طریق فرم مقابل با ما در ارتباط باشید",
      color: "text-blue-700 dark:text-blue-300",
    },
    {
      icon: Phone,
      title: "تلفن تماس",
      description: "۰۲۱-۱۲۳۴۵۶۷۸",
      color: "text-green-700 dark:text-green-300",
    },
    {
      icon: Mailbox,
      title: "ایمیل",
      description: "info@cafino.com",
      color: "text-purple-700 dark:text-purple-300",
    },
    {
      icon: MapPin,
      title: "آدرس",
      description: "تهران، خیابان ولیعصر، کوچه فلان، پلاک ۱۲۳",
      color: "text-yellow-700 dark:text-yellow-300",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      description: "همه‌روزه از ساعت ۸ صبح تا ۱۱ شب",
      color: "text-red-700 dark:text-red-300",
    },
  ];

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-6 py-6 h-full"
    >
      <div className="flex flex-col h-full justify-center space-y-4">
        <div className="space-y-6">
          {contactInfo.map((info) => (
            <MotionDiv
              key={info.title}
              className="flex items-center gap-2 space-x-3 space-x-reverse"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 dark:bg-blue-800/40 p-3 rounded-full flex-shrink-0">
                <info.icon className={`h-4 w-4 ${info.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {info.description}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>

        <div className="pt-4 border-t border-amber-200 dark:border-amber-700/30">
          <p className="text-center text-amber-700 dark:text-amber-300 italic">
            منتظر شنیدن نظرات و پیشنهادات شما هستیم
          </p>
        </div>
      </div>
    </MotionDiv>
  );
};
