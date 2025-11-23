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

  const isAdminPage = path.startsWith("/admin");
  const isAdminApi = path.startsWith("/api/admin");

  // Admin protection (pages + API)
  if (isAdminPage || isAdminApi) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      // If it's a page → redirect
      if (isAdminPage) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      // If it's an API → return JSON
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUserPayload;

      if (decoded.role !== "admin") {
        if (isAdminPage) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } catch {
      if (isAdminPage) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/protected/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
