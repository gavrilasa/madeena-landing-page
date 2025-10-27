import LogoLoop from "~/components/ui/logo-loop";
import { partnerData } from "~/data/partnerData";

export default function Partners() {
  return (
    <div className="bg-[#f4f8fc] p-10">
      <LogoLoop
        logos={partnerData}
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
  );
}
