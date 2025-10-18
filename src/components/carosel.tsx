import Image from "next/image";

export default function AnnouncementCarousel() {
  const images = [
    "/images/img1.webp",
    "/images/img3.webp",
    "/images/img4.webp",
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Image Carousel */}
      <div className="relative w-full overflow-hidden h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[26rem]">
        <div className="carousel-track flex w-full h-full animate-slide">
          {images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full relative">
              <Image
                src={img}
                alt={`slide-${index}`}
                fill
                className="object-cover object-center"
                priority={index === 0} // ensures fastest LCP
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full bg-white/50 ${idx === 0 ? "animate-pulse" : ""}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Announcement Text Marquee */}
      <div className="overflow-hidden bg-yellow-300 py-3">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-black text-sm sm:text-base font-semibold px-4">
            Free delivery in PirMahal • New arrivals this week • Shop our seasonal sale! • Free delivery in PirMahal • New arrivals this week • Shop our seasonal sale!
          </span>
        </div>
      </div>
    </div>
  );
}
