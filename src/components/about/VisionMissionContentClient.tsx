// src/components/about/VisionMissionContentClient.tsx
"use client";

import { motion } from "framer-motion";
import AboutQuickLinks from "~/components/about/AboutQuickLinks";

const misiPreschool = [
  "Mengenalkan anak berbahasa Inggris dengan baik dan benar",
  "Mengimplementasikan proses pembelajaran yang menyenangkan, efektif, dan islami",
  "Menyelenggarakan pelayanan pembelajaran yang ramah anak",
  "Mendorong anak-anak menghafal al-qur’an sejak dini",
  "Menumbuhkan generasi global yang bertaqwa",
  "Mendidik dan memberikan keteladanan akhlakul karimah melalui pembiasaan di sekolah",
];

const misiPrimary = [
  "Mempersiapkan future leader dan pelajar rahmatan lil alamin.",
  "Mewujudkan pembelajaran Al-Quran dengan metode Qiroati, dan Pendidikan agama islam meliputi Akidah Akhlak, Fikih, Sejarah Kebudayaan Islam, Bahasa Arab dan Qur’an Hadits",
  "Mewujudkan lulusan yang cerdas, kompetitif, kolaboratif dan komunikatif secara global dengan tetap memiliki jati diri bangsa Indonesia.",
  "Mewujudkan proses pembelajaran berbasis teknologi yang aktif, kreatif, efektif, dan menyenangkan.",
  "Menerapkan digitalisasi sistem manajemen sekolah.",
];

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

export default function VisionMissionContentClient() {
  return (
    <>
      <motion.div className="container mx-auto px-6 py-16 md:py-24" {...fadeIn}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#0398C9]">
              Preschool
            </h2>
            <div className="mt-6">
              <h3 className="mb-4 text-xl font-bold text-neutral-900">Misi</h3>
              <ol className="space-y-4">
                {misiPreschool.map((misi, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-1 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FE7D01] text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="text-neutral-700">{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#0398C9]">Primary</h2>
            <div className="mt-6">
              <h3 className="mb-4 text-xl font-bold text-neutral-900">Misi</h3>
              <ol className="space-y-4">
                {misiPrimary.map((misi, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-1 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FE7D01] text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="text-neutral-700">{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>

      <AboutQuickLinks />
    </>
  );
}
