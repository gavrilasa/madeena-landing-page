// src/components/CurriculumContent.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, GraduationCap } from "lucide-react"; 
import { cn } from "../../lib/utils";

// Tipe data untuk item kurikulum
interface CurriculumItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface CurriculumContentProps {
  level: "preschool" | "primary"; // String yang dapat diserialisasi
  data: CurriculumItem[];
  title: string;
  subtitle: string;
  visualAlt: string;
  visualImage: string; // URL gambar visual
}

export default function CurriculumContent({
  level,
  data,
  title,
  subtitle,
  visualAlt,
  visualImage,
}: CurriculumContentProps) {
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(0);

  const toggleFeature = (index: number) => {
    setOpenFeatureIndex(openFeatureIndex === index ? null : index);
  };

  // Logika penentuan Icon dilakukan di dalam Client Component
  const Icon = level === 'primary' ? GraduationCap : BookOpen;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex justify-center items-center gap-2">
            <Icon className="w-5 h-5" /> {/* Menggunakan Icon yang sudah ditentukan */}
            Program Kurikulum
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Layout: Kiri (Visual) - Kanan (Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Visual Side - Responsif */}
          <motion.div
            key={level} // Animasi transisi saat berpindah level jika komponen ini digunakan untuk toggling
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl group border-4 border-white"
          >
            <img
              // Ganti src ini dengan path gambar dari folder public Anda
              src={visualImage}
              alt={visualAlt}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/70 to-transparent flex items-end p-8">
              <h3 className="text-white text-3xl font-bold">
                {level === 'primary' ? 'Primary' : 'Preschool'} Excellence
              </h3>
            </div>
          </motion.div>

          {/* Accordion List Side (Features) - Responsif */}
          <div className="space-y-4">
            {data.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "border rounded-xl overflow-hidden transition-all duration-300",
                  openFeatureIndex === index
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-gray-200 bg-white hover:border-primary/20"
                )}
              >
                <button
                  onClick={() => toggleFeature(index)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={cn(
                        "text-2xl font-bold transition-colors min-w-[30px] text-center",
                        openFeatureIndex === index
                          ? "text-primary"
                          : "text-gray-300 group-hover:text-primary/60"
                      )}
                    >
                      {item.number}
                    </span>
                    <h3
                      className={cn(
                        "text-lg font-semibold transition-colors",
                        openFeatureIndex === index
                          ? "text-gray-900"
                          : "text-gray-600 group-hover:text-gray-900"
                      )}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div
                    className={cn(
                      "p-2 rounded-full transition-colors duration-300",
                      openFeatureIndex === index
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        openFeatureIndex === index ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openFeatureIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden" 
                    >
                      <div className="px-5 pb-5 pl-16">
                        <p className="text-gray-600 leading-relaxed border-l-2 border-primary/30 pl-4">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}