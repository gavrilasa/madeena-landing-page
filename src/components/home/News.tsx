// src/components/home/News.tsx
"use client";

import { motion } from "framer-motion";
import type { NewsArticle } from "@prisma/client";
import { NewsCard } from "~/components/news/NewsCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

interface NewsProps {
  articles: NewsArticle[];
}

export default function News({ articles = [] }: NewsProps) {
  return (
    <motion.div className="container mx-auto px-6 py-16" {...fadeIn}>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Berita & Kegiatan
        </h2>
        <p className="mt-4 max-w-2xl text-center text-gray-600">
          Tetap terinformasi dengan berita terbaru, acara mendatang, dan
          pencapaian dari komunitas sekolah kami.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-700"
        >
          Lihat Semua Berita
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
