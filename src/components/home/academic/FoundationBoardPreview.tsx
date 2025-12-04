"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Simplified data for preview
const boardPreview = [
  {
    id: 1,
    name: "H. Murdiyono, S.T.",
    role: "Pembina Yayasan",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ir. Hj. Pipit Sri Rejeki",
    role: "Ketua Yayasan",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Anindita Mahendra, S.T",
    role: "Pengawas Yayasan",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
];

export default function FoundationBoardPreview() {
  return (
    <div className="w-full pt-10 pb-2 md:pt-20 md:pb-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {boardPreview.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            // UPDATED: Added 'flex flex-col h-full' to stretch card and allow flex positioning
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-transform hover:-translate-y-1"
          >
            {/* UPDATED: Removed 'mb-4', added 'flex-1' to push content up if needed */}
            <div className="flex flex-1 items-center gap-4 pb-6">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold leading-tight text-white">
                  {member.name}
                </h4>
                <p className="text-sm text-white/70">{member.role}</p>
              </div>
            </div>
            
            {/* UPDATED: Added 'mt-auto' to force the line to the bottom */}
            <div className="mt-auto h-1 w-12 rounded-full bg-white/30 transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>

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