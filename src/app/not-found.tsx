"use client";

import { FileQuestion } from "lucide-react";
import { Button } from "~/components/ui/button";
import Navbar from "~/components/common/Navbar";
import Footer from "~/components/common/Footer";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar forceSolid />

      <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">
          <FileQuestion className="h-12 w-12 text-[#FE7D01]" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mb-8 max-w-md text-lg text-gray-600">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan ke
          alamat lain.
        </p>

        <div className="flex gap-4">
          <Button
            onClick={() => router.back()}
            className="rounded-full bg-[#FE7D01] px-8 py-6 text-base font-bold text-white hover:bg-[#e06d00]"
          >
            Kembali
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
