// src/app/(main)/page.tsx

import dynamic from "next/dynamic";
import Hero from "~/components/home/Hero";
import Quote from "~/components/home/Quote";
import Academic from "~/components/home/Academic";
import Programs from "~/components/home/Programs";
import Partners from "~/components/home/Partners";
import { Skeleton } from "~/components/ui/skeleton";
import { db } from "~/server/db";
import Curriculum from "~/components/home/Curriculum";
import Achievements from "~/components/home/Achievements";
import Faq from "~/components/home/Faq";

const Testimonials = dynamic(() => import("~/components/home/Testimonials"), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});

export default async function HomePage() {
  const articles = await db.newsArticle.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <main className="">
      <Hero />
      <Quote />
      <Academic />
      <Programs />
      <Curriculum />
      <Achievements />
      <Partners />
      <Testimonials />
      <Faq />
    </main>
  );
}
