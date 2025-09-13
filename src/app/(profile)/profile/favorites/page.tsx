"use client";

import { useGetFavorites } from "@/services";
import { FavoritesSkeleton } from "@/components/skeleton";

import {
  FavoriteCard,
  FavoriteHeader,
  EmptyState,
  FilterAndPagination,
  FavoriteFooter,
} from "@/components/profile/favorites";

import { useFavorites } from "@/hooks/useFavorites";
import { Suspense } from "react";
import { FavoriteItem } from "@/types/Profile";
import { MotionAnimatePresence } from "@/utils/MotionWrapper";

const FavoritesPageClient = () => {
  const {
    limitParam,
    pageParam,
    handleLimitChange,
    goToPage,
    handleDeleteFavorite,
    handleViewProducts,
    isPending,
  } = useFavorites({ initialLimit: 6 });

  const {
    data: favoritesData,
    isLoading,
    total,
  } = useGetFavorites(limitParam, pageParam);

  const totalPages = Math?.max(1, Math?.ceil(total / limitParam));
  const currentPage = pageParam;

  if (isLoading) {
    return <FavoritesSkeleton />;
  }

  if (favoritesData?.length === 0) {
    return <EmptyState onViewProducts={handleViewProducts} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 rounded-xl">
      <FavoriteHeader />

      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 p-4 shadow-xl rounded-2xl">
        <MotionAnimatePresence>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoritesData?.map((favorite: FavoriteItem) => (
              <FavoriteCard
                key={favorite?.id}
                favorite={favorite}
                onDelete={(itemId) => handleDeleteFavorite({ itemId })}
                isPending={isPending}
              />
            ))}
          </div>
        </MotionAnimatePresence>

        <FilterAndPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          selectedLimit={limitParam}
          onLimitChange={handleLimitChange}
          totalItems={total}
        />

        <FavoriteFooter />
      </div>
    </div>
  );
};
export default function FavoritesPage() {
  return (
    <Suspense fallback={<div>Loading favorites...</div>}>
      <FavoritesPageClient />
    </Suspense>
  );
}
