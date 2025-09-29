"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { otpSchema } from "@/schemas/main";
import { cn } from "@/utils/utils";
import { OtpInputFormProps } from "@/types/main";

export const OtpInputForm: React.FC<OtpInputFormProps> = ({
  phoneNumber,
  onSubmit,
  onResend,
  onBack,
  isVerifyOTPLoading,
  resendTimer,
  formatTime,
  isResendLoading,
}) => {
  const { control, handleSubmit, watch, reset } = useForm<{ otp: string }>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
    mode: "onChange",
  });

  const otpValue = watch("otp", "");

  const handleFormSubmit = (data: { otp: string }) => {
    onSubmit(data.otp, phoneNumber);
  };

  const handleResend = () => {
    onResend();
  };

  const handleBack = () => {
    onBack();
    reset();
  };

  return (
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <h2 data-testid="otp-title" className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
          تایید کد
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed flex justify-center gap-1">
          کد تایید به شماره
          <strong data-testid="phone-number" className="text-amber-600 dark:text-amber-400">
            {phoneNumber}
          </strong>
          ارسال شد
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  data-testid="otp-input"
                  maxLength={5}
                  value={field.value}
                  onComplete={() => handleSubmit(handleFormSubmit)()}
                  onChange={field.onChange}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  containerClassName="justify-center !flex !gap-3 !text-center"
                >
                  <InputOTPGroup className="!flex !justify-center !text-center">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={cn(
                          "w-12 h-12 text-lg font-bold border-2 transition-all duration-300",
                          "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
                          "focus:border-amber-500 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/20",
                          "border-gray-200 dark:border-gray-600"
                        )}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button
            data-testid="verify-otp-button"
            type="submit"
            disabled={isVerifyOTPLoading || !otpValue || otpValue.length !== 5}
            className={cn(
              "w-full h-12 cursor-pointer text-lg font-bold",
              "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
              "text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            )}
          >
            <CheckCircle2 size={20} />
            {isVerifyOTPLoading ? "در حال تایید..." : "تایید"}
          </Button>

          <div className="w-full flex justify-center items-center  gap-2">
            <Button
              data-testid="resend-otp-button"
              type="button"
              variant="outline"
              onClick={handleResend}
              disabled={isResendLoading || resendTimer > 0}
              className={cn(
                " h-10 transition-all duration-300 rounded-lg cursor-pointer",
                resendTimer > 0
                  ? "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                  : "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700"
              )}
            >
              {resendTimer > 0
                ? `ارسال مجدد (${formatTime(resendTimer)})`
                : isResendLoading
                ? "در حال ارسال..."
                : "ارسال مجدد کد"}
            </Button>
            <Button
              data-testid="back-to-phone-input-button"
              type="button"
              variant="ghost"
              onClick={handleBack}
              className=" h-10 cursor-pointer hover:underline text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              تغییر شماره تلفن
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
