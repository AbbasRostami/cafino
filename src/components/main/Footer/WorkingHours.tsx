import { WorkingHoursProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";

const WorkingHours = ({ workingHours }: WorkingHoursProps) => {
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
          ساعت های کاری
        </h3>
      </MotionDiv>

      <div className="text-right space-y-5 text-gray-700 dark:text-gray-300 text-base font-medium leading-loose">
        {workingHours.map((item, index) => (
          <MotionDiv
            key={index}
            className="flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span>{item.day}</span>
            <span className="ml-6">{item.time}</span>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default WorkingHours;
