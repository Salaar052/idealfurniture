import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import { verifyAdmin } from "@/middleware/verifyAdmin";

export async function POST(req: Request) {
  // Verify admin
  const authError = await verifyAdmin(req);
  if (!authError)
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );

  try {
    await dbConnect();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const priceInput = formData.get("price") as string;
    const price = priceInput ? Number(priceInput) : 0;
    const description = (formData.get("description") as string) || "";
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    // Only name, category, and image are required
    if (!name || !category || !image) {
      return NextResponse.json({ message: "Name, category, and image are required" }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary with original quality preserved
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ideal-furniture/products",
          quality: "100",        // Keep original quality
          flags: "preserve_transparency",  // Preserve PNG transparency if present
        },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    // Save product to DB
    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      image: uploadResult.secure_url,
    });

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Error adding product", error: error.message },
      { status: 500 }
    );
  }
}