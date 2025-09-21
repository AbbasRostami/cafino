import { z } from "zod";

export const createTicketSchema = z.object({
  subject: z
    .string()
    .min(1, "موضوع تیکت الزامی است")
    .min(3, "موضوع تیکت باید حداقل ۳ کاراکتر باشد")
    .max(50, "موضوع تیکت نمی‌تواند بیش از ۵۰ کاراکتر باشد")
    .trim(),
  message: z
    .string()
    .min(1, "پیام الزامی است")
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "پیام نمی‌تواند بیش از ۵۰۰ کاراکتر باشد")
    .trim(),
});

export const addMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .regex(/\S/, "پیام نمی‌تواند فقط شامل فاصله باشد")
    .min(1, "پیام الزامی است")
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "پیام نمی‌تواند بیش از ۵۰۰ کاراکتر باشد"),
    
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;
export type AddMessageFormData = z.infer<typeof addMessageSchema>;
