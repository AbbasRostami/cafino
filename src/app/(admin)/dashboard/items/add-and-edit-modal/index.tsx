"use client";

import { useMediaQuery } from "@/hooks/ui/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ItemFormModalContent } from "./ItemFormModalContent";
import { ItemDetailsModalProps } from "@/types/admin";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ItemFormModal({
  isOpen,
  onClose,
  item,
}: ItemDetailsModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh]">
          <VisuallyHidden>
            <DrawerTitle>افزدون و ویرایش ایتم</DrawerTitle>
            <DrawerDescription>
              اینجا توضیح کوتاه در مورد دیالوگ یا Dialog
            </DrawerDescription>
          </VisuallyHidden>
          <div className="overflow-y-auto h-full p-4">
            <ItemFormModalContent
              isOpen={isOpen}
              onClose={onClose}
              item={item}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="min-w-3xl max-h-[95vh] scrollbar-hide overflow-y-auto p-6 border-amber-200 dark:border-amber-800"
      >
        <VisuallyHidden>
          <DialogTitle>ویرایش و افزدون ایتم</DialogTitle>
          <DialogDescription>
            اینجا توضیح کوتاه در مورد دیالوگ یا Dialog
          </DialogDescription>
        </VisuallyHidden>
        <ItemFormModalContent isOpen={isOpen} onClose={onClose} item={item} />
      </DialogContent>
    </Dialog>
  );
}
