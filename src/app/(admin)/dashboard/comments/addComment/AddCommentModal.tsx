"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CommentForm } from "./CommentForm";
import { MotionDiv } from "@/utils/MotionWrapper";
import { AddCommentModalProps } from "@/types";
import { MessageSquareReply } from "lucide-react";

export function AddCommentModal({
  itemId,
  parentId,
  trigger,
}: AddCommentModalProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="max-w-2xl max-h-[90vh] scrollbar-hide !p-0 overflow-y-auto"
          >
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-4 shadow-lg"
            >
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100 text-start flex items-center gap-2 pb-4">
                  <MessageSquareReply className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  ارسال پاسخ
                </DialogTitle>
              </DialogHeader>
              <CommentForm
                itemId={itemId}
                parentId={parentId}
                closeModal={() => setOpen(false)}
              />
            </MotionDiv>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent className="max-h-[90vh]">
            <MotionDiv
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-t-lg space-y-4 shadow-lg"
            >
              <DrawerHeader>
                <DrawerTitle className="text-gray-900 dark:text-gray-100 text-center">
                  ارسال پاسخ
                </DrawerTitle>
              </DrawerHeader>
              <CommentForm
                itemId={itemId}
                parentId={parentId}
                closeModal={() => setOpen(false)}
              />
            </MotionDiv>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
