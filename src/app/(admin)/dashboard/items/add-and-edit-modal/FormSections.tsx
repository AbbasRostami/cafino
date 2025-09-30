import {
  Trash2,
  Plus,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/utils/MotionWrapper";
import { FormSectionsProps } from "@/types/admin";

export function FormSections({
  register,
  watch,
  setValue,
  errors,
  ingredientFields,
  appendIngredient,
  removeIngredient,
  imagePreview,
  imageFiles,
  isCompressing,
  handleImageChange,
  removeImage,
  categories,
}: FormSectionsProps) {
  const imageSlots = Array.from({ length: 5 }, (_, index) => {
    const hasImage = index < imagePreview?.length;
    const imageUrl = hasImage ? imagePreview[index] : null;
    const fileName = hasImage ? imageFiles?.[index]?.name : null;

    return (
      <MotionDiv
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`relative group border-2 border-dashed rounded-lg transition-all duration-300 ${
          hasImage
            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
            : "border-gray-300 dark:border-gray-600 hover:border-primary/50"
        }`}
      >
        {hasImage ? (
          <>
            <Image
              src={imageUrl || ""}
              alt={`تصویر ${index + 1}`}
              width={200}
              height={200}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeImage?.(index)}
                className="h-8 w-8 rounded-full"
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="text-xs">
                {fileName?.slice(0, 15)}...
              </Badge>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 p-4 text-center">
            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              تصویر {index + 1}
            </p>
          </div>
        )}
      </MotionDiv>
    );
  });

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="border-0 shadow-lg p-2 md:p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="pb-4">
          <h2 className="text-lg font-semibold text-right flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            اطلاعات پایه
          </h2>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-right block font-medium">
                عنوان محصول <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="نام محصول را وارد کنید"
                className="text-right h-11 border-2 focus:border-blue-500 transition-colors"
              />
              {errors.title && (
                <p className="text-sm text-red-500 text-right flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-3 w-full">
              <Label
                htmlFor="category"
                className="text-right block font-medium"
              >
                دسته‌بندی <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watch("category")}
                onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger className="text-right !h-11 border-2 focus:border-blue-500 transition-colors w-full">
                  <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent className="text-right">
                  {categories?.map((category) => (
                    <SelectItem key={category?.id} value={category?.id}>
                      {category?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors?.category && (
                <p className="text-sm text-red-500 text-right flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors?.category?.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="text-right block font-medium"
            >
              توضیحات
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="توضیحات محصول را وارد کنید"
              className="text-right min-h-[120px] border-2 focus:border-blue-500 transition-colors resize-none"
            />
            {errors?.description && (
              <p className="text-sm text-red-500 text-right flex items-center gap-1">
                <AlertCircle size={14} />
                {errors?.description?.message}
              </p>
            )}
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="border-0 shadow-lg p-2 md:p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="pb-4">
          <h2 className="text-lg font-semibold text-right flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            قیمت و موجودی
          </h2>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="price" className="text-right block font-medium">
                قیمت (تومان) <span className="text-red-500">*</span>
              </Label>
              <Input
                min="0"
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder="0"
                className="text-right h-12 border-2 focus:border-blue-500 transition-colors"
              />
              {errors?.price && (
                <p className="text-sm text-red-500 text-right flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors?.price?.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="discount"
                className="text-right block font-medium"
              >
                تخفیف (درصد)
              </Label>
              <Input
                id="discount"
                type="number"
                {...register("discount", { valueAsNumber: true })}
                placeholder="0"
                className="text-right h-12 border-2 focus:border-blue-500 transition-colors"
                min="0"
                max="100"
              />
              {errors?.discount && (
                <p className="text-sm text-red-500 text-right flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors?.discount?.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="quantity"
                className="text-right block font-medium"
              >
                موجودی <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                // placeholder="0"
                className="text-right h-12 border-2 focus:border-blue-500 transition-colors"
                // min="0"
              />
              {errors?.quantity && (
                <p className="text-sm text-red-500 text-right flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors?.quantity?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="border-0 shadow-lg p-2 md:p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2">
            <h2 className="text-sm md:text-lg font-semibold text-right flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              مواد اولیه (حداکثر 5)
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendIngredient("")}
              disabled={ingredientFields.length >= 5}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={16} />
              افزودن ماده اولیه
            </Button>
          </div>
        </div>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {ingredientFields?.map((field: any, index: number) => (
            <MotionDiv
              key={field?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex gap-3 items-center"
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeIngredient(index)}
                className="shrink-0 h-10 w-10 rounded-full border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <Trash2 size={16} />
              </Button>
              <Input
                {...register(`ingredients.${index}`)}
                placeholder={`ماده اولیه ${index + 1}`}
                className="text-right h-10 border-2 focus:border-orange-500 transition-colors"
              />
            </MotionDiv>
          ))}
        </div>
        {ingredientFields?.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>هیچ ماده اولیه‌ای اضافه نشده است</p>
          </div>
        )}
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="border-0 shadow-lg p-2 md:p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2">
            <h2 className="text-sm md:text-lg font-semibold text-right flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              تصاویر محصول
            </h2>
            <div className="flex items-center gap-3">
              <Label
                htmlFor="images"
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                {isCompressing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Upload size={18} />
                )}
                {isCompressing ? "در حال فشرده‌سازی..." : "انتخاب تصویر"}
              </Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isCompressing}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">{imageSlots}</div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">نکات مهم:</p>
                <ul className="space-y-1 text-xs">
                  <li>• حداکثر حجم هر تصویر: 5 مگابایت</li>
                  <li>• تصاویر به صورت خودکار فشرده می‌شوند</li>
                  <li>• فرمت‌های مجاز: JPG, PNG, WebP</li>
                  <li>
                    • تصاویر به اندازه 800x800 پیکسل تغییر اندازه می‌یابند
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="shadow-lg bg-gradient-to-r p-2 md:p-4 rounded-lg from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <Label
              htmlFor="show"
              className="text-lg font-medium text-amber-800 dark:text-amber-200"
            >
              نمایش محصول
            </Label>
            <p className="text-sm text-amber-600 dark:text-amber-300">
              آیا این محصول در سایت نمایش داده شود؟
            </p>
          </div>
          <Switch
            dir="ltr"
            checked={watch("show")}
            onCheckedChange={(checked) =>
              setValue("show", checked, { shouldDirty: true })
            }
            className="data-[state=checked]:bg-amber-500"
          />
        </div>
      </MotionDiv>
    </>
  );
}
