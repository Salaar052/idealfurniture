"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useProductStore, Product } from "@/store/useProductStore";

interface ProductDetailClientProps {
  product?: Product; // fallback from server
  slug: string;
}

export default function ProductDetailClient({ product: productFromServer, slug }: ProductDetailClientProps) {
  const { products, fetchProducts } = useProductStore();
  const [product, setProduct] = useState<Product | null>(
    () =>
      products.find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug) ||
      productFromServer ||
      null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!product) {
      fetchProducts().then((_) => {
        const updatedProducts = useProductStore.getState().products;
        const found = updatedProducts.find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug);
        setProduct(found || null);
      });
    }
  }, [product, slug, fetchProducts]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-muted">Product not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center px-4 sm:px-6 md:px-8 py-8">
        <div className="w-full flex justify-center">
          <div className="max-w-4xl flex flex-col">
            <div className="mb-6">
              <BackButton />
            </div>

            <div className="cursor-pointer mb-6 flex justify-center" onClick={() => setIsModalOpen(true)}>
              <Image src={product.image} alt={product.name} width={600} height={600} className="object-contain rounded-lg" />
            </div>

            <div className="w-full mt-6 space-y-4 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-light dark:text-white">{product.name}</h1>
              <p className="text-lg sm:text-xl font-medium text-primary">Rs. {product.price}</p>
              <p className="text-muted dark:text-gray-300 leading-relaxed text-sm sm:text-base">{product.description}</p>

              <a
                href={`https://wa.me/923177401136?text=Hi! I'm interested in the ${encodeURIComponent(product.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 text-base font-medium"
              >
                Contact Us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white text-3xl font-bold z-50">
              &times;
            </button>
            <Image src={product.image} alt={product.name} width={1200} height={900} className="object-contain max-h-[90vh] max-w-[90vw]" />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
