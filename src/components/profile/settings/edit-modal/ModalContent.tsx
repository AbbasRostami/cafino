"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import { ProfileFormData } from "@/types/Profile";
import { InputBlock } from "../InputBlock";
import { MotionForm } from "@/utils/MotionWrapper";
import { profileFormSchema } from "@/schemas/profile";

interface ModalContentProps {
  onSubmit: (data: ProfileFormData) => void;
  isPending: boolean;
  user: any;
}

export const ModalContent = ({
  onSubmit,
  isPending,
  user,
}: ModalContentProps) => {
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

  React.useEffect(() => {
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
    onSubmit(data);
  };

  function toEnglishDigits(str: string) {
    return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  }

  return (
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
                portal
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
        className="md:col-span-2 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 hover:bg-amber-600 hover:translate-y-1 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
};
