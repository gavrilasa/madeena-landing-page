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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {data.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              variants={fadeIn}
              className="group relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-gray-900 shadow-lg"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                {/* Top: Title */}
                <div>
                  <h3 className="text-xl leading-tight font-bold text-white md:text-2xl drop-shadow-md">
                    {item.title}
                  </h3>
                </div>

                {/* Bottom: Metric & Button */}
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="block text-4xl font-light text-white md:text-5xl">
                      {item.metric}
                    </span>
                    <span className="block text-sm text-gray-300 font-medium tracking-wide uppercase">
                      {item.metricLabel}
                    </span>
                  </div>

                  <Link
                    href={item.link}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-gray-900"
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
          className="relative rounded-3xl bg-gray-50 p-8 text-center md:p-12 border border-gray-100"
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