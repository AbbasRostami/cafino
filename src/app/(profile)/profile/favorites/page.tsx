"use client";

import { useState, useEffect } from "react";
import { useGetFavorites } from "@/services";
import { FavoritesSkeleton } from "@/components/skeleton";
import { GetFavoritesParams } from "@/types/Profile";

import {
  FavoriteCard,
  FavoriteHeader,
  EmptyState,
  FilterAndPagination,
  FavoriteFooter,
} from "@/components/profile/favorites";

import { FavoriteItem } from "@/types/Profile";
import { MotionAnimatePresence } from "@/utils/MotionWrapper";

export default function FavoritesPage() {
  const [filters, setFilters] = useState<GetFavoritesParams>({
    page: 1,
    limit: 6,
  });

  const handleFilterChange = (
    key: keyof GetFavoritesParams,
    value?: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const {
    data: favoritesData,
    isLoading,
    total,
    page,
    limit,
  } = useGetFavorites(filters);

  const totalPages = Math?.max(1, Math?.ceil(total / limit));
  const currentPage = page;

  useEffect(() => {
    if (
      !isLoading &&
      favoritesData?.length === 0 &&
      currentPage > 1 &&
      total > 0
    ) {
      handleFilterChange("page", currentPage - 1);
    }
  }, [favoritesData, currentPage, total, isLoading]);

  if (isLoading) {
    return <FavoritesSkeleton />;
  }

  if (favoritesData?.length === 0 && total === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 rounded-xl">
      <FavoriteHeader />

      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 p-4 shadow-xl rounded-2xl">
        <MotionAnimatePresence>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoritesData?.map((favorite: FavoriteItem) => (
              <FavoriteCard key={favorite?.id} favorite={favorite} />
            ))}
          </div>
        </MotionAnimatePresence>

        <FilterAndPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => handleFilterChange("page", page)}
          selectedLimit={limit}
          onLimitChange={(limit) => handleFilterChange("limit", limit)}
          totalItems={total}
        />

        <FavoriteFooter />
      </div>
    </div>
  );
}
