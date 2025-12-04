// src/components/analytics/AnalyticsTracker.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Debounce: Tunggu 500ms. Jika user navigasi cepat (salah klik/back),
    // timer akan di-reset oleh fungsi cleanup sebelum request terkirim.
    const timer = setTimeout(() => {
      // Pastikan kode berjalan di browser
      if (typeof window === "undefined") return;

      const referrer = document.referrer;

      // Kirim data ke API Route secara background
      void fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: pathname,
          referrer: referrer,
        }),
        // Opsional: keepalive memastikan request tetap terkirim
        // meskipun user segera menutup tab/navigasi
        keepalive: true,
      }).catch((err) => {
        // Silent fail agar tidak mengganggu console user secara agresif
        console.error("[Analytics]", err);
      });
    }, 500);

    // Cleanup function: Akan dijalankan jika 'pathname' berubah sebelum 500ms
    return () => clearTimeout(timer);
  }, [pathname]); // Dependensi: jalankan efek setiap URL berubah

  // Render null karena komponen ini tidak menampilkan UI
  return null;
}
