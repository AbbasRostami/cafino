"use client";
import { MessageCircle, Diff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion } from "@/components/ui/accordion";
import { CommentsSectionProps } from "@/types/main/items-details/items-details";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { SortBy, useAddComment } from "@/services/Comments";
import { MotionDiv } from "@/utils/MotionWrapper";
import { CommentSectionSkeleton } from "../skeleton/main/item-details/CommentSection";

export const CommentsSection = ({
  itemId,
  comments,
  isLoading,
  limit,
  onLimitChange,
  onSortChange,
}: CommentsSectionProps) => {
  const { addComment, isPending } = useAddComment();

  const handleCommentSubmit = (data: any) => {
    const payload = {
      text: data.text,
      itemId: data?.itemId,
      star: data.star,
    };

    addComment(payload);
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white dark:border-gray-700"
    >
      <Tabs defaultValue="comments">
        <TabsList className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-sm grid w-full grid-cols-2">
          <TabsTrigger
            value="comments"
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white cursor-pointer"
          >
            نظرات ({comments?.data?.total})
          </TabsTrigger>
          <TabsTrigger
            value="add-comment"
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white cursor-pointer"
          >
            ثبت نظر
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="mt-6">
          <div className="space-y-8">
            <div className="flex justify-end mb-4">
              <Select
                dir="rtl"
                defaultValue="newest"
                onValueChange={(value) => {
                  onSortChange(value as SortBy);
                  onLimitChange(2);
                }}
              >
                <SelectTrigger className="w-48 justify-between">
                  <SelectValue placeholder="مرتب‌سازی بر اساس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">جدیدترین</SelectItem>
                  <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
                  <SelectItem value="highestRated">بالاترین امتیاز</SelectItem>
                  <SelectItem value="lowestRated">پایین‌ترین امتیاز</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <CommentSectionSkeleton />
            ) : (
              <Accordion
                dir="rtl"
                type="multiple"
                className="w-full space-y-4 text-right"
              >
                {comments?.data?.comments?.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReplyClick={() => {}}
                    activeReplyId={null}
                    onReplySubmit={() => {}}
                  />
                ))}
              </Accordion>
            )}
            {comments?.data?.page &&
              comments?.data?.page < comments?.data?.lastPage && (
                <div className="flex justify-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => onLimitChange(limit + 2)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "در حال بارگذاری..."
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-200">
                          مشاهده بیشتر
                        </span>
                        <Diff size={16} />
                      </div>
                    )}
                  </Button>
                </div>
              )}

            {comments?.data?.total === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageCircle
                  className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                  size={40}
                />
                <p>هنوز نظری برای این محصول ثبت نشده است.</p>
                <p className="mt-2">اولین نفری باشید که نظر می‌دهد!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="add-comment" className="mt-6" dir="rtl">
          <CommentForm
            itemId={itemId}
            onSubmit={handleCommentSubmit}
            isPending={isPending}
          />
        </TabsContent>
      </Tabs>
    </MotionDiv>
  );
};
