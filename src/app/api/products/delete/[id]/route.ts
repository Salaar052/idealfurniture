import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import { verifyAdmin } from "@/middleware/verifyAdmin";

// Helper to extract Cloudinary public_id from image URL
const getPublicIdFromUrl = (url: string) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return publicId;
};

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Updated for Next.js 15
) {
  console.log("Received request to delete product");

  // ✅ Authorization check first
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    // ✅ Await params as they are now async in Next.js 15
    const { id } = await context.params;
    console.log("Deleting product with id:", id);

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // ✅ Delete image from Cloudinary if exists
    if (product.image) {
      try {
        const publicId = getPublicIdFromUrl(product.image);
        await cloudinary.uploader.destroy(`ideal-furniture/products/${publicId}`);
      } catch (err) {
        console.warn("Cloudinary delete failed:", err);
      }
    }

    // ✅ Delete product from MongoDB
    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Error deleting product", error: error.message },
      { status: 500 }
    );
  }
}
