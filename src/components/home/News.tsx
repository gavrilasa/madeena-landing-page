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
      <div className="mb-12 grid grid-cols-1 items-start gap-6 md:mb-16 xl:grid-cols-3 xl:gap-12">
          <div className="xl:col-span-1">
            <h2 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Berita & Kegiatan
            </h2>
          </div>

          <div className="xl:col-span-1 xl:pt-2">
            <p className="max-w-lg text-[#828282]">
              Tetap terinformasi dengan berita terbaru, acara mendatang, dan
              pencapaian dari komunitas sekolah kami.
            </p>
          </div>

          <div className="flex w-full justify-start xl:col-span-1 xl:items-start xl:justify-center xl:pt-2">
            <Link
              href="/news"
              className="group inline-flex items-center font-medium text-black hover:underline"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </motion.div>
  );
}
