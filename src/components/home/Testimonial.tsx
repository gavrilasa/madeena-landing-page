"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { testimonialData } from "~/data/testimonialData";
import { cn } from "~/lib/utils";

export default function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const playTimeoutRef = useRef<Record<number, NodeJS.Timeout | null>>({});

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    if (playTimeoutRef.current[id]) {
      clearTimeout(playTimeoutRef.current[id]);
    }
    playTimeoutRef.current[id] = setTimeout(() => {
      const video = videoRefs.current[id];
      if (video) {
        video.play().catch((error) => {
          if (error instanceof Error && error.name !== "AbortError") {
            console.error("Gagal memulai video:", error);
          } else if (!(error instanceof Error)) {
            console.error("Terjadi error yang tidak dikenal:", error);
          }
        });
      }
    }, 300);
  };

  const handleMouseLeave = (id: number) => {
    if (playTimeoutRef.current[id]) {
      clearTimeout(playTimeoutRef.current[id]);
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
    if (playTimeoutRef.current[id]) {
      clearTimeout(playTimeoutRef.current[id]);
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
      modalVideoRef.current.play().catch((error) => {
        console.error("Gagal memutar video modal:", error);
      });
    }
  }, [selectedVideo]);

  const selectedTestimonial = testimonialData.find(
    (t) => t.id === selectedVideo,
  );

  return (
    <section className="overflow-x-hidden bg-[#f4f8fc] px-6 py-16 md:px-12 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#0094D9] md:mb-20 md:text-5xl lg:text-6xl">
          Lets Hear What They Say!
        </h2>

        <div className="relative mx-auto max-w-6xl">
          {/* Squares */}
          <div className="absolute top-2 -right-4 z-0 h-14 w-14 bg-[#0094D9] md:h-24 md:w-24"></div>
          <div className="absolute -bottom-12 -left-12 z-0 h-28 w-28 bg-[#FFD200] md:h-36 md:w-36"></div>
          <div className="absolute -right-12 -bottom-12 z-0 h-16 w-16 bg-[#FF6B35] md:h-24 md:w-24"></div>

          {/* Video Container */}
          <div className="relative z-10 flex flex-col overflow-hidden rounded-lg shadow-2xl md:flex-row">
            {testimonialData.map((item) => (
              <div
                key={item.id}
                className="group relative flex-1"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                onClick={() => handleVideoClick(item.id)}
              >
                <div className="relative h-[350px] cursor-pointer overflow-hidden bg-black md:h-[500px]">
                  {/* Image (Poster) */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    className={cn(
                      "absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ease-in-out",
                      hoveredId === item.id ? "opacity-0" : "opacity-100",
                      hoveredId !== null && hoveredId !== item.id
                        ? "opacity-50 grayscale"
                        : "",
                    )}
                    fill
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

                  {/* Gradient Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 z-20 bg-linear-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300",
                      hoveredId === item.id ? "opacity-10" : "opacity-100",
                    )}
                  />

                  {/* Content */}
                  <div className="absolute right-0 bottom-0 left-0 z-30 p-6 text-white md:p-8">
                    <h3
                      className={cn(
                        "mb-2 text-2xl font-bold drop-shadow-md md:text-3xl",
                        hoveredId === item.id ? "opacity-100" : "opacity-100",
                        hoveredId !== null && hoveredId !== item.id
                          ? "opacity-0"
                          : "",
                      )}
                    >
                      {item.type}
                    </h3>
                    <p
                      className={cn(
                        "text-sm leading-relaxed opacity-90 transition-opacity duration-300 md:text-base",
                        hoveredId === item.id ? "opacity-100" : "opacity-90",
                        hoveredId !== null && hoveredId !== item.id
                          ? "opacity-0"
                          : "",
                      )}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="h-1 w-64 bg-linear-to-r from-transparent via-[#0094D9] to-transparent"></div>
        </div>
      </div>

      {/* Video Player Modal */}
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
              className="absolute -top-2 -right-2 z-10 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70 md:-top-4 md:-right-4"
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

            {/* Video Player Container */}
            <div className="overflow-hidden rounded-lg bg-black shadow-2xl">
              {/* Video Player */}
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

              {/* Video Info */}
              <div className="bg-gray-900 p-4 md:p-6">
                <h3 className="mb-1 text-xl font-bold text-white md:mb-2 md:text-2xl">
                  {selectedTestimonial.type} - {selectedTestimonial.name}
                </h3>
                <p className="text-sm text-gray-300 md:text-base">
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
