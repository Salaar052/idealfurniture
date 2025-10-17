"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  initialProducts: Product[];
}

export default function AdminDashboardClient({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; product: Product | null }>({
    show: false,
    product: null,
  });
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
  if (!deleteModal.product) return;

  setDeleting(true);
  try {
    const res = await fetch(`/api/products/delete/${deleteModal.product._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setProducts(products.filter((p) => p._id !== deleteModal.product?._id));
      setDeleteModal({ show: false, product: null });
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("An error occurred");
  } finally {
    setDeleting(false);
  }
};



  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md p-4 pb-2 shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center">
    <button
      onClick={() => router.back()}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
    >
      <svg
        className="h-6 w-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  </div>
        <div className="flex h-12 w-12 shrink-0 items-center"></div>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-gray-900">
          All Products
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button
            onClick={() => router.push("/products/add")}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-orange-600 text-white shadow-lg hover:bg-orange-700 transition-all hover:scale-105"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="flex flex-1 flex-col space-y-4 px-4 py-6">
        {products.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-500">
            <h3 className="mt-4 text-lg font-medium text-gray-900">No products yet</h3>
            <p className="mt-1 text-sm text-gray-600">Tap the '+' button to add your first item.</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 transition-all hover:shadow-md">
              {/* Delete Action */}
              <div className="absolute right-0 top-0 flex h-full w-20 translate-x-full items-center justify-center bg-red-500 text-white transition-transform group-hover:translate-x-0">
                <button
                  onClick={() => setDeleteModal({ show: true, product })}
                  className="flex h-full w-full flex-col items-center justify-center gap-1"
                >
                  <span className="text-xs font-medium">Delete</span>
                </button>
              </div>

              {/* Product Content */}
              <div className="flex items-center justify-between gap-4 p-4 transition-transform group-hover:-translate-x-20">
                <div className="flex items-center gap-4">
                  <div
                    className="h-16 w-16 flex-shrink-0 rounded-lg bg-cover bg-center bg-no-repeat shadow-sm"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="line-clamp-1 text-base font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm font-medium text-orange-600">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => router.push("/products/add")}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white shadow-2xl transition-all hover:scale-110 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-gray-900">Delete Product?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete "<span className="font-semibold">{deleteModal.product?.name}</span>"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, product: null })}
                disabled={deleting}
                className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
