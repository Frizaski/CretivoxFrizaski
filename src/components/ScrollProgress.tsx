"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollProgress.module.css";

interface SectionItem {
  id: string;
  label: string;
}

const defaultSections: SectionItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Proof" },
  { id: "sisilain", label: "Sisi Lain" },
  { id: "perjalanan", label: "Perjalanan" },
  { id: "penutupan", label: "Penutupan" },
  { id: "contact", label: "Contact" },
];

interface ScrollProgressProps {
  sections?: SectionItem[];
}

export default function ScrollProgress({ sections = defaultSections }: ScrollProgressProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progresses, setProgresses] = useState<number[]>(() => new Array(sections.length).fill(0));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const offsets = sections.map((sec, index) => {
        const el = document.getElementById(sec.id);
        if (!el) return 0;

        let target = el;
        if (el.parentElement && el.parentElement.classList.contains("pin-spacer")) {
          target = el.parentElement;
        }

        const flowTop = target.getBoundingClientRect().top + window.scrollY;
        if (index === 0) return 0;

        // Change focus when an incoming scene reaches the middle of the viewport.
        return Math.max(0, flowTop - window.innerHeight * 0.5);
      });

      let currentActiveIdx = 0;
      const nextProgresses = sections.map((_, j) => {
        const start = offsets[j];
        const end =
          j === sections.length - 1
            ? docHeight
            : offsets[j + 1];

        if (scrollY < start) {
          return 0;
        }
        if (scrollY >= end) {
          return 1;
        }

        currentActiveIdx = j;
        return (scrollY - start) / Math.max(end - start, 1);
      });

      // Special case: if at bottom of page
      if (scrollY >= docHeight - 10) {
        currentActiveIdx = sections.length - 1;
      }

      setActiveIndex(currentActiveIdx);
      setProgresses(nextProgresses);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    ScrollTrigger.addEventListener("refresh", handleScroll);
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    handleScroll();

    return () => {
      window.cancelAnimationFrame(refreshId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      ScrollTrigger.removeEventListener("refresh", handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const target =
        el.parentElement && el.parentElement.classList.contains("pin-spacer")
          ? el.parentElement
          : el;
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.progressContainer}>
      {sections.map((sec, idx) => {
        const isActive = activeIndex === idx;
        const progressVal = progresses[idx] || 0;

        return (
          <div
            key={sec.id}
            className={styles.segmentWrapper}
            onClick={() => scrollToSection(sec.id)}
          >
            <span
              className={`${styles.label} ${
                isActive ? styles.labelActive : ""
              }`}
            >
              {sec.label}
            </span>
            <div
              className={`${styles.trackLine} ${
                isActive ? styles.trackActive : ""
              }`}
            >
              <div
                className={styles.fillLine}
                style={{ height: `${progressVal * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
