"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CaraGue.module.css";

gsap.registerPlugin(ScrollTrigger);

const sentence =
  "Cara gue ngelakuin itu semua dengan cara Belajar, Latihan, Implementasi, Gagal, dan Coba Lagi.";

export default function CaraGue() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getTravelDistance = () =>
      Math.max(track.scrollWidth - window.innerWidth, window.innerWidth * 0.25);

    const characters = gsap.utils.toArray<HTMLElement>(
      `.${styles.character}`,
      section,
    );
    gsap.set(characters, { autoAlpha: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(getTravelDistance() * 1.6, window.innerHeight * 2.2)}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(
      characters,
      {
        autoAlpha: 1,
        duration: 0.02,
        stagger: 0.028,
        ease: "steps(1)",
      },
      0,
    );
    timeline.to(
      track,
      {
        x: () => -getTravelDistance(),
        duration: timeline.duration() + 0.25,
        ease: "none",
      },
      0.2,
    );
    timeline.to({}, { duration: 0.25 });

    return () => {
      timeline.kill();
    };
  }, { scope: sectionRef });

  return (
    <section id="carague" ref={sectionRef} className={styles.section}>
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          <p className={styles.sentence} aria-label={sentence}>
            {Array.from(sentence).map((character, index) => (
              <span
                key={`${character}-${index}`}
                className={styles.character}
                aria-hidden="true"
              >
                {character}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
