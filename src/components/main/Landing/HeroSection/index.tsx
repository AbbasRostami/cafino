import { MotionDiv } from "@/utils/MotionWrapper";
import HeroContent from "./HeroContent";
import HeroImageSlider from "./HeroImageSlider";
import HeroBackground from "./HeroBackground";

const HeroSection = () => {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28"
    >
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <HeroContent />
          <HeroImageSlider />
        </div>
      </div>

      <MotionDiv
        className="hidden md:block absolute -bottom-3 sm:bottom-14 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <MotionDiv
            className="w-1 h-3 bg-amber-400 rounded-full mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </MotionDiv>
    </section>
  );
};

export default HeroSection;
