"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyTrailImages } from "@/data/journey";
import ImageTrail from "./ImageTrail";
import styles from "./Perjalanan.module.css";

gsap.registerPlugin(ScrollTrigger);

const headingWords = "Lebih dari sekedar Layar".split(" ");
const subtitleWords =
  "Karena hidup nggak selalu berjalan di dalam fungsi loop. Ini adalah kepingan memori, interaksi, dan langkah gue di dunia nyata.".split(" ");

export default function Perjalanan() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const headingWordEls = sectionRef.current.querySelectorAll(".journey-heading-word");
    const subtitleWordEls = sectionRef.current.querySelectorAll(".journey-subtitle-word");

    gsap.set(headingWordEls, { opacity: 0.15 });
    gsap.set(subtitleWordEls, { opacity: 0.15 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(
      headingWordEls,
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        duration: 0.8,
      },
      0
    );

    timeline.to(
      subtitleWordEls,
      {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        duration: 1.2,
      },
      0.25
    );

    const timer = window.setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="perjalanan" className={styles.journeySection}>
      <div className={styles.trailBackground}>
        <ImageTrail items={journeyTrailImages} interactionTargetRef={sectionRef} />
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h2 className={styles.mainHeading}>
          {headingWords.map((word, index) => (
            <span
              key={word}
              className={`journey-heading-word ${styles.headingWord} ${
                index === headingWords.length - 1 ? styles.italicWord : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h2>

        <p className={styles.subtitle}>
          {subtitleWords.map((word, index) => (
            <span key={`${word}-${index}`} className={`journey-subtitle-word ${styles.word}`}>
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
