"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { cn } from "~/lib/utils";
import type { ImageProps } from "next/image";

interface CarouselProps {
  items: React.JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeArrow, setActiveArrow] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollLeft = initialScroll;
      checkScrollabilityMobile();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const checkScrollabilityMobile = () => {
    if (mobileCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mobileCarouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    const ref = window.innerWidth < 768 ? mobileCarouselRef : carouselRef;
    if (ref.current) {
      setActiveArrow('left');
      ref.current.scrollBy({ left: -350, behavior: "smooth" });
      setTimeout(() => {
        setActiveArrow(null);
        if (window.innerWidth < 768) {
          checkScrollabilityMobile();
        } else {
          checkScrollability();
        }
      }, 300);
    }
  };

  const handleScrollRight = () => {
    const ref = window.innerWidth < 768 ? mobileCarouselRef : carouselRef;
    if (ref.current) {
      setActiveArrow('right');
      ref.current.scrollBy({ left: 350, behavior: "smooth" });
      setTimeout(() => {
        setActiveArrow(null);
        if (window.innerWidth < 768) {
          checkScrollabilityMobile();
        } else {
          checkScrollability();
        }
      }, 300);
    }
  };

  const handleCardClose = (index: number) => {
    const ref = window.innerWidth < 768 ? mobileCarouselRef : carouselRef;
    if (ref.current) {
      const cardWidth = window.innerWidth < 768 ? 230 : 384;
      const gap = window.innerWidth < 768 ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      ref.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full pb-12 md:pb-16">
        {/* Desktop Layout with Arrows on Left */}
        <div className="hidden md:flex items-center gap-8">
          {/* Desktop Navigation Arrows - Vertical on Left */}
          <div className="flex flex-col gap-3 ml-4">
            <button
              className={cn(
                "relative z-40 flex h-12 w-12 items-center justify-center transition-all",
                activeArrow === 'left' ? "scale-90" : "hover:scale-110",
                !canScrollLeft && "opacity-30"
              )}
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 36L18 24L30 12"
                  stroke={activeArrow === 'left' ? "#FFC700" : "#FFD200"}
                  strokeWidth={activeArrow === 'left' ? "5" : "4"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={cn(
                "relative z-40 flex h-12 w-12 items-center justify-center transition-all",
                activeArrow === 'right' ? "scale-90" : "hover:scale-110",
                !canScrollRight && "opacity-30"
              )}
              onClick={handleScrollRight}
              disabled={!canScrollRight}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M18 12L30 24L18 36"
                  stroke={activeArrow === 'right' ? "#FFC700" : "#FFD200"}
                  strokeWidth={activeArrow === 'right' ? "5" : "4"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Carousel Container */}
          <div
            className="flex-1 overflow-x-scroll overscroll-x-auto scroll-smooth py-8 [scrollbar-width:none]"
            ref={carouselRef}
            onScroll={checkScrollability}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-row justify-start">
              {items.map((item, index) => (
                <div key={"card" + index}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div
            className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-4 [scrollbar-width:none]"
            ref={mobileCarouselRef}
            onScroll={checkScrollabilityMobile}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-row justify-start">
              {items.map((item, index) => (
                <div key={"card" + index}>{item}</div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-8 mt-4">
            <button
              className={cn(
                "w-12 h-12 border-2 border-[#0094D9] flex items-center justify-center transform rotate-45 transition-colors",
                activeArrow === 'left' ? "bg-[#0094D9]/20 scale-95" : "hover:bg-[#0094D9]/10",
                !canScrollLeft && "opacity-30"
              )}
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transform -rotate-45"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#0094D9"
                  strokeWidth={activeArrow === 'left' ? "2.5" : "2"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={cn(
                "w-12 h-12 border-2 border-[#0094D9] flex items-center justify-center transform rotate-45 transition-colors",
                activeArrow === 'right' ? "bg-[#0094D9]/20 scale-95" : "hover:bg-[#0094D9]/10",
                !canScrollRight && "opacity-30"
              )}
              onClick={handleScrollRight}
              disabled={!canScrollRight}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transform -rotate-45"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#0094D9"
                  strokeWidth={activeArrow === 'right' ? "2.5" : "2"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  return (
    <div className="relative shrink-0">
      <div className="relative z-10 flex h-[300px] md:h-[500px] w-[200px] md:w-[350px] flex-col items-start justify-end overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-20" />
        <div className="relative z-30 p-4 md:p-8">
          <p className="text-left font-sans text-lg md:text-3xl font-bold text-white leading-tight">
            {card.title}
          </p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />
      </div>
      {index === 0 && (
        <div className="relative bottom-12 md:bottom-20 left-0 w-20 md:w-36 h-20 md:h-30 bg-[#FFD200]"></div>
      )}
    </div>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  
  const imgStyle = fill ? {
    position: 'absolute' as const,
    height: '100%',
    width: '100%',
    inset: 0,
    objectFit: 'cover' as const,
  } : {};
  
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading="lazy"
      decoding="async"
      alt={alt || "Background of a beautiful view"}
      style={imgStyle}
    />
  );
};