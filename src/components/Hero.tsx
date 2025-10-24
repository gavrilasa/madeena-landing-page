"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-screen items-end justify-start overflow-hidden md:items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/reswara/image/upload/v1761321313/DSCF7772_rvrqoh.jpg"
          alt="Al Madeena Students"
          fill
          priority
          className="object-cover transition-transform duration-500 transform scale-[1.7] sm:scale-[1.6] md:scale-[1.4] lg:scale-[1.3] xl:scale-[1.25]"
          style={{
            objectPosition: "55% 50%",
          }}
        />

        {/* Gradient overlay hanya untuk mobile */}
        <div className="absolute bottom-0 w-full h-1/3 bg-linear-to-t from-[#07204C]/90 to-[#22355D]/0 md:hidden" />
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 text-left text-white px-5 sm:px-10 md:px-20 lg:px-28 xl:px-32 pb-10 md:pb-0 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl">
        {/* Subheading */}
        <p className="uppercase tracking-wider mb-2 text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg opacity-90">
          AL MADEENA ISLAMIC BILINGUAL SCHOOL
        </p>

        {/* Main Heading */}
        <h1 className="font-semibold leading-tight md:leading-[1.1] mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          Growing Golden Generation with Islamic Character.
        </h1>

        {/* Description */}
        <p className="text-gray-100/90 leading-relaxed md:leading-snug mb-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
          Di Al Madeena, kami menuntun mereka menjadi generasi yang cerdas,
          berakhlak, dan siap menghadapi masa depan.
        </p>

        {/* Button */}
        <button className="rounded-md bg-white hover:bg-[#f7f7f7] text-black font-semibold py-2 px-6 text-xs sm:text-sm md:text-base transition">
          Register
        </button>
      </div>
    </section>
  );
}
