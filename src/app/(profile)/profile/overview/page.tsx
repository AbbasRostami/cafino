"use client";

import {
  Header,
  StatsCards,
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
import dynamic from "next/dynamic";

import {
  useUserProfile,
  useGetFavorites,
  useGetOrders,
  useProfileOverview,
} from "@/services";

const RecentOrders = dynamic(
  () => import("@/components/profile/overview").then((mod) => mod.RecentOrders),
  { ssr: false }
);

const PopularProducts = dynamic(
  () =>
    import("@/components/profile/overview").then((mod) => mod.PopularProducts),
  { ssr: false }
);

const PromotionalBanner = dynamic(
  () =>
    import("@/components/profile/overview").then(
      (mod) => mod.PromotionalBanner
    ),
  { ssr: false }
);

export default function OverviewPage() {
  const { data: user, isLoading: userLoading } = useUserProfile();
  const { data: ordersData, isLoading: ordersLoading } = useGetOrders({
    limit: 100,
    page: 1,
  });
  const { data: favoritesData, isLoading: favoritesLoading } = useGetFavorites({
    limit: 100,
    page: 1,
  });
  const { data: overviewData, isLoading: overviewLoading } =
    useProfileOverview();

  return (
    <div
      data-testid="profile-overview"
      className="space-y-8 p-4 sm:p-6 lg:p-4 bg-gradient-to-br from-rose-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-800 min-h-screen"
    >
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
          <PopularProducts favoritesData={favoritesData} />
        )}
      </div>

      {userLoading ? <PromotionalBannerSkeleton /> : <PromotionalBanner />}

      {userLoading ? <QuickActionsSkeleton /> : <QuickActions />}
    </div>
  );
}
