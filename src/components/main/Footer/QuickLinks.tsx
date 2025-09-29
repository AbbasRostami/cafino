import Link from "next/link";
import { MotionDiv } from "@/utils/MotionWrapper";
import { QuickLinksProps } from "@/types/main";

const QuickLinks = ({ quickLinks }: QuickLinksProps) => {
  return (
    <div className="space-y-3 items-start h-full">
      <MotionDiv
        className="relative pb-3 border-b border-amber-200 dark:border-amber-800/50"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white relative inline-block">
          دسترسی سریع
        </h3>
      </MotionDiv>

      <div className="space-y-2">
        {quickLinks.map((link, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              data-testid="footer-link"
              href={link.href}
              className="group flex items-center space-x-3 space-x-reverse text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-300 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/10"
            >
              <span className="text-lg transition-all duration-300 transform group-hover:scale-125 group-hover:text-amber-500">
                {link.icon}
              </span>
              <span className="relative text-base font-medium pb-1">
                {link.text}
                <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 group-hover:w-full transition-all duration-500"></div>
              </span>
            </Link>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
