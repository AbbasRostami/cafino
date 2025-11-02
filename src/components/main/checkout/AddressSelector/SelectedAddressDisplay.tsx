"use client";

import { MapPin, Edit, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionDiv } from "@/utils/MotionWrapper";
import { SelectedAddressDisplayProps } from "@/types/main";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SelectedAddressDisplay({
  selectedAddress,
  onEditAddress,
  orderDescription,
  onDescriptionChange,
}: SelectedAddressDisplayProps) {
  if (!selectedAddress) {
    return null;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl shadow-lg border-2 border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white text-lg">
            <MapPin className="text-amber-600 dark:text-amber-400" size={20} />
            آدرس تحویل انتخاب شده
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={onEditAddress}
              variant="ghost"
              size="sm"
              className="border p-1  text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
            >
              <Edit size={16} className="ml-1" />
              تغییر
            </Button>
          </div>
        </CardHeader>
        <CardContent className="!space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="gap-2 font-medium text-gray-800 dark:text-white flex items-center">
                <span className="text-amber-600 dark:text-amber-400 mr-1 ">
                  <MapPin
                    size={16}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </span>
                <span className="text-gray-800 dark:text-white">
                  {selectedAddress?.province}، {selectedAddress?.city}
                </span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed break-words">
              {selectedAddress?.address}
            </p>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="order-description"
              className="flex items-center gap-2 text-md font-bold text-gray-700 dark:text-gray-300"
            >
              <MessageSquare
                size={16}
                className=" text-amber-700 dark:text-amber-400"
              />
              توضیحات سفارش (اختیاری)
            </Label>
            <Textarea
              id="order-description"
              placeholder="توضیحات سفارش خود را اینجا بنویسید..."
              value={orderDescription || ""}
              onChange={(e) => onDescriptionChange?.(e.target.value)}
              className="min-h-[80px] resize-none border-amber-200 dark:border-amber-800 focus:border-amber-400 dark:focus:border-amber-600 bg-white/50 dark:bg-gray-800/50"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
              {orderDescription?.length || 0}/500 کاراکتر
            </p>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
