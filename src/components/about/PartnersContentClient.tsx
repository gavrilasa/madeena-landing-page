// src/components/about/PartnersContentClient.tsx
"use client";

import { motion } from "framer-motion";
import { GraduationCap, Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import React from "react";
import AboutQuickLinks from "./AboutQuickLinks";

type PartnerItem = {
  image?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
};

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const partners: PartnerItem[] = [
  {
    image: "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225145/Logo-Partner-BSI_tld1lg.png",
    title: "Bank Syariah Indonesia (BSI)",
    description:
      "Sebagai mitra dalam pengelolaan transaksi keuangan sekolah berbasis syariah, BSI turut mendukung penerapan sistem keuangan yang transparan, aman, dan sesuai prinsip Islam. Kerja sama ini juga menjadi sarana edukasi bagi siswa dan orang tua mengenai pentingnya literasi keuangan syariah sejak dini.",
  },
  {
    image: "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225437/Logo-Partner-PSP_w9ma0f.png",
    title: "Aplikasi Program Sekolah Pintar (PSP)",
    description:
      "Al Madeena menggunakan sistem manajemen sekolah digital melalui Aplikasi PSP yang mempermudah komunikasi antara sekolah, guru, siswa, dan orang tua. Dengan sistem ini, proses administrasi, absensi, laporan belajar, hingga kegiatan akademik dapat dikelola secara efisien dan transparan.",
  },
  {
    image: "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225560/Logo-Partner-Cerdig-LMS_lp1z7l.png",
    title: "Cerdig Learning Management System",
    description:
      "Dalam mendukung pembelajaran digital yang interaktif dan terintegrasi, Al Madeena memanfaatkan platform Cerdig LMS. Melalui aplikasi ini, guru dapat merancang pembelajaran berbasis teknologi, memberikan tugas daring, serta memantau perkembangan belajar siswa dengan lebih efektif.",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-orange-600" />,
    title: "Perguruan Tinggi Negeri dan Swasta",
    description:
      "Al Madeena Islamic School juga menjalin kerja sama dengan berbagai perguruan tinggi baik negeri maupun swasta, sebagai bentuk penguatan jejaring akademik dan pengembangan profesional guru. Kolaborasi ini mencakup program pelatihan, penelitian pendidikan, dan kegiatan praktik lapangan bagi mahasiswa calon pendidik.",
  },
];

export default function PartnersContentClient() {
  return (
    <>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          
          {/* Introduction Text */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative mx-auto mb-16 max-w-3xl text-center"
          >
            <Quote className="mx-auto mb-6 h-10 w-10 text-gray-300/80" />
            <p className="text-xl font-medium leading-relaxed text-gray-700 md:text-2xl">
              Al Madeena Islamic School senantiasa berkomitmen untuk menghadirkan
              pendidikan berkualitas melalui kolaborasi dengan berbagai lembaga
              profesional, institusi pendidikan tinggi, dan mitra strategis.
            </p>
            <div className="mt-8 flex justify-center">
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </div>
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="group flex h-full flex-col rounded-2xl  bg-white p-6 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Logo Container */}
                <div className="mb-6 flex h-20 w-full items-center justify-start">
                  <div className="flex h-16 w-16 items-center justify-center">
                    {partner.image ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={partner.image}
                          alt={partner.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      partner.icon
                    )}
                  </div>
                </div>

                {/* Title - Fixed min-height ensures descriptions align */}
                <h3 className="mb-4 flex min-h-14 items-center text-lg font-bold leading-tight text-gray-900 md:text-xl">
                  {partner.title}
                </h3>

                {/* Separator Line */}
                <div className="mb-4 h-px w-12 bg-gray-200 group-hover:bg-[#FE7D01] group-hover:w-full transition-all duration-500" />

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-gray-600 text-justify">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Text */}
          <div className="mt-20 border-t border-gray-200 pt-12">
            <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-muted-foreground">
              Melalui berbagai bentuk kerja sama tersebut, Al Madeena Islamic
              School terus berinovasi dalam menghadirkan sistem pendidikan Islam
              yang holistik — memadukan nilai-nilai keislaman dengan teknologi dan
              kemitraan profesional.
            </p>
          </div>
        </div>
      </section>

      <AboutQuickLinks />
    </>
  );
}