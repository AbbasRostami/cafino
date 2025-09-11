import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // دریافت تمام کوکی‌ها
  const allCookies = request.cookies.getAll();
  const accessToken = request.cookies.get("access-token");
  const refreshToken = request.cookies.get("refresh-token");

  console.log("🟢 Middleware running...");
  console.log("📍 URL:", pathname);
  console.log("🍪 All cookies count:", allCookies.length);
  console.log(
    "🍪 All cookies:",
    allCookies.map((c) => ({
      name: c.name,
      value: c.value ? "exists" : "empty",
    }))
  );
  console.log(
    "🔑 Access Token:",
    accessToken?.value ? "✅ Found" : "❌ Not found"
  );
  console.log(
    "🔄 Refresh Token:",
    refreshToken?.value ? "✅ Found" : "❌ Not found"
  );

  // بررسی مسیرهای محافظت شده
  const protectedRoutes = ["/profile", "/admin"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    console.log("🔒 Protected route detected");

    if (!accessToken?.value) {
      console.log("❌ No access token found → redirecting to /");
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("✅ Access token exists → allowing access");

    // اضافه کردن توکن به headers برای استفاده در کامپوننت‌ها
    const response = NextResponse.next();
    response.headers.set("x-auth-token", accessToken.value);
    console.log("✅ Token added to x-auth-token header");

    return response;
  } else {
    console.log("✅ Public route → allowing access");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
