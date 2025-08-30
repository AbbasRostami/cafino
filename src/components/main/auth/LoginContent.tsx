"use client";

import React from "react";
import { OtpInputForm } from "./OtpInputForm";
import { PhoneInputForm } from "./PhoneInputForm";
import Image from "next/image";
import LogoDark from "./../../../assets/Logo/4.png";
import LogoLight from "./../../../assets/Logo/3.png";
import { LoginContentProps } from "@/types/main";

export const LoginContent: React.FC<LoginContentProps> = ({
  step,
  isSendOTPLoading,
  isVerifyOTPLoading,
  isResendOTPLoading,
  phoneValue,
  handleSendOTP,
  handleVerifyOTP,
  handleResendOTP,
  goBackToPhone,
  resendTimer,
  formatTime,
}) => {
    
  const LogoComponent = () => (
    <div className="flex flex-col items-center gap-4 mb-3">
      <Image
        src={LogoDark}
        alt="Logo Website"
        width={150}
        className="block dark:hidden"
      />
      <Image
        src={LogoLight}
        alt="Logo Website"
        width={150}
        className="hidden dark:block"
      />
    </div>
  );

  return (
    <div className="relative p-6 rounded-2xl shadow-2xl bg-white/90 dark:bg-gray-900/90 overflow-hidden">
      <div className="relative z-10">
        <LogoComponent />
        {step === "phone" ? (
          <PhoneInputForm
            onSubmit={handleSendOTP}
            isLoading={isSendOTPLoading}
          />
        ) : (
          <OtpInputForm
            phoneNumber={phoneValue}
            onSubmit={handleVerifyOTP}
            onResend={handleResendOTP}
            onBack={goBackToPhone}
            isVerifyOTPLoading={isVerifyOTPLoading}
            isResendLoading={isResendOTPLoading}
            resendTimer={resendTimer}
            formatTime={formatTime}
          />
        )}
      </div>
    </div>
  );
};
