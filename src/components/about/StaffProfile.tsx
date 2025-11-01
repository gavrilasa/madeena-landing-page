"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { staffData, departmentsData } from "~/data/staff/staffData";

const fastTween = { type: "tween", duration: 0.3, ease: "easeInOut" } as const;

export default function StaffProfile() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const filteredStaff =
    selectedDepartment === "all"
      ? staffData
      : staffData.filter((staff) => staff.department === selectedDepartment);

  const handleCardClick = (id: number) => {
    setSelectedStaff(id);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  const selectedStaffData = staffData.find((s) => s.id === selectedStaff);

  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#0398C9] via-[#0398C9] to-[#0279a1] px-6 py-16 md:px-12 md:py-24 lg:px-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <div className="relative inline-block">
            <h1 className="font-chalk relative mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                Meet The Team
                <div className="absolute right-0 -bottom-2 left-0 h-1 -rotate-1 transform bg-yellow-300 opacity-70"></div>
              </span>
            </h1>
            <div className="absolute -top-6 -right-8 rotate-12 transform text-3xl text-yellow-300">
              ★
            </div>
            <div className="absolute -bottom-4 -left-6 text-2xl text-[#FE7D01]">
              ♥
            </div>
          </div>
          <p className="font-handwriting mt-6 text-lg text-white/90 md:text-xl">
            Our Dedicated Educators & Staff
          </p>
        </div>

        {/* Filter (tidak berubah) */}
        <div className="mb-12 flex flex-wrap justify-center gap-3 md:gap-4">
          <button
            onClick={() => setSelectedDepartment("all")}
            className={`rounded-lg border-2 px-6 py-3 font-semibold transition-all ${
              selectedDepartment === "all"
                ? "border-white bg-white text-[#0398C9] shadow-lg"
                : "border-white/50 bg-[#0398C9]/50 text-white hover:bg-[#0398C9]/70"
            }`}
          >
            All Staff
          </button>
          {departmentsData.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`rounded-lg border-2 px-6 py-3 font-semibold transition-all ${
                selectedDepartment === dept.id
                  ? "border-white bg-white text-[#0398C9] shadow-lg"
                  : "border-white/50 bg-[#0398C9]/50 text-white hover:bg-[#0398C9]/70"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
          <AnimatePresence>
            {filteredStaff.map((staff) => (
              <motion.div
                key={staff.id}
                layoutId={`staff-card-container-${staff.id}`}
                transition={fastTween} // 2. Gunakan transisi cepat
                onClick={() => handleCardClick(staff.id)}
                className="group relative transform cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                {/* 3. Hole punch di z-20 (di atas card) */}
                <div className="absolute -top-4 left-1/2 z-20 h-8 w-16 -translate-x-1/2 transform rounded-full border-4 border-gray-200 bg-[#0398C9] shadow-inner"></div>

                {/* 3. ID Card Container di z-10 (di bawah hole punch) */}
                <motion.div
                  layoutId={`staff-card-body-${staff.id}`}
                  transition={fastTween} // 2. Gunakan transisi cepat
                  className="relative z-10 rounded-3xl border-4 border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 shadow-2xl"
                >
                  {/* Orange background header */}
                  <motion.div
                    layoutId={`staff-card-header-${staff.id}`}
                    transition={fastTween} // 2. Gunakan transisi cepat
                    className="relative mb-4 rounded-2xl bg-linear-to-r from-[#FE7D01] to-[#FE7D01] p-6"
                  >
                    <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-blue-300 opacity-50"></div>
                    <div className="absolute bottom-2 left-2 h-6 w-6 rounded-full bg-[#FE7D01] opacity-50"></div>

                    {/* Photo */}
                    <motion.div
                      layoutId={`staff-image-${staff.id}`}
                      transition={fastTween} // 2. Gunakan transisi cepat
                      className="mb-4 flex justify-center"
                    >
                      <div className="h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                        <Image
                          src={staff.image}
                          alt={staff.name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Team Badge */}
                    <div className="text-center">
                      <p className="text-lg font-bold tracking-wider text-white drop-shadow-md">
                        TEAM
                      </p>
                      <p className="text-2xl font-black tracking-wide text-white drop-shadow-md">
                        Al Madeena
                      </p>
                    </div>
                  </motion.div>

                  {/* Staff Info */}
                  <motion.div
                    layoutId={`staff-card-info-${staff.id}`}
                    transition={fastTween} // 2. Gunakan transisi cepat
                    className="space-y-3 text-center"
                  >
                    <h3 className="text-2xl font-bold tracking-wide text-gray-800 uppercase">
                      {staff.name}
                    </h3>
                    <div className="my-2 border-t-2 border-gray-300"></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          Name
                        </span>
                        <span className="font-medium text-gray-700">
                          {staff.pronouns}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          Pronouns
                        </span>
                        <span className="font-medium text-gray-700 uppercase">
                          {staff.role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          Department
                        </span>
                        <span className="font-medium text-gray-700">
                          {
                            departmentsData.find(
                              (d) => d.id === staff.department,
                            )?.name
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          NIP
                        </span>
                        <span className="font-medium text-gray-700">
                          {staff.nip}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4 text-[#FE7D01]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4 text-[#FE7D01]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                        </svg>
                        <span>{staff.instagram}</span>
                      </div>
                    </div>
                    <div className="mt-4 mb-2 flex justify-center gap-1">
                      <div className="h-8 w-1 bg-gray-700"></div>
                      <div className="h-8 w-0.5 bg-gray-700"></div>
                      <div className="h-8 w-1.5 bg-gray-700"></div>
                      <div className="h-8 w-0.5 bg-gray-700"></div>
                      <div className="h-8 w-1 bg-gray-700"></div>
                      <div className="h-8 w-2 bg-gray-700"></div>
                      <div className="h-8 w-0.5 bg-gray-700"></div>
                      <div className="h-8 w-1 bg-gray-700"></div>
                    </div>
                    <div className="mt-3 rounded-lg bg-gray-100 p-3">
                      <p className="text-xs leading-relaxed text-gray-700 italic">
                        &quot{staff.quote}&quot
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStaff && selectedStaffData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Transisi backdrop cepat
          >
            <motion.div
              layoutId={`staff-card-container-${selectedStaffData.id}`}
              transition={fastTween} // 2. Gunakan transisi cepat
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                layoutId={`staff-card-body-${selectedStaffData.id}`}
                transition={fastTween} // 2. Gunakan transisi cepat
                className="relative z-10 rounded-3xl border-4 border-gray-200 bg-linear-to-br from-gray-50 to-white p-6"
              >
                <button
                  onClick={handleCloseModal}
                  // 3. Tombol close di z-50 (paling atas di modal)
                  className="absolute top-4 right-4 z-50 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
                >
                  <svg
                    className="h-6 w-6 text-gray-600"
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

                <motion.div
                  layoutId={`staff-card-header-${selectedStaffData.id}`}
                  transition={fastTween} // 2. Gunakan transisi cepat
                  className="relative mb-4 rounded-2xl bg-linear-to-r from-[#FE7D01] to-[#FE7D01] p-6"
                >
                  <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-blue-300 opacity-50"></div>
                  <div className="absolute bottom-2 left-2 h-6 w-6 rounded-full bg-[#FE7D01] opacity-50"></div>
                  <motion.div
                    layoutId={`staff-image-${selectedStaffData.id}`}
                    transition={fastTween} // 2. Gunakan transisi cepat
                    className="mb-4 flex justify-center"
                  >
                    <div className="h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                      <Image
                        src={selectedStaffData.image}
                        alt={selectedStaffData.name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>
                  <div className="text-center">
                    <p className="text-lg font-bold tracking-wider text-white drop-shadow-md">
                      TEAM
                    </p>
                    <p className="text-2xl font-black tracking-wide text-white drop-shadow-md">
                      Al Madeena
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  layoutId={`staff-card-info-${selectedStaffData.id}`}
                  transition={fastTween} // 2. Gunakan transisi cepat
                  className="space-y-3 text-center"
                >
                  <h3 className="text-2xl font-bold tracking-wide text-gray-800 uppercase">
                    {selectedStaffData.name}
                  </h3>
                  <div className="my-2 border-t-2 border-gray-300"></div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        Name
                      </span>
                      <span className="font-medium text-gray-700">
                        {selectedStaffData.pronouns}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        Pronouns
                      </span>
                      <span className="font-medium text-gray-700 uppercase">
                        {selectedStaffData.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        Department
                      </span>
                      <span className="font-medium text-gray-700">
                        {
                          departmentsData.find(
                            (d) => d.id === selectedStaffData.department,
                          )?.name
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        NIP
                      </span>
                      <span className="font-medium text-gray-700">
                        {selectedStaffData.nip}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="h-4 w-4 text-[#FE7D01]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <span>{selectedStaffData.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="h-4 w-4 text-[#FE7D01]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                      </svg>
                      <span>{selectedStaffData.instagram}</span>
                    </div>
                  </div>
                  <div className="mt-4 mb-2 flex justify-center gap-1">
                    <div className="h-8 w-1 bg-gray-700"></div>
                    <div className="h-8 w-0.5 bg-gray-700"></div>
                    <div className="h-8 w-1.5 bg-gray-700"></div>
                    <div className="h-8 w-0.5 bg-gray-700"></div>
                    <div className="h-8 w-1 bg-gray-700"></div>
                    <div className="h-8 w-2 bg-gray-700"></div>
                    <div className="h-8 w-0.5 bg-gray-700"></div>
                    <div className="h-8 w-1 bg-gray-700"></div>
                  </div>
                  <div className="mt-3 rounded-lg bg-gray-100 p-3">
                    <p className="text-xs leading-relaxed text-gray-700 italic">
                      &quot{selectedStaffData.quote}&quot
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
