import { z } from "zod";

// Address form validation schema
export const addressFormSchema = z.object({
  province: z.string().min(1, "انتخاب استان الزامی است"),
  city: z.string().min(1, "انتخاب شهر الزامی است"),
  address: z
    .string()
    .min(1, "آدرس الزامی است")
    .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "آدرس نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"),
});

// Address request validation schema
export const addressRequestSchema = z.object({
  address: z
    .string()
    .min(1, "آدرس الزامی است")
    .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "آدرس نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"),
  province: z.string().min(1, "استان الزامی است"),
  city: z.string().min(1, "شهر الزامی است"),
});

// Update address validation schema
export const updateAddressSchema = z.object({
  id: z.string().min(1, "شناسه آدرس الزامی است"),
  address: z
    .string()
    .min(1, "آدرس الزامی است")
    .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "آدرس نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"),
  province: z.string().min(1, "استان الزامی است"),
  city: z.string().min(1, "شهر الزامی است"),
});

// Delete address validation schema
export const deleteAddressSchema = z.object({
  id: z.string().min(1, "شناسه آدرس الزامی است"),
});

// Type exports for form data
export type AddressFormData = z.infer<typeof addressFormSchema>;
export type AddressRequest = z.infer<typeof addressRequestSchema>;
export type UpdateAddressRequest = z.infer<typeof updateAddressSchema>;
export type DeleteAddressRequest = z.infer<typeof deleteAddressSchema>;
