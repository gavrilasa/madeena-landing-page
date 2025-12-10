// src/components/academic/AchievementDetail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trophy, Share2, User, School, Medal } from "lucide-react";
import { motion } from "framer-motion";
import type { Achievement } from "~/lib/generated/prisma/client";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

interface AchievementDetailProps {
  achievement: Achievement; // Menggunakan tipe data dari Prisma
}

export default function AchievementDetail({
  achievement,
}: AchievementDetailProps) {
  // Helper Logic
  const categoryLabel =
    achievement.category === "PRESCHOOL" ? "Preschool" : "Primary";
  const backLink =
    achievement.category === "PRESCHOOL"
      ? "/preschool/achievements"
      : "/primary/achievements";

  // Parsing deskripsi dari database (newline -> paragraph)
  const descriptionParagraphs = achievement.description.split("\n");

  // Parsing nama siswa (Array -> String Comma Separated)
  const studentNamesDisplay = achievement.studentNames.join(", ");

  return (
    <main className="min-h-screen pb-20">
      {/* <PageHeader
        title="Prestasi Siswa"
        subtitle={`Merayakan Prestasi Siswa ${categoryLabel} Al Madeena`}
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      /> */}

      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Navigation - Outside Grid */}
        <div className="mx-auto mb-6 max-w-7xl">
          <Link
            href={backLink}
            className="group text-muted-foreground hover:text-primary inline-flex items-center text-sm font-medium transition-colors"
          >
            <ArrowLeft className="mx-2 h-4 w-4" />
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
                  src={achievement.image}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Floating Winner Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-yellow-600 shadow-md backdrop-blur-sm md:px-4 md:py-2 md:text-sm">
                  <Trophy className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="uppercase">
                    {achievement.predicate || "Winner"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: INFO & CONTENT (Span 8 cols on desktop) --- */}
          <div className="flex flex-col gap-4 md:col-span-7 md:gap-6 lg:col-span-8">
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
                  className="text-primary rounded-full px-3 py-1"
                >
                  {categoryLabel} Achievement
                </Badge>
              </div>
              <h1 className="text-2xl leading-tight font-bold text-gray-900 md:text-3xl lg:text-4xl">
                {achievement.title}
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
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Siswa / Tim
                </span>
                <span
                  className="mt-1 line-clamp-2 text-base font-bold text-gray-900"
                  title={studentNamesDisplay}
                >
                  {studentNamesDisplay}
                </span>
              </div>

              {/* Class Card */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full text-black">
                  <School className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Kelas
                </span>
                <span className="mt-1 line-clamp-1 text-base font-bold text-gray-900">
                  {achievement.studentClass}
                </span>
              </div>

              {/* Achievement Card */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full text-black">
                  <Medal className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Predikat
                </span>
                <span className="mt-1 line-clamp-1 text-base font-bold text-gray-900">
                  {achievement.predicate}
                </span>
              </div>
            </motion.div>

            {/* 3. Content Card (Dynamic Parsing) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8"
            >
              <div className="prose prose-lg prose-gray max-w-none text-justify leading-relaxed text-gray-700">
                {/* Logic: Paragraf pertama diberi styling Drop Cap */}
                {descriptionParagraphs.map((paragraph, index) => {
                  if (!paragraph.trim()) return null;

                  if (index === 0) {
                    return (
                      <p
                        key={index}
                        className="first-letter:text-primary mb-2 first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold"
                      >
                        {paragraph}
                      </p>
                    );
                  }

                  return (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  );
                })}

                {descriptionParagraphs.length === 0 && (
                  <p className="text-gray-500 italic">
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
                <p className="mt-1 text-sm text-blue-100">
                  Dukung potensi ananda bersama Al Madeena.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:w-auto"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Bagikan
                </Button>
                <Link href="/registration/flow" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full rounded-full bg-white font-bold text-[#059DEA] hover:bg-gray-100"
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
