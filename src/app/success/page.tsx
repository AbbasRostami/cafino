"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function SuccessPage() {
  const { user, getUserInfo } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      getUserInfo().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, getUserInfo]);
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold mb-4" onClick={() => router.push("/")}>ورود موفق!</h2>
          <div className="mb-2">
            شماره تلفن: <span className="font-mono">{user?.phone || "-"}</span>
          </div>
          <div className="mb-2">
            نام کاربری:{" "}
            <span className="font-mono">{user?.username || "-"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
