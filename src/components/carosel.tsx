import Image from "next/image";

export default function AnnouncementCarousel() {
  const images = [
    "/images/img1.webp",
    "/images/img3.webp",
    "/images/img4.webp",
  ];

  return (
    <section className="flex flex-col w-full">
      {/* 🔥 Hero Section (LCP Critical) */}
      <div className="relative w-full overflow-hidden h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[26rem]">
        
        {/* ✅ Render ONLY first image initially for faster LCP */}
        <div className="relative w-full h-full">
          <Image
            src={images[0]}
            alt="Hero banner"
            fill
            className="object-cover object-center"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>

        {/* ✅ Carousel images (deferred) */}
        <div className="carousel-track flex w-full h-full animate-slide absolute inset-0">
          {images.slice(1).map((img, index) => (
            <div
              key={index}
              className="relative w-full flex-shrink-0 h-full"
              style={{ flex: "0 0 100%" }}
            >
              <Image
                src={img}
                alt={`slide-${index + 1}`}
                fill
                className="object-cover object-center"
                loading="lazy"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* ✅ Navigation Dots (CLS safe) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 h-3">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`block w-2 h-2 rounded-full bg-white/60 ${
                idx === 0 ? "opacity-100" : "opacity-60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ✅ Announcement Bar (Non-critical) */}
      <div className="overflow-hidden bg-yellow-300 py-3">
        <div className="animate-marquee whitespace-nowrap inline-block will-change-transform">
          <span className="text-black text-sm sm:text-base font-semibold px-4">
            Free delivery in PirMahal • New arrivals this week • Shop our
            seasonal sale! • Free delivery in PirMahal • New arrivals this week
            • Shop our seasonal sale!
          </span>
        </div>
      </div>
    </section>
  );
}
