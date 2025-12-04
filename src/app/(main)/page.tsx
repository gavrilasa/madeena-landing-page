import Hero from "~/components/home/Hero";
import Quote from "~/components/home/Quote";
import Academic from "~/components/home/Academic";
import Programs from "~/components/home/Programs";
import Partners from "~/components/home/Partners";
import Curriculum from "~/components/home/Curriculum";
import Achievements from "~/components/home/Achievements";
import Faq from "~/components/home/Faq";

import dynamic from "next/dynamic";
import { Skeleton } from "~/components/ui/skeleton";

const Testimonials = dynamic(() => import("~/components/home/Testimonials"), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});

export default async function HomePage() {
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
