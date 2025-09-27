import { z } from "zod";

export const profileFormSchema = z.object({
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
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
