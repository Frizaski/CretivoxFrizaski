"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  const mainText = "Bukan sekadar menulis kode, gue meracik antarmuka digital yang hidup, mempertemukan keindahan desain dengan performa web yang solid.";
  const words = mainText.split(" ");

  const descText = "Kenalin, gue Al Fath. Mahasiswa Software Engineering di IPB University yang selalu excited ngulik teknologi baru. Fokus gue simpel, ngebangun website yang tampilannya enak dilihat. Gue pastiin semua interaksinya jalan mulus dan membangun experience yang unik.";
  const descWords = descText.split(" ");

  useGSAP(() => {
    const headingWords = containerRef.current?.querySelectorAll(".about-word");
    const descriptionWords = containerRef.current?.querySelectorAll(".desc-word");
    const photo = photoRef.current;

    if (!headingWords || headingWords.length === 0 || !photo) return;

    // Calculate total durations to synchronize photo unblur with the text highlights
    const wordDuration = 0.5;
    const headingStagger = 0.05;
    const headingTotalDuration = wordDuration + headingStagger * (headingWords.length - 1);

    const descStagger = 0.02;
    const descTotalDuration = wordDuration + descStagger * (descriptionWords ? descriptionWords.length - 1 : 0);

    const maxTextDuration = Math.max(headingTotalDuration, 0.2 + descTotalDuration);

    // Timeline for the scroll-scrub reveal of both text and photo blur
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", // starts when the top of the section is 60% from the top of the viewport
        end: "top -10%",  // ends when the top of the section is 10% above the top of the viewport
        scrub: 1.0,       // smooth scroll scrubbing
      }
    });

    // 1. Heading text highlight: scrub words opacity from 0.15 to 1.0
    tl.to(headingWords, {
      opacity: 1,
      duration: wordDuration,
      stagger: headingStagger,
      ease: "none",
    }, 0);

    // 2. Description highlight: scrub words opacity from 0.15 to 1.0
    if (descriptionWords && descriptionWords.length > 0) {
      tl.to(descriptionWords, {
        opacity: 1,
        duration: wordDuration,
        stagger: descStagger,
        ease: "none",
      }, 0.2); // starts slightly after heading starts animating
    }

    // 3. Photo blur: scrub blur from 30px down to 0px, and opacity from 0.3 to 1.0 over the text duration
    tl.fromTo(photo,
      { filter: "blur(30px)", opacity: 0.3 },
      { filter: "blur(0px)", opacity: 1.0, duration: maxTextDuration, ease: "power2.out" },
      0
    );

    // 4. Info label reveal: slide up and fade in at the end of the text scroll scrub
    const infoLabel = containerRef.current?.querySelector(`.${styles.infoLabel}`);
    if (infoLabel) {
      tl.fromTo(infoLabel,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        maxTextDuration
      );
    }

    // Refresh ScrollTrigger after a tiny delay to ensure all images and fonts are loaded and layout is stable
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className={styles.aboutSection}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Heading, description paragraph, and Info tag */}
          <div className={styles.leftCol}>
            {/* Masked reveal container for text */}
            <div className={styles.headingWrapper}>
              <h2 className={styles.mainHeading}>
                {words.map((word, idx) => {
                  const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
                  const isItalic = cleanWord === "kode" || cleanWord === "antarmuka" || cleanWord === "keindahan";
                  return (
                    <span
                      key={idx}
                      className={`about-word ${styles.word} ${isItalic ? styles.italicWord : ""}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </h2>
            </div>

            {/* Sub Info block: description paragraph & INFO tag */}
            <div className={styles.subInfo}>
              <p className={styles.description}>
                {descWords.map((word, idx) => (
                  <span key={idx} className={`desc-word ${styles.descWord}`}>
                    {word}
                  </span>
                ))}
              </p>
              <Link href="/info" className={styles.infoLabel}>
                INFO
              </Link>
            </div>
          </div>

          {/* Right Column: Photo with Red Wash Radial Glow and Capsule Mask */}
          <div className={styles.rightCol}>
            <div className={styles.photoWrapper}>
              <div className={styles.photoGlow} />
              <div className={styles.photoContainer}>
                <img
                  ref={photoRef}
                  src="/Assets/Frizaski.jpg"
                  alt="Frizaski Al Fath"
                  className={styles.photo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
