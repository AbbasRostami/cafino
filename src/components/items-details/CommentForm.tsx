"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { commentFormSchema } from "@/schemas/main/items-deatils/items-details";
import { CommentFormProps } from "@/types/main/items-details/items-details";
import { MotionDiv } from "@/utils/MotionWrapper";

export const CommentForm = ({
  itemId,
  onSubmit,
  isPending,
}: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      itemId,
      text: "",
      star: 1,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          امتیاز شما
        </label>
        <Controller
          name="star"
          control={control}
          defaultValue={1}
          rules={{ required: "لطفاً امتیاز دهید" }}
          render={({ field }) => (
            <>
              <Slider
                dir="rtl"
                min={1}
                max={5}
                step={1}
                value={[field.value]}
                onValueChange={(val) => field.onChange(val[0])}
                className="text-amber-400"
              />
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                امتیاز انتخاب‌شده: {field.value.toLocaleString("fa-IR")}
              </div>
            </>
          )}
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          نظر شما
        </label>

        <Textarea
          {...register("text")}
          placeholder="نظر خود را در مورد این محصول بنویسید..."
          className={cn(
            "min-h-[150px] bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border",
            errors.text
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          )}
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex justify-end text-xs text-muted-foreground mb-1">
          {50 - (watch("text")?.length || 0)} کاراکتر باقی مانده
        </div>

        {errors.text && (
          <p className="text-red-500 text-sm">{errors.text.message}</p>
        )}
      </div>

      <MotionDiv whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          disabled={!isValid}
          onClick={handleSubmit(handleFormSubmit)}
          className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg"
        >
          {isPending ? "در حال ثبت نظر..." : "ثبت نظر"}
        </Button>
      </MotionDiv>
    </div>
  );
};
