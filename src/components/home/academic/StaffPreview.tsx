"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { staffData } from "~/data/about/staffData";

export default function StaffPreview() {
  // Take only the first 4 staff members for the preview
  const staffPreview = staffData.slice(0, 4);

  return (
    <div className="w-full py-8 md:py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {staffPreview.map((staff, index) => (
          <motion.div
            key={staff.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
          >
            <div className={`relative h-48 w-full bg-linear-to-br ${staff.color}`}>
              <Image
                src={staff.image}
                alt={staff.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay gradient for text readability if needed, specifically at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />
              
              <div className="absolute bottom-3 left-4 text-white">
                <p className="text-xs font-medium opacity-90 uppercase tracking-wider">{staff.role}</p>
                <h4 className="text-lg font-bold">{staff.name}</h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/about/staff-profile"
          className="group inline-flex items-center text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base hover:underline"
        >
          Lihat Profil Guru & Staf
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}