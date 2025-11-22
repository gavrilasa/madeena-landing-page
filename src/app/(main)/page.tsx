// src/app/(main)/page.tsx

import dynamic from "next/dynamic";
import Hero from "~/components/home/Hero";
// import Quote from "~/components/home/Quote";
import Academic from "~/components/home/Academic";
import Motto from "~/components/home/Motto";
import Programs from "~/components/home/Programs";
import Partners from "~/components/home/Partners";
import News from "~/components/home/News";
import { Skeleton } from "~/components/ui/skeleton";
import { db } from "~/server/db";

const Testimonials = dynamic(() => import("~/components/home/Testimonial"), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});

export default async function HomePage() {
  const articles = await db.newsArticle.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <main className="space-y-8 bg-white">
      <Hero />
      {/* <Quote /> */}
      <Academic />
      <Motto />
      <Programs />
      <Testimonials />
      <Partners />
      <News articles={articles} />
    </main>
  );
}
