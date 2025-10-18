import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background-light dark:bg-background-dark shadow-sm ">
      <div className="flex items-center justify-between p-4 px-10">
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

        {/* Mobile Navigation Icons */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/" className="flex items-center justify-center h-10 w-10">
            <span className="material-symbols-outlined text-primary dark:text-white">home</span>
          </Link>
          <Link href="/products" className="flex items-center justify-center h-10 w-10">
            <span className="material-symbols-outlined text-primary dark:text-white">store</span>
          </Link>
          <Link href="/cart" className="flex items-center justify-center h-10 w-10">
            <span className="material-symbols-outlined text-primary dark:text-white">shopping_cart</span>
          </Link>
          <Link href="/profile" className="flex items-center justify-center h-10 w-10">
            <span className="material-symbols-outlined text-primary dark:text-white">person</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}