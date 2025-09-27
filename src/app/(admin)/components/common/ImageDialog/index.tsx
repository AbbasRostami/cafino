"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MotionDiv } from "@/utils/MotionWrapper";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

interface ImageDialogProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export function ImageDialog({ src, alt, children }: ImageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <VisuallyHidden>
        <DialogTitle>--- </DialogTitle>
        <DialogDescription>---</DialogDescription>
      </VisuallyHidden>
      <DialogContent className="max-w-4xl  max-h-[90vh] overflow-y-auto p-0 bg-transparent border-none">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl object-cover border border-gray-200 dark:border-gray-700"
        >
          <Image
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg  shadow-2xl "
            width={1000}
            height={1000}
          />
        </MotionDiv>
      </DialogContent>
    </Dialog>
  );
}
