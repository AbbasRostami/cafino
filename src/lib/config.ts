export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoints: {
      sendOTP: "/v1/auth/send-otp",
      verifyOTP: "/v1/auth/verfiy-otp",
      resendOTP: "/v1/auth/resend-otp",
      refresh: "/v1/auth/refresh",
      logout: "/v1/auth/logout",
      verify: "/v1/auth/verify",
      user: "/v1/user",
    },
  },
};

export const getApiUrl = (endpoint: string) => {
  return `${config.api.baseUrl}${endpoint}`;
};

  