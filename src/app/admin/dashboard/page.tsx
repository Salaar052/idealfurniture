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

  // Fetch products server-side
  let products: Product[] = [];
  try {
    const res = await fetch("http://localhost:3000/api/products/get", {
      headers: { Cookie: `adminToken=${token}` }, // forward token if needed
      cache: "no-store", // always get latest
    });
    if (res.ok) {
      const data = await res.json();
      products = data.products || [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <AdminDashboardClient initialProducts={products} />;
}
