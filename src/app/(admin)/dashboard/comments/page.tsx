"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  MessageCircleCode,
  MessageSquare,
  XCircle,
} from "lucide-react";
import {
  useAcceptComment,
  useCommentOverview,
  useGetCommentsAdmin,
  useRejectComment,
} from "@/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";
import { StatisticsSkeleton } from "@/components/skeleton";
import { StatisticsCard } from "../../components/common/StatisticsCard";

export default function Comments() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    accept: "",
    sortBy: "newest",
  });
  const { data, isLoading: isLoadingOverview } = useCommentOverview();
  const { comments, isLoading, total } = useGetCommentsAdmin({
    page: filters.page,
    limit: filters.limit,
    accept:
      filters.accept === "true"
        ? true
        : filters.accept === "false"
        ? false
        : undefined,
    sortBy: filters.sortBy || undefined,
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

  const handleAcceptFilterChange = (newAccept: string) => {
    setFilters({ ...filters, accept: newAccept });
  };

  const handleSortByChange = (newSortBy: string) => {
    setFilters({ ...filters, sortBy: newSortBy });
  };

  const headerProps = useMemo(
    () => ({
      title: "لیست کامنت‌ها",
      icon: <MessageCircleCode size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row mt-2 md:mt-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={filters.sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
                <SelectItem value="highestRated">بالاترین امتیاز</SelectItem>
                <SelectItem value="lowestRated">پایین‌ترین امتیاز</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filters.accept}
              onValueChange={handleAcceptFilterChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="وضعیت تایید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">تایید شده</SelectItem>
                <SelectItem value="false">تایید نشده</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    }),
    [
      filters.sortBy,
      handleSortByChange,
      filters.accept,
      handleAcceptFilterChange,
    ]
  );

  return (
    <>
      {isLoadingOverview ? (
        <StatisticsSkeleton cols={3} rows={3} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            <StatisticsCard
              title="تعداد کل کامنت ها"
              icon={MessageSquare}
              value={data?.total || 0}
            />

            <StatisticsCard
              title="کامنت های تایید شده"
              icon={CheckCircle2}
              value={data?.accepted || 0}
            />

            <StatisticsCard
              title="کامنت های تایید نشده"
              icon={XCircle}
              value={data?.unaccepted || 0}
            />
          </div>
        </>
      )}
      <DataTable
        data={comments}
        columns={columns({
          currentPage: filters.page,
          currentLimit: filters.limit,
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
