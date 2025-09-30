"use client";

import { useLoginLogic } from "@/hooks/business/useLoginLogic";
import { LoginContent } from "@/components/main/auth/LoginContent";

export default function LoginAdminPage() {
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
      window.location.href = "/dashboard/overview";
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
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
    </div>
  );
}
