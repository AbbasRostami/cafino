import { z } from "zod";

export const profileFormSchema = z.object({
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

export type ProfileFormData = z.infer<typeof profileFormSchema>;
