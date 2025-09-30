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
  // از مسیر نسبی استفاده می‌کنیم تا rewrite/proxy های Next.js همیشه اعمال شوند
  // مثال: "/v1/item" => "/api/v1/item"
  if (endpoint.startsWith("/api")) return endpoint;
  if (endpoint.startsWith("/")) return `/api${endpoint}`;
  return `/api/${endpoint}`;
};

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
      next: options.next ?? { revalidate: 3600 },
    });

    return response;
  } catch (error) {
    console.error("❌ Server API error:", error);
    throw error;
  }
};
