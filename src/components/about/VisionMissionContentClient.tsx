// src/components/about/VisionMissionContentClient.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

const features = [
  {
    id: "preschool",
    heading: "Preschool",
    label: "VISI & MISI",
    vision: "Global Generation, Islamic Character",
    // Menggunakan gambar dari Preschool Academic
    image: "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp", 
    missions: misiPreschool,
  },
  {
    id: "primary",
    heading: "Primary",
    label: "VISI & MISI",
    vision: "Global Generation, Islamic Character",
    // Menggunakan gambar dari Primary Academic
    image: "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224535/Primary-Academic_yadxyh.webp",
    missions: misiPrimary,
  },
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
        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-white shadow-xs"
            >
              {/* Card Header: Title Left, Image Right */}
              <div className="flex justify-between gap-6 border-b bg-gray-50/50">
                <div className="flex flex-col justify-between py-6 pl-6 md:pl-10 md:py-10">
                  <span className="text-muted-foreground font-mono text-xs font-medium tracking-widest uppercase">
                    {feature.label}
                  </span>
                  <h3 className="text-primary text-3xl font-bold transition-all hover:opacity-80 sm:text-4xl">
                    {feature.heading}
                  </h3>
                </div>
                <div className="relative w-2/5 shrink-0 border-l">
                  <Image
                    src={feature.image}
                    alt={feature.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-6 md:p-10">
                {/* Vision Section */}
                <div className="mb-8">
                  <h4 className="mb-3 text-lg font-bold text-gray-900">Visi:</h4>
                  <p className="text-lg font-medium italic text-primary">
                    &quot;{feature.vision}&quot;
                  </p>
                </div>

                {/* Missions List - Pushed to bottom with mt-auto */}
                <div className="mt-auto">
                  <h4 className="mb-6 text-lg font-bold text-gray-900">Daftar Misi:</h4>
                  <ol className="space-y-4">
                    {feature.missions.map((misi, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FE7D01] text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="flex-1 text-justify text-sm leading-relaxed text-muted-foreground md:text-base">
                          {misi}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AboutQuickLinks />
    </>
  );
}