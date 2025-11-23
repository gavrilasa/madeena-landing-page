"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SpinningLogoProps {
  src: string; // Gambar teks luar yang berputar
  alt: string;
  innerSrc?: string; // Gambar logo dalam yang statis (opsional)
  innerAlt?: string;
  size?: number;
  speed?: number;
  className?: string;
}

export default function SpinningLogo({
  src,
  alt,
  innerSrc,
  innerAlt,
  size = 160,
  speed = 20,
  className = "",
}: SpinningLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-white shadow-xl ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Outer Layer: Spinning Text */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative h-full w-full p-2">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${size}px`}
            className="rounded-full object-cover"
          />
        </div>
      </motion.div>

      {/* Inner Layer: Static Logo */}
      {innerSrc && (
        <div className="relative z-10 size-[90%]">
          <Image
            src={innerSrc}
            alt={innerAlt ?? alt}
            fill
            sizes={`${size / 2}px`}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
