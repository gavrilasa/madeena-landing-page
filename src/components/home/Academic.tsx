// src/components/home/Academic.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Data untuk tiga kartu baru berdasarkan gambar Anda
const academicCards = [
  {
    title: "Akademik",
    description:
      "We have Preschool and Primary School grade. A joyful start to learning – where children explore, play, and grow with faith and curiosity.",
    imageUrl:
      "https://res.cloudinary.com/reswara/image/upload/v1761326431/DSCF7799_2_ltybau.png",
    href: "/akademik", // Sesuaikan link ini jika perlu
  },
  {
    title: "Achievement", // Ejaan diperbaiki
    description:
      "We have Preschool and Primary School grade. A joyful start to learning – where children explore, play, and grow with faith and curiosity.",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=3387&auto-format&fit-crop",
    href: "/prestasi", // Sesuaikan link ini jika perlu
  },
  {
    title: "Admission",
    description:
      "We have Preschool and Primary School grade. A joyful start to learning – where children explore, play, and grow with faith and curiosity.",
    imageUrl:
      "https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png",
    href: "/pendaftaran", // Sesuaikan link ini jika perlu
  },
];

export default function Academic() {
  return (
    <section className="bg-white py-16 text-gray-900 md:py-24">
      <div className="container mx-auto px-6">
        {/* Bagian Atas: Judul, Deskripsi, dan Link */}
        <div className="mb-12 grid grid-cols-1 items-start gap-6 md:mb-16 md:grid-cols-3 lg:gap-12">
          {/* Judul */}
          <div className="md:col-span-1">
            <h2 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Get To know
            </h2>
            <h1 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Al Madeena
            </h1>
          </div>

          {/* Deskripsi */}
          <div className="md:col-span-1 md:pt-2">
            <p className="max-w-lg text-[#828282]">
              Al Madeena is a modern Islamic school that blends faith and
              knowledge to nurture intelligent, kind, and confident learners
              prepared for the future.
            </p>
          </div>

          {/* Link "Learn More" */}
          <div className="flex md:justify-center md:col-span-1 md:pt-2 md:text-right">
            <Link
              href="/tentang/sejarah" // Anda bisa ganti link tujuannya
              className="group inline-flex items-center font-medium text-black hover:underline"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bagian Bawah: Tiga Kartu */}
        <div className="flex flex-col gap-6 md:flex-row lg:gap-8">
          {academicCards.map((card) => (
            <Link
              href={card.href}
              key={card.title}
              className="
                group relative block 
                h-[450px]                        /* Ketinggian tetap */
                flex-1                          /* Base: flex: 1 1 0% */
                hover:flex-2                  /* Hover: flex: 2 1 0% (tumbuh 2x lipat) */
                cursor-pointer overflow-hidden rounded-3xl 
                shadow-lg 
                /* Transisi lebih smooth dengan cubic-bezier, hanya pada 'flex-grow' */
                transition-[flex-grow] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                will-change-[flex-grow]         /* Hint untuk browser */
              "
            >
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              {/* Overlay untuk keterbacaan teks */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

              {/* PERUBAHAN DI SINI: Mengubah 'justify-between' menjadi 'justify-start' dan menambah 'gap-4' */}
              <div className="relative z-10 flex h-full flex-col justify-start gap-4 p-6 text-white">
                {/* Konten Atas: Judul dan Panah */}
                <div className="flex items-start justify-between">
                  <h3 className="text-4xl font-bold text-white/80">
                    {card.title}
                  </h3>
                  <ArrowRight className="h-6 w-6 shrink-0 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                {/* PERUBAHAN DI SINI: Deskripsi dipindah ke bawah Judul */}
                <p className="
                  max-w-xs text-sm leading-relaxed text-white/90 
                  opacity-0 
                  transition-opacity duration-500 ease-out delay-200 
                  group-hover:opacity-100
                ">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}