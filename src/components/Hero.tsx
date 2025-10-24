"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png" // ganti dengan nama background kamu di /public
          alt="Al Madeena Students"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-transparent" />
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 px-8 md:px-20 lg:px-28 text-white max-w-2xl">
        {/* Subheading */}
        <p className="uppercase tracking-widest text-sm md:text-base mb-3">
          AL MADEENA ISLAMIC BILINGUAL SCHOOL
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Growing Golden
          Generation with
          Islamic Character.
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed text-gray-100/90">
          Growing golden generation with islamic character <br />
          Di Al Madeena, kami menuntun mereka menjadi generasi yang
          cerdas, berakhlak, dan siap menghadapi masa depan.
        </p>
      </div>
    </section>
  );
}
