"use client";

import { WorkingHoursProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";

const WorkingHours = ({ workingHours }: WorkingHoursProps) => {
  const isMobile = useIsMobile();
  const Wrapper = isMobile ? "div" : MotionDiv;

  return (
    <div className="space-y-3 items-start h-full">
      <Wrapper
        className="relative pb-3 border-b border-amber-200 dark:border-amber-800/50"
        {...(!isMobile && {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
        })}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white relative inline-block">
          ساعت های کاری
        </h3>
      </Wrapper>

      <div className="text-right space-y-5 text-gray-700 dark:text-gray-300 text-base font-medium leading-loose">
        {workingHours.map((item, index) => (
          <Wrapper
            key={index}
            className="flex justify-between"
            {...(!isMobile && {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: index * 0.1 },
            })}
          >
            <span>{item.day}</span>
            <span className="ml-6">{item.time}</span>
          </Wrapper>
        ))}
      </div>
    </div>
  );
};

export default WorkingHours;
