"use client";
import Image from "next/image";
import { Mail, Youtube, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#f4f8fc] overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-bottom bg-cover md:bg-contain"
        style={{
          backgroundImage: "url('/bg-footer.svg')",
        }}
      ></div>

      {/* Konten utama */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-10 pt-48 md:pt-40 lg:pt-48 pb-8 md:pb-10 lg:pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 text-white">
          {/* Kiri: Logo + Alamat + Sosial */}
          <div className="flex flex-col justify-between w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="flex items-center justify-start">
              <Image
                src="https://res.cloudinary.com/reswara/image/upload/v1761454291/Logo_Footer_xkhjuw.svg"
                alt="Logo"
                width={360}
                height={90}
                className="object-contain w-64 md:w-80 lg:w-96 h-auto"
              />
            </div>

            {/* Alamat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white shrink-0" />
                  <h3 className="font-semibold text-lg md:text-xl">Primary School</h3>
                </div>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  Jl. Ks. Tubun No.29, Kejaksan, Kec. Kejaksan, Kota Cirebon, Jawa Barat 45123
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white shrink-0" />
                  <h3 className="font-semibold text-lg md:text-xl">Pre School</h3>
                </div>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  Jl. Ks. Tubun No.29, Kejaksan, Kec. Kejaksan, Kota Cirebon, Jawa Barat 45123
                </p>
              </div>
            </div>

            {/* Sosial Media */}
            <div className="flex items-center gap-5 border-t border-white/70 pt-4 md:pt-5">
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 cursor-pointer hover:scale-110 transition" />
              <Mail className="w-6 h-6 md:w-7 md:h-7 cursor-pointer hover:scale-110 transition" />
              <Youtube className="w-7 h-7 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {/* Kanan: Instagram Embed */}
          <div className="w-full lg:w-[400px]">
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <iframe
                src="https://www.instagram.com/almadeena.islamic.school/embed"
                width="100%"
                height="300"
                allow="encrypted-media"
                className="rounded-xl w-full h-[300px] md:h-[340px] lg:h-[360px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center text-white/90 py-4 md:py-5 lg:py-6 text-xs md:text-sm border-t border-white/20">
        © Al Madeena Islamic School | 2025
      </div>
    </footer>
  );
}