"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Eye } from "lucide-react";
import { OrderContent } from "./OrderContent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface OrderDetailsProps {
  order: any;
  setSelectedOrder: (order: any) => void;
}

export default function OrderDetails({
  order,
  setSelectedOrder,
}: OrderDetailsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex justify-center items-center gap-2">
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full transition-all duration-300 hover:shadow-md hover:scale-105"
              onClick={() => setSelectedOrder(order)}
            >
              <Eye className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl  p-2">
            <VisuallyHidden asChild>
              <DialogTitle>جزئیات سفارش</DialogTitle>
            </VisuallyHidden>

            <VisuallyHidden asChild>
              <DialogDescription>
                اطلاعات کامل سفارش انتخاب‌شده
              </DialogDescription>
            </VisuallyHidden>
            <OrderContent order={order} isMobile={isMobile} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full transition-all duration-300 hover:shadow-md hover:scale-105"
              onClick={() => setSelectedOrder(order)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="min-w-2xl max-h-[90vh] scrollbar-hide overflow-y-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl rounded-2xl"
          >
            <VisuallyHidden asChild>
              <DialogTitle>جزئیات سفارش</DialogTitle>
            </VisuallyHidden>

            <VisuallyHidden asChild>
              <DialogDescription>
                اطلاعات کامل سفارش انتخاب‌شده
              </DialogDescription>
            </VisuallyHidden>
            <OrderContent order={order} isMobile={isMobile} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
