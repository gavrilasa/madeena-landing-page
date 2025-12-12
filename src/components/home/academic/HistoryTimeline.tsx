"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mock Data based on the design provided
const historyItems = [
  {
    id: 1,
    year: "Pondasi Pendidikan",
    title: "Nonformal",
    position: "top",
  },
  {
    id: 2,
    year: "Inovasi di Tengah",
    title: "Tantangan",
    position: "bottom",
  },
  {
    id: 3,
    year: "Lahirnya Al Madeena",
    title: "Islamic Preschool",
    position: "top",
  },
  {
    id: 4,
    year: "Ekspansi ke Jenjang",
    title: "Primary",
    position: "bottom",
  },
  {
    id: 5,
    year: "Menuju Generasi Global",
    title: "Berkarakter",
    position: "top",
  },
];

export default function HistoryTimeline() {
  return (
    <div className="w-full">
      {/* UPDATED: Changed py-10 md:py-20 to explicit pt/pb to reduce bottom space */}
      <div className="relative flex flex-col items-center justify-center py-8 pb-2 md:py-28 md:pb-4">
        
        {/* --- Desktop View: Horizontal Line --- */}
        <div className="relative hidden w-full max-w-6xl items-center justify-between md:flex">
          {/* The Line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white/30" />

          {historyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: item.position === "top" ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Dot on the line */}
              <div className="z-10 h-5 w-5 rounded-full bg-white shadow-md ring-4 ring-[#059DEA]" />

              {/* Content - Alternating Top/Bottom */}
              <div
                className={`absolute w-40 text-center ${
                  item.position === "top"
                    ? "bottom-8 mb-2"
                    : "top-8 mt-2"
                }`}
              >
                <h4 className="text-xs font-medium uppercase tracking-wider text-white/80 mb-1">{item.year}</h4>
                <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Mobile View: Vertical Stack --- */}
        <div className="flex w-full flex-col gap-0 md:hidden pl-4">
          {historyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 relative"
            >
              {/* Vertical Line Section */}
              <div className="flex flex-col items-center">
                <div className="h-6 w-0.5 bg-white/30" />
                <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-2 ring-[#059DEA]" />
                {index !== historyItems.length - 1 && (
                  <div className="h-full w-0.5 bg-white/30 min-h-[60px]" />
                )}
              </div>
              
              {/* Content */}
              <div className="pt-4 pb-8">
                <h4 className="text-xs font-medium text-white/80 uppercase tracking-wide">{item.year}</h4>
                <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Link at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          // UPDATED: Reduced margin-top (was mt-16 md:mt-32)
          className="py-6 md:mt-24"
        >
          <Link
            href="/about/history"
            className="group inline-flex justify-end items-center text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base hover:underline"
          >
            Lihat Detail Sejarah
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}