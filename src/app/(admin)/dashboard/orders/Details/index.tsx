"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { Eye } from "lucide-react";
import { OrderContent } from "./OrderContent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { OrderDetailsProps } from "@/types/admin";

export default function OrderDetails({
  order,
  setSelectedOrder,
}: OrderDetailsProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger>
            <Button
              variant="outline"
              size="sm"
              aria-label="جزئیات سفارش"
              className="rounded-full transition-all duration-300 hover:shadow-md hover:scale-105"
              onClick={() => setSelectedOrder(order)}
            >
              <Eye className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="h-[80vh] overflow-y-auto border-none">
            <VisuallyHidden>
              <DialogTitle>جزئیات سفارش</DialogTitle>
            </VisuallyHidden>

            <VisuallyHidden>
              <DialogDescription>
                اطلاعات کامل سفارش انتخاب‌شده
              </DialogDescription>
            </VisuallyHidden>
            <OrderContent order={order} isMobile={isMobile} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button
              variant="outline"
              size="sm"
              aria-label="جزئیات سفارش"
              className="rounded-full transition-all duration-300 hover:shadow-md hover:scale-105"
              onClick={() => setSelectedOrder(order)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="min-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide border-none rounded-2xl"
          >
            <VisuallyHidden>
              <DialogTitle>جزئیات سفارش</DialogTitle>
            </VisuallyHidden>

            <VisuallyHidden>
              <DialogDescription>
                اطلاعات کامل سفارش انتخاب‌شده
              </DialogDescription>
            </VisuallyHidden>
            <OrderContent order={order} isMobile={isMobile} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
