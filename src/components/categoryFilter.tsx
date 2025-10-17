"use client";

import { useState } from "react";

interface CategoryFilterProps {
  onCategoryChange?: (category: string) => void;
}

const categories = [
  { id: "all", name: "All", icon: "apps" },
  { id: "bed", name: "Bed", icon: "bed" },
  { id: "sofa", name: "Sofa", icon: "weekend" },
  { id: "table", name: "Table", icon: "table_bar" },
  { id: "cupboard", name: "Cupboard", icon: "door_front" },
  { id: "chairs", name: "Chairs", icon: "chair_alt" },
  { id: "other", name: "Other", icon: "category" }, // ✅ Added this line
];



export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="flex gap-3 p-4 pl-24 overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all
            ${activeCategory === category.id
              ? "bg-primary text-white shadow-lg"
              : "bg-background-light dark:bg-background-dark shadow-sm text-text-light dark:text-white hover:shadow-md"
          }`}
        >
          <span className="material-symbols-outlined text-xl text-black">{category.icon}</span>
          <p className="text-sm font-medium leading-normal whitespace-nowrap text-black">{category.name}</p>
        </button>
      ))}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
