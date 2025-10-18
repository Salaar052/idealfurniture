import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    console.log("📦 Fetching all products...");

    // Connect to MongoDB
    await dbConnect();

    // Fetch all products without sorting by createdAt
    const products = await Product.find().lean();

    console.log(`✅ Fetched ${products.length} products`);

    return NextResponse.json(
      {
        success: true,
        message: "All products fetched successfully",
        products,
        total: products.length,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error?.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
