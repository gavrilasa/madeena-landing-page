"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AboutQuickLinks from "./AboutQuickLinks";
import { Carousel, Card } from "~/components/ui/apple-card-carousel";

// --- Data ---
const boardData = [
  {
    id: 1,
    name: "H. Murdiyono, S.T.",
    role: "Pembina Yayasan",
    category: "Pembina", // Mapped to top left text
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    pronouns: "He/Him",
    quote: "Mendedikasikan diri untuk fondasi pendidikan yang kuat.",
    nip: "YYS-00001",
  },
  {
    id: 2,
    name: "Anindita Mahendra, S.T",
    role: "Pengawas Yayasan",
    category: "Pengawas",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Memastikan kualitas dan integritas selalu terjaga.",
    nip: "YYS-00002",
  },
  {
    id: 3,
    name: "Ir. Hj. Pipit Srirejeki",
    role: "Ketua Yayasan",
    category: "Ketua",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Memimpin dengan hati untuk generasi berkarakter.",
    nip: "YYS-00003",
  },
  {
    id: 4,
    name: "Dadan Nurhamdan, S.Pd.I",
    role: "Sekretaris",
    category: "Sekretaris",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    pronouns: "He/Him",
    quote: "Administrasi yang rapi adalah awal dari program yang hebat.",
    nip: "YYS-00004",
  },
  {
    id: 5,
    name: "dr. Tyas Rahmaditia, Sp.A",
    role: "Bendahara",
    category: "Bendahara",
    email: "info@almadeena.sch.id",
    instagram: "@almadeena.islamic.school",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Mengelola amanah untuk masa depan anak-anak.",
    nip: "YYS-00005",
  },
];

export default function FoundationBoardGridClient() {
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedStaff(id);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  const selectedStaffData = boardData.find((s) => s.id === selectedStaff);

  // Map data to cards for the carousel
  const cards = boardData.map((member, index) => (
    <Card
      key={member.id}
      card={{
        src: member.src,
        title: member.name,
        category: member.role,
        quote: member.quote,
        id: member.id,
      }}
      index={index}
      onClick={() => handleCardClick(member.id)}
      layout={true}
    />
  ));

  return (
    <>
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-18 lg:px-8">
          {/* Carousel Component */}
          <div className="w-full">
            <Carousel items={cards} />
          </div>
        </div>
      </section>

      {/* Modal (Same as before, just ensuring it works with new trigger) */}
      <AnimatePresence>
        {selectedStaff && selectedStaffData && (
          <motion.div
            className="fixed inset-0 z-2000 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`card-${selectedStaffData.id}`}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-50 rounded-full bg-white/80 p-2 text-gray-900 transition-colors hover:bg-white"
              >
                <svg
                  className="h-6 w-6"
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

              <div className="flex h-full flex-col md:flex-row">
                {/* Image Side in Modal */}
                <div className="relative h-64 w-full md:h-auto md:w-2/5">
                  <Image
                    src={selectedStaffData.src}
                    alt={selectedStaffData.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Side in Modal */}
                <div className="flex flex-1 flex-col overflow-y-auto p-8 md:p-10">
                  <div className="mb-6">
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                      {selectedStaffData.role}
                    </span>
                    <h3 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                      {selectedStaffData.name}
                    </h3>
                  </div>

                  <blockquote className="mb-8 border-l-4 border-[#0094D9] pl-4 text-lg text-gray-700 italic">
                    &quot;{selectedStaffData.quote}&quot;
                  </blockquote>

                  <div className="grid grid-cols-1 gap-6 text-sm text-gray-600 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-1 font-bold text-gray-900">Jabatan</h4>
                      <p>{selectedStaffData.role}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-gray-900">
                        ID Yayasan
                      </h4>
                      <p>{selectedStaffData.nip}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-gray-900">Email</h4>
                      <p>{selectedStaffData.email}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-gray-900">
                        Sosial Media
                      </h4>
                      <p>{selectedStaffData.instagram}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-end pt-8">
                    <Image
                      src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1761939553/LogoTextHitam_f83bfl.svg"
                      alt="Logo"
                      width={120}
                      height={40}
                      className="opacity-20"
                    />
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
