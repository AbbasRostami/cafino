"use client";

import { AnimatePresence } from "framer-motion";
import { useGetFavorites } from "@/services/Favorite";
import { FavoritesSkeleton } from "@/components/skeleton/Profile/favorite/FavoritesSkeleton";

// Import modular components
import {
  FavoriteCard,
  FavoriteHeader,
  EmptyState,
  FilterAndPagination,
  FavoriteFooter,
} from "@/components/profile/favorites";

// Import custom hook
import { useFavorites } from "@/hooks/useFavorites";
import { Suspense } from "react";

const FavoritesPageClient = () => {
  // Custom hook for managing favorites state
  const {
    limitParam,
    pageParam,
    handleLimitChange,
    goToPage,
    handleDeleteFavorite,
    handleViewProducts,
  } = useFavorites({ initialLimit: 6 });

  // Data fetching
  const { data: favoritesData, isLoading } = useGetFavorites(
    limitParam,
    pageParam
  );

  // Calculate pagination
  const totalParam = Number(favoritesData?.total) || 0;
  const totalPages = Math.max(1, Math.ceil(totalParam / limitParam));
  const currentPage = pageParam;

  if (isLoading) {
    return <FavoritesSkeleton />;
  }

  if (favoritesData?.data?.length === 0) {
    return <EmptyState onViewProducts={handleViewProducts} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 rounded-xl">
      {/* Header Section */}
      <FavoriteHeader />

      {/* Main Content */}
      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 p-4 shadow-xl rounded-2xl">
        {/* Favorites List */}
        <AnimatePresence>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoritesData?.data?.map((favorite: any) => (
              <FavoriteCard
                key={favorite?.id}
                favorite={favorite}
                onDelete={(itemId) =>
                  handleDeleteFavorite(itemId, favoritesData?.data?.length)
                }
              />
            ))}
          </div>
        </AnimatePresence>

        {/* Filter and Pagination */}
        <FilterAndPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          selectedLimit={limitParam}
          onLimitChange={handleLimitChange}
          totalItems={totalParam}
        />

        {/* Footer */}
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
