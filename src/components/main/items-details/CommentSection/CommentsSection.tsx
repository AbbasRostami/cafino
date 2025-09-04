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
import { CommentsSectionProps, SortBy } from "@/types/main";
import { CommentForm } from "./CommentForm";
import { MotionDiv } from "@/utils/MotionWrapper";
import { CommentSectionSkeleton } from "@/components/skeleton";
import { useAddComment, useAddReply } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { CommentItem } from "./CommentItem";

export const CommentsSection = ({
  itemId,
  comments,
  isLoading,
  limit,
  onLimitChange,
  onSortChange,
  onReplyClick,
  activeReplyId,
}: CommentsSectionProps) => {
  const { mutate: addComment, isPending } = useAddComment();
  const { mutate: addReply, isPending: isReplyPending } = useAddReply();
  const { isAuthenticated } = useAuthStore();

  const handleCommentSubmit = (data: any) => {
    if (!isAuthenticated) {
      toast.error("برای ثبت نظر ابتدا وارد حساب کاربری خود شوید");
      return;
    }
    const payload = {
      text: data?.text,
      itemId: data?.itemId,
      star: data?.star,
    };
    addComment(payload);
  };

  const handleReplySubmit = (data: any) => {
    if (!isAuthenticated) {
      toast.error("برای ثبت پاسخ ابتدا وارد حساب کاربری خود شوید");
      return;
    }
    const payload = {
      text: data?.text,
      itemId: data?.itemId,
      parentId: data?.parentId,
    };
    addReply(payload);
  };

  const hasMoreComments = (comments?.data?.total || 0) > limit;

  const renderCommentsList = () => {
    if (isLoading) {
      return <CommentSectionSkeleton />;
    }

    if (!comments?.data?.comments || comments?.data?.comments?.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <MessageCircle
            className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
            size={40}
          />
          <p>هنوز نظری برای این محصول ثبت نشده است.</p>
          <p className="mt-2">اولین نفری باشید که نظر می‌دهد!</p>
        </div>
      );
    }

    return (
      <>
        <Accordion
          dir="rtl"
          type="multiple"
          className="w-full space-y-4 text-right"
        >
          {comments?.data?.comments?.map((comment) => (
            <CommentItem
              key={comment?.id}
              comment={comment}
              onReplyClick={onReplyClick}
              activeReplyId={activeReplyId}
              onReplySubmit={handleReplySubmit}
              itemId={itemId}
              isReplyPending={isReplyPending}
            />
          ))}
        </Accordion>

        {hasMoreComments && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => onLimitChange(limit + 2)}
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                "در حال بارگذاری..."
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm">مشاهده بیشتر</span>
                  <Diff size={16} />
                </div>
              )}
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderSortControls = () => (
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
  );

  const renderAuthRequiredMessage = () => (
    <div className="text-center py-8">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-6">
        <MessageCircle className="mx-auto mb-4 text-amber-500" size={40} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          برای ثبت نظر وارد شوید
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          برای ثبت نظر و امتیازدهی به این محصول، ابتدا وارد حساب کاربری خود
          شوید.
        </p>
      </div>
    </div>
  );

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
            نظرات ({comments?.data?.total || 0})
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
            {renderSortControls()}
            {renderCommentsList()}
          </div>
        </TabsContent>

        <TabsContent value="add-comment" className="mt-6" dir="rtl">
          {isAuthenticated ? (
            <CommentForm
              itemId={itemId}
              onSubmit={handleCommentSubmit}
              isPending={isPending}
            />
          ) : (
            renderAuthRequiredMessage()
          )}
        </TabsContent>
      </Tabs>
    </MotionDiv>
  );
};
