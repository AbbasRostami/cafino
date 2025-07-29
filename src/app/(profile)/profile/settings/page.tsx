"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, Camera, Trash2, X, UserPen } from "lucide-react";
import moment from "moment-jalaali";
import "moment-timezone";
import "moment/locale/fa";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import { useUpdateProfile, useUserProfile } from "@/services/update";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import { toast } from "sonner";
import { useRemoveImage, useUpdateImage } from "@/services/Images";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
export default function SettingsPage() {
  const { data: user, isLoading } = useUserProfile();
  console.log("user", user);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const createdAt = user?.created_at
    ? moment(user.created_at).tz("Asia/Tehran").format("jYYYY/jMM/jDD - HH:mm")
    : "---";

  const updatedAt = user?.updated_at
    ? moment(user.updated_at).tz("Asia/Tehran").format("jYYYY/jMM/jDD - HH:mm")
    : "---";
  const { mutate: updateImage, isPending: isUpdatingImage } = useUpdateImage();
  const { mutate: removeImage, isPending: isRemovingImage } = useRemoveImage();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("فقط فرمت‌های JPG، PNG و WebP مجاز هستند");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم تصویر نباید بیشتر از ۲ مگابایت باشد");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.onerror = () => {
        toast.error("خطا در خواندن فایل");
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      updateImage(formData, {
        onSuccess: () => {
          setAvatarPreview(null);
        },
        onError: () => {
          setAvatarPreview(null);
        },
      });
    } catch (error) {
      toast.error("خطا در آپلود تصویر");
      setAvatarPreview(null);
    }
  };

  interface FormData {
    username: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    birthday: string | undefined;
    email: string | undefined;
  }
  const schema = z.object({
    username: z
      .string()
      .max(20, { message: "نام کاربری نمیتواند بیشتر از 20 کاراکتر باشد" })
      .min(1, { message: "نام کاربری الزامی است" }),
    first_name: z
      .string()
      .max(10, { message: "نام نمیتواند بیشتر از 10 کاراکتر باشد" })
      .min(1, { message: "نام الزامی است" }),
    last_name: z
      .string()
      .max(10, { message: "نام خانوادگی نمیتواند بیشتر از 10 کاراکتر باشد" })
      .min(1, { message: "نام خانوادگی الزامی است" }),
    birthday: z
      .string()
      .max(10, { message: "تاریخ تولد نمیتواند بیشتر از 10 کاراکتر باشد" })
      .min(1, { message: "تاریخ تولد الزامی است" }),
    email: z
      .string()
      .email({ message: "ایمیل معتبر نیست" })
      .max(50, { message: "ایمیل نمیتواند بیشتر از 50 کاراکتر باشد" })
      .min(1, { message: "ایمیل الزامی است" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "ایمیل معتبر نیست",
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      birthday: "",
      email: "",
    },
    resolver: zodResolver(schema) as any,
  });
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

  const { updateProfile, isPending } = useUpdateProfile();
  const onSubmit = (data: FormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  if (isLoading) return <ProfileSkeleton />;

  function toEnglishDigits(str: string) {
    return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  }

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
          <User size={32} className="text-amber-600" />
          تنظیمات پروفایل کاربری
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          اطلاعات شخصی خود را مدیریت و به‌روزرسانی کنید
        </p>
      </motion.div>

      {/* کارت آواتار */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="h-full   rounded-xl shadow-sm p-4">
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-32 h-32 border-2 border-amber-400 shadow-lg">
                <AvatarImage
                  src={avatarPreview || user?.imageUrl || ""}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white text-3xl">
                  {user?.first_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isUpdatingImage}
                className={`absolute -bottom-2 -right-2 p-2 rounded-full shadow-md ${
                  isUpdatingImage
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600"
                } text-white`}
              >
                <label
                  htmlFor="avatar-upload"
                  className={`cursor-pointer ${
                    isUpdatingImage ? "cursor-not-allowed" : ""
                  }`}
                >
                  {isUpdatingImage ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Edit size={20} />
                  )}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isUpdatingImage}
                />
              </motion.button>
            </div>

            {user?.imageUrl && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                disabled={isRemovingImage}
                className={`mt-4 flex items-center gap-1 text-sm ${
                  isRemovingImage
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:text-red-600"
                }`}
                onClick={() => removeImage()}
              >
                {isRemovingImage ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                ) : (
                  <Trash2 size={16} />
                )}
                {isRemovingImage ? "در حال حذف..." : "حذف تصویر"}
              </motion.button>
            )}
          </CardContent>
          <CardFooter className="text-xs text-gray-500 dark:text-gray-400 justify-center">
            فرمت‌های مجاز: JPG, PNG حداکثر 2MB
          </CardFooter>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
            {[
              { label: "نام", value: user?.first_name, icon: "🧑" },
              { label: "نام خانوادگی", value: user?.last_name, icon: "🧑‍🦱" },
              { label: "نام کاربری", value: user?.username, icon: "👤" },
              { label: "آدرس ایمیل", value: user?.email, icon: "✉️" },
              { label: "شماره تلفن", value: user?.phone, icon: "📞" },
              {
                label: "تاریخ تولد",
                value: user?.birthday
                  ? moment(user.birthday)
                      .locale("fa-IR")
                      .format("jYYYY/jMM/jDD")
                  : "---",
                icon: "🎂",
              },
              {
                label: "نقش",
                value: user?.role === "admin" ? "مدیر" : "کاربر",
                icon: "🛡️",
              },
              {
                label: "وضعیت",
                value: user?.status === "normal" ? "فعال" : "غیر فعال",
                icon: "⚙️",
              },
              {
                label: "تاریخ ثبت نام",
                value: createdAt,
                icon: "🗓️",
              },
              {
                label: "تاریخ بروزرسانی",
                value: updatedAt,
                icon: "🕒",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/50 dark:hover:border-indigo-900/50"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50/50 text-indigo-600 shadow-inner dark:bg-indigo-900/20 dark:text-indigo-300">
                    <span className="text-xl">{item.icon}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {item.label}
                    </h3>
                    <div
                      className={`relative pr-2 text-sm font-medium ${
                        item.value
                          ? "text-gray-800 dark:text-gray-200"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {item.value || "---"}
                      <div className="absolute -left-2 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-indigo-500/30 dark:bg-indigo-400/30" />
                    </div>
                  </div>
                </div>

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/20 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-indigo-900/20" />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 px-4">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 hover:bg-amber-600"
            >
              ویرایش
            </Button>
          </div>
        </Card>
      </motion.div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
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
            onSubmit={handleSubmit(onSubmit)}
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
                        console.log("📤 gregorian for API:", finalDate);
                        onChange(finalDate);
                      }}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      inputClass="w-full bg-gray-100 dark:bg-gray-800 shadow-xs px-3 py-1 rounded-md border-2 focus-visible:ring-2 focus-visible:ring-amber-500
                      "
                    />
                  );
                }}
              />
            </div>

            <DialogFooter className="flex justify-center w-full col-span-2">
              <Button
                type="submit"
                disabled={!isDirty || isPending}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 hover:bg-amber-600 hover:translate-y-1 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InputBlock({ label, name, register, errors, type = "text" }: any) {
  return (
    <div className="col-span-1 space-y-2">
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </Label>
      <Input
        type={type}
        {...register(name)}
        className="w-full bg-gray-100 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-500"
        required
      />
      {errors[name] && (
        <p className="text-red-500  text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
}
