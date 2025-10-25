import Hero from "~/components/Hero";
import Quote from "~/components/Quote";
import Academic from "~/components/Academic";
import Motto from "~/components/Motto";
import Programs from "~/components/Programs";
import Carousel from "~/components/Carousel";
import TestimonialSection from "~/components/Testimonial";
import LogoLoop from "~/components/LogoLoop";
import NewsSection from "~/components/News";

const imageLogos = [
  { src: "https://res.cloudinary.com/reswara/image/upload/v1761336815/Frame_9_1_yyke1c.svg", alt: "Company 1", href: "https://company1.com" },
  { src: "https://res.cloudinary.com/reswara/image/upload/v1761336815/Frame_9_1_yyke1c.svg", alt: "Company 2", href: "https://company2.com" },
  { src: "https://res.cloudinary.com/reswara/image/upload/v1761336815/Frame_9_1_yyke1c.svg", alt: "Company 3", href: "https://company3.com" },
];

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Quote />
      <Academic />
      <Motto />
      <Programs />
      <Carousel />
      <TestimonialSection />
      <div className="bg-[#f4f8fc] p-10">
        <LogoLoop
          logos={imageLogos}
          speed={60}
          direction="left"
          logoHeight={120}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#f4f8fc"
          ariaLabel="Al Madeena Partner Logos"
        />
      </div>
      <NewsSection />
    </main>
  );
}
