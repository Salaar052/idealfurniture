import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/register") || pathname.startsWith("/api/products") 
  ) {
    return NextResponse.next();
  }

  // ✅ Read token from cookie instead of header
  const token = req.cookies.get("adminToken")?.value;
  console.log("Token from cookie:", token);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    // Attach admin ID to request headers for downstream usage
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-admin-id", decoded.id); 

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/:path*"], // Apply to all API routes
   runtime: "nodejs", // 
};
