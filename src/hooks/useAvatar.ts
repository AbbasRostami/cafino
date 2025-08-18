import { useState } from "react";
import { useUpdateImage, useRemoveImage } from "@/services";
import { toast } from "sonner";

export const useAvatar = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { mutate: updateImage, isPending: isUpdatingImage } = useUpdateImage();
  const { mutate: removeImage, isPending: isRemovingImage } = useRemoveImage();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("فقط فرمت‌های JPG، PNG و WebP مجاز هستند");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم تصویر نباید بیشتر از ۲ مگابایت باشد");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.onerror = () => {
        toast.error("خطا در خواندن فایل");
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      updateImage(formData, {
        onSuccess: () => {
          setAvatarPreview(null);
        },
        onError: () => {
          setAvatarPreview(null);
        },
      });
    } catch (error) {
      toast.error("خطا در آپلود تصویر");
      setAvatarPreview(null);
    }
  };

  const handleRemoveImage = () => {
    removeImage();
  };

  return {
    avatarPreview,
    isUpdatingImage,
    isRemovingImage,
    handleAvatarChange,
    handleRemoveImage,
  };
};
