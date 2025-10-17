"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">IdealFurniture</h3>
            <p className="text-sm text-muted dark:text-gray-400">
              Quality furniture for every room in your home. Transform your space with style and comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-primary dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "All Products", href: "/products" },
                { name: "About Us", href: "#" },
                { name: "Contact", href: "https://wa.me/923177401136" },
                { name: "Blog", href: "https://blogify-l42d.onrender.com/" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-primary dark:text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              {[
                { name: "Living Room", href: "#" },
                { name: "Bedroom", href: "#" },
                { name: "Dining Room", href: "#" },
                { name: "Office", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service + Contact */}
          <div>
            <h4 className="text-sm font-bold text-primary dark:text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {[
                { name: "Shipping Info", href: "/shipping" },
                { name: "Returns", href: "/returns" },
                { name: "FAQ", href: "/faq" },
                { name: "Support", href: "/support" },
              ].map((link) => (
                <li key={link.name}>
                  <p className="text-sm text-muted dark:text-gray-400 hover:text-primary transition-colors">
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            {/* Email Contact */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-primary dark:text-white mb-2">
                Get in Touch
              </h5>
              <a
                href="mailto:salaarasim345@gmail.com"
                className="text-sm text-muted dark:text-gray-400 hover:text-primary transition-colors"
              >
                Contact Developer
              </a>
            </div>
          </div>
        </div>
{/* Visit Us Section */}
<div className="mt-8 flex flex-col md:flex-row items-start justify-between gap-6">
  {/* Left: Address */}
  <div className="md:w-1/2">
    <h5 className="text-lg font-semibold text-primary dark:text-white mb-2">
      Visit Our Showroom
    </h5>
    <p className="text-sm text-muted dark:text-gray-400 mb-2">
      Ideal Furniture Mart<br />
      Shorkot Road Opposite to Technical College, Pirmahal, Pakistan
    </p>
    <p className="text-sm text-muted dark:text-gray-400 mb-2">
      📞 +92 317 7401136<br />
      ✉️ salaarasim@gmail.com
    </p>
    <a
      href="https://maps.app.goo.gl/oCV8LPMERjmdtHDh9"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-2 text-primary hover:underline font-medium"
    >
      View on Google Maps →
    </a>
  </div>

  {/* Right: Google Maps Preview */}
  <div className="md:w-1/2">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109688.97381993107!2d72.36968260063095!3d30.780741371659747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3923170f5ed9f147%3A0x78d85919434c806c!2sIdeal%20Furniture%20Mart!5e0!3m2!1sen!2s!4v1760704863321!5m2!1sen!2s"
      width="100%"
      height="200"
      allowFullScreen
      loading="lazy"
      className="rounded-lg border border-gray-200 dark:border-gray-700"
    ></iframe>
  </div>
</div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted dark:text-gray-400">
              © 2025 IdealFurniture. All rights reserved.
            </p>

            <p className="text-sm text-muted dark:text-gray-400">
              Built with ❤️ by{" "}
              <span className="font-semibold text-primary">Salaar Asim</span>
            </p>

            <div className="flex gap-4">
              <p className="text-sm text-muted dark:text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </p>
              <p className="text-sm text-muted dark:text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
