"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // <-- PASTIKAN IMAGE DIIMPOR

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

export default function HistoryPage() {
  return (
    <div className="bg-white text-neutral-800">
      {/* --- HERO SECTION BARU (DARI STAFFPROFILE) --- */}
      <div className="absolute inset-0 h-[40vh] md:h-[50vh] w-full flex items-center justify-center text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1920&auto-format&fit-crop"
          alt="Sejarah Al Madeena" // Alt text diubah
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <motion.div
        className="relative h-[40vh] md:h-[40vh] w-full flex items-center justify-center text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="font-chalk relative mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                Sejarah Al Madeena {/* Judul diubah */}
                <div className="absolute right-0 -bottom-2 left-0 h-1 -rotate-1 transform bg-yellow-300 opacity-70"></div>
              </span>
            </h1>
            <div className="absolute -top-6 -right-8 rotate-12 transform text-3xl text-yellow-300">
              ★
            </div>
            <div className="absolute -bottom-4 -left-6 text-2xl text-[#FE7D01]">
              ♥
            </div>
          </div>
          <p className="font-handwriting mt-6 text-md text-white/90 md:text-xl">
            Dari Bimbingan Belajar Menuju Lembaga Pendidikan Islam
            {/* Subtitle diubah */}
          </p>
        </div>
      </motion.div>
      {/* --- AKHIR HERO SECTION BARU --- */}

      {/* Konten Sejarah (ditempatkan di bawah hero) */}
      <motion.div
        className="container mx-auto max-w-4xl px-6 py-16 md:py-24"
        {...fadeIn}
      >
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700">
          <p>
            Perjalanan berdirinya <strong>Al Madeena Islamic School</strong>{" "}
            berawal dari pengalaman panjang dalam dunia pendidikan nonformal.
            Selama lebih dari <strong>12 tahun</strong>, tim pendiri aktif
            mengelola <strong>bimbingan belajar</strong> yang berfokus pada
            peningkatan kemampuan akademik siswa di berbagai jenjang. Dari
            pengalaman inilah tumbuh tekad dan semangat untuk terus memberikan
            kontribusi nyata bagi dunia pendidikan di Indonesia.
          </p>
          <p>
            Namun, kondisi <strong>pandemi COVID-19</strong> menjadi titik balik
            yang menantang sekaligus membuka peluang baru. Situasi tersebut
            mendorong manajemen untuk berinovasi dan mencari cara agar tetap
            dapat <strong>survive</strong> dan eksis di dunia pendidikan. Salah
            satu langkah strategis yang dilakukan adalah mengubah fungsi
            lembaga bimbingan belajar menjadi{" "}
            <strong>Pusat Pendidikan dan Persiapan Pengajar Qiroati</strong> —
            sebuah wadah pelatihan dan pengembangan guru Al-Qur’an dengan metode
            Qiroati.
          </p>
          <p>
            Dari perjalanan tersebut lahir inspirasi besar untuk bermetamorfosa
            menjadi lembaga pendidikan formal yang tidak hanya berfokus pada
            kemampuan akademik, tetapi juga pada{" "}
            <strong>
              penguatan nilai-nilai keislaman dan karakter Qur’ani
            </strong>
            .
          </p>
          <p>
            Maka pada tanggal <strong>14 Juli 2021</strong>, secara resmi
            berdirilah <strong>Al Madeena Islamic School</strong> di bawah
            naungan <strong>Yayasan Al Madeena Cendekia Muslim</strong>.
            Lembaga ini memulai kiprahnya dengan membuka jenjang{" "}
            <strong>Preschool</strong> bagi anak usia <strong>3–5 tahun</strong>,
            dengan program unggulan yang memadukan{" "}
            <strong>
              Qiroati, Tahfiz, Bahasa Inggris (Bilingual),
            </strong>{" "}
            dan <strong>Islamic Character</strong>.
          </p>
          <p>
            Alhamdulillah, selama dua tahun berjalan, keberadaan Al Madeena
            Islamic School mendapatkan sambutan yang sangat positif dari
            masyarakat. Dukungan dan kepercayaan orang tua menjadi motivasi
            besar bagi yayasan untuk terus berkembang.
          </p>
          <p>
            Atas permintaan dan aspirasi dari para orang tua siswa, pada bulan{" "}
            <strong>Juli 2023</strong>, Yayasan Al Madeena Cendekia Muslim
            resmi membuka jenjang pendidikan berikutnya, yaitu{" "}
            <strong>Primary Al Madeena Islamic School</strong>. Pada jenjang
            ini, sekolah mengembangkan{" "}
            <strong>program lanjutan dari Preschool</strong> dengan tambahan{" "}
            <strong>Assessment Cambridge</strong> serta{" "}
            <strong>muatan kurikulum madrasah</strong>, sebagai bentuk
            integrasi antara pendidikan umum, agama, dan internasional.
          </p>
          <p>
            Kini, Al Madeena Islamic School terus berkomitmen untuk menjadi
            lembaga pendidikan Islam yang unggul, modern, dan berkarakter,
            dengan visi mencetak generasi Global yang cerdas, mandiri, dan
            berakhlak mulia — siap menjadi pemimpin masa depan yang berlandaskan
            iman dan ilmu.
          </p>
        </div>
      </motion.div>
    </div>
  );
}