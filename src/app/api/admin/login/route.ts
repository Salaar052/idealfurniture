import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  console.log("Received login request");
  
  try {
    const { username, password } = await req.json();
    

    if (!username || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await dbConnect();

    const admin = await Admin.findOne({ username })as typeof Admin.prototype;
    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    

    const token = generateToken({
      id: admin._id.toString(),
      username: admin.username,
    });

    return NextResponse.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
      
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
