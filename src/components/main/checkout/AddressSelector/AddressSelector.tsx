"use client";

import { useState } from "react";
import { MapPin, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/utils/MotionWrapper";
import AddAddressModal from "./AddAddressModal";
import { AddressSelectorProps } from "@/types/main";

export default function AddressSelector({
  addresses,
  selectedAddressId,
  onAddressSelect,
  isLoading,
  onAddressAdded,
}: AddressSelectorProps) {
  const [showAddAddress, setShowAddAddress] = useState(false);

  const handleAddressAdded = () => {
    setShowAddAddress(false);
    if (onAddressAdded) {
      onAddressAdded();
    }
  };

  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-lg border border-amber-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
            <MapPin className="text-amber-600 dark:text-amber-400" size={20} />
            انتخاب آدرس تحویل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="rounded-2xl gap-4 shadow-lg border border-amber-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg">
        <CardHeader className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
            <MapPin className="text-amber-600 dark:text-amber-400" size={20} />
            انتخاب آدرس تحویل
          </CardTitle>
          <Button
            onClick={() => setShowAddAddress(true)}
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <Plus size={16} className="ml-1" />
            افزودن آدرس
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 !border-none">
          {addresses && addresses.length > 0 ? (
            addresses.map((address) => (
              <MotionDiv
                key={address?.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedAddressId === address?.id
                    ? " ring-amber-500 dark:ring-amber-400"
                    : " hover:ring-amber-300 dark:hover:ring-amber-600"
                }`}
              >
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedAddressId === address?.id
                      ? "border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600"
                  }`}
                  onClick={() => onAddressSelect(address?.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin
                          size={16}
                          className="text-amber-600 dark:text-amber-400"
                        />
                        <span className="font-medium text-gray-800 dark:text-white">
                          {address?.province}، {address?.city}
                        </span>
                        {selectedAddressId === address?.id && (
                          <Badge className="bg-amber-500 text-white text-xs">
                            انتخاب شده
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {address?.address}
                      </p>
                    </div>
                    {selectedAddressId === address?.id && (
                      <div className="ml-3 p-1 bg-amber-500 rounded-full">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </MotionDiv>
            ))
          ) : (
            <div className="text-center py-1">
              <MapPin
                className="mx-auto text-gray-400 dark:text-gray-500 mb-2"
                size={48}
              />
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                هیچ آدرسی برای تحویل ثبت نشده است
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddAddressModal
        open={showAddAddress}
        onOpenChange={setShowAddAddress}
        onSuccess={handleAddressAdded}
      />
    </>
  );
}
