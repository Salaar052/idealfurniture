"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setIsNavigating(true);
    setIsMobileMenuOpen(false);
    router.push(path);
    // Reset loading state after navigation
    setTimeout(() => setIsNavigating(false), 500);
  };

  return (
    <>
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-yellow/30 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm font-medium text-white">Loading...</p>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-background-light dark:bg-background-dark shadow-sm">
        <div className="flex items-center justify-between p-4 px-6 md:px-10">
          {/* Logo */}
          <button
            onClick={() => handleNavigation("/")}
            disabled={isNavigating}
            className="text-xl font-bold tracking-tight text-primary dark:text-white hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            IdealFurniture
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavigation("/")}
              disabled={isNavigating}
              className="flex items-center gap-2 text-primary dark:text-white hover:text-primary transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-sm font-medium">Home</span>
            </button>
            <button
              onClick={() => handleNavigation("/products")}
              disabled={isNavigating}
              className="flex items-center gap-2 text-primary dark:text-white hover:text-primary transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">store</span>
              <span className="text-sm font-medium">Products</span>
            </button>
            <button
              onClick={() => handleNavigation("/admin/dashboard")}
              disabled={isNavigating}
              className="flex items-center gap-2 text-primary dark:text-white hover:text-primary transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">person</span>
              <span className="text-sm font-medium">Admin</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              disabled={isNavigating}
              className="text-primary dark:text-white text-2xl focus:outline-none disabled:opacity-50"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              title={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background-light dark:bg-background-dark shadow-md">
            <button
              onClick={() => handleNavigation("/")}
              disabled={isNavigating}
              className="block w-full text-left px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/products")}
              disabled={isNavigating}
              className="block w-full text-left px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              Products
            </button>
            <button
              onClick={() => handleNavigation("/admin/dashboard")}
              disabled={isNavigating}
              className="block w-full text-left px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              Admin
            </button>
          </div>
        )}
      </nav>
    </>
  );
}