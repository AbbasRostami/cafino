"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetItemsAdmin } from "@/services";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import { columns } from "./columns";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";

const ItemFormModal = dynamic(
  () => import("@/app/(admin)/dashboard/items/add-and-edit-modal"),
  { ssr: false }
);

export default function Items() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "newest",
  });
  console.log(filters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [debouncedSearch] = useDebounce(filters.search, 500);

  const { items, isLoading, total } = useGetItemsAdmin({
    page: filters.page,
    limit: filters.limit,
    search: debouncedSearch,
    sortBy: filters.sortBy,
  });

  const headerProps = useMemo(
    () => ({
      title: "مدیریت محصولات",
      icon: <ShoppingBag size={30} />,
      showColumnVisibility: true,
      actions: (
        <>
          <div className="flex items-center gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters({ ...filters, sortBy: value })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="lowestPrice">قیمت پایین‌ترین</SelectItem>
                <SelectItem value="highestPrice">قیمت بالاترین</SelectItem>
                <SelectItem value="highestDiscount">تخفیف بالاترین</SelectItem>
                <SelectItem value="topRated">امتیاز بالاترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={20} className="ml-2" />
            افزودن محصول
          </Button>
        </>
      ),
    }),
    [filters.sortBy]
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <DataTable
        data={items}
        columns={columns({
          currentPage: filters.page,
          currentLimit: filters.limit,
          setEditingItem,
          setIsModalOpen,
        })}
        isLoading={isLoading}
        headerProps={headerProps}
        emptyStateMessage="هیچ محصولی یافت نشد"
        emptyStateDescription="برای افزودن محصول، روی دکمه افزودن کلیک کنید"
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
        onSearchChange={(search) => setFilters({ ...filters, search, page: 1 })}
      />

      <ItemFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={editingItem}
      />
    </div>
  );
}
