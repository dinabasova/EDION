import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type JwtUserPayload = {
  id: string;
  email: string;
  role: "USER" | "ADMIN" | string;
  iat?: number;
  exp?: number;
};

function decodeJwt(token: string): JwtUserPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // atob is available in Edge runtime
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const data = JSON.parse(json) as JwtUserPayload;
    return data;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminPage = path.startsWith("/admin");
  const isAdminApi = path.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    let token: string | undefined;

    // 1) For admin APIs, try Authorization header first
    if (isAdminApi) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // 2) Fallback (and for pages): cookie
    if (!token) {
      token = req.cookies.get("edionaz_token")?.value;
    }

    if (!token) {
      if (isAdminPage) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = decodeJwt(token);

    if (!decoded) {
      if (isAdminPage) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "ADMIN") {
      if (isAdminPage) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};

