"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useAddCommentAdmin } from "@/services";
import { CommentSchema, FormValues } from "@/schemas/admin";
import { CommentFormAdminProps } from "@/types/admin";
import { Spinner } from "@/components/ui/spinner";

export function CommentForm({
  itemId,
  parentId,
  parentComment,
  closeModal,
}: CommentFormAdminProps) {
  const { mutate: addComment, isPending } = useAddCommentAdmin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(CommentSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    addComment(
      { text: data.text, itemId, parentId },
      {
        onSuccess: () => {
          reset();
          closeModal();
        },
      }
    );
  };

  const handelKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="space-y-4">
      {parentComment && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {parentComment.user?.username?.[0] || "U"}
            </div>
            <span className="font-medium text-gray-800 dark:text-white">
              {parentComment.user?.username || "کاربر"}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
            {parentComment.text}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Textarea
          placeholder="نظر خود را بنویسید..."
          {...register("text")}
          className={`min-h-[10px] max-h-[100px] overflow-y-auto scrollbar-hide ${
            errors?.text ? "border-red-500" : ""
          } transition-all duration-200`}
          rows={5}
          onKeyDown={handelKeyDown}
        />
        {errors?.text && (
          <p className="text-red-500 text-sm">{errors?.text?.message}</p>
        )}
        <div className="flex justify-end gap-2 w-full">
          <Button variant="outline" onClick={closeModal}>
            انصراف
          </Button>
          <Button
            type="submit"
            disabled={!isDirty || isPending || !isValid}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600   text-white shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-lg w-1/2"
          >
            {isPending ? (
              <>
                <Spinner />
                درحال ارسال...
              </>
            ) : (
              <>
                <Send />
                ارسال نظر
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
