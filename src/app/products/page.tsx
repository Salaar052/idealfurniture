import Navbar from "@/components/navbar";
import AnnouncementCarousel from "@/components/carosel";
import Footer from "@/components/footer";
import ProductsClient from "./ProductsClient";
import WhatsappLogo from "@/components/WhatsappLogo";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Navbar />
      <AnnouncementCarousel />

      <ProductsClient />

      <WhatsappLogo />
      <Footer />
    </div>
  );
}
