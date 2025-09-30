"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Headset,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { contactFormSchema, ContactFormData } from "@/schemas/main";
import { useCreateContact } from "@/services";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const FloatingContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
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
        setIsOpen(false);
      },
    });
  };

  const ContactFormContent = () => (
    <div className="bg-white dark:bg-gray-950 rounded-lg">
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <User size={16} />
              نام و نام خانوادگی
            </label>
            <Input
              {...register("name")}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              className="h-10 text-right bg-gray-100"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Mail size={16} />
              ایمیل
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className="h-10 text-right bg-gray-100"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Phone size={16} />
              شماره تلفن
            </label>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="09123456789"
              className="h-10 text-right bg-gray-100"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <MessageSquare size={16} />
              پیام شما
            </label>
            <Textarea
              {...register("message")}
              placeholder="پیام خود را اینجا بنویسید..."
              className="min-h-20 text-right resize-none bg-gray-100"
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending || !isValid}
            className="w-full h-10 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال ارسال...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send size={16} />
                ارسال پیام
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="!h-14 !w-14 rounded-full transition-all duration-200 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl bg-white dark:bg-gray-800"
            >
              <Headset className="!h-7 !w-7 text-gray-700 dark:text-gray-300" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[100vh] border-0 bg-white dark:bg-gray-950">
            <DrawerHeader>
              <VisuallyHidden>
                <DrawerTitle>
                  <MessageSquare />
                  تماس با ما
                </DrawerTitle>
                <DrawerDescription>
                  پیام خود را ارسال کنید و ما در اسرع وقت با شما تماس خواهیم
                  گرفت
                </DrawerDescription>
              </VisuallyHidden>
            </DrawerHeader>
            <div className="px-4 pb-4 overflow-y-auto">
              <ContactFormContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="!h-14 !w-14 rounded-full transition-all duration-200 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl bg-white dark:bg-gray-800"
            >
              <Headset className="!h-7 !w-7 text-gray-700 dark:text-gray-300" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-96 p-0 border-none shadow-xl"
            align="end"
            side="left"
          >
            <div className="flex items-center justify-between p-4 border-b border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 shadow-md">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">
                    تماس با ما
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    پیام خود را ارسال کنید
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-amber-200 dark:hover:bg-amber-800"
                onClick={() => setIsOpen(false)}
              >
                <Minus size={16} />
              </Button>
            </div>

            <ContactFormContent />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
