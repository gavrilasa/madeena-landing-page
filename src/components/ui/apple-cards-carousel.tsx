"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useCallback, // Import useCallback
  useMemo, // Import useMemo
} from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "~/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarouselProps {
  items: React.JSX.Element[];
  initialScroll?: number;
}

export type CardData = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: (_index: number) => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeArrow, setActiveArrow] = useState<"left" | "right" | null>(null);

  const checkScrollability = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  const checkScrollabilityMobile = useCallback(() => {
    if (mobileCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        mobileCarouselRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  const handleResize = useCallback(() => {
    checkScrollability();
    checkScrollabilityMobile();
  }, [checkScrollability, checkScrollabilityMobile]);

  useEffect(() => {
    const refs = [carouselRef, mobileCarouselRef];
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.scrollLeft = initialScroll;
      }
    });
    handleResize(); // Call handleResize which is now stable
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialScroll, handleResize]);

  const debouncedCheckScrollability = useCallback(
    (isMobile: boolean) => {
      let timer: NodeJS.Timeout | null = null;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          if (isMobile) {
            checkScrollabilityMobile();
          } else {
            checkScrollability();
          }
          setActiveArrow(null);
          timer = null;
        }, 150);
      };
    },
    [checkScrollability, checkScrollabilityMobile],
  );

  const debouncedDesktopCheck = useMemo(
    () => debouncedCheckScrollability(false),
    [debouncedCheckScrollability],
  );
  const debouncedMobileCheck = useMemo(
    () => debouncedCheckScrollability(true),
    [debouncedCheckScrollability],
  );

  const handleScrollLeft = () => {
    const ref = window.innerWidth < 768 ? mobileCarouselRef : carouselRef;
    if (ref.current) {
      setActiveArrow("left");
      ref.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    const ref = window.innerWidth < 768 ? mobileCarouselRef : carouselRef;
    if (ref.current) {
      setActiveArrow("right");
      ref.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    const ref = window.innerWidth < 768 ? mobileCarouselRef : carouselRef;
    if (ref.current) {
      const cardElement = ref.current.children[0]?.children[
        index
      ] as HTMLElement;
      if (cardElement) {
        const scrollPosition =
          cardElement.offsetLeft - (ref.current.offsetLeft || 0);
        ref.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        {/* Desktop Layout */}
        <div className="hidden items-center md:flex">
          <div className="absolute top-1/2 left-4 z-40 flex -translate-y-1/2 flex-col">
            <button
              className={cn(
                "relative flex h-12 w-12 cursor-pointer items-center justify-center transition-all",
                activeArrow === "left" ? "scale-90" : "hover:scale-110",
                !canScrollLeft && "cursor-not-allowed opacity-30",
              )}
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ArrowLeft
                className={cn(
                  "h-12 w-12 transition-colors",
                  activeArrow === "left"
                    ? "stroke-[#FFC700]"
                    : "stroke-[#FFD200]",
                )}
                strokeWidth={activeArrow === "left" ? 3 : 2.5}
              />
            </button>
            <button
              className={cn(
                "relative flex h-12 w-12 cursor-pointer items-center justify-center transition-all",
                activeArrow === "right" ? "scale-90" : "hover:scale-110",
                !canScrollRight && "cursor-not-allowed opacity-30",
              )}
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ArrowRight
                className={cn(
                  "h-12 w-12 transition-colors",
                  activeArrow === "right"
                    ? "stroke-[#FFC700]"
                    : "stroke-[#FFD200]",
                )}
                strokeWidth={activeArrow === "right" ? 3 : 2.5}
              />
            </button>
          </div>
          <div
            className="mx-auto w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-4 pl-20 [scrollbar-width:none]"
            ref={carouselRef}
            onScroll={debouncedDesktopCheck}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-row justify-start">
              {items.map((item, index) => (
                <div key={"card-desktop-" + index}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div
            className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-4 [scrollbar-width:none]"
            ref={mobileCarouselRef}
            onScroll={debouncedMobileCheck}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-row justify-start px-6">
              {items.map((item, index) => (
                <div key={"card-mobile-" + index}>{item}</div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <button
              className={cn(
                "flex h-12 w-12 rotate-45 transform cursor-pointer items-center justify-center border-2 border-[#0094D9] transition-colors",
                activeArrow === "left"
                  ? "scale-95 bg-[#0094D9]/20"
                  : "hover:bg-[#0094D9]/10",
                !canScrollLeft && "cursor-not-allowed opacity-30",
              )}
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="-rotate-45 transform"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#0094D9"
                  strokeWidth={activeArrow === "left" ? "5" : "3"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={cn(
                "flex h-12 w-12 rotate-45 transform cursor-pointer items-center justify-center border-2 border-[#0094D9] transition-colors",
                activeArrow === "right"
                  ? "scale-95 bg-[#0094D9]/20"
                  : "hover:bg-[#0094D9]/50",
                !canScrollRight && "cursor-not-allowed opacity-30",
              )}
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="-rotate-45 transform"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#0094D9"
                  strokeWidth={activeArrow === "right" ? "5" : "3"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index }: { card: CardData; index: number }) => {
  return (
    <div className="relative shrink-0">
      <div className="relative z-10 flex h-[400px] w-[300px] flex-col items-start justify-end overflow-hidden bg-gray-900 md:h-[500px] md:w-[350px]">
        <div className="absolute inset-0 z-20 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-30 p-4 md:p-8">
          <p className="text-left font-sans text-lg leading-tight font-bold text-white md:text-3xl">
            {card.title}
          </p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
          priority={index < 3}
        />
      </div>
      {index === 0 && (
        <div className="relative bottom-12 left-0 h-20 w-50 bg-[#FFD200] md:bottom-20 md:h-30 md:w-87"></div>
      )}
    </div>
  );
};

export const BlurImage = ({
  className,
  alt,
  src,
  fill,
  width,
  height,
  priority,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  const imageProps = fill
    ? {
        fill: true,
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      }
    : { width: width, height: height };

  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "scale-105 blur-sm" : "blur-0 scale-100",
        className,
      )}
      src={src}
      alt={alt || "Background image"}
      onLoad={() => setLoading(false)}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      priority={priority}
      {...imageProps}
      {...rest}
    />
  );
};
