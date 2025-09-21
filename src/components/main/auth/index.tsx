"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { useLoginLogic } from "@/hooks/useLoginLogic";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoginContent } from "./LoginContent";
import { LoginFormProps } from "@/types/main";

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
  } = useLoginLogic({ onSuccess, onClose: () => onOpenChange(false) });

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] border-none">
          <DrawerHeader className="text-center">
            <VisuallyHidden>
              <DrawerTitle>فرم ورود و ثبت نام</DrawerTitle>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto scrollbar-hide">
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
      <DialogContent className="!w-lg max-h-[90vh] p-0 border-none">
        <VisuallyHidden>
          <DialogTitle>فرم ورود و ثبت نام</DialogTitle>
        </VisuallyHidden>
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
