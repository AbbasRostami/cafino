"use client";
import { AnimatePresence, motion } from "framer-motion";

const createMotion =
  (Tag: any) =>
  ({ children, className, ...rest }: any) =>
    (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );

export const MotionDiv = createMotion(motion.div);
export const MotionButton = createMotion(motion.button);
export const MotionSection = createMotion(motion.section);
export const MotionArticle = createMotion(motion.article);
export const MotionSpan = createMotion(motion.span);
export const MotionHeader = createMotion(motion.header);
export const MotionP = createMotion(motion.p);
export const MotionH1 = createMotion(motion.h1);
export const MotionH2 = createMotion(motion.h2);
export const MotionH3 = createMotion(motion.h3);
export const MotionH4 = createMotion(motion.h4);
export const MotionH5 = createMotion(motion.h5);
export const MotionH6 = createMotion(motion.h6);
export const MotionUl = createMotion(motion.ul);
export const MotionLi = createMotion(motion.li);
export const MotionImg = createMotion(motion.img);
export const MotionLink = createMotion(motion.link);
export const MotionForm = createMotion(motion.form);
export const MotionInput = createMotion(motion.input);
export const MotionTextarea = createMotion(motion.textarea);
export const MotionSelect = createMotion(motion.select);
export const MotionOption = createMotion(motion.option);
export const MotionLabel = createMotion(motion.label);
export const MotionTable = createMotion(motion.table);
export const MotionTbody = createMotion(motion.tbody);
export const MotionTd = createMotion(motion.td);
export const MotionTh = createMotion(motion.th);
export const MotionTr = createMotion(motion.tr);
export const MotionTfoot = createMotion(motion.tfoot);
export const MotionThead = createMotion(motion.thead);
export const MotionAside = createMotion(motion.aside);
export const MotionMain = createMotion(motion.main);
export const MotionFooter = createMotion(motion.footer);
export const MotionNav = createMotion(motion.nav);
export const MotionA = createMotion(motion.a);
export const MotionAnimatePresence = createMotion(AnimatePresence);
