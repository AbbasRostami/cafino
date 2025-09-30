import { z } from "zod";

export const cartItemSchema = z.object({
  itemId: z.string(),
  title: z.string(),
  description: z.string(),
  count: z.number().min(1),
  images: z.array(z.string()),
  price: z.string(),
  discount: z.string(),
  finalPrice: z.number(),
  category: z.object({
    title: z.string(),
  }),
  quantity: z.number().optional(),
  isFav: z.boolean().optional(),
});

export const cartApiResponseSchema = z.object({
  totalAmount: z.number(),
  totalDiscount: z.number(),
  paymentAmount: z.number(),
  cartItems: z.array(cartItemSchema),
  generalDiscount: z.any().optional(),
  statusCode: z.number().optional(),
});
