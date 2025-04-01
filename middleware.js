// middleware.js
import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await verifyJWT(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Only apply to these routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
