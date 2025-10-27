"use client";

import React from "react";
import { Carousel, Card } from "~/components/ui/apple-cards-carousel";
import { useState } from "react";
import { programData } from "~/data/home/programData";

export default function Programs() {
  const cards = programData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  const tabs = ["Primary School", "Pre School"];
  const [activeTab, setActiveTab] = useState("Primary School");

  return (
    <section className="text-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="mb-4 text-4xl font-bold text-[#0094D9] md:mb-8 md:text-5xl">
          Our Program
        </h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-blue-200">
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
      </div>

      <div>
        <Carousel items={cards} />
      </div>
    </section>
  );
}
