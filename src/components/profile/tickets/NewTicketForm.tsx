"use client";

import { useCreateTicket } from "@/services";
import { MotionDiv } from "@/utils/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Send, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketSchema, CreateTicketFormData } from "@/schemas/profile";
import { NewTicketFormProps } from "@/types/Profile";

export default function NewTicketForm({ list, onCancel }: NewTicketFormProps) {
  const { mutate: createTicketMutation, isPending } = useCreateTicket();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: CreateTicketFormData) => {
    createTicketMutation(
      {
        subject: data?.subject,
        message: data?.message,
      },
      {
        onSuccess: () => {
          reset();
          list?.();
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full mb-16  "
    >
      <Card className="bg-white dark:bg-gray-900  border-gray-200 px-4 py-8 dark:border-gray-700 shadow-lg">
        <CardHeader className=" flex justify-between items-center px-0 md:px-4 text-center pb-4">
          <CardTitle className=" flex items-center gap-2 text-sm  md:text-xl font-bold text-gray-900 dark:text-gray-100">
            <MessageSquare size={20} className="mr-2" />
            ایجاد تیکت جدید
          </CardTitle>
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-fit "
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} className="ml-2" />
              بازگشت
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col xl:flex-row justify-between items-center gap-6 lg:gap-4 px-0 md:px-4">
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  موضوع تیکت
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  type="text"
                  {...register("subject")}
                  placeholder="موضوع تیکت خود را وارد کنید..."
                  className={`w-full ${
                    errors?.subject
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  maxLength={100}
                  onKeyDown={handleKeyPress}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {watchedValues?.subject?.length || 0}/50 کاراکتر
                  </p>
                  {errors?.subject && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {errors?.subject?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 max-w-md">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  پیام
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="پیام خود را به تفصیل بنویسید..."
                  className={`min-h-[120px] resize-none overflow-x-hidden break-words whitespace-normal text-wrap ${
                    errors?.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  maxLength={500}
                  onKeyDown={handleKeyPress}
                />

                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {watchedValues?.message?.length || 0}/500 کاراکتر
                  </p>
                  {errors?.message && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {errors?.message?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  <X size={16} className="ml-2" />
                  انصراف
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || !isValid}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                      در حال ایجاد...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="ml-2" />
                      ایجاد تیکت
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="flex-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
              نکات مهم:
            </h4>
            <ul className="text-sm font-medium text-justify  text-gray-700 dark:text-gray-300 space-y-2.5">
              <li>• موضوع تیکت را به صورت خلاصه و واضح بنویسید.</li>
              <li>• پیام خود را به تفصیل و با جزئیات کامل بنویسید.</li>
              <li>• تیم پشتیبانی در اسرع وقت پاسخ شما را خواهد داد.</li>
              <li>• از تیکت‌های قبلی خود برای پیگیری استفاده کنید.</li>
              <li>• در صورت امکان شماره سفارش یا شناسه مرتبط را درج کنید.</li>
              <li>• برای هر موضوع جداگانه یک تیکت جدید ثبت کنید.</li>
              <li>
                • از ارسال پیام‌های تکراری خودداری کنید تا روند بررسی سریع‌تر
                انجام شود.
              </li>

              <li>
                • از استفاده از کلمات نامناسب یا توهین‌آمیز خودداری نمایید.
              </li>
              <li>
                • وضعیت تیکت خود (باز، پاسخ داده شده، بسته) را از بخش تیکت ها
                پیگیری کنید.
              </li>
              <li>
                • در صورت برطرف شدن مشکل، وضعیت تیکت را به تیم اطلاع دهید.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
