// app/products/[slug]/page.tsx
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const awaitedParams =params;
  console.log(awaitedParams);
  const slug = awaitedParams.slug; // already a string
  return <ProductDetailClient slug={slug} />;
}
