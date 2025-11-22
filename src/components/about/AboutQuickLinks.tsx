// src/components/about/AboutQuickLinks.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "Sejarah Sekolah",
    href: "/about/history",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763381013/about-history_gpzrfx.webp",
  },
  {
    title: "Visi Misi",
    href: "/about/vision-mission",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763381013/about-vision_kwls3g.webp",
  },
  {
    title: "Dewan Yayasan",
    href: "/about/foundation-board",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763381012/about-founder_htnxgj.webp",
  },
  {
    title: "Guru & Staf",
    href: "/about/staff-profile",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763381013/about-staff_twqujg.webp",
  },
  {
    title: "Partner Kerjasama",
    href: "/about/partners",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763381014/about-partner_hokvbf.webp",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

export default function AboutQuickLinks() {
  return (
    <motion.div {...fadeIn}>
      <div className="container mx-auto px-6 py-16 md:py-24">
        <h2 className="mb-10 text-center text-3xl font-bold text-neutral-900 md:text-left">
          Jelajahi Tentang Kami
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group relative block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={link.image}
                  alt={link.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              </div>
              <div className="flex items-center justify-between p-4">
                <h3 className="text-sm font-bold text-neutral-800 transition-colors group-hover:text-[#FE7D01]">
                  {link.title}
                </h3>
                <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#FE7D01]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
