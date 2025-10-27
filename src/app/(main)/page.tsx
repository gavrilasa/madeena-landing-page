import Hero from "~/components/home/Hero";
import Quote from "~/components/home/Quote";
import Academic from "~/components/home/Academic";
import Motto from "~/components/home/Motto";
import Programs from "~/components/home/Programs";
import Carousel from "~/components/home/Carousel";
import Testimonials from "~/components/home/Testimonial";
import Partners from "~/components/home/Partners";
import News from "~/components/home/News";
import Footer from "~/components/common/Footer";

export default function HomePage() {
  return (
    <main className="space-y-8 bg-[#f4f8fc]">
      <Hero />
      <Quote />
      <Academic />
      <Motto />
      <Programs />
      <Carousel />
      <Testimonials />
      <Partners />
      <News />
      <Footer />
    </main>
  );
}
