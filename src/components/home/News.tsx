"use client";

import { motion } from "framer-motion";
import { newsItemsData } from "~/data/home/newsData";
import Link from "next/link";
import { NewsCard } from "~/components/news/NewsCard";
import { ArrowRight } from "lucide-react";

// 2. Tipe data yang dibutuhkan oleh NewsCard (dari file yang Anda berikan)
type NewsArticleData = {
  slug: string;
  title: string;
  summary: string;
  featuredImage: string;
  publishedAt: Date | null;
};

// Animasi fade-in untuk section
const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

// Main News Section Component
export default function NewsSection() {
  // Ambil 3 berita pertama dari data statis Anda
  const displayedNews = newsItemsData.slice(0, 3);

  return (
    <motion.section
      className="bg-white py-16 text-gray-900 md:py-24"
      initial="initial"
      whileInView="whileInView"
      variants={fadeIn}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
      <div className="mb-12 grid grid-cols-1 items-start gap-6 md:mb-16 md:grid-cols-3 lg:gap-12">
          {/* Judul */}
          <div className="md:col-span-1">
            <h2 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              News &
            </h2>
            <h1 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Announcement
            </h1>
          </div>

          {/* Deskripsi */}
          <div className="md:col-span-1 md:pt-2">
            <p className="max-w-lg text-[#828282]">
              Al Madeena is a modern Islamic school that blends faith and
              knowledge to nurture intelligent, kind, and confident learners
              prepared for the future.
            </p>
          </div>

          {/* Link "Learn More" */}
          <div className="flex md:col-span-1 md:items-center md:justify-center md:pt-2">
            <Link
              href="/news" // Anda bisa ganti link tujuannya
              className="group inline-flex items-center font-medium text-black hover:underline"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3. Gunakan grid standar, karena kartu baru Anda tidak memiliki animasi flex-grow */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {displayedNews.map((item) => {
            
            // 4. Adaptasi data dari 'NewsItem' (data lama) ke 'NewsArticleData' (tipe baru)
            const article: NewsArticleData = {
              slug: item.linkUrl.replace("/news/", ""), // Ekstrak slug dari linkUrl
              title: item.title,
              summary: item.description,
              featuredImage: item.imageUrl,
              publishedAt: null, // Data statis Anda tidak memiliki tanggal, jadi kita kirim null
            };

            // 5. Render NewsCard yang baru dengan data yang sudah diadaptasi
            return <NewsCard key={item.id} article={article} />;
          })}
        </div>
      </div>
    </motion.section>
  );
}