import { z } from "zod";

export const itemFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان محصول الزامی است")
    .max(100, "عنوان محصول نباید بیش از 100 کاراکتر باشد"),
  description: z
    .string()
    .min(1, "توضیحات محصول الزامی است")
    .max(500, "توضیحات محصول نباید بیش از 500 کاراکتر باشد"),
  price: z
    .number()
    .min(0, "قیمت نمی‌تواند منفی باشد")
    .max(10000000, "قیمت خیلی زیاد است"),
  discount: z
    .number()
    .min(0, "تخفیف نمی‌تواند منفی باشد")
    .max(100, "تخفیف نمی‌تواند بیش از 100 درصد باشد"),
  quantity: z
    .number()
    .min(0, "موجودی نمی‌تواند منفی باشد")
    .max(999999, "موجودی خیلی زیاد است"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  ingredients: z.array(z.string()),
  images: z.array(z.any()),
  show: z.boolean(),
});

export type ItemFormData = z.infer<typeof itemFormSchema>;

export interface ItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  item?: {
    id: string;
    title: string;
    description?: string;
    price: number;
    discount: number;
    quantity: number;
    category: { id: string; title: string };
    ingredients: string[];
    images: { imageUrl: string }[];
    show: boolean;
  };
}
