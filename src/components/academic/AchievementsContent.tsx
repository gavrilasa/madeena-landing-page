"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Quote,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Achievement } from "~/lib/generated/prisma/client";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface AchievementsContentProps {
  category: "preschool" | "primary";
  achievements: Achievement[];
  intro: string;
  closing: string;
  currentPage: number;
  totalPages: number;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function AchievementsContent({
  category,
  achievements,
  intro,
  closing,
  currentPage,
  totalPages,
}: AchievementsContentProps) {
  // Helper untuk menampilkan nama siswa
  const formatStudentName = (names: string[]) => {
    if (!names || names.length === 0) return "-";
    if (names.length === 1) return names[0];
    return `${names[0]} & Tim`;
  };

  // Logic Pagination Link
  const createPageLink = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    return `/${category}/achievements?${params.toString()}`;
  };

  if (!achievements) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <div
            className="prose prose-lg text-muted-foreground mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        </div>

        {/* Achievements Cards Grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                variants={fadeIn}
                className={cn(
                  "group relative w-full overflow-hidden rounded-2xl bg-gray-900 shadow-lg",
                  "aspect-4/5",
                )}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Dark Overlay Gradient (Top Down) */}
                {/* from-black/70: Gelap di atas agar teks terbaca */}
                {/* via-transparent: Tengah terang agar gambar terlihat */}
                {/* to-black/60: Agak gelap di bawah agar tombol terlihat */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/30 duration-300" />

                {/* Content Container - justify-between untuk memisahkan Teks (Atas) & Tombol (Bawah) */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  
                  {/* Top Section: Title & Student Info */}
                  <div className="flex flex-col gap-2">
                    {/* Student Info */}
                    <div className="mb-1">
                      <span className="mt-1 block text-xs font-bold tracking-widest text-yellow-400 uppercase">
                        {item.studentClass}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="line-clamp-2 text-xl font-bold text-white drop-shadow-md md:text-2xl leading-tight">
                      {item.title}
                    </h3>

                    {/* Names */}
                    <span className="line-clamp-1 text-lg font-medium text-white/90 md:text-lg">
                      {formatStudentName(item.studentNames)}
                    </span>
                  </div>

                  {/* Bottom Section: Action Link */}
                  <div className="pt-2">
                    <Link
                      href={`/${category}/achievements/${item.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white hover:text-gray-900"
                    >
                      Read Story
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-8">
            <Button
              variant="outline"
              disabled={currentPage <= 1}
              asChild={currentPage > 1}
              className="w-32"
            >
              {currentPage > 1 ? (
                <Link href={createPageLink(currentPage - 1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Sebelumnya
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Sebelumnya
                </span>
              )}
            </Button>

            <span className="text-muted-foreground text-sm font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={currentPage >= totalPages}
              asChild={currentPage < totalPages}
              className="w-32"
            >
              {currentPage < totalPages ? (
                <Link href={createPageLink(currentPage + 1)}>
                  Selanjutnya
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <span>
                  Selanjutnya
                  <ChevronRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        )}

        {/* Closing Section */}
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative mt-16 p-8 text-center md:p-12"
        >
          <Quote className="mx-auto mb-4 h-8 w-8 text-gray-300" />
          <div
            className="mx-auto max-w-3xl text-xl leading-relaxed font-medium text-gray-700 md:text-2xl"
            dangerouslySetInnerHTML={{ __html: closing }}
          />
          <div className="mt-6 flex justify-center">
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}