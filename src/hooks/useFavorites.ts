"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeleteFromFavorite } from "@/services";

interface UseFavoritesProps {
  initialLimit?: number;
}

export const useFavorites = ({ initialLimit = 6 }: UseFavoritesProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedLimit, setSelectedLimit] = useState(initialLimit);
  const [pendingDeleteInfo, setPendingDeleteInfo] = useState<{
    itemId: string;
    currentTotalItems: number;
  } | null>(null);

  const deleteFromFavoriteApi = useDeleteFromFavorite();
  const handleDeleteFavorite = (data: { itemId: string }) => {
    deleteFromFavoriteApi.mutate(data, {
      onSuccess: () => {
        if (
          pendingDeleteInfo &&
          pendingDeleteInfo.currentTotalItems === 1 &&
          pageParam > 1
        ) {
          const newPage = pageParam - 1;
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", newPage.toString());
          router.push(`?${params.toString()}`);
        }
      },
    });
  };

  const limitParam = Number(searchParams.get("limit")) || selectedLimit;
  const pageParam = Number(searchParams.get("page")) || 1;

  const handleLimitChange = (value: number) => {
    setSelectedLimit(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", value.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewProducts = () => {
    router.push("/menu");
  };

  return {
    limitParam,
    pageParam,
    selectedLimit,
    handleLimitChange,
    goToPage,
    handleDeleteFavorite,
    handleViewProducts,
    isPending: deleteFromFavoriteApi.isPending,
  };
};
