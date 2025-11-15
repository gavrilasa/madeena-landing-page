import LogoLoop from "~/components/ui/logo-loop";
import { partnerData } from "~/data/home/partnerData";

export default function Partners() {
  return (
    <div className="bg-white p-10">
      <LogoLoop
        logos={partnerData}
        speed={60}
        direction="left"
        logoHeight={120}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Al Madeena Partner Logos"
      />
    </div>
  );
}
