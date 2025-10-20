import z from "zod";

export const CommentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, { message: "نظر شما باید حداقل 1 کلمه باشد" })
    .max(500, { message: "نظر شما باید حداکثر 500 کلمه باشد" }),
});

export type FormValues = z.infer<typeof CommentSchema>;
