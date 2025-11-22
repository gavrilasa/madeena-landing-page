"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SpinningLogoProps {
  src: string;
  alt: string;
  size?: number;
  speed?: number;
  className?: string;
}

export default function SpinningLogo({
  src,
  alt,
  size = 160,
  speed = 20,
  className = "",
}: SpinningLogoProps) {
  return (
    <motion.div
      className={`relative rounded-full bg-white p-2 shadow-xl ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="rounded-full object-cover p-2"
        />
      </div>
    </motion.div>
  );
}