import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function verifyAdmin(req: Request) {
  try {
    // ✅ Access cookies on the server
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token in cookies" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }

    // ✅ Authorized — return decoded payload
    return decoded;
  } catch (error) {
    console.error("Auth verification failed:", error);
    return NextResponse.json(
      { message: "Server error during authorization" },
      { status: 500 }
    );
  }
}
