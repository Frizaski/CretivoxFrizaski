"use client";

import React, { useState, useEffect } from "react";
import styles from "./ScrollProgress.module.css";

interface SectionItem {
  id: string;
  label: string;
}

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progresses, setProgresses] = useState<number[]>([]);

  const sections: SectionItem[] = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Proof" },
    { id: "sisilain", label: "Sisi Lain" },
    { id: "perjalanan", label: "Perjalanan" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    setMounted(true);
    setProgresses(new Array(sections.length).fill(0));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const offsets = sections.map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return 0;
        
        let target = el;
        // If the element is pinned by GSAP, its parent is the pin-spacer.
        // The pin-spacer holds the static document-flow position.
        if (el.parentElement && el.parentElement.classList.contains("pin-spacer")) {
          target = el.parentElement;
        }
        
        return target.getBoundingClientRect().top + window.scrollY;
      });

      let currentActiveIdx = 0;
      const nextProgresses = sections.map((sec, j) => {
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
        return (scrollY - start) / (end - start);
      });

      // Special case: if at bottom of page
      if (scrollY >= docHeight - 10) {
        currentActiveIdx = sections.length - 1;
      }

      setActiveIndex(currentActiveIdx);
      setProgresses(nextProgresses);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [mounted]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

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
