"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { activitiesData } from "~/data/academic/activitiesData";

interface ActivitiesContentProps {
  category: "preschool" | "primary";
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function ActivitiesContent({ category }: ActivitiesContentProps) {
  const data = activitiesData[category];

  if (!data) return null;

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-16 md:gap-24">
          {data.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                // CSS-ONLY LAYOUT CONTROL:
                // 'flex-col' stacks them on mobile (image on top, text below).
                // 'md:flex-row-reverse' puts image on Right, text on Left for Desktop.
                className="flex flex-col items-center gap-8 md:flex-row-reverse md:gap-12 lg:gap-20"
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                {/* Image Side (Right on Desktop due to row-reverse) */}
                <div className="relative w-full flex-1">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl md:aspect-4/3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity hover:bg-black/0" />
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-2xl bg-primary/10" />
                </div>

                {/* Content Side (Left on Desktop due to row-reverse) */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-primary">
                      Activity 0{index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mx-auto h-1 w-20 rounded-full bg-primary md:mx-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}