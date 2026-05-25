import React from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Proof from "@/components/Proof";
import SisiLain from "@/components/SisiLain";
import Perjalanan from "@/components/Perjalanan";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Proof />
        <SisiLain />
        <Perjalanan />
        <Contact />
      </main>
    </>
  );
}
