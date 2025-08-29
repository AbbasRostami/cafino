"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { MessageCircleCode } from "lucide-react";
import {
  useAcceptComment,
  useGetCommentsAdmin,
  useRejectComment,
} from "@/services";
import { columns } from "./columns";

export default function Comments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { comments, isLoading, total } = useGetCommentsAdmin({
    page: currentPage,
    limit: currentLimit,
  });

  const {
    mutate: acceptComment,
    isPending: isAcceptingComment,
    variables: acceptingVars,
  } = useAcceptComment();
  const {
    mutate: rejectComment,
    isPending: isRejectingComment,
    variables: rejectingVars,
  } = useRejectComment();
  
  const headerProps = useMemo(
    () => ({
      title: "لیست کامنت‌ها",
      icon: <MessageCircleCode size={30} />,
      showColumnVisibility: true,
    }),
    []
  );

  return (
    <DataTable
      data={comments}
      columns={columns({
        currentPage,
        currentLimit,
        acceptComment,
        isAcceptingComment,
        acceptingVars,
        rejectComment,
        isRejectingComment,
        rejectingVars,
      })}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ کامنتی یافت نشد"
      emptyStateDescription="کامنت‌های جدید در اینجا نمایش داده خواهند شد"
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
