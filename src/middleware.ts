import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getFromLocalStorage } from "./utils/localStorage";
import { authKey } from "./constant";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const authRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];
const roleBasedPrivateRoutes = {
  DONOR: [/^\/dashboard\/donor/],
  ADMIN: [/^\/dashboard\/admin/],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get(authKey)?.value;
  console.log({ accessToken });

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let role;

  if (accessToken) {
    const decodedData = jwtDecode(accessToken) as any;
    role = decodedData?.role;
  }

  if (
    role &&
    roleBasedPrivateRoutes[role as keyof typeof roleBasedPrivateRoutes]
  ) {
    const routes =
      roleBasedPrivateRoutes[role as keyof typeof roleBasedPrivateRoutes];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*"],
};
