"use client";

import { Heart } from "lucide-react";
import { useAddToFavorite, useDeleteFromFavorite } from "@/services";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

type Props = {
  itemId: string;
  isFavorite: boolean;
  className?: string;
  iconSize?: number;
};

export const FavoriteToggleButton = ({
  itemId,
  isFavorite,
  className = "",
  iconSize = 24,
}: Props) => {
  const addToFavoriteApi = useAddToFavorite();
  const deleteFromFavoriteApi = useDeleteFromFavorite();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      return;
    }

    if (isFavorite) {
      deleteFromFavoriteApi.mutate({ itemId });
    } else {
      addToFavoriteApi.mutate({ itemId });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 ${className}`}
      aria-label="تغییر وضعیت علاقه‌مندی"
    >
      <Heart
        size={iconSize}
        className={` border-2 rounded-full p-1 transition-all duration-300 ${
          isFavorite ? "text-amber-500 border-amber-500 fill-current" : ""
        }`}
      />
    </button>
  );
};
