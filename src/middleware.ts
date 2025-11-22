import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type JwtUserPayload = {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Protect ADMIN pages
  if (path.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUserPayload;

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*", "/admin/:path*"],
};
