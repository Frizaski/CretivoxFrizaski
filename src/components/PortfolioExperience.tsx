"use client";

import { useSyncExternalStore } from "react";
import About from "./About";
import CaraGue from "./CaraGue";
import Contact from "./Contact";
import Hero from "./Hero";
import LoginGate from "./LoginGate";
import Penutupan from "./Penutupan";
import Perjalanan from "./Perjalanan";
import Proof from "./Proof";
import ScrollProgress from "./ScrollProgress";
import SisiLain from "./SisiLain";
import { hasAuthToken, subscribeAuthSession } from "./authSession";

const lockedSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "access", label: "Login" },
];

const unlockedSections = [
  ...lockedSections,
  { id: "portfolio", label: "Proof" },
  { id: "sisilain", label: "Sisi Lain" },
  { id: "perjalanan", label: "Perjalanan" },
  { id: "carague", label: "Cara Gue" },
  { id: "penutupan", label: "Penutupan" },
  { id: "contact", label: "Contact" },
];

export default function PortfolioExperience() {
  const unlocked = useSyncExternalStore(subscribeAuthSession, hasAuthToken, () => false);

  return (
    <>
      <ScrollProgress sections={unlocked ? unlockedSections : lockedSections} />
      <main>
        <Hero />
        <About />
        <LoginGate unlocked={unlocked} />
        {unlocked && (
          <>
            <Proof />
            <SisiLain />
            <Perjalanan />
            <CaraGue />
            <Penutupan />
            <Contact />
          </>
        )}
      </main>
    </>
  );
}
