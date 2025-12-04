"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { extracurricularData } from "~/data/academic/extracurricularData";
import { cn } from "~/lib/utils";

interface ExtracurricularContentProps {
  category: "preschool" | "primary";
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function ExtracurricularContent({
  category,
}: ExtracurricularContentProps) {
  const data = extracurricularData[category];

  if (!data) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Content Grid */}
        <div className="flex flex-col gap-12 md:gap-16">
          {data.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="overflow-hidden rounded-3xl bg-gray-100"
              >
                <div
                  className={cn(
                    "flex flex-col md:items-center",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Image Side */}
                  <div className="relative w-full md:w-1/2 aspect-4/3 md:aspect-square lg:aspect-16/11">
                    <div className="relative h-full w-full p-8 md:p-12 flex items-center justify-center">
                        {/* Abstract Graphic Element Placeholder (Optional) */}
                        <div className="absolute inset-0 opacity-10 bg-gray-200 pattern-grid-lg" /> 
                        
                        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
                             <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                        </div>
                    </div>
                  </div>

                  {/* Text Content Side */}
                  <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                      {item.title}
                    </h3>
                    <div className="mb-6 h-1 w-20 bg-gray-300" />
                    <p className="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
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