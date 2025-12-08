"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import {
  BackgroundSwirl,
  StarDecoration,
  FlowerDecoration,
} from "./academic/AcademicDecorations";
import HistoryTimeline from "./academic/HistoryTimeline";
import VisionMissionPreview from "./academic/VisionMissionPreview";
import FoundationBoardPreview from "./academic/FoundationBoardPreview";
import StaffPreview from "./academic/StaffPreview";
import { type Staff } from "~/lib/generated/prisma/client";
// If you updated types/foundation.ts, you can import type from there, 
// OR use 'any' if generic, but better to fetch proper type:
import { type FoundationMember } from "~/types/foundation"; 

interface AcademicProps {
  staff: Staff[];
  board: FoundationMember[];
}

export default function Academic({ staff, board }: AcademicProps) {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "Sejarah" },
    { id: "vision", label: "Visi & Misi" },
    { id: "foundation", label: "Dewan Yayasan" },
    { id: "staff", label: "Guru & Karyawan" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#059DEA] py-20 md:py-28">
      {/* ... Decorations ... */}
      <BackgroundSwirl />
      <FlowerDecoration className="absolute -left-4 top-4 w-20 opacity-20 md:left-4 md:top-8 md:w-28 md:opacity-30 lg:left-0 lg:top-6 lg:w-32" />
      <StarDecoration className="absolute bottom-16 right-8 w-8 animate-pulse opacity-30 md:bottom-20 md:right-16 md:w-10 lg:right-24 lg:w-12" />
      <StarDecoration className="absolute left-8 top-1/2 w-6 -translate-y-1/2 opacity-20 md:left-16 md:w-8 lg:left-24" />

      <div className="container relative z-10 mx-auto px-6">
        {/* ... Header ... */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mb-4 text-3xl font-bold text-white md:text-5xl"
           >
             Get To know Al Madeena
           </motion.h2>
           <motion.p className="text-base leading-relaxed text-white/90 md:text-lg">
             Al Madeena is a modern Islamic school that blends faith and knowledge...
           </motion.p>
        </div>

        {/* ... Tabs ... */}
        <div className="mb-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "border-white bg-white text-[#059DEA] shadow-lg scale-105"
                  : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ... Content ... */}
        <div className="@container mx-10 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-md backdrop-blur-sm md:mx-20 md:px-20 md:py-8 lg:mx-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === "history" && <HistoryTimeline />}
              {activeTab === "vision" && <VisionMissionPreview />}
              {activeTab === "foundation" && <FoundationBoardPreview data={board} />}
              {activeTab === "staff" && <StaffPreview data={staff} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}