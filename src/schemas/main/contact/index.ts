import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "نام باید حداقل 2 کاراکتر باشد" })
    .max(30, { message: "نام نمی‌تواند بیشتر از 30 کاراکتر باشد" }),
  email: z.string().trim().email({ message: "ایمیل معتبر نیست" }),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, { message: "شماره تلفن معتبر نیست" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "پیام باید حداقل 10 کاراکتر باشد" })
    .max(100, { message: "پیام نمی‌تواند بیشتر از 100 کاراکتر باشد" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
