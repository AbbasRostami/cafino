import z from "zod";

export const replySchema = z.object({
  subject: z
    .string()
    .trim()
    .nonempty({ message: "این فیلد نباید خالی باشد" })
    .min(10, { message: "موضوع باید حداقل 10 کاراکتر باشد" })
    .max(40, { message: "موضوع نمی‌تواند بیشتر از 40 کاراکتر باشد" }),
  message: z
    .string()
    .trim()
    .nonempty({ message: "این فیلد نباید خالی باشد" })
    .min(10, { message: "پیام باید حداقل 10 کاراکتر باشد" })
    .max(100, { message: "پیام نمی‌تواند بیشتر از 100 کاراکتر باشد" }),
});

export type ReplyFormDataMessages= z.infer<typeof replySchema>;
