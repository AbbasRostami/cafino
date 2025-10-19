import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = "user" | "admin" | "manager";

function getRequiredRoles(pathname: string): Role[] | null {
  if (pathname.startsWith("/profile")) return ["user", "admin", "manager"];
  if (pathname.startsWith("/dashboard")) return ["admin", "manager"];
  return null;
}

async function fetchRole(
  request: NextRequest,
  timeoutMs = 3000
): Promise<Role | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${request.nextUrl.origin}/api/v1/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    const role = data?.data?.user?.role as Role | undefined;
    return role ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiredRoles = getRequiredRoles(pathname);
  if (!requiredRoles) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access-token")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = await fetchRole(request);

  if (!role || !requiredRoles.includes(role)) {
    return NextResponse.rewrite(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
