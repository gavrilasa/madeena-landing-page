"use client";

import { useState, useRef } from "react";
import { testimonial } from "~/data/Testimonial";

export default function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    if (videoRefs.current[id]) {
      videoRefs.current[id]?.play();
    }
  };

  const handleMouseLeave = (id: number) => {
    setHoveredId(null);
    if (videoRefs.current[id]) {
      videoRefs.current[id]?.pause();
      if (videoRefs.current[id]) {
        videoRefs.current[id]!.currentTime = 0;
      }
    }
  };

  const handleVideoClick = (id: number) => {
    setSelectedVideo(id);
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
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

  const selectedTestimonial = testimonial.find(t => t.id === selectedVideo);

  return (
    <section className="bg-[#f4f8fc] py-16 md:py-24 px-6 overflow-x-hidden md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0094D9] text-center mb-12 md:mb-20">
          Lets Hear What They Say!
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Squares */}
          {/* Top right */}
          <div className="absolute top-2 -right-4 w-14 h-14 md:w-24 md:h-24 bg-[#0094D9] z-0"></div>
          
          {/* Bottom left */}
          <div className="absolute -bottom-12 -left-12 w-28 h-28 md:w-36 md:h-36 bg-[#FFD200] z-0"></div>
          
          {/* Bottom right */}
          <div className="absolute -bottom-12 -right-12 w-16 h-16 md:w-24 md:h-24 bg-[#FF6B35] z-0"></div>

          {/* Video Container */}
          <div className="flex flex-col pt-10 md:flex-row relative z-10 shadow-2xl overflow-hidden">
            {testimonial.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="relative group flex-1"
                onMouseEnter={() => handleMouseEnter(testimonial.id)}
                onMouseLeave={() => handleMouseLeave(testimonial.id)}
                onClick={() => handleVideoClick(testimonial.id)}
              >
                <div className="relative overflow-hidden h-[350px] md:h-[500px] cursor-pointer">
                  {/* Image */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                      hoveredId === testimonial.id ? "opacity-0" : "opacity-100"
                    } ${
                      hoveredId !== null && hoveredId !== testimonial.id ? "grayscale" : ""
                    }`}
                  />

                  {/* Video */}
                  <video
                    ref={(el) => {
                      videoRefs.current[testimonial.id] = el;
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                      hoveredId === testimonial.id ? "opacity-100 fade-in-50" : "opacity-0"
                    }`}
                    loop
                    muted
                    playsInline
                  >
                    <source src={testimonial.video} type="video/mp4" />
                  </video>

                  {/* Gradient Overlay */}
                  {hoveredId === testimonial.id || selectedVideo === testimonial.id ? null : (
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {testimonial.type}
                    </h3>
                    <p className="text-sm md:text-base opacity-90 leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <div className="w-64 h-1 bg-linear-to-r from-transparent via-[#0094D9] to-transparent"></div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && selectedTestimonial && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M24 8L8 24M8 8L24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                ref={modalVideoRef}
                className="w-full h-auto"
                controls
                autoPlay
                playsInline
              >
                <source src={selectedTestimonial.video} type="video/mp4" />
              </video>
              
              {/* Video Info */}
              <div className="bg-gray-900 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedTestimonial.type} - {selectedTestimonial.name}
                </h3>
                <p className="text-gray-300">
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