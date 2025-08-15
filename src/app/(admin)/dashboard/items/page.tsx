"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetItemsAdmin } from "@/services";
import { ItemFormModal } from "@/app/(admin)/dashboard/items/AddandEditModal/ItemFormModal";
import { useDebounce } from "use-debounce";
import { columns } from "./columns";

export default function Items() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [debouncedSearch] = useDebounce(search, 500);
  const { items, isLoading, total } = useGetItemsAdmin({
    page: currentPage,
    limit: currentLimit,
    search: debouncedSearch,
  });

  const headerProps = useMemo(
    () => ({
      title: "لیست محصولات",
      icon: <ShoppingBag size={30} />,
      showColumnVisibility: true,
      actions: (
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
      ),
    }),
    []
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
          currentPage,
          currentLimit,
          setEditingItem,
          setIsModalOpen,
        })}
        isLoading={isLoading}
        headerProps={headerProps}
        emptyStateMessage="هیچ محصولی یافت نشد"
        emptyStateDescription="برای افزودن محصول، روی دکمه افزودن کلیک کنید"
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
        searchValue={search}
        onSearchChange={setSearch}
      />

      <ItemFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={editingItem}
      />
    </div>
  );
}
