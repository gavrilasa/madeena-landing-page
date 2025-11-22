"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { testimonialData } from "~/data/home/testimonialData";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion"; // Impor motion

// --- Fungsionalitas Video (Utuh dari file Anda) ---
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
  // --- Akhir Fungsionalitas Video ---

  // --- Animasi (Diambil dari desain Academic/GetToKnow) ---
  const fadeIn = {
    initial: { opacity: 0, y: 50 },
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
  // --- Akhir Animasi ---

  return (
    <section className="overflow-x-hidden bg-white px-6 py-16 md:px-12 md:py-24 lg:px-16">
      <div className="container mx-auto px-6">
        {/* Header Section (Dari file Anda) */}
        <motion.div
          className="mb-12 grid grid-cols-1 items-start gap-6 md:mb-16 md:grid-cols-3 lg:gap-12"
          initial="initial"
          whileInView="whileInView"
          variants={fadeIn}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Let&apos;s Hear
            </h2>
            <h1 className="text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              What They Say
            </h1>
          </div>
          <div className="md:col-span-1 md:pt-2">
            <p className="max-w-lg text-[#828282]">
              Al Madeena is a modern Islamic school that blends faith and
              knowledge to nurture intelligent, kind, and confident learners
              prepared for the future.
            </p>
          </div>
        </motion.div>

        {/* --- Container Kartu Grid --- */}
        <motion.div
          className="relative z-10 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonialData.map((item) => (
            <motion.div
              key={item.id}
              className={cn(
                "group relative cursor-pointer overflow-hidden",
                "rounded-3xl", // Sudut membulat
                "border border-gray-200 bg-white shadow-lg", // Gaya kartu
                "transition-all duration-300 ease-in-out hover:shadow-2xl",
                hoveredId !== null && hoveredId !== item.id
                  ? "opacity-60 grayscale" // Fungsionalitas Grayscale
                  : "opacity-100 grayscale-0",
              )}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              onClick={() => handleVideoClick(item.id)}
              variants={fadeIn} // Stagger child
              layout
            >
              {/* 1. Video/Image Container (h-64) */}
              <div className="relative h-[450px] w-full overflow-hidden rounded-3xl bg-black">
                {" "}
                {/* Rounded penuh pada container video */}
                {/* Gambar */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={cn(
                    "absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ease-in-out",
                    hoveredId === item.id ? "opacity-0" : "opacity-100",
                  )}
                  priority={item.id <= 3}
                />
                {/* Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[item.id] = el;
                  }}
                  className={cn(
                    "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out",
                    hoveredId === item.id ? "opacity-100" : "opacity-0",
                  )}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                {/* --- TEKS PUTIH & ICON PLAY DI DALAM GAMBAR --- */}
                <div
                  className={cn(
                    "absolute inset-0 z-20 flex flex-col items-center justify-end p-12",
                    "bg-linear-to-t from-black/70 via-black/30 to-transparent",
                    "transition-opacity duration-300 ease-in-out",
                    // Hilang saat di-hover (video diputar)
                    hoveredId === item.id ? "opacity-0" : "opacity-100",
                  )}
                >
                  <h3 className="mb-1 text-center text-2xl font-bold text-white drop-shadow-md">
                    {item.name}
                  </h3>
                  <p className="text-center text-sm text-white/90 drop-shadow-md">
                    {item.type}
                  </p>
                  <p className="mt-4 text-center text-base leading-relaxed text-white/90 drop-shadow-md">
                    &quot;{item.text}&quot;
                  </p>
                </div>
                {/* --- AKHIR TEKS PUTIH & ICON PLAY --- */}
              </div>
              {/* --- BAGIAN FOOTER PUTIH DIHAPUS --- */}
            </motion.div>
          ))}
        </motion.div>
        {/* --- AKHIR CONTAINER GRID --- */}
      </div>

      {/* Video Player Modal (Utuh dari file Anda) */}
      {selectedVideo && selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/90 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl cursor-default lg:max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-2 -right-2 z-10 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70 md:top-2 md:right-2"
              aria-label="Tutup pemutar video"
            >
              <svg
                className="h-6 w-6 md:h-8 md:w-8"
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
            <div className="overflow-hidden bg-black shadow-2xl">
              <div className="aspect-video">
                <video
                  ref={modalVideoRef}
                  className="h-full w-full"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                >
                  <source src={selectedTestimonial.video} type="video/mp4" />
                  Browser Anda tidak mendukung tag video.
                </video>
              </div>
              <div className="bg-white p-4 md:p-6">
                <h3 className="mb-1 text-xl font-bold text-black md:mb-2 md:text-2xl">
                  {selectedTestimonial.type} - {selectedTestimonial.name}
                </h3>
                <p className="text-sm text-gray-900 md:text-base">
                  {selectedTestimonial.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
