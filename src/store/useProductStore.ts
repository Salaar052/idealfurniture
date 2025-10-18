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
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products/get");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      set({ products: data.products || [] });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
