import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .transform((val) => val.replace(/[^0-9]/g, ""))
    .refine((val) => /^09\d{9}$/.test(val), {
      message: "شماره تلفن معتبر نیست",
    }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(5, "کد باید ۵ رقمی باشد")
    .regex(/^\d{5}$/, "کد باید فقط شامل ارقام باشد"),
});
