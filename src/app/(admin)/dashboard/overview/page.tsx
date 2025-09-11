"use client";

import {
  CommentsMetrics,
  ItemsMetrics,
  LastestComments,
  OrderMetrics,
  RevenueMetrics,
  Statistics,
  UsersMetrics,
} from "./components";
import { useAdminOverview } from "@/services";
import {
  StatisticsSkeleton,
  UsersMetricsSkeleton,
  OrderMetricsSkeleton,
  RevenueMetricsSkeleton,
  ItemsMetricsSkeleton,
  CommentsMetricsSkeleton,
  LatestCommentsSkeleton,
} from "@/components/skeleton";

export default function Overview() {
  const { data, isLoading } = useAdminOverview();

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
          {isLoading ? (
            <StatisticsSkeleton />
          ) : (
            <Statistics
              data={{
                totalComments: data?.comment?.total,
                acceptedComments: data?.comment?.accepted,
                totalUsers: data?.user?.total,
                newUsersThisMonth: data?.user?.newUsersThisMonth,
                totalOrder: data?.order?.total,
                activeOrder: data?.order?.active,
                grossSales: data?.revenue?.total?.grossSales,
                netRevenue: data?.revenue?.total?.netRevenue,
              }}
            />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <UsersMetricsSkeleton />
          ) : (
            <UsersMetrics data={data?.user} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <OrderMetricsSkeleton />
          ) : (
            <OrderMetrics data={data?.order} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <RevenueMetricsSkeleton />
          ) : (
            <RevenueMetrics revenue={data?.revenue} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <ItemsMetricsSkeleton />
          ) : (
            <ItemsMetrics data={data?.item} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <CommentsMetricsSkeleton />
          ) : (
            <CommentsMetrics data={data?.comment} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <LatestCommentsSkeleton />
          ) : (
            <LastestComments data={data?.comment} />
          )}
        </div>
      </div>
    </>
  );
}
