"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  // 1. Tambahkan useRef untuk mendeteksi elemen container
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Tambahkan useEffect untuk handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Pasang event listener hanya jika menu sedang terbuka
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const message = encodeURIComponent(
    "Halo, saya tertarik untuk mengetahui informasi lebih lanjut mengenai Sekolah Al Madeena.",
  );

  const options = [
    {
      label: "Primary School",
      number: "6285215599906",
      color: "text-green-600",
    },
    {
      label: "Preschool",
      number: "6282119222822",
      color: "text-green-600",
    },
  ];

  return (
    <div
      ref={containerRef} // 3. Pasang ref pada container utama
      className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4"
    >
      {/* Menu Opsi (Muncul saat isOpen = true) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-2 flex flex-col gap-3"
          >
            {options.map((option) => (
              <Link
                key={option.label}
                href={`https://wa.me/${option.number}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-full bg-white py-2 pl-4 pr-2 shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
              >
                <span className={`text-base font-semibold ${option.color}`}>
                  {option.label}
                </span>
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1765193910/WhatsApp_uktdmq.webp"
                    alt="WhatsApp"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Utama (Toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-16 min-w-16 flex-row-reverse items-center justify-between rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:gap-4 hover:pr-6 hover:shadow-xl"
        aria-label={isOpen ? "Tutup Menu Kontak" : "Hubungi kami via WhatsApp"}
      >
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Image
            src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1765193910/WhatsApp_uktdmq.webp"
            alt="WhatsApp Contact"
            fill
            className="object-contain"
            sizes="48px"
          />
        </div>

        <span className="max-w-0 overflow-hidden text-lg font-semibold whitespace-nowrap text-green-600 opacity-0 transition-all duration-300 group-hover:max-w-[150px] group-hover:pl-4 group-hover:opacity-100">
          Hubungi Kami
        </span>
      </button>
    </div>
  );
}