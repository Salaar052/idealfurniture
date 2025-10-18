import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  productCount: number; // <-- changed Number to number
  setProductCount: (productCount: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  productCount: 0, // initialize
  setProducts: (products) => set({ products }),
  setProductCount: (productCount) => set({ productCount }),
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products/get");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      const products = data.products || [];
      set({ products, productCount: products.length }); // set count here
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
