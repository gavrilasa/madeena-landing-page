"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "~/components/ui/button";
import Navbar from "~/components/common/Navbar";
import Footer from "~/components/common/Footer";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar forceSolid />

      <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Terjadi Kesalahan
        </h1>

        <p className="mb-8 max-w-md text-lg text-gray-600">
          Kami mohon maaf, terjadi kendala teknis saat memproses permintaan
          Anda. Silakan coba beberapa saat lagi.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => reset()}
            className="gap-1 rounded-full bg-[#059DEA] py-6 text-base font-medium text-white hover:bg-[#048acc]"
          >
            <RotateCcw className="h-4 w-4" />
            Coba Lagi
          </Button>

          <Button
            onClick={() => router.back()}
            className="rounded-full bg-[#FE7D01] py-6 text-base font-medium text-white hover:bg-[#e06d00]"
          >
            Kembali
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
