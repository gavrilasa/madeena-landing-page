"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // <-- PASTIKAN IMAGE DIIMPOR
import { Banknote, Smartphone, Library, GraduationCap } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

// Data (Tidak berubah)
const partners = [
  {
    icon: Banknote,
    title: "Bank Syariah Indonesia (BSI)",
    description:
      "Sebagai mitra dalam pengelolaan transaksi keuangan sekolah berbasis syariah, BSI turut mendukung penerapan sistem keuangan yang transparan, aman, dan sesuai prinsip Islam. Kerja sama ini juga menjadi sarana edukasi bagi siswa dan orang tua mengenai pentingnya literasi keuangan syariah sejak dini.",
    color: "text-green-600",
  },
  {
    icon: Smartphone,
    title: "Aplikasi Program Sekolah Pintar (PSP)",
    description:
      "Al Madeena menggunakan sistem manajemen sekolah digital melalui Aplikasi PSP yang mempermudah komunikasi antara sekolah, guru, siswa, dan orang tua. Dengan sistem ini, proses administrasi, absensi, laporan belajar, hingga kegiatan akademik dapat dikelola secara efisien dan transparan.",
    color: "text-blue-600",
  },
  {
    icon: Library,
    title: "Cerdig Learning Management System (LMS)",
    description:
      "Dalam mendukung pembelajaran digital yang interaktif dan terintegrasi, Al Madeena memanfaatkan platform Cerdig LMS. Melalui aplikasi ini, guru dapat merancang pembelajaran berbasis teknologi, memberikan tugas daring, serta memantau perkembangan belajar siswa dengan lebih efektif.",
    color: "text-purple-600",
  },
  {
    icon: GraduationCap,
    title: "Perguruan Tinggi Negeri dan Swasta",
    description:
      "Al Madeena Islamic School juga menjalin kerja sama dengan berbagai perguruan tinggi baik negeri maupun swasta, sebagai bentuk penguatan jejaring akademik dan pengembangan profesional guru. Kolaborasi ini mencakup program pelatihan, penelitian pendidikan, dan kegiatan praktik lapangan bagi mahasiswa calon pendidik.",
    color: "text-orange-600",
  },
];

export default function PartnersPage() {
  return (
    <div className="bg-white text-neutral-800">
      {/* --- HERO SECTION BARU (DARI STAFFPROFILE) --- */}
      <div className="absolute inset-0 h-[40vh] md:h-[50vh] w-full flex items-center justify-center text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1920&auto-format&fit=crop"
          alt="Partner Al Madeena" // Alt text diubah
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <motion.div
        className="relative h-[40vh] md:h-[40vh] w-full flex items-center justify-center text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="font-chalk relative mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                Partner Kerjasama {/* Judul diubah */}
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
          <p className="font-handwriting mt-6 text-md text-white/90 md:text-xl">
            Bersinergi untuk Pendidikan Islam yang Unggul {/* Subtitle diubah */}
          </p>
        </div>
      </motion.div>
      {/* --- AKHIR HERO SECTION BARU --- */}

      {/* Konten Partner */}
      <motion.div
        className="container mx-auto max-w-4xl px-6 py-16 md:py-24"
        {...fadeIn}
      >
        <div className="prose prose-lg max-w-none text-neutral-700">
          <p className="text-center text-lg leading-relaxed">
            Al Madeena Islamic School senantiasa berkomitmen untuk menghadirkan
            pendidikan berkualitas melalui kolaborasi dengan berbagai lembaga
            profesional, institusi pendidikan tinggi, dan mitra strategis. Kami
            percaya bahwa sinergi yang kuat antara sekolah dan berbagai pihak
            akan memperkaya pengalaman belajar siswa serta memperkuat sistem
            manajemen pendidikan yang modern, efektif, dan islami.
          </p>
          <p className="text-center text-lg leading-relaxed">
            Beberapa mitra yang telah bekerja sama dengan Al Madeena Islamic
            School antara lain:
          </p>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.title}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className={`mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-100 ${partner.color}`}
              >
                <partner.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-800">
                  {partner.title}
                </h3>
                <p className="mt-2 text-base text-neutral-600">
                  {partner.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="prose prose-lg mt-16 max-w-none border-t border-gray-200 pt-10 text-neutral-700">
          <p>
            Melalui berbagai bentuk kerja sama tersebut, Al Madeena Islamic
            School terus berinovasi dalam menghadirkan sistem pendidikan Islam
            yang holistik — memadukan nilai-nilai keislaman dengan teknologi
            dan kemitraan profesional — demi mencetak generasi Qur’ani yang
            cerdas, berkarakter, dan siap menghadapi tantangan masa depan.
          </p>
        </div>
      </motion.div>
    </div>
  );
}