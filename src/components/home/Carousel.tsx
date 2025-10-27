"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { carouselData } from "~/data/home/carouselData";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  return (
    <section className="relative flex h-170 w-full flex-col items-center justify-center overflow-hidden bg-[#0094D9] pt-12 pb-30 md:min-h-screen md:pb-10">
      <div className="absolute inset-0 flex">
        <div className="bg-[#0094D9]" />
      </div>

      <div className="relative flex w-full max-w-6xl items-center justify-center overflow-visible px-6 md:px-0">
        {carouselData.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrev =
            index ===
            (activeIndex - 1 + carouselData.length) % carouselData.length;
          const isNext = index === (activeIndex + 1) % carouselData.length;

          const getTransformX = () => {
            if (isActive) return 0;
            if (isPrev) return -140;
            if (isNext) return 140;
            return 0;
          };

          return (
            <motion.div
              key={slide.id}
              animate={{
                x: `${getTransformX()}%`,
                scale: isActive ? 1.2 : isPrev || isNext ? 1 : 0.5,
                opacity: isActive ? 1 : isPrev || isNext ? 0.8 : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.42, 0, 0.58, 1], // custom easing for smoothness
              }}
              style={{
                zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
              }}
              className={cn(
                "absolute flex flex-col justify-center",
                isActive ? "p-5" : "pt-20",
              )}
            >
              {/* Image */}
              <div
                className={cn(
                  "relative w-[85vw] max-w-[700px] self-center overflow-hidden shadow-2xl transition-all duration-700 ease-in-out",
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
                <motion.div
                  key={`title-${activeIndex}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="absolute bottom-6 flex w-[85vw] max-w-[700px] flex-col self-center"
                >
                  <h2 className="z-30 text-5xl leading-12 font-medium text-white drop-shadow-sm md:text-7xl md:leading-16">
                    {slide.title}
                  </h2>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Left Arrow Desktop */}
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-4 z-30 hidden h-12 w-12 -translate-y-1/2 rotate-45 items-center justify-center border-2 border-white/50 bg-white/10 backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20 md:left-8 md:flex lg:left-16"
          aria-label="Previous slide"
        >
          <ChevronLeft
            className="h-6 w-6 -rotate-45 text-white"
            strokeWidth={2.5}
          />
        </motion.button>

        {/* Right Arrow Desktop */}
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 right-4 z-30 hidden h-12 w-12 -translate-y-1/2 rotate-45 items-center justify-center border-2 border-white/50 bg-white/10 backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20 md:right-8 md:flex lg:right-16"
          aria-label="Next slide"
        >
          <ChevronRight
            className="h-6 w-6 -rotate-45 text-white"
            strokeWidth={2.5}
          />
        </motion.button>

        {/* Left Arrow Mobile */}
        <motion.button
          onClick={handlePrev}
          whileTap={{ scale: 0.95 }}
          className="absolute top-65 left-38 z-30 flex h-12 w-12 rotate-45 transform items-center justify-center border-2 border-white bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 md:hidden"
          aria-label="Previous slide"
        >
          <ChevronLeft
            className="h-6 w-6 -rotate-45 transform text-white"
            strokeWidth={2.5}
          />
        </motion.button>

        {/* Right Arrow Mobile */}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.95 }}
          className="absolute top-75 right-37 z-30 flex h-12 w-12 rotate-45 transform items-center justify-center border-2 border-white bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 md:hidden"
          aria-label="Next slide"
        >
          <ChevronRight
            className="h-6 w-6 -rotate-45 transform text-white"
            strokeWidth={2.5}
          />
        </motion.button>
      </div>
    </section>
  );
}
