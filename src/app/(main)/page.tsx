import Hero from "~/components/Hero";
import Quote from "~/components/Quote";
import Academic from "~/components/Academic";
import Motto from "~/components/Motto";
import Programs from "~/components/Programs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Quote />
      <Academic />
      <Motto />
      <Programs />
    </main>
  );
}
