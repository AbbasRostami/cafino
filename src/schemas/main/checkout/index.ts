import { z } from "zod";

export const discountSchemaCheckout = z.object({
  code: z
    .string()
    .trim()
    .min(1, { message: "کد تخفیف نمی‌تواند خالی باشد" })
    .max(10, { message: "کد تخفیف باید حداکثر ۱۰ کاراکتر باشد" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "کد تخفیف فقط می‌تواند شامل حروف و اعداد لاتین باشد",
    }),
});

export type DiscountFormValues = z.infer<typeof discountSchemaCheckout>;
