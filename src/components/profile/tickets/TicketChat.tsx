"use client";

import { useEffect, useRef } from "react";
import { TicketChatProps, TicketMessage } from "@/types/Profile";
import { useGetTicketMessages, useAddTicketMessage } from "@/services";
import { MotionDiv } from "@/utils/MotionWrapper";
import { formatJalaliDate } from "@/utils/formatters";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addMessageSchema,
  AddMessageFormData,
} from "@/schemas/profile/tickets";
import { TicketChatSkeleton } from "@/components/skeleton";
import Image from "next/image";

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

export default function TicketChat({ ticket, onBack }: TicketChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messagesData, isLoading } = useGetTicketMessages(ticket);
  const { mutate: addMessageMutation } = useAddTicketMessage(ticket);

  const messages = messagesData?.data?.messages || [];
  const isClosed = messagesData?.data?.tickets?.status === "closed";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddMessageFormData>({
    resolver: zodResolver(addMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (data: AddMessageFormData) => {
    if (isClosed) return;
    addMessageMutation({ message: data.message });
    reset();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const isUserMessage = (senderId: string) => {
    return senderId === messagesData?.data?.tickets?.user?.id;
  };

  const status = messagesData?.data?.tickets?.status as string;
  const config = statusConfig[status];

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-120px)] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h2 className="flex items-start gap-2 font-semibold text-gray-900 dark:text-gray-100">
              <span className="text-2xl"> • </span>
              {messagesData?.data?.tickets?.subject}
            </h2>
            <div className="flex items-center gap-2">
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
      </div>

      <div className="flex-1 max-h-[100vh] overflow-y-auto  p-4 space-y-4">
        {isLoading ? (
          <TicketChatSkeleton />
        ) : (
          messages?.map((msg: TicketMessage) => (
            <MotionDiv
              key={msg?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${
                isUserMessage(msg?.sender?.id) ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="hidden sm:flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center overflow-hidden">
                  {msg?.sender?.role === "admin" ? (
                    <Shield size={16} className="text-white" />
                  ) : (
                    <p className="text-white">{msg?.sender?.username[0]}</p>
                  )}
                </div>
              </div>

              <div
                className={`flex-1 max-w-xs sm:max-w-md ${
                  isUserMessage(msg?.sender?.id) ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`${
                    isUserMessage(msg?.sender?.id)
                      ? "justify-start "
                      : "justify-end"
                  } flex items-center gap-2 mb-1.5 `}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isUserMessage(msg?.sender?.id)
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
                </div>
                <div
                  className={`p-3 rounded-lg min-h-[40px] sm:max-w-lg max-w-64 break-words ${
                    isUserMessage(msg?.sender?.id)
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
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
              <div className="flex-1 max-w-full space-y-2">
                <Textarea
                  {...register("message")}
                  onKeyDown={handleKeyPress}
                  placeholder="پیام خود را بنویسید..."
                  className={`min-h-[40px] max-h-32 resize-none ${
                    errors?.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  disabled={isSubmitting}
                />
                {errors?.message && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            این تیکت بسته شده است و امکان ارسال پیام وجود ندارد
          </p>
        </div>
      )}
    </div>
  );
}
