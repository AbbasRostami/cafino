import { MotionDiv, MotionH1, MotionP } from "@/utils/MotionWrapper";

export const HeaderSection = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-6"
    >
      <MotionH1
        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        تماس با ما
      </MotionH1>
      <MotionP
        className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        سوالات، پیشنهادات و انتقادات خود را با ما در میان بگذارید. تیم پشتیبانی
        ما آماده پاسخگویی به شما است.
      </MotionP>
    </MotionDiv>
  );
};
