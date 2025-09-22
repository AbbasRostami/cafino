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
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [acceptFilter, setAcceptFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { data, isLoading: isLoadingOverview } = useCommentOverview();
  const { comments, isLoading, total } = useGetCommentsAdmin({
    page: currentPage,
    limit: currentLimit,
    accept:
      acceptFilter === "true"
        ? true
        : acceptFilter === "false"
        ? false
        : undefined,
    sortBy: sortBy || undefined,
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
    setAcceptFilter(newAccept);
    setCurrentPage(1);
  };

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const headerProps = useMemo(
    () => ({
      title: "لیست کامنت‌ها",
      icon: <MessageCircleCode size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row mt-2 md:mt-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortByChange}>
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
              value={acceptFilter}
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
    [sortBy, handleSortByChange, acceptFilter, handleAcceptFilterChange]
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
    </>
  );
}
