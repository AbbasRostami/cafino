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
  // Pagination and search states
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  // Filter states
  const [sortBy, setSortBy] = useState<string>("");
  const [hasReply, setHasReply] = useState<string>("");

  // Modal states
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const { contacts, isLoading } = useGetContacts({
    page: currentPage,
    limit: currentLimit,
    name: searchValue || undefined,
    sortBy: sortBy || undefined,
    hasReply:
      hasReply === "true" ? true : hasReply === "false" ? false : undefined,
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
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  const handleReplyFilterChange = (newHasReply: string) => {
    setCurrentPage(1);
    setHasReply(newHasReply);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1);
  };

  const headerProps = useMemo(
    () => ({
      title: "پیام های   کاربران",
      icon: <MessageSquare size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0 gap-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortChange}>
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
            <Select value={hasReply} onValueChange={handleReplyFilterChange}>
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
    [sortBy, hasReply, handleSortChange, handleReplyFilterChange]
  );

  return (
    <>
      <DataTable
        data={contacts}
        columns={columns({
          currentPage,
          currentLimit,
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
        page={currentPage}
        limit={currentLimit}
        totalCount={contacts.length}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        pageSizeOptions={[5, 10, 25, 50]}
        enableSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
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
