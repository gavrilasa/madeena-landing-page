import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Motto() {
  return (
    // Padding vertikal pada section
    <section className="relative w-full overflow-x-hidden bg-[#ffffff] py-24">
      {/* Menggunakan 'container mx-auto px-6' untuk perataan tengah 
        dan padding horizontal yang konsisten.
      */}
      <div className="container mx-auto px-6">
        <div className="mb-12 grid grid-cols-1 items-center gap-6 md:mb-16 md:grid-cols-3 lg:gap-12">
          {/* Judul */}
          <div className="md:col-span-1">
            <h2 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Our Vision
            </h2>
            <h1 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              & Mision
            </h1>
          </div>

          {/* Deskripsi */}
          <div className="md:col-span-1">
            <p className="max-w-lg text-[#828282]">
            To nurture a golden generation who learns with faith, character, and excellence — becoming future leaders grounded in Islamic .
            </p>
          </div>


          <div className="flex md:justify-center md:col-span-1 md:text-right">
            <Link
              href="/tentang/sejarah"
              className="group inline-flex items-center font-medium text-black hover:underline"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}