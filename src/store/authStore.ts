import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getApiUrl } from "@/lib/config";
import { fetchApi } from "@/hooks/useAuthToken";

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  image: string;
  imageUrl: string;
  phone: string;
  email: string;
  role: string;
  is_email_verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  addressList: any[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (phone: string, otp: string) => Promise<boolean>;
  resendOTP: (phone: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}
let refreshingTokenPromise: Promise<boolean> | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setLoading: (isLoading) => set({ isLoading }),

      sendOTP: async (phone: string): Promise<boolean> => {
        try {
          const response = await fetch(getApiUrl("/v1/auth/send-otp"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ phone }),
            credentials: "include",
          });

          if (response.ok) return true;
          const error = await response.json();
          throw new Error(error.message || "Failed to send OTP");
        } catch (error) {
          console.error("Send OTP error:", error);
          throw error;
        }
      },

   verifyOTP: async (phone: string, otp: string): Promise<boolean> => {
  try {
    const response = await fetch(getApiUrl("/v1/auth/verfiy-otp"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ phone, otpCode: otp }),
      credentials: "include",
    });
    if (response.ok) {
      set({ isAuthenticated: true });
      return true;
    } else {
      const error = await response.json();
      throw new Error(error.message || "Invalid OTP");
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    set({ user: null, isAuthenticated: false });
    throw error;
  }
},

      resendOTP: async (phone: string): Promise<boolean> => {
        try {
          const response = await fetch(getApiUrl("/v1/auth/resend-otp"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ phone }),
            credentials: "include",
          });

          if (response.ok) return true;
          const error = await response.json();
          throw new Error(error.message || "Failed to resend OTP");
        } catch (error) {
          console.error("Resend OTP error:", error);
          throw error;
        }
      },

      logout: async (): Promise<void> => {
        try {
          await fetch(getApiUrl("/v1/auth/logout"), {
            method: "GET",
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },


     refreshToken: async (): Promise<boolean> => {
        if (refreshingTokenPromise) {
          return refreshingTokenPromise;
        }

        const currentState = get();
        if (!currentState.isAuthenticated) {
          return false;
        }

        refreshingTokenPromise = (async () => {
          try {
            const response = await fetch(getApiUrl("/v1/auth/refresh"), {
              method: "GET",
              credentials: "include",
            });

            if (response.ok) {
              set({ isAuthenticated: true });
              return true;
            } else {
              set({ isAuthenticated: false });
              return false;
            }
          } catch (error) {
            console.error("Refresh token error:", error);
            set({ isAuthenticated: false });
            return false;
          } finally {
            refreshingTokenPromise = null;
          }
        })();

        return refreshingTokenPromise;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
