"use client";

import Image from "next/image";
import { Mail, Youtube, MessageCircle, MapPin, Instagram } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import InstagramFeed from "./InstagramFeed";
import { Skeleton } from "~/components/ui/skeleton";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px 0px 0px 0px",
      },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className="relative w-full overflow-hidden bg-white"
      ref={footerRef}
    >
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat md:bg-cover lg:bg-contain"
        style={{
          backgroundImage: "url('/bg-footer.svg')",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-48 pb-8 md:px-8 md:pt-40 md:pb-10 lg:px-10 lg:pt-48 lg:pb-12">
        <div className="flex flex-col items-start justify-between gap-8 text-white lg:flex-row lg:gap-12">
          <div className="flex w-full flex-col justify-between space-y-6 md:space-y-8 lg:w-1/2">
            <div className="flex items-center justify-start md:pt-6 lg:pt-0">
              <Image
                src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1761939553/LogoTextHitam_f83bfl.svg"
                alt="Logo"
                width={90}
                height={90}
                className="h-auto w-24 object-contain"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
              {/* Primary School Section */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 shrink-0 text-white md:h-6 md:w-6" />
                    <h3 className="text-lg font-semibold md:text-xl">
                      Primary School
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/90 md:text-base">
                    Jl. Pamitran No. 7 Kejaksan <br />
                    Kota Cirebon 45123
                  </p>
                </div>

                {/* Primary Contacts with Icons */}
                <div className="text-md flex flex-col gap-3 text-white/90">
                  <a
                    href="https://wa.me/6285215599906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>08521-55999-06</span>
                  </a>
                  <a
                    href="mailto:primary.almadeena@gmail.com"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <Mail className="h-4 w-4" />
                    <span>primary.almadeena@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Preschool Section */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 shrink-0 text-white md:h-6 md:w-6" />
                    <h3 className="text-lg font-semibold md:text-xl">
                      Pre School
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/90 md:text-base">
                    Jl. KS Tubun No. 29 Kejaksan <br />
                    Kota Cirebon 45123
                  </p>
                </div>

                {/* Preschool Contacts with Icons */}
                <div className="text-md flex flex-col gap-3 text-white/90">
                  <a
                    href="https://wa.me/6282119222822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>0821-1922-2822</span>
                  </a>
                  <a
                    href="mailto:halo.almadeena@gmail.com"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <Mail className="h-4 w-4" />
                    <span>halo.almadeena@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 border-t border-white/70 pt-4 md:pt-5">
              <a
                href="https://instagram.com/almadeena.islamic.school"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 cursor-pointer transition hover:scale-110 md:h-7 md:w-7" />
              </a>
              <a
                href="https://www.youtube.com/@almadeenaislamicschool"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Youtube className="h-6 w-6 cursor-pointer transition hover:scale-110 md:h-7 md:w-7" />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-lg backdrop-blur-sm">
              {isVisible ? (
                <InstagramFeed />
              ) : (
                <Skeleton className="h-[300px] w-full rounded-xl bg-white/10 md:h-[340px] lg:h-[360px]" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/20 py-4 text-center text-xs text-white/90 md:py-5 md:text-sm lg:py-6">
        © Al Madeena Islamic School | 2025
      </div>
    </footer>
  );
}
