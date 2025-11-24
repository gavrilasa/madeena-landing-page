"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollLineProps {
  /** Optional class for positioning the wrapper div */
  className?: string;
  /** * The ref of the container element that drives the scroll progress. 
   * If omitted, the animation triggers based on the line itself entering the viewport.
   */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** ScrollTrigger start position (e.g., "top 80%") */
  start?: string;
  /** ScrollTrigger end position (e.g., "bottom 60%") */
  end?: string;
  /** Scrub value for smoothing (default: 1.5) */
  scrub?: number | boolean;
}

export function ScrollLine({
  className = "",
  containerRef,
  start = "top 85%",
  end = "bottom 60%",
  scrub = 1.5,
}: ScrollLineProps) {
  const lineRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const path = lineRef.current;
      // Use the provided containerRef as the trigger source, or fallback to this component's wrapper
      const triggerElement = containerRef?.current || wrapperRef.current;

      if (path && triggerElement) {
        const length = path.getTotalLength();

        // 1. Set initial state: Line is hidden (dashed with gap = length)
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        // 2. Animate: Draw line to 0 offset based on scroll
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none", // Linear easing is crucial for smooth scrubbing
          scrollTrigger: {
            trigger: triggerElement,
            start: start,
            end: end,
            scrub: scrub, // Syncs animation progress with scrollbar
          },
        });
      }
    },
    { 
      scope: wrapperRef, 
      dependencies: [containerRef, start, end, scrub] 
    }
  );

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 348 393"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        // Preserving aspect ratio ensures the line doesn't distort
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={lineRef}
          d="M338.328 -24C319.835 22.8637 263.131 119.871 178.089 160.792C71.7863 211.944 10.339 125.62 77.6782 74.4677C145.017 23.3158 248.817 66.7586 239.923 192.647C231.029 318.536 142.937 367.544 98.8914 378.265C63.6548 386.841 -17.717 381.838 -53.9983 378.265"
          stroke="#FE7D01"
          strokeWidth="19.3074"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}