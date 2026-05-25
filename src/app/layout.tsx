import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frizaski | Front End Developer & UI/UX Developer Portfolio",
  description: "Introduction portfolio of Frizaski, a Software Engineering Technology student at IPB University applying for the Front End Developer internship at Cretivox. Exploring creative front-end and interactive animations with GSAP.",
  keywords: [
    "Frizaski",
    "Front End Developer",
    "UI/UX Developer",
    "Project Manager",
    "Cretivox Internship",
    "IPB University",
    "GSAP",
    "ScrollTrigger",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Frizaski" }],
  openGraph: {
    title: "Frizaski | Front End Developer Portfolio",
    description: "Software Engineering student at IPB University applying for Cretivox Internship. Check out my interactive portfolio built with Next.js and GSAP ScrollTrigger.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
