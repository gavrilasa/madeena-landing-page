// src/components/academic/ProgramsContent.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { programsData } from "~/data/academic/programsData";

interface ProgramsContentProps {
  category: "preschool" | "primary";
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ProgramsContent({ category }: ProgramsContentProps) {
  const data = programsData[category];

  if (!data) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {data.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                variants={fadeIn}
                // Increased min-height for bigger cards to fit content comfortably
                className="group relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-3xl bg-gray-900 shadow-xl transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-transparent" />

                {/* Content Container */}
                <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner border border-white/10">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl leading-tight drop-shadow-lg">
                    {item.title}
                  </h3>

                  {/* Description - Full Text Display */}
                  <div className="w-full">
                    <p className="text-base leading-relaxed text-gray-100 md:text-sm font-medium opacity-90">
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