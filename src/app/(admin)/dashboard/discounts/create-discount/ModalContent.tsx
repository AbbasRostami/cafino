import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotionDiv, MotionForm } from "@/utils/MotionWrapper";
import { ModalContentDiscountProps } from "@/types/admin";
import { DiscountFormType, discountSchema } from "@/schemas/admin";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const ModalContentDiscount = ({
  onSubmit,
  isPending,
}: ModalContentDiscountProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setValue,
  } = useForm<DiscountFormType>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      code: "",
      discountType: "percent",
      percent: NaN,
      amount: NaN,
      expires_in: 1,
      limit: 1,
    },
  });
  const discountType = watch("discountType");

  return (
    <>
      <DialogHeader>
        <DialogClose asChild>
          <button
            className="absolute left-4 top-4 rounded-sm hidden md:block opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-label="بستن"
            disabled={isPending}
          >
            <X className="h-4 w-4" />
          </button>
        </DialogClose>
        <DialogTitle className="text-right  items-center hidden md:flex gap-2 text-xl text-amber-600 dark:text-amber-400">
          افزودن کد تخفیف
        </DialogTitle>
        <VisuallyHidden>
          <DialogDescription>افزودن کد تخفیف</DialogDescription>
        </VisuallyHidden>
      </DialogHeader>

      <MotionForm
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          className="flex flex-col gap-2"
        >
          <Label>کد تخفیف</Label>
          <Input {...register("code")} />
          {errors?.code && (
            <p className="text-red-500 text-sm">{errors?.code?.message}</p>
          )}
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          className="flex flex-col md:flex-row justify-between gap-4"
        >
          <div className="flex flex-col items-start gap-4 flex-1">
            <Label>نوع تخفیف</Label>
            <RadioGroup
              value={discountType}
              onValueChange={(value) =>
                setValue("discountType", value as "percent" | "amount")
              }
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="percent" id="percent" />
                <Label htmlFor="percent">درصدی</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="amount" id="amount" />
                <Label htmlFor="amount">مبلغ ثابت</Label>
              </div>
            </RadioGroup>
          </div>

          {discountType === "percent" && (
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="flex flex-col gap-2 flex-1"
            >
              <Label>درصد تخفیف</Label>
              <Input
                min={0}
                max={100}
                type="number"
                {...register("percent", {
                  setValueAs: (v) => (v === "" ? NaN : Number(v)),
                })}
              />
              {errors?.percent && (
                <p className="text-red-500 text-sm">
                  {errors?.percent?.message}
                </p>
              )}
            </MotionDiv>
          )}

          {discountType === "amount" && (
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="flex flex-col gap-2"
            >
              <Label>مقدار تخفیف</Label>
              <Input
                min={0}
                type="number"
                {...register("amount", {
                  setValueAs: (v) => (v === "" ? NaN : Number(v)),
                })}
              />
              {errors?.amount && (
                <p className="text-red-500 text-sm">
                  {errors?.amount?.message}
                </p>
              )}
            </MotionDiv>
          )}
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          className="flex gap-4"
        >
          <div className="flex flex-col gap-2 flex-1">
            <Label>انقضا (روز)</Label>
            <Input
              type="number"
              {...register("expires_in", { valueAsNumber: true })}
            />
            {errors?.expires_in && (
              <p className="text-red-500 text-sm">
                {errors?.expires_in?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <Label>محدودیت استفاده</Label>
            <Input
              type="number"
              {...register("limit", { valueAsNumber: true })}
            />
            {errors?.limit && (
              <p className="text-red-500 text-sm">{errors?.limit?.message}</p>
            )}
          </div>
        </MotionDiv>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          <Button
            disabled={!isDirty || isPending}
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-lg flex items-center gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            ذخیره کد تخفیف
          </Button>
        </MotionDiv>
      </MotionForm>
    </>
  );
};
