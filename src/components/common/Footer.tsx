"use client";
import Image from "next/image";
import { Mail, Youtube, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat md:bg-cover lg:bg-contain"
        style={{
          backgroundImage: "url('/bg-footer.svg')",
        }}
      ></div>

      {/* Konten utama */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-48 pb-8 md:px-8 md:pt-40 md:pb-10 lg:px-10 lg:pt-48 lg:pb-12">
        <div className="flex flex-col items-start justify-between gap-8 text-white lg:flex-row lg:gap-12">
          {/* Kiri: Logo + Alamat + Sosial */}
          <div className="flex w-full flex-col justify-between space-y-6 md:space-y-8 lg:w-1/2">
            <div className="flex items-center justify-start md:pt-6 lg:pt-0">
              <Image
                src="https://res.cloudinary.com/reswara/image/upload/v1761454291/Logo_Footer_xkhjuw.svg"
                alt="Logo"
                width={360}
                height={90}
                className="h-auto w-64 object-contain md:w-80 lg:w-96"
              />
            </div>

            {/* Alamat */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 shrink-0 text-white md:h-6 md:w-6" />
                  <h3 className="text-lg font-semibold md:text-xl">
                    Primary School
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-white/90 md:text-base">
                  Jl. Ks. Tubun No.29, Kejaksan, Kec. Kejaksan, Kota Cirebon,
                  Jawa Barat 45123
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 shrink-0 text-white md:h-6 md:w-6" />
                  <h3 className="text-lg font-semibold md:text-xl">
                    Pre School
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-white/90 md:text-base">
                  Jl. Ks. Tubun No.29, Kejaksan, Kec. Kejaksan, Kota Cirebon,
                  Jawa Barat 45123
                </p>
              </div>
            </div>

            {/* Sosial Media */}
            <div className="flex items-center gap-5 border-t border-white/70 pt-4 md:pt-5">
              <MessageCircle className="h-6 w-6 cursor-pointer transition hover:scale-110 md:h-7 md:w-7" />
              <Mail className="h-6 w-6 cursor-pointer transition hover:scale-110 md:h-7 md:w-7" />
              <Youtube className="h-7 w-7 cursor-pointer transition hover:scale-110 md:h-8 md:w-8" />
            </div>
          </div>

          {/* Kanan: Instagram Embed */}
          <div className="w-full lg:w-[400px]">
            <div className="overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-lg backdrop-blur-sm">
              <iframe
                src="https://www.instagram.com/almadeena.islamic.school/embed"
                width="100%"
                height="300"
                allow="encrypted-media"
                className="h-[300px] w-full rounded-xl md:h-[340px] lg:h-[360px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/20 py-4 text-center text-xs text-white/90 md:py-5 md:text-sm lg:py-6">
        © Al Madeena Islamic School | 2025
      </div>
    </footer>
  );
}
