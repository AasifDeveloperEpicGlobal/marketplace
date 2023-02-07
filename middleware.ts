import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

export const config = {
  matcher: [
    "/onboarding/dashboard/:path*",
    "/super-admin/:path*",
    "/login",
    "/sign-up",
  ],
};

const authPages = ["/login", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token");
  const role =
    token && token.split(".").length === 3
      ? (jwtDecode(token as string) as any)?.user?.role
      : null;

  if (!authPages.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (authPages.includes(pathname)) {
    if (token) {
      if (role === "Admin") {
        return NextResponse.redirect(
          new URL("/onboarding/dashboard", request.url)
        );
      } else if (role == "SuperAdmin") {
        return NextResponse.redirect(new URL("/super-admin", request.url));
      }
    }
  }

  return NextResponse.next();
}
