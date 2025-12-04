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
        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-white shadow-xs"
            >
              {/* Card Header: Title Left, Image Right */}
              <div className="flex justify-between gap-6 border-b bg-gray-50/50">
                <div className="flex flex-col justify-between py-6 pl-6 md:py-10 md:pl-10">
                  <span className="text-muted-foreground font-mono text-xs font-medium tracking-widest uppercase">
                    {feature.label}
                  </span>
                  <h3 className="text-primary text-3xl font-bold transition-all hover:opacity-80 sm:text-4xl">
                    {feature.heading}
                  </h3>
                </div>
                <div className="relative w-2/5 shrink-0 border-l">
                  <Image
                    src={feature.image}
                    alt={feature.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-6 md:p-10">
                {/* Vision Section */}
                <div className="mb-8">
                  <h4 className="mb-3 text-lg font-bold text-gray-900">
                    Visi:
                  </h4>
                  <p className="text-primary text-lg font-medium italic">
                    &quot;{feature.vision}&quot;
                  </p>
                </div>

                {/* Missions List - Pushed to bottom with mt-auto */}
                <div>
                  <h4 className="mb-6 text-lg font-bold text-gray-900">
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
