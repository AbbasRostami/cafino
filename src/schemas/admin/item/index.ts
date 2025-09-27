import { z } from "zod";

export const itemFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان محصول الزامی است")
    .max(100, "عنوان محصول نباید بیش از 100 کاراکتر باشد")
    .trim(),
  description: z
    .string()
    .min(0, "توضیحات محصول نباید بیش از 500 کاراکتر باشد")
    .max(500, "توضیحات محصول نباید بیش از 500 کاراکتر باشد"),
  price: z
    .number()
    .min(1, "قیمت نمی‌تواند صفر باشد")
    .max(10000000, "قیمت خیلی زیاد است"),
  discount: z
    .number()
    .min(0, "تخفیف نمی‌تواند منفی باشد")
    .max(100, "تخفیف نمی‌تواند بیش از 100 درصد باشد"),
  quantity: z
    .number()
    .min(0, "موجودی نمی‌تواند منفی باشد")
    .max(99999, "موجودی خیلی زیاد است"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  ingredients: z
    .array(z.string().trim())
    .min(1, "حداقل یک ماده اولیه الزامی است"),
  show: z.boolean(),
  images: z.any().optional(),
});

export type ItemFormData = z.infer<typeof itemFormSchema>;
