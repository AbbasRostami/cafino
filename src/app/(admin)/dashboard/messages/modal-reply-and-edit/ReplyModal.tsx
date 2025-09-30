"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send, X, Mail, Phone, Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ReplyModalProps } from "@/types/admin";
import { useReplyToContact } from "@/services";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ReplyFormDataMessages, replySchema } from "@/schemas/admin";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useState } from "react";

export default function ReplyModal({
  isOpen,
  onClose,
  contact,
}: ReplyModalProps) {
  const isMobile = useIsMobile();
  const { mutate: replyToContact, isPending } = useReplyToContact();
  const [replyMethod, setReplyMethod] = useState<"email" | "phone">("email");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyFormDataMessages>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      subject: "",
      message: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: ReplyFormDataMessages) => {
    if (!contact) return;

    replyToContact(
      {
        id: contact.id,
        data,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!contact) return null;

  const ModalContent = () => (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
          پاسخ به: {contact?.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {contact?.email} • {contact?.phone}
        </p>

        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-900 dark:text-white">
            روش پاسخ‌گویی
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                replyMethod === "email"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setReplyMethod("email")}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`p-2 rounded-full ${
                    replyMethod === "email"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <Mail
                    className={`h-6 w-6 ${
                      replyMethod === "email"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium ${
                    replyMethod === "email"
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  ایمیل
                </span>
              </div>
              {replyMethod === "email" && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            <div
              className={`relative rounded-xl border-2 p-4 cursor-not-allowed opacity-60 ${
                replyMethod === "phone"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => {
                toast.info("به زودی قابلیت پاسخ از طریق تلفن اضافه خواهد شد");
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`p-2 rounded-full ${
                    replyMethod === "phone"
                      ? "bg-amber-100 dark:bg-amber-900/30"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <Phone
                    className={`h-6 w-6 ${
                      replyMethod === "phone"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium ${
                    replyMethod === "phone"
                      ? "text-amber-700 dark:text-amber-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  تلفن
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            موضوع پاسخ
          </label>
          <Input
            {...register("subject")}
            placeholder="موضوع پاسخ را وارد کنید"
            className="h-12 text-right"
            aria-invalid={errors?.subject ? "true" : "false"}
          />
          {errors?.subject && (
            <p className="text-sm text-red-500">{errors?.subject?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            متن پاسخ
          </label>
          <Textarea
            {...register("message")}
            placeholder="متن پاسخ خود را اینجا بنویسید..."
            className="min-h-32 text-right resize-none"
            aria-invalid={errors?.message ? "true" : "false"}
          />
          {errors?.message && (
            <p className="text-sm text-red-500">{errors?.message.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="hidden md:flex"
          >
            <X className="h-4 w-4 ml-2" />
            انصراف
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال ارسال...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {replyMethod === "email"
                  ? "ارسال پاسخ از طریق ایمیل"
                  : "ارسال پاسخ از طریق تلفن"}
              </div>
            )}
          </Button>
        </div>
      </form>
    </MotionDiv>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleClose}>
        <DrawerContent className="border-none max-h-[90vh] scrollbar-hide">
          <DrawerHeader>
            <VisuallyHidden>
              <DrawerTitle>پاسخ به پیام</DrawerTitle>
              <DrawerDescription>پاسخ به پیام</DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            <ModalContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent showCloseButton={false} className="max-w-2xl">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>پاسخ به پیام</DialogTitle>
            <DialogDescription>پاسخ به پیام</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
}
