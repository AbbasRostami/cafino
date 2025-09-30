"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, UserPen, Loader2 } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import { EditModalProps, ProfileFormData } from "@/types/Profile";
import { InputBlock } from "./InputBlock";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MotionForm } from "@/utils/MotionWrapper";
import { profileFormSchema } from "@/schemas/profile";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { DialogDescription } from "@radix-ui/react-dialog";

export const EditModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  user,
}: EditModalProps) => {
  const isMobile = useIsMobile();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      birthday: "",
    },
    resolver: zodResolver(profileFormSchema) as any,
  });

  useEffect(() => {
    if (user) {
      reset({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        birthday: user?.birthday || "",
      });
    }
  }, [user, reset]);

  const handleFormSubmit = (data: ProfileFormData) => {
    const changedData: Partial<ProfileFormData> = {};
    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof ProfileFormData;
      changedData[fieldKey] = data[fieldKey];
    });
    onSubmit(changedData as ProfileFormData);
  };

  function toEnglishDigits(str: string) {
    return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  }

  const FormContent = (
    <MotionForm
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-7"
    >
      <InputBlock
        label="نام"
        name="first_name"
        register={register}
        errors={errors}
      />
      <InputBlock
        label="نام خانوادگی"
        name="last_name"
        register={register}
        errors={errors}
      />

      <div className="space-y-2">
        <Label className="block w-full text-sm font-medium text-gray-700 dark:text-gray-400">
          تاریخ تولد
        </Label>
        <Controller
          control={control}
          name="birthday"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            const displayValue =
              value && typeof value === "string"
                ? new DateObject({
                    date: value,
                    format: "YYYY-MM-DD",
                    calendar: gregorian,
                  }).convert(persian)
                : undefined;

            return (
              <DatePicker
                value={displayValue}
                onChange={(date) => {
                  const gregorianDate = date
                    ?.convert(gregorian)
                    .format("YYYY-MM-DD");
                  onChange(toEnglishDigits(gregorianDate || ""));
                }}
                format="YYYY/MM/DD"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass="w-full bg-gray-100 dark:bg-gray-800 shadow-xs px-3 py-1 rounded-md border-2 focus-visible:ring-2 focus-visible:ring-amber-500"
              />
            );
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending || !isDirty}
        className="md:col-span-2  bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 hover:bg-amber-600 hover:translate-y-1 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <div className="flex items-center gap-2 justify-center">
            <Loader2 className="animate-spin" size={20} />
            در حال ذخیره...
          </div>
        ) : (
          "ذخیره تغییرات"
        )}
      </Button>
    </MotionForm>
  );

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[95vh] border-none ">
        <DrawerHeader className="p-1">
          <DrawerTitle>ویرایش پروفایل</DrawerTitle>
          <DrawerDescription>
            ویرایش پروفایل خود را انجام دهید
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto p-4">{FormContent}</div>
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
        {FormContent}
      </DialogContent>
    </Dialog>
  );
};
