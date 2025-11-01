import "~/styles/globals.css";

import { type Metadata } from "next";
import { Onest } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Al Madeena Islamic School",
  description: "Al Madeena Islamic School",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const onest = Onest({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${onest.className}`} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Al Madeena" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
