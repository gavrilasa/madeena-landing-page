// src/components/academic/CurriculumContent.tsx
"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { cn } from "~/lib/utils";
import Image from "next/image";

// Tipe data untuk item kurikulum
interface CurriculumItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface CurriculumContentProps {
  level: "preschool" | "primary";
  data: CurriculumItem[];
  title: string;
  subtitle: string;
  visualAlt: string;
  visualImage: string;
}

const Illustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.607422"
        y1="2.57422"
        x2="21.5762"
        y2="2.57422"
        stroke="currentColor"
        strokeWidth="4"
        className="text-primary/20"
      />
      <line
        x1="19.5762"
        y1="19.624"
        x2="19.5762"
        y2="4.57422"
        stroke="currentColor"
        strokeWidth="4"
        className="text-primary/20"
      />
    </svg>
  );
};

export default function CurriculumContent({
  level,
  data,
  title,
  subtitle,
  visualAlt,
  visualImage,
}: CurriculumContentProps) {
  const Icon = level === "primary" ? GraduationCap : BookOpen;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">

        {/* Content Grid */}
        <div className="grid py-10 grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-20">
          {/* Left Side: Sticky Image */}
          <div className="col-span-2 h-fit lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-auto lg:h-[600px]"
            >
              <Image
                src={visualImage}
                alt={visualAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {level === "primary" ? "Primary" : "Preschool"} Excellence
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Process List */}
          <ul className="col-span-4 flex w-full flex-col lg:pl-10">
            {data.map((item, index) => (
              <li
                key={item.id}
                className="relative flex flex-col gap-6 border-t border-gray-200 py-10 md:flex-row md:gap-10 first:border-t-0 lg:first:border-t"
              >
                <Illustration className="absolute top-10 right-0 hidden md:block" />

                {/* Number */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-xl font-bold tracking-tight text-gray-900">
                  {item.number}
                </div>

                {/* Content */}
                <div className="flex-1 pr-0 md:pr-12">
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}