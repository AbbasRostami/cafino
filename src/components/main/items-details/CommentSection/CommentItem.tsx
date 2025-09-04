"use client";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatJalaliDate } from "@/utils/formatters";
import { CommentItemProps } from "@/types/main";
import { ReplyForm } from "./ReplyForm";
import { useState } from "react";

export const CommentItem = ({
  comment,
  onReplyClick,
  activeReplyId,
  onReplySubmit,
  itemId,
  isReplyPending,
}: CommentItemProps & { itemId: string }) => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);

  const handleReplyClick = (id: string) => {
    if (activeReplyId === id) {
      setIsReplyFormVisible(false);
      onReplyClick("");
    } else {
      setIsReplyFormVisible(true);
      onReplyClick(id);
    }
  };

  const handleReplySubmit = (data: any) => {
    onReplySubmit(data);
    setIsReplyFormVisible(false);
  };

  const handleCancelReply = () => {
    setIsReplyFormVisible(false);
    onReplyClick("");
  };

  const renderUserAvatar = (username: string, size: "sm" | "md" = "md") => {
    const sizeClasses =
      size === "sm" ? "w-10 h-10 text-sm" : "w-12 h-12 text-lg";
    return (
      <div
        className={`bg-gradient-to-br from-amber-500 to-orange-500 ${sizeClasses} rounded-full flex items-center justify-center text-white font-bold shadow-md`}
      >
        {username[0]}
      </div>
    );
  };

  const renderRating = (rating: number) => (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 shadow-sm">
      <StarIcon className="w-4 h-4 fill-current" />
      {rating}
    </span>
  );

  const renderReplyButton = (id: string, isActive: boolean) => (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
      onClick={() => handleReplyClick(id)}
    >
      {isActive ? "انصراف" : "پاسخ"}
    </Button>
  );

  const hasReplies = comment?.children && comment?.children?.length > 0;

  return (
    <AccordionItem
      dir="rtl"
      value={comment?.id}
      className="overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-amber-100 dark:border-amber-800/50 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="p-5 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {renderUserAvatar(comment?.user?.username)}
              <div className="space-y-1">
                <p className="font-bold text-gray-800 dark:text-white">
                  {comment?.user?.username}
                </p>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {formatJalaliDate(comment?.created_at)}
                </span>
              </div>
            </div>
            {comment?.star && renderRating(comment?.star)}
          </div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
              {comment.text}
            </p>
            {renderReplyButton(comment?.id, isReplyFormVisible)}
          </div>
          {isReplyFormVisible && activeReplyId === comment?.id && (
            <ReplyForm
              itemId={itemId}
              parentId={comment?.id}
              onSubmit={handleReplySubmit}
              isPending={isReplyPending}
              onCancel={handleCancelReply}
            />
          )}
        </div>
      </div>
      {hasReplies && (
        <>
          <AccordionTrigger className="text-sm px-5 py-3 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300">
            {`مشاهده ${comment?.children?.length} پاسخ`}
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 space-y-4 border-t pt-4 border-amber-200 dark:border-amber-800/30">
            {comment?.children?.map((reply: any) => (
              <div
                key={reply.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-amber-100 dark:border-amber-700"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {renderUserAvatar(
                        reply?.user?.username ||
                          `${reply?.user?.first_name || ""} ${
                            reply?.user?.last_name || ""
                          }`.trim() ||
                          "کاربر",
                        "sm"
                      )}
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white text-sm">
                          {reply?.user?.username ||
                            `${reply?.user?.first_name || ""} ${
                              reply?.user?.last_name || ""
                            }`.trim() ||
                            "کاربر"}
                        </p>
                      </div>
                    </div>
                    {renderReplyButton(reply?.id, activeReplyId === reply?.id)}
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {reply?.text}
                  </p>
                  {activeReplyId === reply?.id && (
                    <ReplyForm
                      itemId={itemId}
                      parentId={reply?.id}
                      onSubmit={handleReplySubmit}
                      isPending={isReplyPending}
                      onCancel={() => handleReplyClick(reply?.id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </AccordionContent>
        </>
      )}
    </AccordionItem>
  );
};
