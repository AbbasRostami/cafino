"use client";

import { useEffect, useRef } from "react";
import { TicketMessage } from "@/types/Profile";
import { useGetTicketMessages, useAddTicketMessage } from "@/services";
import { MotionDiv } from "@/utils/MotionWrapper";
import { formatJalaliDate } from "@/utils/formatters";
import { AlertCircle, CheckCircle, XCircle, Shield, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addMessageSchema,
  AddMessageFormData,
} from "@/schemas/profile/tickets";
import { AdminTicketChatSkeleton } from "@/components/skeleton/admin";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

interface AdminTicketChatModalProps {
  ticketId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; className: string }
> = {
  open: {
    label: "درحال بررسی",
    icon: <AlertCircle size={16} />,
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  answered: {
    label: "پاسخ داده شده",
    icon: <CheckCircle size={16} />,
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  closed: {
    label: "بسته شده",
    icon: <XCircle size={16} />,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
};

export default function AdminTicketChatModal({
  ticketId,
  isOpen,
  onClose,
}: AdminTicketChatModalProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { data: messagesData, isLoading } = useGetTicketMessages(
    ticketId || ""
  );
  const { mutate: addMessageMutation } = useAddTicketMessage(ticketId || "");

  const messages = messagesData?.data?.messages || [];
  const isClosed = messagesData?.data?.tickets?.status === "closed";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddMessageFormData>({
    resolver: zodResolver(addMessageSchema),
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (data: AddMessageFormData) => {
    if (isClosed || !ticketId) return;
    addMessageMutation({ message: data.message });
    reset();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const isAdminMessage = (senderRole: string) => {
    return senderRole === "admin";
  };

  const status = messagesData?.data?.tickets?.status;
  const config = statusConfig[status as string];

  const ChatContent = () => (
    <>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex  items-center gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl"> • </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {messagesData?.data?.tickets?.subject || "تیکت"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Badge
                  className={`flex items-center gap-1 text-sm ${
                    config?.className || ""
                  }`}
                >
                  {config?.icon}
                  {config?.label}
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatJalaliDate(
                    messagesData?.data?.tickets?.created_at as string
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <User size={16} />
              <span>{messagesData?.data?.tickets?.user?.username}</span>
          </div>
        </div>
      </div>

      <div className="flex-1  max-h-[210px] md:max-h-[360px] overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900">
        {isLoading ? (
          <AdminTicketChatSkeleton />
        ) : (
          messages?.map((msg: TicketMessage) => (
            <MotionDiv
              key={msg?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${
                isAdminMessage(msg?.sender?.role)
                  ? "flex-row"
                  : "flex-row-reverse"
              }`}
            >
              <div className="hidden sm:flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                    isAdminMessage(msg?.sender?.role)
                      ? "bg-gradient-to-br from-blue-500 to-purple-600"
                      : "bg-gradient-to-br from-amber-400 to-orange-500"
                  }`}
                >
                  {isAdminMessage(msg?.sender?.role) ? (
                    <Shield size={16} className="text-white" />
                  ) : (
                    <p className="text-white text-sm font-medium">
                      {msg?.sender?.username[0]}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex-1 max-w-xs sm:max-w-md  ${
                  isAdminMessage(msg?.sender?.role) ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-2 mb-1.5 ${
                    isAdminMessage(msg?.sender?.role)
                      ? "flex-row"
                      : "flex-row-reverse"
                  }`}
                >
                  {msg?.sender?.imageUrl ? (
                    <Image
                      src={msg?.sender?.imageUrl}
                      alt={msg?.sender?.username}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <p className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center overflow-hidden text-white">
                      {msg?.sender?.username[0]}
                    </p>
                  )}
                  <span className="text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                    {msg?.sender?.username}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg min-h-[40px] sm:max-w-lg max-w-64 break-words ${
                    isAdminMessage(msg?.sender?.role)
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap text-justify">
                    {msg?.message}
                  </p>
                </div>

                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                  {formatJalaliDate(msg?.created_at)}
                </span>
              </div>
            </MotionDiv>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {!isClosed ? (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                <Textarea
                  {...register("message")}
                  onKeyDown={handleKeyPress}
                  placeholder="پاسخ خود را بنویسید..."
                  className={`min-h-[40px] max-h-32 resize-none ${
                    errors?.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  disabled={isSubmitting}
                />

                {errors?.message && (
                  <p className="text-xs text-red-500 dark:text-red-400">
                    {errors?.message?.message}
                  </p>
                )}
              </div>
            </div>
            <p className="hidden md:block text-xs font-medium text-gray-600 dark:text-gray-300 mt-2">
              Enter برای ارسال • Shift+Enter برای خط جدید
            </p>
          </form>
        </div>
      ) : (
        <div className="p-4 flex justify-center items-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            این تیکت بسته شده است و امکان ارسال پیام وجود ندارد.
          </p>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="!h-full   p-0">
          <VisuallyHidden>
            <DrawerTitle>مشاهده تیکت</DrawerTitle>
            <DrawerDescription>مشاهده تیکت</DrawerDescription>
          </VisuallyHidden>
          <ChatContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="min-w-4xl h-[90vh] p-0 overflow-hidden"
      >
        <VisuallyHidden>
          <DialogTitle>مشاهده تیکت</DialogTitle>
          <DialogDescription>مشاهده تیکت</DialogDescription>
        </VisuallyHidden>
        <ChatContent />
      </DialogContent>
    </Dialog>
  );
}
