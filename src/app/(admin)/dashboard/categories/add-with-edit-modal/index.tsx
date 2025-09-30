"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { ModalContent } from "./ModalContent";
import { CategoryModalProps } from "@/types/admin";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function CategoryModal({
  initialData = null,
  trigger,
}: CategoryModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const titleLabel = initialData ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی";

  const triggerButton = trigger || (
    <Button
      variant="outline"
      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-lg flex items-center gap-2"
    >
      {titleLabel}
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        <DrawerContent className="max-h-[90vh] border-none">
          <DrawerHeader>
            <VisuallyHidden>
              <DrawerTitle>{titleLabel}</DrawerTitle>
              <DrawerDescription>
                ویرایش و افزدون کامل دسته بندی ها
              </DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="p-6 overflow-y-auto">
            <ModalContent
              initialData={initialData}
              onClose={() => setOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] scrollbar-hide overflow-y-auto bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800">
        <VisuallyHidden>
          <DialogTitle>افزدون و ویرایش دسته بندی </DialogTitle>
          <DialogDescription>
            ویرایش و افزدون کامل دسته بندی ها
          </DialogDescription>
        </VisuallyHidden>
        <ModalContent
          initialData={initialData}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
