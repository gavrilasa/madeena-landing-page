"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";

// Data untuk dua kartu yang baru
const academicCards = [
  {
    title: "Pre School",
    description:
      "Menghadirkan lingkungan belajar yang islami, hangat, dan menyenangkan untuk menumbuhkan anak saleh, cerdas, dan percaya diri.",
    imageUrl:
      "https://res.cloudinary.com/reswara/image/upload/v1761326431/DSCF7799_2_ltybau.png",
    href: "/preschool",
  },
  {
    title: "Primary School",
    description:
      "Sekolah dasar Islam terpadu yang memadukan kurikulum nasional dengan nilai-nilai Islam untuk membentuk generasi berilmu.",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=3387&auto-format&fit=crop",
    href: "/primary",
  },
];

export default function Academic() {
  return (
    <section className="bg-white py-16 text-gray-900 md:py-24">
      {/* Container 'max-w-7xl' sudah membuat section lebih lebar */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- PERUBAHAN BREAKPOINT DARI 'lg' KE 'xl' --- */}
        <div className="mb-12 grid grid-cols-1 items-start gap-6 md:mb-16 xl:grid-cols-3 xl:gap-12">
          
          {/* Judul */}
          <div className="xl:col-span-1"> {/* lg: -> xl: */}
            <h2 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Get To know
            </h2>
            <h1 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Al Madeena
            </h1>
          </div>

          {/* Deskripsi */}
          <div className="xl:col-span-1 xl:pt-2"> {/* lg: -> xl: */}
            <p className="max-w-lg text-[#828282]">
              Al Madeena is a modern Islamic school that blends faith and
              knowledge to nurture intelligent, kind, and confident learners
              prepared for the future.
            </p>
          </div>

          {/* Link "Learn More" */}
          <div className="flex w-full justify-start xl:col-span-1 xl:items-start xl:justify-end xl:pt-2"> {/* lg: -> xl: */}
            <Link
              href="/tentang/sejarah"
              className="group inline-flex items-center font-medium text-black hover:underline"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* --- PERUBAHAN BREAKPOINT DARI 'lg' KE 'xl' --- */}
        <div className="relative flex flex-col items-center gap-6 xl:flex-row xl:gap-8"> {/* lg: -> xl: */}
          
          {academicCards.map((card) => (
            <Link
              href={card.href}
              key={card.title}
              className={cn(
                "group relative block",
                "w-full", // Full-width di mobile & tablet
                "flex-1", // flex-1 di desktop (xl)
                
                "aspect-[3/4]", // Rasio potret (tinggi) di mobile & tablet
                "xl:aspect-auto xl:h-[450px]", // Kembali ke tinggi tetap di desktop (xl)

                "cursor-pointer overflow-hidden rounded-3xl",
                "shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl",
              )}
            >
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                sizes="(max-width: 1280px) 100vw, 50vw" // Diubah ke breakpoint xl
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

              {/* Konten Kartu (Rata Kiri Bawah) */}
              <div className="relative z-10 flex h-full flex-col items-start justify-end p-6 text-white md:p-8">
                <h3 className="text-4xl font-bold text-white md:text-5xl">
                  {card.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/90">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}

          {/* Logo Bulat di Tengah */}
          <div
            className="absolute z-20 hidden xl:block" // Diubah dari lg:block ke xl:block
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative h-40 w-40 rounded-full bg-white p-2">
              <Image
                src="https://res.cloudinary.com/reswara/image/upload/v1761321700/Frame_7_ihs1mi.svg"
                alt="Al Madeena Logo"
                fill
                sizes="160px"
                className="rounded-full object-cover p-2 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}