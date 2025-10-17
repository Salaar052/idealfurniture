"use client";

import { useState, useMemo, memo } from "react";
import CategoryFilter from "@/components/categoryFilter";
import Link from "next/link";
import Image from "next/image";
import {useProductStore} from "@/store/useProductStore"; // your zustand store

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

/* ✅ Memoized Product Card */
const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const slug = encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, "-"));
  const whatsappUrl = `https://wa.me/923177401136?text=${encodeURIComponent(
    `Hi! I'm interested in the ${product.name}.`
  )}`;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group mb-5 mr-5">
      <Link href={`/products/${slug}`} className="block rounded-t-lg overflow-hidden">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-3 flex flex-col gap-2">
        <Link href={`/products/${slug}`}>
          <p className="text-muted text-base font-semibold line-clamp-1 hover:underline">
            {product.name}
          </p>
        </Link>
        <p className="text-muted text-base font-medium">${product.price.toFixed(2)}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary/90 transition-all duration-200 text-sm font-medium"
        >
          Contact on WhatsApp
        </a>
      </div>
    </div>
  );
});

export default function ProductsClient() {
  const products = useProductStore((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("all");

  /* ✅ Efficient filtering using memo */
  const visibleProducts = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-6xl text-gray-300">inventory_2</span>
        <h3 className="mt-4 text-lg font-medium text-[#1b130d]">No products found</h3>
        <p className="mt-1 text-sm text-[#9a6c4c]">Try selecting a different category</p>
      </div>
    );
  }

  return (
    <>
      <CategoryFilter onCategoryChange={setSelectedCategory} />

      <main className="flex-1 px-4 md:px-8 lg:px-16 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {visibleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
