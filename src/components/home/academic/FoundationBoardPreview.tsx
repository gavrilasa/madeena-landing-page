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
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ir. Hj. Pipit Sri Rejeki",
    role: "Ketua Yayasan",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Anindita Mahendra, S.T",
    role: "Pengawas Yayasan",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
];

export default function FoundationBoardPreview() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {boardPreview.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md transition-transform hover:-translate-y-1"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg leading-tight">{member.name}</h4>
                <p className="text-sm text-white/70">{member.role}</p>
              </div>
            </div>
            <div className="h-1 w-12 rounded-full bg-white/30 group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/about/foundation-board"
          className="group inline-flex items-center text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base hover:underline"
        >
          Lihat Seluruh Dewan Yayasan
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}