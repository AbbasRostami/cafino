import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string()
    .min(1, "عنوان ضروری است")
    .max(100, "عنوان نباید بیش از 100 کاراکتر باشد"),
  image: z.instanceof(File).optional(),
  show: z.boolean().optional(),
});

export type CategoryForm = z.infer<typeof categorySchema>;
