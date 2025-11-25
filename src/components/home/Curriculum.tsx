"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { curriculumData } from "~/data/academic/curriculumData";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// --- Decorative Components ---

function DecorationFlower({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("opacity-20 text-white fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 35C50 15 35 0 25 0C15 0 0 15 0 25C0 35 15 50 35 50C15 50 0 65 0 75C0 85 15 100 25 100C35 100 50 85 50 65C50 85 65 100 75 100C85 100 100 85 100 75C100 65 85 50 65 50C85 50 100 35 100 25C100 15 85 0 75 0C65 0 50 15 50 35Z" />
    </svg>
  );
}

function DecorationHash({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("opacity-20 text-white fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="0" width="20" height="120" rx="10" />
      <rect x="80" y="0" width="20" height="120" rx="10" />
      <rect x="0" y="20" width="120" height="20" rx="10" />
      <rect x="0" y="80" width="120" height="20" rx="10" />
    </svg>
  );
}

function DecorationStar({ className }: { className?: string }) {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.5745 3.22533C17.1658 -1.07512 23.2483 -1.07511 24.8396 3.22534L27.3865 10.1082C27.8868 11.4603 28.9528 12.5263 30.3048 13.0266L37.1878 15.5735C41.4882 17.1648 41.4882 23.2473 37.1878 24.8386L30.3048 27.3855C28.9528 27.8858 27.8868 28.9518 27.3865 30.3039L24.8396 37.1868C23.2483 41.4872 17.1658 41.4872 15.5745 37.1868L13.0276 30.3039C12.5273 28.9518 11.4613 27.8858 10.1092 27.3855L3.2263 24.8386C-1.07415 23.2473 -1.07414 17.1648 3.22631 15.5735L10.1092 13.0266C11.4613 12.5263 12.5273 11.4603 13.0276 10.1082L15.5745 3.22533Z"
        fill="white"
      />
    </svg>
  );
}

function DecorationCircle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("opacity-20 text-white fill-none stroke-current", className)}
      strokeWidth="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" />
    </svg>
  );
}

// --- Main Component ---

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState<"preschool" | "primary">("preschool");
  
  // Get first 4 items for the grid layout to match design
  const data = curriculumData[activeTab].slice(0, 4);

  return (
    <section className="relative w-full overflow-hidden bg-[#FE9E35] py-20 md:py-20">
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#FE9E35]">
        {/* Top Left Flower */}
        <DecorationFlower className="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64 rotate-[-15deg]" />
        
        {/* Top Right Hash */}
        <DecorationHash className="absolute top-10 -right-10 w-40 h-40 md:w-56 md:h-56 rotate-15" />
        
        {/* Bottom Left Star */}
        <DecorationStar className="absolute bottom-20 opacity-20 left-10 w-16 h-16 md:w-24 md:h-24" />
        
        {/* Bottom Right Circle */}
        <DecorationCircle className="absolute bottom-0 right-10 w-32 h-32 md:w-48 md:h-48" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-sm"
        >
          Kurikulum
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-14">
          <button
            onClick={() => setActiveTab("preschool")}
            className={cn(
              "rounded-full px-8 py-3 text-sm font-bold transition-all duration-300",
              activeTab === "preschool"
                ? "bg-white text-gray-900 shadow-lg scale-105"
                : "bg-transparent text-white border border-white/50 hover:bg-white/10"
            )}
          >
            Pre School
          </button>
          <button
            onClick={() => setActiveTab("primary")}
            className={cn(
              "rounded-full px-8 py-3 text-sm font-bold transition-all duration-300",
              activeTab === "primary"
                ? "bg-white text-gray-900 shadow-lg scale-105"
                : "bg-transparent text-white border border-white/50 hover:bg-white/10"
            )}
          >
            Primary School
          </button>
        </div>

        {/* Cards Grid */}
        <div className="@container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-3xl bg-white p-8 shadow-xl h-full min-h-[300px] transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="mb-4">
                    <span className="block text-4xl font-extrabold text-gray-900">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-gray-900">
                    {item.title}
                  </h3>
                  <div className="text-sm leading-relaxed text-gray-500 line-clamp-5" dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href={activeTab === "preschool" ? "/preschool/curriculum" : "/primary/curriculum"}
            className="group inline-flex items-center text-lg font-semibold text-white hover:underline"
          >
            Lihat Detail
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}