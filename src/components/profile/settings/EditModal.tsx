import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, UserPen } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import { EditModalProps } from "@/types/Profile";
import { profileFormSchema } from "@/schemas/profile/settings/settings";
import { InputBlock } from "./InputBlock";

export const EditModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  user,
}: EditModalProps) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      birthday: "",
      email: "",
    },
    resolver: zodResolver(profileFormSchema) as any,
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        username: user?.username || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        birthday: user?.birthday || "",
        email: user?.email || "",
      });
    }
  }, [user, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  function toEnglishDigits(str: string) {
    return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        dir="rtl"
        className="sm:max-w-xl text-right rtl:text-right rtl:items-end"
      >
        <DialogHeader>
          <DialogClose asChild>
            <button
              className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="بستن"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
          <DialogTitle className="text-right flex items-center gap-2 text-xl">
            <UserPen className="text-amber-700" size={28} />
            ویرایش پروفایل
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7"
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
          <InputBlock
            label="ایمیل"
            name="email"
            register={register}
            errors={errors}
            type="email"
          />
          <InputBlock
            label="نام کاربری"
            name="username"
            register={register}
            errors={errors}
            type="text"
          />

          {/* تاریخ تولد */}
          <div className="col-span-2 space-y-2">
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
                      const finalDate = toEnglishDigits(gregorianDate || "");
                      onChange(finalDate);
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

          <DialogFooter className="flex justify-center w-full col-span-2">
            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 hover:bg-amber-600 hover:translate-y-1 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
