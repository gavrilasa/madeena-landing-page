"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";
import SpinningLogo from "~/components/common/Circular";

const academicCards = [
  {
    title: "Pre School",
    description:
      "Menghadirkan lingkungan belajar yang islami, hangat, dan menyenangkan untuk menumbuhkan anak saleh, cerdas, dan percaya diri.",
    imageUrl:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224680/Preschool-Academic_jt56ik.webp",
    href: "/preschool",
  },
  {
    title: "Primary School",
    description:
      "Sekolah dasar Islam terpadu yang memadukan kurikulum nasional dengan nilai-nilai Islam untuk membentuk generasi berilmu.",
    imageUrl:
      "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224535/Primary-Academic_yadxyh.webp",
    href: "/primary",
  },
];

export default function Academic() {
  return (
    <section className="bg-white py-16 text-gray-900 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 items-start gap-6 md:mb-16 xl:grid-cols-3 xl:gap-12">
          <div className="xl:col-span-1">
            <h2 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Get To know
            </h2>
            <h1 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Al Madeena
            </h1>
          </div>

          <div className="xl:col-span-1 xl:pt-2">
            <p className="max-w-lg text-[#828282]">
              Al Madeena is a modern Islamic school that blends faith and
              knowledge to nurture intelligent, kind, and confident learners
              prepared for the future.
            </p>
          </div>

          <div className="flex w-full justify-start xl:col-span-1 xl:items-start xl:justify-center xl:pt-2">
            <Link
              href="/tentang/sejarah"
              className="group inline-flex items-center font-medium text-black hover:underline"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-6 xl:flex-row xl:gap-8">
          {academicCards.map((card) => (
            <Link
              href={card.href}
              key={card.title}
              className={cn(
                "group relative block",
                "w-full",
                "flex-1",

                "aspect-3/4",
                "xl:aspect-auto xl:h-[450px]",

                "cursor-pointer overflow-hidden rounded-3xl",
              )}
            >
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                sizes="(max-width: 1280px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

              <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 p-6 text-white md:p-8">
                <h3 className="text-4xl font-bold text-white md:text-5xl">
                  {card.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-white/90">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}

          {/* Spinning Logo - Centered between cards */}
          <div
            className="absolute z-20 hidden xl:block"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <SpinningLogo
              src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763885433/outer-text-logo_plu5w0.svg"
              alt="Al Madeena Text"
              innerSrc="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763885433/logo-without-text_iuydhz.svg"
              innerAlt="Al Madeena Logo"
              size={160}
              speed={20}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
