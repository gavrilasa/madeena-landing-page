// src/components/about/VisionMissionContentClient.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AboutQuickLinks from "~/components/about/AboutQuickLinks";

export type FeatureItem = {
  id: string;
  heading: string;
  label: string;
  vision: string;
  image: string;
  missions: string[];
};

interface VisionMissionProps {
  features: FeatureItem[];
}

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

export default function VisionMissionContentClient({
  features,
}: VisionMissionProps) {
  return (
    <>
      <motion.div
        className="container mx-auto px-6 md:pt-24"
        {...fadeIn}
        viewport={{ once: true }}
      >
        <div className="grid gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm lg:flex-row"
            >
              {/* Image Section - Diperbesar */}
              <div className="relative h-64 w-full shrink-0 border-b lg:h-auto lg:w-1/2 lg:border-r lg:border-b-0">
                <Image
                  src={feature.image}
                  alt={feature.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col p-6 md:p-10 lg:p-12">
                <div className="mb-8">
                  <span className="text-muted-foreground mb-2 block font-mono text-xs font-medium tracking-widest uppercase">
                    {feature.label}
                  </span>
                  <h3 className="text-primary mb-6 text-3xl font-bold sm:text-4xl">
                    {feature.heading}
                  </h3>
                  
                  <div className="rounded-xl bg-gray-50 p-6">
                    <h4 className="mb-2 text-lg font-bold text-gray-900">
                      Visi:
                    </h4>
                    <p className="text-primary text-xl font-medium italic leading-relaxed">
                      &quot;{feature.vision}&quot;
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-bold text-gray-900">
                    Daftar Misi:
                  </h4>
                  <ol className="space-y-4">
                    {feature.missions.map((misi, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FE7D01] text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="text-muted-foreground flex-1 text-justify text-sm leading-relaxed md:text-base">
                          {misi}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AboutQuickLinks />
    </>
  );
}