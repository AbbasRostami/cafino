"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useCreateCategory, useUpdateCategory } from "@/services";
import { compressImage, validateImageFile } from "@/lib/imageUtils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { MotionDiv, MotionP } from "@/utils/MotionWrapper";
import { CategoryForm, categorySchema } from "@/schemas/admin";
import { ModalContentProps } from "@/types/admin";

export function ModalContent({ initialData, onClose }: ModalContentProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<CategoryForm>({
    mode: "onTouched",
    resolver: zodResolver(categorySchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(
    initialData?.imageUrl
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData?.title,
        show: initialData?.show,
      });
      setPreview(initialData?.imageUrl);
    } else {
      reset({
        title: "",
        show: true,
      });
      setPreview(undefined);
    }
    setFile(null);
  }, [initialData, reset]);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const selectedFile = e?.target?.files?.[0];
    if (!selectedFile) return;

    const validationError = validateImageFile(selectedFile);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setIsUploading(true);
      const compressedFile = await compressImage(selectedFile, 800, 800, 0.8);
      setFile(compressedFile);
      toast.success("تصویر با موفقیت بهینه‌سازی شد");
    } catch (error) {
      toast.error("خطا در بهینه‌سازی تصویر");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(undefined);
  };

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const titleLabel = initialData ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی";
  const isEditMode = !!initialData;
  const isPending = isCreating || isUpdating;

  const changedFieldsCount =
    Object.keys(dirtyFields || {})?.length + (file ? 1 : 0);

  const onSubmit = (data: CategoryForm) => {
    if (!isEditMode && !file) {
      toast.error("تصویر اجباری است");
      return;
    }
    const formData = new FormData();
    if (isEditMode && initialData?.id) {
      if (dirtyFields?.title) {
        formData?.append("title", data?.title?.trim());
      }

      if (dirtyFields?.show) {
        formData?.append("show", String(data?.show ?? true));
      }
      if (file) {
        formData?.append("image", file);
      }
      const hasChanges = dirtyFields?.title || dirtyFields?.show || file;
      if (!hasChanges) {
        toast.info("هیچ تغییری اعمال نشده است");
        return;
      }

      updateCategory(
        { id: initialData?.id, formData },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      formData.append("title", data?.title.trim());
      formData.append("show", String(data?.show ?? true));
      formData.append("image", file!);

      createCategory(formData, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const onError = (errors: any) => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      setFocus(firstErrorField as keyof CategoryForm);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {titleLabel}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {isEditMode
            ? "اطلاعات دسته‌بندی را ویرایش کنید"
            : "اطلاعات جدید دسته‌بندی را وارد کنید"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 !gap-1">
            عنوان دسته‌بندی <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("title")}
            dir="rtl"
            className={`border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 transition-colors ${
              errors.title ? "border-red-500 focus:border-red-500" : ""
            } ${
              isEditMode && dirtyFields?.title
                ? "ring-2 ring-amber-200 dark:ring-amber-800"
                : ""
            }`}
            placeholder="عنوان دسته‌بندی را وارد کنید"
          />
          {errors?.title && (
            <MotionP
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-500 mt-1"
            >
              {errors?.title?.message}
            </MotionP>
          )}
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            تصویر دسته‌بندی
          </Label>

          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
              id="image-upload"
              disabled={isUploading}
            />
            <Label
              htmlFor="image-upload"
              className={`
                block w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
                ${
                  isUploading
                    ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                    : "border-amber-300 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                }
                ${
                  preview
                    ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                    : ""
                }
              `}
            >
              <div className="text-center space-y-3">
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : preview ? (
                  <ImageIcon className="mx-auto h-8 w-8 text-green-500" />
                ) : (
                  <Upload className="mx-auto h-8 w-8 text-amber-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isUploading
                      ? "در حال بهینه‌سازی..."
                      : preview
                      ? "تصویر انتخاب شده"
                      : "برای انتخاب تصویر کلیک کنید"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG تا 5MB
                  </p>
                </div>
              </div>
            </Label>
          </div>

          {preview && (
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative inline-block"
            >
              <Image
                width={128}
                height={128}
                src={preview}
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-amber-200 dark:border-amber-700 shadow-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </MotionDiv>
          )}
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
            isEditMode && dirtyFields?.show
              ? "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700 ring-2 ring-amber-200 dark:ring-amber-800"
              : "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700"
          }`}
        >
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            نمایش در سایت
          </Label>
          <Switch
            dir="ltr"
            checked={watch("show") ?? true}
            onCheckedChange={(v) => {
              setValue("show", v, { shouldDirty: true });
            }}
            className="data-[state=checked]:bg-amber-500"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 pt-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            انصراف
          </Button>
          <Button
            type="submit"
            disabled={isPending || isUploading}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isEditMode ? "در حال ذخیره..." : "در حال افزودن..."}
              </div>
            ) : isEditMode ? (
              <div className="flex items-center gap-2">
                <span>ذخیره تغییرات</span>
                {changedFieldsCount > 0 && (
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {changedFieldsCount} تغییر
                  </span>
                )}
              </div>
            ) : (
              "افزودن دسته‌بندی"
            )}
          </Button>
        </MotionDiv>
      </form>
    </MotionDiv>
  );
}
