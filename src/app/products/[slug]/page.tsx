// app/products/[slug]/page.tsx
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const awaitedParams = await params;
  console.log(awaitedParams);
  const slug = awaitedParams.slug; // already a string
  return <ProductDetailClient slug={slug} />;
}
