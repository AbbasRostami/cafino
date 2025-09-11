"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { MotionDiv } from "@/utils/MotionWrapper";

interface VideoButtonProps {
  onClick: () => void;
}

const VideoButton = ({ onClick }: VideoButtonProps) => {
  return (
    <MotionDiv
      className="relative"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MotionDiv className="absolute inset-0" />
      <Button
        variant="outline"
        size="lg"
        onClick={onClick}
        className="relative cursor-pointer border-2 border-amber-500/30 text-amber-700 
        hover:bg-amber-50 px-6 py-3 text-base font-semibold 
        rounded-xl shadow-lg hover:shadow-xl 
        transition-all duration-300 dark:border-amber-500/50 
        dark:text-amber-300 dark:hover:bg-amber-950/30 w-full sm:w-auto"
      >
        <Play className="w-5 h-5 ml-2 fill-amber-500/20" />
        تماشای ویدیو
      </Button>
    </MotionDiv>
  );
};

export default VideoButton;
