
import Navbar from "@/components/navbar";
import AnnouncementCarousel from "@/components/carosel";
import Footer from "@/components/footer";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {



  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Navbar />
      <AnnouncementCarousel />

      <ProductsClient />

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923177401136"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 text-base font-medium shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.719-.911-.99-.241-.271-.471-.247-.669-.119-.198.124-1.541.604-2.104.916-.562.313-.975.892-.975 1.475 0 .583.423 1.208.975 1.781.553.573 3.225 3.492 7.829 4.891.744.223 1.325.297 1.781.198.456-.099 1.432-.594 1.631-.892.198-.297.198-.595.099-.744-.099-.149-.347-.223-.644-.372zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.799 0-10.5-4.701-10.5-10.5S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>

      <Footer />
    </div>
  );
}
