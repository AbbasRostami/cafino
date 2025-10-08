"use client";
import { useDeleteContact, useGetContacts } from "@/services";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";
import { Contact } from "@/types/admin";
import dynamic from "next/dynamic";

const ReplyModal = dynamic(() => import("./modal-reply-and-edit/ReplyModal"), {
  ssr: false,
});

const ViewMessageModal = dynamic(
  () => import("./modal-reply-and-edit/ViewMessageModal"),
  { ssr: false }
);

export default function Messages() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "newest",
    hasReply: "",
  });

  // Modal states
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const { contacts, isLoading, total } = useGetContacts({
    page: filters.page,
    limit: filters.limit,
    name: filters.search,
    sortBy: filters.sortBy,
    hasReply: filters.hasReply,
  });

  // delete contact
  const {
    mutate: deleteContact,
    isPending: isDeleting,
    variables: deletingVars,
  } = useDeleteContact();

  // Modal management functions
  const openViewModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsReplyModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedContact(null);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedContact(null);
  };

  const switchToReplyFromView = () => {
    setIsViewModalOpen(false);
    setIsReplyModalOpen(true);
  };

  // Filter change handlers
  const handleSortChange = (newSortBy: string) => {
    setFilters({ ...filters, sortBy: newSortBy });
  };

  const handleReplyFilterChange = (newHasReply: string) => {
    setFilters({ ...filters, hasReply: newHasReply });
  };

  const headerProps = useMemo(
    () => ({
      title: "پیام های   کاربران",
      icon: <MessageSquare size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0 gap-4">
          <div className="flex items-center gap-2">
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی بر اساس زمان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filters.hasReply}
              onValueChange={handleReplyFilterChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فیلتر بر اساس پاسخ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">پاسخ داده شده</SelectItem>
                <SelectItem value="false">بدون پاسخ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    }),
    [
      filters.sortBy,
      filters.hasReply,
      handleSortChange,
      handleReplyFilterChange,
    ]
  );

  return (
    <>
      <DataTable
        data={contacts}
        columns={columns({
          currentPage: filters.page,
          currentLimit: filters.limit,
          onViewMessage: openViewModal,
          onReplyToMessage: openReplyModal,
          deleteContact,
          isDeleting,
          deletingVars,
        })}
        isLoading={isLoading}
        headerProps={headerProps}
        emptyStateMessage="هیچ پیامی یافت نشد"
        emptyStateDescription="پیام‌های ارسالی از طریق فرم تماس با ما در اینجا نمایش داده می‌شوند"
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

      {/* Modals */}
      <ViewMessageModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        contact={selectedContact}
        onReply={switchToReplyFromView}
      />

      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={closeReplyModal}
        contact={selectedContact}
      />
    </>
  );
}
