"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-lg"
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Dark Overlay for Readability - Gradient matches reference style */}
                <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:bg-black/70" />

                {/* Top: Icon */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Middle: Content */}
                <div className="relative z-10 mt-auto mb-6">
                  <h3 className="mb-2 text-xl leading-tight font-bold md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-white/80">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: CTA */}
                <div className="relative z-10">
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-sm font-semibold text-white transition-opacity hover:opacity-80"
                  >
                    {item.cta}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
