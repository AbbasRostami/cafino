import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/[^0-9]/g, ""))
    .refine((val) => val.length === 11, {
      message: "length-11",
    })
    .refine((val) => val.startsWith("09"), {
      message: "starts-with-09",
    })
    .refine((val) => /^09\d{9}$/.test(val), {
      message: "invalid-phone",
    })
    .refine((val) => /^[0-9]*$/.test(val), {
      message: "no-letters",
    }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(5, { message: "length-5" })
    .regex(/^\d{5}$/, { message: "digits-only" }),
});
