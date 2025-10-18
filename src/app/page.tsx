"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import WhatsappLogo from "@/components/WhatsappLogo";
import AnnouncementCarousel from "@/components/carosel";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useProductStore, Product } from "@/store/useProductStore";

function groupByCategory(products: Product[]) {
  const grouped: Record<string, Product[]> = {};
  products.forEach((p) => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  const CATEGORY_ORDER = ["bed", "sofa", "table", "cupboard", "chairs", "other"];
  const sorted: Record<string, Product[]> = {};

  CATEGORY_ORDER.forEach((cat) => {
    if (grouped[cat]) sorted[cat] = grouped[cat];
  });
  Object.keys(grouped).forEach((cat) => {
    if (!CATEGORY_ORDER.includes(cat)) sorted[cat] = grouped[cat];
  });

  return sorted;
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export default function HomePage() {
  const { products, fetchProducts } = useProductStore();
  const fetchedRef = useRef(false);
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(3);

  // List of all possible categories (for skeletons)
  const allCategories = ["bed", "sofa", "table", "cupboard", "chairs", "other"];

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchProducts();
    }
  }, [fetchProducts]);

  // If products are loaded, group them by category
  const categories = products.length > 0 ? groupByCategory(products) : Object.fromEntries(allCategories.map(cat => [cat, []]));
  const categoryEntries = Object.entries(categories);

  const handleLoadMore = () => {
    setVisibleCategoryCount((prev) => Math.min(prev + 3, categoryEntries.length));
  };

  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Navbar />
      <AnnouncementCarousel />

      <div className="container mx-auto px-4 mt-4 flex justify-end">
        <Link
          href="/products"
          className="bg-primary text-white px-3 py-1 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-md"
        >
          View All →
        </Link>
      </div>

      <main className="flex-1 container mx-auto px-4 flex flex-col items-center">
        <div className="w-full max-w-6xl flex flex-col items-center">
          {categoryEntries.slice(0, visibleCategoryCount).map(([category, items]) => (
            <section key={category} className="border-b border-gray-200 pb-6 last:border-none w-full">
              <div className="relative flex items-center justify-center my-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary capitalize">
                  {`${category} Set`}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0
                  ? Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col bg-gray-200 rounded-2xl shadow-md animate-pulse"
                      >
                        <div className="relative w-full aspect-[4/3] bg-gray-300" />
                        <div className="p-4 flex flex-col gap-2">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                          <div className="h-6 bg-gray-300 rounded w-1/3 mt-2"></div>
                        </div>
                      </div>
                    ))
                  : items.slice(0, 3).map((product) => (
                      <Link
                        key={product._id}
                        href={{
                          pathname: `/products/${slugify(product.name)}`,
                          query: { product: JSON.stringify(product) },
                        }}
                        className="group border rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300 overflow-hidden mb-0"
                      >
                        <div className="relative w-full aspect-[4/3]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            placeholder="blur"
                            blurDataURL="/images/blur.jpeg"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-muted mb-2 truncate">
                            {product.name}
                          </h3>
                          <p className="text-muted text-sm line-clamp-2">{product.description}</p>
                          <p className="text-black font-bold mt-3">Rs. {product.price}</p>
                        </div>
                      </Link>
                    ))}
              </div>

              {items.length > 3 && (
                <div className="text-right mt-4">
                  <Link
                    href={`/categories/${category}`}
                    className="text-primary font-medium hover:underline"
                  >
                    View all →
                  </Link>
                </div>
              )}
            </section>
          ))}

          {visibleCategoryCount < categoryEntries.length && (
            <button
  onClick={handleLoadMore}
  className="mb-4 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
>
  Load More
</button>

          )}
        </div>
      </main>
      <WhatsappLogo/>
      

      <Footer />
    </div>
  );
}
