"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/utils";
import { replyFormSchema, ReplyFormData } from "@/schemas/main";
import { MotionDiv } from "@/utils/MotionWrapper";
import { ReplyFormProps } from "@/types/main";

export const ReplyForm = ({
  itemId,
  parentId,
  onSubmit,
  isPending,
  onCancel,
}: ReplyFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ReplyFormData>({
    mode: "onChange",
    resolver: zodResolver(replyFormSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleFormSubmit = (data: ReplyFormData) => {
    onSubmit({ ...data, itemId, parentId });
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const textLength = watch("text")?.length || 0;
  const maxLength = 50;

  return (
    <MotionDiv
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 space-y-3 p-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/30"
    >
      <div className="space-y-2">
        <Textarea
          {...register("text")}
          maxLength={maxLength}
          placeholder="پاسخ خود را بنویسید..."
          className={cn(
            "min-h-[80px] bg-white/80 dark:bg-gray-900/30 border text-sm resize-none",
            errors.text
              ? "border-red-500 focus:border-red-500"
              : "border-amber-300 dark:border-amber-700 focus:border-amber-500"
          )}
        />
        {errors.text && (
          <p className="text-red-500 text-xs">{errors?.text?.message}</p>
        )}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{maxLength - textLength} کاراکتر باقی مانده</span>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCancel}
          disabled={isPending}
          className="text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 text-sm px-4 py-2"
        >
          انصراف
        </Button>
        <Button
          size="sm"
          disabled={!isValid || isPending}
          onClick={handleSubmit(handleFormSubmit)}
          className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 disabled:opacity-50"
        >
          {isPending ? "در حال ارسال..." : "ارسال پاسخ"}
        </Button>
      </div>
    </MotionDiv>
  );
};
