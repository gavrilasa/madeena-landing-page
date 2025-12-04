"use client";

import LogoLoop, { type LogoItem } from "~/components/ui/logo-loop";
import { partnersData } from "~/data/home/partnersData";

export default function Partners() {
  const logoItems: LogoItem[] = partnersData
    .map((item) => {
      const rawItem = item as Record<string, unknown>;

      const src = typeof rawItem.src === "string" ? rawItem.src : undefined;
      const image =
        typeof rawItem.image === "string" ? rawItem.image : undefined;

      const imgSrc = src ?? image;

      if (imgSrc) {
        return {
          src: imgSrc,
          alt: item.title,
          title: item.title,
        };
      }

      return null;
    })
    .filter(
      (item): item is { src: string; alt: string; title: string } =>
        item !== null,
    );

  return (
    <div className="bg-white p-10">
      <LogoLoop
        logos={logoItems}
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
