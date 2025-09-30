"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/ui/useMediaQuery";
import { CommentForm } from "./CommentForm";
import { AddCommentModalProps } from "@/types";
import { MessageSquareReply } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
            className="max-w-2xl max-h-[90vh] p-4 rounded-lg space-y-4 shadow-lg  overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100 text-start flex items-center gap-2 pb-4">
                <MessageSquareReply className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                ارسال پاسخ
              </DialogTitle>
              <VisuallyHidden>
                <DialogDescription>ارسال پاسخ</DialogDescription>
              </VisuallyHidden>
            </DialogHeader>
            <CommentForm
              itemId={itemId}
              parentId={parentId}
              closeModal={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent className="max-h-[90vh] border-none p-4 rounded-t-lg space-y-4 shadow-lg">
            <DrawerHeader>
              <DrawerTitle className="text-gray-900 dark:text-gray-100 text-center">
                ارسال پاسخ
              </DrawerTitle>
              <VisuallyHidden>
                <DrawerDescription>ارسال پاسخ</DrawerDescription>
              </VisuallyHidden>
            </DrawerHeader>
            <CommentForm
              itemId={itemId}
              parentId={parentId}
              closeModal={() => setOpen(false)}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
