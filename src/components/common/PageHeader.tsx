"use client";

import { useRef } from "react";
import { ScrollLine } from "~/components/ui/scroll-line";
import { BluePattern } from "~/components/ui/blue-pattern";
import { cn } from "~/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  className?: string;
}

// Decorative Yellow Star Component
function DecorationYellowStar({ className }: { className?: string }) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.1581 3.55336C18.9112 -1.18442 25.6122 -1.18443 27.3654 3.55335L30.1713 11.1362C30.7225 12.6258 31.8969 13.8002 33.3864 14.3514L40.9693 17.1573C45.7071 18.9104 45.7071 25.6114 40.9693 27.3646L33.3864 30.1705C31.8969 30.7217 30.7225 31.8961 30.1713 33.3856L27.3654 40.9685C25.6122 45.7063 18.9112 45.7063 17.1581 40.9685L14.3521 33.3856C13.801 31.8961 12.6266 30.7217 11.137 30.1705L3.55415 27.3646C-1.18363 25.6115 -1.18364 18.9104 3.55414 17.1573L11.137 14.3514C12.6266 13.8002 13.801 12.6258 14.3521 11.1362L17.1581 3.55336Z"
        fill="#F4D406"
      />
    </svg>
  );
}

// Decorative Green Ring Component
function DecorationGreenRing({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="18" cy="18" r="14" stroke="#77C768" strokeWidth="6" />
    </svg>
  );
}

export default function PageHeader({
  title,
  subtitle,
  className,
}: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-white pt-32 pb-16 md:pt-48 md:pb-28",
        className
      )}
    >
      {/* --- Background Decorations --- */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        {/* Scroll Line (Left side - Orange Swirl) 
          - Reduced width to make it shorter (w-[120px] mobile, w-[260px] desktop)
          - Adjusted positioning to ensure it ends near the middle/center vertically
        */}
        <ScrollLine
          containerRef={containerRef}
          className="absolute -left-8 -top-8 w-[120px] md:left-0 md:top-0 md:w-[220px] lg:w-[260px]"
        />

        {/* Green Ring (Top Right) */}
        <DecorationGreenRing className="absolute right-8 top-24 w-6 h-6 md:right-56 md:top-24 md:w-10 md:h-10" />

        {/* Blue Pattern (Right Side) */}
        <BluePattern
          containerRef={containerRef}
          className="absolute right-0 top-1/2 w-24 -translate-y-1/2 translate-x-1/3 md:w-48 md:translate-x-1/4"
        />

        {/* Yellow Star (Bottom Left) */}
        <DecorationYellowStar className="absolute bottom-10 left-10 w-8 h-8 md:bottom-10 md:left-32 md:w-12 md:h-12 rotate-12" />
      </div>

      {/* --- Content --- */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <h1 className="mb-4 font-sans text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-gray-600 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}