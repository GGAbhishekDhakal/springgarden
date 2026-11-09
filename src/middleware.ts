import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "sg_admin_session";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) return null;
  return new TextEncoder().encode(value);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login" || pathname === "/admin/setup") return NextResponse.next();

  const token = req.cookies.get(COOKIE)?.value;
  const key = secret();
  if (!token || !key) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  try {
    await jwtVerify(token, key);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
