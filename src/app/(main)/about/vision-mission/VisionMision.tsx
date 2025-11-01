"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay, FaChevronDown, FaArrowRight } from "react-icons/fa";

// --- Data (Tidak Berubah) ---
const quickLinks = [
  {
    title: "Sejarah Sekolah",
    href: "/profil/sejarah",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto-format&fit=crop"
  },
  {
    title: "Fasilitas Kami",
    href: "/profil/fasilitas",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=800&auto-format&fit=crop"
  },
  {
    title: "Struktur Organisasi",
    href: "/profil/struktur",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto-format&fit=crop"
  },
  {
    title: "Prestasi",
    href: "/akademik/prestasi",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto-format&fit=crop"
  },
  {
    title: "Ekstrakurikuler",
    href: "/kehidupan-sekolah/ekstrakurikuler",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto-format&fit=crop"
  },
];

const visiShared = "Global Generation, Islamic Character";

const misiPreschool = [
  "Mengenalkan anak berbahasa Inggris dengan baik dan benar",
  "Mengimplementasikan proses pembelajaran yang menyenangkan, efektif, dan islami",
  "Menyelenggarakan pelayanan pembelajaran yang ramah anak",
  "Mendorong anak-anak menghafal al-qur’an sejak dini",
  "Menumbuhkan generasi global yang bertaqwa",
  "Mendidik dan memberikan keteladanan akhlakul karimah melalui pembiasaan di sekolah"
];

const misiPrimary = [
  "Mempersiapkan future leader dan pelajar rahmatan lil alamin.",
  "Mewujudkan pembelajaran Al-Quran dengan metode Qiroati, dan Pendidikan agama islam meliputi Akidah Akhlak, Fikih, Sejarah Kebudayaan Islam, Bahasa Arab dan Qur’an Hadits",
  "Mewujudkan lulusan yang cerdas, kompetitif, kolaboratif dan komunikatif secara global dengan tetap memiliki jati diri bangsa Indonesia.",
  "Mewujudkan proses pembelajaran berbasis teknologi yang aktif, kreatif, efektif, dan menyenangkan.",
  "Menerapkan digitalisasi sistem manajemen sekolah."
];
// --- AKHIR KONTEN BARU ---


// --- DIPINDAHKAN KE LUAR: Konstanta tidak perlu dibuat ulang setiap render ---
const fadeIn = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
} as const;


export default function VisionMision() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // === PERBAIKAN DI SINI ===
  // 1. Jadikan fungsi 'async'
  const handlePlay = async () => {
    if (videoRef.current) {
      try {
        // 2. 'await' promise dari .play()
        await videoRef.current.play();
        // 3. Set state HANYA jika play berhasil
        setIsPlaying(true);
      } catch (error) {
        console.error("Gagal memutar video:", error);
        // Jika gagal, state tidak berubah dan tombol play tetap ada
      }
    }
  };

  // 4. Tambahkan fungsi 'handlePause'
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false); // Tampilkan kembali tombol play
    }
  };
  
  return (
    <div className="bg-white text-neutral-800">

      {/* 2. Hero Section (Tidak Berubah) */}
      <motion.div
        className="bg-linear-to-br from-[#0398C9] via-[#0398C9] to-[#0279a1] relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="font-chalk relative mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                Visi Misi
                <div className="absolute right-0 -bottom-2 left-0 h-1 -rotate-1 transform bg-yellow-300 opacity-70"></div>
              </span>
            </h1>
            <div className="absolute -top-6 -right-8 rotate-12 transform text-3xl text-yellow-300">
              ★
            </div>
            <div className="absolute -bottom-4 -left-6 text-2xl text-[#FE7D01]">
              ♥
            </div>
          </div>
          <p className=" mt-6 text-md text-white/90 md:text-2xl">
            {visiShared}
          </p>
        </div>
        </div>
      </motion.div>

      {/* 3. Konten Visi & Misi (Tidak Berubah) */}
      <motion.div 
        className="container mx-auto px-6 py-16 md:py-24"
        {...fadeIn} 
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {/* Bagian Preschool */}
           <div>
              <h2 className="text-3xl font-bold text-[#0398C9] mb-4">Preschool</h2>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Misi</h3>
                <ol className="space-y-4">
                  {misiPreschool.map((misi, index) => (
                    <li key={index} className="flex items-start">
                      <span className="shrink-0 w-6 h-6 bg-[#FE7D01] text-white text-sm font-semibold rounded-full flex items-center justify-center mr-3 mt-1">
                        {index + 1}
                      </span>
                      <span className="text-neutral-700">
                        {misi}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Bagian Primary */}
            <div>
              <h2 className="text-3xl font-bold text-[#0398C9] mb-4">Primary</h2>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Misi</h3>
                <ol className="space-y-4">
                  {misiPrimary.map((misi, index) => (
                    <li key={index} className="flex items-start">
                      <span className="shrink-0 w-6 h-6 bg-[#FE7D01] text-white text-sm font-semibold rounded-full flex items-center justify-center mr-3 mt-1">
                        {index + 1}
                      </span>
                      <span className="text-neutral-700">
                        {misi}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

        </div>
      </motion.div>
      
      {/* 5. Bagian "Tentang Kami" (Tidak Berubah) */}
      <motion.div  
        {...fadeIn} 
      >
        <div className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl font-bold text-neutral-900 mb-10">
            Jelajahi Tentang Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {quickLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                className="group bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={link.image}
                    alt={link.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex justify-between items-center">
                  <h3 className="font-bold text-neutral-800 group-hover:text-[#FE7D01] transition-colors">
                    {link.title}
                  </h3>
                  <FaArrowRight className="text-neutral-400 group-hover:text-[#FE7D01] transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}