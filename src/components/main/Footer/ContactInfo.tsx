import { ContactInfoProps } from "@/types";
import { MotionA, MotionDiv } from "@/utils/MotionWrapper";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const iconMap = {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
};

const ContactInfo = ({ contactInfo, socialMedia }: ContactInfoProps) => {
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
          اطلاعات تماس
        </h3>
      </MotionDiv>

      <div className="space-y-2">
        {contactInfo.map((contact, index) => {
          const IconComponent = iconMap[contact.icon as keyof typeof iconMap];
          return (
            <MotionDiv
              key={index}
              className="group flex items-center gap-5 p-2 rounded-xl transition-all duration-300 hover:bg-amber-50 dark:hover:bg-amber-900/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm">
                {IconComponent && (
                  <IconComponent className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                )}
              </div>
              <span className="text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed">
                {contact.text}
              </span>
            </MotionDiv>
          );
        })}

        <MotionDiv
          className="flex items-center gap-5 justify-center w-full pt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {socialMedia.map((social, index) => {
            const IconComponent = iconMap[social.icon as keyof typeof iconMap];
            return (
              <MotionA
                key={index}
                href={social.href}
                className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:${social.hover} hover:scale-110 shadow-lg hover:shadow-xl`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
              </MotionA>
            );
          })}
        </MotionDiv>
      </div>
    </div>
  );
};

export default ContactInfo;
