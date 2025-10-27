"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { carouselData } from "~/data/home/carouselData";

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  return (
    <section className="relative flex h-170 w-full flex-col items-center justify-center overflow-hidden bg-[#0094D9] pb-30 md:min-h-screen md:pb-10">
      {/* Background Split */}
      <div className="absolute inset-0 flex">
        <div className="bg-[#0094D9]" />
      </div>

      {/* Carousel Container */}
      <div className="relative flex w-full max-w-6xl items-center justify-center overflow-visible px-6 md:px-0">
        {carouselData.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrev =
            index ===
            (activeIndex - 1 + carouselData.length) % carouselData.length;
          const isNext = index === (activeIndex + 1) % carouselData.length;

          return (
            <div
              key={slide.id}
              className={cn(
                "absolute flex flex-col items-center justify-center transition-all duration-700 ease-in-out",
                isActive
                  ? "z-20 scale-100 p-5 opacity-100 md:scale-120"
                  : isPrev || isNext
                    ? "z-10 scale-100 pt-20 opacity-80"
                    : "z-0 scale-50 opacity-0",
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
                  "relative w-[85vw] max-w-[700px] overflow-hidden shadow-2xl",
                  "aspect-9/12 md:aspect-video",
                  !isActive && "blur-[1px] brightness-75",
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
                <div className="-mt-8 flex flex-col items-center md:-mt-12">
                  <h2 className="z-30 text-left text-5xl leading-12 font-medium text-white drop-shadow-lg md:pr-10 md:text-7xl md:leading-20">
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
          className="pt absolute top-70 left-38 z-30 flex h-12 w-12 rotate-45 transform items-center justify-center border-2 border-white bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 md:top-0 md:left-16"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="-rotate-45 transform"
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
          className="absolute top-80 right-37 z-30 flex h-12 w-12 rotate-45 transform items-center justify-center border-2 border-white bg-white/10 pb-0 backdrop-blur-md transition-colors hover:bg-white/20 md:top-0 md:right-16"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="-rotate-45 transform"
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
