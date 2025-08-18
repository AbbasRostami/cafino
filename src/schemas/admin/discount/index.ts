import { z } from "zod";

export const discountSchema = z
  .object({
    code: z.string().min(1, "کد تخفیف الزامی است"),
    discountType: z.enum(["percent", "amount"]),
    percent: z
      .union([
        z.number().min(0, "درصد نباید منفی باشد").max(100, "حداکثر 100٪"),
        z.nan(),
      ])
      .optional(),
    amount: z
      .union([z.number().min(0, "مقدار نباید منفی باشد"), z.nan()])
      .optional(),
    expires_in: z.number().min(1, "تاریخ انقضا باید حداقل ۱ روز باشد"),
    limit: z.number().min(0, "محدودیت نباید منفی باشد"),
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

  export  type DiscountFormType = z.infer<typeof discountSchema>;
