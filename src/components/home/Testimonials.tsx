"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { testimonialData } from "~/data/home/testimonialData";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import {
  DecorationQuote,
  DecorationQuoteInverted,
  DecorationCircleWhite,
  DecorationStarWhite,
} from "./testimonials/TestimonialDecorations";

// --- Animation Config ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

export default function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const playTimeoutRef = useRef<Record<number, NodeJS.Timeout | null>>({});

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    const existingTimeout = playTimeoutRef.current[id];
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }
    playTimeoutRef.current[id] = setTimeout(() => {
      const video = videoRefs.current[id];
      if (video) {
        video.play().catch((error: Error) => {
          if (error.name !== "AbortError") {
            console.error("Gagal memulai video:", error);
          }
        });
      }
    }, 300);
  };

  const handleMouseLeave = (id: number) => {
    const existingTimeout = playTimeoutRef.current[id];
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      playTimeoutRef.current[id] = null;
    }
    setHoveredId(null);
    const video = videoRefs.current[id];
    if (video) {
      if (!video.paused) {
        video.pause();
      }
      video.currentTime = 0;
    }
  };

  const handleVideoClick = (id: number) => {
    const existingTimeout = playTimeoutRef.current[id];
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      playTimeoutRef.current[id] = null;
    }
    setSelectedVideo(id);
    Object.values(videoRefs.current).forEach((video) => {
      if (video && !video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setHoveredId(null);
  };

  const handleCloseModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
  };

  useEffect(() => {
    if (selectedVideo && modalVideoRef.current) {
      modalVideoRef.current.play().catch((error: Error) => {
        console.error("Gagal memutar video modal:", error);
      });
    }
  }, [selectedVideo]);

  const selectedTestimonial = testimonialData.find(
    (t) => t.id === selectedVideo,
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#F5C546] py-20 md:py-32">
      {/* --- Background Decorations --- */}
      <div className="absolute inset-0 pointer-events-none">
        <DecorationQuote className="absolute top-10 left-6 w-24 h-24 md:top-16 md:left-20 md:w-32 md:h-32" />
        <DecorationCircleWhite className="absolute top-16 right-10 md:top-24 md:right-32" />
        <DecorationStarWhite className="absolute bottom-12 left-8 w-12 h-12 md:bottom-20 md:left-32" />
        <DecorationQuoteInverted className="absolute bottom-10 right-6 w-24 h-24 md:bottom-16 md:right-20 md:w-32 md:h-32" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-sm"
        >
          Testimonials
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonialData.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeIn}
              className="flex h-[400px] flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => handleVideoClick(item.id)}
            >
              {/* Card Title (Category) */}
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {item.type === "Parent"
                  ? "Parents"
                  : item.type === "Student"
                  ? "Students"
                  : item.type}
              </h3>

              {/* Video/Image Container */}
              <div
                className="relative flex-1 w-full overflow-hidden rounded-2xl bg-black cursor-pointer group"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={cn(
                    "absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300",
                    hoveredId === item.id ? "opacity-0" : "opacity-100"
                  )}
                />
                <video
                  ref={(el) => {
                    videoRefs.current[item.id] = el;
                  }}
                  className={cn(
                    "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300",
                    hoveredId === item.id ? "opacity-100" : "opacity-0"
                  )}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={item.video} type="video/mp4" />
                </video>

                {/* Overlay Text inside Video */}
                <div
                  className={cn(
                    "absolute inset-0 z-20 flex flex-col items-center justify-end p-6 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
                    hoveredId === item.id ? "opacity-0" : "opacity-100"
                  )}
                >
                  <p className="text-white font-semibold text-lg">{item.name}</p>
                  <div className="mt-2 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl cursor-default overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="aspect-video">
              <video
                ref={modalVideoRef}
                className="h-full w-full"
                controls
                autoPlay
                playsInline
              >
                <source src={selectedTestimonial.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedTestimonial.name} - {selectedTestimonial.type}
              </h3>
              <p className="text-gray-600">
                &quot;{selectedTestimonial.text}&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}