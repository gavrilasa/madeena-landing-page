// src/components/academic/AchievementDetail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Share2,
  User,
  School,
  Medal,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "~/components/common/PageHeader";
import type { AchievementItem } from "~/data/academic/achievmentsData";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

interface AchievementDetailProps {
  item: AchievementItem;
  category: "preschool" | "primary";
}

export default function AchievementDetail({
  item,
  category,
}: AchievementDetailProps) {
  const categoryLabel = category === "preschool" ? "Preschool" : "Primary";
  const backLink =
    category === "preschool"
      ? "/preschool/achievements"
      : "/primary/achievements";

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <PageHeader
        title="Hall of Fame"
        subtitle={`Merayakan Prestasi Siswa ${categoryLabel} Al Madeena`}
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Navigation - Outside Grid */}
        <div className="mb-6 max-w-7xl mx-auto">
          <Link
            href={backLink}
            className="group inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mx-2" />
            Kembali ke Daftar Prestasi
          </Link>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          
          {/* --- LEFT COLUMN: IMAGE (Span 4 cols on desktop) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative md:col-span-5 lg:col-span-4"
          >
            <div className="sticky top-24 overflow-hidden rounded-3xl bg-white p-2 shadow-lg ring-1 ring-gray-100">
              <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-gray-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Floating Winner Badge */}
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-yellow-600 shadow-md backdrop-blur-sm md:px-4 md:py-2 md:text-sm">
                  <Trophy className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Winner</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: INFO & CONTENT (Span 8 cols on desktop) --- */}
          <div className="flex flex-col gap-4 md:col-span-7 lg:col-span-8 md:gap-6">
            
            {/* 1. Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-primary"
                >
                  {categoryLabel} Achievement
                </Badge>
              </div>
              <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                {item.title}
              </h1>
            </motion.div>

            {/* 2. Stats Grid (Bento Boxes) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {/* Name Card */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full text-black">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Siswa
                </span>
                <span className="mt-1 text-base font-bold text-gray-900 line-clamp-1">
                  {item.name}
                </span>
              </div>

              {/* Class Card */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full text-black">
                  <School className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Kelas
                </span>
                <span className="mt-1 text-base font-bold text-gray-900 line-clamp-1">
                  {item.studentClass}
                </span>
              </div>

              {/* Achievement Card */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full text-black">
                  <Medal className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Predikat
                </span>
                <span className="mt-1 text-base font-bold text-gray-900">
                  Juara & Terbaik
                </span>
              </div>
            </motion.div>

            {/* 3. Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8"
            >
              <div className="prose prose-lg prose-gray max-w-none leading-relaxed text-gray-700">
                {item.content ? (
                  <div
                    className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-primary"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                ) : (
                  <p className="italic text-gray-500">
                    Deskripsi lengkap belum tersedia.
                  </p>
                )}
              </div>
            </motion.div>

            {/* 4. CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-[#059DEA] p-6 text-white shadow-lg md:flex-row md:px-10 md:py-8"
            >
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold">Terinspirasi?</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Dukung potensi ananda bersama Al Madeena.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white w-full sm:w-auto"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Bagikan
                </Button>
                <Link href="/registration/flow" className="w-full sm:w-auto">
                  <Button 
                    variant="secondary" 
                    className="rounded-full bg-white text-[#059DEA] hover:bg-gray-100 w-full font-bold"
                  >
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}