"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
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
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function HomePage() {
  const { products, fetchProducts } = useProductStore();
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products, fetchProducts]);

  const categories = groupByCategory(products);
  const categoryEntries = Object.entries(categories);

  // Decide how many categories to show
  const visibleCategories = showAllCategories ? categoryEntries : categoryEntries.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Navbar />
      <AnnouncementCarousel />

      {/* 🔗 View All Button */}
      <div className="container mx-auto px-4 mt-4 flex justify-end">
        <Link
          href="/products"
          className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-md"
        >
          View All Products →
        </Link>
      </div>

      {/* 🏷️ Categories Section */}
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center">
        {products.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No products found. Please check back later.
          </p>
        )}

        <div className="w-full max-w-6xl flex flex-col items-center">
          {visibleCategories.map(([category, items]) => (
            <section
              key={category}
              aria-labelledby={`${category}-title`}
              className="border-b border-gray-200 pb-6 last:border-none w-full"
            >
              <div className="relative flex items-center justify-center mb-6">
                <h2
                  id={`${category}-title`}
                  className="text-4xl font-bold text-primary capitalize"
                >
                  {`${category} Set`}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.slice(0, 3).map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${slugify(product.name)}`}
                    className="group border rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative w-full h-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-muted mb-2 truncate">
                        {product.name}
                      </h3>
                      <p className="text-muted text-sm line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-black font-bold mt-3">
                        Rs. {product.price}
                      </p>
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

          {/* ✅ View More / Show Less Button */}
          {categoryEntries.length > 3 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-medium mb-6"
            >
              {showAllCategories ? "Show Less" : "View More"}
            </button>
          )}
        </div>
      </main>

      {/* 💬 WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923177401136"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 text-base font-medium shadow-md hover:shadow-lg"
        >
          Chat on WhatsApp
        </a>
      </div>

      <Footer />
    </div>
  );
}
