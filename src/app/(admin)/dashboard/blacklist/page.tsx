"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { User } from "lucide-react";
import { columns } from "./columns";
import { useGetBlacklist, useRemoveUserFromBlacklist } from "@/services";

export default function Blacklist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { blacklist, isLoading, total } = useGetBlacklist({
    page: currentPage,
    limit: currentLimit,
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
        currentPage,
        currentLimit,
        removeFromBlacklist,
        isRemoving,
        removingVars,
      })}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ کاربری در لیست سیاه یافت نشد"
      emptyStateDescription="کاربران مسدود شده در اینجا نمایش داده خواهند شد"
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
