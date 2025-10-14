import { z } from "zod";

export const discountSchema = z
  .object({
    code: z
      .string()
      .min(1, "کد تخفیف الزامی است")
      .max(100, "کد تخفیف نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"),
    discountType: z.enum(["percent", "amount"]),
    percent: z
      .union([
        z.number().min(0, "درصد نباید منفی باشد").max(100, "حداکثر 100٪"),
        z.nan(),
      ])
      .optional(),
    amount: z
      .union([z.number().min(1000, "مقدار نباید کمتر از ۱۰۰۰ باشد"), z.nan()])
      .optional(),
    expires_in: z
      .number()
      .min(1, "تاریخ انقضا باید حداقل ۱ روز باشد")
      .max(1000, "تاریخ انقضا نمی‌تواند بیش از ۱۰۰۰ روز باشد"),
    limit: z
      .number()
      .min(1, "محدودیت نباید کمتر از ۱ باشد")
      .max(100, "محدودیت نمی‌تواند بیش از ۱۰۰ باشد"),
  })
  .refine(
    (data) => {
      if (data?.discountType === "percent") {
        return (
          typeof data?.percent === "number" && !Number.isNaN(data?.percent)
        );
      }
      if (data?.discountType === "amount") {
        return typeof data?.amount === "number" && !Number.isNaN(data?.amount);
      }
      return false;
    },
    {
      message: "باید فقط یک مقدار متناسب با نوع تخفیف وارد شود",
      path: ["percent"],
    }
  );

export type DiscountFormType = z.infer<typeof discountSchema>;
