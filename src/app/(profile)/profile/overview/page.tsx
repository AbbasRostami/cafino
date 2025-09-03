"use client";

import {
  Header,
  StatsCards,
  RecentOrders,
  PopularProducts,
  PromotionalBanner,
  QuickActions,
} from "@/components/profile/overview";
import {
  HeaderSkeleton,
  StatsCardsSkeleton,
  RecentOrdersSkeleton,
  PopularProductsSkeleton,
  PromotionalBannerSkeleton,
  QuickActionsSkeleton,
} from "@/components/skeleton";

import {
  useUserProfile,
  useGetFavorites,
  useGetOrders,
  useProfileOverview,
} from "@/services";

export default function OverviewPage() {
  const { data: user, isLoading: userLoading } = useUserProfile();
  const { data: ordersData, isLoading: ordersLoading } = useGetOrders(100, 1);
  const { data: favoritesData, isLoading: favoritesLoading } = useGetFavorites(
    100,
    1
  );
  const { data: overviewData, isLoading: overviewLoading } =
    useProfileOverview();
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-4 bg-gradient-to-br from-rose-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {userLoading ? <HeaderSkeleton /> : <Header user={user} />}

      {userLoading || ordersLoading || favoritesLoading || overviewLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <StatsCards data={overviewData?.data} />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {ordersLoading ? (
          <RecentOrdersSkeleton />
        ) : (
          <RecentOrders ordersData={ordersData} />
        )}

        {favoritesLoading ? (
          <PopularProductsSkeleton />
        ) : (
          <PopularProducts favoritesData={favoritesData?.items} />
        )}
      </div>

      {userLoading ? <PromotionalBannerSkeleton /> : <PromotionalBanner />}

      {userLoading ? <QuickActionsSkeleton /> : <QuickActions />}
    </div>
  );
}
