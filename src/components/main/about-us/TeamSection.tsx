import Image from "next/image";
import { Instagram, Twitter } from "lucide-react";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionButton,
} from "@/utils/MotionWrapper";

import image2 from "../../../assets/about/Avatar1.png";
import image1 from "../../../assets/about/Avatar2.png";
import image3 from "../../../assets/about/Avatar3.png";

const teamMembers = [
  {
    name: "احمد محمدی",
    role: "مدیر عامل",
    image: image1,
  },
  {
    name: "فاطمه احمدی",
    role: "سرآشپز",
    image: image2,
  },
  {
    name: "علی رضایی",
    role: "مدیر فروش",
    image: image3,
  },
];

export const TeamSection: React.FC = () => {
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
          تیم ما
        </MotionH2>
        <MotionP
          className="text-amber-700/90 dark:text-amber-300/90 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: false }}
        >
          افرادی که کافینو را به مکانی خاص و منحصر به فرد تبدیل کرده‌اند
        </MotionP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: false }}
            className="group text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100/60 dark:border-amber-800/40 hover:border-amber-200 dark:hover:border-amber-700/60 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative w-36 h-36 mx-auto mb-7 rounded-full overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2 relative z-10">
              {member.name}
            </h3>

            <p className="text-amber-600 dark:text-amber-400 font-semibold mb-4 relative z-10">
              {member.role}
            </p>
            <div className="mt-5 flex justify-center gap-3 relative z-10">
              {[Instagram, Twitter].map((SocialIcon, i) => (
                <MotionButton
                  key={i}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-amber-100/60 dark:bg-amber-900/40 rounded-full flex items-center justify-center hover:bg-amber-200 dark:hover:bg-amber-800/60 transition-colors duration-300 shadow-sm"
                >
                  <SocialIcon className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                </MotionButton>
              ))}
            </div>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
};
