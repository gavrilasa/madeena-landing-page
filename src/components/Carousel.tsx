"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { carousel } from "~/data/Carousel";


export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carousel.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? carousel.length - 1 : prev - 1));
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-170 pb-30 md:pb-10 md:min-h-screen bg-[#0094D9] overflow-hidden">
      {/* Background Split */}
      <div className="absolute inset-0 flex">
        <div className="bg-[#0094D9]" />
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-6xl flex items-center justify-center overflow-visible px-6 md:px-0">
        {carousel.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrev =
            index === (activeIndex - 1 + carousel.length) % carousel.length;
          const isNext = index === (activeIndex + 1) % carousel.length;

          return (
            <div
              key={slide.id}
              className={cn(
                "absolute transition-all duration-700 ease-in-out flex flex-col items-center justify-center",
                isActive
                  ? "z-20 scale-100 md:scale-120 opacity-100 p-5"
                  : isPrev || isNext
                  ? "z-10 scale-100 opacity-80 pt-20"
                  : "z-0 scale-50 opacity-0"
              )}
              style={{
                transform: isActive
                  ? "translateX(0)"
                  : isPrev
                  ? "translateX(-140%)"
                  : isNext
                  ? "translateX(140%)"
                  : "translateX(0)",
              }}
            >
              {/* Image */}
              <div
                className={cn(
                  "relative w-[85vw] max-w-[700px] shadow-2xl overflow-hidden",
                  "aspect-9/12 md:aspect-video",
                  !isActive && "brightness-75 blur-[1px]"
                )}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Title */}
              {isActive && (
                <div className="flex flex-col -mt-8 md:-mt-12 items-center">
                  <h2 className="z-30 text-white leading-12 text-left text-5xl md:text-7xl md:leading-20 md:pr-10 font-medium drop-shadow-lg">
                    {slide.title}
                  </h2>
                </div>
              )}
            </div>
          );
        })}

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute pt left-38 top-70 md:left-16 md:top-0 w-12 h-12 border-2 border-white flex items-center justify-center transform rotate-45 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md z-30"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="transform -rotate-45"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute top-80 right-37 pb-0 md:right-16 md:top-0 w-12 h-12 border-2 border-white flex items-center justify-center transform rotate-45 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md z-30"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="transform -rotate-45"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}