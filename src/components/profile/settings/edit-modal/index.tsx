"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, UserPen } from "lucide-react";
import { EditModalProps } from "@/types/Profile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ModalContent } from "./ModalContent";

export const EditModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  user,
}: EditModalProps) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[95vh] border-none">
        <DrawerHeader className="p-1">
          <DrawerTitle>ویرایش پروفایل</DrawerTitle>
          <DrawerDescription>
            ویرایش پروفایل خود را انجام دهید
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto p-4">
          <ModalContent onSubmit={onSubmit} isPending={isPending} user={user} />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        dir="rtl"
        className="sm:max-w-xl text-right rtl:text-right rtl:items-end"
      >
        <DialogHeader>
          <DialogClose asChild>
            <button className="absolute left-4 top-4 rounded-sm opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
          <DialogTitle className="text-right flex items-center gap-2 text-xl">
            <UserPen className="text-amber-700" size={28} />
            ویرایش پروفایل
          </DialogTitle>
          <DialogDescription className="text-right flex items-center gap-2 text-xs">
            ویرایش پروفایل خود را انجام دهید
          </DialogDescription>
        </DialogHeader>
        <ModalContent onSubmit={onSubmit} isPending={isPending} user={user} />
      </DialogContent>
    </Dialog>
  );
};
