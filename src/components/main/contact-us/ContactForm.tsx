"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactFormSchema, ContactFormData } from "@/schemas/main";
import { useCreateContact } from "@/services";
import { MotionDiv } from "@/utils/MotionWrapper";

export const ContactForm: React.FC = () => {
  const { mutate: createContact, isPending } = useCreateContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: ContactFormData) => {
    createContact(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full  gap-8"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-6 py-8 border border-amber-200 dark:border-amber-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4"
        >
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <User className="h-4 w-4" />
              نام و نام خانوادگی
            </label>
            <Input
              {...register("name")}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              className="h-12 text-right"
              aria-invalid={errors?.name ? "true" : "false"}
            />
            {errors?.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors?.name?.message}
              </p>
            )}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              ایمیل
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className="h-12 text-right"
              aria-invalid={errors?.email ? "true" : "false"}
            />
            {errors?.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors?.email?.message}
              </p>
            )}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2 lg:col-span-2"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              شماره تلفن
            </label>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="09123456789"
              className="h-12 text-right"
              inputMode="numeric"
              maxLength={11}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }}
              aria-invalid={errors?.phone ? "true" : "false"}
            />
            {errors?.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors?.phone?.message}
              </p>
            )}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 lg:col-span-2"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              پیام شما
            </label>
            <Textarea
              {...register("message")}
              placeholder="پیام خود را اینجا بنویسید..."
              className="min-h-32 text-right resize-none"
              aria-invalid={errors?.message ? "true" : "false"}
            />
            {errors?.message && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors?.message?.message}
              </p>
            )}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Button
              type="submit"
              disabled={isPending || !isValid}
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  در حال ارسال...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  ارسال پیام
                </div>
              )}
            </Button>
          </MotionDiv>
        </form>
      </div>
    </MotionDiv>
  );
};
