"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    console.log("Form submitting...");
    console.log("Name:", formData.get("name"));
    console.log("Price:", formData.get("price"));
    console.log("Category:", formData.get("category"));
    console.log("Description:", formData.get("description"));
    console.log("Image:", formData.get("image"));

    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      console.log("Response received:", res);

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add product");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("An error occurred while adding the product");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md p-4 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-gray-900">
          Add New Product
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col p-6">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-2xl space-y-6"
        >
          {/* Error Message */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
              <svg
                className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Image Upload */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Image *
            </label>
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      const input = document.getElementById(
                        "image"
                      ) as HTMLInputElement;
                      if (input) input.value = "";
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Click to upload image
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </label>
              )}
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 space-y-5">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g., Modern Velvet Sofa"
                className="text-black w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label 
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Price (Rs) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                 
                </span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="1"
                  min="0"
                  required
                  placeholder="0"
                  className="text-black w-full rounded-xl border border-gray-300 pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="text-black w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select a category</option>
                <option value="bed">Bed</option>
                <option value="sofa">Sofa</option>
                <option value="table">Table</option>
                <option value="cupboard">Cupboard</option>
                <option value="chairs">Chairs</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Describe the product features, materials, dimensions, etc."
                className="text-black w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="flex-1 rounded-xl bg-gray-100 px-6 py-4 text-base font-semibold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-orange-600 px-6 py-4 text-base font-semibold text-white hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Adding...
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
