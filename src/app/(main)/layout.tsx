import Navbar from "~/components/common/Navbar";
import { ReactLenis } from "lenis/react";
import Footer from "~/components/common/Footer";

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
