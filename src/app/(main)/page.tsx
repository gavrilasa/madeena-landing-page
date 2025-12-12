import Hero from "~/components/home/Hero";
import Quote from "~/components/home/Quote";
import Academic from "~/components/home/Academic";
import Programs from "~/components/home/Programs";
import Partners from "~/components/home/Partners";
import Curriculum from "~/components/home/Curriculum";
import Achievements from "~/components/home/Achievements";
import Faq from "~/components/home/Faq";
import { db } from "~/server/db";
import dynamic from "next/dynamic";
import { Skeleton } from "~/components/ui/skeleton";

const Testimonials = dynamic(() => import("~/components/home/Testimonials"), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});

export default async function HomePage() {
  const preschoolAchievements = await db.achievement.findMany({
    where: { category: "PRESCHOOL" },
    orderBy: { date: "desc" },
    take: 6,
  });

  const primaryAchievements = await db.achievement.findMany({
    where: { category: "PRIMARY" },
    orderBy: { date: "desc" },
    take: 6,
  });

  // 1. Fetch Staff (Teachers/Admin)
  const teachingStaff = await db.staff.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  // 2. Fetch Foundation Members (NEW)
  const foundationBoard = await db.foundationMember.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <main className="">
      <Hero />
      <Quote />
      <Academic 
        staff={teachingStaff} 
        board={foundationBoard} 
      />
      <Programs />
      <Curriculum />
      <Achievements 
        preschool={preschoolAchievements} 
        primary={primaryAchievements} 
      />
      <Partners />
      <Testimonials />
      <Faq />
    </main>
  );
}