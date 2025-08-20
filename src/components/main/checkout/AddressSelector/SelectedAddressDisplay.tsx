"use client";

import { MapPin, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/utils/MotionWrapper";
import { SelectedAddressDisplayProps } from "@/types/main";

export default function SelectedAddressDisplay({
  selectedAddress,
  onEditAddress,
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
            <Badge className="bg-amber-500 text-white text-xs p-1.5">
              انتخاب شده
            </Badge>
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
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800 dark:text-white">
                {selectedAddress?.province}، {selectedAddress?.city}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {selectedAddress?.address}
            </p>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
