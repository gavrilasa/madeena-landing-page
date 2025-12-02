// src/components/about/StaffGridClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import type { Staff } from "~/types/staff";
import AboutQuickLinks from "./AboutQuickLinks";

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
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  const filteredStaff =
    selectedDepartment === "all"
      ? staffList
      : staffList.filter((staff) => staff.department === selectedDepartment);

  const handleCardClick = (id: string) => {
    setSelectedStaffId(id);
  };

  const handleCloseModal = () => {
    setSelectedStaffId(null);
  };

  const selectedStaffData = staffList.find((s) => s.id === selectedStaffId);

  const renderProfileImage = (
    imageUrl: string | null | undefined,
    alt: string,
    isModal = false,
  ) => {
    if (imageUrl) {
      return (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes={
            isModal
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 25vw"
          }
        />
      );
    }

    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
        <User
          className={isModal ? "h-32 w-32" : "h-20 w-20"}
          strokeWidth={1.5}
        />
      </div>
    );
  };

  const cardGradientClass = "bg-gradient-to-br from-[#059DEA] to-[#007bb8]";

  return (
    <>
      <div className="container mx-auto px-6 py-8 md:py-16">
        {/* Filter Buttons */}
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

        {/* Staff Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredStaff.map((staff) => (
              <motion.div
                key={staff.id}
                layoutId={`card-${staff.id}`}
                onClick={() => handleCardClick(staff.id)}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={fastTween}
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl">
                  <div
                    className={`relative aspect-3/4 overflow-hidden ${cardGradientClass}`}
                  >
                    <div className="absolute inset-0">
                      {renderProfileImage(staff.imageUrl, staff.name)}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="bg-white p-4">
                    <div className="mb-3 border-b-2 border-gray-900 pb-3 text-center">
                      <Image
                        src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1761844689/Logo_Footer_mdjaax.svg"
                        alt="Logo"
                        width={120}
                        height={30}
                        className="mx-auto h-auto w-full max-w-[120px] object-contain opacity-80"
                      />
                    </div>

                    <div className="space-y-1 text-center">
                      <h3 className="line-clamp-1 text-base leading-tight font-bold text-gray-900">
                        {staff.name}
                      </h3>
                      <p className="line-clamp-1 text-xs text-gray-600">
                        {staff.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredStaff.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p>Belum ada data staff untuk kategori ini.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedStaffId && selectedStaffData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`card-${selectedStaffData.id}`}
              className="scrollbar-hide relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-50 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition hover:bg-white"
              >
                <svg
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Modal Image Side */}
                <div
                  className={`relative aspect-square md:aspect-auto md:min-h-[400px] md:w-1/2 ${cardGradientClass}`}
                >
                  <div className="absolute inset-0">
                    {renderProfileImage(
                      selectedStaffData.imageUrl,
                      selectedStaffData.name,
                      true,
                    )}
                  </div>
                </div>

                {/* Modal Content Side */}
                <div className="flex flex-col bg-white p-6 md:w-1/2 md:p-8">
                  <div className="mb-6 border-b-2 border-gray-900 pb-4 text-center">
                    <Image
                      src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1761844689/Logo_Footer_mdjaax.svg"
                      alt="Logo"
                      width={160}
                      height={40}
                      className="mx-auto h-auto w-full max-w-40 object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-5">
                    <div>
                      <h3 className="text-2xl leading-tight font-bold text-gray-900">
                        {selectedStaffData.name}
                      </h3>
                      <p className="text-primary mt-1 text-lg font-medium">
                        {selectedStaffData.role}
                      </p>
                    </div>

                    {selectedStaffData.quote && (
                      <div className="border-primary rounded-r-lg border-l-4 bg-gray-50 p-4">
                        <p className="text-sm leading-relaxed text-gray-700 italic">
                          &quot;{selectedStaffData.quote}&quot;
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          Department
                        </span>
                        <span className="font-medium text-gray-900">
                          {departmentsData.find(
                            (d) => d.id === selectedStaffData.department,
                          )?.name ?? selectedStaffData.department}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          NIP / ID
                        </span>
                        <span className="font-mono font-medium text-gray-900">
                          {selectedStaffData.nip}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 text-sm text-gray-600">
                      {selectedStaffData.email && (
                        <div className="flex items-center gap-3">
                          <svg
                            className="text-primary h-4 w-4 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{selectedStaffData.email}</span>
                        </div>
                      )}
                      {selectedStaffData.instagram && (
                        <div className="flex items-center gap-3">
                          <svg
                            className="text-primary h-4 w-4 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                          <span>{selectedStaffData.instagram}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AboutQuickLinks />
    </>
  );
}
