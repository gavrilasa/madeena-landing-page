// src/components/academic/AchievementsContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { achievementsData } from "~/data/academic/achievmentsData";

interface AchievementsContentProps {
  category: "preschool" | "primary";
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function AchievementsContent({
  category,
}: AchievementsContentProps) {
  const data = achievementsData[category];

  if (!data) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="mb-12 max-w-4xl mx-auto text-center md:mb-16">
          <div
            className="prose prose-lg text-muted-foreground mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {data.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              variants={fadeIn}
              // UPDATED: Changed aspect ratio to aspect-[9/16]
              className="group relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-gray-900 shadow-lg"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Dark Overlay Gradient (More prominent at bottom for text readability) */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                
                <div className="flex flex-col gap-4">
                   {/* Title moved here for better flow in 9:16 layout */}
                   <h3 className="text-xl leading-tight font-bold text-white md:text-2xl drop-shadow-md line-clamp-2">
                    {item.title}
                  </h3>

                  <div>
                    <span className="block text-xl font-bold text-white md:text-2xl line-clamp-1">
                      {item.name}
                    </span>
                    <span className="block text-sm text-gray-300 font-medium tracking-wide uppercase mt-1">
                      {item.studentClass}
                    </span>
                  </div>

                  <Link
                    href={item.link}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-gray-900"
                  >
                    Read Story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Section */}
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative p-8 text-center md:p-12"
        >
          <Quote className="mx-auto mb-4 h-8 w-8 text-gray-300" />
          <div
            className="mx-auto max-w-3xl text-xl font-medium leading-relaxed text-gray-700 md:text-2xl"
            dangerouslySetInnerHTML={{ __html: data.closing }}
          />
          <div className="mt-6 flex justify-center">
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}