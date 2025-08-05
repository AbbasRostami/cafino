import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCreateDiscount } from "@/services/discounts";
import { BsPlusLg } from "react-icons/bs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";

const discountSchema = z
  .object({
    code: z.string().min(1, "کد تخفیف الزامی است"),
    discountType: z.enum(["percent", "amount"]),
    percent: z.union([z.number().min(0, "درصد نباید منفی باشد").max(100, "حداکثر 100٪"), z.nan()]).optional(),
    amount: z.union([z.number().min(0, "مقدار نباید منفی باشد"), z.nan()]).optional(),
    expires_in: z.number().min(1, "تاریخ انقضا باید حداقل ۱ روز باشد"),
    limit: z.number().min(0, "محدودیت نباید منفی باشد"),
  })
  .refine((data) => {
    if (data.discountType === "percent") {
      return typeof data.percent === "number" && !Number.isNaN(data.percent);
    }
    if (data.discountType === "amount") {
      return typeof data.amount === "number" && !Number.isNaN(data.amount);
    }
    return false;
  }, {
    message: "باید فقط یک مقدار متناسب با نوع تخفیف وارد شود",
    path: ["percent"], 
  });

export function CreateDiscountModal() {
  const [open, setOpen] = useState(false);
  const { mutate: createDiscount } = useCreateDiscount();

   const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
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
type DiscountFormType = z.infer<typeof discountSchema>;
  const discountType = watch("discountType");

  const onSubmit: SubmitHandler<DiscountFormType> = (data) => {
    const payload = {
      code: data.code,
      [data.discountType]:
        data.discountType === "percent" ? data.percent : data.amount,
      expires_in: data.expires_in,
      limit: data.limit,
    };
    createDiscount(payload);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-amber-500 text-white hover:bg-amber-600 p-2 rounded-lg flex items-center gap-2"
        >
          <BsPlusLg size={16} />
          افزودن کد تخفیف
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogClose asChild>
            <button
              className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="بستن"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
          <DialogTitle className="text-right flex items-center gap-2 text-xl">
            افزدون کد تخفیف
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* کد تخفیف */}
          <div className="flex flex-col gap-2">
            <Label>کد تخفیف</Label>
            <Input {...register("code")} />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}
          </div>

          {/* نوع تخفیف */}
          <div className="flex justify-between  gap-2">
            <div className="flex flex-col gap-4">
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
            {/* درصد */}
            {discountType === "percent" && (
              <div className="flex flex-col gap-2">
                <Label>درصد تخفیف</Label>
                <Input
                  type="number"
                  {...register("percent", {
                    setValueAs: (v) => (v === "" ? NaN : Number(v)),
                  })}
                />
                {errors.percent && (
                  <p className="text-red-500 text-sm">
                    {errors.percent.message}
                  </p>
                )}
              </div>
            )}

            {/* مبلغ */}
            {discountType === "amount" && (
              <div className="flex flex-col gap-2">
                <Label>مقدار تخفیف</Label>
                <Input
                  type="number"
                  {...register("amount", {
                    setValueAs: (v) => (v === "" ? NaN : Number(v)),
                  })}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            )}
          </div>
           <div className="flex justify-between items-center">

          {/* انقضا */}
          <div className="flex flex-col gap-2">
            <Label>انقضا (به روز)</Label>
            <Input
              type="number"
              {...register("expires_in", {
                valueAsNumber: true,
              })}
              />
            {errors.expires_in && (
              <p className="text-red-500 text-sm">
                {errors.expires_in.message}
              </p>
            )}
          </div>

          {/* محدودیت */}
          <div className="flex flex-col gap-2">
            <Label>محدودیت استفاده</Label>
            <Input
              type="number"
              {...register("limit", {
                valueAsNumber: true,
              })}
            />
            {errors.limit && (
              <p className="text-red-500 text-sm">{errors.limit.message}</p>
            )}
          </div>
            </div>

          <Button
            disabled={!isDirty}
            type="submit"
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            ذخیره کد تخفیف
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
