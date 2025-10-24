"use client";

import Image from "next/image";

export default function Quote() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f4f8fc] px-6 py-20 text-center md:py-0">
      <div className="absolute top-0 left-0 h-20 w-20 bg-[#F77F00] sm:h-28 sm:w-28 md:h-36 md:w-36" />
      <div className="absolute top-8 right-6 h-16 w-16 bg-[#0094D9] sm:top-10 sm:right-10 sm:h-20 sm:w-20 md:top-16 md:right-16 md:h-24 md:w-24" />
      <div className="absolute bottom-10 left-6 h-16 w-16 bg-[#0094D9] sm:bottom-12 sm:left-10 sm:h-20 sm:w-20 md:bottom-16 md:left-16 md:h-24 md:w-24" />
      <div className="absolute right-0 bottom-10 h-20 w-20 bg-[#FFD500] sm:h-24 sm:w-24 md:h-28 md:w-28" />

      <div className="relative z-10 mb-8">
        <Image
          src="https://res.cloudinary.com/reswara/image/upload/v1761321700/Frame_7_ihs1mi.svg"
          alt="Al Madeena Logo"
          width={150}
          height={150}
          className="mx-auto object-contain"
        />
      </div>

      <div className="relative z-10 max-w-3xl px-4">
        <p className="text-base leading-relaxed font-medium text-[#0094D9] sm:text-xl md:text-2xl">
          Growing golden generation with Islamic character. <br />
          At Al Madeena, we lead them to be a smart generation, well-mannered,
          and ready to face the future.
        </p>
      </div>
    </section>
  );
}
