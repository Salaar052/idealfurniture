

export default function AnnouncementCarousel() {
  const images = [
    "/images/img1.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Image Carousel */}
      <div className="relative w-full overflow-hidden h-48 sm:h-56 md:h-64 lg:h-102">
        <div className="carousel-track flex w-full h-full animate-slide">
          {images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <img
                src={img}
                alt={`slide-${index}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
      </div>

      {/* Announcement Text Marquee */}
      <div className="overflow-hidden bg-primary/20 dark:bg-primary/30 py-3 bg-yellow-300">
        <div className="animate-marquee whitespace-nowrap inline-block ">
          <span className="text-white dark:text-black text-sm sm:text-base font-large px-4">
            Free delivery in PirMahal • New arrivals this week • Shop our seasonal sale! • Free delivery in PirMahal • New arrivals this week • Shop our seasonal sale!
          </span>
        </div>
      </div>
    </div>
  );
}