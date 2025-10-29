"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useState } from "react";
import { Users as UsersIcon, UserX, UserPlus, Activity } from "lucide-react";

import { columns } from "./columns";
import {
  useAddUserToBlacklist,
  useChangeUserPermission,
  useGetUserListAdmin,
  useUserOverview,
} from "@/services";
import { StatisticsSkeleton } from "@/components/skeleton";
import { StatisticsCard } from "../../components/common/StatisticsCard";

export default function Users() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading: isLoadingOverview } = useUserOverview();

  const {
    users,
    isLoading: isLoadingUsers,
    total,
  } = useGetUserListAdmin({
    page: filters.page,
    limit: filters.limit,
  });

  const {
    mutate: changePermission,
    isPending: isChangingPermission,
    variables: changePermissionVars,
  } = useChangeUserPermission();

  const {
    mutate: addToBlacklist,
    isPending: isAddingToBlacklist,
    variables: addToBlacklistVars,
  } = useAddUserToBlacklist();

  const headerProps = {
    title: "لیست کاربران",
    icon: <UsersIcon size={30} />,
    showColumnVisibility: true,
  };

  return (
    <>
      {isLoadingOverview ? (
        <StatisticsSkeleton cols={5} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          <StatisticsCard
            title="تعداد کل کاربران"
            icon={UsersIcon}
            value={data?.total || 0}
          />

          <StatisticsCard
            title="کاربران مسدود شده"
            icon={UserX}
            value={data?.blockedUsers || 0}
          />

          <StatisticsCard
            title="کاربران جدید این هفته"
            icon={UserPlus}
            value={data?.newUsersThisWeek || 0}
          />

          <StatisticsCard
            title="کاربران فعال ماهانه"
            icon={Activity}
            value={data?.monthlyActiveUsers || 0}
          />
          <StatisticsCard
            title="کاربران جدید این ماه"
            icon={UserPlus}
            value={data?.newUsersThisMonth || 0}
          />
        </div>
      )}

      <DataTable
        data={users}
        columns={columns({
          currentPage: filters.page,
          currentLimit: filters.limit,
          changePermission,
          isChangingPermission,
          changePermissionVars,
          addToBlacklist,
          isAddingToBlacklist,
          addToBlacklistVars,
        })}
        isLoading={isLoadingUsers}
        headerProps={headerProps}
        emptyStateMessage="هیچ کاربری یافت نشد"
        emptyStateDescription="کاربران جدید در اینجا نمایش داده خواهند شد"
        enablePagination={true}
        page={filters.page}
        limit={filters.limit}
        totalCount={total}
        onPageChange={(page) => setFilters({ ...filters, page })}
        onLimitChange={(limit) => {
          setFilters({ ...filters, limit, page: 1 });
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        enableSearch={true}
        searchValue={filters.search}
        onSearchChange={(search) => setFilters({ ...filters, search })}
      />
    </>
  );
}
