"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { User } from "lucide-react";
import { columns } from "./columns";
import { useGetBlacklist, useRemoveUserFromBlacklist } from "@/services";

export default function Blacklist() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const { blacklist, isLoading, total } = useGetBlacklist({
    page: filters.page,
    limit: filters.limit,
  });

  const {
    mutate: removeFromBlacklist,
    isPending: isRemoving,
    variables: removingVars,
  } = useRemoveUserFromBlacklist();
  const headerProps = useMemo(
    () => ({
      title: "لیست سیاه",
      icon: <User size={30} />,
      showColumnVisibility: true,
    }),
    []
  );

  return (
    <DataTable
      data={blacklist}
      columns={columns({
        currentPage: filters.page,
        currentLimit: filters.limit,
        removeFromBlacklist,
        isRemoving,
        removingVars,
      })}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ کاربری در لیست سیاه یافت نشد"
      emptyStateDescription="کاربران مسدود شده در اینجا نمایش داده خواهند شد"
      enablePagination={true}
      page={filters.page}
      limit={filters.limit}
      totalCount={total}
      onPageChange={(page) => setFilters({ ...filters, page })}
      onLimitChange={(limit) => {
        setFilters({ ...filters, limit });
        setFilters({ ...filters, page: 1 });
      }}
      pageSizeOptions={[5, 10, 25, 50]}
      enableSearch={true}
      searchValue={filters.search || ""}
      onSearchChange={(search) => setFilters({ ...filters, search })}
    />
  );
}
