"use client";

import Image from "next/image";
import Link from "next/link";
import { newsItemsData, type NewsItem } from "~/data/News"; 
import { cn } from "~/lib/utils"; 


const NewsCard = ({ item }: { item: NewsItem }) => {
  return (
    <div className="flex flex-col overflow-hidden bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full"> 
        <Image
          src={item.imageUrl}
          alt={item.altText}
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
          className="object-cover" 
        />
      </div>

      {/* Content Container */}
      <div className="flex grow flex-col bg-[#0094D9] p-5 text-white md:p-6"> 
        <h3 className="mb-2 text-lg font-semibold leading-snug md:text-xl">
          {item.title}
        </h3>
        <p className="mb-4 grow text-sm text-gray-100 md:text-base"> 
          {item.description}
        </p>
        <Link
          href={item.linkUrl}
          className={cn(
            "mt-auto self-start rounded bg-[#FFD500] px-4 py-2 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#0094D9]"
          )}
        >
          Selengkapnya
        </Link>
      </div>
    </div>
  );
};

// Main News Section Component
export default function NewsSection() {
  // Get the first 3 items or however many you want to display
  const displayedNews = newsItemsData.slice(0, 3);

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="mb-10 text-left text-3xl font-bold leading-tight tracking-tight text-[#0094D9] sm:text-4xl lg:mb-12">
          News & <br></br>Announcements
        </h2>

        {/* Grid for News Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {displayedNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}