import Hero from "~/components/Hero";
import Quote from "~/components/Quote";
import Academic from "~/components/Academic";
import Motto from "~/components/Motto";
import Programs from "~/components/Programs";
import Carousel from "~/components/Carousel";
import Testimonials from "~/components/Testimonial";
import Partners from "~/components/Partners";
import News from "~/components/News";
import Footer from "~/components/Footer";


export default function HomePage() {
  return (
    <main>
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
