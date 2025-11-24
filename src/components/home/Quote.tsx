"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollLine } from "~/components/ui/scroll-line";
import { BluePattern } from "~/components/ui/blue-pattern";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Quote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Content Elements Entrance
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          },
          0.1,
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative z-20 w-full">
      {/* The White Card Container */}
      <div className="relative -mt-24 flex min-h-screen flex-col overflow-hidden rounded-t-[3rem] bg-white pt-24 pb-24 md:-mt-32 md:rounded-t-[5rem] md:pt-32 md:pb-32 lg:rounded-t-[80px]">
        {/* --- ScrollLine Component (Left) --- */}
        {/* Updated width for mobile: w-[180px] instead of w-[100px] and adjusted positioning */}
        <ScrollLine
          containerRef={sectionRef}
          className="absolute top-0 left-0 z-10 w-[180px] -translate-x-8 -translate-y-6 sm:w-[220px] sm:-translate-x-10 sm:-translate-y-8 md:top-10 md:w-[280px] md:translate-x-0 md:-translate-y-12 lg:w-[348px]"
          start="top 85%"
          end="center center"
        />

        {/* --- BluePattern Component (Right) --- */}
        <BluePattern
          containerRef={sectionRef}
          className="absolute top-20 right-0 z-10 w-[50px] translate-x-1/4 sm:w-[70px] md:top-1/2 md:w-[90px] md:-translate-y-1/2 lg:w-[120px]"
        />

        {/* 3. Custom Decorative Elements (Circle & Star) */}
        <div className="absolute bottom-24 left-4 h-6 w-6 rounded-full border-4 border-green-500 sm:left-12 sm:h-8 sm:w-8 sm:border-[6px] md:bottom-40 md:left-40 md:h-12 md:w-12" />
        <div className="absolute right-4 bottom-32 rotate-12 text-yellow-500 sm:right-12 md:right-48 md:bottom-48">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1581 3.55336C18.9112 -1.18442 25.6122 -1.18443 27.3654 3.55335L30.1713 11.1362C30.7225 12.6258 31.8969 13.8002 33.3864 14.3514L40.9693 17.1573C45.7071 18.9104 45.7071 25.6114 40.9693 27.3646L33.3864 30.1705C31.8969 30.7217 30.7225 31.8961 30.1713 33.3856L27.3654 40.9685C25.6122 45.7063 18.9112 45.7063 17.1581 40.9685L14.3521 33.3856C13.801 31.8961 12.6266 30.7217 11.137 30.1705L3.55415 27.3646C-1.18363 25.6115 -1.18364 18.9104 3.55414 17.1573L11.137 14.3514C12.6266 13.8002 13.801 12.6258 14.3521 11.1362L17.1581 3.55336Z"
              fill="#F4D406"
            />
          </svg>
        </div>

        {/* Content Container - Centered Vertical & Horizontal */}
        <div
          ref={contentRef}
          className="relative z-20 container mx-auto flex flex-1 flex-col items-center justify-center px-6 text-center"
        >
          <div className="relative mb-6 h-24 w-24 sm:mb-8 sm:h-28 sm:w-28 md:h-36 md:w-36">
            {/* Static Logo */}
            <Image
              src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763885433/logo-without-text_iuydhz.svg"
              alt="Al Madeena Logo"
              fill
              className="object-contain"
            />
            {/* Rotating Ring */}
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
              <Image
                src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763885433/outer-text-logo_plu5w0.svg"
                alt="Text Ring"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>

          <h2 className="mb-3 font-sans text-xl leading-relaxed font-bold text-gray-900 sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
            Growing Golden Generation <br></br> with Islamic Character
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed font-medium text-gray-600 sm:text-base md:text-lg">
            At Al Madeena, we lead them to be a smart generation, good manner,
            and ready to face the future.
          </p>
        </div>
      </div>
    </section>
  );
}
