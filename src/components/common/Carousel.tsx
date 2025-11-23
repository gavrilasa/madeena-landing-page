"use client";

import { useRef, useEffect, useState, type ElementType } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProgramCard {
  id: number;
  title: string;
  description: string;
  icon?: ElementType;
  image: string;
  link: string;
  cta: string;
}

interface ProgramCarouselProps {
  items: ProgramCard[];
}

const ArrowLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function ProgramCarousel({ items }: ProgramCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScrollability();
  }, [items]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Cards Carousel */}
      <div
        ref={carouselRef}
        onScroll={checkScrollability}
        className="flex w-full overflow-x-scroll scroll-smooth py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-4 pr-4 pl-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group relative h-[400px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-3xl md:h-[500px] md:w-[350px]"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                fill
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <h3 className="text-2xl leading-tight font-bold text-white md:text-3xl">
                  {item.title}
                </h3>

                {/* CTA on hover */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-2 text-sm font-medium text-white/90 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                      {item.cta} &rarr;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-end gap-2 pr-4">
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 transition-opacity disabled:opacity-30"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ArrowLeft />
        </button>
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 transition-opacity disabled:opacity-30"
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}