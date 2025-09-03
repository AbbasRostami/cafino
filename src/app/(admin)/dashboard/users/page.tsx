"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { Users as UsersIcon } from "lucide-react";

import { columns } from "./columns";
import { useGetUserListAdmin } from "@/services/user/useGetUserListAdmin";
import {
  useAddUserToBlacklist,
  useChangeUserPermission,
  useDeleteUser,
} from "@/services";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { users, isLoading, total } = useGetUserListAdmin({
    page: currentPage,
    limit: currentLimit,
  });
  const {
    mutate: deleteUser,
    isPending: isDeleting,
    variables: deleteVars,
  } = useDeleteUser();

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
  console.log(users);

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
        deleteUser,
        isDeleting,
        deleteVars,
        changePermission,
        isChangingPermission,
        changePermissionVars,
        addToBlacklist,
        isAddingToBlacklist,
        addToBlacklistVars,
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
