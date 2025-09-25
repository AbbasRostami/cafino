"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, LogIn, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/utils/utils";
import { PhoneInputFormProps } from "@/types/main";
import { phoneSchema } from "@/schemas";

export const PhoneInputForm: React.FC<PhoneInputFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<{ phone: string }>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
    mode: "onChange",
  });

  const phoneValue = useWatch({ name: "phone", control });

  const validationRules = [
    {
      id: "starts-with-09",
      text: "شماره باید با 09 شروع شود",
      isChecked: phoneValue.length > 0,
      isValid: phoneValue.startsWith("09"),
    },
    {
      id: "length-11",
      text: "شماره باید 11 رقم باشد",
      isChecked: phoneValue.length > 0,
      isValid: phoneValue.replace(/\D/g, "").length === 11,
    },
    {
      id: "invalid-phone",
      text: "شماره معتبر نیست",
      isChecked: phoneValue.length > 0,
      isValid: /^09\d{9}$/.test(phoneValue),
    },
    {
      id: "no-letters",
      text: "نباید شامل حروف انگلیسی یا فارسی باشد",
      isChecked: phoneValue.length > 0,
      isValid: /^[0-9]*$/.test(phoneValue),
    },
  ];

  const handleFormSubmit = (data: { phone: string }) => {
    onSubmit(data.phone);
  };

  return (
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
          ورود و ثبت نام
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
          برای ورود، شماره موبایل خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm group">
              <Input
                data-testid="phone-input"
                inputMode="numeric"
                maxLength={11}
                type="tel"
                {...register("phone")}
                placeholder="09xxxxxxxxx"
                autoComplete="tel"
                disabled={isLoading}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    ""
                  );
                }}
                className={cn(
                  "w-full text-center h-12 text-lg font-medium rounded-xl border-2",
                  "bg-white/80 dark:bg-gray-800/80 shadow-sm focus:ring-4 transition-all duration-300 pr-12",
                  "backdrop-blur-sm",
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/20"
                    : phoneValue
                    ? "border-green-500 focus:border-green-500 focus:ring-green-100 dark:focus:ring-green-900/20"
                    : "border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-amber-100 dark:focus:ring-amber-900/20"
                )}
              />
              <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 dark:text-amber-400 w-6 h-6 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-300 transition-colors" />
            </div>
          </div>

          {phoneValue && (
            <div className="max-w-sm mx-auto space-y-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
              {validationRules?.map((rule) => (
                <div
                  key={rule?.id}
                  className={cn(
                    "flex items-center gap-2 text-xs transition-all duration-300",
                    rule?.isChecked
                      ? rule?.isValid
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {rule?.isChecked ? (
                    rule?.isValid ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 flex-shrink-0 text-red-500 dark:text-red-400" />
                    )
                  ) : (
                    <div className="w-4 h-4 flex-shrink-0 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                  )}
                  <span className="font-medium">{rule?.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 flex justify-center">
          <Button
            data-testid="send-otp-button"
            type="submit"
            disabled={isLoading || !isValid}
            className={cn(
              "w-full  max-w-sm h-12 cursor-pointer text-lg font-bold",
              "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
              "text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            )}
          >
            <LogIn className="!w-6 !h-6 ml-2" />
            {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
          </Button>
        </div>
      </form>
    </div>
  );
};
