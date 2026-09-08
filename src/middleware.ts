import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = sessionToken ? await verifySessionToken(sessionToken) : null;

    const isLoginPage = pathname === "/admin/login";

    // 1. If user is accessing login page while already authenticated with valid admin session, redirect to dashboard
    if (isLoginPage) {
      if (session && (session.role === "ADMIN" || session.role === "AGENT")) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // 2. If user is accessing any protected admin route without a valid admin session, redirect to login
    if (!session || (session.role !== "ADMIN" && session.role !== "AGENT")) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
