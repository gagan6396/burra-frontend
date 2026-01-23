import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Sample slides - replace with your actual images
  const slides = [
    {
      desktop: "/Home banner 02_V02.webp",
      mobile: "/Home banner 01_V01.webp",
      alt: "Slide 1",
    },
    {
      desktop: "/Home banner22.webp",
      mobile: "/Home banner 02_V01.webp",
      alt: "Slide 1",
    },
    {
      desktop: "/Home banner_V03.webp",
      mobile: "/Home banner 03_V01.webp",
      alt: "Slide 1",
    },
    
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality - continuous, no hover pause
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full bg-gray-900 mt-20 overflow-hidden">
      {/* Slides Container - Auto height based on image */}
      <div className="relative w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 absolute inset-0"
            }`}
          >
            <img
              src={isMobile ? slide.mobile : slide.desktop}
              alt={slide.alt}
              className="w-full h-auto max-w-full"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 
                   bg-white/20 backdrop-blur-md hover:bg-white/30 
                   text-white p-3 md:p-4 rounded-full 
                   transition-all duration-300 hover:scale-110 
                   border border-white/20 hover:border-white/40
                   group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 
                   bg-white/20 backdrop-blur-md hover:bg-white/30 
                   text-white p-3 md:p-4 rounded-full 
                   transition-all duration-300 hover:scale-110 
                   border border-white/20 hover:border-white/40
                   group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 
                      flex gap-2 md:gap-3 bg-black/20 backdrop-blur-md 
                      px-4 py-2 rounded-full border border-white/20"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full border-2 ${
              index === currentIndex
                ? "w-8 md:w-10 h-2 md:h-3 bg-white border-white"
                : "w-2 md:w-3 h-2 md:h-3 bg-white/50 border-white/50 hover:bg-white/70 hover:border-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}