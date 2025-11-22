// src/components/home/ProgramCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  card: {
    src: string;
    title: string;
    category: string;
    description: string;
  };
  index: number;
}

export default function ProgramCard({ card, index }: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
      }}
      className="group relative h-[450px] w-[350px] rounded-4xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100"
    >
      {/* --- IMAGE SECTION (Top) --- */}
      <div className="relative h-3/5 w-full overflow-hidden">
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay Gradient tipis agar teks putih (kategori) terbaca */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-transparent" />
        
        {/* Badge Kategori */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary text-xs font-bold tracking-wider uppercase shadow-sm">
            {card.category}
          </span>
        </div>
      </div>

      {/* --- CONTENT SECTION (Bottom) --- */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-white relative z-20">
        <div>
          {/* Judul */}
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors">
            {card.title}
          </h3>
          {/* Deskripsi (dipotong 2 baris) */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {card.description}
          </p>
        </div>

        {/* Tombol (Visual saja, fungsi klik ditangani Link pembungkus) */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-primary group/btn">
            View More
            <div className="p-1.5 rounded-full bg-primary/10 group-hover/btn:bg-primary group-hover/btn:text-white transition-colors duration-300">
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}