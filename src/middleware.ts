// File: src/middleware.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
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
