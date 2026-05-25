"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const getInRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2x screen height
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Slide text apart and fade out slightly
      tl.to(getInRef.current, { x: "-50vw", opacity: 0, duration: 1, ease: "power2.inOut" }, 0);
      tl.to(touchRef.current, { x: "50vw", opacity: 0, duration: 1, ease: "power2.inOut" }, 0);

      // 2. Fade in and scale up the gallery photos in the background
      tl.fromTo(
        galleryRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        0
      );

      // 3. Fade in and float up the actual contact information at the center
      tl.fromTo(
        contactRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.5 // Start halfway through the animation
      );
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} id="contact" className={styles.contactSection}>
      {/* Background Gallery (Reveals on scroll) */}
      <div ref={galleryRef} className={styles.galleryContainer}>
        <div className={styles.galleryImageWrapper1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Contact/3.jpeg"
            alt="Gallery 1"
            className={styles.galleryImage}
          />
        </div>
        <div className={styles.galleryImageWrapper2}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Contact/4.jpeg"
            alt="Gallery 2"
            className={styles.galleryImage}
          />
        </div>
        <div className={styles.galleryImageWrapper3}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Contact/3.jpeg"
            alt="Gallery 3"
            className={styles.galleryImage}
          />
        </div>
        <div className={styles.galleryImageWrapper4}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Contact/2.jpeg"
            alt="Gallery 4"
            className={styles.galleryImage}
          />
        </div>
      </div>

      {/* Giant Sliding Text */}
      <div className={styles.slidingTextContainer}>
        <div ref={getInRef} className={styles.leftTextRow}>
          <h1 className={styles.giantHeading}>
            See You
          </h1>
        </div>
        <div ref={touchRef} className={styles.rightTextRow}>
          <Image
            src="/Assets/Logo Cretivox - Black.png"
            alt="Cretivox"
            className={styles.cretivoxLogo}
            width={8000}
            height={1938}
            sizes="(max-width: 640px) 65vw, 60vw"
          />
        </div>
      </div>

      {/* Contact Info (Revealed at the end) */}
      <div ref={contactRef} className={styles.contactInfoContainer}>
        <div className={styles.contactWrapper}>
          <div className={styles.contactRow}>
            <a
              href="mailto:frizaski@gmail.com"
              className={styles.emailLink}
            >
              <span className={styles.arrow}>→</span> frizaskii@gmail.com
            </a>
          </div>

          <div className={styles.contactRow}>
            <a
              href="tel:+62895323289181"
              className={styles.phoneLink}
            >
              (+62) 812 9420 430
            </a>
          </div>

          <div className={styles.socialRow}>
            <a
              href="https://instagram.com/frizaskii"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <span>→</span> instagram
            </a>
            <a
              href="https://linkedin.com/in/frizaskialfath/"
              className={styles.socialLink}
            >
              <span>→</span> linkedin
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar}>
        <span>Created by Frizaski.</span>
        <span>© {new Date().getFullYear()}.</span>
      </div>
    </footer>
  );
}
