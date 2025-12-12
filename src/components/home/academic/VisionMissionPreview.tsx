"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, Eye } from "lucide-react";

export default function VisionMissionPreview() {
  return (
    // UPDATED: Standardized padding consistent with HistoryTimeline
    <div className="w-full pt-10 pb-2 md:pt-6 md:pb-4">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Vision Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Eye className="h-7 w-7 text-white" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">Visi Kami</h3>
          <p className="text-lg font-medium leading-relaxed text-white/90 italic">
            &quot;Mewujudkan generasi global yang cerdas, mandiri, dan berakhlak mulia berlandaskan iman dan ilmu.&quot;
          </p>
        </motion.div>

        {/* Mission Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-start"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Target className="h-7 w-7 text-white" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">Misi Utama</h3>
          <ul className="space-y-3 text-white/90">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white" />
              <span>Mempersiapkan future leader dan pelajar rahmatan lil alamin.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white" />
              <span>Integrasi kurikulum nasional, agama, dan internasional.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white" />
              <span>Proses pembelajaran berbasis teknologi yang aktif & kreatif.</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/about/vision-mission"
          className="group inline-flex items-center text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base hover:underline"
        >
          Visi & Misi Selengkapnya
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}