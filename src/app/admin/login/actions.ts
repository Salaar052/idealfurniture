"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Username or password is incorrect" };
    }

    (await cookies()).set("adminToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    redirect("/admin/dashboard");
  } catch (error) {
    // Check if it's a redirect error (which is expected)
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect errors
    }
    
    // Handle actual errors
    return { error: "An error occurred during login. Please try again." };
  }
}