import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApiWithCookies(
  url: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  console.log("cookieStore:", cookieStore.getAll());
  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const fullUrl = baseUrl?.endsWith("/")
    ? `${baseUrl}${url.startsWith("/") ? url.slice(1) : url}`
    : `${baseUrl}${url}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Cookie: `access-token=${accessToken}; refresh-token=${refreshToken}`,
  };

  return fetch(fullUrl, {
    ...options,
    headers,
  });
}
