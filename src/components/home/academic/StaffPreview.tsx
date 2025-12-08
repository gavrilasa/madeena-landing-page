"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { type Staff } from "~/lib/generated/prisma/client";

// Color palette for staff cards
const COLORS = [
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-teal-400 to-teal-600",
  "from-orange-400 to-orange-600",
];

export default function StaffPreview({ data }: { data: Staff[] }) {
  // Take only the first 4 staff members for the preview
  const staffPreview = data.slice(0, 4);

  return (
    <div className="w-full pt-10 pb-2 md:pt-20 md:pb-4">
      {staffPreview.length === 0 ? (
        <div className="text-center text-white/80">Belum ada data staff.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {staffPreview.map((staff, index) => {
            // Assign color based on index
            const colorClass = COLORS[index % COLORS.length];

            return (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
              >
                <div
                  className={`relative h-48 w-full bg-linear-to-br ${colorClass}`}
                >
                  {staff.imageUrl ? (
                    <Image
                      src={staff.imageUrl}
                      alt={staff.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider opacity-90">
                      {staff.role}
                    </p>
                    <h4 className="text-lg font-bold">{staff.name}</h4>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-12 md:mt-24 text-center">
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