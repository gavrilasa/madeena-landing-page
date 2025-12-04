// src/components/about/PartnersContentClient.tsx
"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { type ElementType } from "react";
import AboutQuickLinks from "./AboutQuickLinks";
import * as Icons from "lucide-react";

type PartnerItem = {
  id: number;
  src?: string;
  iconName?: string;
  title: string;
  description: string;
};

interface PartnersContentClientProps {
  data: PartnerItem[];
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

export default function PartnersContentClient({
  data,
}: PartnersContentClientProps) {
  return (
    <>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Introduction Text */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative mx-auto mb-16 max-w-3xl text-center"
          >
            <Quote className="mx-auto mb-6 h-10 w-10 text-gray-300/80" />
            <p className="text-xl leading-relaxed font-medium text-gray-700 md:text-2xl">
              Al Madeena Islamic School senantiasa berkomitmen untuk
              menghadirkan pendidikan berkualitas melalui kolaborasi dengan
              berbagai lembaga profesional, institusi pendidikan tinggi, dan
              mitra strategis.
            </p>
            <div className="mt-8 flex justify-center">
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </div>
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {data.map((partner, index) => {
              // Logic Dynamic Icon: Ambil komponen icon dari Lucide berdasarkan string nama
              const IconComponent = partner.iconName
                ? (Icons as unknown as Record<string, ElementType>)[
                    partner.iconName
                  ]
                : null;

              return (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Logo Container */}
                  <div className="mb-6 flex h-20 w-full items-center justify-start">
                    <div className="flex h-16 w-16 items-center justify-center">
                      {partner.src ? (
                        <div className="relative h-full w-full">
                          <Image
                            src={partner.src}
                            alt={partner.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        IconComponent && (
                          <IconComponent className="h-10 w-10 text-orange-600" />
                        )
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 flex min-h-14 items-center text-lg leading-tight font-bold text-gray-900 md:text-xl">
                    {partner.title}
                  </h3>

                  {/* Separator Line */}
                  <div className="mb-4 h-px w-12 bg-gray-200 transition-all duration-500 group-hover:w-full group-hover:bg-[#FE7D01]" />

                  {/* Description */}
                  <p className="flex-1 text-justify text-sm leading-relaxed text-gray-600">
                    {partner.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer Text */}
          <div className="mt-20 border-t border-gray-200 pt-12">
            <p className="text-muted-foreground mx-auto max-w-4xl text-center text-lg leading-relaxed">
              Melalui berbagai bentuk kerja sama tersebut, Al Madeena Islamic
              School terus berinovasi dalam menghadirkan sistem pendidikan Islam
              yang holistik — memadukan nilai-nilai keislaman dengan teknologi
              dan kemitraan profesional.
            </p>
          </div>
        </div>
      </section>

      <AboutQuickLinks />
    </>
  );
}
