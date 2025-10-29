// File: src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { serverAuthAPI } from "~/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await serverAuthAPI.getSession({
    headers: request.headers,
  });
  const isLoggedIn = !!session;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    console.log(
      `[Middleware] Unauthorized access to ${pathname}, redirecting to login.`,
    );
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && isLoggedIn) {
    console.log(
      `[Middleware] Already logged in, redirecting from login to /admin.`,
    );
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path KECUALI yang dimulai dengan:
     * - api/auth (API routes better-auth)
     * - api (API routes lain jika ada)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
