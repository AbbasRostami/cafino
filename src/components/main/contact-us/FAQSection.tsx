import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionDiv } from "@/utils/MotionWrapper";

const faqs = [
  {
    question: "چطور می‌توانم سفارش آنلاین ثبت کنم؟",
    answer:
      "از طریق منوی سایت، آیتم‌های مورد نظر رو انتخاب و به سبد خرید اضافه کنید، سپس وارد صفحه پرداخت شوید.",
  },
  {
    question: "آیا امکان رزرو میز وجود دارد؟",
    answer:
      "بله، شما می‌توانید هنگام ثبت سفارش یا از طریق تماس تلفنی میز رزرو کنید.",
  },
  {
    question: "روش‌های پرداخت چه هستند؟",
    answer:
      "پرداخت آنلاین از طریق درگاه بانکی و پرداخت حضوری هنگام تحویل در کافه.",
  },
  {
    question: "هزینه ارسال سفارش چقدر است؟",
    answer:
      "بسته به آدرس شما متغیر است و هنگام نهایی‌سازی سفارش نمایش داده می‌شود.",
  },
  {
    question: "ساعات کاری کافینو چگونه است؟",
    answer: "همه‌روزه از ساعت ۸ صبح تا ۱۱ شب.",
  },
  {
    question: "آیا امکان لغو سفارش وجود دارد؟",
    answer: "بله، تا قبل از آماده‌سازی سفارش می‌توانید آن را لغو کنید.",
  },
  {
    question: "در صورت تاخیر در سفارش چه باید کرد؟",
    answer:
      "با پشتیبانی تماس بگیرید یا از بخش «پیگیری سفارش» در پروفایل استفاده کنید.",
  },
  {
    question: "آیا غذاها و نوشیدنی‌ها مناسب گیاه‌خواران هم دارند؟",
    answer: "بله، در منو بخش مخصوص گیاه‌خواری وجود دارد.",
  },
  {
    question: "چطور می‌توانم از تخفیف‌ها مطلع شوم؟",
    answer:
      "از طریق بخش «تخفیف‌های ویژه» در سایت یا دنبال کردن صفحه اینستاگرام کافینو.",
  },
  {
    question: "آیا امکان ویرایش سفارش بعد از ثبت وجود دارد؟",
    answer: "فقط تا قبل از تأیید آشپزخانه می‌توانید سفارش را ویرایش کنید.",
  },
  {
    question: "چطور می‌توانم نظر یا امتیاز بدهم؟",
    answer:
      "بعد از تحویل سفارش، می‌توانید در پروفایل خود بخش «سفارش‌ها» نظر ثبت کنید.",
  },
  {
    question: "آیا امکان ارسال به سراسر تهران وجود دارد؟",
    answer: "بله، فعلاً ارسال به تمام نقاط تهران فعال است.",
  },
  {
    question: "در صورت مشکل در پرداخت چه باید کرد؟",
    answer:
      "اگر مبلغ از حساب کسر شد ولی سفارش ثبت نشد، حداکثر تا ۷۲ ساعت به حسابتان بازمی‌گردد.",
  },
  {
    question: "آیا می‌توانم چند آدرس مختلف ذخیره کنم؟",
    answer: "بله، در بخش پروفایل → آدرس‌ها می‌توانید چندین آدرس اضافه کنید.",
  },
  {
    question: "چطور می‌توانم با پشتیبانی تماس بگیرم؟",
    answer: "از طریق فرم تماس با ما در سایت، تماس تلفنی یا شبکه‌های اجتماعی.",
  },
  {
    question: "آیا امکان خرید حضوری وجود دارد؟",
    answer: "بله، می‌توانید به شعبه کافینو مراجعه کنید و حضوری سفارش دهید.",
  },
  {
    question: "آیا قیمت منو در سایت با حضوری فرق دارد؟",
    answer: "خیر، قیمت‌ها یکسان هستند.",
  },
  {
    question: "آیا غذاها تازه تهیه می‌شوند؟",
    answer: "بله، همه سفارش‌ها بعد از ثبت به‌صورت تازه آماده می‌شوند.",
  },
  {
    question: "آیا کافینو سفارش بیرون‌بر هم دارد؟",
    answer: "بله، می‌توانید هنگام ثبت سفارش گزینه «بیرون‌بر» را انتخاب کنید.",
  },
  {
    question: "آیا امکان استفاده از کارت هدیه یا کد تخفیف وجود دارد؟",
    answer: "بله، کافی است در مرحله پرداخت کد تخفیف یا کارت هدیه را وارد کنید.",
  },
];

export const FAQSection = () => {
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-10"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          <span>❓</span>
          <span>سوالات متداول</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          پاسخ‌های سوالات پرتکرار کاربران
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Accordion type="multiple" className="space-y-3">
            {leftFaqs.map((faq, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-amber-200 dark:hover:border-amber-700"
              >
                <AccordionItem value={`faq-left-${index}`} className="px-6">
                  <AccordionTrigger className="text-right font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </MotionDiv>
            ))}
          </Accordion>
        </div>

        <div className="space-y-4">
          <Accordion type="multiple" className="space-y-3">
            {rightFaqs.map((faq, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-amber-200 dark:hover:border-amber-700"
              >
                <AccordionItem value={`faq-right-${index}`} className="px-6">
                  <AccordionTrigger className="text-right font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </MotionDiv>
            ))}
          </Accordion>
        </div>
      </div>
    </MotionDiv>
  );
};
