"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background-light dark:bg-background-dark shadow-sm">
      <div className="flex items-center justify-between p-4 px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-primary dark:text-white">
          IdealFurniture
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-primary dark:text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">home</span>
            <span className="text-sm font-medium">Home</span>
          </Link>
          <Link href="/products" className="flex items-center gap-2 text-primary dark:text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">store</span>
            <span className="text-sm font-medium">Products</span>
          </Link>
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-primary dark:text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm font-medium">Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary dark:text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-light dark:bg-background-dark shadow-md">
          <Link
            href="/"
            className="block px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/admin/dashboard"
            className="block px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin
          </Link>
          <Link
            href="/cart"
            className="block px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cart
          </Link>
          <Link
            href="/profile"
            className="block px-6 py-3 text-primary dark:text-white hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}
