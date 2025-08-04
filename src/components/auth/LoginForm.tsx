"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  LogIn,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { phoneSchema, otpSchema } from "@/schemas/auth/login";
// import { useAddToCart, migrateGuestCartToServer } from "@/store/cartStore";
// import { useQueryClient } from "@tanstack/react-query";

export const LoginForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [resendTimer, setResendTimer] = useState(0);
  const { sendOTP, verifyOTP, resendOTP } = useAuthStore();
  const getUserInfo = useAuthStore((state) => state.getUserInfo);
  // const addToCartApi = useAddToCart();
  // const queryClient = useQueryClient();

  // phone form
  const {
    register: registerPhone,
    handleSubmit: handleSubmitPhone,
    formState: { errors: phoneErrors },
    setError: setPhoneError,
  } = useForm<{ phone: string }>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const {
    control: controlOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: otpErrors },
    setError: setOtpError,
    reset: resetOtpForm,
    watch,
  } = useForm<{ otp: string }>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp");

  const onSendOTP = async (data: { phone: string }) => {
    setIsLoading(true);
    try {
      await sendOTP(data.phone);
      setPhoneValue(data.phone);
      setStep("otp");
      setResendTimer(120);
    } catch (err: any) {
      setPhoneError("phone", { message: err?.message || "خطا در ارسال کد" });
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyOTP = async (data: { otp: string }) => {
    setIsLoading(true);
    try {
      await verifyOTP(phoneValue, data.otp);
      await getUserInfo();
      // --- migration guest cart to server ---
      // await migrateGuestCartToServer(
      //   (itemId) => addToCartApi.mutateAsync({ itemId }),
      //   async () => {
      //     await queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
      //     await queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      //   }
      // );
      toast.success("با موفقیت وارد شدید!");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setOtpError("otp", { message: err?.message || "کد نامعتبر است" });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (otpValue && otpValue.length === 5) {
      handleSubmitOTP(onVerifyOTP)();
    }
  }, [otpValue]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await resendOTP(phoneValue);
      setResendTimer(120);
    } catch (err: any) {
      setOtpError("otp", { message: err?.message || "خطا در ارسال مجدد کد" });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "phone") {
    return (
      <div className="relative overflow-hidden p-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-50" />

        <DialogHeader className="relative z-10">
          <div className="flex flex-col items-center gap-4 mb-6 relative">
            {/* Animated gradient circles */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-tr from-green-400 via-blue-400 to-purple-400 opacity-20 blur-3xl animate-pulse" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-green-400 opacity-30 blur-2xl animate-pulse delay-1000" />

            {/* Main icon container */}
            <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 via-blue-500 to-purple-500 shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 via-blue-400 to-purple-400 opacity-20 blur-xl" />
              <LogIn className="w-10 h-10 text-white drop-shadow-lg" />
            </div>

            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              خوش آمدید!
            </DialogTitle>
            <DialogDescription className="text-center text-base text-gray-600 max-w-sm leading-relaxed">
              برای ورود شماره موبایل خود را وارد کنید
            </DialogDescription>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmitPhone(onSendOTP)}
          className="relative z-10 space-y-6"
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative group w-full max-w-xs">
                <Input
                  inputMode="numeric"
                  maxLength={11}
                  type="tel"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  id="phone"
                  {...registerPhone("phone")}
                  placeholder="09xxxxxxxxx"
                  autoComplete="tel"
                  disabled={isLoading}
                  className="text-center pr-12 h-12 text-lg font-medium border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm"
                />
                <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              </div>
            </div>
            {phoneErrors.phone && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{phoneErrors.phone.message}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 cursor-pointer text-base font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              <LogIn className="w-5 h-5 ml-2" />
              {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-50" />

      <DialogHeader className="relative z-10">
        <div className="flex flex-col items-center gap-4 mb-6 relative">
          {/* Animated gradient circles */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-tr from-green-400 via-blue-400 to-purple-400 opacity-20 blur-3xl animate-pulse" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-green-400 opacity-30 blur-2xl animate-pulse delay-1000" />

          {/* Main icon container */}
          <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 via-blue-500 to-purple-500 shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 via-blue-400 to-purple-400 opacity-20 blur-xl" />
            <CheckCircle2 className="w-10 h-10 text-white drop-shadow-lg" />
          </div>

          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            تایید کد
          </DialogTitle>
          <DialogDescription className="text-center text-base text-gray-600 max-w-sm leading-relaxed">
            کد تایید به شماره{" "}
            <strong className="text-blue-600">{phoneValue}</strong> ارسال شد
          </DialogDescription>
        </div>
      </DialogHeader>

      <form
        onSubmit={handleSubmitOTP(onVerifyOTP)}
        className="relative z-10 space-y-6"
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <Controller
              name="otp"
              control={controlOTP}
              render={({ field }) => (
                <InputOTP
                  maxLength={5}
                  value={field.value}
                  onChange={field.onChange}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  containerClassName="justify-center  !flex !gap-3 !text-center"
                >
                  <InputOTPGroup className="!flex !justify-center !text-center">
                    <InputOTPSlot
                      index={0}
                      className="w-10 h-10 text-lg font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100  bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-10 h-10 text-lg font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100  bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-10 h-10 text-lg font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100  bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-10 h-10 text-lg font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100  bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-10 h-10 text-lg font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100  bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>
          {otpErrors.otp && (
            <div className="flex items-center gap-2 text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{otpErrors.otp.message}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 cursor-pointer text-lg font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl"
          >
            <CheckCircle2 size={25} />
            {isLoading ? "در حال تایید..." : "تایید"}
          </Button>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleResendOTP}
              disabled={isLoading || resendTimer > 0}
              className={`w-full h-10 transition-all duration-300 rounded-lg cursor-pointer ${
                resendTimer > 0
                  ? "text-gray-900 bg-gray-300 border-gray-200 cursor-not-allowed"
                  : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
              }`}
            >
              {resendTimer > 0
                ? `ارسال مجدد (${formatTime(resendTimer)})`
                : "ارسال مجدد کد"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setStep("phone");
                resetOtpForm();
              }}
              className="w-full h-10 cursor-pointer hover:underline text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
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
