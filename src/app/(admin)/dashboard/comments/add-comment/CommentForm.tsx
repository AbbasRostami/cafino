"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAddCommentAdmin } from "@/services";
import { CommentSchema, FormValues } from "@/schemas/admin";
import { CommentFormAdminProps } from "@/types/admin";

export function CommentForm({
  itemId,
  parentId,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textarea
        placeholder="نظر خود را بنویسید..."
        {...register("text")}
        className={`${
          errors?.text ? "border-red-500" : ""
        } transition-all duration-200`}
        rows={5}
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
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? "در حال ارسال..." : "ارسال نظر"}
        </Button>
      </div>
    </form>
  );
}
