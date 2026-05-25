"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Penutupan.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Penutupan() {
  const sectionRef = useRef<HTMLElement>(null);
  const readyRef = useRef<HTMLSpanElement>(null);
  const forRef = useRef<HTMLSpanElement>(null);
  const cretivoxRef = useRef<HTMLSpanElement>(null);
  const iAmRef = useRef<HTMLDivElement>(null);
  const batch5Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    });

    timeline.fromTo(
      readyRef.current,
      { xPercent: 105 },
      { xPercent: 0, duration: 1 },
      0
    );
    timeline.fromTo(
      iAmRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.32 },
      0.55
    );
    timeline.to({}, { duration: 0.18 });
    timeline.fromTo(
      forRef.current,
      { xPercent: -105 },
      { xPercent: 0, duration: 1 },
      ">"
    );
    timeline.to({}, { duration: 0.18 });
    timeline.fromTo(
      cretivoxRef.current,
      { xPercent: 105 },
      { xPercent: 0, duration: 1 },
      ">"
    );
    timeline.fromTo(
      batch5Ref.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.32 },
      "-=0.45"
    );
    timeline.to({}, { duration: 0.35 });
  }, { scope: sectionRef });

  return (
    <section id="penutupan" ref={sectionRef} className={styles.penutupanSection}>
      <div className={styles.inner}>
        <div className={styles.mainText}>
          <div className={`${styles.lineRow} ${styles.readyRow}`}>
            <div ref={iAmRef} className={styles.accentLeft}>
              <span>I AM</span>
            </div>
            <div className={styles.lineWrap}>
              <span ref={readyRef} className={styles.mainLine}>READY</span>
            </div>
          </div>

          <div className={styles.lineWrap}>
            <span ref={forRef} className={styles.mainLine}>FOR</span>
          </div>

          <div className={`${styles.lineRow} ${styles.cretivoxRow}`}>
            <div className={styles.lineWrap}>
              <span ref={cretivoxRef} className={styles.mainLine}>CRETIVOX</span>
            </div>
            <div ref={batch5Ref} className={styles.accentRight}>
              <span>BATCH 5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
