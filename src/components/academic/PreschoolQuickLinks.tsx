"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "Program Unggulan",
    href: "/preschool/programs",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp",
  },
  {
    title: "Kurikulum",
    href: "/preschool/curriculum",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp",
  },
  {
    title: "Prestasi",
    href: "/preschool/achievements",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp",
  },
  {
    title: "Kegiatan",
    href: "/preschool/activities",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp",
  },
  {
    title: "Ekstrakurikuler",
    href: "/preschool/extracurricular",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp",
  },
  {
    title: "Fasilitas",
    href: "/preschool/facilities",
    image:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

export default function PreschoolQuickLinks() {
  return (
    <motion.div {...fadeIn}>
      <div className="container mx-auto px-6 py-16 md:py-24">
        <h2 className="mb-10 text-center text-3xl font-bold text-neutral-900 md:text-left">
          Jelajahi Preschool
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group relative block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-40 w-full overflow-hidden">
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