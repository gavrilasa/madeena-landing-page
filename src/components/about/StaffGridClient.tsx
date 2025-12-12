// src/components/about/StaffGridClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import type { Staff } from "~/types/staff";
import AboutQuickLinks from "./AboutQuickLinks";
import { cn } from "~/lib/utils";

const departmentsData = [
  { id: "leadership", name: "Leadership Team" },
  { id: "teachers", name: "Teaching Staff" },
  { id: "administration", name: "Administration" },
  { id: "support", name: "Support Staff" },
];

const fastTween = { type: "tween", duration: 0.3, ease: "easeInOut" } as const;

interface StaffGridClientProps {
  staffList: Staff[];
}

export default function StaffGridClient({ staffList }: StaffGridClientProps) {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredStaff =
    selectedDepartment === "all"
      ? staffList
      : staffList.filter((staff) => staff.department === selectedDepartment);

  const renderProfileImage = (
    imageUrl: string | null | undefined,
    alt: string,
    gender: string | null | undefined,
  ) => {
    if (imageUrl) {
      return (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      );
    }

    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
        <User
          className={cn(
            "size-40",
            gender === "FEMALE" ? "text-pink-500" : "text-blue-500",
          )}
          strokeWidth={1.5}
        />
      </div>
    );
  };

  const cardGradientClass = "bg-gradient-to-br from-[#059DEA] to-[#007bb8]";

  return (
    <>
      <div className="container mx-auto px-6 py-8 md:py-16">
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedDepartment("all")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              selectedDepartment === "all"
                ? "bg-black text-white"
                : "border border-gray-900 bg-white text-gray-900 hover:border-black hover:bg-black hover:text-white"
            }`}
          >
            All Staff
          </button>
          {departmentsData.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                selectedDepartment === dept.id
                  ? "bg-black text-white"
                  : "border border-gray-900 bg-white text-gray-900 hover:border-black hover:bg-black hover:text-white"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredStaff.map((staff) => (
              <motion.div
                key={staff.id}
                layoutId={`card-${staff.id}`}
                className="group cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={fastTween}
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <div
                    className={`relative aspect-3/4 overflow-hidden ${cardGradientClass}`}
                  >
                    <div className="absolute inset-0">
                      {renderProfileImage(
                        staff.imageUrl,
                        staff.name,
                        staff.gender,
                      )}
                    </div>
                  </div>

                  {/* Info Section - Hanya Nama dan Role */}
                  <div className=" p-3">
                    <div className="mb-2 border-b border-gray-900 pb-2 text-center">
                       <Image
                        src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1761844689/Logo_Footer_mdjaax.svg"
                        alt="Logo"
                        width={240}
                        height={60}
                        className="mx-auto h-auto w-full max-w-40 object-contain"
                      />
                    </div>
                    <div className="space-y-1 py-1 text-center">
                      <h3 className="line-clamp-1 text-base leading-tight font-bold text-gray-900">
                        {staff.name}
                      </h3>
                      <p className="line-clamp-1 text-xs text-gray-900">
                        {staff.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredStaff.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-900">
              <p>Belum ada data staff untuk kategori ini.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal removed completely */}

      <AboutQuickLinks />
    </>
  );
}