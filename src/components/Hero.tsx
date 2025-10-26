"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-screen items-end justify-start overflow-hidden md:items-center">
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dah2v3xbg/image/upload/w_3824,q_auto:good,f_auto/v1761338343/DSCF7772_1_nwjcdw.webp"
          alt="Al Madeena Students"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 200vw, (max-width: 1200px) 100vw, 100vw"
          quality={85}
          className="-translate-y-24 scale-125 object-cover object-[55%_50%] md:translate-y-0 md:object-[55%_50%] lg:scale-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.55)_100%)]" />

        <div className="absolute bottom-0 h-1/3 w-full bg-linear-to-t from-[#07204C]/70 to-[#22355D]/0 md:hidden" />
      </div>

      <div className="relative z-10 max-w-sm px-5 pb-10 text-left text-white sm:max-w-md sm:px-10 md:max-w-2xl md:px-20 md:pb-0 lg:max-w-3xl lg:px-28 xl:px-32">
        <p className="mb-2 text-[9px] tracking-wider uppercase opacity-90 sm:text-xs md:text-sm lg:text-base xl:text-lg">
          AL MADEENA ISLAMIC BILINGUAL SCHOOL
        </p>
        <h1 className="mb-4 text-3xl leading-tight font-semibold drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] sm:text-3xl md:text-4xl md:leading-[1.1] lg:text-5xl">
          Growing Golden Generation with Islamic Character.
        </h1>
        <p className="mb-6 max-w-xs text-lg leading-relaxed text-gray-100/90 sm:max-w-md sm:text-sm md:max-w-xl md:text-base md:leading-snug lg:max-w-2xl lg:text-lg xl:text-xl">
          Di Al Madeena, kami menuntun mereka menjadi generasi yang cerdas,
          berakhlak, dan siap menghadapi masa depan.
        </p>
        <button className="shadow-[inset_0_0_0_2px_#fff] text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-white hover:text-black dark:text-neutral-200 transition duration-200">
          Join Us
        </button>
      </div>
    </section>
  );
}
