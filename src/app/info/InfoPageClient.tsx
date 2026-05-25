"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LineWaves from "@/components/LineWaves";
import styles from "./info.module.css";

export default function InfoPageClient() {
  return (
    <div className={styles.infoPageContainer}>
      {/* Animated interactive background */}
      <div className={styles.backgroundWrapper}>
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.25}
          color1="#001133"
          color2="#0066ff"
          color3="#00aaff"
          enableMouseInteraction={true}
          mouseInfluence={2}
        />
      </div>

      {/* Main Content Overlay */}
      <div className={styles.contentOverlay}>
        {/* Top Header Bar */}
        <header className={styles.headerBar}>
          <h1 id="info-heading" className={styles.infoTitle}>
            Info
          </h1>
          <Link id="back-button" href="/" className={styles.backButton}>
            BACK
          </Link>
        </header>

        {/* 2-Column Main Layout Grid */}
        <main className={styles.mainGrid}>
          {/* Left Column: Portrait and Status */}
          <section className={styles.leftCol}>
            <div className={styles.portraitWrapper}>
              <div className={styles.photoGlow} />
              <div className={styles.portraitContainer}>
                {/* Corner Markers */}
                <span className={`${styles.cornerMarker} ${styles.topLeft}`}>+</span>
                <span className={`${styles.cornerMarker} ${styles.topRight}`}>+</span>
                <span className={`${styles.cornerMarker} ${styles.bottomLeft}`}>+</span>
                <span className={`${styles.cornerMarker} ${styles.bottomRight}`}>+</span>

                {/* Profile Image */}
                <Image
                  src="/Assets/Frizaski.jpg"
                  alt="Frizaski Al Fath"
                  className={styles.portraitImg}
                  fill
                  sizes="(max-width: 860px) 320px, 420px"
                />
              </div>
            </div>

            {/* Metadata Fields */}
            <div className={styles.metadataContainer}>
              <div className={styles.metadataRow}>
                <span className={styles.metadataLabel}>BASED IN</span>
                <span className={styles.metadataValue}>Bogor, Indonesia</span>
              </div>
              <div className={styles.metadataRow}>
                <span className={styles.metadataLabel}>STATUS</span>
                <span className={styles.metadataValue}>Looking for an internship</span>
              </div>
            </div>
          </section>

          {/* Right Column: Bio and Technical Stack */}
          <section className={styles.rightCol}>
            <div className={styles.aboutWrapper}>
              <span className={styles.categoryLabel}>ABOUT</span>
              <h2 className={styles.nameHeader}>Frizaski Al Fath.</h2>

              <div className={styles.bioText}>
                <p>
                  Lewat berbagai real-project dari BGeo Dev sampai proyek kampus, gue udah terbiasa
                  ngadepin ekspektasi klien, merancang sistem dari nol, dan nulis kode yang scalable.
                </p>
                <p>
                  Sekarang, gue lagi nyari tantangan baru. Gue butuh tempat magang, sebuah environment
                  yang ngedorong gue sampai batas maksimal, di mana gue bisa berkolaborasi dengan
                  talenta-talenta kreatif, dan ikut ngebangun sesuatu yang impactful. Gue siap buat eksekusi.
                </p>
              </div>
            </div>

            <hr className={styles.divider} />

            {/* Tech Stack Columns */}
            <div className={styles.techStackGrid}>
              <div className={styles.stackColumn}>
                <h3 className={styles.stackCategory}>FRONTEND</h3>
                <ul className={styles.stackList}>
                  <li>HTML / CSS</li>
                  <li>JavaScript</li>
                  <li>TypeScript</li>
                  <li>React - Next.js</li>
                  <li>CSS Modules</li>
                </ul>
              </div>

              <div className={styles.stackColumn}>
                <h3 className={styles.stackCategory}>ANIMATION & 3D</h3>
                <ul className={styles.stackList}>
                  <li>GSAP</li>
                  <li>ScrollTrigger</li>
                  <li>Lenis Scroll</li>
                  <li>WebGL / GLSL</li>
                  <li>Three.js</li>
                </ul>
              </div>

              <div className={styles.stackColumn}>
                <h3 className={styles.stackCategory}>BACKEND</h3>
                <ul className={styles.stackList}>
                  <li>Node.js - Express</li>
                  <li>Python</li>
                  <li>Java - PHP</li>
                  <li>MySQL - PostgreSQL</li>
                  <li>Supabase</li>
                </ul>
              </div>

              <div className={styles.stackColumn}>
                <h3 className={styles.stackCategory}>DESIGN & TOOLS</h3>
                <ul className={styles.stackList}>
                  <li>Figma</li>
                  <li>GitHub</li>
                  <li>Vercel</li>
                  <li>Unity AR / VR</li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* Footer Row */}
        <footer className={styles.footerBar}>
          <a
            id="email-footer-link"
            href="mailto:frizaskii@gmail.com"
            className={styles.emailFooter}
          >
            frizaskii@gmail.com
          </a>
        </footer>
      </div>
    </div>
  );
}
