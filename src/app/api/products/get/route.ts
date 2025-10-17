import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    console.log("📦 Fetching products...");

    // Connect to MongoDB (cached connection)
    await dbConnect();

    // Extract query params
    const { searchParams } = new URL(req.url);
    const start = Number(searchParams.get("start")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");

    // Build dynamic filter
    const filter = category && category !== "all" ? { category } : {};

    // Fetch products efficiently with lean()
    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip(start)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      Product.countDocuments(filter),
    ]);

    const hasMore = start + limit < total;

    console.log(`✅ Fetched ${products.length}/${total} products`);

    return NextResponse.json(
      {
        success: true,
        message: "Products fetched successfully",
        products,
        total,
        hasMore,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store", // prevent caching stale data
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
