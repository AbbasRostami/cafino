import z from "zod";

export const CommentSchema = z.object({
  text: z
    .string()
    .min(1, { message: "نظر شما باید حداقل 1 کلمه باشد" })
    .max(100, { message: "نظر شما باید حداکثر 100 کلمه باشد" })
    .trim(),
});

export type FormValues = z.infer<typeof CommentSchema>;
