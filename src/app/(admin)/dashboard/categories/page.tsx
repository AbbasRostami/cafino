"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { ChartBarStacked } from "lucide-react";
import { useDeleteCategories, useGetCategoriesAdmin } from "@/services";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { CategoryModal } from "./add-with-edit-modal";

export default function Categories() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { categories, isLoading, total } = useGetCategoriesAdmin({
    page: currentPage,
    limit: currentLimit,
  });
  const {
    mutate: deleteCategory,
    isPending: isDeleting,
    variables: deletingVars,
  } = useDeleteCategories();

  const headerProps = useMemo(
    () => ({
      title: "لیست دسته‌بندی‌ها",
      icon: <ChartBarStacked size={30} />,
      showColumnVisibility: true,
      actions: (
        <CategoryModal
          initialData={null}
          trigger={
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300">
              افزودن دسته‌بندی
            </Button>
          }
        />
      ),
    }),
    []
  );

  return (
    <DataTable
      data={categories}
      columns={columns({
        currentPage,
        currentLimit,
        deleteCategory,
        isDeleting,
        deletingVars,
      })}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ دسته‌بندی یافت نشد"
      emptyStateDescription="برای افزودن دسته‌بندی، روی دکمه افزودن کلیک کنید"
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
      searchPlaceholder="جستجو در عنوان ها...."
    />
  );
}
