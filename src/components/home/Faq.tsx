"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { faqData } from "~/data/registration/faqData";
import { ScrollLine } from "../ui/scroll-line";
import {
  DecorationBlueFlower,
  DecorationGreenStar,
  DecorationYellowShape,
} from "./faq/FaqDecorations";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export default function Faq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* --- Background Decorations --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Top Left Green Star */}
        <DecorationGreenStar className="absolute left-16 top-8 w-12 h-12 md:left-32 md:top-24" />

        {/* Top Right Orange Swirl */}
        {/* UPDATED: Hidden on mobile */}
        <ScrollLine
          containerRef={sectionRef}
          className="hidden md:block absolute md:right-0 md:top-0 md:w-[400px] z-10"
        />

        {/* Bottom Left Blue Flower */}
        <DecorationBlueFlower className="absolute -left-10 bottom-10 w-24 h-24 md:left-0 md:bottom-20 md:w-32 md:h-32" />

        {/* Bottom Right Yellow Hash */}
        <DecorationYellowShape className="absolute bottom-0 -right-2 w-48 h-48 md:bottom-24 md:-right-4" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-[#444444] md:text-5xl">
            Frequently
          </h2>
          <h2 className="text-4xl font-bold text-[#444444] md:text-5xl">
            Asked Question
          </h2>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="mx-auto max-w-3xl"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-gray-800 bg-white px-6 transition-all duration-300 rounded-2xl data-[state=open]:rounded-4xl last:border-b"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:no-underline md:text-lg py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}