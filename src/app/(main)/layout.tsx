import Navbar from "~/components/common/Navbar";
import { ReactLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { Skeleton } from "~/components/ui/skeleton";

const Footer = dynamic(() => import("~/components/common/Footer"), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
});

export default function LandingPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ReactLenis root />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
