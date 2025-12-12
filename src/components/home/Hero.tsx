// src/components/home/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative -mt-24 flex h-[120vh] w-full items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like fixed feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dah2v3xbg/image/upload/w_3824,q_auto:good,f_auto/v1761338343/DSCF7772_1_nwjcdw.webp"
          alt="Al Madeena Students"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-br from-black/20 to-black/0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-6 pb-48 md:pb-72 lg:pb-12 text-left md:items-start md:justify-end lg:justify-center md:px-12">
        <div className="flex max-w-4xl flex-col items-start md:items-start lg:items-start pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 font-sans text-4xl leading-tight font-bold text-white drop-shadow-xl sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl"
          >
            Growing Golden <br />
            Generation with <br />
            Islamic Character.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-start gap-4 md:justify-center"
          >
            <Link
              href="/registration/flow"
              className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-white hover:text-gray-900"
            >
              Apply for Addmission
            </Link>
            <Link
              href="#programs"
              className="rounded-full bg-[#FE7D01] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#e06d00] hover:shadow-orange-500/25"
            >
              Explore Programs
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
