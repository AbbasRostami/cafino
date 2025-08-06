"use client";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "@/utils/formatters";
import { CommentItemProps } from "@/types/main/items-details/items-details";
import { useState } from "react";

export const CommentItem = ({
  comment,
  onReplyClick,
  activeReplyId,
  onReplySubmit,
}: CommentItemProps) => {
  console.log("ksfjdkxhdskla", comment);

  const [replyText, setReplyText] = useState("");

  const handleReplyClick = (id: string) => {
    onReplyClick(id);
    setReplyText("");
  };

  const handleReplySubmit = (parentId: string) => {
    const payload = {
      text: replyText,
      itemId: comment?.itemId,
      parentId,
    };
    onReplySubmit(payload);
    setReplyText("");
  };

  const renderReplyInput = (parentId: string) => (
    <div className="mt-3 space-y-2 flex flex-col items-end gap-2">
      <Textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="پاسخ خود را بنویسید..."
        className="min-h-[80px] bg-white/80 dark:bg-gray-900/30 border border-amber-300 dark:border-amber-700 text-sm"
      />
      <Button
        size="sm"
        className="bg-amber-500 hover:bg-amber-600 text-white"
        onClick={() => handleReplySubmit(parentId)}
      >
        ارسال پاسخ
      </Button>
    </div>
  );

  return (
    <AccordionItem
      dir="rtl"
      value={comment.id}
      className="overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-amber-100 dark:border-amber-800/50 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      {/* کامنت اصلی */}
      <div className="p-5 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {comment.user.first_name[0]}
                {comment.user.last_name[0]}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-gray-800 dark:text-white">
                  {comment.user.first_name} {comment.user.last_name}
                </p>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {formatDate(comment.created_at)}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 shadow-sm">
                <StarIcon className="w-4 h-4 fill-current" />
                {comment?.star}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed">
              {comment.text}
            </p>

            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-amber-600 dark:text-amber-400"
              onClick={() => handleReplyClick(comment.id)}
            >
              پاسخ
            </Button>
          </div>
          {activeReplyId === comment.id && renderReplyInput(comment.id)}
        </div>
      </div>

      {/* پاسخ‌ها */}
      {(comment.children ?? []).length > 0 && (
        <>
          <AccordionTrigger className="text-sm px-5 py-2 text-amber-600 dark:text-amber-400">
            {`مشاهده ${comment?.children?.length} پاسخ`}
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 space-y-4 border-t pt-2 border-amber-200 dark:border-amber-800/30">
            {comment?.children?.map((reply: any) => (
              <div
                key={reply.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-amber-100 dark:border-amber-700"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
                      {reply.user.first_name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">
                        {reply.user.first_name} {reply.user.last_name}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-amber-600 dark:text-amber-400"
                    onClick={() => handleReplyClick(reply.id)}
                  >
                    پاسخ
                  </Button>
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
                  {reply.text}
                </p>
                {activeReplyId === reply.id && renderReplyInput(reply.id)}
              </div>
            ))}
          </AccordionContent>
        </>
      )}
    </AccordionItem>
  );
};
