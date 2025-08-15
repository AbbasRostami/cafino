"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { Users as UsersIcon } from "lucide-react";

import { columns } from "./columns";
import { useGetUserListAdmin } from "@/services/user/useGetUserListAdmin";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { users, isLoading, total } = useGetUserListAdmin({
    page: currentPage,
    limit: currentLimit,
  });

  const headerProps = useMemo(
    () => ({
      title: "لیست کاربران",
      icon: <UsersIcon size={30} />,
      showColumnVisibility: true,
    }),
    []
  );

  return (
    <DataTable
      data={users}
      columns={columns({
        currentPage,
        currentLimit,
      })}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ کاربری یافت نشد"
      emptyStateDescription="کاربران جدید در اینجا نمایش داده خواهند شد"
      enablePagination={true}
      page={currentPage}
      limit={currentLimit}
      totalCount={total}
      onPageChange={setCurrentPage}
      onLimitChange={(limit) => {
        setCurrentLimit(limit);
        setCurrentPage(1);
      }}
      pageSizeOptions={[5, 10, 25, 50]}
      enableSearch={true}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
}
