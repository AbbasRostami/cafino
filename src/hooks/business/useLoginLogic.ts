import { useState, useEffect } from "react";
import { migrateGuestCartToServer } from "@/store/cartStore";
import { useAddToCartMultiple, useCart } from "@/services";
import { useResendOTP, useSendOTP, useVerifyOTP } from "@/services";
import { LoginStep, UseLoginLogicProps } from "@/types/main";

export const useLoginLogic = ({
  onSuccess,
  onClose,
}: UseLoginLogicProps = {}) => {
  const [step, setStep] = useState<LoginStep>("phone");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [resendTimer, setResendTimer] = useState(0);

  const { mutateAsync: addToCartMultiple } = useAddToCartMultiple();
  const { refetch: refetchCart } = useCart();
  const { mutate: sendOTP, isPending: isSendOTPLoading } = useSendOTP();
  const { mutate: verifyOTP, isPending: isVerifyOTPLoading } = useVerifyOTP();
  const { mutate: resendOTP, isPending: isResendOTPLoading } = useResendOTP();

  const handleSendOTP = (phone: string) => {
    sendOTP(
      { phone },
      {
        onSuccess: () => {
          setPhoneValue(phone);
          setStep("otp");
          setResendTimer(120);
        },
      }
    );
  };

  const handleVerifyOTP = (otp: string, phone: string) => {
    verifyOTP(
      { phone: phone, otpCode: otp },
      {
        onSuccess: () => {
          // Migrate guest cart to server
          migrateGuestCartToServer(addToCartMultiple, refetchCart);
          if (onClose) {
            onClose();
          } else if (onSuccess) {
            onSuccess();
          }
          setStep("phone");
        },
      }
    );
  };

  const handleResendOTP = () => {
    resendOTP(
      { phone: phoneValue },
      {
        onSuccess: () => {
          setResendTimer(120);
        },
      }
    );
  };

  const goBackToPhone = () => {
    setStep("phone");
  };

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

  return {
    step,
    phoneValue,
    resendTimer,

    isSendOTPLoading,
    isVerifyOTPLoading,
    isResendOTPLoading,

    // Handlers
    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,
    goBackToPhone,
    formatTime,
  };
};
