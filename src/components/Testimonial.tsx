"use client";

import { useState, useRef, useEffect } from "react"; 
import { testimonial } from "~/data/Testimonial";
import { cn } from "~/lib/utils";

export default function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const playTimeoutRef = useRef<{ [key: number]: NodeJS.Timeout | null }>({});

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    if (playTimeoutRef.current[id]) {
      clearTimeout(playTimeoutRef.current[id]!);
    }
    playTimeoutRef.current[id] = setTimeout(() => {
      const video = videoRefs.current[id];
      if (video) {
        video.play().catch(error => {
          if (error.name !== 'AbortError') {
            console.error("Gagal memulai video:", error);
          }
        });
      }
    }, 300);
  };

  const handleMouseLeave = (id: number) => {
    if (playTimeoutRef.current[id]) {
      clearTimeout(playTimeoutRef.current[id]!);
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
        clearTimeout(playTimeoutRef.current[id]!);
        playTimeoutRef.current[id] = null;
      }
    setSelectedVideo(id);
    Object.values(videoRefs.current).forEach(video => {
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
      modalVideoRef.current.play().catch(error => {
        console.error("Gagal memutar video modal:", error);
      });
    }
  }, [selectedVideo]);


  const selectedTestimonial = testimonial.find(t => t.id === selectedVideo);

  return (
    <section className="bg-[#f4f8fc] py-16 md:py-24 px-6 overflow-x-hidden md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0094D9] text-center mb-12 md:mb-20">
          Lets Hear What They Say!
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Squares */}
          <div className="absolute top-2 -right-4 w-14 h-14 md:w-24 md:h-24 bg-[#0094D9] z-0"></div>
          <div className="absolute -bottom-12 -left-12 w-28 h-28 md:w-36 md:h-36 bg-[#FFD200] z-0"></div>
          <div className="absolute -bottom-12 -right-12 w-16 h-16 md:w-24 md:h-24 bg-[#FF6B35] z-0"></div>

          {/* Video Container */}
          <div className="flex flex-col md:flex-row relative z-10 shadow-2xl overflow-hidden"> 
            {testimonial.map((item) => ( 
              <div
                key={item.id}
                className="relative group flex-1"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                onClick={() => handleVideoClick(item.id)}
              >
                <div className="relative overflow-hidden h-[350px] md:h-[500px] cursor-pointer bg-black"> 
                  {/* Image (Poster) */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out z-10",
                        hoveredId === item.id ? "opacity-0" : "opacity-100",
                        hoveredId !== null && hoveredId !== item.id ? "grayscale opacity-50" : "" 
                    )}
                  />

                  {/* Video */}
                  <video
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out z-0",
                        hoveredId === item.id ? "opacity-100" : "opacity-0"
                    )}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>

                  {/* Gradient Overlay */}
                   <div className={cn(
                       "absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-20 transition-opacity duration-300",
                       hoveredId === item.id ? "opacity-10" : "opacity-100" 
                       )} />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-30">
                    <h3 className={cn("text-2xl md:text-3xl font-bold mb-2 drop-shadow-md",
                        hoveredId === item.id ? "opacity-100" : "opacity-100",
                        hoveredId !== null && hoveredId !== item.id ? "opacity-0" : ""
                    )} >
                      {item.type}
                    </h3>
                    <p className={cn(
                        "text-sm md:text-base opacity-90 leading-relaxed transition-opacity duration-300",
                         hoveredId === item.id ? "opacity-100 " : "opacity-90",
                         hoveredId !== null && hoveredId !== item.id ? "opacity-0" : ""
                         )}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-64 h-1 bg-linear-to-r from-transparent via-[#0094D9] to-transparent"></div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer" 
          onClick={handleCloseModal} 
        >
          <div
            className="relative w-full max-w-4xl lg:max-w-5xl cursor-default"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-10 text-white bg-black/50 rounded-full p-1.5 hover:bg-black/70 transition-colors"
              aria-label="Tutup pemutar video"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player Container */}
            <div className="bg-black overflow-hidden shadow-2xl">
              {/* Video Player */}
               <div className="aspect-video">
                 <video
                   ref={modalVideoRef}
                   className="w-full h-full"
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
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                  {selectedTestimonial.type} - {selectedTestimonial.name}
                </h3>
                <p className="text-sm md:text-base text-gray-300">
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