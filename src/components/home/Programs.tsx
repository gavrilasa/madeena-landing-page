"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { programsData } from "~/data/academic/programsData";
import { ScrollLine } from "../ui/scroll-line";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Decorative Components ---

function DecorationBlueCircle({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="18" cy="18" r="14.4" stroke="#0193DC" strokeWidth="7.2" />
    </svg>
  );
}

function DecorationYellowShape({ className }: { className?: string }) {
  return (
    <svg
      width="93"
      height="156"
      viewBox="0 0 93 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M35.9829 37.6264H8.87134M8.87134 37.6264C5.12801 37.6264 2.09345 34.5918 2.09345 30.8485V11.0797C2.09345 7.02441 -1.19399 3.73697 -5.24926 3.73697H-9.20303C-13.2583 3.73697 -16.5457 7.02441 -16.5457 11.0797V30.8485C-16.5457 34.5918 -19.5803 37.6264 -23.3236 37.6264H-44.2221C-47.9654 37.6264 -51 40.661 -51 44.4043V50.0525C-51 53.7959 -47.9654 56.8304 -44.2221 56.8304H-23.8885C-19.8332 56.8304 -16.5457 60.1179 -16.5457 64.1731V90.7198C-16.5457 94.7751 -19.8332 98.0626 -23.8885 98.0626H-44.2221C-47.9654 98.0626 -51 101.097 -51 104.84V109.924C-51 113.667 -47.9654 116.702 -44.2221 116.702H-23.8885C-19.8332 116.702 -16.5457 119.989 -16.5457 124.044V144.943C-16.5457 148.686 -13.5112 151.721 -9.76785 151.721H-4.68444C-0.941114 151.721 2.09345 148.686 2.09345 144.943V123.48C2.09345 119.736 5.12801 116.702 8.87134 116.702M8.87134 37.6264H34.8532M8.87134 116.702H35.9829M8.87134 116.702H34.8532M7.74169 37.6264H34.8532M34.8532 37.6264C38.5966 37.6264 35.9829 34.5918 35.9829 30.8485V11.0797C35.9829 7.02441 39.2703 3.73697 43.3256 3.73697H47.2794C51.3346 3.73697 54.6221 7.02441 54.6221 11.0797V30.8485C54.6221 34.5918 57.6566 37.6264 61.4 37.6264H82.2984C86.0418 37.6264 89.0763 40.661 89.0763 44.4043V50.0525C89.0763 53.7959 86.0418 56.8304 82.2984 56.8304H61.9648C57.9095 56.8304 54.6221 60.1179 54.6221 64.1731V90.7198C54.6221 94.7751 57.9095 98.0626 61.9648 98.0626H82.2984C86.0418 98.0626 89.0763 101.097 89.0763 104.84V109.924C89.0763 113.667 86.0418 116.702 82.2984 116.702H61.9648C57.9095 116.702 54.6221 119.989 54.6221 124.044V144.943C54.6221 148.686 51.5875 151.721 47.8442 151.721H42.7608C39.0174 151.721 35.9829 148.686 35.9829 144.943V123.48C35.9829 119.736 38.5966 116.702 34.8532 116.702M34.8532 116.702H7.74169M7.74169 56.8304H28.6402C32.6954 56.8304 35.9829 60.1179 35.9829 64.1731V90.7198C35.9829 94.7751 32.6954 98.0626 28.6402 98.0626H7.74169C4.62225 98.0626 2.09345 95.5338 2.09345 92.4143V90.7198V64.1731V62.4787C2.09345 59.3592 4.62225 56.8304 7.74169 56.8304Z"
        stroke="#F4D406"
        strokeWidth="7.47393"
      />
    </svg>
  );
}

function DecorationGreenStar({ className }: { className?: string }) {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.8214 2.33356C13.9483 -0.777847 18.3486 -0.777845 19.4754 2.33356L21.6993 8.47409C22.0568 9.46125 22.8342 10.2387 23.8214 10.5962L29.9619 12.82C33.0733 13.9469 33.0733 18.3472 29.9619 19.474L23.8214 21.6979C22.8342 22.0554 22.0568 22.8328 21.6993 23.82L19.4754 29.9605C18.3486 33.0719 13.9483 33.0719 12.8214 29.9605L10.5976 23.82C10.2401 22.8328 9.46265 22.0554 8.47549 21.6979L2.33496 19.474C-0.776443 18.3472 -0.776441 13.9469 2.33496 12.82L8.47549 10.5962C9.46265 10.2387 10.2401 9.46125 10.5976 8.47409L12.8214 2.33356Z"
        fill="#77C768"
      />
    </svg>
  );
}

// --- Main Component ---

export default function Programs() {
  const [activeTab, setActiveTab] = useState<"preschool" | "primary">("preschool");
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const data = programsData[activeTab];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
    >
      {/* --- Background Decorations --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Top Left Blue Circle */}
        <DecorationBlueCircle className="absolute left-1 top-12 md:left-24 md:top-24" />

        {/* Bottom Left Yellow Shape */}
        <DecorationYellowShape className="absolute bottom-24 left-0 md:bottom-32 md:left-0" />

        {/* Bottom Right Green Star */}
        <DecorationGreenStar className="absolute bottom-12 right-8 md:bottom-20 md:right-32" />

        {/* Top Right Orange Swirl */}
        {/* UPDATED: Hidden on phone & tablet, visible on desktop (lg+) */}
        <ScrollLine
          containerRef={sectionRef}
          className="hidden lg:block absolute right-0 top-0 w-[400px] z-1"
        />
      </div>

      <div className="@container relative z-10 mx-auto max-w-7xl px-6 back">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-8 text-4xl font-bold text-[#444444] md:text-5xl">
            Our Program
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("preschool")}
              className={cn(
                "rounded-full border px-8 py-2.5 text-sm font-bold transition-all duration-300",
                activeTab === "preschool"
                  ? "border-[#0094D9] bg-[#0094D9] text-white shadow-md"
                  : "border-gray-400 bg-transparent text-gray-500 hover:border-gray-600"
              )}
            >
              Pre School
            </button>
            <button
              onClick={() => setActiveTab("primary")}
              className={cn(
                "rounded-full border px-8 py-2.5 text-sm font-bold transition-all duration-300",
                activeTab === "primary"
                  ? "border-[#0094D9] bg-[#0094D9] text-white shadow-md"
                  : "border-gray-400 bg-transparent text-gray-500 hover:border-gray-600"
              )}
            >
              Primary School
            </button>
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative max-w-6xl mx-auto px-4 md:px-10 lg:px-16">
          <div
            ref={carouselRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth px-4 pb-8 pt-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <AnimatePresence mode="wait">
              {data.map((item, index) => (
                <motion.div
                  key={`${activeTab}-${item.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="w-[280px] shrink-0 snap-center md:w-[320px]"
                >
                  {/* Card */}
                  <div className="flex h-full flex-col rounded-4xl border border-gray-300 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
                    {/* Image */}
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl mb-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                    {/* Title */}
                    <div className="mt-auto text-center pb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="mt-4 flex justify-center gap-8 text-gray-400">
            <button
              onClick={scrollLeft}
              className="transition-colors hover:text-gray-800"
              aria-label="Previous"
            >
              <ArrowLeft className="h-8 w-8" />
            </button>
            <button
              onClick={scrollRight}
              className="transition-colors hover:text-gray-800"
              aria-label="Next"
            >
              <ArrowRight className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}