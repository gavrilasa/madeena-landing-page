"use client";

import Image from "next/image";

export default function Quote() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#f4f8fc] overflow-hidden text-center px-6 py-20 md:py-0">

      <div className="absolute top-0 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-[#F77F00]" />
      <div className="absolute top-8 right-6 sm:top-10 sm:right-10 md:top-16 md:right-16 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#0094D9]" />
      <div className="absolute bottom-10 left-6 sm:bottom-12 sm:left-10 md:bottom-16 md:left-16 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#0094D9]" />
      <div className="absolute bottom-10 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#FFD500]" />

      <div className="relative z-10 mb-8">
        <Image
          src="https://res.cloudinary.com/reswara/image/upload/v1761321700/Frame_7_ihs1mi.svg"
          alt="Al Madeena Logo"
          width={150}
          height={150}
          className="object-contain mx-auto"
        />
      </div>

      <div className="relative z-10 max-w-3xl px-4">
        <p className="text-[#0094D9] text-base sm:text-xl md:text-2xl font-medium leading-relaxed">
          Growing golden generation with Islamic character. <br />
          At Al Madeena, we lead them to be a smart generation, well-mannered,
          and ready to face the future.
        </p>
      </div>
    </section>
  );
}
