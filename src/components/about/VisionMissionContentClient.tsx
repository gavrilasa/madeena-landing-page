// src/components/about/VisionMissionContentClient.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const quickLinks = [
  {
    title: "Sejarah Sekolah",
    href: "/profil/sejarah",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto-format&fit=crop",
  },
  {
    title: "Fasilitas Kami",
    href: "/profil/fasilitas",
    image:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=800&auto-format&fit=crop",
  },
  {
    title: "Struktur Organisasi",
    href: "/profil/struktur",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto-format&fit=crop",
  },
  {
    title: "Prestasi",
    href: "/akademik/prestasi",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto-format&fit=crop",
  },
  {
    title: "Ekstrakurikuler",
    href: "/kehidupan-sekolah/ekstrakurikuler",
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto-format&fit=crop",
  },
];

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

      <motion.div {...fadeIn}>
        <div className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="mb-10 text-3xl font-bold text-neutral-900">
            Jelajahi Tentang Kami
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="group bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={link.image}
                    alt={link.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <h3 className="font-bold text-neutral-800 transition-colors group-hover:text-[#FE7D01]">
                    {link.title}
                  </h3>
                  <ArrowRight className="text-neutral-400 transition-colors group-hover:text-[#FE7D01]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
