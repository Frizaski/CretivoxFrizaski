"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SisiLain.module.css";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  id: number;
  name: string;
  imageUrl: string;
}

export default function SisiLain() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills: SkillItem[] = [
    {
      id: 1,
      name: "Graphic Design",
      imageUrl: "/Sisi Lain/graphic_design.png",
    },
    {
      id: 2,
      name: "Branding",
      imageUrl: "/Sisi Lain/branding.png",
    },
    {
      id: 3,
      name: "UI/UX",
      imageUrl: "/Sisi Lain/uiux.png",
    },
    {
      id: 4,
      name: "Motion Graphics",
      imageUrl: "/Sisi Lain/motion.mp4",
    },
    {
      id: 5,
      name: "Video Editor",
      imageUrl: "/Sisi Lain/video.mp4",
    },
  ];

  useGSAP(() => {
    if (!mounted || !sectionRef.current) return;

    const skillItems = sectionRef.current.querySelectorAll(".sisilain-skill-item");
    const imageItems = sectionRef.current.querySelectorAll(".sisilain-image-item");

    // Initialize initial states
    // Skill 0 and Image 0 are active; others are dimmed/hidden
    gsap.set(skillItems, { opacity: 0.15 });
    gsap.set(skillItems[0], { opacity: 1.0 });

    gsap.set(imageItems, { opacity: 0, scale: 0.95 });
    gsap.set(imageItems[0], { opacity: 1.0, scale: 1.0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${skills.length * 10}%`,
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
      },
    });

    // Animate transition between skills sequentially
    skills.forEach((_, index) => {
      if (index === 0) return; // Skip first item as it is active at the start

      const prevIndex = index - 1;
      const label = `step-${index}`;

      // Transition to the current item
      tl.to(skillItems[prevIndex], {
        opacity: 0.15,
        duration: 1.0,
        ease: "power2.inOut",
      }, label);

      tl.to(skillItems[index], {
        opacity: 1.0,
        duration: 1.0,
        ease: "power2.inOut",
      }, label);

      // Fade out previous image
      tl.to(imageItems[prevIndex], {
        opacity: 0,
        scale: 0.95,
        duration: 1.0,
        ease: "power2.inOut",
      }, label);

      // Fade in current image
      tl.to(imageItems[index], {
        opacity: 1.0,
        scale: 1.0,
        duration: 1.0,
        ease: "power2.inOut",
      }, label);

      // Hold this state for a bit before the next scroll transition
      tl.to({}, { duration: 1.5 });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [mounted]);

  if (!mounted) {
    return <section id="sisilain" style={{ minHeight: "100vh", backgroundColor: "#000000" }} />;
  }

  return (
    <section ref={sectionRef} id="sisilain" className={styles.sisiLainSection}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Image Stack */}
          <div className={styles.leftCol}>
            <div className={styles.imageStackWrapper}>
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className={`sisilain-image-item ${styles.imageItem}`}
                >
                  {skill.imageUrl.endsWith(".mp4") ? (
                    <video
                      src={skill.imageUrl}
                      className={styles.skillImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className={styles.skillImage}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skills List */}
          <div className={styles.rightCol}>
            <p className={styles.subHeading}>Sisi lain gue</p>
            <div className={styles.skillsList}>
              {skills.map((skill) => (
                <h3
                  key={skill.id}
                  className={`sisilain-skill-item ${styles.skillName}`}
                >
                  {skill.name}
                </h3>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
