import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import { verifyAdmin } from "@/middleware/verifyAdmin";


export async function POST(req: Request) {
  
    const authError = await verifyAdmin(req);
    
  if (!authError) return NextResponse.json(
      { message: "Unauthorized", },
      { status: 401 }
    ); // unauthorized
  try {
    await dbConnect();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!name || !price || !description || !category || !image) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    // Upload image to Cloudinary
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "ideal-furniture/products" },
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
    console.error(error);
    return NextResponse.json(
      { message: "Error adding product", error: error.message },
      { status: 500 }
    );
  }
}
