"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/utils";
import { commentFormSchema, CommentFormData } from "@/schemas/main";
import { MotionDiv } from "@/utils/MotionWrapper";

export const CommentForm = ({
  itemId,
  onSubmit,
  isPending,
}: {
  itemId: string;
  onSubmit: (data: CommentFormData & { itemId: string }) => void;
  isPending: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<CommentFormData>({
    mode: "onChange",
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      text: "",
      star: 1,
    },
  });

  const handleFormSubmit = (data: CommentFormData) => {
    onSubmit({ ...data, itemId });
    reset();
  };

  const textLength = watch("text")?.length || 0;
  const maxLength = 50;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          امتیاز شما
        </label>
        <Controller
          name="star"
          control={control}
          render={({ field }) => (
            <div className="space-y-3">
              <Slider
                dir="rtl"
                min={1}
                max={5}
                step={1}
                value={[field?.value]}
                onValueChange={(val) => field?.onChange(val[0])}
                className="text-amber-400"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  امتیاز انتخاب‌شده: {field?.value}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={cn(
                        "text-lg",
                        star <= field?.value
                          ? "text-amber-500"
                          : "text-gray-300"
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        />
        {errors?.star && (
          <p className="text-red-500 text-sm">{errors?.star?.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          نظر شما
        </label>
        <Textarea
          {...register("text")}
          placeholder="نظر خود را در مورد این محصول بنویسید..."
          className={cn(
            "min-h-[150px] bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border resize-none",
            errors.text
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:border-amber-500"
          )}
        />

        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {maxLength - textLength} کاراکتر باقی مانده
          </div>
          {errors?.text && (
            <p className="text-red-500 text-sm">{errors?.text?.message}</p>
          )}
        </div>
      </div>

      <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={!isValid || isPending}
          onClick={handleSubmit(handleFormSubmit)}
          className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "در حال ثبت نظر..." : "ثبت نظر"}
        </Button>
      </MotionDiv>
    </div>
  );
};
