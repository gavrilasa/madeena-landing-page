"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { type FoundationMember } from "~/types/foundation";

// Menerima data dari database via props
export default function FoundationBoardPreview({ data }: { data: FoundationMember[] }) {
  // Ambil 3 data pertama agar sesuai dengan grid layout (lg:grid-cols-3)
  const displayData = data.slice(0, 3);

  return (
    <div className="w-full pt-10 pb-2 md:pt-20 md:pb-4">
      {displayData.length === 0 ? (
        <div className="text-center text-white/80">Belum ada data yayasan.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              // STYLING EXACTLY AS REQUESTED: 
              // flex flex-col h-full to stretch card
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-transform hover:-translate-y-1"
            >
              {/* STYLING EXACTLY AS REQUESTED: 
                  flex-1 to push content up */}
              <div className="flex flex-1 items-center gap-4 pb-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/30">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    // Fallback jika tidak ada gambar
                    <div className="flex h-full w-full items-center justify-center bg-white/10">
                       <User className="h-8 w-8 text-white/50" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold leading-tight text-white">
                    {member.name}
                  </h4>
                  <p className="text-sm text-white/70">{member.role}</p>
                </div>
              </div>
              
              {/* STYLING EXACTLY AS REQUESTED: 
                  mt-auto to force line to bottom */}
              <div className="mt-auto h-1 w-12 rounded-full bg-white/30 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center md:mt-24">
        <Link
          href="/about/foundation-board"
          className="group inline-flex items-center text-sm font-semibold text-white transition-opacity hover:opacity-80 hover:underline md:text-base"
        >
          Seluruh Dewan Yayasan
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}