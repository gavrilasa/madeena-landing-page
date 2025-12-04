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

// Tab Configuration
const tabs = [
  { id: "history", label: "Sejarah", component: HistoryTimeline },
  { id: "vision", label: "Visi & Misi", component: VisionMissionPreview },
  { id: "foundation", label: "Dewan Yayasan", component: FoundationBoardPreview },
  { id: "staff", label: "Guru & Karyawan", component: StaffPreview },
];

export default function Academic() {
  const [activeTab, setActiveTab] = useState("history");

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

  return (
    // Main Section Container with Blue Background from design
    <section className="relative w-full overflow-hidden bg-[#059DEA] py-20 md:py-28">
      
      {/* --- Background Decorations --- */}
      <BackgroundSwirl />
      
      {/* Flower Decoration - Top Left */}
      <FlowerDecoration className="absolute -left-4 top-4 w-20 opacity-20 md:left-4 md:top-8 md:w-28 md:opacity-30 lg:left-0 lg:top-6 lg:w-32" />
      
      {/* Star Decorations - Multiple positions */}
      <StarDecoration className="absolute bottom-16 right-8 w-8 animate-pulse opacity-30 md:bottom-20 md:right-16 md:w-10 lg:right-24 lg:w-12" />
      <StarDecoration className="absolute left-8 top-1/2 w-6 -translate-y-1/2 opacity-20 md:left-16 md:w-8 lg:left-24" />


      <div className="container relative z-10 mx-auto px-6">
        
        {/* --- Header Section --- */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-white md:text-5xl"
          >
            Get To know Al Madeena
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base leading-relaxed text-white/90 md:text-lg"
          >
            Al Madeena is a modern Islamic school that blends faith and knowledge
            to nurture intelligent, kind, and confident learners prepared for the
            future.
          </motion.p>
        </div>

        {/* --- Tabs Navigation --- */}
        <div className="mb-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#059DEA]",
                activeTab === tab.id
                  ? "border-white bg-white text-[#059DEA] shadow-lg scale-105"
                  : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- Content Area --- */}
        <div className="@container rounded-3xl bg-white/10 mx-10 md:mx-20 lg:mx-40 p-6 backdrop-blur-sm border border-white/10 shadow-md md:px-20 md:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {ActiveComponent && <ActiveComponent />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}