import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string()
    .min(1, "عنوان ضروری است")
    .max(100, "عنوان نباید بیش از 100 کاراکتر باشد"),
  slug: z
    .string()
    .min(1, "slug ضروری است")
    .max(50, "slug نباید بیش از 50 کاراکتر باشد")
    .regex(
      /^[a-z0-9-]+$/,
      "slug باید فقط حروف انگلیسی کوچک، اعداد و خط تیره باشد"
    ),
  image: z.instanceof(File).optional(),
  show: z.boolean().optional(),
});

export type CategoryForm = z.infer<typeof categorySchema>;
