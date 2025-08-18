import { z } from "zod";

export const commentFormSchema = z.object({
  text: z
    .string()
    .min(1, "نظر خود را وارد کنید")
    .max(50, "کمتر از 50 کاراکتر وارد کنید"),
  star: z
    .number({ invalid_type_error: "امتیاز معتبر نیست" })
    .min(1, "حداقل امتیاز ۱ است")
    .max(5, "حداکثر امتیاز ۵ است"),
});

export const replyFormSchema = z.object({
  text: z
    .string()
    .min(1, "پاسخ خود را وارد کنید")
    .max(50, "کمتر از 50 کاراکتر وارد کنید"),
});

export type CommentFormData = z.infer<typeof commentFormSchema>;
export type ReplyFormData = z.infer<typeof replyFormSchema>;
