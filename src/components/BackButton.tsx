// app/products/[slug]/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-primary dark:text-white hover:text-primary transition-colors duration-200 text-base font-bold"
    >
      <ChevronLeftIcon className="w-6 h-6" />
      Back
    </button>
  );
}