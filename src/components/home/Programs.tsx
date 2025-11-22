"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { programsData } from "~/data/academic/programsData";
import ProgramCarousel from "~/components/common/Carousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Category = "primary" | "preschool";

export default function Programs() {
  const [activeTab, setActiveTab] = useState<Category>("primary");
  const data = programsData[activeTab];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="mb-4 flex flex-col gap-6 md:mb-8">
        <div className="flex items-start">
          <div className="">
            <h2 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Our Program
            </h2>
          </div>


          <div className="flex w-full justify-end xl:col-span-1 xl:items-end xl:justify-end xl:pt-2">
            <Link
              href="/news"
              className="group inline-flex items-center font-medium text-black hover:underline"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

          {/* Custom Tab Navigation */}
          <div className="flex w-full border-b border-gray-200">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("primary")}
                className={cn(
                  "relative pb-3 text-lg font-medium transition-colors duration-300",
                  activeTab === "primary"
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                Primary School
                {activeTab === "primary" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 h-[3px] w-full bg-black"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("preschool")}
                className={cn(
                  "relative pb-3 text-lg font-medium transition-colors duration-300",
                  activeTab === "preschool"
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                Pre School
                {activeTab === "preschool" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 h-[3px] w-full bg-black"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <ProgramCarousel items={data} />
      </div>
    </section>
  );
}