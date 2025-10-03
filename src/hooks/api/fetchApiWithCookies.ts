import { cookies } from "next/headers";
import { getApiUrl } from "./useAuthToken";

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

export const fetchWithServer = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    const fullUrl = getApiUrl(url, true);
    const cookieStore = await cookies();

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
