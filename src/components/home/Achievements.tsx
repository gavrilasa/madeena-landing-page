"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import {
  DecorationCircle,
  DecorationFlower,
  DecorationStarGreen,
} from "./achievements/AchievementDecorations";
import Link from "next/link";
import { ScrollLine } from "../ui/scroll-line";

// Dummy data structure to match the image cards
const achievementData = {
  preschool: [
    {
      id: 1,
      date: "23 April, 2025",
      title: "Juara Lomba Berhitung Cepat",
      description:
        "Ahmad Saputra Septiawan dari TK Al Madeena berhasil memenangkan perlombaan berhitung cepat!",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      date: "23 April, 2025",
      title: "Juara Lomba Mewarnai",
      description:
        "Siti Aminah dari TK Al Madeena berhasil memenangkan perlombaan mewarnai tingkat kota!",
      image: "https://images.unsplash.com/photo-1596464716127-f9a82741cacb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      date: "23 April, 2025",
      title: "Juara Lomba Hafalan Surat Pendek",
      description:
        "Budi Santoso dari TK Al Madeena berhasil memenangkan perlombaan hafalan surat pendek!",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  primary: [
    {
      id: 4,
      date: "15 Mei, 2025",
      title: "Olimpiade Matematika Nasional",
      description:
        "Tim Primary Al Madeena meraih medali emas dalam Olimpiade Matematika Nasional.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 5,
      date: "10 Juni, 2025",
      title: "Juara 1 Pidato Bahasa Inggris",
      description:
        "Ananda Rina berhasil menyabet juara pertama dalam kontes pidato bahasa Inggris antar SD.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 6,
      date: "20 Juli, 2025",
      title: "Juara Umum Taekwondo",
      description:
        "Siswa Primary Al Madeena mendominasi kejuaraan Taekwondo tingkat provinsi.",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1000&auto=format&fit=crop",
    },
  ],
};

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<"preschool" | "primary">("preschool");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Repeat data to fill grid like in the image (6 cards)
  const displayData = [
    ...achievementData[activeTab],
    ...achievementData[activeTab],
  ].slice(0, 6);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-16 md:py-24">
      {/* --- Background Decorations --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Scroll Line - Using orange/reddish color from image reference or default orange */}
        <ScrollLine
          containerRef={sectionRef}
          className="absolute -left-20 -top-10 w-[300px] md:left-0 md:top-0 md:w-[400px] z-1"
          // Customizing path color via CSS/props if needed, assuming ScrollLine uses default or prop
        />
        
        {/* Top Right Yellow Circle */}
        <DecorationCircle className="absolute top-10 right-10 md:right-20 md:top-20" />

        {/* Bottom Right Blue Flower */}
        <DecorationFlower className="absolute -bottom-10 -right-10 md:right-0 md:bottom-0 w-32 h-64 md:w-48 md:h-96" />

        {/* Bottom Left Green Star */}
        <DecorationStarGreen className="absolute bottom-20 left-10 md:left-20 md:bottom-32" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="mb-8 text-4xl font-bold text-[#444444] md:text-5xl font-sans">
            Achievement
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("preschool")}
              className={cn(
                "rounded-full px-8 py-2.5 text-sm font-medium transition-all duration-300 border border-transparent",
                activeTab === "preschool"
                  ? "bg-[#FE7D01] text-white shadow-lg" // Active Orange
                  : "bg-transparent text-gray-500 border-gray-400 hover:border-gray-600 hover:text-gray-700" // Inactive Gray outline
              )}
            >
              Pre School
            </button>
            <button
              onClick={() => setActiveTab("primary")}
              className={cn(
                "rounded-full px-8 py-2.5 text-sm font-medium transition-all duration-300 border border-transparent",
                activeTab === "primary"
                  ? "bg-[#FE7D01] text-white shadow-lg"
                  : "bg-transparent text-gray-500 border-gray-400 hover:border-gray-600 hover:text-gray-700"
              )}
            >
              Primary School
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="@container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayData.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-200 p-4 transition-all hover:shadow-xl"
                >
                  {/* Image Container with Rounded Corners inside card */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 px-2 pb-2">
                    <span className="mb-2 text-xs font-bold text-gray-500">
                      {item.date}
                    </span>
                    <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-500 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href={activeTab === "preschool" ? "/preschool/achievements" : "/primary/achievements"}
            className="inline-block border-b border-gray-800 pb-0.5 text-sm font-semibold text-gray-800 transition-colors hover:text-[#FE7D01] hover:border-[#FE7D01]"
          >
            Lihat Semua
          </Link>
        </div>
      </div>
    </section>
  );
}