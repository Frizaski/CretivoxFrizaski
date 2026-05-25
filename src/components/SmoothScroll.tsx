"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis, LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Synchronize Lenis with GSAP Ticker
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Disable browser default scroll restoration behavior
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      ScrollTrigger.clearScrollMemory();
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth expo-out scroll behavior
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
      }}
      autoRaf={false} // Connects loop to GSAP ticker for frame synchronization
    >
      {children}
    </ReactLenis>
  );
}
