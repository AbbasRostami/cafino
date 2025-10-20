"use client";

import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { useLoginLogic } from "@/hooks/business/useLoginLogic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoginContent, LogoComponent } from "./LoginContent";
import { LoginFormProps } from "@/types/main";
import { X } from "lucide-react";

export const LoginForm: React.FC<LoginFormProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const isMobile = useIsMobile();
  const {
    step,
    isSendOTPLoading,
    isVerifyOTPLoading,
    isResendOTPLoading,
    phoneValue,
    resendTimer,
    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,
    goBackToPhone,
    formatTime,
  } = useLoginLogic({
    onSuccess: () => {
      onSuccess?.();
      onOpenChange(false);
    },
    onClose: () => onOpenChange(false),
  });

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="border-none !h-auto !max-h-[90vh]">
          <DrawerHeader className="text-center pb-2">
            <VisuallyHidden>
              <DrawerTitle>فرم ورود و ثبت نام</DrawerTitle>
              <DrawerDescription>فرم ورود و ثبت نام</DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <LogoComponent />

            <LoginContent
              step={step}
              isSendOTPLoading={isSendOTPLoading}
              isVerifyOTPLoading={isVerifyOTPLoading}
              isResendOTPLoading={isResendOTPLoading}
              phoneValue={phoneValue}
              handleSendOTP={handleSendOTP}
              handleVerifyOTP={handleVerifyOTP}
              handleResendOTP={handleResendOTP}
              goBackToPhone={goBackToPhone}
              resendTimer={resendTimer}
              formatTime={formatTime}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="login-modal"
        showCloseButton={false}
        className="px-0  border-none"
      >
        <DialogHeader>
          <DialogClose asChild>
            <button
              aria-label="close"
              className="absolute left-4 top-4 cursor-pointer rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="w-4 h-4" />
            </button>
          </DialogClose>
        </DialogHeader>
        <VisuallyHidden>
          <DialogTitle>فرم ورود و ثبت نام</DialogTitle>
          <DialogDescription>فرم ورود و ثبت نام</DialogDescription>
        </VisuallyHidden>
        <LogoComponent />
        <LoginContent
          step={step}
          isSendOTPLoading={isSendOTPLoading}
          isVerifyOTPLoading={isVerifyOTPLoading}
          isResendOTPLoading={isResendOTPLoading}
          phoneValue={phoneValue}
          handleSendOTP={handleSendOTP}
          handleVerifyOTP={handleVerifyOTP}
          handleResendOTP={handleResendOTP}
          goBackToPhone={goBackToPhone}
          resendTimer={resendTimer}
          formatTime={formatTime}
        />
      </DialogContent>
    </Dialog>
  );
};
