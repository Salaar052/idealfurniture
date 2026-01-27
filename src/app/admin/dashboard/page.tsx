import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default async function AdminDashboardPage() {
  // Check token
  const cookieStore = cookies();
  const token = (await cookieStore).get("adminToken")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  // Determine base URL depending on environment
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch products server-side
  let products: Product[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/products/get`, {
      headers: { Cookie: `adminToken=${token}` }, // forward token if needed
      cache: "no-store", // always get latest
    });

    if (res.ok) {
      const data = await res.json();
      products = data.products || [];
    } else {
      console.error("Failed to fetch products:", res.status, await res.text());
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <AdminDashboardClient initialProducts={products} />;
}
