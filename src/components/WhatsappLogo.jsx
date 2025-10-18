import { FaWhatsapp } from "react-icons/fa";
export default function WhatsappLogo() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
      href="https://wa.me/923177401136"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300"
    >
      <FaWhatsapp size={24} />
      
    </a>
    
    </div>
    );
}