// app/products/[slug]/page.tsx
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  await dbConnect();
  const products = await Product.find({}, "name").lean();
  return products.map((p) => ({
    slug: p.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: ProductPageProps) {
  await dbConnect();
  const newParams = await params;
  const name = decodeURIComponent(newParams.slug).replace(/-/g, " ");
  

  // Fetch plain object
  const product = await Product.findOne({ name }).lean();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Product not found.
      </div>
    );
  }

  // Convert _id to string
  const safeProduct = { ...product, _id: product._id.toString() };

  return <ProductDetailClient product={safeProduct} />;
}
