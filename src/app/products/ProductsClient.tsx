"use client";

import { useState, useMemo, useEffect, memo, useRef } from "react";
import CategoryFilter from "@/components/categoryFilter";
import Link from "next/link";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const slug = encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, "-"));
  const whatsappUrl = `https://wa.me/923177401136?text=${encodeURIComponent(`Hi! I'm interested in the ${product.name}.`)}`;

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
            placeholder="blur"
            blurDataURL="/images/blur.jpeg"
          />
        </div>
      </Link>

      <div className="p-3 flex flex-col gap-2">
        <Link href={`/products/${slug}`}>
          <p className="text-muted text-base font-semibold line-clamp-1 hover:underline">{product.name}</p>
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
  const { products, fetchProducts,productCount } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fetchOnceRef = useRef(false);

  // Fetch products only once
  useEffect(() => {
    if (!products.length && !fetchOnceRef.current) {
      fetchOnceRef.current = true;
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const visibleProducts = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Determine placeholder count dynamically
  const placeholderCount = productCount // at least 3 to match grid row

  const placeholders = Array.from({ length: placeholderCount }).map((_, idx) => (
    <div key={idx} className="flex flex-col bg-gray-200 rounded-lg animate-pulse mb-5 mr-5">
      <div className="relative w-full aspect-[4/3] bg-gray-300" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mt-2"></div>
      </div>
    </div>
  ));

  return (
    <>
      <CategoryFilter onCategoryChange={setSelectedCategory} />

      <main className="flex-1 px-4 md:px-8 lg:px-16 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.length ? visibleProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          )) : placeholders}
        </div>
      </main>
    </>
  );
}
