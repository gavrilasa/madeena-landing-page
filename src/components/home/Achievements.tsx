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
import { type Achievement } from "~/lib/generated/prisma/client";

interface AchievementsProps {
  preschool: Achievement[];
  primary: Achievement[];
}

export default function Achievements({ preschool, primary }: AchievementsProps) {
  const [activeTab, setActiveTab] = useState<"preschool" | "primary">("preschool");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Select data based on active tab
  const currentData = activeTab === "preschool" ? preschool : primary;

  // Helper to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-16 md:py-24"
    >
      {/* --- Background Decorations --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ScrollLine
          containerRef={sectionRef}
          className="z-1 absolute left-0 top-0 hidden w-[400px] lg:block"
        />
        <DecorationCircle className="absolute right-10 top-10 md:right-20 md:top-20" />
        <DecorationFlower className="absolute -bottom-10 -right-10 h-64 w-32 md:bottom-0 md:right-0 md:h-96 md:w-48" />
        <DecorationStarGreen className="absolute bottom-20 left-10 md:bottom-32 md:left-20" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="mb-8 font-sans text-4xl font-bold text-[#444444] md:text-5xl">
            Achievement
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("preschool")}
              className={cn(
                "rounded-full border border-transparent px-8 py-2.5 text-sm font-medium transition-all duration-300",
                activeTab === "preschool"
                  ? "bg-[#FE7D01] text-white shadow-lg"
                  : "border-gray-400 bg-transparent text-gray-500 hover:border-gray-600 hover:text-gray-700"
              )}
            >
              Pre School
            </button>
            <button
              onClick={() => setActiveTab("primary")}
              className={cn(
                "rounded-full border border-transparent px-8 py-2.5 text-sm font-medium transition-all duration-300",
                activeTab === "primary"
                  ? "bg-[#FE7D01] text-white shadow-lg"
                  : "border-gray-400 bg-transparent text-gray-500 hover:border-gray-600 hover:text-gray-700"
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
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 transition-all hover:shadow-xl"
                  >
                    {/* Image Container */}
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-2 pb-2">
                      <span className="mb-2 text-xs font-bold text-gray-500">
                        {formatDate(item.date)}
                      </span>
                      <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900">
                        {item.title}
                      </h3>
                      <p className="line-clamp-3 text-xs leading-relaxed text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-gray-500">
                  Belum ada data prestasi untuk kategori ini.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href={
              activeTab === "preschool"
                ? "/preschool/achievements"
                : "/primary/achievements"
            }
            className="inline-block border-b border-gray-800 pb-0.5 text-sm font-semibold text-gray-800 transition-colors hover:border-[#FE7D01] hover:text-[#FE7D01]"
          >
            Lihat Semua
          </Link>
        </div>
      </div>
    </section>
  );
}