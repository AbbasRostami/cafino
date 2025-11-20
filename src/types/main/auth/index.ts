import ReCAPTCHA from "react-google-recaptcha";

export type LoginStep = "phone" | "otp";

export interface LoginFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export interface UseLoginLogicProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export interface LoginContentProps {
  step: LoginStep;
  isSendOTPLoading: boolean;
  isVerifyOTPLoading: boolean;
  isResendOTPLoading: boolean;
  phoneValue: string;
  handleSendOTP: (phone: string, captchaToken: string) => void;
  handleVerifyOTP: (otp: string, phone: string) => void;
  handleResendOTP: (phone: string, captchaToken: string) => void;
  goBackToPhone: () => void;
  resendTimer: number;
  formatTime: (seconds: number) => string;
}

export interface PhoneInputFormProps {
  onSubmit: (phone: string, captchaToken: string) => void;
  isLoading: boolean;
}

export interface OtpInputFormProps {
  phoneNumber: string;
  onSubmit: (otp: string, phone: string) => void;
  onResend: (phone: string, captchaToken: string) => void;
  onBack: () => void;
  isVerifyOTPLoading: boolean;
  resendTimer: number;
  formatTime: (seconds: number) => string;
  isResendLoading: boolean;
}
