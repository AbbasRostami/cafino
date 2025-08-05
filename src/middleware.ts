// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // لیست مسیرهای محافظت‌شده
  const protectedRoutes = ["/profile"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // توکن از کوکی
  const token = request.cookies.get("access-token")?.value;
  console.log("middleware running on: ", pathname);
  console.log("access-token: ", token);
  console.log("isProtected: ", isProtected);
  // اگر مسیر محافظت شده بود و توکنی وجود نداشت => ریدایرکت
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
