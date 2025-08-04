import { z } from "zod";

// Discount Code Validation Schema
export const discountSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, { message: "کد تخفیف نمی‌تواند خالی باشد" })
    .max(10, { message: "کد تخفیف باید حداکثر ۱۰ کاراکتر باشد" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "کد تخفیف فقط می‌تواند شامل حروف و اعداد لاتین باشد",
    }),
});

// Type inference
export type DiscountFormValues = z.infer<typeof discountSchema>;
