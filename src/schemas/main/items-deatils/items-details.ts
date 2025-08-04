import { z } from "zod";

// Schema for comment form
export const commentFormSchema = z.object({
  itemId: z.string().min(1, "نظر خود را وارد کنید"),
  text: z
    .string()
    .min(1, "نظر خود را وارد کنید")
    .max(50, "کمتر از 50 کاراکتر وارد کنید"),
  star: z
    .number({ invalid_type_error: "امتیاز معتبر نیست" })
    .min(1, "حداقل امتیاز ۱ است")
    .max(5, "حداکثر امتیاز ۵ است"),
});

// Schema for reply form
export const replyFormSchema = z.object({
  text: z
    .string()
    .min(1, "پاسخ خود را وارد کنید")
    .max(50, "کمتر از 50 کاراکتر وارد کنید"),
  itemId: z.string().min(1, "شناسه محصول الزامی است"),
  parentId: z.string().min(1, "شناسه کامنت اصلی الزامی است"),
});

// Schema for comment submission
export const commentSubmissionSchema = z.object({
  text: z.string().min(1, "نظر خود را وارد کنید"),
  itemId: z.string().min(1, "شناسه محصول الزامی است"),
  star: z.number().min(1).max(5),
});

// Schema for reply submission
export const replySubmissionSchema = z.object({
  text: z.string().min(1, "پاسخ خود را وارد کنید"),
  itemId: z.string().min(1, "شناسه محصول الزامی است"),
  parentId: z.string().min(1, "شناسه کامنت اصلی الزامی است"),
});

// Type exports
export type CommentFormData = z.infer<typeof commentFormSchema>;
export type ReplyFormData = z.infer<typeof replyFormSchema>;
export type CommentSubmissionData = z.infer<typeof commentSubmissionSchema>;
export type ReplySubmissionData = z.infer<typeof replySubmissionSchema>;
