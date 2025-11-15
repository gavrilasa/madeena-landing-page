// src/components/about/FoundationBoardGridClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- Data (Tidak berubah) ---
const departments = [
  {
    id: "yayasan",
    name: "Dewan Yayasan",
  },
];
const boardData = [
  {
    id: 1,
    name: "H. Murdiyono, S.T.",
    role: "Pembina Yayasan",
    department: "yayasan",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto-format&fit=crop",
    pronouns: "He/Him",
    quote: "Mendedikasikan diri untuk fondasi pendidikan yang kuat.",
    nip: "YYS-00001",
    color: "from-purple-400 to-purple-500",
  },
  {
    id: 2,
    name: "Anindita Mahendra, S.T",
    role: "Pengawas Yayasan",
    department: "yayasan",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto-format&fit=crop",
    pronouns: "She/Her",
    quote: "Memastikan kualitas dan integritas selalu terjaga.",
    nip: "YYS-00002",
    color: "from-yellow-400 to-yellow-500",
  },
  {
    id: 3,
    name: "Ir. Hj. Pipit Srirejeki",
    role: "Ketua",
    department: "yayasan",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Memimpin dengan hati untuk generasi berkarakter.",
    nip: "YYS-00003",
    color: "from-teal-400 to-teal-500",
  },
  {
    id: 4,
    name: "Dadan Nurhamdan, S.Pd.I",
    role: "Sekretaris",
    department: "yayasan",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto-format&fit=crop",
    pronouns: "He/Him",
    quote: "Administrasi yang rapi adalah awal dari program yang hebat.",
    nip: "YYS-00004",
    color: "from-blue-400 to-blue-500",
  },
  {
    id: 5,
    name: "dr. Tyas Rahmaditia, Sp.A",
    role: "Bendahara",
    department: "yayasan",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Mengelola amanah untuk masa depan anak-anak.",
    nip: "YYS-00005",
    color: "from-pink-400 to-pink-500",
  },
];

const fastTween = { type: "tween", duration: 0.3, ease: "easeInOut" } as const;

export default function FoundationBoardGridClient() {
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedStaff(id);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  const selectedStaffData = boardData.find((s) => s.id === selectedStaff);

  return (
    <>
      {/* --- HERO SECTION TELAH DIHAPUS --- */}

      {/* Konten (Grid Kartu) */}
      <div className="container mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {boardData.map((staff) => (
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
                  {/* Colored Header with Photo */}
                  <div
                    className={`relative bg-linear-to-br ${staff.color} aspect-3/4 overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-end">
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        width={400}
                        height={600}
                        className="h-full w-full object-cover object-top"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>
                  </div>

                  {/* White Info Section */}
                  <div className="bg-white p-4">
                    {/* Logo/Brand */}
                    <div className="mb-3 border-b-2 border-gray-900 pb-3 text-center">
                      <Image
                        src="https://res.cloudinary.com/reswara/image/upload/v1761586656/Logo_Footer_1_u8eako.svg"
                        alt="Logo"
                        width={2400}
                        height={60}
                        className="mx-auto h-auto w-full max-w-[200px] object-contain"
                      />
                    </div>

                    {/* Staff Info */}
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-base leading-tight font-bold text-gray-900">
                          {staff.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-600">
                          {staff.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal (Struktur identik dari StaffProfile.tsx) */}
      <AnimatePresence>
        {selectedStaff && selectedStaffData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`card-${selectedStaffData.id}`}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
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
                {/* Colored Header with Photo */}
                <div
                  className={`relative bg-linear-to-br ${selectedStaffData.color} aspect-3/4 overflow-hidden md:aspect-auto md:w-1/2 md:rounded-l-lg`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={selectedStaffData.image}
                      alt={selectedStaffData.name}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </div>
                </div>

                {/* White Info Section */}
                <div className="flex flex-col bg-white p-6 md:w-1/2 md:rounded-r-lg">
                  <div className="mb-4 border-b-2 border-gray-900 pb-4 text-center">
                    <Image
                      src="https://res.cloudinary.com/reswara/image/upload/v1761586656/Logo_Footer_1_u8eako.svg"
                      alt="Logo"
                      width={2400}
                      height={60}
                      className="mx-auto h-auto w-full max-w-[200px] object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl leading-tight font-bold text-gray-900">
                        {selectedStaffData.name}
                      </h3>
                      <p className="mt-1 text-base text-gray-600">
                        {selectedStaffData.role}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {selectedStaffData.pronouns}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-3">
                      <p className="text-sm leading-relaxed text-gray-700 italic">
                        &quot;{selectedStaffData.quote}&quot;
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between border-b border-gray-200 py-2">
                        <span className="text-xs font-semibold uppercase">
                          Season
                        </span>
                        <span>2025-26</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 py-2">
                        <span className="text-xs font-semibold uppercase">
                          Department
                        </span>
                        <span className="text-right">
                          {
                            departments.find(
                              (d) => d.id === selectedStaffData.department,
                            )?.name
                          }
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 py-2">
                        <span className="text-xs font-semibold uppercase">
                          ID
                        </span>
                        <span>{selectedStaffData.nip}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 shrink-0 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span className="text-xs">
                          {selectedStaffData.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 shrink-0 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                        </svg>
                        <span className="text-xs">
                          {selectedStaffData.instagram}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
