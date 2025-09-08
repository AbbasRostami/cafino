import { cookies } from "next/headers";

export const getServerToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token")?.value;
    return accessToken || null;
  } catch (error) {
    console.error("Error getting server token:", error);
    return null;
  }
};
export const getServerApiUrl = (endpoint: string) => {
  const baseUrl = "http://localhost:3000";
  return endpoint.startsWith("/api")
    ? `${baseUrl}${endpoint}`
    : `${baseUrl}/api${endpoint}`;
};
// تابع ارسال درخواست با توکن (برای سرور کامپوننت‌ها)
export const fetchWithServer = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    const token = await getServerToken();
    const fullUrl = getServerApiUrl(url);
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    console.log("🔍 Server API call:", fullUrl);
    console.log("🔍 Server API call:", fullUrl);
    console.log("🔑 Token available:", token ? "✅ Yes" : "❌ No");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
      cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    };

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    console.log("✅ Server API response status:", response.status);
    return response;
  } catch (error) {
    console.error("❌ Server API error:", error);
    throw error;
  }
};
