"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";

const phoneSchema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "شماره تلفن معتبر نیست"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(5, "کد باید ۵ رقمی باشد")
    .regex(/^\d{5}$/, "کد باید فقط شامل ارقام باشد"),
});

export const LoginForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string>("");
  const { sendOTP, verifyOTP, resendOTP } = useAuthStore();
  const router = useRouter();

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

  // otp form
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

  // ارسال کد تایید
  const onSendOTP = async (data: { phone: string }) => {
    setIsLoading(true);
    try {
      await sendOTP(data.phone);
      setPhoneValue(data.phone);
      setStep("otp");
    } catch (err: any) {
      setPhoneError("phone", { message: err?.message || "خطا در ارسال کد" });
    } finally {
      setIsLoading(false);
    }
  };

  // تایید کد
  const onVerifyOTP = async (data: { otp: string }) => {
    setIsLoading(true);
    try {
      await verifyOTP(phoneValue, data.otp);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        router.replace("/success");
      }, 300); // صبر کن مودال بسته شه بعد برو به success
    } catch (err: any) {
      setOtpError("otp", { message: err?.message || "کد نامعتبر است" });
    } finally {
      setIsLoading(false);
    }
  };

  // تایید خودکار وقتی otp کامل شد
  useEffect(() => {
    if (otpValue && otpValue.length === 5) {
      handleSubmitOTP(onVerifyOTP)();
    }
  }, [otpValue]);

  // ارسال مجدد کد
  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await resendOTP(phoneValue);
    } catch (err: any) {
      setOtpError("otp", { message: err?.message || "خطا در ارسال مجدد کد" });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "phone") {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">ورود به سیستم</h2>
        <form onSubmit={handleSubmitPhone(onSendOTP)} className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              شماره تلفن
            </label>
            <input
              type="tel"
              id="phone"
              {...registerPhone("phone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="09xxxxxxxxx"
              autoComplete="tel"
              disabled={isLoading}
            />
            {phoneErrors.phone && (
              <div className="text-red-600 text-sm mt-1">
                {phoneErrors.phone.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">تایید کد</h2>
      <div className="mb-4 text-center text-gray-600">
        کد تایید به شماره <strong>{phoneValue}</strong> ارسال شد
      </div>
      <form onSubmit={handleSubmitOTP(onVerifyOTP)} className="space-y-4">
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            کد تایید
          </label>
          <Controller
            name="otp"
            control={controlOTP}
            render={({ field }) => (
              <InputOTP
                maxLength={5}
                value={field.value}
                onChange={field.onChange}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                containerClassName="justify-center !flex !gap-2 !text-center"
              >
                <InputOTPGroup className="!flex !justify-center !text-center">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {otpErrors.otp && (
            <div className="text-red-600 text-sm mt-1">
              {otpErrors.otp.message}
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ارسال مجدد کد
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              resetOtpForm();
            }}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            تغییر شماره تلفن
          </button>
        </div>
      </form>
    </div>
  );
};
