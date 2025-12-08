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
        // UPDATED: Reduced vertical padding for a tighter, cleaner look
        "relative w-full overflow-hidden bg-white pt-24 pb-12 md:pt-32 md:pb-16",
        className,
      )}
    >
      {/* --- Background Decorations --- */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        {/* Scroll Line (Left side) */}
        <ScrollLine
          containerRef={containerRef}
          className="absolute -left-2 top-0 w-[100px] md:left-0 md:top-0 md:w-[180px] lg:w-[220px]"
        />

        {/* Green Ring (Top Right) - Adjusted position to match new height */}
        <DecorationGreenRing className="absolute top-12 right-6 h-6 w-6 md:right-36 md:top-16 md:h-10 md:w-10" />

        {/* Blue Pattern (Right Side) */}
        <BluePattern
          containerRef={containerRef}
          className="hidden md:block absolute right-0 top-1/2 w-24 -translate-y-1/4 translate-x-1/3 md:w-40 md:translate-x-1/4"
        />

        {/* Yellow Star (Bottom Left) */}
        <DecorationYellowStar className="absolute bottom-6 left-4 h-8 w-8 rotate-12 md:bottom-0 md:left-32 md:h-12 md:w-12" />
      </div>

      {/* --- Content --- */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* UPDATED: Added max-width and adjusted font sizes for better readability */}
        <h1 className="mx-auto mb-4 max-w-4xl font-sans text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mx-auto max-w-2xl text-base font-medium leading-relaxed md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}