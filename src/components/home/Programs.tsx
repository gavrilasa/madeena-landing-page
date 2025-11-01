// src/components/home/Programs.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "~/lib/utils"; // Pastikan Anda mengimpor cn

// Data Program
const programData = {
  primary: [
    {
      title: "National Plus Curriculum",
      imageUrl:
        "https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png",
    },
    {
      title: "Islamic Studies Curriculum",
      imageUrl:
        "https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png",
    },
    {
      title: "Cambridge Assessment",
      imageUrl:
        "https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png",
    },
  ],
  preschool: [
    {
      title: "Play-Based Learning",
      imageUrl:
        "https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png",
    },
    {
      title: "Early Character Building",
      imageUrl:
        "https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png",
    },
    {
      title: "Introduction to Faith",
      imageUrl:
        "https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png",
    },
  ],
};

type TabId = "primary" | "preschool";

export default function Program() {
  const [activeTab, setActiveTab] = useState<TabId>("primary");
  const displayedPrograms = programData[activeTab];

  return (
    // Menggunakan bg-white seperti pada gambar
    <section className="bg-white py-16 text-gray-900 md:py-24">
      <div className="container mx-auto px-6">
        {/* Judul "Our Program" */}
        <h2 className="mb-12 text-5xl font-bold text-[#1A1A1A] md:mb-16">
          Our Program
        </h2>

        {/* Wrapper untuk Tabs dan Konten */}
        <div>
          {/* Tabs */}
          <div className="relative z-10 -mb-px flex -space-x-3">
            <button
              onClick={() => setActiveTab("primary")}
              className={cn(
                "rounded-t-xl px-6 py-3 text-lg font-medium transition-colors duration-300",
                activeTab === "primary"
                  ? "bg-[#1A1A1A] text-white" // Warna gelap untuk tab aktif
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300",
              )}
            >
              Primary
            </button>
            <button
              onClick={() => setActiveTab("preschool")}
              className={cn(
                "rounded-t-xl px-6 py-3 text-lg font-medium transition-colors duration-300",
                activeTab === "preschool"
                  ? "bg-[#1A1A1A] text-white" // Warna gelap untuk tab aktif
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300",
              )}
            >
              Preschool
            </button>
          </div>

          {/* Kontainer Kartu */}
          <div className="relative z-0">
            <div
              className={cn(
                "grid grid-cols-1 overflow-hidden bg-white shadow-xl md:grid-cols-3",
                activeTab === "primary"
                  ? "" // Sudut kiri atas tajam
                  : activeTab === "preschool"
                    ? "" // Sudut kiri atas membulat
                    : "rounded-3xl", // Fallback
              )}
            >
              {displayedPrograms.map((program) => (
                <div
                  key={program.title}
                  className="
                    group relative block w-full 
                    h-[450px]
                    cursor-pointer overflow-hidden 
                    transition-all duration-500 ease-in-out
                  "
                >
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                    <h3 className="mb-2 text-4xl font-bold text-white/95">
                      {program.title}
                    </h3>
                    {/* Deskripsi tidak ada di gambar, jadi saya hanya tampilkan judul */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}