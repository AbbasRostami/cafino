"use client";


import { Star } from "lucide-react";
import { MotionDiv } from "@/utils/MotionWrapper";

const FloatingParticles = () => {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute w-2 h-2 rounded-full bg-amber-400/70"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -30, 0],
            x: Math.sin(i * 45) * 40,
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          style={{
            top: `${20 + ((i * 10) % 70)}%`,
            left: `${10 + ((i * 12) % 80)}%`,
          }}
        />
      ))}

      {[...Array(5)].map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
          }}
          style={{
            top: `${15 + ((i * 15) % 70)}%`,
            right: `${5 + ((i * 10) % 60)}%`,
          }}
        >
          <Star className="w-4 h-4 text-amber-300/80 fill-current" />
        </MotionDiv>
      ))}
    </>
  );
};

const HeroBackground = () => {
  return (
    <div className="absolute inset-0">
      <MotionDiv
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full filter blur-xl opacity-20 mix-blend-multiply dark:bg-amber-400 dark:bg-none dark:opacity-10 dark:mix-blend-normal"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <MotionDiv
        className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-orange-400 to-red-400 rounded-full filter blur-xl opacity-20 mix-blend-multiply dark:bg-orange-400 dark:bg-none dark:opacity-10 dark:mix-blend-normal"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 1,
        }}
      />

      <FloatingParticles />
    </div>
  );
};

export default HeroBackground;

