"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AboutQuickLinks from "./AboutQuickLinks";
import { Carousel, Card } from "~/components/ui/apple-card-carousel";
import { User } from "lucide-react";
import { type FoundationMember } from "~/types/foundation";

// PERBAIKAN: Menggunakan interface FoundationMember[]
interface FoundationBoardGridClientProps {
  data: FoundationMember[];
}

export default function FoundationBoardGridClient({
  data,
}: FoundationBoardGridClientProps) {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setSelectedStaff(id);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  const selectedStaffData = data.find((s) => s.id === selectedStaff);

  const cards = data.map((member, index) => (
    <Card
      key={member.id}
      card={{
        src: member.imageUrl || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop", 
        title: member.name,
        category: member.role,
        quote: member.quote || "",
        id: member.id,
      }}
      index={index}
      // @ts-ignore - Ignoring layout prop type strictness for now
      onClick={() => handleCardClick(member.id)}
      layout={true}
    />
  ));

  return (
    <>
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-18 lg:px-8">
          <div className="w-full">
            {cards.length > 0 ? (
              <Carousel items={cards} />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-3xl bg-gray-50 text-center">
                <User className="mb-4 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">Belum ada data anggota yayasan.</p>
              </div>
            )}
          </div>
        </div>
      </section>

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
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-50 rounded-full bg-white/80 p-2 text-gray-900 transition-colors hover:bg-white"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex h-full flex-col md:flex-row">
                <div className="relative h-64 w-full md:h-auto md:w-2/5">
                  {selectedStaffData.imageUrl ? (
                    <Image
                      src={selectedStaffData.imageUrl}
                      alt={selectedStaffData.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <User className="h-20 w-20 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto p-8 md:p-10">
                  <div className="mb-6">
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                      {selectedStaffData.role}
                    </span>
                    <h3 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                      {selectedStaffData.name}
                    </h3>
                  </div>

                  {selectedStaffData.quote && (
                    <blockquote className="mb-8 border-l-4 border-[#0094D9] pl-4 text-lg italic text-gray-700">
                      &quot;{selectedStaffData.quote}&quot;
                    </blockquote>
                  )}

                  <div className="grid grid-cols-1 gap-6 text-sm text-gray-600 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-1 font-bold text-gray-900">Jabatan</h4>
                      <p>{selectedStaffData.role}</p>
                    </div>
                    {/* PERBAIKAN: Menghapus field NIP yang tidak ada di FoundationMember */}
                    {selectedStaffData.email && (
                      <div>
                        <h4 className="mb-1 font-bold text-gray-900">Email</h4>
                        <p>{selectedStaffData.email}</p>
                      </div>
                    )}
                    {selectedStaffData.instagram && (
                      <div>
                        <h4 className="mb-1 font-bold text-gray-900">Sosial Media</h4>
                        <p>{selectedStaffData.instagram}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedStaffData.bio && (
                     <div className="mt-6">
                        <h4 className="mb-1 font-bold text-gray-900">Biografi</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{selectedStaffData.bio}</p>
                     </div>
                  )}

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