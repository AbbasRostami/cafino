"use client";

import { useUserProfile } from "@/services/update";
import { useGetFavorites } from "@/services/Favorite";
import { useGetOrders } from "@/services/Orders";
import { useGetAddresses } from "@/services/address";
import moment from "moment-jalaali";
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
} from "@/components/skeleton/Profile/overview";
import { OrdersResponse, User } from "@/types/Profile";
import { FavoriteListResponse } from "@/types/Profile/favorite";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function OverviewPage() {
  const { data: user, isLoading: userLoading } = useUserProfile();
  const { data: ordersData, isLoading: ordersLoading } = useGetOrders(100, 1);
  const { data: favoritesData, isLoading: favoritesLoading } = useGetFavorites(
    100,
    1
  );
  const { data: addressesData, isLoading: addressesLoading } =
    useGetAddresses();

  const activeOrders =
    ordersData?.data?.filter((order: any) => order.status === "processing")
      .length || 0;

  const totalPayments =
    ordersData?.data?.reduce(
      (sum: number, order: any) => sum + order.payment_amount,
      0
    ) || 0;

  const favoriteItems = favoritesData?.data?.length || 0;
  const savedAddresses = addressesData?.data?.length || 0;

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-4 bg-gradient-to-br from-rose-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {userLoading ? <HeaderSkeleton /> : <Header user={user as User} />}

      {userLoading || ordersLoading || favoritesLoading || addressesLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <StatsCards
          activeOrders={activeOrders}
          totalPayments={totalPayments}
          favoriteItems={favoriteItems}
          savedAddresses={savedAddresses}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {ordersLoading ? (
          <RecentOrdersSkeleton />
        ) : (
          <RecentOrders ordersData={ordersData as OrdersResponse} />
        )}

        {favoritesLoading ? (
          <PopularProductsSkeleton />
        ) : (
          <PopularProducts
            favoritesData={favoritesData as FavoriteListResponse}
          />
        )}
      </div>

      {userLoading ? <PromotionalBannerSkeleton /> : <PromotionalBanner />}

      {userLoading ? <QuickActionsSkeleton /> : <QuickActions />}
    </div>
  );
}
