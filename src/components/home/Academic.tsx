"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const tabs = ["Academic", "Achievement", "Admissions"];

export default function Academic() {
  const [activeTab, setActiveTab] = useState("Academic");

  return (
    <section className="bg-[#f4f8fc] px-6 py-20 text-gray-900 md:px-16 lg:px-48">
      {/* Heading */}
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-medium text-[#0193DC] md:text-xl">
            Get To know
          </h2>
          <h1 className="text-4xl font-bold text-[#0193DC] md:text-5xl">
            Al Madeena
          </h1>
        </div>
        <div className="max-w-lg text-black">
          <p>
            Al Madeena is a modern Islamic school that blends faith and
            knowledge to nurture intelligent, kind, and confident learners
            prepared for the future.
          </p>
        </div>
        <a
            href="#"
            className="top-0 flex items-center font-medium text-[#0193DC] hover:underline"
        >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>

      {/* Tabs */}
      <div className="mb-10 flex gap-8 border-b border-blue-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-base font-medium transition-all duration-300 ${
              activeTab === tab
                ? "border-b-2 border-[#0193DC] text-[#0193DC]"
                : "text-gray-400 hover:text-[#0193DC]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2">
        {/* Card 1 */}
        <div className="group relative cursor-pointer overflow-hidden">
          <Image
            src="https://res.cloudinary.com/reswara/image/upload/v1761326431/DSCF7799_2_ltybau.png"
            alt="Pre-School"
            width={600}
            height={400}
            className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
          <div className="absolute right-6 bottom-6 left-6 z-20 text-white">
            <h3 className="mb-2 text-2xl font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Pre-School</h3>
            <p className="text-sm leading-relaxed">
              A joyful start to learning — where children explore, play, and
              grow with faith and curiosity. At Al Madeena, we nurture early
              character and creativity through meaningful, faith-based learning
              experiences.
            </p>
            <ArrowRight className="mt-4 h-5 w-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative cursor-pointer overflow-hidden">
          <Image
            src="https://res.cloudinary.com/reswara/image/upload/v1761326461/DSCF8018_1_fbj19m.png"
            alt="Primary School"
            width={600}
            height={400}
            className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
          <div className="absolute right-6 bottom-6 left-6 z-20 text-white">
            <h3 className="mb-2 text-2xl font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              Primary School
            </h3>
            <p className="text-sm leading-relaxed">
              Building a strong foundation in knowledge, faith, and character.
              Our curriculum blends academic excellence with Islamic values to
              shape confident and compassionate learners.
            </p>
            <ArrowRight className="mt-4 h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
