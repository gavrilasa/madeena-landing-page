// src/components/academic/FacilitiesContent.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type ElementType } from "react"; 
import { facilitiesData } from "~/data/academic/facilitiesdata";
import { cn } from "~/lib/utils";
import * as Icons from "lucide-react";

interface FacilitiesContentProps {
  category: "preschool" | "primary";
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function FacilitiesContent({
  category,
}: FacilitiesContentProps) {
  const data = facilitiesData[category];

  if (!data) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => {
            const IconComponent =
              (Icons as unknown as Record<string, ElementType>)[item.icon] ??
              Icons.Building2;

            const isLarge = index % 4 === 0 || index % 4 === 3;

            return (
              <motion.div
                key={item.id}
                className={cn(
                  "group relative overflow-hidden rounded-3xl bg-gray-900 shadow-xl",
                  "col-span-1",
                  isLarge ? "md:col-span-2" : "md:col-span-1",
                  "h-[400px] md:h-[450px]", 
                )}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                {/* Perbaikan: Hapus opacity-60, ganti jadi opacity-100 */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
                />

                {/* Perbaikan: Gradient lebih transparan (black/60 instead of black/90) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/20 backdrop-blur-md">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white md:text-3xl drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-100 md:text-lg drop-shadow-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}