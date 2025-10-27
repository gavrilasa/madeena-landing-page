"use client";

import React from "react";
import { Carousel, Card } from "~/components/ui/apple-cards-carousel";
import { useState } from "react";
import { programData } from "~/data/home/programData";

export default function Programs() {
  const cards = programData.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={false} />
  ));

  const tabs = ["Primary School", "Pre School"];
  const [activeTab, setActiveTab] = useState("Primary School");

  return (
    <section className="bg-[#f4f8fc] py-8 text-gray-900 md:pt-20 md:pb-12">
      <div className="mx-auto mb-8 max-w-7xl px-6 md:mb-12 md:px-12 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold text-[#0094D9] md:mb-8 md:text-5xl">
          Our Program
        </h1>

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
      </div>

      <div className="pl-6 md:pl-12 lg:pl-16">
        <Carousel items={cards} />
      </div>
    </section>
  );
}

// const DummyContent = () => {
//   return (
//     <>
//       {[...new Array(3).fill(1)].map((_, index) => {
//         return (
//           <div
//             key={"dummy-content" + index}
//             className="mb-4 bg-[#F5F5F7] p-8 md:p-14"
//           >
//             <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 md:text-2xl">
//               <span className="font-bold text-neutral-700">
//                 Program description and details about the curriculum.
//               </span>{" "}
//               Learn more about our comprehensive educational approach and how we
//               prepare students for success.
//             </p>
//           </div>
//         );
//       })}
//     </>
//   );
// };
