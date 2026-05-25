"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Phone } from "lucide-react";
import styles from "./Hero.module.css";

// Custom LinkedIn SVG icon since brand icons are removed in recent lucide-react versions
const Linkedin = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep track of the active B&W photo cycling interval and state via refs
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeBwIndexRef = useRef<number>(0);

  useGSAP(() => {
    // Select the circles in the SVG defs group
    const blob1 = containerRef.current?.querySelector(".blob-1") as SVGCircleElement;
    const blob2 = containerRef.current?.querySelector(".blob-2") as SVGCircleElement;
    const blob3 = containerRef.current?.querySelector(".blob-3") as SVGCircleElement;
    const blob4 = containerRef.current?.querySelector(".blob-4") as SVGCircleElement;
    const blob5 = containerRef.current?.querySelector(".blob-5") as SVGCircleElement;

    if (!blob1 || !blob2 || !blob3 || !blob4 || !blob5) return;

    // Set initial scale to 0 (radius = 0)
    gsap.set([blob1, blob2, blob3, blob4, blob5], { attr: { r: 0 } });

    // Setup high-performance quickTo setters for coordinate tracking with a 5-circle trail
    const q1x = gsap.quickTo(blob1, "x", { duration: 0.08, ease: "power2.out" });
    const q1y = gsap.quickTo(blob1, "y", { duration: 0.08, ease: "power2.out" });

    const q2x = gsap.quickTo(blob2, "x", { duration: 0.25, ease: "power2.out" });
    const q2y = gsap.quickTo(blob2, "y", { duration: 0.25, ease: "power2.out" });

    const q3x = gsap.quickTo(blob3, "x", { duration: 0.45, ease: "power2.out" });
    const q3y = gsap.quickTo(blob3, "y", { duration: 0.45, ease: "power2.out" });

    const q4x = gsap.quickTo(blob4, "x", { duration: 0.70, ease: "power2.out" });
    const q4y = gsap.quickTo(blob4, "y", { duration: 0.70, ease: "power2.out" });

    const q5x = gsap.quickTo(blob5, "x", { duration: 0.95, ease: "power2.out" });
    const q5y = gsap.quickTo(blob5, "y", { duration: 0.95, ease: "power2.out" });

    // Entrance Animation for side UI elements, text, and images
    const tl = gsap.timeline();
    tl.fromTo(
      `.${styles.imageContainer}`,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }
    );
    // Slide up text inside its clipping mask on entrance
    tl.fromTo(
      `.${styles.stretchText}`,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
      "-=1.2"
    );
    tl.fromTo(
      `.${styles.socialLink}`,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 },
      "-=1.0"
    );

    // Mouse events handling
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update positions for stretching effect
      q1x(x); q1y(y);
      q2x(x); q2y(y);
      q3x(x); q3y(y);
      q4x(x); q4y(y);
      q5x(x); q5y(y);

      // Mouse text stretch tracking removed
    };

    const startCycling = () => {
      if (cycleIntervalRef.current) return;

      cycleIntervalRef.current = setInterval(() => {
        const nextIndex = (activeBwIndexRef.current + 1) % 3;

        // Find current and next image elements
        const currentImg = containerRef.current?.querySelector(`.bw-${activeBwIndexRef.current}`);
        const nextImg = containerRef.current?.querySelector(`.bw-${nextIndex}`);

        if (currentImg && nextImg) {
          gsap.to(currentImg, { opacity: 0, duration: 0.1, ease: "power2.out" });
          gsap.to(nextImg, { opacity: 1, duration: 0.1, ease: "power2.out" });
        }

        activeBwIndexRef.current = nextIndex;
      }, 200); // Speed up cycling to 200ms
    };

    const stopCycling = () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }

      // Reset to index 0 (Depan)
      const images = containerRef.current?.querySelectorAll(".bw-image");
      if (images) {
        images.forEach((img, idx) => {
          gsap.to(img, { opacity: idx === 0 ? 1 : 0, duration: 0.3, ease: "power2.out" });
        });
      }
      activeBwIndexRef.current = 0;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Instantly snap to the cursor on enter to prevent sliding from (0,0)
        gsap.set([blob1, blob2, blob3, blob4, blob5], { x, y });
      }

      // Animate radii to active sizes (stretchy gooey sizes)
      gsap.to(blob1, { attr: { r: 240 }, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      gsap.to(blob2, { attr: { r: 180 }, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      gsap.to(blob3, { attr: { r: 130 }, duration: 1.0, ease: "power3.out", overwrite: "auto" });
      gsap.to(blob4, { attr: { r: 90 }, duration: 1.2, ease: "power3.out", overwrite: "auto" });
      gsap.to(blob5, { attr: { r: 60 }, duration: 1.4, ease: "power3.out", overwrite: "auto" });

      startCycling();
    };

    const handleMouseLeave = () => {
      // Animate radii back to 0
      gsap.to([blob1, blob2, blob3, blob4, blob5], {
        attr: { r: 0 },
        duration: 0.8,
        ease: "power3.inOut",
        overwrite: "auto"
      });

      // Reset scale tracking removed

      stopCycling();
    };

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero" className={styles.heroSection}>
      {/* Left UI Panel: Social links */}
      <div className={styles.socialLinks}>
        <a
          href="https://linkedin.com/in/frizaskialfath"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <Linkedin size={14} className={styles.socialIcon} />
          <span>Linkedin</span>
        </a>
        <a href="mailto:frizaskii@gmail.com" className={styles.socialLink}>
          <Mail size={14} className={styles.socialIcon} />
          <span>Email</span>
        </a>
        <a href="tel:+6281219420430" className={styles.socialLink}>
          <Phone size={14} className={styles.socialIcon} />
          <span>Phone</span>
        </a>
      </div>

      {/* Center Image Container holding the SVG Mask setup */}
      <div className={styles.imageContainer}>
        <svg className={styles.imageSvg} width="100%" height="100%">
          <defs>
            {/* Gooey Filter for Liquid stretch effect (stdDeviation = 24 for high fluidity) */}
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="
                  1 0 0 0 1
                  0 1 0 0 1
                  0 0 1 0 1
                  0 0 0 45 -22"
              />
            </filter>

            {/* Grayscale filter for SVG background rendering */}
            <filter id="grayscale-filter">
              <feColorMatrix
                type="matrix"
                values="
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0    0    0    1 0"
              />
            </filter>

            {/* Set of circles defined in coordinate space. Coordinates are set in JS via CSS x/y */}
            <g id="blob-group">
              <circle className="blob-1" cx="0" cy="0" r="0" />
              <circle className="blob-2" cx="0" cy="0" r="0" />
              <circle className="blob-3" cx="0" cy="0" r="0" />
              <circle className="blob-4" cx="0" cy="0" r="0" />
              <circle className="blob-5" cx="0" cy="0" r="0" />
            </g>

            {/* Mask 1: Reveal Overlay (White blobs on black background) */}
            <mask id="reveal-mask">
              <rect width="100%" height="100%" fill="black" />
              <g filter="url(#liquid-goo)" fill="white">
                <use href="#blob-group" />
              </g>
            </mask>

            {/* Mask 2: Inverse Mask to hide base color image (Black blobs on white background) */}
            <mask id="inverse-mask">
              <rect width="100%" height="100%" fill="white" />
              <g filter="url(#liquid-goo)" fill="black">
                <use href="#blob-group" />
              </g>
            </mask>
          </defs>

          {/* 1. Base Layer (Full Color): Clipped inside the blob area */}
          <image
            href="/Fierce Frizaski Al Fath/Fierce_Full_Color.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#inverse-mask)"
          />

          {/* 2. Revealed Layer: Masked group containing the grayscale version and B&W developer images */}
          <g mask="url(#reveal-mask)">
            {/* Grayscale background replica to keep background cohesive */}
            <image
              href="/Fierce Frizaski Al Fath/Fierce_Full_Color.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              filter="url(#grayscale-filter)"
            />

            {/* Rotated B&W cutouts that crossfade */}
            <image
              className="bw-image bw-0"
              href="/Fierce Frizaski Al Fath/Fierce_Depan.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              style={{ opacity: 1 }}
            />
            <image
              className="bw-image bw-1"
              href="/Fierce Frizaski Al Fath/Fierce_Kanan.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              style={{ opacity: 0 }}
            />
            <image
              className="bw-image bw-2"
              href="/Fierce Frizaski Al Fath/Fierce_Kiri.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              style={{ opacity: 0 }}
            />
          </g>
        </svg>
      </div>

      {/* Text overlaid on the photo, placed inside a clip mask for entrance animation */}
      <div className={styles.stretchTextWrapper}>
        <div className={styles.stretchTextMask}>
          <h1 className={styles.stretchText}>FRIZASKI AL FATH</h1>
        </div>
      </div>

    </section>
  );
}
